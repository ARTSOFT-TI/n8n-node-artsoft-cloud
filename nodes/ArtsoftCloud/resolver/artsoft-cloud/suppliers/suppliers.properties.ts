import { INodeProperties } from 'n8n-workflow';
import { filtersProperty, returnAllProperties } from '../GenericFunctions';

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
	filtersProperty(R, ['cloudListSuppliers']),
	...returnAllProperties(R, ['cloudListSuppliers']),

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
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Street address of the supplier',
			},
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
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'number',
				default: 620,
				description: 'Country code (620 = Portugal)',
			},
			{
				displayName: 'Country Region',
				name: 'countryRegionId',
				type: 'number',
				default: 0,
				description: 'Country region ID',
			},
			{
				displayName: 'County',
				name: 'county',
				type: 'number',
				default: 0,
				description: 'County ID',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'number',
				default: 0,
				description: 'District ID',
			},
			{
				displayName: 'EORI',
				name: 'eori',
				type: 'string',
				default: '',
				description: 'EORI number',
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
				displayName: 'Is Company',
				name: 'isCompany',
				type: 'boolean',
				default: false,
				description: 'Whether the supplier is a company',
			},
			{
				displayName: 'Locality',
				name: 'locality',
				type: 'string',
				default: '',
				description: 'Locality of the address',
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
				displayName: 'Parish',
				name: 'parish',
				type: 'number',
				default: 0,
				description: 'Parish ID',
			},
			{
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
				description: 'Country ID of the phone number',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'Postal code (e.g. 1000-001)',
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
				displayName: 'Trade Name',
				name: 'tradeName',
				type: 'string',
				default: '',
				description: 'Trade name of the company',
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
