import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListDocumentLines(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', `/documents/${documentId}/lines`, undefined, qs);
}

export async function cloudGetDocumentLine(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const lineId = this.getNodeParameter('lineId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/documents/${documentId}/lines/${lineId}`);
}

export async function cloudCreateDocumentLine(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const confirmCreditLimit = this.getNodeParameter('confirmCreditLimit', i, false) as boolean;
	const body = this.getNodeParameter('lineData', i) as IDataObject;
	const qs: IDataObject = {};
	if (confirmCreditLimit) qs.confirmCreditLimit = true;
	return cloudApiRequest.call(this, 'POST', `/documents/${documentId}/lines`, body, qs);
}

export async function cloudUpdateDocumentLine(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const lineId = this.getNodeParameter('lineId', i) as string;
	const confirmCreditLimit = this.getNodeParameter('confirmCreditLimit', i, false) as boolean;
	const body = this.getNodeParameter('lineData', i) as IDataObject;
	const qs: IDataObject = {};
	if (confirmCreditLimit) qs.confirmCreditLimit = true;
	return cloudApiRequest.call(this, 'POST', `/documents/${documentId}/lines/${lineId}`, body, qs);
}

export async function cloudDeleteDocumentLine(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const lineId = this.getNodeParameter('lineId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/documents/${documentId}/lines/${lineId}`);
}
