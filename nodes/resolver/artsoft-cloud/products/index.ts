import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

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
	const body = this.getNodeParameter('productData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/products/', body);
}

export async function cloudUpdateProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('productId', i) as string;
	const body = this.getNodeParameter('productData', i) as IDataObject;
	return cloudApiRequest.call(this, 'PUT', `/products/${id}`, body);
}

export async function cloudDeleteProduct(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('productId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/products/${id}`);
}
