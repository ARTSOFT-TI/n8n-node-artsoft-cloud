import { INodeProperties } from 'n8n-workflow';

export const cloudCurrAccountOperations = [
	{
		name: 'Listar Clientes',
		value: 'cloudListCustomerAccounts',
		description: 'Listar contas correntes de clientes',
		action: 'Listar contas correntes de clientes',
	},
	{
		name: 'Listar Fornecedores',
		value: 'cloudListSupplierAccounts',
		description: 'Listar contas correntes de fornecedores',
		action: 'Listar contas correntes de fornecedores',
	},
	{
		name: 'Consultar',
		value: 'cloudGetCurrAccount',
		description: 'Obter uma conta corrente pelo ID',
		action: 'Consultar conta corrente',
	},
	{
		name: 'Criar Débito',
		value: 'cloudCreateCurrAccountEntry',
		description: 'Criar Débito manual em conta corrente',
		action: 'Criar Débito em conta corrente',
	},
	{
		name: 'Criar crédito',
		value: 'cloudCreateCurrAccountRegul',
		description: 'Criar crédito em conta corrente',
		action: 'Criar Crédito em conta corrente',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateCurrAccount',
		description: 'Atualizar uma conta corrente',
		action: 'Atualizar conta corrente',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteCurrAccount',
		description: 'Eliminar uma conta corrente',
		action: 'Apagar conta corrente',
	},
];

const R = 'cloudCurrAccount';

const listOps = ['cloudListCustomerAccounts', 'cloudListSupplierAccounts'];
const createOps = ['cloudCreateCurrAccountEntry', 'cloudCreateCurrAccountRegul'];

