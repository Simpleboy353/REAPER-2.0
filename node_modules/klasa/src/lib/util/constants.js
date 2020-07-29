const { mergeDefault, isObject } = require('./util');

const colorBase = {
	shard: { background: 'cyan', text: 'black' },
	message: {},
	time: {}
};

exports.DEFAULTS = {

	CLIENT: {
		commandEditing: false,
		commandLogging: false,
		commandMessageLifetime: 1800,
		console: {},
		consoleEvents: {
			debug: false,
			error: true,
			log: true,
			verbose: false,
			warn: true,
			wtf: true
		},
		createPiecesFolders: true,
		disabledCorePieces: [],
		language: 'en-US',
		noPrefixDM: false,
		prefix: '',
		preserveSettings: true,
		readyMessage: (client) => `Successfully initialized. Ready to serve ${client.guilds.cache.size} guild${client.guilds.cache.size === 1 ? '' : 's'}.`,
		typing: false,
		customPromptDefaults: {
			time: 30000,
			limit: Infinity,
			quotedStringSupport: false,
			flagSupport: true
		},
		gateways: {
			guilds: {},
			users: {},
			clientStorage: {}
		},
		owners: [],
		// eslint-disable-next-line no-process-env
		production: process.env.NODE_ENV === 'production',
		prefixCaseInsensitive: false,
		providers: { default: 'json' },
		pieceDefaults: {
			arguments: {
				enabled: true,
				aliases: []
			},
			commands: {
				aliases: [],
				autoAliases: true,
				bucket: 1,
				cooldown: 0,
				cooldownLevel: 'author',
				description: '',
				extendedHelp: language => language.get('COMMAND_HELP_NO_EXTENDED'),
				enabled: true,
				flagSupport: true,
				guarded: false,
				hidden: false,
				nsfw: false,
				permissionLevel: 0,
				promptLimit: 0,
				promptTime: 30000,
				requiredSettings: [],
				requiredPermissions: 0,
				runIn: ['text', 'dm'],
				subcommands: false,
				usage: '',
				quotedStringSupport: false,
				deletable: false
			},
			events: {
				enabled: true,
				once: false
			},
			extendables: {
				enabled: true,
				klasa: false,
				appliesTo: []
			},
			finalizers: { enabled: true },
			inhibitors: {
				enabled: true,
				spamProtection: false
			},
			languages: { enabled: true },
			monitors: {
				enabled: true,
				ignoreBots: true,
				ignoreSelf: true,
				ignoreOthers: true,
				ignoreWebhooks: true,
				ignoreEdits: true,
				ignoreBlacklistedUsers: true,
				ignoreBlacklistedGuilds: true,
				allowedTypes: ['DEFAULT']
			},
			providers: { enabled: true },
			serializers: {
				enabled: true,
				aliases: []
			},
			tasks: { enabled: true }
		},
		schedule: { interval: 60000 },
		slowmode: 0,
		slowmodeAggressive: false
	},

	CONSOLE: {
		stdout: process.stdout,
		stderr: process.stderr,
		timestamps: true,
		utc: false,
		types: {
			debug: 'log',
			error: 'error',
			log: 'log',
			verbose: 'log',
			warn: 'warn',
			wtf: 'error'
		},
		colors: {
			debug: mergeDefault(colorBase, { time: { background: 'magenta' } }),
			error: mergeDefault(colorBase, { time: { background: 'red' } }),
			log: mergeDefault(colorBase, { time: { background: 'blue' } }),
			verbose: mergeDefault(colorBase, { time: { text: 'gray' } }),
			warn: mergeDefault(colorBase, { time: { background: 'lightyellow', text: 'black' } }),
			wtf: mergeDefault(colorBase, { message: { text: 'red' }, time: { background: 'red' } })
		}
	},

	QUERYBUILDER: {
		datatypes: {
			any: { type: 'TEXT' },
			boolean: { type: 'BOOLEAN', resolver: value => value },
			categorychannel: { type: 'VARCHAR(18)' },
			channel: { type: 'VARCHAR(18)' },
			command: { type: 'TEXT' },
			float: { type: 'FLOAT', resolver: value => value },
			guild: { type: 'VARCHAR(18)' },
			integer: { type: 'INTEGER', resolver: value => value },
			json: { type: 'JSON', resolver: (value) => `'${JSON.stringify(value).replace(/'/g, "''")}'` },
			language: { type: 'VARCHAR(5)' },
			role: { type: 'VARCHAR(18)' },
			string: { type: ({ max }) => max ? `VARCHAR(${max})` : 'TEXT' },
			textchannel: { type: 'VARCHAR(18)' },
			url: { type: 'TEXT' },
			user: { type: 'VARCHAR(18)' },
			voicechannel: { type: 'VARCHAR(18)' }
		},
		queryBuilderOptions: {
			array: () => 'TEXT',
			resolver: (value) => `'${(isObject(value) ? JSON.stringify(value) : String(value)).replace(/'/g, "''")}'`,
			arrayResolver: (values) => `'${JSON.stringify(values)}'`,
			formatDatatype: (name, datatype, def = null) => `${name} ${datatype}${def !== null ? ` NOT NULL DEFAULT ${def}` : ''}`
		}
	}

};

exports.TIME = {
	SECOND: 1000,
	MINUTE: 1000 * 60,
	HOUR: 1000 * 60 * 60,
	DAY: 1000 * 60 * 60 * 24,

	DAYS: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

	TIMESTAMP: {
		TOKENS: new Map([
			['Y', 4],
			['Q', 1],
			['M', 4],
			['D', 4],
			['d', 4],
			['X', 1],
			['x', 1],
			['H', 2],
			['h', 2],
			['a', 1],
			['A', 1],
			['m', 2],
			['s', 2],
			['S', 3],
			['Z', 2],
			['l', 4],
			['L', 4],
			['T', 1],
			['t', 1]
		])
	},

	CRON: {
		partRegex: /^(?:(\*)|(\d+)(?:-(\d+))?)(?:\/(\d+))?$/,
		wildcardRegex: /\bh\b|\B\?\B/g,
		allowedNum: [[0, 59], [0, 23], [1, 31], [1, 12], [0, 6]],
		predefined: {
			'@annually': '0 0 1 1 *',
			'@yearly': '0 0 1 1 *',
			'@monthly': '0 0 1 * *',
			'@weekly': '0 0 * * 0',
			'@daily': '0 0 * * *',
			'@hourly': '0 * * * *'
		},
		tokens: {
			jan: 1,
			feb: 2,
			mar: 3,
			apr: 4,
			may: 5,
			jun: 6,
			jul: 7,
			aug: 8,
			sep: 9,
			oct: 10,
			nov: 11,
			dec: 12,
			sun: 0,
			mon: 1,
			tue: 2,
			wed: 3,
			thu: 4,
			fri: 5,
			sat: 6
		}
	}

};

exports.TIME.CRON.tokensRegex = new RegExp(Object.keys(exports.TIME.CRON.tokens).join('|'), 'g');

exports.MENTION_REGEX = {
	userOrMember: /^(?:<@!?)?(\d{17,19})>?$/,
	channel: /^(?:<#)?(\d{17,19})>?$/,
	emoji: /^(?:<a?:\w{2,32}:)?(\d{17,19})>?$/,
	role: /^(?:<@&)?(\d{17,19})>?$/,
	snowflake: /^(\d{17,19})$/
};
