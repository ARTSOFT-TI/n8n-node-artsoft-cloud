import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

function buildSalespersonPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('salespersonAdditionalFields', i, {}) as IDataObject;
	const countryCode = (additional.countryCode as number) ?? 620;
	const countryRegionId = (additional.countryRegionId as number) ?? 25;

	return {
		number: context.getNodeParameter('salespersonNumber', i) as number,
		name: context.getNodeParameter('salespersonName', i) as string,
		shortName: context.getNodeParameter('salespersonShortName', i) as string,
		email: (additional.email as string) ?? '',
		birthDate: (additional.birthDate as string) ?? '',
		status: (additional.status as string) ?? 'ACTIVE',
		inactive: (additional.inactive as boolean) ?? false,
		countryCode: String(countryCode),
		countryRegionId: String(countryRegionId),
		taxPayer: {
			fiscalNumber: context.getNodeParameter('salespersonFiscalNumber', i) as string,
			countryCode,
			status: 0,
			valid: true,
		},
		mainAddress: {
			name: (additional.address as string) ?? '',
			status: 'ACTIVE',
			address: (additional.address as string) ?? '',
			postalCodeNumeric: (additional.postalCode as string) ?? '',
			locality: (additional.locality as string) ?? '',
			countryCode,
			countryRegionId,
			parish: (additional.parish as number) ?? 0,
			county: (additional.county as number) ?? 0,
			district: (additional.district as number) ?? 0,
			addressNumber: 0,
			hasCurrentAccount: false,
			latitude: 0,
			longitude: 0,
			validUntil: new Date().toISOString(),
			addressSubunit: '',
			postalCodeAlpha: '',
			localId: 0,
		},
		observations: { observation1: (additional.observation1 as string) ?? '' },
		phoneNumberCountryId: (additional.phoneNumberCountryId as number) ?? 620,
		mobileNumberCountryId: (additional.mobileNumberCountryId as number) ?? 620,
		anonymous: (additional.anonymous as boolean) ?? false,
		privateRecord: (additional.privateRecord as boolean) ?? false,
		concealmentReason: null,
	};
}

function applySalespersonChanges(
	current: Record<string, unknown>,
	context: IExecuteFunctions,
	i: number,
): IDataObject {
	const body = { ...current } as IDataObject;
	const additional = context.getNodeParameter('salespersonAdditionalFields', i, {}) as IDataObject;

	const name = context.getNodeParameter('salespersonName', i, '') as string;
	if (name) body.name = name;

	const shortName = context.getNodeParameter('salespersonShortName', i, '') as string;
	if (shortName) body.shortName = shortName;

	const number = context.getNodeParameter('salespersonNumber', i, 0) as number;
	if (number) body.number = number;

	if (additional.email !== undefined) body.email = additional.email;

	const fiscalNumber = context.getNodeParameter('salespersonFiscalNumber', i, '') as string;
	if (fiscalNumber) {
		body.taxPayer = { ...(body.taxPayer as IDataObject), fiscalNumber };
	}

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

	// Campos adicionais
	if (additional.status !== undefined) body.status = additional.status;
	if (additional.inactive !== undefined) body.inactive = additional.inactive;
	if (additional.birthDate !== undefined) body.birthDate = additional.birthDate;
	if (additional.observation1 !== undefined) body.observations = { observation1: additional.observation1 };
	if (additional.anonymous !== undefined) body.anonymous = additional.anonymous;
	if (additional.privateRecord !== undefined) body.privateRecord = additional.privateRecord;
	if (additional.phoneNumberCountryId !== undefined) body.phoneNumberCountryId = additional.phoneNumberCountryId;
	if (additional.mobileNumberCountryId !== undefined) body.mobileNumberCountryId = additional.mobileNumberCountryId;

	return body;
}

export async function cloudListSalespersons(
	this: IExecuteFunctions,
	i: number,
): Promise<IDataObject[]> {
	return cloudApiRequestAllItems.call(this, '/salespersons/', i);
}

export async function cloudGetSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/salespersons/${id}`);
}

export async function cloudCreateSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = buildSalespersonPayload(this, i);
	return cloudApiRequest.call(this, 'POST', '/salespersons/', body);
}

export async function cloudUpdateSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	const current = await cloudApiRequest.call(this, 'GET', `/salespersons/${id}`);
	const body = applySalespersonChanges(current, this, i);
	return cloudApiRequest.call(this, 'PUT', `/salespersons/${id}`, body);
}

export async function cloudDeleteSalesperson(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('salespersonId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/salespersons/${id}`);
}
