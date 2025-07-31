import { IExecuteSingleFunctions, IN8nHttpFullResponse, INodeExecutionData, INodeProperties } from "n8n-workflow";

export const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			}
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get a user',
				routing: {
					request: {
						url: '=/users/{{$parameter.id}}'
					},
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many users',
				routing: {
					request: {
						url: '=/users',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'users' },
							},
						],
					},
				},
			},
			{
				name: 'Get Online',
				value: 'getOnline',
				action: 'Get online users',
				routing: {
					request: {
						url: '=/users/online',
					},
				},
			},
			{
				name: "Get User's Listening Sessions",
				value: 'getListeningSessions',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: "Get user's listening sessions",
				routing: {
					request: {
						url: '=/users/{{$parameter.id}}/listening-sessions',
					},
				},
			},
			{
				name: "Get User's Listening Stats",
				value: 'getListeningStats',
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-option-action-miscased
				action: "Get user's licensing statistics",
				routing: {
					request: {
						url: '=/users/{{$parameter.id}}/listening-stats',
					},
				},
			},
		],
		default: 'getAll',
	},
	{
		displayName: 'User ID',
		name: 'id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'getListeningSessions', 'getListeningStats'],
			},
		},
	},
	{
		displayName: 'Return',
		name: 'return',
		type: 'options',
		default: 'usersOnline',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['getOnline'],
			},
		},
		routing: {
			output: {
				postReceive: [
					PostReceiveOnlineUsers,
				],
			},
		},
		options: [
			{ name: 'Users', value: 'usersOnline', description: 'Return users that are currently online' },
			{ name: 'Sessions', value: 'openSessions', description: 'Return currently playing playback sessions'},
		],
	},
];

function PostReceiveOnlineUsers(this: IExecuteSingleFunctions, items: INodeExecutionData[], response: IN8nHttpFullResponse): Promise<INodeExecutionData[]> {
	let returnParameter = this.getNodeParameter('return', 'usersOnline') as string;

	let returnItems = (items[0].json[returnParameter] as Object[]).map(value => {
		return { json: value } as INodeExecutionData;
	});
	return Promise.resolve(returnItems);
}
