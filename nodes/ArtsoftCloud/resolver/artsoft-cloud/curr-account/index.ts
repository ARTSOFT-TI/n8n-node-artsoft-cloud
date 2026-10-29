import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

function toDateStr(value: string): string {
	if (!value) return new Date().toISOString().split('T')[0];
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
	const parts = value.split('/');
	if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
	return new Date(value).toISOString().split('T')[0];
}

function buildCurrAccountPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('caAdditionalFields', i, {}) as IDataObject;

	const body: IDataObject = {
		idSerie: context.getNodeParameter('caIdSerie', i) as number,
		idThirdParty: context.getNodeParameter('caIdThirdParty', i) as number,
		valCurrAcc: context.getNodeParameter('caValCurrAcc', i) as number,
	};

	body.docDate = toDateStr((additional.docDate as string) ?? '');

	// Campos adicionais
	if (additional.fiscalNumber !== undefined) body.fiscalNumber = additional.fiscalNumber;
	if (additional.balance !== undefined) body.balance = additional.balance;
	if (additional.comment !== undefined) body.comment = additional.comment;
	if (additional.docReference !== undefined) body.docReference = additional.docReference;
	if (additional.vencDate) body.vencDate = toDateStr(additional.vencDate as string);
	if (additional.payDate) body.payDate = toDateStr(additional.payDate as string);
	if (additional.isTotalManualMode !== undefined) body.isTotalManualMode = additional.isTotalManualMode;

	return body;
}

function buildRegulList(context: IExecuteFunctions, i: number): IDataObject[] {
	try {
		const raw = context.getNodeParameter('caToRegulList', i, {}) as IDataObject;
		const items = (raw.regulValues as IDataObject[]) ?? [];
		return items.map((item) => {
			const entry: IDataObject = {
				id: (item.id as number) ?? 0,
				regulValue: (item.regulValue as number) ?? 0,
				value: (item.value as number) ?? 0,
				balance: (item.balance as number) ?? 0,
				type: (item.type as string) ?? 'CREDITOS_CLI',
				isRegulBy: (item.isRegulBy as boolean) ?? false,
				hasTaxes: (item.hasTaxes as boolean) ?? false,
				idDocFr: (item.idDocFr as number) ?? 0,
				docFrInvoiceNumber: null,
				regulDate: null,
			};
			if (item.serie) entry.serie = item.serie;
			if (item.date) entry.date = toDateStr(item.date as string);
			if (item.vencDate) entry.vencDate = toDateStr(item.vencDate as string);
			return entry;
		});
	} catch {
		return [];
	}
}

export async function cloudListCustomerAccounts(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/curr-account/customer', i);
}

export async function cloudListSupplierAccounts(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/curr-account/supplier', i);
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
	const body = buildCurrAccountPayload(this, i);
	body.toRegulList = [];

	// currAccEntryVat
	try {
		const raw = this.getNodeParameter('caCurrAccEntryVat', i, {}) as IDataObject;
		const items = (raw.vatValues as IDataObject[]) ?? [];
		if (items.length > 0) {
			body.currAccEntryVat = items.map((item) => {
				const entry: IDataObject = {
					vatType: (item.vatType as string) ?? 'NORMAL',
					vatBase: (item.vatBase as number) ?? 0,
				};
				const exemption = item.vatTypeExemption as number;
				if (exemption) entry.vatTypeExemptions = [exemption];
				return entry;
			});
		}
	} catch { /* not set */ }

	return cloudApiRequest.call(this, 'POST', '/curr-account/entry', body);
}

export async function cloudCreateCurrAccountRegul(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = buildCurrAccountPayload(this, i);
	const toRegulList = buildRegulList(this, i);
	if (toRegulList.length > 0) body.toRegulList = toRegulList;
	return cloudApiRequest.call(this, 'POST', '/curr-account/regul', body);
}

export async function cloudUpdateCurrAccount(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('currAccountId', i) as string;
	const additional = this.getNodeParameter('caUpdateAdditionalFields', i, {}) as IDataObject;

	const body: IDataObject = {};

	// Campos adicionais
	if (additional.comment !== undefined) body.comment = additional.comment;
	if (additional.docReference !== undefined) body.docReference = additional.docReference;
	if (additional.valCurrAcc !== undefined) body.valCurrAcc = additional.valCurrAcc;
	if (additional.balance !== undefined) body.balance = additional.balance;
	if (additional.docDate) body.docDate = toDateStr(additional.docDate as string);
	if (additional.vencDate) body.vencDate = toDateStr(additional.vencDate as string);
	if (additional.payDate) body.payDate = toDateStr(additional.payDate as string);
	if (additional.idSerie) body.idSerie = additional.idSerie;
	if (additional.idThirdParty) body.idThirdParty = additional.idThirdParty;
	if (additional.thirdPartyName) body.thirdParty = { name: additional.thirdPartyName };
	if (additional.invoiceNumber) body.invoiceNumber = additional.invoiceNumber;
	if (additional.state !== undefined) body.state = additional.state;
	if (additional.isSigned !== undefined) body.isSigned = additional.isSigned;
	if (additional.isTotalManualMode !== undefined) body.isTotalManualMode = additional.isTotalManualMode;
	if (additional.salesPersonId) body.salesPersonId = additional.salesPersonId;
	if (additional.salesPersonName) body.salesPersonName = additional.salesPersonName;
	if (additional.salesPersonFiscalNumber) body.salesPersonFiscalNumber = additional.salesPersonFiscalNumber;

	// toRegulList
	try {
		const raw = this.getNodeParameter('caUpdateToRegulList', i, {}) as IDataObject;
		const items = (raw.regulValues as IDataObject[]) ?? [];
		if (items.length > 0) {
			body.toRegulList = items.map((item) => {
				const entry: IDataObject = {
					id: (item.id as number) ?? 0,
					regulValue: (item.regulValue as number) ?? 0,
					value: (item.value as number) ?? 0,
					balance: (item.balance as number) ?? 0,
					type: (item.type as string) ?? 'CREDITOS_CLI',
					isRegulBy: (item.isRegulBy as boolean) ?? false,
					hasTaxes: (item.hasTaxes as boolean) ?? false,
					idDocFr: (item.idDocFr as number) ?? 0,
					docFrInvoiceNumber: (item.docFrInvoiceNumber as string) || null,
					regulDate: null,
					editable: (item.editable as boolean) ?? true,
				};
				if (item.serie) entry.serie = item.serie;
				if (item.date) entry.date = toDateStr(item.date as string);
				if (item.vencDate) entry.vencDate = toDateStr(item.vencDate as string);
				return entry;
			});
		}
	} catch { /* not set */ }

	// currAccEntryVat
	try {
		const raw = this.getNodeParameter('caCurrAccEntryVat', i, {}) as IDataObject;
		const items = (raw.vatValues as IDataObject[]) ?? [];
		if (items.length > 0) {
			body.currAccEntryVat = items.map((item) => {
				const entry: IDataObject = {
					vatType: (item.vatType as string) ?? 'NORMAL',
					vatBase: (item.vatBase as number) ?? 0,
				};
				const exemption = item.vatTypeExemption as number;
				if (exemption) entry.vatTypeExemptions = [exemption];
				return entry;
			});
		}
	} catch { /* not set */ }

	body.existingTaxData = [];

	return cloudApiRequest.call(this, 'POST', `/curr-account/${id}`, body);
}

export async function cloudDeleteCurrAccount(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('currAccountId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/curr-account/${id}`);
}
