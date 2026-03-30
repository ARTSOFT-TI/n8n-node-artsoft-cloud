import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ArtsoftCloud implements ICredentialType {
	name = 'artsoftCloudApi';
	displayName = 'ARTSOFT CLOUD API';
	documentationUrl = '';
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
			displayName: 'Chave API',
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
			description: 'Se ativado, usa o ambiente de desenvolvimento',
		},
	];
}
