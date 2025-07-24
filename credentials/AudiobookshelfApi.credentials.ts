import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class AudiobookshelfApi implements ICredentialType {
	name = 'audiobookshelfApi';
	displayName = 'Audiobookshelf API';
	documentationUrl = 'https://api.audiobookshelf.org/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'token',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			}
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			placeholder: 'http://audiobookshelf.local:13378',
			default: '',
		},
	];

	// This allows the credential to be used by other parts of n8n
	// stating how this credential is injected as part of the request
	// An example is the Http Request node that can make generic calls
	// reusing this credential
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}/api',
			url: '/me',
		},
	};
}
