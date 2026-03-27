import {
	IAuthenticate,
	Icon,
	ICredentialDataDecryptedObject,
	ICredentialTestRequest,
	ICredentialType,
	IDataObject,
	IHttpRequestHelper,
	INodeProperties,
	Themed,
	ThemeIconColor,
} from 'n8n-workflow';

export class ArtsoftCloud implements ICredentialType {
	name = 'artsoftCloudApi';
	displayName = 'ARTSOFT CLOUD API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'Chave api',
			name: 'apiKey',
			type: 'string',
			default: '',
			placeholder: '',
			required: true,
		},
		{
			displayName: 'URL api',
			name: 'baseUrl',
			type: 'string',
			default: '',
			placeholder: 'https://login.local.artsoft.cloud:3000/',
			required: true,
		},
	];
}
