import { INodeProperties } from 'n8n-workflow';

export const cloudProductOperations = [
	{
		name: 'Listar',
		value: 'cloudListProducts',
		description: 'Listar todos os produtos',
		action: 'Listar produtos',
	},
	{
		name: 'Consultar',
		value: 'cloudGetProduct',
		description: 'Obter um produto pelo ID',
		action: 'Consultar produto',
	},
	{
		name: 'Criar',
		value: 'cloudCreateProduct',
		description: 'Criar um novo produto',
		action: 'Criar produto',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateProduct',
		description: 'Atualizar um produto',
		action: 'Atualizar produto',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteProduct',
		description: 'Eliminar um produto',
		action: 'Apagar produto',
	},
];

const R = 'cloudProducts';

export const cloudProductProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID do Produto',
		name: 'productId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetProduct', 'cloudUpdateProduct', 'cloudDeleteProduct'] },
		},
		description: 'ID numérico do produto',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Pesquisa',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Termo de pesquisa',
	},
	{
		displayName: 'Filtro',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Expressão de filtro',
	},
	{
		displayName: 'Tamanho da Página',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Ordenar Por',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Direção da ordenação',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — corpo (SkuFullSchema)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Dados do Produto',
		name: 'productData',
		type: 'json',
		required: true,
		default: '{\n  "sku": "",\n  "mainName": "",\n  "saftClass": "P",\n  "vatType": "NOR"\n}',
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateProduct', 'cloudUpdateProduct'] },
		},
		description: 'Dados do produto no formato JSON (SkuFullSchema)',
	},
];
