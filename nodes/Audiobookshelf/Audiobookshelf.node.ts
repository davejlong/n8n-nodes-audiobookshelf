import { INodeType, INodeTypeDescription, NodeConnectionType } from "n8n-workflow";

import * as library from './actions/library';
import * as libraryItem from './actions/library_item';
import * as user from './actions/user';

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
					{
						name: 'Library Item',
						value: 'libraryItem',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'library',
			},
			...library.description,
			...libraryItem.description,
			...user.description,
		],
	};
};
