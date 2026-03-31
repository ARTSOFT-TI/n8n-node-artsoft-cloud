import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

function buildSupplierPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('supplierAdditionalFields', i, {}) as IDataObject;

	return {
		number: context.getNodeParameter('supplierNumber', i) as number,
		name: context.getNodeParameter('supplierName', i) as string,
		shortName: context.getNodeParameter('supplierShortName', i) as string,
		birthDate: (additional.birthDate as string) ?? '',
		status: (additional.status as string) ?? 'ACTIVE',
		inactive: (additional.inactive as boolean) ?? false,
		isCompany: context.getNodeParameter('supplierIsCompany', i) as boolean,
		mainAddress: {
			name: context.getNodeParameter('supplierAddress', i, '') as string,
			status: 'ACTIVE',
			parish: context.getNodeParameter('supplierParish', i, 0) as number,
			county: context.getNodeParameter('supplierCounty', i, 0) as number,
			district: context.getNodeParameter('supplierDistrict', i, 0) as number,
			postalCodeNumeric: context.getNodeParameter('supplierPostalCode', i, '') as string,
			countryCode: context.getNodeParameter('supplierCountryCode', i, 620) as number,
			countryRegionId: context.getNodeParameter('supplierCountryRegionId', i, 0) as number,
			address: context.getNodeParameter('supplierAddress', i, '') as string,
			locality: context.getNodeParameter('supplierLocality', i, '') as string,
			addressNumber: 0,
			latitude: 0,
			longitude: 0,
			addressSubunit: '',
			postalCodeAlpha: '',
			localId: 0,
			hasCurrentAccount: false,
			validUntil: new Date().toISOString(),
		},
		taxPayer: {
			fiscalNumber: context.getNodeParameter('supplierFiscalNumber', i) as string,
			countryCode: context.getNodeParameter('supplierCountryCode', i, 620) as number,
			status: 0,
			valid: true,
		},
		companyDetails: {
			eori: context.getNodeParameter('supplierEori', i, '') as string,
			tradeName: context.getNodeParameter('supplierTradeName', i, '') as string,
		},
		supplierStatusId: (additional.supplierStatusId as number) ?? 1,
		addresses: [],
		staffs: [],
		observations: { observation1: (additional.observation1 as string) ?? '' },
		url: (additional.url as string) ?? '',
		swift: (additional.swift as string) ?? '',
		iban: (additional.iban as string) ?? '',
		priceId: (additional.priceId as number) || null,
		seriesIds: [],
		hierarchies: {},
		phoneNumberCountryId: (additional.phoneNumberCountryId as number) ?? 620,
		mobileNumberCountryId: (additional.mobileNumberCountryId as number) ?? 620,
		anonymous: (additional.anonymous as boolean) ?? false,
		privateRecord: (additional.privateRecord as boolean) ?? false,
		concealmentReason: null,
		thirdPartyCAEList: [],
	};
}

function applySupplierChanges(
	current: Record<string, unknown>,
	context: IExecuteFunctions,
	i: number,
): IDataObject {
	const body = { ...current } as IDataObject;
	const additional = context.getNodeParameter('supplierAdditionalFields', i, {}) as IDataObject;

	const name = context.getNodeParameter('supplierName', i, '') as string;
	if (name) body.name = name;

	const shortName = context.getNodeParameter('supplierShortName', i, '') as string;
	if (shortName) body.shortName = shortName;

	const number = context.getNodeParameter('supplierNumber', i, 0) as number;
	if (number) body.number = number;

	const fiscalNumber = context.getNodeParameter('supplierFiscalNumber', i, '') as string;
	if (fiscalNumber) {
		body.taxPayer = { ...(body.taxPayer as IDataObject), fiscalNumber };
	}

	body.isCompany = context.getNodeParameter('supplierIsCompany', i, false) as boolean;

	// Morada — só sobrescreve campos preenchidos
	const currentAddress = (body.mainAddress as IDataObject) ?? {};
	const address = context.getNodeParameter('supplierAddress', i, '') as string;
	const locality = context.getNodeParameter('supplierLocality', i, '') as string;
	const postalCode = context.getNodeParameter('supplierPostalCode', i, '') as string;
	const district = context.getNodeParameter('supplierDistrict', i, 0) as number;
	const county = context.getNodeParameter('supplierCounty', i, 0) as number;
	const parish = context.getNodeParameter('supplierParish', i, 0) as number;
	const countryRegionId = context.getNodeParameter('supplierCountryRegionId', i, 0) as number;
	const countryCode = context.getNodeParameter('supplierCountryCode', i, 0) as number;

	if (address) { currentAddress.address = address; currentAddress.name = address; }
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
		const tradeName = context.getNodeParameter('supplierTradeName', i, '') as string;
		const eori = context.getNodeParameter('supplierEori', i, '') as string;
		if (tradeName) currentCompany.tradeName = tradeName;
		if (eori) currentCompany.eori = eori;
		body.companyDetails = currentCompany;
	}

	// Campos adicionais
	if (additional.status !== undefined) body.status = additional.status;
	if (additional.inactive !== undefined) body.inactive = additional.inactive;
	if (additional.birthDate !== undefined) body.birthDate = additional.birthDate;
	if (additional.supplierStatusId !== undefined) body.supplierStatusId = additional.supplierStatusId;
	if (additional.url !== undefined) body.url = additional.url;
	if (additional.swift !== undefined) body.swift = additional.swift;
	if (additional.iban !== undefined) body.iban = additional.iban;
	if (additional.priceId !== undefined) body.priceId = (additional.priceId as number) || null;
	if (additional.observation1 !== undefined) body.observations = { observation1: additional.observation1 };
	if (additional.anonymous !== undefined) body.anonymous = additional.anonymous;
	if (additional.privateRecord !== undefined) body.privateRecord = additional.privateRecord;
	if (additional.phoneNumberCountryId !== undefined) body.phoneNumberCountryId = additional.phoneNumberCountryId;
	if (additional.mobileNumberCountryId !== undefined) body.mobileNumberCountryId = additional.mobileNumberCountryId;

	return body;
}

export async function cloudListSuppliers(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/suppliers/', undefined, qs);
}

export async function cloudGetSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/suppliers/${id}`);
}

export async function cloudCreateSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = buildSupplierPayload(this, i);
	return cloudApiRequest.call(this, 'POST', '/suppliers/', body);
}

export async function cloudUpdateSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	const current = await cloudApiRequest.call(this, 'GET', `/suppliers/${id}`);
	const body = applySupplierChanges(current, this, i);
	return cloudApiRequest.call(this, 'PUT', `/suppliers/${id}`, body);
}

export async function cloudDeleteSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/suppliers/${id}`);
}
