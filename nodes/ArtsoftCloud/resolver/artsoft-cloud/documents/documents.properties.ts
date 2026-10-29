import { INodeProperties } from 'n8n-workflow';
import { filtersProperty, returnAllProperties } from '../GenericFunctions';

export const cloudDocumentOperations = [
	{
		name: 'Create Header',
		value: 'cloudCreateDocumentHeader',
		description: 'Create a new document (header)',
		action: 'Create document header',
	},
	{
		name: 'Delete',
		value: 'cloudDeleteDocument',
		description: 'Delete a document',
		action: 'Delete document (cloud)',
	},
	{
		name: 'Get',
		value: 'cloudGetDocument',
		description: 'Get a document by ID',
		action: 'Get document (cloud)',
	},
	{
		name: 'List Invoices',
		value: 'cloudListBillings',
		description: 'List billing documents',
		action: 'List invoices',
	},
	{
		name: 'List Invoices by SAFT Type',
		value: 'cloudListBillingsBySaftType',
		description: 'List billing documents by SAFT type',
		action: 'List invoices by SAFT type',
	},
	{
		name: 'List Purchases',
		value: 'cloudListPurchases',
		description: 'List purchase documents',
		action: 'List purchases',
	},
	{
		name: 'List Purchases by SAFT Type',
		value: 'cloudListPurchasesBySaftType',
		description: 'List purchase documents by SAFT type',
		action: 'List purchases by SAFT type',
	},
	{
		name: 'Update',
		value: 'cloudUpdateDocument',
		description: 'Update an existing document',
		action: 'Update document (cloud)',
	},
];

const R = 'cloudDocuments';

const listOps = [
	'cloudListBillings',
	'cloudListBillingsBySaftType',
	'cloudListPurchases',
	'cloudListPurchasesBySaftType',
];

