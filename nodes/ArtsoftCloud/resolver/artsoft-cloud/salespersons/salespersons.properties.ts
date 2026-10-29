import { INodeProperties } from 'n8n-workflow';
import { filtersProperty, returnAllProperties } from '../GenericFunctions';

export const cloudSalespersonOperations = [
	{
		name: 'Create',
		value: 'cloudCreateSalesperson',
		description: 'Create a new salesperson',
		action: 'Create salesperson',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteSalesperson',
		description: 'Delete a salesperson',
		action: 'Delete salesperson',
	},
	{
		name: 'Get',
		value: 'cloudGetSalesperson',
		description: 'Get a salesperson by ID',
		action: 'Get salesperson',
	},
	{
		name: 'List',
		value: 'cloudListSalespersons',
		description: 'List all salespersons',
		action: 'List salespersons',
	},
	{
		name: 'Update',
		value: 'cloudUpdateSalesperson',
		description: 'Update a salesperson',
		action: 'Update salesperson',
	},
];

const R = 'cloudSalespersons';
const CU = ['cloudCreateSalesperson', 'cloudUpdateSalesperson'];

export const cloudSalespersonProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — ID
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Salesperson ID',
		name: 'salespersonId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudGetSalesperson', 'cloudUpdateSalesperson', 'cloudDeleteSalesperson'],
			},
		},
		description: 'Numeric ID of the salesperson',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	filtersProperty(R, ['cloudListSalespersons']),
	...returnAllProperties(R, ['cloudListSalespersons']),

	// ══════════════════════════════════════════════════════════════════
	// CREATE / UPDATE — individual fields
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Number',
		name: 'salespersonNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Sequential number of the salesperson',
	},
	{
		displayName: 'Name',
		name: 'salespersonName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Full name of the salesperson',
	},
	{
		displayName: 'Short Name',
		name: 'salespersonShortName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Abbreviated name',
	},
	{
		displayName: 'Tax ID (VAT/NIF)',
		name: 'salespersonFiscalNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Tax identification number',
	},

	// — Additional fields —
	{
		displayName: 'Additional Fields',
		name: 'salespersonAdditionalFields',
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
				description: 'Street address of the salesperson',
			},
			{
				displayName: 'Anonymous',
				name: 'anonymous',
				type: 'boolean',
				default: false,
				description: 'Whether the record is anonymous',
			},
			{
				displayName: 'Birth Date',
				name: 'birthDate',
				type: 'string',
				default: '',
				description: 'Date of birth (ISO 8601)',
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
				default: 25,
				description: 'ID of the country region',
			},
			{
				displayName: 'County',
				name: 'county',
				type: 'number',
				default: 0,
				description: 'ID of the county',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'number',
				default: 0,
				description: 'ID of the district',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the salesperson',
			},
			{
				displayName: 'Inactive',
				name: 'inactive',
				type: 'boolean',
				default: false,
				description: 'Whether the salesperson is inactive',
			},
			{
				displayName: 'Locality',
				name: 'locality',
				type: 'string',
				default: '',
				description: 'Locality of the address',
			},
			{
				displayName: 'Mobile Phone Country',
				name: 'mobileNumberCountryId',
				type: 'number',
				default: 620,
			},
			{
				displayName: 'Notes',
				name: 'observation1',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Parish',
				name: 'parish',
				type: 'number',
				default: 0,
				description: 'ID of the parish',
			},
			{
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
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
			},
		],
	},
];
