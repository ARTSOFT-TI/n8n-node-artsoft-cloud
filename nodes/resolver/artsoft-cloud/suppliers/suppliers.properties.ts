import { INodeProperties } from 'n8n-workflow';

export const cloudSupplierOperations = [
	{
		name: 'Listar',
		value: 'cloudListSuppliers',
		description: 'Listar todos os fornecedores',
		action: 'Listar fornecedores (cloud)',
	},
	{
		name: 'Consultar',
		value: 'cloudGetSupplier',
		description: 'Obter um fornecedor pelo ID',
		action: 'Consultar fornecedor (cloud)',
	},
	{
		name: 'Criar',
		value: 'cloudCreateSupplier',
		description: 'Criar um novo fornecedor',
		action: 'Criar fornecedor (cloud)',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateSupplier',
		description: 'Atualizar um fornecedor',
		action: 'Atualizar fornecedor (cloud)',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteSupplier',
		description: 'Eliminar um fornecedor',
		action: 'Apagar fornecedor (cloud)',
	},
];

const R = 'cloudSuppliers';

export const cloudSupplierProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID do Fornecedor',
		name: 'supplierId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetSupplier', 'cloudUpdateSupplier', 'cloudDeleteSupplier'] },
		},
		description: 'ID numérico do fornecedor',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Pesquisa',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Termo de pesquisa',
	},
	{
		displayName: 'Filtro',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Expressão de filtro',
	},
	{
		displayName: 'Tamanho da Página',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Ordenar Por',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Campo de ordenação',
	},
	{
		displayName: 'Direção',
		name: '$direction',
		type: 'options',
		default: 'asc',
		options: [
			{ name: 'Ascendente', value: 'asc' },
			{ name: 'Descendente', value: 'desc' },
		],
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Direção da ordenação',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — corpo (SupplierSchema)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Dados do Fornecedor',
		name: 'supplierData',
		type: 'json',
		required: true,
		default: '{\n  "name": "",\n  "shortName": "",\n  "isCompany": true\n}',
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateSupplier', 'cloudUpdateSupplier'] },
		},
		description: 'Dados do fornecedor no formato JSON (SupplierSchema)',
	},
];