export const cloudDocumentProperties: INodeProperties[] = [
	// ══════════════════════════════════════════════════════════════════
	// SHARED — Document ID
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
				operation: ['cloudGetDocument', 'cloudUpdateDocument', 'cloudDeleteDocument'],
			},
		},
		description: 'Numeric ID of the document',
	},

	// ══════════════════════════════════════════════════════════════════
	// SAFT TYPE — filter by type
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'SAFT Type',
		name: 'saftType',
		type: 'string',
		required: true,
		default: 'FT',
		placeholder: 'FT',
		displayOptions: {
			show: {
				resource: [R],
				operation: ['cloudListBillingsBySaftType', 'cloudListPurchasesBySaftType'],
			},
		},
		description: 'SAFT document type (e.g. FT, FR, ND, NC)',
	},

	// ══════════════════════════════════════════════════════════════════
	// LIST — pagination
	// ══════════════════════════════════════════════════════════════════
	filtersProperty(R, listOps),
	...returnAllProperties(R, listOps),

	// ══════════════════════════════════════════════════════════════════
	// CREATE HEADER — DocumCreateSchema
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Series ID',
		name: 'idSerie',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		description: 'ID of the document configuration series',
	},
	{
		displayName: 'Additional Fields',
		name: 'documentAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
		options: [
			{
				displayName: 'Create Third Party Automatically',
				name: 'createThirdParty',
				type: 'boolean',
				default: false,
				description: 'Whether to create a new third party if the Tax ID does not exist in the system',
			},
			{
				displayName: 'Document Date',
				name: 'docDate',
				type: 'dateTime',
				default: '',
				description: 'Document date (ISO format)',
			},
			{
				displayName: 'Tax ID (VAT/NIF)',
				name: 'fiscalNumber',
				type: 'string',
				default: '',
				description: 'Tax ID (VAT/NIF), used when the third party ID is not available',
			},
			{
				displayName: 'Third Party ID',
				name: 'idThirdParty',
				type: 'number',
				default: 0,
				description: 'ID of the customer or supplier. Ignored if Tax ID is filled in.',
			},
		],
	},
	{
		displayName: 'Warehouse ID',
		name: 'idWarehouse',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: { show: { resource: [R], operation: ['cloudCreateDocumentHeader'] } },
	},

	// ══════════════════════════════════════════════════════════════════
	// UPDATE — DocumentDto + query param sign
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Additional Fields',
		name: 'documentUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		options: [
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Document comment / remark',
			},
			{
				displayName: 'Discount (%)',
				name: 'discountPercent',
				type: 'number',
				default: 0,
				description: 'Global discount percentage (total.discountPercent)',
				typeOptions: { numberPrecision: 2 },
			},
			{
				displayName: 'Document Reference',
				name: 'docReference',
				type: 'string',
				default: '',
				description: 'Document reference (financialInfo.docReference)',
			},
			{
				displayName: 'Payment Condition ID',
				name: 'idPayCond',
				type: 'number',
				default: 0,
				description: 'Payment condition ID (financialInfo.idPayCond)',
			},
			{
				displayName: 'Sign on Update',
				name: 'sign',
				type: 'boolean',
				default: false,
				description: 'Whether to sign the document after the update',
			},
			{
				displayName: 'VAT Exemption ID',
				name: 'idVatTypeExemption',
				type: 'number',
				default: 0,
				description: 'ID of the VAT exemption type',
			},
		],
	},

	// ══════════════════════════════════════════════════════════════════
	// UPDATE — Optional forms
	// ══════════════════════════════════════════════════════════════════
	{
		displayName: 'Financial Info (Optional)',
		name: 'documentFinancialInfo',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Additional financial information fields',
		options: [
			{
				displayName: 'Salesperson ID',
				name: 'idSalesPerson',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Third Party Address (Optional)',
		name: 'documentThirdPartyAddress',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Third party address on the document',
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '620',
			},
			{
				displayName: 'Country Region',
				name: 'countryRegionId',
				type: 'string',
				default: '25',
			},
			{
				displayName: 'County',
				name: 'county',
				type: 'string',
				default: '',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Locality',
				name: 'locality',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Parish',
				name: 'parish',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCodeNumeric',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Third Party Contact (Optional)',
		name: 'documentThirdPartyContact',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Third party contact on the document',
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
			},
			{
				displayName: 'Mobile Country',
				name: 'mobileNumberCountryId',
				type: 'string',
				default: '620',
			},
			{
				displayName: 'Mobile Number',
				name: 'mobileNumber',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Phone Country',
				name: 'phoneNumberCountryId',
				type: 'string',
				default: '620',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
			},
		],
	},
	{
		displayName: 'Loading Place (Optional)',
		name: 'documentLoadPlace',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Document loading place',
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '620',
			},
			{
				displayName: 'Country Region',
				name: 'countryRegionId',
				type: 'string',
				default: '25',
			},
			{
				displayName: 'County',
				name: 'county',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Date/Time',
				name: 'dateTime',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'string',
				default: '',
			},
			{
				displayName: 'License Plate',
				name: 'licensePlate',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Locality',
				name: 'locality',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Parish',
				name: 'parish',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCodeNumeric',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Type',
				name: 'loadTypePlace',
				type: 'string',
				default: 'DOCTERCLOC_PLACE',
			},
		],
	},
	{
		displayName: 'Delivery Place (Optional)',
		name: 'documentDeliveryPlace',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: [R], operation: ['cloudUpdateDocument'] } },
		description: 'Document delivery place',
		options: [
			{
				displayName: 'Address',
				name: 'address',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'countryCode',
				type: 'string',
				default: '620',
			},
			{
				displayName: 'Country Region',
				name: 'countryRegionId',
				type: 'string',
				default: '25',
			},
			{
				displayName: 'County',
				name: 'county',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Date/Time',
				name: 'dateTime',
				type: 'dateTime',
				default: '',
			},
			{
				displayName: 'District',
				name: 'district',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Locality',
				name: 'locality',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Parish',
				name: 'parish',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCodeNumeric',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Type',
				name: 'deliveryTypePlace',
				type: 'string',
				default: 'DOCTERCLOC_DELIVERY',
			},
		],
	},
];
