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
const CU = ['cloudCreateSalesperson', 'cloudUpdateSalesperson'];

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
	// CREATE / UPDATE — campos individuais
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Número',
		name: 'salespersonNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número sequencial do vendedor',
	},
	{
		displayName: 'Nome',
		name: 'salespersonName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Nome completo do vendedor',
	},
	{
		displayName: 'Nome Curto',
		name: 'salespersonShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abreviatura do nome',
	},
	{
		displayName: 'NIF',
		name: 'salespersonFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número de identificação fiscal',
	},
	{
		displayName: 'Email',
		name: 'salespersonEmail',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Email do vendedor',
	},

	// — Morada —
	{
		displayName: 'Morada',
		name: 'salespersonAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Endereço do vendedor',
	},
	{
		displayName: 'Localidade',
		name: 'salespersonLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Localidade',
	},
	{
		displayName: 'Código Postal',
		name: 'salespersonPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código postal (ex: 1000-001)',
	},
	{
		displayName: 'Distrito',
		name: 'salespersonDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do distrito',
	},
	{
		displayName: 'Concelho',
		name: 'salespersonCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do concelho',
	},
	{
		displayName: 'Freguesia',
		name: 'salespersonParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da freguesia',
	},
	{
		displayName: 'Região do País',
		name: 'salespersonCountryRegionId',
		type: 'number',
		default: 25,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da região do país',
	},
	{
		displayName: 'Código do País',
		name: 'salespersonCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código do país (620 = Portugal)',
	},

	// — Campos adicionais —
	{
		displayName: 'Campos Adicionais',
		name: 'salespersonAdditionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		options: [
			{
				displayName: 'Data de Nascimento',
				name: 'birthDate',
				type: 'string',
				default: '',
				description: 'Data de nascimento (ISO 8601)',
			},
			{
				displayName: 'Estado',
				name: 'status',
				type: 'options',
				default: 'ACTIVE',
				options: [
					{ name: 'Ativo', value: 'ACTIVE' },
					{ name: 'Inativo', value: 'INACTIVE' },
				],
			},
			{
				displayName: 'Inativo',
				name: 'inactive',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Observações',
				name: 'observation1',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Anónimo',
				name: 'anonymous',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Registo Privado',
				name: 'privateRecord',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'País do Telefone',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
			},
			{
				displayName: 'País do Telemóvel',
				name: 'mobileNumberCountryId',
				type: 'number',
				default: 620,
			},
		],
	},
];
