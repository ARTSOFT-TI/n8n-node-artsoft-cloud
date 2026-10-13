import { INodeProperties } from 'n8n-workflow';

export const cloudCurrAccountOperations = [
	{
		name: 'List Customers',
		value: 'cloudListCustomerAccounts',
		description: 'List customer current accounts',
		action: 'List customer current accounts',
	},
	{
		name: 'List Suppliers',
		value: 'cloudListSupplierAccounts',
		description: 'List supplier current accounts',
		action: 'List supplier current accounts',
	},
	{
		name: 'Get',
		value: 'cloudGetCurrAccount',
		description: 'Get a current account by ID',
		action: 'Get a current account',
	},
	{
		name: 'Create Debit',
		value: 'cloudCreateCurrAccountEntry',
		description: 'Create a manual debit in a current account',
		action: 'Create a debit in a current account',
	},
	{
		name: 'Create Credit',
		value: 'cloudCreateCurrAccountRegul',
		description: 'Create a credit in a current account',
		action: 'Create a credit in a current account',
	},
	{
		name: 'Update',
		value: 'cloudUpdateCurrAccount',
		description: 'Update a current account',
		action: 'Update a current account',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteCurrAccount',
		description: 'Delete a current account',
		action: 'Delete a current account',
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
		displayName: 'Current Account ID',
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
		description: 'Numeric ID of the current account',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Search',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Search term',
	},
	{
		displayName: 'Filter',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Filter expression',
	},
	{
		displayName: 'Page Size',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Number of results per page',
	},
	{
		displayName: 'Sort By',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Field to sort by',
	},
	{
		displayName: 'Direction',
		name: '$direction',
		type: 'options',
		default: 'asc',
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'desc' },
		],
		displayOptions: { show: { resource: [R], operation: listOps } },
		description: 'Sort direction',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE ENTRY / REGUL — required fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Series ID',
		name: 'caIdSerie',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'ID of the configuration series',
	},
	{
		displayName: 'Third Party ID',
		name: 'caIdThirdParty',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'ID of the customer or supplier',
	},
	{
		displayName: 'Tax ID',
		name: 'caFiscalNumber',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Tax ID (VAT/NIF) of the third party',
	},
	{
		displayName: 'Amount',
		name: 'caValCurrAcc',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Current account amount',
	},
	{
		displayName: 'Balance',
		name: 'caBalance',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Total balance',
	},
	{
		displayName: 'Document Date',
		name: 'caDocDate',
		type: 'dateTime',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Date of the document',
	},
	{
		displayName: 'Comment',
		name: 'caComment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Free-text notes about the entry',
	},
	{
		displayName: 'Document Reference',
		name: 'caDocReference',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: createOps } },
		description: 'Reference to the document',
	},

	// — Additional fields —
	{
		displayName: 'Additional Fields',
		name: 'caAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: createOps } },
		options: [
			{
				displayName: 'Due Date',
				name: 'vencDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Payment Date',
				name: 'payDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Total Manual Mode',
				name: 'isTotalManualMode',
				type: 'boolean',
				default: false,
				description: 'Whether to use manual total mode',
			},
		],
	},

	// — Entry VAT —
	{
		displayName: 'Entry VAT',
		name: 'caCurrAccEntryVat',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudCreateCurrAccountEntry', 'cloudUpdateCurrAccount'] } },
		description: 'VAT data of the entry',
		options: [
			{
				name: 'vatValues',
				displayName: 'VAT',
				values: [
					{
						displayName: 'VAT Base',
						name: 'vatBase',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
						description: 'VAT taxable base amount',
					},
					{
						displayName: 'VAT Exemption ID',
						name: 'vatTypeExemption',
						type: 'number',
						default: 0,
						description: 'ID of the VAT exemption (only for the Exempt type)',
					},
					{
						displayName: 'VAT Type',
						name: 'vatType',
						type: 'options',
						default: 'NORMAL',
						options: [
							{ name: 'Exempt', value: 'ISENTO' },
							{ name: 'Intermediate', value: 'INTERMEDIA' },
							{ name: 'Normal', value: 'NORMAL' },
							{ name: 'Reduced', value: 'REDUZIDA' },
						],
					},
				],
			},
		],
	},

	// — Regularization list (regul) —
	{
		displayName: 'Items to Regularize',
		name: 'caToRegulList',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudCreateCurrAccountRegul'] } },
		description: 'List of documents to regularize',
		options: [
			{
				name: 'regulValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'Balance',
						name: 'balance',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Billing Document ID',
						name: 'idDocFr',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Due Date',
						name: 'vencDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Has Taxes',
						name: 'hasTaxes',
						type: 'boolean',
						default: false,
						description: 'Whether the entry has taxes',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'number',
						default: 0,
						description: 'ID of the entry to regularize',
					},
					{
						displayName: 'Is Regularized By',
						name: 'isRegulBy',
						type: 'boolean',
						default: false,
						description: 'Whether the entry is regularized by another entry',
					},
					{
						displayName: 'Original Value',
						name: 'value',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Series',
						name: 'serie',
						type: 'string',
						default: '',
						description: 'Series of the document (e.g. B0022/22)',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: 'CREDITOS_CLI',
						description: 'Type of the entry (e.g. CREDITOS_CLI)',
					},
					{
						displayName: 'Value to Regularize',
						name: 'regulValue',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
				],
			},
		],
	},

	// ══════════════════════════════════════════════════════════════════
	// UPDATE — main fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Comment',
		name: 'caUpdateComment',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Free-text notes about the entry',
	},
	{
		displayName: 'Document Reference',
		name: 'caUpdateDocReference',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Reference to the document',
	},
	{
		displayName: 'Amount',
		name: 'caUpdateValCurrAcc',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Current account amount',
	},
	{
		displayName: 'Balance',
		name: 'caUpdateBalance',
		type: 'number',
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'Total balance',
	},
	{
		displayName: 'Additional Fields (Update)',
		name: 'caUpdateAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		options: [
			{
				displayName: 'Document Date',
				name: 'docDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Due Date',
				name: 'vencDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Invoice Number',
				name: 'invoiceNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Payment Date',
				name: 'payDate',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'Salesperson ID',
				name: 'salesPersonId',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Salesperson Name',
				name: 'salesPersonName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Salesperson Tax ID',
				name: 'salesPersonFiscalNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Series ID',
				name: 'idSerie',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Signed',
				name: 'isSigned',
				type: 'boolean',
				default: false,
				description: 'Whether the entry is signed',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				default: 'FINALIZED',
				options: [
					{ name: 'Draft', value: 'DRAFT' },
					{ name: 'Finalized', value: 'FINALIZED' },
				],
			},
			{
				displayName: 'Third Party ID',
				name: 'idThirdParty',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Third Party Name',
				name: 'thirdPartyName',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Total Manual Mode',
				name: 'isTotalManualMode',
				type: 'boolean',
				default: false,
				description: 'Whether to use manual total mode',
			},
		],
	},
	{
		displayName: 'Items to Regularize (Update)',
		name: 'caUpdateToRegulList',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateCurrAccount'] } },
		description: 'List of documents to regularize',
		options: [
			{
				name: 'regulValues',
				displayName: 'Item',
				values: [
					{
						displayName: 'Balance',
						name: 'balance',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Billing Document ID',
						name: 'idDocFr',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Billing Document Invoice Number',
						name: 'docFrInvoiceNumber',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Due Date',
						name: 'vencDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Editable',
						name: 'editable',
						type: 'boolean',
						default: true,
						description: 'Whether the entry is editable',
					},
					{
						displayName: 'Has Taxes',
						name: 'hasTaxes',
						type: 'boolean',
						default: false,
						description: 'Whether the entry has taxes',
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Is Regularized By',
						name: 'isRegulBy',
						type: 'boolean',
						default: false,
						description: 'Whether the entry is regularized by another entry',
					},
					{
						displayName: 'Original Value',
						name: 'value',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
					{
						displayName: 'Series',
						name: 'serie',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'string',
						default: 'CREDITOS_CLI',
					},
					{
						displayName: 'Value to Regularize',
						name: 'regulValue',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
				],
			},
		],
	},
];
