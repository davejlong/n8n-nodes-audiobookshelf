/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import { IBinaryKeyData, IExecuteSingleFunctions, IN8nHttpFullResponse, INodeExecutionData, INodeProperties } from "n8n-workflow";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['libraryItem']
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a library item',
				routing: {
					request: {
						url: '=/items/{{$parameter.id}}'
					}
				}
			},
			{
				name: 'Get Item Cover',
				value: 'getCover',
				action: "Get a library item's cover",
				routing: {
					request: {
						url: '=/items/{{$parameter.id}}/cover',
						encoding: 'arraybuffer',
					},
					output: {
						postReceive: [
							PostReceiveCover
							// {
							// 	type: 'binaryData',
							// 	properties: {
							// 		destinationProperty: 'data',
							// 	},
							// },
						],
					},
				},
			},
		],
		default: 'get'
	},
	{
		displayName: 'Library Item ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['libraryItem'],
			},
		},
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add option',
		displayOptions: {
			show: {
				resource: ['libraryItem'],
				operation: ['get'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Expanded',
				name: 'expanded',
				type: 'boolean',
				default: true,
				routing: {
					send: {
						property: 'expanded',
						value: "={{+ $value }}",
						type: 'query'
					}
				}
			},
			{
				displayName: 'Include',
				description: 'List of what to include with the library item. Authors option only available for books and Downloads option only available for podcasts.',
				name: 'include',
				default: [],
				type: 'multiOptions',
				routing: {
					send: {
						property: 'include',
						value: "={{ $value.join(',') }}",
						type: 'query'
					}
				},
				options: [
					{ name: 'Progress', value: 'progress' },
					{ name: 'RSS Feed', value: 'rssfeed' },
					{ name: 'Authors', value: 'authors' },
					{ name: 'Downloads', value: 'downloads' },
				]
			},
			{
				displayName: 'Episode',
				description: 'If requesting progress for a podcast, the episode to get progress for',
				name: 'episode',
				default: '',
				type: 'string',
				routing: {
					send: {
						property: 'episode',
						value: '={{ $value }}',
						type: 'query'
					}
				}
			}
		]
	},
];

async function PostReceiveCover(this: IExecuteSingleFunctions, items: INodeExecutionData[], response: IN8nHttpFullResponse): Promise<INodeExecutionData[]> {
	const binaryData = await this.helpers.prepareBinaryData(response.body as Buffer, 'cover', response.headers['Content-Type'] as string);
	const newItems = items.map((item, index) => {
		item.json = {};
		item.binary = { data: binaryData } as IBinaryKeyData;
		item.pairedItem = index;
		return item;
	});
	return newItems;
}
