import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest } from '../GenericFunctions';

function buildLinePayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('lineAdditionalFields', i, {}) as IDataObject;

	const body: IDataObject = {
		idSku: context.getNodeParameter('lineIdSku', i) as number,
		quantity: context.getNodeParameter('lineQuantity', i) as number,
		valUn: context.getNodeParameter('lineValUn', i) as number,
	};

	if (additional.valUnGross) body.valUnGross = additional.valUnGross;
	if (additional.discountTotalPercent) body.discountTotalPercent = additional.discountTotalPercent;

	return body;
}

export async function cloudListDocumentLines(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	const documentId = this.getNodeParameter('documentId', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
	// The endpoint is not paginated: it returns every line in `items`.
	const response = await cloudApiRequest.call(this, 'GET', `/documents/${documentId}/lines`);
	const items = (response.items as IDataObject[] | undefined) ?? [];
	return returnAll ? items : items.slice(0, this.getNodeParameter('limit', i, 50) as number);
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
	const body = buildLinePayload(this, i);
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
	const body = buildLinePayload(this, i);
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
