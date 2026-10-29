import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { cloudApiRequest, cloudApiRequestAllItems } from '../GenericFunctions';

function buildSalespersonPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('salespersonAdditionalFields', i, {}) as IDataObject;
	const countryCode = context.getNodeParameter('salespersonCountryCode', i, 620) as number;
	const countryRegionId = context.getNodeParameter('salespersonCountryRegionId', i, 25) as number;

	return {
		number: context.getNodeParameter('salespersonNumber', i) as number,
		name: context.getNodeParameter('salespersonName', i) as string,
		shortName: context.getNodeParameter('salespersonShortName', i) as string,
		email: context.getNodeParameter('salespersonEmail', i, '') as string,
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
			name: context.getNodeParameter('salespersonAddress', i, '') as string,
			status: 'ACTIVE',
			address: context.getNodeParameter('salespersonAddress', i, '') as string,
			postalCodeNumeric: context.getNodeParameter('salespersonPostalCode', i, '') as string,
			locality: context.getNodeParameter('salespersonLocality', i, '') as string,
			countryCode,
			countryRegionId,
			parish: context.getNodeParameter('salespersonParish', i, 0) as number,
			county: context.getNodeParameter('salespersonCounty', i, 0) as number,
			district: context.getNodeParameter('salespersonDistrict', i, 0) as number,
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

	const email = context.getNodeParameter('salespersonEmail', i, '') as string;
	if (email) body.email = email;

	const fiscalNumber = context.getNodeParameter('salespersonFiscalNumber', i, '') as string;
	if (fiscalNumber) {
		body.taxPayer = { ...(body.taxPayer as IDataObject), fiscalNumber };
	}

	// Morada — só sobrescreve campos preenchidos
	const currentAddress = (body.mainAddress as IDataObject) ?? {};
	const address = context.getNodeParameter('salespersonAddress', i, '') as string;
	const locality = context.getNodeParameter('salespersonLocality', i, '') as string;
	const postalCode = context.getNodeParameter('salespersonPostalCode', i, '') as string;
	const district = context.getNodeParameter('salespersonDistrict', i, 0) as number;
	const county = context.getNodeParameter('salespersonCounty', i, 0) as number;
	const parish = context.getNodeParameter('salespersonParish', i, 0) as number;
	const countryRegionId = context.getNodeParameter('salespersonCountryRegionId', i, 0) as number;
	const countryCode = context.getNodeParameter('salespersonCountryCode', i, 0) as number;

	if (address) { currentAddress.address = address; currentAddress.name = address; }
	if (locality) currentAddress.locality = locality;
	if (postalCode) currentAddress.postalCodeNumeric = postalCode;
	if (district) currentAddress.district = district;
	if (county) currentAddress.county = county;
	if (parish) currentAddress.parish = parish;
	if (countryRegionId) currentAddress.countryRegionId = countryRegionId;
	if (countryCode) currentAddress.countryCode = countryCode;
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
