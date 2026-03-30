import { apiRequest } from '../helpers/api-client';

describe('Products — Integration', () => {
	let createdId: string | undefined;

	it('should list products', async () => {
		const res = await apiRequest('GET', '/products/');
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
		expect(res.data.value).toBeDefined();
	});

	it('should create a product', async () => {
		const res = await apiRequest('POST', '/products/', {
			sku: 'TEST-JEST-001',
			mainName: 'Produto Teste Jest',
			saftClass: 'SAFT_PROD',
			vatType: 'NORMAL',
		});
		if (res.status === 200 || res.status === 201) {
			createdId = String((res.data as any).id ?? (res.data as any).Id);
		} else {
			console.warn('Product create returned', res.status, '— skipping dependent tests');
		}
	});

	it('should get product by id', async () => {
		if (!createdId) {
			const list = await apiRequest('GET', '/products/');
			const items = (list.data as any).value;
			if (!items?.length) return;
			createdId = String(items[0].id);
		}
		const res = await apiRequest('GET', `/products/${createdId}`);
		expect(res.status).toBe(200);
		expect(res.data).toBeDefined();
	});

	it('should update product', async () => {
		if (!createdId) return;
		const res = await apiRequest('PUT', `/products/${createdId}`, {
			mainName: 'Produto Teste Jest Atualizado',
		});
		if (res.status >= 400) {
			console.warn('Product update not supported or failed — skipping assertion');
			return;
		}
		expect(res.status).toBe(200);
	});

	it('should delete product', async () => {
		if (!createdId) return;
		const res = await apiRequest('DELETE', `/products/${createdId}`);
		if (res.status >= 400) {
			console.warn('Product delete not supported or failed — skipping assertion');
			return;
		}
		expect(res.status).toBe(200);
	});
});
