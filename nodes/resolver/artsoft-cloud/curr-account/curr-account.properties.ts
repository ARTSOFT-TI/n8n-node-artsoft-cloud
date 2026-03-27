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
		name: 'Criar Lançamento',
		value: 'cloudCreateCurrAccountEntry',
		description: 'Criar uma entrada manual em conta corrente',
		action: 'Criar lançamento em conta corrente',
	},
	{
		name: 'Criar Regularização',
		value: 'cloudCreateCurrAccountRegul',
		description: 'Criar uma regularização em conta corrente',
		action: 'Criar regularização em conta corrente',
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
const entryOps = ['cloudCreateCurrAccountEntry', 'cloudCreateCurrAccountRegul'];

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
	// CREATE ENTRY / REGUL — CurrAccCreateSchema
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID da Série',
		name: 'idSerie',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: entryOps } },
		description: 'ID da série de configuração',
	},
	{
		displayName: 'ID do Terceiro',
		name: 'idThirdParty',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: entryOps } },
		description: 'ID do cliente ou fornecedor',
	},
	{
		displayName: 'Valor',
		name: 'valCurrAcc',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: entryOps } },
		description: 'Valor da conta corrente',
	},
	{
		displayName: 'Comentário',
		name: 'comment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: entryOps } },
		description: 'Observações (ex: Pagamento referente à fatura nº 1234)',
	},
	{
		displayName: 'Referência do Documento',
		name: 'docReference',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: entryOps } },
		description: 'Referência ao documento (ex: V010/12345)',
	},
	{
		displayName: 'Campos Adicionais',
		name: 'currAccountData',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: [R],
				operation: [...entryOps, 'cloudUpdateCurrAccount'],
			},
		},
		description: 'Campos adicionais no formato JSON (CurrAccCreateSchema)',
	},
];
