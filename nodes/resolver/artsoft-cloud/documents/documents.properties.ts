import { INodeProperties } from 'n8n-workflow';

export const cloudDocumentOperations = [
	{
		name: 'Listar Faturas',
		value: 'cloudListBillings',
		description: 'Listar documentos de faturação',
		action: 'Listar faturas',
	},
	{
		name: 'Listar Faturas por Tipo SAFT',
		value: 'cloudListBillingsBySaftType',
		description: 'Listar documentos de faturação por tipo SAFT',
		action: 'Listar faturas por tipo SAFT',
	},
	{
		name: 'Listar Compras',
		value: 'cloudListPurchases',
		description: 'Listar documentos de compra',
		action: 'Listar compras',
	},
	{
		name: 'Listar Compras por Tipo SAFT',
		value: 'cloudListPurchasesBySaftType',
		description: 'Listar documentos de compra por tipo SAFT',
		action: 'Listar compras por tipo SAFT',
	},
	{
		name: 'Consultar',
		value: 'cloudGetDocument',
		description: 'Obter um documento pelo ID',
		action: 'Consultar documento (cloud)',
	},
	{
		name: 'Criar Cabeçalho',
		value: 'cloudCreateDocumentHeader',
		description: 'Criar um novo documento (cabeçalho)',
		action: 'Criar cabeçalho de documento',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateDocument',
		description: 'Atualizar um documento existente',
		action: 'Atualizar documento (cloud)',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteDocument',
		description: 'Eliminar um documento',
		action: 'Apagar documento (cloud)',
	},
];

const R = 'cloudDocuments';

const listOps = [
	'cloudListBillings',
	'cloudListBillingsBySaftType',
	'cloudListPurchases',
	'cloudListPurchasesBySaftType',
];

export const cloudDocumentProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID do documento
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID do Documento',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudGetDocument', 'cloudUpdateDocument', 'cloudDeleteDocument'],
			},
		},
		description: 'ID numérico do documento',
	},

	// ══════════════════════════════════════════════════════════════════
	// SAFT TYPE — filtro por tipo
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Tipo SAFT',
		name: 'saftType',
		type: 'string',
		required: true,
		default: 'FT',
		placeholder: 'FT',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudListBillingsBySaftType', 'cloudListPurchasesBySaftType'],
			},
		},
		description: 'Tipo de documento SAFT (ex: FT, FR, ND, NC)',
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
	// CREATE HEADER — DocumCreateSchema
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID da Série',
		name: 'idSerie',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'ID da série de configuração do documento',
	},
	{
		displayName: 'ID do Terceiro',
		name: 'idThirdParty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'ID do cliente ou fornecedor. Ignorado se NIF estiver preenchido',
	},
	{
		displayName: 'NIF',
		name: 'fiscalNumber',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'NIF — usado quando o ID do terceiro não está disponível',
	},
	{
		displayName: 'Criar Terceiro Automaticamente',
		name: 'createThirdParty',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'Se ativo, cria um novo terceiro caso o NIF não exista no sistema',
	},
	{
		displayName: 'Data do Documento',
		name: 'docDate',
		type: 'dateTime',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'Data do documento (formato ISO)',
	},
	{
		displayName: 'Campos Adicionais',
		name: 'documentHeaderData',
		type: 'json',
		default: '{}',
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'Campos adicionais do cabeçalho em JSON (sobrepõe campos acima)',
	},

	// ══════════════════════════════════════════════════════════════════
	// UPDATE — DocumentDto + query param sign
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Assinar ao Atualizar',
		name: 'sign',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Se ativo, assina o documento após a atualização',
	},
	{
		displayName: 'Dados do Documento',
		name: 'documentData',
		type: 'json',
		required: true,
		default: '{}',
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Dados do documento no formato JSON (DocumentDto)',
	},
];
