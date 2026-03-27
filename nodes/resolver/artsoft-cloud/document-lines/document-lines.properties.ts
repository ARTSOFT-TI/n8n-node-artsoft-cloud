import { INodeProperties } from 'n8n-workflow';

export const cloudDocumentLineOperations = [
	{
		name: 'Listar',
		value: 'cloudListDocumentLines',
		description: 'Listar as linhas de um documento',
		action: 'Listar linhas de documento',
	},
	{
		name: 'Consultar',
		value: 'cloudGetDocumentLine',
		description: 'Obter uma linha específica de um documento',
		action: 'Consultar linha de documento',
	},
	{
		name: 'Criar',
		value: 'cloudCreateDocumentLine',
		description: 'Criar uma nova linha num documento',
		action: 'Criar linha de documento',
	},
	{
		name: 'Atualizar',
		value: 'cloudUpdateDocumentLine',
		description: 'Atualizar uma linha de um documento',
		action: 'Atualizar linha de documento',
	},
	{
		name: 'Apagar',
		value: 'cloudDeleteDocumentLine',
		description: 'Eliminar uma linha de um documento',
		action: 'Apagar linha de documento',
	},
];

const R = 'cloudDocumentLines';

export const cloudDocumentLineProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID do documento (todas as operações)
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
				operation: [
					'cloudListDocumentLines',
					'cloudGetDocumentLine',
					'cloudCreateDocumentLine',
					'cloudUpdateDocumentLine',
					'cloudDeleteDocumentLine',
				],
			},
		},
		description: 'ID do documento pai',
	},

	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID da linha
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'ID da Linha',
		name: 'lineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudGetDocumentLine', 'cloudUpdateDocumentLine', 'cloudDeleteDocumentLine'],
			},
		},
		description: 'ID da linha do documento',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — paginação simples
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Página',
		name: 'page',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Número da página (começa em 0)',
	},
	{
		displayName: 'Tamanho da Página',
		name: 'size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Número de resultados por página',
	},
	{
		displayName: 'Filtro',
		name: 'filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Expressão de filtro',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — confirmação de limite de crédito
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Confirmar Limite de Crédito',
		name: 'confirmCreditLimit',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		description: 'Confirmar ultrapassagem do limite de crédito',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — corpo (DocLineCreateDto / DocLineFullDto)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Dados da Linha',
		name: 'lineData',
		type: 'json',
		required: true,
		default: '{\n  "idSku": 0,\n  "quantity": 1,\n  "valUn": 0\n}',
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		description: 'Dados da linha no formato JSON (DocLineCreateDto)',
	},
];
