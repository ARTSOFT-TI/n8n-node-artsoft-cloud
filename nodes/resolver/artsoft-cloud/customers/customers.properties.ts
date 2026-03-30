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
const CU = ['cloudCreateCustomer', 'cloudUpdateCustomer'];

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
	// CREATE / UPDATE — campos individuais
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Número',
		name: 'customerNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número sequencial do cliente',
	},
	{
		displayName: 'Nome',
		name: 'customerName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Nome completo do cliente',
	},
	{
		displayName: 'Nome Curto',
		name: 'customerShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abreviatura do nome',
	},
	{
		displayName: 'NIF',
		name: 'customerFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número de identificação fiscal',
	},
	{
		displayName: 'É Empresa',
		name: 'customerIsCompany',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Whether the customer is a company',
	},
	{
		displayName: 'Email',
		name: 'customerEmail',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Email do cliente',
	},

	// — Morada —
	{
		displayName: 'Morada',
		name: 'customerAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Endereço do cliente',
	},
	{
		displayName: 'Localidade',
		name: 'customerLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Localidade',
	},
	{
		displayName: 'Código Postal',
		name: 'customerPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código postal (ex: 1000-001)',
	},
	{
		displayName: 'Distrito',
		name: 'customerDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do distrito',
	},
	{
		displayName: 'Concelho',
		name: 'customerCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do concelho',
	},
	{
		displayName: 'Freguesia',
		name: 'customerParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da freguesia',
	},
	{
		displayName: 'Região do País',
		name: 'customerCountryRegionId',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da região do país',
	},
	{
		displayName: 'Código do País',
		name: 'customerCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código do país (620 = Portugal)',
	},

	// — Empresa —
	{
		displayName: 'Nome Comercial',
		name: 'customerTradeName',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, customerIsCompany: [true] } },
		description: 'Nome comercial da empresa',
	},
	{
		displayName: 'EORI',
		name: 'customerEori',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, customerIsCompany: [true] } },
		description: 'Número EORI',
	},

	// — Opções adicionais —
	{
		displayName: 'Campos Adicionais',
		name: 'customerAdditionalFields',
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
				displayName: 'ID Estado do Cliente',
				name: 'customerStatusId',
				type: 'number',
				default: 1,
			},
			{
				displayName: 'Email de Entrega de Documentos',
				name: 'documentDeliveryEmail',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Limite de Crédito',
				name: 'creditLimit',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Desconto',
				name: 'discount',
				type: 'string',
				default: '',
			},
			{
				displayName: 'ID Isenção IVA',
				name: 'exemptVatId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'ID Modo de Expedição',
				name: 'expeditionModeId',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Observações',
				name: 'observation1',
				type: 'string',
				default: '',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Sem Referências MB',
				name: 'noMbReferences',
				type: 'boolean',
				default: false,
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
