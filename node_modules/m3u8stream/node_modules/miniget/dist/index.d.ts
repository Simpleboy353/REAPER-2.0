/// <reference types="node" />
import { RequestOptions, IncomingMessage } from 'http';
import { PassThrough, Transform } from 'stream';
declare namespace Miniget {
    interface Options extends RequestOptions {
        maxRedirects?: number;
        maxRetries?: number;
        maxReconnects?: number;
        backoff?: {
            inc: number;
            max: number;
        };
        highWaterMark?: number;
        transform?: (parsedUrl: RequestOptions) => RequestOptions;
        acceptEncoding?: {
            [key: string]: () => Transform;
        };
    }
    interface Stream extends PassThrough {
        abort: () => void;
        on(event: 'reconnect', listener: (attempt: number, err?: Error) => void): this;
        on(event: 'retry', listener: (attempt: number, err?: Error) => void): this;
        on(event: 'redirect', listener: (url: string) => void): this;
        on(event: string | symbol, listener: (...args: any) => void): this;
    }
}
declare type Callback = (error: Error, message: IncomingMessage, body: string) => void;
declare function Miniget(url: string, options?: Miniget.Options): Miniget.Stream;
declare function Miniget(url: string, options: Miniget.Options, callback?: Callback): void;
declare function Miniget(url: string, callback: Callback): Miniget.Stream;
declare namespace Miniget {
    const promise: (url: string, options?: Options) => Promise<[IncomingMessage, string]>;
}
export = Miniget;
