import {
	IDataObject,
	IExecuteFunctions,
	INodeProperties,
	NodeApiError,
	NodeOperationError,
} from 'n8n-workflow';

export interface CloudCredentials {
	nif: string;
	apiKey: string;
	development: boolean;
}

const PRODUCTION_BASE_URL = 'https://%s.artsoft.cloud/api';
const DEVELOPMENT_BASE_URL = 'https://%s.local.artsoft.cloud:3000/api';

export function getBaseUrl(credentials: CloudCredentials): string {
	const template = credentials.development ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;
	return template.replace('%s', credentials.nif);
}

export interface PaginationParams {
	$search?: string;
	$direction?: string;
	$sort?: string;
	$filter?: string;
}

// The API caps `$size` at 200 (MAX_LIMIT in the backend specifications).
const MAX_PAGE_SIZE = 200;
// Guards against a cursor that never ends.
const MAX_PAGES = 1000;

export function returnAllProperties(resource: string, operations: string[]): INodeProperties[] {
	return [
		{
			displayName: 'Return All',
			name: 'returnAll',
			type: 'boolean',
			default: false,
			displayOptions: { show: { resource: [resource], operation: operations } },
			description: 'Whether to return all results or only up to a given limit',
		},
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			default: 50,
			typeOptions: { minValue: 1 },
			displayOptions: {
				show: { resource: [resource], operation: operations, returnAll: [false] },
			},
			description: 'Max number of results to return',
		},
	];
}

export function buildPaginationParams(context: IExecuteFunctions, i: number): IDataObject {
	const params: IDataObject = {};
	const search = context.getNodeParameter('$search', i, '') as string;
	const direction = context.getNodeParameter('$direction', i, '') as string;
	const sort = context.getNodeParameter('$sort', i, '') as string;
	const filter = context.getNodeParameter('$filter', i, '') as string;

	if (search) params.$search = search;
	if (direction) params.$direction = direction;
	if (sort) params.$sort = sort;
	if (filter) params.$filter = filter;

	return params;
}

interface ApiErrorShape {
	message?: string;
	response?: {
		data?: { message?: string; error?: { message?: string; code?: string } };
	};
}

export async function cloudApiRequest(
	this: IExecuteFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	body?: IDataObject,
	qs?: IDataObject,
): Promise<Record<string, unknown>> {
	const credentials = (await this.getCredentials('artsoftCloudApi')) as unknown as CloudCredentials;
	const baseUrl = getBaseUrl(credentials);

	try {
		const response = await this.helpers.httpRequestWithAuthentication.call(this, 'artsoftCloudApi', {
			method,
			url: `${baseUrl}${path}`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body,
			qs,
			// Local development servers use certificates from a local CA (e.g. mkcert).
			skipSslCertificateValidation: credentials.development,
			returnFullResponse: false,
		});
		return (response as Record<string, unknown>) ?? {};
	} catch (error) {
		const err = error as ApiErrorShape;
		const responseData = err?.response?.data;
		const apiMessage = responseData?.error?.message ?? responseData?.message ?? '';
		const apiCode = responseData?.error?.code ?? '';
		const detail = apiMessage ? `${apiCode}: ${apiMessage}` : err.message ?? String(error);
		throw new NodeApiError(
			this.getNode(),
			{ message: detail, description: JSON.stringify(responseData ?? err.message ?? '') },
			{ message: `ARTSOFT Cloud Invoice API request to ${path} failed: ${detail}` },
		);
	}
}

/**
 * Walks a cursor-paginated list endpoint (`{ value, nextToken }`) until the limit is
 * reached or there are no more pages.
 */
export async function cloudApiRequestAllItems(
	this: IExecuteFunctions,
	path: string,
	i: number,
): Promise<IDataObject[]> {
	const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
	const limit = returnAll ? Infinity : (this.getNodeParameter('limit', i, 50) as number);
	const baseQs = buildPaginationParams(this, i);
	const results: IDataObject[] = [];
	let cursor: string | undefined;

	for (let page = 0; page < MAX_PAGES; page++) {
		const qs: IDataObject = { ...baseQs, $size: Math.min(limit - results.length, MAX_PAGE_SIZE) };
		if (cursor) qs.$cursor = cursor;

		const response = await cloudApiRequest.call(this, 'GET', path, undefined, qs);
		const items = (response.value as IDataObject[] | undefined) ?? [];
		results.push(...items);

		const nextToken = response.nextToken as string | undefined;
		if (results.length >= limit || !nextToken || items.length === 0) {
			return results.slice(0, limit);
		}
		cursor = nextToken;
	}

	throw new NodeOperationError(
		this.getNode(),
		`Pagination stopped after ${MAX_PAGES} pages; narrow the results with a filter.`,
		{ itemIndex: i },
	);
}
