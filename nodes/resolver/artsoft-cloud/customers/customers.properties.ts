import { INodeProperties } from 'n8n-workflow';

export const cloudCustomerOperations = [
	{
		name: 'Listar',
		value: 'cloudListCustomers',
		description: 'Listar todos os clientes',
		action: 'Listar clientes (cloud)',
	},
	{
		name: 'Consultar',
		value: 'cloudGetCustomer',
		description: 'Obter um cliente pelo ID',
		action: 'Consultar cliente (cloud)',
	},
	{
		name: 'Criar',
		value: 'cloudCreateCustomer',
		description: 'Criar um novo cliente',
		action: 'Criar cliente (cloud)',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateCustomer',
		description: 'Atualizar um cliente',
		action: 'Atualizar cliente (cloud)',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteCustomer',
		description: 'Eliminar um cliente',
		action: 'Apagar cliente (cloud)',
	},
];

const R = 'cloudCustomers';

export const cloudCustomerProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID do Cliente',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetCustomer', 'cloudUpdateCustomer', 'cloudDeleteCustomer'] },
		},
		description: 'ID numérico do cliente',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Pesquisa',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Termo de pesquisa',
	},
	{
		displayName: 'Filtro',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Expressão de filtro',
	},
	{
		displayName: 'Tamanho da Página',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Ordenar Por',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Direção da ordenação',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — corpo (CustomerSchema)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Dados do Cliente',
		name: 'customerData',
		type: 'json',
		required: true,
		default: '{\n  "name": "",\n  "shortName": "",\n  "isCompany": false\n}',
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateCustomer', 'cloudUpdateCustomer'] },
		},
		description: 'Dados do cliente no formato JSON (CustomerSchema)',
	},
];
