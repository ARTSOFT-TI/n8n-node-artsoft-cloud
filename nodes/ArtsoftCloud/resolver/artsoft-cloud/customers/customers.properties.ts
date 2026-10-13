import { INodeProperties } from 'n8n-workflow';

export const cloudCustomerOperations = [
	{
		name: 'List',
		value: 'cloudListCustomers',
		description: 'List all customers',
		action: 'List customers (cloud)',
	},
	{
		name: 'Get',
		value: 'cloudGetCustomer',
		description: 'Get a customer by ID',
		action: 'Get customer (cloud)',
	},
	{
		name: 'Create',
		value: 'cloudCreateCustomer',
		description: 'Create a new customer',
		action: 'Create customer (cloud)',
	},
	{
		name: 'Update',
		value: 'cloudUpdateCustomer',
		description: 'Update a customer',
		action: 'Update customer (cloud)',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteCustomer',
		description: 'Delete a customer',
		action: 'Delete customer (cloud)',
	},
];

const R = 'cloudCustomers';
const CU = ['cloudCreateCustomer', 'cloudUpdateCustomer'];

export const cloudCustomerProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: { resource: [R], operation: ['cloudGetCustomer', 'cloudUpdateCustomer', 'cloudDeleteCustomer'] },
		},
		description: 'Numeric ID of the customer',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Search',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Search term',
	},
	{
		displayName: 'Filter',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Filter expression',
	},
	{
		displayName: 'Page Size',
		name: '$size',
		type: 'number',
		default: 10,
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Number of results per page',
	},
	{
		displayName: 'Sort By',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListCustomers'] } },
		description: 'Sort direction',
	},

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — individual fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Number',
		name: 'customerNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Sequential number of the customer',
	},
	{
		displayName: 'Name',
		name: 'customerName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Full name of the customer',
	},
	{
		displayName: 'Short Name',
		name: 'customerShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abbreviated name',
	},
	{
		displayName: 'Tax ID',
		name: 'customerFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Tax identification number (VAT/NIF)',
	},
	{
		displayName: 'Is Company',
		name: 'customerIsCompany',
		type: 'boolean',
		default: false,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Whether the customer is a company',
	},
	{
		displayName: 'Email',
		name: 'customerEmail',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Email address of the customer',
	},

	// — Address —
	{
		displayName: 'Address',
		name: 'customerAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Street address of the customer',
	},
	{
		displayName: 'Locality',
		name: 'customerLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Locality of the address',
	},
	{
		displayName: 'Postal Code',
		name: 'customerPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Postal code (e.g. 1000-001)',
	},
	{
		displayName: 'District',
		name: 'customerDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'District ID',
	},
	{
		displayName: 'County',
		name: 'customerCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'County ID',
	},
	{
		displayName: 'Parish',
		name: 'customerParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Parish ID',
	},
	{
		displayName: 'Country Region',
		name: 'customerCountryRegionId',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Country region ID',
	},
	{
		displayName: 'Country Code',
		name: 'customerCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Country code (620 = Portugal)',
	},

	// — Company —
	{
		displayName: 'Trade Name',
		name: 'customerTradeName',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, customerIsCompany: [true] } },
		description: 'Trade name of the company',
	},
	{
		displayName: 'EORI',
		name: 'customerEori',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU, customerIsCompany: [true] } },
		description: 'EORI number',
	},

	// — Additional options —
	{
		displayName: 'Additional Fields',
		name: 'customerAdditionalFields',
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
				description: 'Whether the customer is anonymous',
			},
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'string',
				default: '',
				description: 'Birth date (ISO 8601)',
			},
			{
				displayName: 'Credit Limit',
				name: 'creditLimit',
				type: 'string',
				default: '',
				description: 'Credit limit of the customer',
			},
			{
				displayName: 'Customer Status ID',
				name: 'customerStatusId',
				type: 'number',
				default: 1,
				description: 'ID of the customer status',
			},
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'string',
				default: '',
				description: 'Default discount for the customer',
			},
			{
				displayName: 'Document Delivery Email',
				name: 'documentDeliveryEmail',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address where documents are delivered',
			},
			{
				displayName: 'Exempt VAT ID',
				name: 'exemptVatId',
				type: 'string',
				default: '',
				description: 'ID of the VAT exemption',
			},
			{
				displayName: 'Expedition Mode ID',
				name: 'expeditionModeId',
				type: 'string',
				default: '',
				description: 'ID of the expedition mode',
			},
			{
				displayName: 'Inactive',
				name: 'inactive',
				type: 'boolean',
				default: false,
				description: 'Whether the customer is inactive',
			},
			{
				displayName: 'Mobile Country',
				name: 'mobileNumberCountryId',
				type: 'number',
				default: 620,
				description: 'Country ID of the mobile number',
			},
			{
				displayName: 'No MB References',
				name: 'noMbReferences',
				type: 'boolean',
				default: false,
				description: 'Whether to disable Multibanco references for the customer',
			},
			{
				displayName: 'Notes',
				name: 'observation1',
				type: 'string',
				default: '',
				description: 'Notes about the customer',
			},
			{
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
				description: 'Country ID of the phone number',
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
				description: 'Status of the customer',
			},
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Website URL of the customer',
			},
		],
	},
];
