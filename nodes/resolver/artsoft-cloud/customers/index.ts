import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

function buildCustomerPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('customerAdditionalFields', i, {}) as IDataObject;

	return {
		number: context.getNodeParameter('customerNumber', i) as number,
		name: context.getNodeParameter('customerName', i) as string,
		shortName: context.getNodeParameter('customerShortName', i) as string,
		birthDate: (additional.birthDate as string) ?? '',
		status: (additional.status as string) ?? 'ACTIVE',
		inactive: (additional.inactive as boolean) ?? false,
		isCompany: context.getNodeParameter('customerIsCompany', i) as boolean,
		inactivationDate: new Date().toISOString(),
		flags: {},
		email: context.getNodeParameter('customerEmail', i, '') as string,
		documentDeliveryEmail: (additional.documentDeliveryEmail as string) ?? '',
		mainAddress: {
			name: '',
			status: 'ACTIVE',
			parish: context.getNodeParameter('customerParish', i, 0) as number,
			county: context.getNodeParameter('customerCounty', i, 0) as number,
			district: context.getNodeParameter('customerDistrict', i, 0) as number,
			postalCodeNumeric: context.getNodeParameter('customerPostalCode', i, '') as string,
			countryCode: context.getNodeParameter('customerCountryCode', i, 620) as number,
			countryRegionId: context.getNodeParameter('customerCountryRegionId', i, 0) as number,
			address: context.getNodeParameter('customerAddress', i, '') as string,
			locality: context.getNodeParameter('customerLocality', i, '') as string,
		},
		taxPayer: {
			fiscalNumber: context.getNodeParameter('customerFiscalNumber', i) as string,
			countryCode: context.getNodeParameter('customerCountryCode', i, 620) as number,
			status: 0,
			valid: true,
		},
		companyDetails: {
			eori: context.getNodeParameter('customerEori', i, '') as string,
			tradeName: context.getNodeParameter('customerTradeName', i, '') as string,
		},
		customerStatusId: (additional.customerStatusId as number) ?? 1,
		exemptVatId: (additional.exemptVatId as string) ?? '',
		expeditionModeId: (additional.expeditionModeId as string) ?? '',
		addresses: [],
		staffs: [],
		salespersons: [],
		observations: { observation1: (additional.observation1 as string) ?? '' },
		url: (additional.url as string) ?? '',
		seriesIds: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		createdBy: 0,
		updatedBy: 0,
		creditLimit: (additional.creditLimit as string) ?? '',
		discount: (additional.discount as string) ?? '',
		noMbReferences: (additional.noMbReferences as boolean) ?? false,
		phoneNumberCountryId: (additional.phoneNumberCountryId as number) ?? 620,
		mobileNumberCountryId: (additional.mobileNumberCountryId as number) ?? 620,
		anonymous: (additional.anonymous as boolean) ?? false,
		privateRecord: (additional.privateRecord as boolean) ?? false,
		concealmentReason: null,
		thirdPartyCAEList: [],
	};
}

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
	const body = buildCustomerPayload(this, i);
	return cloudApiRequest.call(this, 'POST', '/customers/', body);
}

function applyCustomerChanges(
	current: Record<string, unknown>,
	context: IExecuteFunctions,
	i: number,
): IDataObject {
	const body = { ...current } as IDataObject;
	const additional = context.getNodeParameter('customerAdditionalFields', i, {}) as IDataObject;

	// Campos principais — só sobrescreve se o utilizador preencheu
	const name = context.getNodeParameter('customerName', i, '') as string;
	if (name) body.name = name;

	const shortName = context.getNodeParameter('customerShortName', i, '') as string;
	if (shortName) body.shortName = shortName;

	const number = context.getNodeParameter('customerNumber', i, 0) as number;
	if (number) body.number = number;

	const fiscalNumber = context.getNodeParameter('customerFiscalNumber', i, '') as string;
	if (fiscalNumber) {
		body.taxPayer = {
			...(body.taxPayer as IDataObject),
			fiscalNumber,
		};
	}

	body.isCompany = context.getNodeParameter('customerIsCompany', i, false) as boolean;

	const email = context.getNodeParameter('customerEmail', i, '') as string;
	if (email) body.email = email;

	// Morada — só sobrescreve campos preenchidos
	const currentAddress = (body.mainAddress as IDataObject) ?? {};
	const address = context.getNodeParameter('customerAddress', i, '') as string;
	const locality = context.getNodeParameter('customerLocality', i, '') as string;
	const postalCode = context.getNodeParameter('customerPostalCode', i, '') as string;
	const district = context.getNodeParameter('customerDistrict', i, 0) as number;
	const county = context.getNodeParameter('customerCounty', i, 0) as number;
	const parish = context.getNodeParameter('customerParish', i, 0) as number;
	const countryRegionId = context.getNodeParameter('customerCountryRegionId', i, 0) as number;
	const countryCode = context.getNodeParameter('customerCountryCode', i, 0) as number;

	if (address) currentAddress.address = address;
	if (locality) currentAddress.locality = locality;
	if (postalCode) currentAddress.postalCodeNumeric = postalCode;
	if (district) currentAddress.district = district;
	if (county) currentAddress.county = county;
	if (parish) currentAddress.parish = parish;
	if (countryRegionId) currentAddress.countryRegionId = countryRegionId;
	if (countryCode) currentAddress.countryCode = countryCode;
	body.mainAddress = currentAddress;

	// Empresa
	if (body.isCompany) {
		const currentCompany = (body.companyDetails as IDataObject) ?? {};
		const tradeName = context.getNodeParameter('customerTradeName', i, '') as string;
		const eori = context.getNodeParameter('customerEori', i, '') as string;
		if (tradeName) currentCompany.tradeName = tradeName;
		if (eori) currentCompany.eori = eori;
		body.companyDetails = currentCompany;
	}

	// Campos adicionais
	if (additional.status !== undefined) body.status = additional.status;
	if (additional.inactive !== undefined) body.inactive = additional.inactive;
	if (additional.birthDate !== undefined) body.birthDate = additional.birthDate;
	if (additional.customerStatusId !== undefined) body.customerStatusId = additional.customerStatusId;
	if (additional.documentDeliveryEmail !== undefined) body.documentDeliveryEmail = additional.documentDeliveryEmail;
	if (additional.creditLimit !== undefined) body.creditLimit = additional.creditLimit;
	if (additional.discount !== undefined) body.discount = additional.discount;
	if (additional.exemptVatId !== undefined) body.exemptVatId = additional.exemptVatId;
	if (additional.expeditionModeId !== undefined) body.expeditionModeId = additional.expeditionModeId;
	if (additional.observation1 !== undefined) body.observations = { observation1: additional.observation1 };
	if (additional.url !== undefined) body.url = additional.url;
	if (additional.noMbReferences !== undefined) body.noMbReferences = additional.noMbReferences;
	if (additional.anonymous !== undefined) body.anonymous = additional.anonymous;
	if (additional.privateRecord !== undefined) body.privateRecord = additional.privateRecord;
	if (additional.phoneNumberCountryId !== undefined) body.phoneNumberCountryId = additional.phoneNumberCountryId;
	if (additional.mobileNumberCountryId !== undefined) body.mobileNumberCountryId = additional.mobileNumberCountryId;

	return body;
}

export async function cloudUpdateCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('customerId', i) as string;
	const current = await cloudApiRequest.call(this, 'GET', `/customers/${id}`);
	const body = applyCustomerChanges(current, this, i);
	return cloudApiRequest.call(this, 'PUT', `/customers/${id}`, body);
}

export async function cloudDeleteCustomer(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('customerId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/customers/${id}`);
}
