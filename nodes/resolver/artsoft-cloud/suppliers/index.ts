import { IDataObject, IExecuteFunctions } from 'n8n-workflow';
import { buildPaginationParams, cloudApiRequest } from '../GenericFunctions';

export async function cloudListSuppliers(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const qs = buildPaginationParams(this, i);
	return cloudApiRequest.call(this, 'GET', '/suppliers/', undefined, qs);
}

export async function cloudGetSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	return cloudApiRequest.call(this, 'GET', `/suppliers/${id}`);
}

export async function cloudCreateSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const body = this.getNodeParameter('supplierData', i) as IDataObject;
	return cloudApiRequest.call(this, 'POST', '/suppliers/', body);
}

export async function cloudUpdateSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	const body = this.getNodeParameter('supplierData', i) as IDataObject;
	return cloudApiRequest.call(this, 'PUT', `/suppliers/${id}`, body);
}

export async function cloudDeleteSupplier(
	this: IExecuteFunctions,
	i: number,
): Promise<Record<string, unknown>> {
	const id = this.getNodeParameter('supplierId', i) as string;
	return cloudApiRequest.call(this, 'DELETE', `/suppliers/${id}`);
}
