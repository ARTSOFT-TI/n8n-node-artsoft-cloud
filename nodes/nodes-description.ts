import { INodeTypeDescription } from 'n8n-workflow';
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

export const NodesDescription: INodeTypeDescription = {
	displayName: 'ARTSOFT',
	name: 'artsoft',
	icon: 'file:artsoft.svg',
	group: ['transform'],
	version: 1,
	usableAsTool: true,
	subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
	description: 'Interact with the ARTSOFT ERP via XML API',
	defaults: {
		name: 'ARTSOFT',
	},
	inputs: ['main'],
	outputs: ['main'],
	credentials: [
		{
			name: 'artsoftCloudApi',
			required: true,
		},
	],
	properties: [
		// ─── Resource selector ─────────────────────────────────────────────
		{
			displayName: 'Recurso',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [
				{ name: 'Cloud — Clientes', value: 'cloudCustomers' },
				{ name: 'Cloud — Fornecedores', value: 'cloudSuppliers' },
				{ name: 'Cloud — Produtos', value: 'cloudProducts' },
				{ name: 'Cloud — Documentos', value: 'cloudDocuments' },
				{ name: 'Cloud — Linhas de Documento', value: 'cloudDocumentLines' },
				{ name: 'Cloud — Vendedores', value: 'cloudSalespersons' },
				{ name: 'Cloud — Conta Corrente', value: 'cloudCurrAccount' },
			],
			default: 'clientes',
		},


		// ─── Operation selector (Cloud — Clientes) ──────────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudCustomers'] } },
			options: cloudCustomerOperations,
			default: 'cloudListCustomers',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — CLIENTES
		// ══════════════════════════════════════════════════════════════════
		...cloudCustomerProperties,

		// ─── Operation selector (Cloud — Fornecedores) ──────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudSuppliers'] } },
			options: cloudSupplierOperations,
			default: 'cloudListSuppliers',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — FORNECEDORES
		// ══════════════════════════════════════════════════════════════════
		...cloudSupplierProperties,

		// ─── Operation selector (Cloud — Produtos) ──────────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudProducts'] } },
			options: cloudProductOperations,
			default: 'cloudListProducts',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — PRODUTOS
		// ══════════════════════════════════════════════════════════════════
		...cloudProductProperties,

		// ─── Operation selector (Cloud — Documentos) ────────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudDocuments'] } },
			options: cloudDocumentOperations,
			default: 'cloudListBillings',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — DOCUMENTOS
		// ══════════════════════════════════════════════════════════════════
		...cloudDocumentProperties,

		// ─── Operation selector (Cloud — Linhas de Documento) ───────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudDocumentLines'] } },
			options: cloudDocumentLineOperations,
			default: 'cloudListDocumentLines',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — LINHAS DE DOCUMENTO
		// ══════════════════════════════════════════════════════════════════
		...cloudDocumentLineProperties,

		// ─── Operation selector (Cloud — Vendedores) ────────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudSalespersons'] } },
			options: cloudSalespersonOperations,
			default: 'cloudListSalespersons',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — VENDEDORES
		// ══════════════════════════════════════════════════════════════════
		...cloudSalespersonProperties,

		// ─── Operation selector (Cloud — Conta Corrente) ────────────────────
		{
			displayName: 'Operação',
			name: 'operation',
			type: 'options',
			noDataExpression: true,
			displayOptions: { show: { resource: ['cloudCurrAccount'] } },
			options: cloudCurrAccountOperations,
			default: 'cloudListCustomerAccounts',
		},

		// ══════════════════════════════════════════════════════════════════
		// CLOUD — CONTA CORRENTE
		// ══════════════════════════════════════════════════════════════════
		...cloudCurrAccountProperties,
	],
};
