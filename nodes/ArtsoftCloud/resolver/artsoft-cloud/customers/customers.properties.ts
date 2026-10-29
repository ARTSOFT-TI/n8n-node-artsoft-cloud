import { INodeProperties } from 'n8n-workflow';
import { filtersProperty, returnAllProperties } from '../GenericFunctions';

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
	filtersProperty(R, ['cloudListCustomers']),
	...returnAllProperties(R, ['cloudListCustomers']),

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
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
				description: 'Street address of the customer',
			},
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
				displayName: 'District',
				name: 'district',
				type: 'number',
				default: 0,
				description: 'District ID',
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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the customer',
			},
			{
				displayName: 'EORI',
				name: 'eori',
				type: 'string',
				default: '',
				description: 'EORI number',
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
				displayName: 'Is Company',
				name: 'isCompany',
				type: 'boolean',
				default: false,
				description: 'Whether the customer is a company',
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
				description: 'Website URL of the customer',
			},
		],
	},
];
