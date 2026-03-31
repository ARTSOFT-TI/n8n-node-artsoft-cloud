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
	const idSerie = this.getNodeParameter('idSerie', i) as number;
	const idThirdParty = this.getNodeParameter('idThirdParty', i, 0) as number;
	const fiscalNumber = this.getNodeParameter('fiscalNumber', i, '') as string;
	const idWarehouse = this.getNodeParameter('idWarehouse', i, 1) as number;
	const createThirdParty = this.getNodeParameter('createThirdParty', i, false) as boolean;
	const docDateRaw = this.getNodeParameter('docDate', i, '') as string;

	const body: IDataObject = { idSerie, idWarehouse };

	if (fiscalNumber) {
		body.fiscalNumber = fiscalNumber;
	}
	if (idThirdParty) {
		body.idThirdParty = idThirdParty;
	}
	if (createThirdParty) {
		body.createThirdParty = true;
	}
	if (docDateRaw) {
		// Converter para YYYY-MM-DD
		const d = new Date(docDateRaw);
		body.docDate = d.toISOString().split('T')[0];
	} else {
		body.docDate = new Date().toISOString().split('T')[0];
	}

	return cloudApiRequest.call(this, 'POST', '/documents/header', body);
}

export async function cloudUpdateDocument(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('documentId', i) as string;
	const sign = this.getNodeParameter('sign', i, false) as boolean;

	const body: IDataObject = {};

	// — Campos principais —
	const comment = this.getNodeParameter('documentComment', i, '') as string;
	if (comment) body.comment = comment;

	const idVatTypeExemption = this.getNodeParameter('documentIdVatTypeExemption', i, 0) as number;
	if (idVatTypeExemption) body.idVatTypeExemption = idVatTypeExemption;

	const discountPercent = this.getNodeParameter('documentDiscountPercent', i, 0) as number;
	if (discountPercent) body.total = { discountPercent };

	// — financialInfo (obrigatórios + opcionais) —
	const docReference = this.getNodeParameter('documentDocReference', i, '') as string;
	const idPayCond = this.getNodeParameter('documentIdPayCond', i, 0) as number;
	const financialExtra = this.getNodeParameter('documentFinancialInfo', i, {}) as IDataObject;
	const financialInfo: IDataObject = {};
	if (docReference) financialInfo.docReference = docReference;
	if (idPayCond) financialInfo.idPayCond = idPayCond;
	if (financialExtra.idSalesPerson) financialInfo.idSalesPerson = financialExtra.idSalesPerson;
	if (Object.keys(financialInfo).length > 0) body.financialInfo = financialInfo;

	// — thirdParty (opcional) —
	const tpAddress = this.getNodeParameter('documentThirdPartyAddress', i, {}) as IDataObject;
	const tpContact = this.getNodeParameter('documentThirdPartyContact', i, {}) as IDataObject;
	const hasAddress = Object.keys(tpAddress).length > 0;
	const hasContact = Object.keys(tpContact).length > 0;
	if (hasAddress || hasContact) {
		const thirdParty: IDataObject = {};
		if (hasAddress) thirdParty.address = tpAddress;
		if (hasContact) thirdParty.contact = tpContact;
		body.thirdParty = thirdParty;
	}

	// — loadPlace (opcional) —
	const loadPlace = this.getNodeParameter('documentLoadPlace', i, {}) as IDataObject;
	if (Object.keys(loadPlace).length > 0) body.loadPlace = loadPlace;

	// — deliveryPlace (opcional) —
	const deliveryPlace = this.getNodeParameter('documentDeliveryPlace', i, {}) as IDataObject;
	if (Object.keys(deliveryPlace).length > 0) body.deliveryPlace = deliveryPlace;

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
