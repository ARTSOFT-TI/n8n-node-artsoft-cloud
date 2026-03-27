import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListCustomers(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/customers/', undefined, qs);
}

export async function cloudGetCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('customerId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/customers/${id}`);
}

export async function cloudCreateCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('customerData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/customers/', body);
}

export async function cloudUpdateCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('customerId', i) as string;
	const body = this.getNodeParameter('customerData', i) as IDataObject;
	return cloudApiRequest.call(this, 'PUT', `/customers/${id}`, body);
}

export async function cloudDeleteCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('customerId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/customers/${id}`);
}
