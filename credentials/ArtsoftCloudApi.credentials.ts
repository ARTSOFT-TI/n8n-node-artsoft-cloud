import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

const BASE_URL_EXPRESSION =
	"={{$credentials.development ? 'http://' + $credentials.nif + '.local.artsoft.cloud:3000/api' : 'https://' + $credentials.nif + '.artsoft.cloud/api'}}";

export class ArtsoftCloudApi implements ICredentialType {
	name = 'artsoftCloudApi';
	displayName = 'ARTSOFT Cloud Invoice API';
	icon = 'file:../nodes/ArtsoftCloud/artsoft.svg' as const;
	documentationUrl = 'https://artsoft-cloud.eniston.com/';
	properties: INodeProperties[] = [
		{
			displayName: 'NIF',
			name: 'nif',
			type: 'string',
			default: '',
			placeholder: '123456789',
			required: true,
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
		},
		{
			displayName: 'Development',
			name: 'development',
			type: 'boolean',
			default: false,
			description: 'Whether to use the development environment instead of production',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{$credentials.apiKey}}',
			},
		},
	};

	// Assumption: GET /customers/ (already used by the Customers resource) is a cheap, read-only
	// endpoint that rejects invalid API keys. Confirm against the API documentation.
	test: ICredentialTestRequest = {
		request: {
			baseURL: BASE_URL_EXPRESSION,
			url: '/customers/',
			method: 'GET',
			qs: { $size: 1 },
		},
	};
}
