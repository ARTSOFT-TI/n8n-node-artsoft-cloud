import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

function toISODate(value: string): string {
	if (!value) return new Date().toISOString();
	// Already ISO format
	if (value.includes('T') || /^\d{4}-\d{2}-\d{2}/.test(value)) return new Date(value).toISOString();
	// DD/MM/YYYY format
	const parts = value.split('/');
	if (parts.length === 3) return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`).toISOString();
	return new Date(value).toISOString();
}

function buildProductPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('productAdditionalFields', i, {}) as IDataObject;
	const now = new Date().toISOString();

	// Preços
	let prices: IDataObject[] = [];
	try {
		const pricesRaw = context.getNodeParameter('productPrices', i, {}) as IDataObject;
		const priceValues = (pricesRaw.priceValues as IDataObject[]) ?? [];
		prices = priceValues.map((p) => ({
			price: p.price as number,
			number: p.number as number,
			currencyId: (p.currencyId as number) ?? 1,
			beginDate: toISODate((p.beginDate as string) || now),
			endDate: toISODate((p.endDate as string) || now),
		}));
	} catch { /* field not set */ }

	// Códigos opcionais
	let optionalCodes: IDataObject[] = [];
	try {
		const codesRaw = context.getNodeParameter('productOptionalCodes', i, {}) as IDataObject;
		const codeValues = (codesRaw.codeValues as IDataObject[]) ?? [];
		optionalCodes = codeValues.map((c) => ({
			supplierId: (c.supplierId as number) ?? 1,
			quantity: (c.quantity as number) ?? 1,
			code: (c.code as string) ?? '',
			optionalCodeId: (c.optionalCodeId as number) ?? 2,
		}));
	} catch { /* field not set */ }

	return {
		sku: context.getNodeParameter('productSku', i) as string,
		mainName: context.getNodeParameter('productMainName', i) as string,
		saftClass: context.getNodeParameter('productSaftClass', i) as string,
		vatType: context.getNodeParameter('productVatType', i) as string,
		inventaryClass: context.getNodeParameter('productInventaryClass', i) as string,
		status: 'ACTIVE',
		quantityDecimalPlaces: context.getNodeParameter('productQuantityDecimalPlaces', i, 2) as number,
		unitCodeId: context.getNodeParameter('productUnitCodeId', i, 5) as number,
		warehouse: {
			id: context.getNodeParameter('productWarehouseId', i, 1) as number,
			retired: false,
			suspended: false,
			status: 'ACTIVE',
		},
		flags: {
			ignoreHeaderDiscount: (additional.ignoreHeaderDiscount as boolean) ?? false,
			ignoreLineDiscount: (additional.ignoreLineDiscount as boolean) ?? false,
			discontinued: (additional.discontinued as boolean) ?? false,
			suspended: (additional.suspended as boolean) ?? false,
			totalPrice: (additional.totalPrice as boolean) ?? false,
		},
		exemptVatId: (additional.exemptVatId as number) ?? null,
		prices,
		optionalCodes,
		relatedSkus: [],
		hierarchies: {},
		obs: (additional.obs as string) ?? '',
	};
}

function applyProductChanges(
	current: Record<string, unknown>,
	context: IExecuteFunctions,
	i: number,
): IDataObject {
	const body = { ...current } as IDataObject;
	const additional = context.getNodeParameter('productAdditionalFields', i, {}) as IDataObject;

	// Campos texto — só sobrescreve se preenchido
	const sku = context.getNodeParameter('productSku', i, '') as string;
	if (sku) body.sku = sku;

	const mainName = context.getNodeParameter('productMainName', i, '') as string;
	if (mainName) body.mainName = mainName;

	const saftClass = context.getNodeParameter('productSaftClass', i, '') as string;
	if (saftClass) body.saftClass = saftClass;

	const vatType = context.getNodeParameter('productVatType', i, '') as string;
	if (vatType) body.vatType = vatType;

	const inventaryClass = context.getNodeParameter('productInventaryClass', i, '') as string;
	if (inventaryClass) body.inventaryClass = inventaryClass;

	const quantityDecimalPlaces = context.getNodeParameter('productQuantityDecimalPlaces', i, 0) as number;
	if (quantityDecimalPlaces) body.quantityDecimalPlaces = quantityDecimalPlaces;

	const unitCodeId = context.getNodeParameter('productUnitCodeId', i, 0) as number;
	if (unitCodeId) body.unitCodeId = unitCodeId;

	const warehouseId = context.getNodeParameter('productWarehouseId', i, 0) as number;
	if (warehouseId) {
		body.warehouse = { ...(body.warehouse as IDataObject), id: warehouseId };
	}

	// Preços — mergea com os existentes (mantém id)
	try {
		const pricesRaw = context.getNodeParameter('productPrices', i, {}) as IDataObject;
		const priceValues = (pricesRaw.priceValues as IDataObject[]) ?? [];
		if (priceValues.length > 0) {
			const now = new Date().toISOString();
			const currentPrices = (body.prices as IDataObject[]) ?? [];
			body.prices = priceValues.map((p) => {
				const existing = currentPrices.find(
					(cp) => cp.number === (p.number as number) && cp.currencyId === ((p.currencyId as number) ?? 1),
				);
				return {
					...(existing ?? {}),
					price: p.price as number,
					number: p.number as number,
					currencyId: (p.currencyId as number) ?? 1,
					beginDate: toISODate((p.beginDate as string) || now),
					endDate: toISODate((p.endDate as string) || now),
				};
			});
		}
	} catch { /* field not set */ }

	// Códigos opcionais — mergea com os existentes (mantém id)
	try {
		const codesRaw = context.getNodeParameter('productOptionalCodes', i, {}) as IDataObject;
		const codeValues = (codesRaw.codeValues as IDataObject[]) ?? [];
		if (codeValues.length > 0) {
			const currentCodes = (body.optionalCodes as IDataObject[]) ?? [];
			body.optionalCodes = codeValues.map((c) => {
				const existing = currentCodes.find(
					(cc) => cc.supplierId === ((c.supplierId as number) ?? 1) && cc.optionalCodeId === ((c.optionalCodeId as number) ?? 2),
				);
				return {
					...(existing ?? {}),
					supplierId: (c.supplierId as number) ?? 1,
					quantity: (c.quantity as number) ?? 1,
					code: (c.code as string) ?? '',
					optionalCodeId: (c.optionalCodeId as number) ?? 2,
				};
			});
		}
	} catch { /* field not set */ }

	// Flags — só sobrescreve os que o utilizador adicionou
	const currentFlags = (body.flags as IDataObject) ?? {};
	if (additional.ignoreHeaderDiscount !== undefined) currentFlags.ignoreHeaderDiscount = additional.ignoreHeaderDiscount;
	if (additional.ignoreLineDiscount !== undefined) currentFlags.ignoreLineDiscount = additional.ignoreLineDiscount;
	if (additional.discontinued !== undefined) currentFlags.discontinued = additional.discontinued;
	if (additional.suspended !== undefined) currentFlags.suspended = additional.suspended;
	if (additional.totalPrice !== undefined) currentFlags.totalPrice = additional.totalPrice;
	body.flags = currentFlags;

	if (additional.exemptVatId !== undefined) body.exemptVatId = additional.exemptVatId;
	if (additional.obs !== undefined) body.obs = additional.obs;

	return body;
}

export async function cloudListProducts(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/products/', undefined, qs);
}

export async function cloudGetProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('productId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/products/${id}`);
}

export async function cloudCreateProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = buildProductPayload(this, i);
	return cloudApiRequest.call(this, 'POST', '/products/', body);
}

export async function cloudUpdateProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('productId', i) as string;
	const current = await cloudApiRequest.call(this, 'GET', `/products/${id}`);
	const body = applyProductChanges(current, this, i);
	return cloudApiRequest.call(this, 'PUT', `/products/${id}`, body);
}

export async function cloudDeleteProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('productId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/products/${id}`);
}
