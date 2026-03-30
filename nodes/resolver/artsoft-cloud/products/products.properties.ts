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
const CU = ['cloudCreateProduct', 'cloudUpdateProduct'];

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
	// CREATE / UPDATE — campos individuais
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'SKU',
		name: 'productSku',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Código do produto (SKU)',
	},
	{
		displayName: 'Nome',
		name: 'productMainName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Nome principal do produto',
	},
	{
		displayName: 'Classe SAF-T',
		name: 'productSaftClass',
		type: 'options',
		default: 0,
		options: [
			{ name: 'Produto (P)', value: 0 },
			{ name: 'Serviço (S)', value: 1 },
			{ name: 'Outros (O)', value: 2 },
			{ name: 'Imposto/Taxa (I)', value: 3 },
			{ name: 'Excluído (E)', value: 4 },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Classificação SAF-T do produto',
	},
	{
		displayName: 'Tipo de IVA',
		name: 'productVatType',
		type: 'options',
		default: 3,
		options: [
			{ name: 'Isento', value: 0 },
			{ name: 'Reduzido', value: 1 },
			{ name: 'Intermédio', value: 2 },
			{ name: 'Normal', value: 3 },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Tipo de taxa de IVA',
	},
	{
		displayName: 'Classe de Inventário',
		name: 'productInventaryClass',
		type: 'options',
		default: 0,
		options: [
			{ name: 'Mercadorias', value: 0 },
			{ name: 'Matérias-Primas', value: 1 },
			{ name: 'Produtos Acabados', value: 2 },
			{ name: 'Subprodutos', value: 3 },
			{ name: 'Produtos em Curso', value: 4 },
			{ name: 'Embalagens', value: 5 },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Classe de inventário do produto',
	},
	{
		displayName: 'ID do Armazém',
		name: 'productWarehouseId',
		type: 'number',
		default: 1,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID do armazém',
	},
	{
		displayName: 'ID Unidade de Medida',
		name: 'productUnitCodeId',
		type: 'number',
		default: 5,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID da unidade de medida',
	},
	{
		displayName: 'Casas Decimais Quantidade',
		name: 'productQuantityDecimalPlaces',
		type: 'number',
		default: 2,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Número de casas decimais na quantidade',
	},

	// — Preços —
	{
		displayName: 'Preços',
		name: 'productPrices',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Lista de preços do produto',
		options: [
			{
				name: 'priceValues',
				displayName: 'Preço',
				values: [
					{
						displayName: 'Preço',
						name: 'price',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Número (Tabela)',
						name: 'number',
						type: 'number',
						default: 1,
						description: 'Número da tabela de preços (1, 2, 3...)',
					},
					{
						displayName: 'ID Moeda',
						name: 'currencyId',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Data Início',
						name: 'beginDate',
						type: 'string',
						default: '',
						description: 'Data de início (ISO 8601)',
					},
					{
						displayName: 'Data Fim',
						name: 'endDate',
						type: 'string',
						default: '',
						description: 'Data de fim (ISO 8601)',
					},
				],
			},
		],
	},

	// — Códigos opcionais —
	{
		displayName: 'Códigos Opcionais',
		name: 'productOptionalCodes',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Códigos opcionais (ex: código de barras)',
		options: [
			{
				name: 'codeValues',
				displayName: 'Código',
				values: [
					{
						displayName: 'ID Fornecedor',
						name: 'supplierId',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Quantidade',
						name: 'quantity',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Código',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Código de barras ou código alternativo',
					},
					{
						displayName: 'ID Código Opcional',
						name: 'optionalCodeId',
						type: 'number',
						default: 2,
					},
				],
			},
		],
	},

	// — Campos adicionais —
	{
		displayName: 'Campos Adicionais',
		name: 'productAdditionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		options: [
			{
				displayName: 'ID Isenção IVA',
				name: 'exemptVatId',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Observações',
				name: 'obs',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Ignorar Desconto Cabeçalho',
				name: 'ignoreHeaderDiscount',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Ignorar Desconto Linha',
				name: 'ignoreLineDiscount',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Descontinuado',
				name: 'discontinued',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Suspenso',
				name: 'suspended',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Preço Total',
				name: 'totalPrice',
				type: 'boolean',
				default: false,
			},
		],
	},
];
