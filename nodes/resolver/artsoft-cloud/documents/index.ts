import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListBillings(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/documents/billings', undefined, qs);
}

export async function cloudListBillingsBySaftType(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const saftType = this.getNodeParameter('saftType', i) as string;
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', `/documents/billings/${saftType}`, undefined, qs);
}

export async function cloudListPurchases(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/documents/purchases', undefined, qs);
}

export async function cloudListPurchasesBySaftType(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const saftType = this.getNodeParameter('saftType', i) as string;
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', `/documents/purchases/${saftType}`, undefined, qs);
}

export async function cloudGetDocument(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('documentId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/documents/${id}`);
}

export async function cloudCreateDocumentHeader(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('documentHeaderData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/documents/header', body);
}

export async function cloudUpdateDocument(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('documentId', i) as string;
	const sign = this.getNodeParameter('sign', i, false) as boolean;
	const body = this.getNodeParameter('documentData', i) as IDataObject;
	const qs: IDataObject = {};
	if (sign) qs.sign = true;
	return cloudApiRequest.call(this, 'POST', `/documents/${id}`, body, qs);
}

export async function cloudDeleteDocument(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('documentId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/documents/${id}`);
}
