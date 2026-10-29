import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

function buildSupplierPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('supplierAdditionalFields', i, {}) as IDataObject;

	return {
		number: context.getNodeParameter('supplierNumber', i) as number,
		name: context.getNodeParameter('supplierName', i) as string,
		shortName: context.getNodeParameter('supplierShortName', i) as string,
		birthDate: (additional.birthDate as string) ?? '',
		status: (additional.status as string) ?? 'ACTIVE',
		inactive: (additional.inactive as boolean) ?? false,
		isCompany: (additional.isCompany as boolean) ?? false,
		mainAddress: {
			name: (additional.address as string) ?? '',
			status: 'ACTIVE',
			parish: (additional.parish as number) ?? 0,
			county: (additional.county as number) ?? 0,
			district: (additional.district as number) ?? 0,
			postalCodeNumeric: (additional.postalCode as string) ?? '',
			countryCode: (additional.countryCode as number) ?? 620,
			countryRegionId: (additional.countryRegionId as number) ?? 0,
			address: (additional.address as string) ?? '',
			locality: (additional.locality as string) ?? '',
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
			countryCode: (additional.countryCode as number) ?? 620,
			status: 0,
			valid: true,
		},
		companyDetails: {
			eori: (additional.eori as string) ?? '',
			tradeName: (additional.tradeName as string) ?? '',
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

	if (additional.isCompany !== undefined) body.isCompany = additional.isCompany;

	// Morada — só sobrescreve os campos que o utilizador adicionou
	const currentAddress = (body.mainAddress as IDataObject) ?? {};
	if (additional.address !== undefined) {
		currentAddress.address = additional.address;
		currentAddress.name = additional.address;
	}
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
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/suppliers/', i);
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
