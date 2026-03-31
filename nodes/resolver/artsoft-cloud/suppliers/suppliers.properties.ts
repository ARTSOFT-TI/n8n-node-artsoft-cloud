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
const CU = ['cloudCreateSupplier', 'cloudUpdateSupplier'];

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
	// CREATE / UPDATE — campos individuais
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Número',
		name: 'supplierNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número sequencial do fornecedor',
	},
	{
		displayName: 'Nome',
		name: 'supplierName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Nome completo do fornecedor',
	},
	{
		displayName: 'Nome Curto',
		name: 'supplierShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abreviatura do nome',
	},
	{
		displayName: 'NIF',
		name: 'supplierFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número de identificação fiscal',
	},
	{
		displayName: 'É Empresa',
		name: 'supplierIsCompany',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Whether the supplier is a company',
	},

	// — Morada —
	{
		displayName: 'Morada',
		name: 'supplierAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Endereço do fornecedor',
	},
	{
		displayName: 'Localidade',
		name: 'supplierLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Localidade',
	},
	{
		displayName: 'Código Postal',
		name: 'supplierPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código postal (ex: 1000-001)',
	},
	{
		displayName: 'Distrito',
		name: 'supplierDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do distrito',
	},
	{
		displayName: 'Concelho',
		name: 'supplierCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do concelho',
	},
	{
		displayName: 'Freguesia',
		name: 'supplierParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da freguesia',
	},
	{
		displayName: 'Região do País',
		name: 'supplierCountryRegionId',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da região do país',
	},
	{
		displayName: 'Código do País',
		name: 'supplierCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código do país (620 = Portugal)',
	},

	// — Empresa —
	{
		displayName: 'Nome Comercial',
		name: 'supplierTradeName',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, supplierIsCompany: [true] } },
		description: 'Nome comercial da empresa',
	},
	{
		displayName: 'EORI',
		name: 'supplierEori',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, supplierIsCompany: [true] } },
		description: 'Número EORI',
	},

	// — Campos adicionais —
	{
		displayName: 'Campos Adicionais',
		name: 'supplierAdditionalFields',
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
				displayName: 'ID Estado do Fornecedor',
				name: 'supplierStatusId',
				type: 'number',
				default: 1,
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
			},
			{
				displayName: 'SWIFT',
				name: 'swift',
				type: 'string',
				default: '',
			},
			{
				displayName: 'IBAN',
				name: 'iban',
				type: 'string',
				default: '',
			},
			{
				displayName: 'ID Tabela de Preços',
				name: 'priceId',
				type: 'number',
				default: 0,
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
