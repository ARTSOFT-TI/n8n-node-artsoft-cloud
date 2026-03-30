import { apiRequest } from '../helpers/api-client';

describe('Current Account — Integration', () => {
	it('should list customer accounts', async () => {
		const res = await apiRequest('GET', '/curr-account/customer');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should list supplier accounts', async () => {
		const res = await apiRequest('GET', '/curr-account/supplier');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});
});
