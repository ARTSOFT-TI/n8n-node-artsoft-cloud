import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

function buildProductPayload(context: IExecuteFunctions, i: number): IDataObject {
	const additional = context.getNodeParameter('productAdditionalFields', i, {}) as IDataObject;
	const now = new Date().toISOString();

	// Preços
	const pricesRaw = context.getNodeParameter('productPrices', i, {}) as IDataObject;
	const priceValues = (pricesRaw.priceValues as IDataObject[]) ?? [];
	const prices = priceValues.map((p) => ({
		price: p.price as number,
		number: p.number as number,
		currencyId: (p.currencyId as number) ?? 1,
		beginDate: (p.beginDate as string) || now,
		endDate: (p.endDate as string) || now,
	}));

	// Códigos opcionais
	const codesRaw = context.getNodeParameter('productOptionalCodes', i, {}) as IDataObject;
	const codeValues = (codesRaw.codeValues as IDataObject[]) ?? [];
	const optionalCodes = codeValues.map((c) => ({
		supplierId: (c.supplierId as number) ?? 1,
		quantity: (c.quantity as number) ?? 1,
		code: (c.code as string) ?? '',
		optionalCodeId: (c.optionalCodeId as number) ?? 2,
	}));

	return {
		sku: context.getNodeParameter('productSku', i) as string,
		mainName: context.getNodeParameter('productMainName', i) as string,
		saftClass: context.getNodeParameter('productSaftClass', i) as number,
		vatType: context.getNodeParameter('productVatType', i) as number,
		inventaryClass: context.getNodeParameter('productInventaryClass', i) as number,
		status: 0,
		quantityDecimalPlaces: context.getNodeParameter('productQuantityDecimalPlaces', i, 2) as number,
		unitCodeId: context.getNodeParameter('productUnitCodeId', i, 5) as number,
		warehouse: {
			id: context.getNodeParameter('productWarehouseId', i, 1) as number,
			retired: false,
			suspended: false,
			status: 0,
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

	const sku = context.getNodeParameter('productSku', i, '') as string;
	if (sku) body.sku = sku;

	const mainName = context.getNodeParameter('productMainName', i, '') as string;
	if (mainName) body.mainName = mainName;

	const saftClass = context.getNodeParameter('productSaftClass', i, undefined) as number | undefined;
	if (saftClass !== undefined) body.saftClass = saftClass;

	const vatType = context.getNodeParameter('productVatType', i, undefined) as number | undefined;
	if (vatType !== undefined) body.vatType = vatType;

	const inventaryClass = context.getNodeParameter('productInventaryClass', i, undefined) as number | undefined;
	if (inventaryClass !== undefined) body.inventaryClass = inventaryClass;

	const quantityDecimalPlaces = context.getNodeParameter('productQuantityDecimalPlaces', i, 0) as number;
	if (quantityDecimalPlaces) body.quantityDecimalPlaces = quantityDecimalPlaces;

	const unitCodeId = context.getNodeParameter('productUnitCodeId', i, 0) as number;
	if (unitCodeId) body.unitCodeId = unitCodeId;

	const warehouseId = context.getNodeParameter('productWarehouseId', i, 0) as number;
	if (warehouseId) {
		body.warehouse = { ...(body.warehouse as IDataObject), id: warehouseId };
	}

	// Preços — se preenchidos, substitui todos
	const pricesRaw = context.getNodeParameter('productPrices', i, {}) as IDataObject;
	const priceValues = (pricesRaw.priceValues as IDataObject[]) ?? [];
	if (priceValues.length > 0) {
		const now = new Date().toISOString();
		body.prices = priceValues.map((p) => ({
			price: p.price as number,
			number: p.number as number,
			currencyId: (p.currencyId as number) ?? 1,
			beginDate: (p.beginDate as string) || now,
			endDate: (p.endDate as string) || now,
		}));
	}

	// Códigos opcionais — se preenchidos, substitui todos
	const codesRaw = context.getNodeParameter('productOptionalCodes', i, {}) as IDataObject;
	const codeValues = (codesRaw.codeValues as IDataObject[]) ?? [];
	if (codeValues.length > 0) {
		body.optionalCodes = codeValues.map((c) => ({
			supplierId: (c.supplierId as number) ?? 1,
			quantity: (c.quantity as number) ?? 1,
			code: (c.code as string) ?? '',
			optionalCodeId: (c.optionalCodeId as number) ?? 2,
		}));
	}

	// Flags
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
