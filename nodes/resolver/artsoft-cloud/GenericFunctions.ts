import { IDataObject, IExecuteFunctions, NodeApiError } from 'n8n-workflow';

export interface CloudCredentials {
	baseUrl: string;
	apiKey: string;
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

export async function cloudApiRequest(
	this: IExecuteFunctions,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE',
	path: string,
	body?: IDataObject,
	qs?: IDataObject,
): Promise<Record<string, unknown>> {
	const credentials = (await this.getCredentials('artsoftCloudApi')) as CloudCredentials;
	const baseUrl = credentials.baseUrl.replace(/\/$/, '');

	try {
		const response = await this.helpers.httpRequest({
			method,
			url: `${baseUrl}${path}`,
			headers: {
				'x-api-key': credentials.apiKey,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body,
			qs,
			returnFullResponse: false,
		});
		return (response as Record<string, unknown>) ?? {};
	} catch (error) {
		const err = error as Error;
		throw new NodeApiError(
			this.getNode(),
			{ message: err.message ?? String(err), description: err.stack ?? '' },
			{ message: `Artsoft Cloud API request to ${path} failed` },
		);
	}
}
