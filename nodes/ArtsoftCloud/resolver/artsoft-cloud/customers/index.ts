import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

function buildCustomerPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('customerAdditionalFields', i, {}) as IDataObject;

	return {
		number: context.getNodeParameter('customerNumber', i) as number,
		name: context.getNodeParameter('customerName', i) as string,
		shortName: context.getNodeParameter('customerShortName', i) as string,
		birthDate: (additional.birthDate as string) ?? '',
		status: (additional.status as string) ?? 'ACTIVE',
		inactive: (additional.inactive as boolean) ?? false,
		isCompany: (additional.isCompany as boolean) ?? false,
		inactivationDate: new Date().toISOString(),
		flags: {},
		email: (additional.email as string) ?? '',
		documentDeliveryEmail: (additional.documentDeliveryEmail as string) ?? '',
		mainAddress: {
			name: '',
			status: 'ACTIVE',
			parish: (additional.parish as number) ?? 0,
			county: (additional.county as number) ?? 0,
			district: (additional.district as number) ?? 0,
			postalCodeNumeric: (additional.postalCode as string) ?? '',
			countryCode: (additional.countryCode as number) ?? 620,
			countryRegionId: (additional.countryRegionId as number) ?? 0,
			address: (additional.address as string) ?? '',
			locality: (additional.locality as string) ?? '',
		},
		taxPayer: {
			fiscalNumber: context.getNodeParameter('customerFiscalNumber', i) as string,
			countryCode: (additional.countryCode as number) ?? 620,
			status: 0,
			valid: true,
		},
		companyDetails: {
			eori: (additional.eori as string) ?? '',
			tradeName: (additional.tradeName as string) ?? '',
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
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/customers/', i);
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

	if (additional.isCompany !== undefined) body.isCompany = additional.isCompany;
	if (additional.email !== undefined) body.email = additional.email;

	// Morada — só sobrescreve os campos que o utilizador adicionou
	const currentAddress = (body.mainAddress as IDataObject) ?? {};
	if (additional.address !== undefined) currentAddress.address = additional.address;
	if (additional.locality !== undefined) currentAddress.locality = additional.locality;
	if (additional.postalCode !== undefined) currentAddress.postalCodeNumeric = additional.postalCode;
	if (additional.district !== undefined) currentAddress.district = additional.district;
	if (additional.county !== undefined) currentAddress.county = additional.county;
	if (additional.parish !== undefined) currentAddress.parish = additional.parish;
	if (additional.countryRegionId !== undefined) currentAddress.countryRegionId = additional.countryRegionId;
	if (additional.countryCode !== undefined) currentAddress.countryCode = additional.countryCode;
	body.mainAddress = currentAddress;

	// Empresa
	if (body.isCompany) {
		const currentCompany = (body.companyDetails as IDataObject) ?? {};
		if (additional.tradeName !== undefined) currentCompany.tradeName = additional.tradeName;
		if (additional.eori !== undefined) currentCompany.eori = additional.eori;
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
