import { INodeProperties } from 'n8n-workflow';
import { returnAllProperties } from '../GenericFunctions';

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
	{
		displayName: 'Search',
		name: '$search',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Search term',
	},
	{
		displayName: 'Filter',
		name: '$filter',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Filter expression',
	},
	...returnAllProperties(R, ['cloudListSalespersons']),
	{
		displayName: 'Sort By',
		name: '$sort',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
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
		displayOptions: { show: { resource: [R], operation: ['cloudListSalespersons'] } },
		description: 'Sort direction',
	},

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
	{
		displayName: 'Email',
		name: 'salespersonEmail',
		type: 'string',
		placeholder: 'name@email.com',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Email address of the salesperson',
	},

	// — Address —
	{
		displayName: 'Address',
		name: 'salespersonAddress',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Street address of the salesperson',
	},
	{
		displayName: 'Locality',
		name: 'salespersonLocality',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
	},
	{
		displayName: 'Postal Code',
		name: 'salespersonPostalCode',
		type: 'string',
		default: '',
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Postal code (e.g. 1000-001)',
	},
	{
		displayName: 'District',
		name: 'salespersonDistrict',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the district',
	},
	{
		displayName: 'County',
		name: 'salespersonCounty',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the county',
	},
	{
		displayName: 'Parish',
		name: 'salespersonParish',
		type: 'number',
		default: 0,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the parish',
	},
	{
		displayName: 'Country Region',
		name: 'salespersonCountryRegionId',
		type: 'number',
		default: 25,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'ID of the country region',
	},
	{
		displayName: 'Country Code',
		name: 'salespersonCountryCode',
		type: 'number',
		default: 620,
		displayOptions: { show: { resource: [R], operation: CU } },
		description: 'Country code (620 = Portugal)',
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
				displayName: 'Inactive',
				name: 'inactive',
				type: 'boolean',
				default: false,
				description: 'Whether the salesperson is inactive',
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
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'number',
				default: 620,
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
