import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListCustomerAccounts(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/curr-account/customer', undefined, qs);
}

export async function cloudListSupplierAccounts(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/curr-account/supplier', undefined, qs);
}

export async function cloudGetCurrAccount(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('currAccountId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/curr-account/${id}`);
}

export async function cloudCreateCurrAccountEntry(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('currAccountData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/curr-account/entry', body);
}

export async function cloudCreateCurrAccountRegul(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('currAccountData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/curr-account/regul', body);
}

export async function cloudUpdateCurrAccount(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('currAccountId', i) as string;
	const body = this.getNodeParameter('currAccountData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', `/curr-account/${id}`, body);
}

export async function cloudDeleteCurrAccount(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('currAccountId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/curr-account/${id}`);
}
