/* eslint-disable n8n-nodes-base/node-param-options-type-unsorted-items */
/* eslint-disable n8n-nodes-base/node-param-operation-option-action-miscased */
import { INodeProperties } from "n8n-workflow";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['library']
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a library',
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}'
					}
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many libraries',
				routing: {
					request: {
						url: '=/libraries'
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'libraries' }
							}
						]
					}
				}
			},
			{
				name: 'Get Items',
				value: 'getItems',
				action: "Get library's items",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/items',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'results' }
							}
						]
					}
				}
			},
			{
				name: 'Get Series',
				value: 'getSeries',
				action: "Get library's series",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/series',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'results' }
							}
						]
					}
				}
			},
			{
				name: 'Get Collections',
				value: 'getCollections',
				action: "Get library's collections",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/collections',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'results' }
							}
						]
					}
				}
			},
			{
				name: 'Get Playlists',
				value: 'getPlaylists',
				action: "Get library's playlists",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/playlists',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'results' }
							}
						]
					}
				}
			},
			{
				name: 'Get Personalized View',
				value: 'getPersonalizedView',
				action: "Get library's personalized view for home page display",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/personalized',
					},
				}
			},
			{
				name: 'Get Filter Data',
				value: 'getFilterData',
				action: "Get library's filter data that can be used for displaying a filter list",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/filterdata',
					},
				},
			},
			{
				name: 'Get Stats',
				value: 'getStats',
				action: "Get library's stats",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/stats',
					},
				},
			},
			{
				name: 'Get Authors',
				value: 'getAuthors',
				action: "Get library's authors",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/authors',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'authors' }
							}
						]
					}
				}
			},
			{
				name: 'Get Recent Episodes',
				value: 'getRecentEpisodes',
				action: "Get library's recent podcast episodes",
				routing: {
					request: {
						url: '=/libraries/{{$parameter.id}}/recent-episodes',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'episodes' }
							}
						]
					}
				}
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'Library ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['get', 'getItems', 'getSeries', 'getCollections', 'getPlaylists', 'getPersonalizedView', 'getFilterData', 'getStats', 'getAuthors', 'getRecentEpisodes'],
			},
		},
	},
	{
		displayName: 'Filter Data',
		name: 'filterData',
		description: 'Whether filter data should be included in the output',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['get'],
			},
		},
		default: false,
		routing: {
			send: {
				property: 'include',
				type: 'query',
				value: '={{$if($value, "filterdata", "")}}',
			},
		},
	},
	{
		displayName: 'Include RSS Feed',
		name: 'filterData',
		description: 'Whether RSS feed data should be included in the output',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['getItems', 'getSeries', 'getCollections', 'getPersonalizedView'],
			},
		},
		default: false,
		routing: {
			send: {
				property: 'include',
				type: 'query',
				value: '={{$if($value, "rssfeed", "")}}',
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		description: 'Whether to return all results or only up to a given limit',
		routing: {
			send: {
				property: 'limit',
				type: 'query',
				value: '0',
			},
		},
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['getItems', 'getCollections', 'getPlaylists', 'getPersonalizedView', 'getRecentEpisodes'],
			},
		},
		default: true,
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		routing: {
			send: {
				property: 'limit',
				type: 'query',
				value: '={{$value}}',
			},
		},
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['getItems', 'getCollections', 'getPlaylists', 'getPersonalizedView', 'getRecentEpisodes'],
				returnAll: [false]
			},
		},
		default: 50
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
		required: true,
		routing: {
			send: {
				property: 'limit',
				type: 'query',
				value: '={{$value}}',
			},
		},
		displayOptions: {
			show: {
				resource: ['library'],
				operation: ['getSeries'],
			},
		},
		default: 50
	}
];
