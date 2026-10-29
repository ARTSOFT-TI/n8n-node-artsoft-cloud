import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

export async function cloudListBillings(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/documents/billings', i);
}

export async function cloudListBillingsBySaftType(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	const saftType = this.getNodeParameter('saftType', i) as string;
	return cloudApiRequestAllItems.call(this, `/documents/billings/${saftType}`, i);
}

export async function cloudListPurchases(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/documents/purchases', i);
}

export async function cloudListPurchasesBySaftType(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	const saftType = this.getNodeParameter('saftType', i) as string;
	return cloudApiRequestAllItems.call(this, `/documents/purchases/${saftType}`, i);
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
	const idWarehouse = this.getNodeParameter('idWarehouse', i, 1) as number;
	const additional = this.getNodeParameter('documentAdditionalFields', i, {}) as IDataObject;
	const idThirdParty = additional.idThirdParty as number | undefined;
	const fiscalNumber = additional.fiscalNumber as string | undefined;
	const createThirdParty = additional.createThirdParty as boolean | undefined;
	const docDateRaw = additional.docDate as string | undefined;

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
	const additional = this.getNodeParameter('documentUpdateFields', i, {}) as IDataObject;
	const sign = (additional.sign as boolean) ?? false;

	const body: IDataObject = {};

	// — Campos principais —
	if (additional.comment !== undefined) body.comment = additional.comment;
	if (additional.idVatTypeExemption !== undefined) body.idVatTypeExemption = additional.idVatTypeExemption;
	if (additional.discountPercent !== undefined) body.total = { discountPercent: additional.discountPercent };

	// — financialInfo (obrigatórios + opcionais) —
	const docReference = additional.docReference as string | undefined;
	const idPayCond = additional.idPayCond as number | undefined;
	const financialExtra = this.getNodeParameter('documentFinancialInfo', i, {}) as IDataObject;
	const financialInfo: IDataObject = {};
	if (docReference !== undefined) financialInfo.docReference = docReference;
	if (idPayCond !== undefined) financialInfo.idPayCond = idPayCond;
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
