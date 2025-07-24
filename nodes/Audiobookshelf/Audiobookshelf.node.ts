import { INodeType, INodeTypeDescription, NodeConnectionType } from "n8n-workflow";

import * as library from './actions/library';

export class Audiobookshelf implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Audiobookshelf',
		name: 'audiobookshelf',
		icon: 'file:audiobookshelf.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Work with the Audiobookshelf API',
		defaults: {
			name: 'Audiobookshelf',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'audiobookshelfApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.domain}}/api',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Library',
						value: 'library',
					},
				],
				default: 'library',
			},
			...library.description,
		],
	};
};
