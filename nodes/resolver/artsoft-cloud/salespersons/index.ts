import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListSalespersons(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	
	return cloudApiRequest.call(this, 'GET', '/salespersons/', undefined, qs);
}

export async function cloudGetSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/salespersons/${id}`);
}

export async function cloudCreateSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('salespersonData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/salespersons/', body);
}

export async function cloudUpdateSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	const body = this.getNodeParameter('salespersonData', i) as IDataObject;
	return cloudApiRequest.call(this, 'PUT', `/salespersons/${id}`, body);
}

export async function cloudDeleteSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/salespersons/${id}`);
}
