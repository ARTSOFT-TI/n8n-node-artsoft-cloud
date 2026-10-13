import { IDataObject, IExecuteFunctions, NodeApiError } from 'n8n-workflow';

export interface CloudCredentials {
	nif: string;
	apiKey: string;
	development: boolean;
}

const PRODUCTION_BASE_URL = 'https://%s.artsoft.cloud/api';
const DEVELOPMENT_BASE_URL = 'http://%s.local.artsoft.cloud:3000/api';

export function getBaseUrl(credentials: CloudCredentials): string {
	const template = credentials.development ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;
	return template.replace('%s', credentials.nif);
}

export interface PaginationParams {
	$search?: string;
	$direction?: string;
	$size?: number;
	$sort?: string;
	$filter?: string;
	$navigate?: string;
	$cursor?: string;
}

export function buildPaginationParams(context: IExecuteFunctions, i: number): IDataObject {
	const params: IDataObject = {};
	const search = context.getNodeParameter('$search', i, '') as string;
	const direction = context.getNodeParameter('$direction', i, '') as string;
	const size = context.getNodeParameter('$size', i, 0) as number;
	const sort = context.getNodeParameter('$sort', i, '') as string;
	const filter = context.getNodeParameter('$filter', i, '') as string;
	const navigate = context.getNodeParameter('$navigate', i, '') as string;
	const cursor = context.getNodeParameter('$cursor', i, '') as string;

	if (search) params.$search = search;
	if (direction) params.$direction = direction;
	if (size) params.$size = size;
	if (sort) params.$sort = sort;
	if (filter) params.$filter = filter;
	if (navigate) params.$navigate = navigate;
	if (cursor) params.$cursor = cursor;

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
