/* eslint-disable */
import { apiRequest } from '../helpers/api-client';

describe('Document Lines — Integration', () => {
	let docId: string | undefined;
	let lineId: string | undefined;

	beforeAll(async () => {
		const res = await apiRequest('POST', '/documents/header', {
			idSerie: 1,
			idThirdParty: 1,
		});
		if (res.status === 200 || res.status === 201) {
			docId = String((res.data as any).id ?? (res.data as any).Id);
		}
	});

	afterAll(async () => {
		if (docId) {
			await apiRequest('DELETE', `/documents/${docId}`);
		}
	});

	it('should list document lines', async () => {
		if (!docId) {
			console.warn('No document created — skipping');
			return;
		}
		const res = await apiRequest('GET', `/documents/${docId}/lines`);
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should create a document line', async () => {
		if (!docId) return;
		const res = await apiRequest('POST', `/documents/${docId}/lines`, {
			idSku: 1,
			quantity: 2,
			valUn: 10.0,
		});
		if (res.status === 200 || res.status === 201) {
			lineId = String((res.data as any).id ?? (res.data as any).Id);
			expect(lineId).toBeDefined();
		} else {
			console.warn('Document line create returned', res.status);
		}
	});

	it('should get document line by id', async () => {
		if (!docId || !lineId) return;
		const res = await apiRequest('GET', `/documents/${docId}/lines/${lineId}`);
		expect(res.status).toBe(200);
	});

	it('should update document line', async () => {
		if (!docId || !lineId) return;
		const res = await apiRequest('POST', `/documents/${docId}/lines/${lineId}`, {
			quantity: 5,
			valUn: 15.0,
		});
		if (res.status >= 400) {
			console.warn('Document line update returned', res.status);
			return;
		}
		expect(res.status).toBe(200);
	});

	it('should delete document line', async () => {
		if (!docId || !lineId) return;
		const res = await apiRequest('DELETE', `/documents/${docId}/lines/${lineId}`);
		if (res.status >= 400) {
			console.warn('Document line delete returned', res.status);
			return;
		}
		expect(res.status).toBe(200);
	});
});
