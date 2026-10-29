/* eslint-disable */
import * as fs from 'fs';
import * as path from 'path';
import * as customers from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/customers';
import * as suppliers from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/suppliers';
import * as salespersons from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/salespersons';
import * as products from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/products';
import * as documents from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/documents';
import * as currAccount from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/curr-account';
import * as lines from '../../nodes/ArtsoftCloud/resolver/artsoft-cloud/document-lines';

// Characterization tests: the request each create/update operation sends to the API must not
// change when parameters move between the top level and the Additional Fields collections.
// Set UPDATE_GOLDEN=1 to (re)write the reference payloads.

const GOLDEN_DIR = path.join(__dirname, '__golden__');
const NOW = new Date('2026-01-15T10:00:00.000Z');

function run(handler: Function, params: Record<string, unknown>, current: object = {}) {
	const calls: any[] = [];
	const context: any = {
		getNodeParameter: (name: string, _i: number, fallback?: unknown) => {
			if (name in params) return params[name];
			if (fallback === undefined) throw new Error(`Missing parameter: ${name}`);
			return fallback;
		},
		getCredentials: async () => ({ nif: '999999999', apiKey: 'k', development: false }),
		getNode: () => ({ name: 'ARTSOFT' }),
		helpers: {
			httpRequestWithAuthentication: async (_c: string, o: any) => {
				calls.push({ method: o.method, url: o.url.replace(/^https:\/\/[^/]+\/api/, ''), qs: o.qs, body: o.body });
				return o.method === 'GET' ? current : {};
			},
		},
	};
	return handler.call(context, 0).then(() => calls[calls.length - 1]);
}

type Case = { name: string; handler: Function; params: Record<string, unknown>; current?: object };

