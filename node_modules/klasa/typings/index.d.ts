declare module 'klasa' {

	import { ExecOptions } from 'child_process';

	import {
		APIMessage,
		BufferResolvable,
		CategoryChannel,
		Channel,
		Client,
		ClientApplication,
		ClientOptions,
		ClientUser,
		Collection,
		DMChannel,
		Emoji,
		EmojiResolvable,
		Guild,
		GuildChannel,
		GuildEmoji,
		GuildMember,
		Message,
		MessageAdditions,
		MessageAttachment,
		MessageCollector,
		MessageEmbed,
		MessageOptions,
		MessageReaction,
		MessageType,
		PermissionResolvable,
		Permissions,
		Presence,
		RateLimitData,
		ReactionCollector,
		Role,
		Snowflake,
		Speaking,
		StringResolvable,
		TextChannel,
		User,
		UserResolvable,
		VoiceChannel,
		VoiceState,
		WebhookClient
	} from 'discord.js';

	export const version: string;

//#region Classes

	export class KlasaClient extends Client {
		public constructor(options?: KlasaClientOptions);
		public login(token?: string): Promise<string>;
		private validatePermissionLevels(): PermissionLevels;

		public sweepMessages(lifetime?: number, commandLifeTime?: number): number;
		public static basePermissions: Permissions;
		public static defaultGuildSchema: Schema;
		public static defaultUserSchema: Schema;
		public static defaultClientSchema: Schema;
		public static defaultPermissionLevels: PermissionLevels;
		public static plugin: symbol;
		public static use(mod: any): typeof KlasaClient;
	}

	export { KlasaClient as Client };

//#region Extensions

	export class KlasaGuild extends Guild {
		public settings: Settings;
		public readonly language: Language;
	}

	export interface CachedPrefix {
		regex: RegExp;
		length: number;
	}

	export class KlasaMessage extends Message {
		private prompter: CommandPrompt | null;
		private _responses: KlasaMessage[];
		private _patch(data: any): void;
		private _parseCommand(): void;
		private _customPrefix(): CachedPrefix | null;
		private _mentionPrefix(): CachedPrefix | null;
		private _naturalPrefix(): CachedPrefix | null;
		private _prefixLess(): CachedPrefix | null;
		private static generateNewPrefix(prefix: string, flags: string): CachedPrefix;

		private static prefixes: Map<string, CachedPrefix>;
	}

	export class KlasaUser extends User {}

//#endregion Extensions

//#region Parsers

	export class Resolver {
		public constructor(client: KlasaClient);
		public readonly client: KlasaClient;

		public boolean(input: boolean | string): Promise<boolean>;
		public channel(input: Channel | Snowflake): Promise<Channel>;
		public float(input: string | number): Promise<number>;
		public guild(input: KlasaGuild | Snowflake): Promise<KlasaGuild>;
		public integer(input: string | number): Promise<number>;
		public member(input: KlasaUser | GuildMember | Snowflake, guild: KlasaGuild): Promise<GuildMember>;
		public message(input: KlasaMessage | Snowflake, channel: Channel): Promise<KlasaMessage>;
		public role(input: Role | Snowflake, guild: KlasaGuild): Promise<Role>;
		public string(input: string): Promise<string>;
		public url(input: string): Promise<string>;
		public user(input: KlasaUser | GuildMember | KlasaMessage | Snowflake): Promise<KlasaUser>;

		public static readonly regex: {
			userOrMember: RegExp,
			channel: RegExp,
			role: RegExp,
			snowflake: RegExp
		};
	}

	export class SettingResolver extends Resolver {
		public any(data: any): Promise<any>;
		public boolean(data: any, guild: KlasaGuild, name: string): Promise<boolean>;
		public boolean(input: boolean | string): Promise<boolean>;
		public channel(data: any, guild: KlasaGuild, name: string): Promise<Channel>;
		public channel(input: Channel | Snowflake): Promise<Channel>;
		public command(data: any, guild: KlasaGuild, name: string): Promise<Command>;
		public float(data: any, guild: KlasaGuild, name: string, minMax: { min: number, max: number }): Promise<number>;
		public float(input: string | number): Promise<number>;
		public guild(data: any, guild: KlasaGuild, name: string): Promise<KlasaGuild>;
		public guild(input: KlasaGuild | Snowflake): Promise<KlasaGuild>;
		public integer(data: any, guild: KlasaGuild, name: string, minMax: { min: number, max: number }): Promise<number>;
		public integer(input: string | number): Promise<number>;
		public language(data: any, guild: KlasaGuild, name: string): Promise<Language>;
		public role(data: any, guild: KlasaGuild, name: string): Promise<Role>;
		public role(input: Role | Snowflake, guild: KlasaGuild): Promise<Role>;
		public string(data: any, guild: KlasaGuild, name: string, minMax: { min: number, max: number }): Promise<string>;
		public string(input: string): Promise<string>;
		public textchannel(data: any, guild: KlasaGuild, name: string): Promise<TextChannel>;
		public url(data: any, guild: KlasaGuild, name: string): Promise<string>;
		public url(input: string): Promise<string>;
		public user(data: any, guild: KlasaGuild, name: string): Promise<KlasaUser>;
		public user(input: KlasaUser | GuildMember | KlasaMessage | Snowflake): Promise<KlasaUser>;
		public voicechannel(data: any, guild: KlasaGuild, name: string): Promise<VoiceChannel>;
		public categorychannel(data: any, guild: KlasaGuild, name: string): Promise<VoiceChannel>;

		public static maxOrMin(guild: KlasaGuild, value: number, min: number, max: number, name: string, suffix: string): boolean;
	}

//#endregion Parsers

//#region Permissions

	export class PermissionLevels extends Collection<number, PermissionLevel> {
		public constructor(levels?: number);

		public add(level: number, check: (message: KlasaMessage) => boolean, options?: PermissionLevelOptions): this;
		public debug(): string;
		public isValid(): boolean;
		public remove(level: number): this;
		public set(level: number, obj: PermissionLevelOptions | symbol): this;

		public run(message: KlasaMessage, min: number): PermissionLevelsData;
	}

//#endregion Permissions

//#region Schedule

	export class Schedule {
		public constructor(client: KlasaClient);
		public client: KlasaClient;
		public tasks: ScheduledTask[];
		public timeInterval: number;
		private _interval: NodeJS.Timer;

		private readonly _tasks: ScheduledTaskOptions[];
		public init(): Promise<void>;
		public execute(): Promise<void>;
		public next(): ScheduledTask;
		public create(taskName: string, time: Date | number | string, options?: ScheduledTaskOptions): Promise<ScheduledTask>;
		public get(id: string): ScheduledTask | void;
		public delete(id: string): Promise<this>;
		public clear(): Promise<void>;

		private _add(taskName: string, time: Date | number | string, options: ScheduledTaskOptions): ScheduledTask;
		private _insert(task: ScheduledTask): ScheduledTask;
		private _clearInterval(): void;
		private _checkInterval(): void;

		public [Symbol.iterator](): Iterator<ScheduledTask>;
	}

	export class ScheduledTask {
		public constructor(client: KlasaClient, taskName: string, time: Date | number | string, options?: ScheduledTaskOptions);
		public readonly client: KlasaClient;
		public readonly store: Schedule;
		public taskName: string;
		public recurring: Cron | null;
		public time: Date;
		public id: string;
		public data: any;

		private running: boolean;

		public readonly task?: Task;
		public run(): Promise<this>;
		public update(options?: ScheduledTaskUpdateOptions): Promise<this>;
		public delete(): Promise<Schedule>;
		public toJSON(): ScheduledTaskJSON;

		private static _resolveTime(time: Date | number | Cron | string): [Date, Cron];
		private static _generateID(client: KlasaClient, time: Date | number): string;
		private static _validate(st: ScheduledTask): void;
	}

//#endregion Schedule

//#region Settings

	export class Settings {
		public constructor(manager: Gateway, data: any);
		public readonly client: KlasaClient;
		public readonly gateway: Gateway;
		public readonly id: string;
		public readonly synchronizing: boolean;
		private _existsInDB: boolean;

		public get<T = any>(path: string | string[]): T;
		public clone(): Settings;
		public sync(force?: boolean): Promise<this>;
		public destroy(): Promise<this>;

		public reset(key?: string | string[], options?: SettingsResetOptions): Promise<SettingsUpdateResult>;
		public reset(key?: string | string[], guild?: KlasaGuild, options?: SettingsResetOptions): Promise<SettingsUpdateResult>;
		public update(key: Record<string, any>, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public update(key: Record<string, any>, guild?: GuildResolvable, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public update(key: string, value: any, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public update(key: string, value: any, guild?: GuildResolvable, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public update(entries: Array<[string, any]>, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public update(entries: Array<[string, any]>, guild?: GuildResolvable, options?: SettingsUpdateOptions): Promise<SettingsUpdateResult>;
		public list(message: KlasaMessage, path: SchemaFolder | string): string;
		public resolveString(message: KlasaMessage, path: SchemaPiece | string): string;

		private _save(data: SettingsUpdateResult): Promise<void>;
		private _setValueByPath(piece: SchemaPiece, parsedID: any): { updated: boolean, old: any };
		private _patch(data: Record<string, any>, instance?: object, schema?: SchemaFolder): void;

		public toJSON(): Record<string, any>;
		public toString(): string;
	}

	export class Gateway extends GatewayStorage {
		public constructor(store: GatewayDriver, type: string, schema: Schema, provider: string);
		public store: GatewayDriver;
		public syncQueue: Collection<string, Promise<Settings>>;
		public readonly Settings: Settings;
		private cache: Collection<string, { settings: Settings, [k: string]: any }>;

		public get(input: string | number, create?: boolean): Settings;
		public sync(input: string): Promise<Settings>;
		public sync(input?: string[]): Promise<Gateway>;
	}

	export class QueryBuilder {
		public constructor(datatypes: Record<string, QueryBuilderDatatype>, options?: QueryBuilderOptions);
		public get(type: string): QueryBuilderDatatype | null;
		public parse(schemaPiece: SchemaPiece): string;
		public parseValue(value: any, schemaPiece: SchemaPiece, datatype?: QueryBuilderDatatype): string;
		private arrayResolver: (values: Array<any>, piece: SchemaPiece, resolver: Function) => string;
		private formatDatatype: (name: string, datatype: string, def?: string) => string;
		private readonly _datatypes: Record<string, QueryBuilderDatatype>;
	}

	export class GatewayDriver {
		private constructor(client: KlasaClient);
		public readonly client: KlasaClient;
		public keys: Set<string>;
		public ready: boolean;
		public guilds: Gateway;
		public users: Gateway;
		public clientStorage: Gateway;
		private _queue: Array<(() => Gateway)>;

		public [Symbol.iterator](): Iterator<[string, Gateway]>;
		public register(name: string, options?: GatewayDriverRegisterOptions): this;
		public init(): Promise<void>;
		public sync(input?: string[]): Promise<Array<Gateway>>;

		public toJSON(): GatewayDriverJSON;
		public toString(): string;
	}

	export abstract class GatewayStorage {
		public constructor(client: KlasaClient, type: string, schema: Schema, provider: string);
		public readonly client: KlasaClient;
		public readonly defaults: any;
		public readonly provider: Provider | null;
		public readonly providerName: string;
		public readonly type: string;
		public ready: boolean;
		public schema: SchemaFolder | null;

		public getPath(key?: string, options?: GatewayGetPathOptions): GatewayGetPathResult | null;
		public init(): Promise<void>;
		public toJSON(): GatewayJSON;
		public toString(): string;
	}

	export class Schema extends Map<string, SchemaPiece | SchemaFolder> {
		public constructor(path?: string);
		public readonly configurableKeys: Array<string>;
		public readonly defaults: Record<string, any>;
		public readonly path: string;
		public readonly paths: Map<string, SchemaPiece | SchemaFolder>;
		public readonly type: 'Folder';
		public add(key: string, type: string, options?: SchemaPieceOptions): this;
		public add(key: string, callback: (folder: SchemaFolder) => any): this;
		public remove(key: string): this;
		public get<T = Schema | SchemaPiece | SchemaFolder>(key: string | Array<string>): T;
		public toJSON(): Record<string, any>;
	}

	export class SchemaFolder extends Schema {
		public constructor(parent: Schema | SchemaFolder, key: string);
		public readonly key: string;
		public readonly parent: Schema | SchemaFolder;
	}

	export class SchemaPiece {
		public constructor(parent: Schema | SchemaFolder, key: string, type: string, options: SchemaPieceOptions);
		public readonly client: KlasaClient | null;
		public readonly parent: Schema | SchemaFolder;
		public readonly key: string;
		public readonly serializer: Serializer;
		public readonly type: string;
		public readonly path: string;
		public array: boolean;
		public configurable: boolean;
		public default: any;
		public min: number | null;
		public max: number | null;
		public filter: ((client: KlasaClient, value: any, schema: SchemaPiece, language: Language) => boolean) | null;
		public parse<T>(value: any, guild?: KlasaGuild): T;
		public edit(options?: SchemaPieceEditOptions): this;
		public toJSON(): SchemaPieceOptions;

		private isValid(): boolean;
		private _generateDefault(): Array<any> | false | null;
	}

//#endregion Settings

//#region Pieces

	export abstract class Piece {
		public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options?: PieceOptions);
		public readonly client: KlasaClient;
		public readonly type: string;
		public readonly path: string;
		public file: string[];
		public name: string;
		public enabled: boolean;
		public store: Store<string, this>;
		public directory: string;

		public reload(): Promise<this>;
		public unload(): void;
		public enable(): this;
		public disable(): this;
		public init(): Promise<any>;
		public toJSON(): PieceJSON;
		public toString(): string;
	}

	export abstract class AliasPiece extends Piece {
		public constructor(store: Store<string, Piece, typeof Piece>, file: string[], directory: string, options?: AliasPieceOptions);
		public aliases: Array<string>;
		public toJSON(): AliasPieceJSON;
	}

	export abstract class Argument extends AliasPiece {
		public constructor(store: ArgumentStore, file: string[], directory: string, options?: ArgumentOptions);
		public aliases: string[];
		public abstract run(arg: string | undefined, possible: Possible, message: KlasaMessage): any;
		public static regex: MentionRegex;
		private static minOrMax(client: KlasaClient, value: number, min: number, max: number, possible: Possible, message: KlasaMessage, suffix: string): boolean;
	}

	export abstract class Command extends AliasPiece {
		public constructor(store: CommandStore, file: string[], directory: string, options?: CommandOptions);
		public readonly bucket: number;
		public readonly category: string;
		public readonly cooldown: number;
		public readonly subCategory: string;
		public readonly usageDelim: string | null;
		public readonly usageString: string;
		public aliases: string[];
		public requiredPermissions: Permissions;
		public cooldownLevel: 'author' | 'channel' | 'guild';
		public deletable: boolean;
		public description: string | ((language: Language) => string);
		public extendedHelp: string | ((language: Language) => string);
		public flagSupport: boolean;
		public fullCategory: string[];
		public guarded: boolean;
		public hidden: boolean;
		public nsfw: boolean;
		public permissionLevel: number;
		public promptLimit: number;
		public promptTime: number;
		public quotedStringSupport: boolean;
		public requiredSettings: string[];
		public runIn: string[];
		public subcommands: boolean;
		public usage: CommandUsage;

		public createCustomResolver(type: string, resolver: ArgResolverCustomMethod): this;
		public customizeResponse(name: string, response: string | ((message: KlasaMessage, possible: Possible) => string)): this;
		public definePrompt(usageString: string, usageDelim?: string): Usage;
		public run(message: KlasaMessage, params: any[]): Promise<KlasaMessage | KlasaMessage[] | null>;
		public toJSON(): PieceCommandJSON;
	}

	export abstract class Event extends Piece {
		public constructor(store: EventStore, file: string[], directory: string, options?: EventOptions);
		public emitter: NodeJS.EventEmitter;
		public event: string;
		public once: boolean;
		private _listener: Function;

		public abstract run(...params: any[]): void;
		public toJSON(): PieceEventJSON;

		private _run(param: any): void;
		private _runOnce(...args: any[]): Promise<void>;
		private _listen(): void;
		private _unlisten(): void;
	}

	export abstract class Extendable extends Piece {
		public constructor(store: ExtendableStore, file: string[], directory: string, options?: ExtendableOptions);
		public readonly appliesTo: Array<Constructor<any>>;
		private staticPropertyDescriptors: PropertyDescriptorMap;
		private instancePropertyDescriptors: PropertyDescriptorMap;
		private originals: Map<Constructor<any>, OriginalPropertyDescriptors>;
		public toJSON(): PieceExtendableJSON;
	}

	export abstract class Finalizer extends Piece {
		public constructor(store: FinalizerStore, file: string[], directory: string, options?: FinalizerOptions);
		public abstract run(message: KlasaMessage, command: Command, response: KlasaMessage | KlasaMessage[] | null, runTime: Stopwatch): void;
		public toJSON(): PieceFinalizerJSON;
		protected _run(message: KlasaMessage, command: Command, response: KlasaMessage | KlasaMessage[] | null, runTime: Stopwatch): Promise<void>;
	}

	export abstract class Inhibitor extends Piece {
		public constructor(store: InhibitorStore, file: string[], directory: string, options?: InhibitorOptions);
		public spamProtection: boolean;
		public abstract run(message: KlasaMessage, command: Command): void | boolean | string | Promise<void | boolean | string>;
		public toJSON(): PieceInhibitorJSON;
		protected _run(message: KlasaMessage, command: Command): Promise<boolean | string>;
	}

	export abstract class Language extends Piece {
		public constructor(store: LanguageStore, file: string[], directory: string, options?: LanguageOptions);
		public language: Record<string, string | string[] | ((...args: any[]) => string | string[])>;

		public get<T = string>(term: string, ...args: any[]): T;
		public toJSON(): PieceLanguageJSON;
	}

	export abstract class Monitor extends Piece {
		public constructor(store: MonitorStore, file: string[], directory: string, options?: MonitorOptions);
		public allowedTypes: MessageType[];
		public ignoreBots: boolean;
		public ignoreEdits: boolean;
		public ignoreOthers: boolean;
		public ignoreSelf: boolean;
		public ignoreWebhooks: boolean;
		public ignoreBlacklistedUsers: boolean;
		public ignoreBlacklistedGuilds: boolean;

		public abstract run(message: KlasaMessage): void;
		public shouldRun(message: KlasaMessage): boolean;
		public toJSON(): PieceMonitorJSON;
		protected _run(message: KlasaMessage): Promise<void>;
	}

	export abstract class MultiArgument extends Argument {
		public abstract readonly base: Argument;
		public run<T = any>(argument: string, possible: Possible, message: KlasaMessage): Promise<Array<T>>;
	}

	export abstract class Provider extends Piece {
		public constructor(store: ProviderStore, file: string[], directory: string, options?: ProviderOptions);
		public abstract create(table: string, entry: string, data: any): Promise<any>;
		public abstract createTable(table: string, rows?: any[]): Promise<any>;
		public abstract delete(table: string, entry: string): Promise<any>;
		public abstract deleteTable(table: string): Promise<any>;
		public abstract get(table: string, entry: string): Promise<any>;
		public abstract getAll(table: string): Promise<any[]>;
		public abstract has(table: string, entry: string): Promise<boolean>;
		public abstract hasTable(table: string): Promise<boolean>;
		public abstract update(table: string, entry: string, data: SettingsUpdateResultEntry[] | [string, any][] | Record<string, any>): Promise<any>;
		public abstract replace(table: string, entry: string, data: SettingsUpdateResultEntry[] | [string, any][] | Record<string, any>): Promise<any>;
		// The following is not required by SettingGateway but might be available in some providers
		public getKeys(table: string): Promise<string[]>;
		protected parseUpdateInput<T = Record<string, any>>(updated: T | SettingsUpdateResult): T;

		public shutdown(): Promise<void>;
		public toJSON(): PieceProviderJSON;
	}

	export abstract class SQLProvider extends Provider {
		public abstract qb: QueryBuilder;
		public abstract addColumn<T = any>(table: string, columns: SchemaFolder | SchemaPiece): Promise<T>;
		public abstract removeColumn<T = any>(table: string, columns: string | string[]): Promise<T>;
		public abstract updateColumn<T = any>(table: string, piece: SchemaPiece): Promise<T>;
		public abstract getColumns(table: string): Promise<Array<string>>;
		protected parseUpdateInput<T = [string, any]>(updated?: SettingsUpdateResultEntry[] | [string, any][] | Record<string, any>, resolve?: boolean): T;
		protected parseEntry<T = Record<string, any>>(gateway: string | Gateway, entry: Record<string, any>): T;
		protected parseValue<T = any>(value: any, schemaPiece: SchemaPiece): T;
		private _parseGatewayInput(updated: SettingsUpdateResultEntry[], keys: string[], values: string[], resolve?: boolean): void;
	}

	export abstract class Task extends Piece {
		public constructor(store: TaskStore, file: string[], directory: string, options?: TaskOptions);
		public abstract run(data?: any): unknown;
		public toJSON(): PieceTaskJSON;
	}

	export abstract class Serializer extends AliasPiece {
		public constructor(store: SerializerStore, file: string[], directory: string, options?: SerializerOptions);
		public serialize(data: any): PrimitiveType;
		public stringify(data: any): string;
		public toJSON(): PieceSerializerJSON;
		public abstract deserialize(data: any, piece: SchemaPiece, language: Language, guild?: KlasaGuild): Promise<any>;
		public static regex: MentionRegex;
	}

//#endregion Pieces

//#region Stores

	export abstract class Store<K, V extends Piece, VConstructor = Constructor<V>> extends Collection<K, V> {
		public constructor(client: KlasaClient, name: string, holds: VConstructor);
		public readonly client: KlasaClient;
		public readonly holds: VConstructor;
		public readonly name: string;
		public readonly userDirectory: string;
		private readonly coreDirectories: Set<string>;

		protected registerCoreDirectory(directory: string): this;
		public delete(name: K | V): boolean;
		public get(key: K): V;
		public get<T extends V>(key: K): T;
		public init(): Promise<any[]>;
		public load(directory: string, file: string[]): V;
		public loadAll(): Promise<number>;
		public resolve(name: V | string): V;
		public set<T extends V>(key: K, value: T): this;
		public set(piece: V): V;
		public toString(): string;

		private static walk<K, V extends Piece, T extends Store<K, V>>(store: T, coreDirectory?: string): Promise<Array<Piece>>;
	}

	export abstract class AliasStore<K, V extends Piece, VConstructor = Constructor<V>> extends Store<K, V, VConstructor> {
		public aliases: Collection<K, V>;
	}

	export class ArgumentStore extends AliasStore<string, Argument, typeof Argument> { }

	export class CommandStore extends AliasStore<string, Command, typeof Command> { }

	export class EventStore extends Store<string, Event, typeof Event> {
		private _onceEvents: Set<string>;
	}

	export class ExtendableStore extends Store<string, Extendable, typeof Extendable> { }

	export class FinalizerStore extends Store<string, Finalizer, typeof Finalizer> {
		public run(message: KlasaMessage, command: Command, response: KlasaMessage | KlasaMessage[], runTime: Stopwatch): Promise<void>;
	}

	export class InhibitorStore extends Store<string, Inhibitor, typeof Inhibitor> {
		public run(message: KlasaMessage, command: Command, selective?: boolean): Promise<void>;
	}

	export class LanguageStore extends Store<string, Language, typeof Language> {
		public readonly default: Language;
	}

	export class MonitorStore extends Store<string, Monitor, typeof Monitor> {
		public run(message: KlasaMessage): Promise<void>;
	}

	export class ProviderStore extends Store<string, Provider, typeof Provider> {
		public readonly default: Provider;
	}

	export class TaskStore extends Store<string, Task, typeof Task> { }

	export class SerializerStore extends AliasStore<string, Serializer, typeof Serializer> { }

//#endregion Stores

//#region Usage

	export class CommandPrompt extends TextPrompt {
		public constructor(message: KlasaMessage, usage: CommandUsage, options: TextPromptOptions);
		private typing: boolean;

		public run<T = any[]>(): Promise<T>;
		private static generateNewDelim(delim: string): RegExp;
		private static delims: Map<string, RegExp>;
	}

	export class CommandUsage extends Usage {
		public constructor(client: KlasaClient, usageString: string, usageDelim: string | null, command: Command);
		public names: string[];
		public commands: string;
		public nearlyFullUsage: string;

		public createPrompt(message: KlasaMessage, options?: TextPromptOptions): CommandPrompt;
		public fullUsage(message: KlasaMessage): string;
		public toString(): string;
	}

	export class Possible {
		public constructor([match, name, type, min, max, regex, flags]: [string, string, string, string, string, string, string]);
		public name: string;
		public type: string;
		public min: number;
		public max: number;
		public regex: RegExp;

		private static resolveLimit(limit: string, type: string, limitType: string): number;
	}

	export class Tag {
		public constructor(members: string, count: number, required: number);
		public required: number;
		public possibles: Possible[];
		public response: string | ((message: KlasaMessage) => string);

		private register(name: string, response: ArgResolverCustomMethod): boolean;
		private static pattern: RegExp;
		private static parseMembers(members: string, count: number): Possible[];
		private static parseTrueMembers(members: string): string[];
	}

	export class TextPrompt {
		public constructor(message: KlasaMessage, usage: Usage, options?: TextPromptOptions);
		public readonly client: KlasaClient;
		public message: KlasaMessage;
		public target: KlasaUser;
		public channel: TextChannel | DMChannel;
		public usage: Usage | CommandUsage;
		public reprompted: boolean;
		public flags: Record<string, string>;
		public args: string[];
		public params: any[];
		public time: number;
		public limit: number;
		public quotedStringSupport: boolean;
		public responses: Collection<string, KlasaMessage>;
		private _repeat: boolean;
		private _required: number;
		private _prompted: number;
		private _currentUsage: Tag;

		public run<T = any[]>(prompt: StringResolvable | MessageOptions | MessageAdditions | APIMessage): Promise<T>;
		private prompt(text: string): Promise<KlasaMessage>;
		private reprompt(prompt: string): Promise<any[]>;
		private repeatingPrompt(): Promise<any[]>;
		private validateArgs(): Promise<any[]>;
		private multiPossibles(index: number): Promise<any[]>;
		private pushParam(param: any): any[];
		private handleError(err: string): Promise<any[]>;
		private finalize(): any[];
		private _setup(original: string): void;

		private static getFlags(content: string, delim: string): { content: string; flags: Record<string, string> };
		private static getArgs(content: string, delim: string): string[];
		private static getQuotedStringArgs(content: string, delim: string): string[];

		public static readonly flagRegex: RegExp;
	}

	export class Usage {
		public constructor(client: KlasaClient, usageString: string, usageDelim: string | null);
		public readonly client: KlasaClient;
		public deliminatedUsage: string;
		public usageString: string;
		public usageDelim: string | null;
		public parsedUsage: Tag[];
		public customResolvers: Record<string, ArgResolverCustomMethod>;

		public createCustomResolver(type: string, resolver: ArgResolverCustomMethod): this;
		public customizeResponse(name: string, response: ((message: KlasaMessage) => string)): this;
		public createPrompt(message: KlasaMessage, options?: TextPromptOptions): TextPrompt;
		public toJSON(): Tag[];
		public toString(): string;

		private static parseUsage(usageString: string): Tag[];
		private static tagOpen(usage: Record<string, any>, char: string): void;
		private static tagClose(usage: Record<string, any>, char: string): void;
		private static tagSpace(usage: Record<string, any>, char: string): void;
	}

//#endregion Usage

//#region Util

	export class Colors {
		public constructor(options?: ColorsFormatOptions);
		public opening: string;
		public closing: string;

		public format(input: string): string;
		public static useColors: boolean | null;
		public static CLOSE: typeof ColorsClose;
		public static STYLES: typeof ColorsStyleTypes;
		public static TEXTS: typeof ColorsTexts;
		public static BACKGROUNDS: typeof ColorsBackgrounds;
		public static hexToRGB(hex: string): number[];
		public static hueToRGB(p: number, q: number, t: number): number;
		public static hslToRGB([h, s, l]: [number | string, number | string, number | string]): number[];
		public static formatArray([pos1, pos2, pos3]: [number | string, number | string, number | string]): string;

		private static style(styles: string | string[], data?: ColorsFormatData): ColorsFormatData;
		private static background(style: ColorsFormatType, data?: ColorsFormatData): ColorsFormatData;
		private static text(style: ColorsFormatType, data?: ColorsFormatData): ColorsFormatData;

	}

	export const constants: Constants;

	export class Cron {
		public constructor(cron: string);
		public next(zDay?: Date, origin?: boolean): Date;

		private static _normalize(cron: string): string;
		private static _parseString(cron: string): number[][];
		private static _parsePart(cronPart: string, id: number): number[];
		private static _range(min: number, max: number, step: number): number[];
	}

	export class Duration {
		public constructor(pattern: string);
		public offset: number;
		public readonly fromNow: Date;

		public dateFrom(date: Date): Date;

		public static toNow(earlier: Date | number | string, showIn?: boolean): string;

		private static regex: RegExp;
		private static commas: RegExp;
		private static aan: RegExp;

		private static _parse(pattern: string): number;
	}

	export class KlasaConsole {
		private constructor(options?: ConsoleOptions);
		public readonly stdout: NodeJS.WritableStream;
		public readonly stderr: NodeJS.WritableStream;
		public template: Timestamp | null;
		public colors: ConsoleColorStyles;
		public utc: boolean;

		private readonly timestamp: string;

		private write(data: any[], type?: string): void;

		public log(...data: any[]): void;
		public warn(...data: any[]): void;
		public error(...data: any[]): void;
		public debug(...data: any[]): void;
		public verbose(...data: any[]): void;
		public wtf(...data: any[]): void;

		private static _flatten(data: any): string;
	}

	export class RateLimit {
		public constructor(bucket: number, cooldown: number);
		public readonly expired: boolean;
		public readonly limited: boolean;
		public readonly remainingTime: number;
		public bucket: number;
		public cooldown: number;
		private remaining: number;
		private time: number;
		public drip(): this;
		public reset(): this;
		public resetRemaining(): this;
		public resetTime(): this;
	}

	export class RateLimitManager<K = Snowflake> extends Collection<K, RateLimit> {
		public constructor(bucket: number, cooldown: number);
		public bucket: number;
		public cooldown: number;
		private _bucket: number;
		private _cooldown: number;
		private sweepInterval: NodeJS.Timer | null;
		public acquire(id: K): RateLimit;
		public create(id: K): RateLimit;
	}

	export class ReactionHandler extends ReactionCollector {
		public constructor(message: KlasaMessage, filter: Function, options: ReactionHandlerOptions, display: RichDisplay | RichMenu, emojis: EmojiResolvable[]);
		public display: RichDisplay | RichMenu;
		public methodMap: Map<string, EmojiResolvable>;
		public currentPage: number;
		public prompt: string;
		public time: number;
		public awaiting: boolean;
		public selection: Promise<number>;
		public reactionsDone: boolean;

		public first(): void;
		public back(): void;
		public forward(): void;
		public last(): void;
		public jump(): Promise<void>;
		public info(): void;
		public stop(): void;
		public zero(): void;
		public one(): void;
		public two(): void;
		public three(): void;
		public four(): void;
		public five(): void;
		public six(): void;
		public seven(): void;
		public eight(): void;
		public nine(): void;
		public update(): void;

		private _queueEmojiReactions(emojis: EmojiResolvable[]): Promise<null>;
	}

	export class RichDisplay {
		public constructor(embed?: MessageEmbed);
		public embedTemplate: MessageEmbed;
		public pages: MessageEmbed[];
		public infoPage: MessageEmbed | null;
		public emojis: RichDisplayEmojisObject;
		public footered: boolean;
		public footerPrefix: string;
		public footerSuffix: string;
		public readonly template: MessageEmbed;

		public setEmojis(emojis: RichDisplayEmojisObject): this;
		public setFooterPrefix(prefix: string): this;
		public setFooterSuffix(suffix: string): this;
		public useCustomFooters(): this;
		public addPage(embed: Function | MessageEmbed): this;
		public setInfoPage(embed: MessageEmbed): RichDisplay;
		public run(message: KlasaMessage, options?: RichDisplayRunOptions): Promise<ReactionHandler>;

		protected _determineEmojis(emojis: EmojiResolvable[], stop: boolean, jump: boolean, firstLast: boolean): EmojiResolvable[];
		private _footer(): void;
		private _handlePageGeneration(cb: Function | MessageEmbed): MessageEmbed;
	}

	export class RichMenu extends RichDisplay {
		public constructor(embed?: MessageEmbed);
		public emojis: RichMenuEmojisObject;
		public paginated: boolean;
		public options: MenuOptions[];

		public addOption(name: string, body: string, inline?: boolean): RichMenu;
		public run(message: KlasaMessage, options?: RichMenuRunOptions): Promise<ReactionHandler>;

		protected _determineEmojis(emojis: EmojiResolvable[], stop: boolean): EmojiResolvable[];
		private _paginate(): void;
	}

	export class Stopwatch {
		public constructor(digits?: number);
		public digits: number;
		private _start: number;
		private _end: number | null;

		public readonly duration: number;
		public readonly running: boolean;
		public restart(): this;
		public reset(): this;
		public start(): this;
		public stop(): this;
		public toString(): string;
	}

	export class Timestamp {
		public constructor(pattern: string);
		public pattern: string;
		private _template: TimestampObject[];

		public display(time?: Date | number | string): string;
		public displayUTC(time?: Date | number | string): string;
		public edit(pattern: string): this;

		public static timezoneOffset: number;
		public static utc(time?: Date | number | string): Date;
		public static displayArbitrary(pattern: string, time?: Date | number | string): string;
		private static _resolveDate(time: Date | number | string): Date;
		private static _display(template: string, time: Date | number | string): string;
		private static _patch(pattern: string): TimestampObject[];
	}

	export class Type {
		public constructor(value: any, parent?: Type);

		public value: any;
		public is: string;

		private parent: Type | null;
		private childKeys: Map<string, Type>;
		private childValues: Map<string, Type>;

		private readonly childTypes: string;

		public toString(): string;

		private addValue(value: any): void;
		private addEntry(entry: [string, any]): void;
		private parents(): Iterator<Type>;
		private check(): void;
		private isCircular(): boolean;

		public static resolve(value: any): string;

		private static list(values: Map<string, Type>): string;
	}

	class Util {
		public static arrayFromObject<T = any>(obj: Record<string, any>, prefix?: string): Array<T>;
		public static arraysStrictEquals(arr1: any[], arr2: any[]): boolean;
		public static chunk<T>(entries: T[], chunkSize: number): Array<T[]>;
		public static clean(text: string): string;
		public static codeBlock(lang: string, expression: string | number | Stringifible): string;
		public static deepClone<T = any>(source: T): T;
		public static exec(exec: string, options?: ExecOptions): Promise<{ stdout: string, stderr: string }>;
		public static getTypeName(input: any): string;
		public static isClass(input: any): input is Constructor<any>;
		public static isFunction(input: any): input is Function;
		public static isNumber(input: any): input is number;
		public static isObject(input: any): boolean;
		public static isPrimitive(input: any): input is string | number | boolean;
		public static isThenable(input: any): boolean;
		public static makeObject<T = Record<string, any>, S = Record<string, any>>(path: string, value: any, obj?: Record<string, any>): T & S;
		public static mergeDefault<T = Record<string, any>, S = Record<string, any>>(objDefaults: T, objSource: S): T & S;
		public static mergeObjects<T = Record<string, any>, S = Record<string, any>>(objTarget: T, objSource: S): T & S;
		public static objectToTuples(obj: Record<string, any>): Array<[string, any]>;
		public static regExpEsc(str: string): string;
		public static sleep<T = any>(delay: number, args?: T): Promise<T>;
		public static toTitleCase(str: string): string;
		public static tryParse<T = Record<string, any>>(value: string): T | string;
		public static resolveGuild(client: KlasaClient, guild: GuildResolvable): KlasaGuild;
		private static initClean(client: KlasaClient): void;

		public static titleCaseVariants: TitleCaseVariants;
		public static PRIMITIVE_TYPES: string[];
	}

	export { Util as util };

//#endregion Util

//#endregion Classes

//#region Typedefs

	export interface KlasaClientOptions extends ClientOptions {
		commandEditing?: boolean;
		commandLogging?: boolean;
		commandMessageLifetime?: number;
		console?: ConsoleOptions;
		consoleEvents?: ConsoleEvents;
		createPiecesFolders?: boolean;
		customPromptDefaults?: CustomPromptDefaults;
		disabledCorePieces?: string[];
		gateways?: GatewaysOptions;
		language?: string;
		noPrefixDM?: boolean;
		owners?: string[];
		permissionLevels?: PermissionLevels;
		pieceDefaults?: PieceDefaults;
		prefix?: string | string[];
		prefixCaseInsensitive?: boolean;
		preserveSettings?: boolean;
		production?: boolean;
		providers?: ProvidersOptions;
		readyMessage?: ReadyMessage;
		regexPrefix?: RegExp;
		schedule?: ScheduleOptions;
		slowmode?: number;
		slowmodeAggressive?: boolean;
		typing?: boolean;
	}

	export interface ScheduleOptions {
		interval?: number;
	}

	export interface CustomPromptDefaults {
		limit?: number;
		time?: number;
		quotedStringSupport?: boolean;
	}

	export interface PieceDefaults {
		arguments?: ArgumentOptions;
		commands?: CommandOptions;
		events?: EventOptions;
		extendables?: ExtendableOptions;
		finalizers?: FinalizerOptions;
		inhibitors?: InhibitorOptions;
		languages?: LanguageOptions;
		monitors?: MonitorOptions;
		providers?: ProviderOptions;
		serializers?: SerializerOptions;
		tasks?: TaskOptions;
	}

	export interface ProvidersOptions extends Record<string, any> {
		default?: string;
	}

	export type ReadyMessage = string | ((client: KlasaClient) => string);

	export interface GatewaysOptions extends Partial<Record<string, GatewayDriverRegisterOptions>> {
		clientStorage?: GatewayDriverRegisterOptions;
		guilds?: GatewayDriverRegisterOptions;
		users?: GatewayDriverRegisterOptions;
	}

	// Parsers
	export interface ArgResolverCustomMethod {
		(arg: string, possible: Possible, message: KlasaMessage, params: any[]): any;
	}

	export interface Constants {
		DEFAULTS: ConstantsDefaults;
		TIME: ConstantsTime;
		MENTION_REGEX: MentionRegex;
	}

	export interface ConstantsDefaults {
		CLIENT: Required<KlasaClientOptions>;
		CONSOLE: Required<ConsoleOptions>;
		DATATYPES: Record<string, QueryBuilderDatatype>;
	}

	export interface ConstantsTime {
		SECOND: number;
		MINUTE: number;
		HOUR: number;
		DAY: number;
		DAYS: string[];
		MONTHS: string[];
		TIMESTAMP: {
			TOKENS: Map<string, number>;
		};
		CRON: {
			partRegex: RegExp;
			allowedNum: number[][];
			predefined: {
				'@annually': string;
				'@yearly': string;
				'@monthly': string;
				'@weekly': string;
				'@daily': string;
				'@hourly': string;
			};
			tokens: {
				jan: number;
				feb: number;
				mar: number;
				apr: number;
				may: number;
				jun: number;
				jul: number;
				aug: number;
				sep: number;
				oct: number;
				nov: number;
				dec: number;
				sun: number;
				mon: number;
				tue: number;
				wed: number;
				thu: number;
				fri: number;
				sat: number;
			};
			tokensRegex: RegExp;
		};
	}

	// Permissions
	export interface PermissionLevel {
		break: boolean;
		check: (message: KlasaMessage) => Promise<boolean> | boolean;
		fetch: boolean;
	}

	export interface PermissionLevelOptions {
		break?: boolean;
		fetch?: boolean;
	}

	export interface PermissionLevelsData {
		broke: boolean;
		permission: boolean;
	}

	// Schedule
	export interface ScheduledTaskOptions {
		catchUp?: boolean;
		data?: any;
		id?: string;
	}

	export type TimeResolvable = Cron | Date | number | string;

	export interface ScheduledTaskJSON extends Required<ScheduledTaskOptions> {
		taskName: string;
		time: number;
	}

	export interface ScheduledTaskUpdateOptions extends Filter<ScheduledTaskOptions, 'id'> {
		id?: never;
		repeat?: string;
		time?: TimeResolvable;
	}

	// Settings
	export interface GatewayJSON {
		options: { provider: string };
		schema: SchemaFolderAddOptions;
		type: string;
	}

	export interface GatewayGetPathOptions {
		avoidUnconfigurable?: boolean;
		errors?: boolean;
		piece?: boolean;
	}

	export interface GatewayGetPathResult {
		piece: SchemaPiece;
		route: string[];
	}

	export type QueryBuilderDatatype = string | {
		array?: (datatype: string) => string;
		resolver?: <T = any>(input: any, schemaPiece: SchemaPiece) => T;
		type: string | ((piece: SchemaPiece) => string);
	};

	export type QueryBuilderOptions = {
		arrayResolver?: (values: Array<any>, piece: SchemaPiece, resolver: Function) => string;
		formatDatatype?: (name: string, datatype: string, def?: string) => string;
	} & Filter<Record<string, QueryBuilderDatatype | ((piece: SchemaPiece) => string)>, 'arrayResolver' | 'formatDatatype'>;

	export type GuildResolvable = KlasaGuild
		| KlasaMessage
		| GuildChannel
		| Snowflake;

	export interface SettingsResetOptions {
		avoidUnconfigurable?: boolean;
		force?: boolean;
	}

	export interface SettingsUpdateOptions {
		action?: 'add' | 'remove' | 'auto' | 'overwrite';
		arrayPosition?: number;
		avoidUnconfigurable?: boolean;
		force?: boolean;
	}

	export interface SettingsUpdateResult {
		errors: Error[];
		updated: SettingsUpdateResultEntry[];
	}

	export interface SettingsUpdateResultEntry {
		data: [string, any];
		piece: SchemaPiece;
	}

	export interface GatewayDriverRegisterOptions {
		provider?: string;
		schema?: Schema;
		syncArg?: string[] | string | true;
	}

	export type SchemaFolderAddOptions = SchemaFolderOptions | SchemaPieceOptions;

	export interface SchemaPieceOptions {
		array?: boolean;
		configurable?: boolean;
		default?: any;
		min?: number;
		max?: number;
		filter?: ((client: KlasaClient, value: any, schema: SchemaPiece, language: Language) => boolean) | null;
	}

	export interface SchemaPieceEditOptions extends SchemaPieceOptions {
		type?: string;
	}

	export type SchemaFolderOptions = {
		type?: 'Folder';
	} & Filter<Record<string, SchemaPieceOptions>, 'type'>;

	export type GatewayDriverJSON = {
		clientStorage: GatewayJSON;
		guilds: GatewayJSON;
		users: GatewayJSON;
		keys: string[];
		ready: boolean;
	} & Filter<Record<string, GatewayJSON>, 'keys' | 'ready'>;

	// Structures
	export interface PieceOptions {
		enabled?: boolean;
		name?: string;
	}

	export interface AliasPieceOptions extends PieceOptions {
		aliases?: string[];
	}

	export interface ArgumentOptions extends AliasPieceOptions {}

	export interface CommandOptions extends AliasPieceOptions {
		autoAliases?: boolean;
		requiredPermissions?: PermissionResolvable;
		bucket?: number;
		cooldown?: number;
		cooldownLevel?: 'author' | 'channel' | 'guild';
		deletable?: boolean;
		description?: string | string[] | ((language: Language) => string | string[]);
		extendedHelp?: string | string[] | ((language: Language) => string | string[]);
		flagSupport?: boolean;
		guarded?: boolean;
		hidden?: boolean;
		nsfw?: boolean;
		permissionLevel?: number;
		promptLimit?: number;
		promptTime?: number;
		quotedStringSupport?: boolean;
		requiredSettings?: string[];
		runIn?: Array<'text' | 'dm' | 'news'>;
		subcommands?: boolean;
		usage?: string;
		usageDelim?: string;
	}

	export interface ExtendableOptions extends PieceOptions {
		appliesTo: any[];
	}

	export interface InhibitorOptions extends PieceOptions {
		spamProtection?: boolean;
	}

	export interface MonitorOptions extends PieceOptions {
		allowedTypes?: MessageType[];
		ignoreBots?: boolean;
		ignoreEdits?: boolean;
		ignoreOthers?: boolean;
		ignoreSelf?: boolean;
		ignoreWebhooks?: boolean;
		ignoreBlacklistedUsers?: boolean;
		ignoreBlacklistedGuilds?: boolean;
	}

	export interface EventOptions extends PieceOptions {
		emitter?: NodeJS.EventEmitter | FilterKeyInstances<KlasaClient, NodeJS.EventEmitter>;
		event?: string;
		once?: boolean;
	}

	export interface SerializerOptions extends AliasPieceOptions {}
	export interface ProviderOptions extends PieceOptions {}
	export interface FinalizerOptions extends PieceOptions {}
	export interface LanguageOptions extends PieceOptions {}
	export interface TaskOptions extends PieceOptions {}

	export interface PieceJSON {
		directory: string;
		path: string;
		enabled: boolean;
		file: string[];
		name: string;
		type: string;
	}

	export interface AliasPieceJSON extends PieceJSON {
		aliases: string[];
	}

	export interface OriginalPropertyDescriptors {
		staticPropertyDescriptors: PropertyDescriptorMap;
		instancePropertyDescriptors: PropertyDescriptorMap;
	}

	export interface PieceCommandJSON extends AliasPieceJSON, Filter<Required<CommandOptions>, 'requiredPermissions' | 'usage'> {
		category: string;
		subCategory: string;
		requiredPermissions: string[];
		usage: {
			usageString: string;
			usageDelim: string | null;
			nearlyFullUsage: string;
		};
	}

	export interface PieceExtendableJSON extends PieceJSON, Filter<Required<ExtendableOptions>, 'appliesTo'> {
		appliesTo: string[];
	}

	export interface PieceEventJSON extends PieceJSON, Filter<Required<EventOptions>, 'emitter'> {
		emitter: string;
	}

	export interface PieceInhibitorJSON extends PieceJSON, Required<InhibitorOptions> {}
	export interface PieceMonitorJSON extends PieceJSON, Required<MonitorOptions> {}
	export interface PieceArgumentJSON extends AliasPieceJSON, Required<ArgumentOptions> {}
	export interface PieceSerializerJSON extends AliasPieceJSON, Required<SerializerOptions> {}
	export interface PieceProviderJSON extends PieceJSON, Required<ProviderOptions> {}
	export interface PieceFinalizerJSON extends PieceJSON, Required<FinalizerOptions> {}
	export interface PieceLanguageJSON extends PieceJSON, Required<LanguageOptions> {}
	export interface PieceTaskJSON extends PieceJSON, Required<TaskOptions> {}

	// Usage
	export interface TextPromptOptions {
		channel?: TextChannel | DMChannel;
		limit?: number;
		quotedStringSupport?: boolean;
		target?: KlasaUser;
		time?: number;
		flagSupport?: boolean;
	}

	// Util
	export enum ColorsClose {
		normal = 0,
		bold = 22,
		dim = 22,
		italic = 23,
		underline = 24,
		inverse = 27,
		hidden = 28,
		strikethrough = 29,
		text = 39,
		background = 49
	}

	export enum ColorsStyleTypes {
		normal = 0,
		bold = 1,
		dim = 2,
		italic = 3,
		underline = 4,
		inverse = 7,
		hidden = 8,
		strikethrough = 9
	}

	export enum ColorsTexts {
		black = 30,
		red = 31,
		green = 32,
		yellow = 33,
		blue = 34,
		magenta = 35,
		cyan = 36,
		lightgray = 37,
		lightgrey = 37,
		gray = 90,
		grey = 90,
		lightred = 91,
		lightgreen = 92,
		lightyellow = 93,
		lightblue = 94,
		lightmagenta = 95,
		lightcyan = 96,
		white = 97
	}

	export enum ColorsBackgrounds {
		black = 40,
		red = 41,
		green = 42,
		yellow = 43,
		blue = 44,
		magenta = 45,
		cyan = 46,
		gray = 47,
		grey = 47,
		lightgray = 100,
		lightgrey = 100,
		lightred = 101,
		lightgreen = 102,
		lightyellow = 103,
		lightblue = 104,
		lightmagenta = 105,
		lightcyan = 106,
		white = 107
	}

	export interface ColorsFormatOptions {
		background?: string;
		style?: string | string[];
		text?: string;
	}

	export type ColorsFormatType = string | number | [string, string, string] | [number, number, number];

	export interface ColorsFormatData {
		opening: string[];
		closing: string[];
	}

	export interface ConsoleOptions {
		utc?: boolean;
		colors?: ConsoleColorStyles;
		stderr?: NodeJS.WritableStream;
		stdout?: NodeJS.WritableStream;
		timestamps?: boolean | string;
		useColor?: boolean;
	}

	export interface ConsoleEvents {
		debug?: boolean;
		error?: boolean;
		log?: boolean;
		verbose?: boolean;
		warn?: boolean;
		wtf?: boolean;
	}

	export interface ConsoleColorStyles {
		debug?: ConsoleColorObjects;
		error?: ConsoleColorObjects;
		info?: ConsoleColorObjects;
		log?: ConsoleColorObjects;
		verbose?: ConsoleColorObjects;
		warn?: ConsoleColorObjects;
		wtf?: ConsoleColorObjects;
	}

	export interface ConsoleColorObjects {
		message?: ConsoleMessageObject;
		time?: ConsoleTimeObject;
	}

	export interface ConsoleMessageObject {
		background?: keyof typeof ColorsBackgrounds | null;
		style?: keyof typeof ColorsStyleTypes | null;
		text?: keyof typeof ColorsBackgrounds | null;
	}

	export interface ConsoleTimeObject {
		background?: keyof typeof ColorsBackgrounds | null;
		style?: keyof typeof ColorsStyleTypes | null;
		text?: keyof typeof ColorsBackgrounds | null;
	}

	export interface ReactionHandlerOptions {
		filter?: Function;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface TimestampObject {
		content: string | null;
		type: string;
	}

	export interface RichDisplayRunOptions {
		filter?: ((reaction: MessageReaction, user: KlasaUser) => boolean);
		firstLast?: boolean;
		jump?: boolean;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface RichDisplayEmojisObject extends Record<string, EmojiResolvable> {
		first: EmojiResolvable;
		back: EmojiResolvable;
		forward: EmojiResolvable;
		last: EmojiResolvable;
		jump: EmojiResolvable;
		info: EmojiResolvable;
		stop: EmojiResolvable;
	}

	export interface RichMenuEmojisObject extends RichDisplayEmojisObject {
		zero: EmojiResolvable;
		one: EmojiResolvable;
		two: EmojiResolvable;
		three: EmojiResolvable;
		four: EmojiResolvable;
		five: EmojiResolvable;
		six: EmojiResolvable;
		seven: EmojiResolvable;
		eight: EmojiResolvable;
		nine: EmojiResolvable;
	}

	export interface MenuOptions {
		name: string;
		body: string;
		inline?: boolean;
	}

	export interface RichMenuRunOptions {
		filter?: Function;
		max?: number;
		maxEmojis?: number;
		maxUsers?: number;
		prompt?: string;
		startPage?: number;
		stop?: boolean;
		time?: number;
	}

	export interface MentionRegex {
		userOrMember: RegExp;
		channel: RegExp;
		emoji: RegExp;
		role: RegExp;
		snowflake: RegExp;
	}

	interface Stringifible {
		toString(): string;
	}

	interface Constructor<C> {
		new(...args: any[]): C;
	}

	type PrimitiveType = string | number | boolean;

	// Based on the built-in `Pick<>` generic
	type Filter<T, K extends keyof T> = {
		[P in keyof T]: P extends K ? unknown : T[P];
	};

	type ValueOf<T> = T[keyof T];
	type FilterKeyInstances<O, T> = ValueOf<{
		[K in keyof O]: O[K] extends T ? K : never
	}>;

	export interface TitleCaseVariants extends Record<string, string> {
		textchannel: 'TextChannel';
		voicechannel: 'VoiceChannel';
		categorychannel: 'CategoryChannel';
		guildmember: 'GuildMember';
	}

//#endregion

}

declare module 'discord.js' {

	import {
		ArgumentStore,
		Command,
		CommandStore,
		EventStore,
		ExtendableStore,
		Finalizer,
		FinalizerStore,
		GatewayDriver,
		InhibitorStore,
		KlasaClient,
		KlasaClientOptions,
		KlasaConsole,
		KlasaGuild,
		KlasaMessage,
		KlasaUser,
		Language,
		LanguageStore,
		Monitor,
		MonitorStore,
		PermissionLevels,
		Piece,
		ProviderStore,
		Schedule,
		ScheduledTask,
		SerializerStore,
		Stopwatch,
		Settings,
		Store,
		Task,
		TaskStore,
		Timestamp
	} from 'klasa';

	export interface Client {
		constructor: typeof KlasaClient;
		readonly invite: string;
		readonly owners: Set<User>;
		options: Required<KlasaClientOptions>;
		userBaseDirectory: string;
		console: KlasaConsole;
		arguments: ArgumentStore;
		commands: CommandStore;
		inhibitors: InhibitorStore;
		finalizers: FinalizerStore;
		monitors: MonitorStore;
		languages: LanguageStore;
		providers: ProviderStore;
		tasks: TaskStore;
		serializers: SerializerStore;
		events: EventStore;
		extendables: ExtendableStore;
		pieceStores: Collection<string, any>;
		permissionLevels: PermissionLevels;
		gateways: GatewayDriver;
		settings: Settings | null;
		application: ClientApplication;
		schedule: Schedule;
		ready: boolean;
		mentionPrefix: RegExp | null;
		registerStore<K, V extends Piece, VConstructor = Constructor<V>>(store: Store<K, V, VConstructor>): KlasaClient;
		unregisterStore<K, V extends Piece, VConstructor = Constructor<V>>(store: Store<K, V, VConstructor>): KlasaClient;
		sweepMessages(lifetime?: number, commandLifeTime?: number): number;
		on(event: 'argumentError', listener: (message: KlasaMessage, command: Command, params: any[], error: string) => void): this;
		on(event: 'commandError', listener: (message: KlasaMessage, command: Command, params: any[], error: Error | string) => void): this;
		on(event: 'commandInhibited', listener: (message: KlasaMessage, command: Command, response: string | Error) => void): this;
		on(event: 'commandRun', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		on(event: 'commandSuccess', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		on(event: 'commandUnknown', listener: (message: KlasaMessage, command: string, prefix: RegExp, prefixLength: number) => void): this;
		on(event: 'finalizerError', listener: (message: KlasaMessage, command: Command, response: KlasaMessage, runTime: Stopwatch, finalizer: Finalizer, error: Error | string) => void): this;
		on(event: 'klasaReady', listener: () => void): this;
		on(event: 'log', listener: (data: any) => void): this;
		on(event: 'monitorError', listener: (message: KlasaMessage, monitor: Monitor, error: Error | string) => void): this;
		on(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
		on(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
		on(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
		on(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
		on(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
		on(event: 'settingsCreateEntry', listener: (entry: Settings) => void): this;
		on(event: 'settingsDeleteEntry', listener: (entry: Settings) => void): this;
		on(event: 'settingsUpdateEntry', listener: (oldEntry: Settings, newEntry: Settings, path?: string) => void): this;
		on(event: 'taskError', listener: (scheduledTask: ScheduledTask, task: Task, error: Error) => void): this;
		on(event: 'verbose', listener: (data: any) => void): this;
		on(event: 'wtf', listener: (failure: Error) => void): this;
		once(event: 'argumentError', listener: (message: KlasaMessage, command: Command, params: any[], error: string) => void): this;
		once(event: 'commandError', listener: (message: KlasaMessage, command: Command, params: any[], error: Error | string) => void): this;
		once(event: 'commandInhibited', listener: (message: KlasaMessage, command: Command, response: string | Error) => void): this;
		once(event: 'commandRun', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		once(event: 'commandSuccess', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		once(event: 'commandUnknown', listener: (message: KlasaMessage, command: string, prefix: RegExp, prefixLength: number) => void): this;
		once(event: 'finalizerError', listener: (message: KlasaMessage, command: Command, response: KlasaMessage, runTime: Stopwatch, finalizer: Finalizer, error: Error | string) => void): this;
		once(event: 'klasaReady', listener: () => void): this;
		once(event: 'log', listener: (data: any) => void): this;
		once(event: 'monitorError', listener: (message: KlasaMessage, monitor: Monitor, error: Error | string) => void): this;
		once(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
		once(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
		once(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
		once(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
		once(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
		once(event: 'settingsCreateEntry', listener: (entry: Settings) => void): this;
		once(event: 'settingsDeleteEntry', listener: (entry: Settings) => void): this;
		once(event: 'settingsUpdateEntry', listener: (oldEntry: Settings, newEntry: Settings, path?: string) => void): this;
		once(event: 'taskError', listener: (scheduledTask: ScheduledTask, task: Task, error: Error) => void): this;
		once(event: 'verbose', listener: (data: any) => void): this;
		once(event: 'wtf', listener: (failure: Error) => void): this;
		off(event: 'argumentError', listener: (message: KlasaMessage, command: Command, params: any[], error: string) => void): this;
		off(event: 'commandError', listener: (message: KlasaMessage, command: Command, params: any[], error: Error | string) => void): this;
		off(event: 'commandInhibited', listener: (message: KlasaMessage, command: Command, response: string | Error) => void): this;
		off(event: 'commandRun', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		off(event: 'commandSuccess', listener: (message: KlasaMessage, command: Command, params: any[], response: any) => void): this;
		off(event: 'commandUnknown', listener: (message: KlasaMessage, command: string, prefix: RegExp, prefixLength: number) => void): this;
		off(event: 'finalizerError', listener: (message: KlasaMessage, command: Command, response: KlasaMessage, runTime: Stopwatch, finalizer: Finalizer, error: Error | string) => void): this;
		off(event: 'klasaReady', listener: () => void): this;
		off(event: 'log', listener: (data: any) => void): this;
		off(event: 'monitorError', listener: (message: KlasaMessage, monitor: Monitor, error: Error | string) => void): this;
		off(event: 'pieceDisabled', listener: (piece: Piece) => void): this;
		off(event: 'pieceEnabled', listener: (piece: Piece) => void): this;
		off(event: 'pieceLoaded', listener: (piece: Piece) => void): this;
		off(event: 'pieceReloaded', listener: (piece: Piece) => void): this;
		off(event: 'pieceUnloaded', listener: (piece: Piece) => void): this;
		off(event: 'settingsCreateEntry', listener: (entry: Settings) => void): this;
		off(event: 'settingsDeleteEntry', listener: (entry: Settings) => void): this;
		off(event: 'settingsUpdateEntry', listener: (oldEntry: Settings, newEntry: Settings, path?: string) => void): this;
		off(event: 'taskError', listener: (scheduledTask: ScheduledTask, task: Task, error: Error) => void): this;
		off(event: 'verbose', listener: (data: any) => void): this;
		off(event: 'wtf', listener: (failure: Error) => void): this;
	}

	export interface Guild {
		settings: Settings;
		readonly language: Language;
	}

	export interface Message extends PartialSendAliases {
		guildSettings: Settings;
		language: Language;
		command: Command | null;
		commandText: string | null;
		prefix: RegExp | null;
		prefixLength: number | null;
		readonly responses: KlasaMessage[];
		readonly args: string[];
		readonly params: any[];
		readonly flagArgs: Record<string, string>;
		readonly reprompted: boolean;
		readonly reactable: boolean;
		send(content?: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		send(content?: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		send(content?: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		send(options?: MessageOptions | MessageAdditions | APIMessage): Promise<KlasaMessage>;
		send(options?: MessageOptions & { split?: false } | MessageAdditions | APIMessage): Promise<KlasaMessage>;
		send(options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions | APIMessage): Promise<KlasaMessage[]>;
		edit(content: StringResolvable, options?: MessageEditOptions | MessageEmbed): Promise<KlasaMessage>;
		edit(options: MessageEditOptions | MessageEmbed | APIMessage): Promise<KlasaMessage>;
		usableCommands(): Promise<Collection<string, Command>>;
		hasAtLeastPermissionLevel(min: number): Promise<boolean>;
	}

	export interface User extends SendAliases {
		settings: Settings;
	}

	export interface TextChannel extends SendAliases, ChannelExtendables { }

	export interface DMChannel extends SendAliases, ChannelExtendables { }

	interface PartialSendAliases {
		sendLocale(key: string, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendLocale(key: string, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendLocale(key: string, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		sendLocale(key: string, localeArgs?: Array<any>, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendLocale(key: string, localeArgs?: Array<any>, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendLocale(key: string, localeArgs?: Array<any>, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		sendMessage(content?: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendMessage(content?: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendMessage(content?: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		sendMessage(options?: MessageOptions | MessageAdditions | APIMessage): Promise<KlasaMessage>;
		sendMessage(options?: MessageOptions & { split?: false } | MessageAdditions | APIMessage): Promise<KlasaMessage>;
		sendMessage(options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions | APIMessage): Promise<KlasaMessage[]>;
		sendEmbed(embed: MessageEmbed, content?: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendEmbed(embed: MessageEmbed, content?: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendEmbed(embed: MessageEmbed, content?: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		sendCode(language: string, content: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendCode(language: string, content: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendCode(language: string, content: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
	}

	interface SendAliases extends PartialSendAliases {
		sendFile(attachment: BufferResolvable, name?: string, content?: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendFile(attachment: BufferResolvable, name?: string, content?: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendFile(attachment: BufferResolvable, name?: string, content?: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
		sendFiles(attachments: MessageAttachment[], content: StringResolvable, options?: MessageOptions | MessageAdditions): Promise<KlasaMessage>;
		sendFiles(attachments: MessageAttachment[], content: StringResolvable, options?: MessageOptions & { split?: false } | MessageAdditions): Promise<KlasaMessage>;
		sendFiles(attachments: MessageAttachment[], content: StringResolvable, options?: MessageOptions & { split: true | SplitOptions } | MessageAdditions): Promise<KlasaMessage[]>;
	}

	interface ChannelExtendables {
		readonly attachable: boolean;
		readonly embedable: boolean;
		readonly postable: boolean;
		readonly readable: boolean;
	}

	interface Constructor<C> {
		new(...args: any[]): C;
	}

}
