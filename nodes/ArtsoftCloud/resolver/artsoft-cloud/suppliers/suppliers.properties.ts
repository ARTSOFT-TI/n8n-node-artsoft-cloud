import { INodeProperties } from 'n8n-workflow';
import { returnAllProperties } from '../GenericFunctions';

export const cloudSupplierOperations = [
	{
		name: 'List',
		value: 'cloudListSuppliers',
		description: 'List all suppliers',
		action: 'List suppliers (cloud)',
	},
	{
		name: 'Get',
		value: 'cloudGetSupplier',
		description: 'Get a supplier by ID',
		action: 'Get supplier (cloud)',
	},
	{
		name: 'Create',
		value: 'cloudCreateSupplier',
		description: 'Create a new supplier',
		action: 'Create supplier (cloud)',
	},
	{
		name: 'Update',
		value: 'cloudUpdateSupplier',
		description: 'Update a supplier',
		action: 'Update supplier (cloud)',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteSupplier',
		description: 'Delete a supplier',
		action: 'Delete supplier (cloud)',
	},
];

const R = 'cloudSuppliers';
const CU = ['cloudCreateSupplier', 'cloudUpdateSupplier'];

export const cloudSupplierProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Supplier ID',
		name: 'supplierId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetSupplier', 'cloudUpdateSupplier', 'cloudDeleteSupplier'] },
		},
		description: 'Numeric ID of the supplier',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Search',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Search term',
	},
	{
		displayName: 'Filter',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Filter expression',
	},
	...returnAllProperties(R, ['cloudListSuppliers']),
	{
		displayName: 'Sort By',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListSuppliers'] } },
		description: 'Sort direction',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — individual fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Number',
		name: 'supplierNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Sequential number of the supplier',
	},
	{
		displayName: 'Name',
		name: 'supplierName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Full name of the supplier',
	},
	{
		displayName: 'Short Name',
		name: 'supplierShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abbreviated name',
	},
	{
		displayName: 'Tax ID',
		name: 'supplierFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Tax identification number (VAT/NIF)',
	},
	{
		displayName: 'Is Company',
		name: 'supplierIsCompany',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Whether the supplier is a company',
	},

	// — Address —
	{
		displayName: 'Address',
		name: 'supplierAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Street address of the supplier',
	},
	{
		displayName: 'Locality',
		name: 'supplierLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Locality of the address',
	},
	{
		displayName: 'Postal Code',
		name: 'supplierPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Postal code (e.g. 1000-001)',
	},
	{
		displayName: 'District',
		name: 'supplierDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'District ID',
	},
	{
		displayName: 'County',
		name: 'supplierCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'County ID',
	},
	{
		displayName: 'Parish',
		name: 'supplierParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Parish ID',
	},
	{
		displayName: 'Country Region',
		name: 'supplierCountryRegionId',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Country region ID',
	},
	{
		displayName: 'Country Code',
		name: 'supplierCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Country code (620 = Portugal)',
	},

	// — Company —
	{
		displayName: 'Trade Name',
		name: 'supplierTradeName',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, supplierIsCompany: [true] } },
		description: 'Trade name of the company',
	},
	{
		displayName: 'EORI',
		name: 'supplierEori',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, supplierIsCompany: [true] } },
		description: 'EORI number',
	},

	// — Additional fields —
	{
		displayName: 'Additional Fields',
		name: 'supplierAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: CU } },
		options: [
			{
				displayName: 'Anonymous',
				name: 'anonymous',
				type: 'boolean',
				default: false,
				description: 'Whether the supplier is anonymous',
			},
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'string',
				default: '',
				description: 'Birth date (ISO 8601)',
			},
			{
				displayName: 'IBAN',
				name: 'iban',
				type: 'string',
				default: '',
				description: 'IBAN of the supplier',
			},
			{
				displayName: 'Inactive',
				name: 'inactive',
				type: 'boolean',
				default: false,
				description: 'Whether the supplier is inactive',
			},
			{
				displayName: 'Mobile Country',
				name: 'mobileNumberCountryId',
				type: 'number',
				default: 620,
				description: 'Country ID of the mobile number',
			},
			{
				displayName: 'Notes',
				name: 'observation1',
				type: 'string',
				default: '',
				description: 'Notes about the supplier',
			},
			{
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
				description: 'Country ID of the phone number',
			},
			{
				displayName: 'Price Table ID',
				name: 'priceId',
				type: 'number',
				default: 0,
				description: 'ID of the price table',
			},
			{
				displayName: 'Private Record',
				name: 'privateRecord',
				type: 'boolean',
				default: false,
				description: 'Whether the record is private',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'ACTIVE',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				description: 'Status of the supplier',
			},
			{
				displayName: 'Supplier Status ID',
				name: 'supplierStatusId',
				type: 'number',
				default: 1,
				description: 'ID of the supplier status',
			},
			{
				displayName: 'SWIFT',
				name: 'swift',
				type: 'string',
				default: '',
				description: 'SWIFT/BIC code of the supplier',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Website URL of the supplier',
			},
		],
	},
];