const cases: Case[] = [
	// ── customers ──
	{
		name: 'customers-create-full',
		handler: customers.cloudCreateCustomer,
		params: {
			customerNumber: 7, customerName: 'Cliente Um', customerShortName: 'CU', customerFiscalNumber: '999999990',
			customerAdditionalFields: {
				isCompany: true, email: 'a@b.pt', address: 'Rua A 1', locality: 'Lisboa', postalCode: '1000-001',
				district: 11, county: 6, parish: 3, countryRegionId: 25, countryCode: 620, tradeName: 'Um Lda', eori: 'PT123',
				birthDate: '1990-01-01', observation1: 'nota',
			},
		},
	},
	{
		name: 'customers-create-minimal',
		handler: customers.cloudCreateCustomer,
		params: {
			customerNumber: 8, customerName: 'Cliente Dois', customerShortName: 'CD', customerFiscalNumber: '999999991',
			customerAdditionalFields: {},
		},
	},
	{
		name: 'customers-update',
		handler: customers.cloudUpdateCustomer,
		current: {
			id: 5, name: 'Old', shortName: 'O', number: 1, taxPayer: { fiscalNumber: '1', countryCode: 620 },
			mainAddress: { address: 'old', countryCode: 620, district: 1 }, companyDetails: { tradeName: 'x' }, isCompany: true,
		},
		params: {
			customerId: '5', customerName: 'Novo', customerShortName: '', customerNumber: 0, customerFiscalNumber: '',
			customerAdditionalFields: { isCompany: true, email: 'n@x.pt', address: 'Nova', postalCode: '2000-001', tradeName: 'Novo Lda', url: 'http://x' },
		},
	},
	// ── suppliers ──
	{
		name: 'suppliers-create-full',
		handler: suppliers.cloudCreateSupplier,
		params: {
			supplierNumber: 3, supplierName: 'Forn Um', supplierShortName: 'FU', supplierFiscalNumber: '999999992',
			supplierAdditionalFields: {
				isCompany: true, address: 'Rua B 2', locality: 'Porto', postalCode: '4000-001', district: 13, county: 1, parish: 2,
				countryRegionId: 25, countryCode: 620, tradeName: 'Forn Lda', eori: 'PT456', iban: 'PT50000', priceId: 2,
			},
		},
	},
	{
		name: 'suppliers-create-minimal',
		handler: suppliers.cloudCreateSupplier,
		params: {
			supplierNumber: 4, supplierName: 'Forn Dois', supplierShortName: 'FD', supplierFiscalNumber: '999999993',
			supplierAdditionalFields: {},
		},
	},
	{
		name: 'suppliers-update',
		handler: suppliers.cloudUpdateSupplier,
		current: {
			id: 6, name: 'Old', shortName: 'O', number: 1, taxPayer: { fiscalNumber: '1', countryCode: 620 },
			mainAddress: { address: 'old', name: 'old', countryCode: 620 }, companyDetails: { tradeName: 'x' }, isCompany: true,
		},
		params: {
			supplierId: '6', supplierName: 'Novo', supplierShortName: '', supplierNumber: 0, supplierFiscalNumber: '',
			supplierAdditionalFields: { isCompany: true, address: 'Nova', locality: 'Faro', tradeName: 'Novo Lda', eori: 'PT9', swift: 'ABC' },
		},
	},
	// ── salespersons ──
	{
		name: 'salespersons-create-full',
		handler: salespersons.cloudCreateSalesperson,
		params: {
			salespersonNumber: 2, salespersonName: 'Vend Um', salespersonShortName: 'VU', salespersonFiscalNumber: '999999994',
			salespersonAdditionalFields: {
				email: 'v@x.pt', address: 'Rua C 3', locality: 'Braga', postalCode: '4700-001', district: 3, county: 4, parish: 5,
				countryRegionId: 25, countryCode: 620, observation1: 'obs',
			},
		},
	},
	{
		name: 'salespersons-create-minimal',
		handler: salespersons.cloudCreateSalesperson,
		params: {
			salespersonNumber: 5, salespersonName: 'Vend Dois', salespersonShortName: 'VD', salespersonFiscalNumber: '999999995',
			salespersonAdditionalFields: {},
		},
	},
	{
		name: 'salespersons-update',
		handler: salespersons.cloudUpdateSalesperson,
		current: {
			id: 9, name: 'Old', shortName: 'O', number: 1, taxPayer: { fiscalNumber: '1', countryCode: 620 },
			mainAddress: { address: 'old', name: 'old', countryCode: 620, countryRegionId: 25 },
		},
		params: {
			salespersonId: '9', salespersonName: 'Novo', salespersonShortName: '', salespersonNumber: 0, salespersonFiscalNumber: '',
			salespersonAdditionalFields: { email: 'n@x.pt', address: 'Nova', locality: 'Viseu', inactive: true },
		},
	},
	// ── products ──
	{
		name: 'products-create-full',
		handler: products.cloudCreateProduct,
		params: {
			productSku: 'P-1', productMainName: 'Produto',
			productPrices: { priceValues: [{ price: 9.5, number: 1, currencyId: 1, beginDate: '2026-01-01', endDate: '2026-12-31' }] },
			productOptionalCodes: {},
			productAdditionalFields: {
				saftClass: 'SAFT_SERV', vatType: 'ISENTO', inventaryClass: 'MATERIAS_PRIMAS', warehouseId: 2, unitCodeId: 1,
				quantityDecimalPlaces: 3, obs: 'x',
			},
		},
	},
	{
		name: 'products-create-minimal',
		handler: products.cloudCreateProduct,
		params: {
			productSku: 'P-2', productMainName: 'Produto 2', productPrices: {}, productOptionalCodes: {}, productAdditionalFields: {},
		},
	},
	{
		name: 'products-update',
		handler: products.cloudUpdateProduct,
		current: {
			id: 4, sku: 'P-1', mainName: 'Old', saftClass: 'SAFT_PROD', vatType: 'NORMAL', inventaryClass: 'MERCADORIAS',
			unitCodeId: 1, quantityDecimalPlaces: 2, warehouse: { id: 1, retired: false }, flags: {}, prices: [], optionalCodes: [],
		},
		params: {
			productId: '4', productSku: '', productMainName: 'Novo nome', productPrices: {}, productOptionalCodes: {},
			productAdditionalFields: {
				saftClass: 'SAFT_SERV', vatType: 'ISENTO', inventaryClass: 'MATERIAS_PRIMAS', warehouseId: 2, unitCodeId: 3,
				quantityDecimalPlaces: 4, obs: 'y',
			},
		},
	},
	// ── documents ──
	{
		name: 'documents-create-full',
		handler: documents.cloudCreateDocumentHeader,
		params: {
			idSerie: 3, idWarehouse: 2,
			documentAdditionalFields: { idThirdParty: 10, fiscalNumber: '999999990', createThirdParty: true, docDate: '2026-03-01' },
		},
	},
	{
		name: 'documents-create-minimal',
		handler: documents.cloudCreateDocumentHeader,
		params: { idSerie: 3, idWarehouse: 1, documentAdditionalFields: {} },
	},
	{
		name: 'documents-update',
		handler: documents.cloudUpdateDocument,
		params: {
			documentId: '12',
			documentUpdateFields: { sign: true, comment: 'c', docReference: 'R1', idPayCond: 4, idVatTypeExemption: 2, discountPercent: 5 },
			documentFinancialInfo: { idSalesPerson: 9 },
			documentThirdPartyAddress: {}, documentThirdPartyContact: {}, documentLoadPlace: {}, documentDeliveryPlace: {},
		},
	},
	{
		name: 'documents-update-empty',
		handler: documents.cloudUpdateDocument,
		params: {
			documentId: '12', documentUpdateFields: {}, documentFinancialInfo: {},
			documentThirdPartyAddress: {}, documentThirdPartyContact: {}, documentLoadPlace: {}, documentDeliveryPlace: {},
		},
	},
	// ── current account ──
	{
		name: 'curr-account-entry-full',
		handler: currAccount.cloudCreateCurrAccountEntry,
		params: {
			caIdSerie: 1, caIdThirdParty: 2, caValCurrAcc: 100,
			caAdditionalFields: { fiscalNumber: '999', balance: 50, docDate: '2026-02-02', comment: 'c', docReference: 'ref', vencDate: '2026-03-03' },
			caCurrAccEntryVat: { vatValues: [{ vatType: 'NORMAL', vatBase: 100 }] },
		},
	},
	{
		name: 'curr-account-entry-minimal',
		handler: currAccount.cloudCreateCurrAccountEntry,
		params: { caIdSerie: 1, caIdThirdParty: 2, caValCurrAcc: 100, caAdditionalFields: {}, caCurrAccEntryVat: {} },
	},
	{
		name: 'curr-account-regul-full',
		handler: currAccount.cloudCreateCurrAccountRegul,
		params: {
			caIdSerie: 1, caIdThirdParty: 2, caValCurrAcc: 100,
			caAdditionalFields: { fiscalNumber: '999', balance: 50, docDate: '2026-02-02', comment: 'c', docReference: 'ref' },
			caToRegulList: { regulValues: [{ id: 1, regulValue: 10, value: 10, balance: 0 }] },
		},
	},
	{
		name: 'curr-account-update',
		handler: currAccount.cloudUpdateCurrAccount,
		params: {
			currAccountId: '8',
			caUpdateAdditionalFields: { comment: 'novo', docReference: 'R2', valCurrAcc: 75, balance: 25, docDate: '2026-04-04', isSigned: true },
			caUpdateToRegulList: {}, caCurrAccEntryVat: {},
		},
	},
	// ── document lines ──
	{
		name: 'lines-create',
		handler: lines.cloudCreateDocumentLine,
		params: {
			documentId: '1', lineIdSku: 5, lineQuantity: 2, lineValUn: 10,
			lineAdditionalFields: { confirmCreditLimit: true, valUnGross: 12 },
		},
	},
	{
		name: 'lines-update',
		handler: lines.cloudUpdateDocumentLine,
		params: {
			documentId: '1', lineId: '3', lineIdSku: 5, lineQuantity: 3, lineValUn: 11,
			lineAdditionalFields: { discountTotalPercent: 10 },
		},
	},
];

describe('request payloads (characterization)', () => {
	beforeAll(() => {
		jest.useFakeTimers({
			now: NOW,
			doNotFake: ['nextTick', 'setImmediate', 'clearImmediate', 'setInterval', 'clearInterval', 'setTimeout', 'clearTimeout', 'queueMicrotask', 'performance', 'hrtime'],
		});
	});
	afterAll(() => jest.useRealTimers());

	it.each(cases.map((c) => [c.name, c] as const))('%s', async (_name, c) => {
		const actual = JSON.parse(JSON.stringify(await run(c.handler, c.params, c.current)));
		const file = path.join(GOLDEN_DIR, `${c.name}.json`);
		if (process.env.UPDATE_GOLDEN) {
			fs.writeFileSync(file, JSON.stringify(actual, null, '\t') + '\n');
			return;
		}
		expect(actual).toEqual(JSON.parse(fs.readFileSync(file, 'utf-8')));
	});
});
