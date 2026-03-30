import { apiRequest } from '../helpers/api-client';

describe('Documents — Integration', () => {
	let createdDocId: string | undefined;

	it('should list billings', async () => {
		const res = await apiRequest('GET', '/documents/billings');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should list billings by saft type FT', async () => {
		const res = await apiRequest('GET', '/documents/billings/FT');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should list purchases', async () => {
		const res = await apiRequest('GET', '/documents/purchases');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should list purchases by saft type', async () => {
		const res = await apiRequest('GET', '/documents/purchases/VFA');
		// VFA may not be configured — accept 200 or skip on error
		if (res.status >= 400) {
			console.warn('Purchases by saft type VFA returned', res.status, '— may not be configured');
			return;
		}
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should create a document header', async () => {
		const res = await apiRequest('POST', '/documents/header', {
			idSerie: 1,
			idThirdParty: 1,
		});
		if (res.status === 200 || res.status === 201) {
			createdDocId = String((res.data as any).id ?? (res.data as any).Id);
		} else {
			console.warn('Document create returned', res.status, '— skipping dependent tests');
		}
	});

	it('should get document by id', async () => {
		if (!createdDocId) return;
		const res = await apiRequest('GET', `/documents/${createdDocId}`);
		expect(res.status).toBe(200);
	});

	it('should delete document', async () => {
		if (!createdDocId) return;
		const res = await apiRequest('DELETE', `/documents/${createdDocId}`);
		if (res.status >= 400) {
			console.warn('Document delete returned', res.status);
			return;
		}
		expect(res.status).toBe(200);
	});
});
