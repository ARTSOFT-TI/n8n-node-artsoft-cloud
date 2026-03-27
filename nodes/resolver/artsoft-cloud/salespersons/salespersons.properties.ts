import { INodeProperties } from 'n8n-workflow';

export const cloudSalespersonOperations = [
	{
		name: 'Listar',
		value: 'cloudListSalespersons',
		description: 'Listar todos os vendedores',
		action: 'Listar vendedores',
	},
	{
		name: 'Consultar',
		value: 'cloudGetSalesperson',
		description: 'Obter um vendedor pelo ID',
		action: 'Consultar vendedor',
	},
	{
		name: 'Criar',
		value: 'cloudCreateSalesperson',
		description: 'Criar um novo vendedor',
		action: 'Criar vendedor',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateSalesperson',
		description: 'Atualizar um vendedor',
		action: 'Atualizar vendedor',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteSalesperson',
		description: 'Eliminar um vendedor',
		action: 'Apagar vendedor',
	},
];

const R = 'cloudSalespersons';

export const cloudSalespersonProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID do Vendedor',
		name: 'salespersonId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudGetSalesperson', 'cloudUpdateSalesperson', 'cloudDeleteSalesperson'],
			},
		},
		description: 'ID numérico do vendedor',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Pesquisa',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Termo de pesquisa',
	},
	{
		displayName: 'Filtro',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Expressão de filtro',
	},
	{
		displayName: 'Tamanho da Página',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Ordenar Por',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Direção da ordenação',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — corpo (SalespersonSchema)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Dados do Vendedor',
		name: 'salespersonData',
		type: 'json',
		required: true,
		default: '{\n  "name": "",\n  "shortName": "",\n  "email": ""\n}',
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateSalesperson', 'cloudUpdateSalesperson'] },
		},
		description: 'Dados do vendedor no formato JSON (SalespersonSchema)',
	},
];
