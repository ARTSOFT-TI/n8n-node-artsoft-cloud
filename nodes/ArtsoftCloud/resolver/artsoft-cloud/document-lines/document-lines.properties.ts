import { INodeProperties } from 'n8n-workflow';

export const cloudDocumentLineOperations = [
	{
		name: 'Create',
		value: 'cloudCreateDocumentLine',
		description: 'Create a new line in a document',
		action: 'Create document line',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteDocumentLine',
		description: 'Delete a line from a document',
		action: 'Delete document line',
	},
	{
		name: 'Get',
		value: 'cloudGetDocumentLine',
		description: 'Get a specific line of a document',
		action: 'Get document line',
	},
	{
		name: 'List',
		value: 'cloudListDocumentLines',
		description: 'List the lines of a document',
		action: 'List document lines',
	},
	{
		name: 'Update',
		value: 'cloudUpdateDocumentLine',
		description: 'Update a line of a document',
		action: 'Update document line',
	},
];

const R = 'cloudDocumentLines';

export const cloudDocumentLineProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — Document ID (all operations)
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Document ID',
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
		description: 'ID of the parent document',
	},

	// ══════════════════════════════════════════════════════════════════
	// SHARED — Line ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Line ID',
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
		description: 'ID of the document line',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — simple pagination
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Page number (starts at 0)',
	},
	{
		displayName: 'Page Size',
		name: 'size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Number of results per page',
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListDocumentLines'] } },
		description: 'Filter expression',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — credit limit confirmation
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Confirm Credit Limit',
		name: 'confirmCreditLimit',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		description: 'Whether to confirm exceeding the credit limit',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — individual fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Product ID (SKU)',
		name: 'lineIdSku',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		description: 'Product/SKU ID',
	},
	{
		displayName: 'Quantity',
		name: 'lineQuantity',
		type: 'number',
		required: true,
		default: 1,
		typeOptions: { numberPrecision: 2 },
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
	},
	{
		displayName: 'Unit Price',
		name: 'lineValUn',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: { numberPrecision: 2 },
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		description: 'Net unit value',
	},
	{
		displayName: 'Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: { resource: [R], operation: ['cloudCreateDocumentLine', 'cloudUpdateDocumentLine'] },
		},
		options: [
			{
				displayName: 'Gross Unit Price',
				name: 'valUnGross',
				type: 'number',
				default: 0,
				typeOptions: { numberPrecision: 2 },
				description: 'Gross unit value (before discounts)',
			},
			{
				displayName: 'Total Discount (%)',
				name: 'discountTotalPercent',
				type: 'number',
				default: 0,
				typeOptions: { numberPrecision: 2 },
				description: 'Total discount percentage of the line',
			},
		],
	},
];
