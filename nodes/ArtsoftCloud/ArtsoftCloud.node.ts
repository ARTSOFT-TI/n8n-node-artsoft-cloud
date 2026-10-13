import { INodeType, INodeTypeDescription, JsonObject, NodeConnectionTypes, IExecuteFunctions, INodeExecutionData, IDataObject, NodeApiError } from 'n8n-workflow';
import {
	cloudProductOperations,
	cloudProductProperties,
} from './resolver/artsoft-cloud/products/products.properties';
import {
	cloudCustomerOperations,
	cloudCustomerProperties,
} from './resolver/artsoft-cloud/customers/customers.properties';
import {
	cloudSupplierOperations,
	cloudSupplierProperties,
} from './resolver/artsoft-cloud/suppliers/suppliers.properties';
import {
	cloudSalespersonOperations,
	cloudSalespersonProperties,
} from './resolver/artsoft-cloud/salespersons/salespersons.properties';
import {
	cloudDocumentOperations,
	cloudDocumentProperties,
} from './resolver/artsoft-cloud/documents/documents.properties';
import {
	cloudDocumentLineOperations,
	cloudDocumentLineProperties,
} from './resolver/artsoft-cloud/document-lines/document-lines.properties';
import {
	cloudCurrAccountOperations,
	cloudCurrAccountProperties,
} from './resolver/artsoft-cloud/curr-account/curr-account.properties';

import { ArtResolver } from './resolver';

export class ArtsoftCloud implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'ARTSOFT',
		name: 'artsoftCloud',
		icon: { light: 'file:artsoft.svg', dark: 'file:artsoft.svg' },
		group: ['transform'],
		version: 1,
		usableAsTool: true,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Interact with the ARTSOFT Cloud Invoice API',
		defaults: {
			name: 'ARTSOFT',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'artsoftCloudApi',
				required: true,
			},
		],
		properties: [
			// ─── Resource selector ─────────────────────────────────────────────
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Cloud — Current Account', value: 'cloudCurrAccount' },
					{ name: 'Cloud — Customer', value: 'cloudCustomers' },
					{ name: 'Cloud — Document', value: 'cloudDocuments' },
					{ name: 'Cloud — Document Line', value: 'cloudDocumentLines' },
					{ name: 'Cloud — Product', value: 'cloudProducts' },
					{ name: 'Cloud — Salesperson', value: 'cloudSalespersons' },
					{ name: 'Cloud — Supplier', value: 'cloudSuppliers' },
				],
				default: 'cloudCustomers',
			},


			// ─── Operation selector (Cloud — Customers) ──────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudCustomers'] } },
				options: cloudCustomerOperations,
				default: 'cloudListCustomers',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — CUSTOMERS
			// ══════════════════════════════════════════════════════════════════
			...cloudCustomerProperties,

			// ─── Operation selector (Cloud — Suppliers) ──────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudSuppliers'] } },
				options: cloudSupplierOperations,
				default: 'cloudListSuppliers',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — SUPPLIERS
			// ══════════════════════════════════════════════════════════════════
			...cloudSupplierProperties,

			// ─── Operation selector (Cloud — Products) ──────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudProducts'] } },
				options: cloudProductOperations,
				default: 'cloudListProducts',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — PRODUCTS
			// ══════════════════════════════════════════════════════════════════
			...cloudProductProperties,

			// ─── Operation selector (Cloud — Documents) ────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudDocuments'] } },
				options: cloudDocumentOperations,
				default: 'cloudListBillings',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — DOCUMENTS
			// ══════════════════════════════════════════════════════════════════
			...cloudDocumentProperties,

			// ─── Operation selector (Cloud — Document Lines) ───────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudDocumentLines'] } },
				options: cloudDocumentLineOperations,
				default: 'cloudListDocumentLines',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — DOCUMENT LINES
			// ══════════════════════════════════════════════════════════════════
			...cloudDocumentLineProperties,

			// ─── Operation selector (Cloud — Salespersons) ────────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudSalespersons'] } },
				options: cloudSalespersonOperations,
				default: 'cloudListSalespersons',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — SALESPERSONS
			// ══════════════════════════════════════════════════════════════════
			...cloudSalespersonProperties,

			// ─── Operation selector (Cloud — Current Account) ────────────────────
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: { show: { resource: ['cloudCurrAccount'] } },
				options: cloudCurrAccountOperations,
				default: 'cloudListCustomerAccounts',
			},

			// ══════════════════════════════════════════════════════════════════
			// CLOUD — CURRENT ACCOUNT
			// ══════════════════════════════════════════════════════════════════
			...cloudCurrAccountProperties,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const artResolver = new ArtResolver(this);

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;

				const parsed: Record<string, unknown> = await artResolver.resolve(operation, i);

				const root =
					(parsed['message'] as IDataObject) ||
					(parsed['document'] as IDataObject) ||
					(parsed['Entity'] as IDataObject) ||
					{};
				const err = root['@_err'] as string | number | undefined;

				if (err !== undefined && err !== null && err !== '') {
					throw new NodeApiError(
						this.getNode(),
						{ message: `ARTSOFT error: ${err}` },
						{ itemIndex: i },
					);
				}

				returnData.push({ json: parsed as IDataObject, pairedItem: i });
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: i,
					});
					continue;
				}
				throw error instanceof NodeApiError
					? error
					: new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
