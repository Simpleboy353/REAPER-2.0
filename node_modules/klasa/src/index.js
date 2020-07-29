module.exports = {
	// KlasaClient
	Client: require('./lib/Client'),
	KlasaClient: require('./lib/Client'),

	// lib/extensions
	KlasaGuild: require('./lib/extensions/KlasaGuild'),
	KlasaMessage: require('./lib/extensions/KlasaMessage'),
	KlasaUser: require('./lib/extensions/KlasaUser'),

	// lib/permissions
	PermissionLevels: require('./lib/permissions/PermissionLevels'),

	// lib/schedule
	Schedule: require('./lib/schedule/Schedule'),
	ScheduledTask: require('./lib/schedule/ScheduledTask'),

	// lib/settings
	Settings: require('./lib/settings/Settings'),
	Gateway: require('./lib/settings/Gateway'),
	GatewayDriver: require('./lib/settings/GatewayDriver'),
	GatewayStorage: require('./lib/settings/GatewayStorage'),
	Schema: require('./lib/settings/schema/Schema'),
	SchemaFolder: require('./lib/settings/schema/SchemaFolder'),
	SchemaPiece: require('./lib/settings/schema/SchemaPiece'),

	// lib/structures/base
	AliasPiece: require('./lib/structures/base/AliasPiece'),
	AliasStore: require('./lib/structures/base/AliasStore'),
	Piece: require('./lib/structures/base/Piece'),
	Store: require('./lib/structures/base/Store'),

	// lib/structures
	Argument: require('./lib/structures/Argument'),
	ArgumentStore: require('./lib/structures/ArgumentStore'),
	Command: require('./lib/structures/Command'),
	CommandStore: require('./lib/structures/CommandStore'),
	Event: require('./lib/structures/Event'),
	EventStore: require('./lib/structures/EventStore'),
	Extendable: require('./lib/structures/Extendable'),
	ExtendableStore: require('./lib/structures/ExtendableStore'),
	Finalizer: require('./lib/structures/Finalizer'),
	FinalizerStore: require('./lib/structures/FinalizerStore'),
	Inhibitor: require('./lib/structures/Inhibitor'),
	InhibitorStore: require('./lib/structures/InhibitorStore'),
	Language: require('./lib/structures/Language'),
	LanguageStore: require('./lib/structures/LanguageStore'),
	Monitor: require('./lib/structures/Monitor'),
	MonitorStore: require('./lib/structures/MonitorStore'),
	MultiArgument: require('./lib/structures/MultiArgument'),
	Provider: require('./lib/structures/Provider'),
	ProviderStore: require('./lib/structures/ProviderStore'),
	Serializer: require('./lib/structures/Serializer'),
	SerializerStore: require('./lib/structures/SerializerStore'),
	SQLProvider: require('./lib/structures/SQLProvider'),
	Task: require('./lib/structures/Task'),
	TaskStore: require('./lib/structures/TaskStore'),

	// lib/usage
	CommandPrompt: require('./lib/usage/CommandPrompt'),
	CommandUsage: require('./lib/usage/CommandUsage'),
	Usage: require('./lib/usage/Usage'),
	Possible: require('./lib/usage/Possible'),
	Tag: require('./lib/usage/Tag'),
	TextPrompt: require('./lib/usage/TextPrompt'),

	// lib/util
	Colors: require('./lib/util/Colors'),
	KlasaConsole: require('./lib/util/KlasaConsole'),
	constants: require('./lib/util/constants'),
	Cron: require('./lib/util/Cron'),
	Duration: require('./lib/util/Duration'),
	QueryBuilder: require('./lib/util/QueryBuilder'),
	RateLimit: require('./lib/util/RateLimit'),
	RateLimitManager: require('./lib/util/RateLimitManager'),
	ReactionHandler: require('./lib/util/ReactionHandler'),
	RichDisplay: require('./lib/util/RichDisplay'),
	RichMenu: require('./lib/util/RichMenu'),
	Stopwatch: require('./lib/util/Stopwatch'),
	Timestamp: require('./lib/util/Timestamp'),
	Type: require('./lib/util/Type'),
	util: require('./lib/util/util'),

	// version
	version: require('../package').version
};

/**
 * @external Channel
 * @see {@link https://discord.js.org/#/docs/main/master/class/Channel}
 */
/**
 * @external Client
 * @see {@link https://discord.js.org/#/docs/main/master/class/Client}
 */
/**
 * @external DiscordClientOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/ClientOptions}
 */
/**
 * @external ClientApplication
 * @see {@link https://discord.js.org/#/docs/main/master/class/ClientApplication}
 */
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external DMChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/DMChannel}
 */
/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external GuildMember
 * @see {@link https://discord.js.org/#/docs/main/master/class/GuildMember}
 */
/**
 * @external GuildResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/GuildResolvable}
 */
/**
 * @external Message
 * @see {@link https://discord.js.org/#/docs/main/master/class/Message}
 */
/**
 * @external MessageAttachment
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageAttachment}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external MessageReaction
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageReaction}
 */
/**
 * @external MessageOptions
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/MessageOptions}
 */
/**
 * @external Role
 * @see {@link https://discord.js.org/#/docs/main/master/class/Role}
 */
/**
 * @external StringResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/StringResolvable}
 */
/**
 * @external TextChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/TextChannel}
 */
/**
 * @external VoiceChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/VoiceChannel}
 */
/**
 * @external CategoryChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/CategoryChannel}
 */
/**
 * @external User
 * @see {@link https://discord.js.org/#/docs/main/master/class/User}
 */
/**
 * @external UserResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/class/UserResolvable}
 */
/**
 * @external Emoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/Emoji}
 */
/**
 * @external ReactionEmoji
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionEmoji}
 */
/**
 * @external ReactionCollector
 * @see {@link https://discord.js.org/#/docs/main/master/class/ReactionCollector}
 */
/**
 * @external Webhook
 * @see {@link https://discord.js.org/#/docs/main/master/class/Webhook}
 */
/**
 * @external MessageEmbed
 * @see {@link https://discord.js.org/#/docs/main/master/class/MessageEmbed}
 */
/**
 * @external ShardingManager
 * @see {@link https://discord.js.org/#/docs/main/master/class/ShardingManager}
 */
/**
 * @external Permissions
 * @see {@link https://discord.js.org/#/docs/main/master/class/Permissions}
 */
/**
 * @external PermissionResolvable
 * @see {@link https://discord.js.org/#/docs/main/master/typedef/PermissionResolvable}
 */
/**
 * @external Snowflake
 * @see {@link https://discord.js.org/#/docs/main/stable/typedef/Snowflake}
 */
/**
 * @external ExecOptions
 * @see {@link https://nodejs.org/dist/latest-v10.x/docs/api/child_process.html#child_process_child_process_exec_command_options_callback}
 */