export const cloudCurrAccountProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID da Conta Corrente',
		name: 'currAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudGetCurrAccount', 'cloudUpdateCurrAccount', 'cloudDeleteCurrAccount'],
			},
		},
		description: 'ID numérico da conta corrente',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Pesquisa',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Termo de pesquisa',
	},
	{
		displayName: 'Filtro',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Expressão de filtro',
	},
	{
		displayName: 'Tamanho da Página',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Ordenar Por',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
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
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Direção da ordenação',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE ENTRY / REGUL — campos obrigatórios
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID da Série',
		name: 'caIdSerie',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'ID da série de configuração',
	},
	{
		displayName: 'ID do Terceiro',
		name: 'caIdThirdParty',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'ID do cliente ou fornecedor',
	},
	{
		displayName: 'NIF',
		name: 'caFiscalNumber',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'NIF do terceiro',
	},
	{
		displayName: 'Valor',
		name: 'caValCurrAcc',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Valor da conta corrente',
	},
	{
		displayName: 'Saldo',
		name: 'caBalance',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Saldo total',
	},
	{
		displayName: 'Data do Documento',
		name: 'caDocDate',
		type: 'dateTime',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Data do documento',
	},
	{
		displayName: 'Comentário',
		name: 'caComment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Observações',
	},
	{
		displayName: 'Referência do Documento',
		name: 'caDocReference',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Referência ao documento',
	},

	// — Campos adicionais —
	{
		displayName: 'Campos Adicionais',
		name: 'caAdditionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: { show: { resource: [R], operation: createOps } },
		options: [
			{
				displayName: 'Data de Vencimento',
				name: 'vencDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Data de Pagamento',
				name: 'payDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Modo Manual de Total',
				name: 'isTotalManualMode',
				type: 'boolean',
				default: false,
				description: 'Whether to use manual total mode',
			},
		],
	},

	// — IVA da entrada (entry) —
	{
		displayName: 'IVA do Lançamento',
		name: 'caCurrAccEntryVat',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudCreateCurrAccountEntry', 'cloudUpdateCurrAccount'] } },
		description: 'Dados de IVA do lançamento',
		options: [
			{
				name: 'vatValues',
				displayName: 'IVA',
				values: [
					{
						displayName: 'Tipo de IVA',
						name: 'vatType',
						type: 'options',
						default: 'NORMAL',
						options: [
							{ name: 'Isento', value: 'ISENTO' },
							{ name: 'Reduzida', value: 'REDUZIDA' },
							{ name: 'Intermédia', value: 'INTERMEDIA' },
							{ name: 'Normal', value: 'NORMAL' },
						],
					},
					{
						displayName: 'Base de IVA',
						name: 'vatBase',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
						description: 'Valor base de incidência do IVA',
					},
					{
						displayName: 'ID Isenção de IVA',
						name: 'vatTypeExemption',
						type: 'number',
						default: 0,
						description: 'ID da isenção de IVA (só para tipo Isento)',
					},
				],
			},
		],
	},

	// — Lista de regularização (regul) —
	{
		displayName: 'Itens a Regularizar',
		name: 'caToRegulList',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudCreateCurrAccountRegul'] } },
		description: 'Lista de documentos a regularizar',
		options: [
			{
				name: 'regulValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'number',
						default: 0,
						description: 'ID do lançamento a regularizar',
					},
					{
						displayName: 'Valor a Regularizar',
						name: 'regulValue',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Valor Original',
						name: 'value',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Saldo',
						name: 'balance',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Tipo',
						name: 'type',
						type: 'string',
						default: 'CREDITOS_CLI',
						description: 'Tipo do lançamento (ex: CREDITOS_CLI)',
					},
					{
						displayName: 'Série',
						name: 'serie',
						type: 'string',
						default: '',
						description: 'Série do documento (ex: B0022/22)',
					},
					{
						displayName: 'Data',
						name: 'date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data de Vencimento',
						name: 'vencDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'ID Documento Faturação',
						name: 'idDocFr',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'É Regularizado Por',
						name: 'isRegulBy',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Tem Impostos',
						name: 'hasTaxes',
						type: 'boolean',
						default: false,
					},
				],
			},
		],
	},

	// ══════════════════════════════════════════════════════════════════
	// UPDATE — campos principais
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Comentário',
		name: 'caUpdateComment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Observações',
	},
	{
		displayName: 'Referência do Documento',
		name: 'caUpdateDocReference',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Referência ao documento',
	},
	{
		displayName: 'Valor',
		name: 'caUpdateValCurrAcc',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Valor da conta corrente',
	},
	{
		displayName: 'Saldo',
		name: 'caUpdateBalance',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Saldo total',
	},
	{
		displayName: 'Campos Adicionais (Atualizar)',
		name: 'caUpdateAdditionalFields',
		type: 'collection',
		placeholder: 'Adicionar Campo',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		options: [
			{
				displayName: 'Data do Documento',
				name: 'docDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Data de Vencimento',
				name: 'vencDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Data de Pagamento',
				name: 'payDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'ID da Série',
				name: 'idSerie',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'ID do Terceiro',
				name: 'idThirdParty',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Nome do Terceiro',
				name: 'thirdPartyName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Número da Fatura',
				name: 'invoiceNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Estado',
				name: 'state',
				type: 'options',
				default: 'FINALIZED',
				options: [
					{ name: 'Finalizado', value: 'FINALIZED' },
					{ name: 'Rascunho', value: 'DRAFT' },
				],
			},
			{
				displayName: 'Assinado',
				name: 'isSigned',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'Modo Manual de Total',
				name: 'isTotalManualMode',
				type: 'boolean',
				default: false,
			},
			{
				displayName: 'ID do Vendedor',
				name: 'salesPersonId',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Nome do Vendedor',
				name: 'salesPersonName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'NIF do Vendedor',
				name: 'salesPersonFiscalNumber',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Itens a Regularizar (Atualizar)',
		name: 'caUpdateToRegulList',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Lista de documentos a regularizar',
		options: [
			{
				name: 'regulValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Valor a Regularizar',
						name: 'regulValue',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Valor Original',
						name: 'value',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Saldo',
						name: 'balance',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Tipo',
						name: 'type',
						type: 'string',
						default: 'CREDITOS_CLI',
					},
					{
						displayName: 'Série',
						name: 'serie',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Data',
						name: 'date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Data de Vencimento',
						name: 'vencDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Nº Fatura Doc. Faturação',
						name: 'docFrInvoiceNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'ID Documento Faturação',
						name: 'idDocFr',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'É Regularizado Por',
						name: 'isRegulBy',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Tem Impostos',
						name: 'hasTaxes',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Editável',
						name: 'editable',
						type: 'boolean',
						default: true,
					},
				],
			},
		],
	},
];
