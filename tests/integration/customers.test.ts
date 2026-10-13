/* eslint-disable */
import { apiRequest } from '../helpers/api-client';

function makeCustomerPayload(number: number, nif: string, name: string, shortName: string) {
	return {
		number,
		name,
		shortName,
		birthDate: '',
		status: 'ACTIVE',
		inactive: false,
		isCompany: false,
		inactivationDate: new Date().toISOString(),
		flags: {},
		email: '',
		documentDeliveryEmail: '',
		mainAddress: {
			name: '',
			status: 'ACTIVE',
			parish: 61,
			county: 6,
			district: 11,
			postalCodeNumeric: '1000-001',
			countryCode: 620,
			countryRegionId: 25,
			address: '',
			locality: 'Lisboa',
		},
		taxPayer: { fiscalNumber: nif, countryCode: 620, status: 0, valid: true },
		companyDetails: { eori: '', tradeName: '' },
		customerStatusId: 1,
		exemptVatId: '',
		expeditionModeId: '',
		addresses: [],
		staffs: [],
		salespersons: [],
		observations: { observation1: '' },
		url: '',
		seriesIds: [],
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		createdBy: 0,
		updatedBy: 0,
		creditLimit: '',
		discount: '',
		noMbReferences: false,
		phoneNumberCountryId: 620,
		mobileNumberCountryId: 620,
		anonymous: false,
		privateRecord: false,
		concealmentReason: null,
		thirdPartyCAEList: [],
	};
}

describe('Customers — Integration', () => {
	let createdId: number | undefined;
	let nextNumber: number;
	const testNif = '5' + String(Date.now()).slice(-8);

	beforeAll(async () => {
		const list = await apiRequest('GET', '/customers/');
		const items = (list.data as any).value ?? [];
		nextNumber = items.length > 0 ? Math.max(...items.map((c: any) => c.number)) + 1 : 1;
	});

	afterAll(async () => {
		if (createdId) {
			await apiRequest('DELETE', `/customers/${createdId}`);
		}
	});

	it('should list customers', async () => {
		const res = await apiRequest('GET', '/customers/');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
		expect((res.data as any).value).toBeDefined();
	});

	it('should create a customer', async () => {
		const payload = makeCustomerPayload(nextNumber, testNif, 'Cliente Teste Jest', 'CTJ');
		const res = await apiRequest('POST', '/customers/', payload);
		expect(res.status).toBe(201);
		createdId = (res.data as any).id;
		expect(createdId).toBeDefined();
	});

	it('should get customer by id', async () => {
		expect(createdId).toBeDefined();
		const res = await apiRequest('GET', `/customers/${createdId}`);
		expect(res.status).toBe(200);
		expect((res.data as any).name).toBe('Cliente Teste Jest');
	});

	it('should update customer (GET + merge + PUT)', async () => {
		expect(createdId).toBeDefined();
		// GET full object
		const get = await apiRequest('GET', `/customers/${createdId}`);
		expect(get.status).toBe(200);
		// Merge changes
		const full = { ...get.data, name: 'Cliente Atualizado Jest', shortName: 'CAJ' };
		const res = await apiRequest('PUT', `/customers/${createdId}`, full);
		expect(res.status).toBe(200);
		// Verify
		const verify = await apiRequest('GET', `/customers/${createdId}`);
		expect((verify.data as any).name).toBe('Cliente Atualizado Jest');
	});

	it('should delete customer', async () => {
		expect(createdId).toBeDefined();
		const res = await apiRequest('DELETE', `/customers/${createdId}`);
		expect(res.status).toBe(200);
		createdId = undefined; // prevent afterAll double-delete
	});
});
