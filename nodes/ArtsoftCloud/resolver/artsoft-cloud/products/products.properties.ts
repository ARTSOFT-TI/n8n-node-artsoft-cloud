import { INodeProperties } from 'n8n-workflow';
import { returnAllProperties } from '../GenericFunctions';

export const cloudProductOperations = [
	{
		name: 'Create',
		value: 'cloudCreateProduct',
		description: 'Create a new product',
		action: 'Create product',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteProduct',
		description: 'Delete a product',
		action: 'Delete product',
	},
	{
		name: 'Get',
		value: 'cloudGetProduct',
		description: 'Get a product by ID',
		action: 'Get product',
	},
	{
		name: 'List',
		value: 'cloudListProducts',
		description: 'List all products',
		action: 'List products',
	},
	{
		name: 'Update',
		value: 'cloudUpdateProduct',
		description: 'Update a product',
		action: 'Update product',
	},
];

const R = 'cloudProducts';
const CU = ['cloudCreateProduct', 'cloudUpdateProduct'];

export const cloudProductProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetProduct', 'cloudUpdateProduct', 'cloudDeleteProduct'] },
		},
		description: 'Numeric ID of the product',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Search',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Search term',
	},
	{
		displayName: 'Filter',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Filter expression',
	},
	...returnAllProperties(R, ['cloudListProducts']),
	{
		displayName: 'Sort By',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListProducts'] } },
		description: 'Sort direction',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — individual fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'SKU',
		name: 'productSku',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Product code (SKU)',
	},
	{
		displayName: 'Name',
		name: 'productMainName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Main name of the product',
	},
	{
		displayName: 'SAF-T Class',
		name: 'productSaftClass',
		type: 'options',
		default: 'SAFT_PROD',
		options: [
			{ name: 'Excluded (E)', value: 'SAFT_EXCL' },
			{ name: 'Other (O)', value: 'SAFT_OTHER' },
			{ name: 'Product (P)', value: 'SAFT_PROD' },
			{ name: 'Service (S)', value: 'SAFT_SERV' },
			{ name: 'Tax/Fee (I)', value: 'SAFT_TAX' },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'SAF-T classification of the product',
	},
	{
		displayName: 'VAT Type',
		name: 'productVatType',
		type: 'options',
		default: 'NORMAL',
		options: [
			{ name: 'Exempt', value: 'ISENTO' },
			{ name: 'Intermediate', value: 'INTERMEDIO' },
			{ name: 'Normal', value: 'NORMAL' },
			{ name: 'Reduced', value: 'REDUZIDO' },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Type of VAT rate',
	},
	{
		displayName: 'Inventory Class',
		name: 'productInventaryClass',
		type: 'options',
		default: 'MERCADORIAS',
		options: [
			{ name: 'By-Products', value: 'SUBPRODUTOS' },
			{ name: 'Finished Goods', value: 'PRODUTOS_ACABADOS' },
			{ name: 'Merchandise', value: 'MERCADORIAS' },
			{ name: 'Packaging', value: 'EMBALAGENS' },
			{ name: 'Raw Materials', value: 'MATERIAS_PRIMAS' },
			{ name: 'Work in Progress', value: 'PRODUTOS_CURSO' },
		],
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Inventory class of the product',
	},
	{
		displayName: 'Warehouse ID',
		name: 'productWarehouseId',
		type: 'number',
		default: 1,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the warehouse',
	},
	{
		displayName: 'Unit of Measure ID',
		name: 'productUnitCodeId',
		type: 'number',
		default: 5,
		placeholder: '5 = Unit',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the unit of measure',
	},
	{
		displayName: 'Quantity Decimal Places',
		name: 'productQuantityDecimalPlaces',
		type: 'number',
		default: 2,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Number of decimal places for the quantity',
	},

	// — Prices —
	{
		displayName: 'Prices',
		name: 'productPrices',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'List of product prices',
		options: [
			{
				name: 'priceValues',
				displayName: 'Price',
				values: [
					{
						displayName: 'Begin Date',
						name: 'beginDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Currency ID',
						name: 'currencyId',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'End Date',
						name: 'endDate',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Number (Price Table)',
						name: 'number',
						type: 'number',
						default: 1,
						description: 'Number of the price table (1, 2, 3...)',
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						typeOptions: { numberPrecision: 2 },
					},
				],
			},
		],
	},

	// — Optional codes —
	{
		displayName: 'Optional Codes',
		name: 'productOptionalCodes',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Optional codes (e.g. barcode)',
		options: [
			{
				name: 'codeValues',
				displayName: 'Code',
				values: [
					{
						displayName: 'Code',
						name: 'code',
						type: 'string',
						default: '',
						description: 'Barcode or alternative code',
					},
					{
						displayName: 'Optional Code ID',
						name: 'optionalCodeId',
						type: 'number',
						default: 2,
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Supplier ID',
						name: 'supplierId',
						type: 'number',
						default: 1,
					},
				],
			},
		],
	},

	// — Additional fields —
	{
		displayName: 'Additional Fields',
		name: 'productAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		options: [
			{
				displayName: 'Discontinued',
				name: 'discontinued',
				type: 'boolean',
				default: false,
				description: 'Whether the product is discontinued',
			},
			{
				displayName: 'Exempt VAT ID',
				name: 'exemptVatId',
				type: 'number',
				default: 0,
			},
			{
				displayName: 'Ignore Header Discount',
				name: 'ignoreHeaderDiscount',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore the document header discount',
			},
			{
				displayName: 'Ignore Line Discount',
				name: 'ignoreLineDiscount',
				type: 'boolean',
				default: false,
				description: 'Whether to ignore the line discount',
			},
			{
				displayName: 'Notes',
				name: 'obs',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Suspended',
				name: 'suspended',
				type: 'boolean',
				default: false,
				description: 'Whether the product is suspended',
			},
			{
				displayName: 'Total Price',
				name: 'totalPrice',
				type: 'boolean',
				default: false,
				description: 'Whether the price is a total price',
			},
		],
	},
];
