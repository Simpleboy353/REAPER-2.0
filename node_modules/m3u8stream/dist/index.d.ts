/// <reference types="node" />
import { PassThrough } from 'stream';
import miniget from 'miniget';
declare namespace m3u8stream {
    interface Options {
        begin?: number | string;
        liveBuffer?: number;
        chunkReadahead?: number;
        highWaterMark?: number;
        requestOptions?: miniget.Options;
        parser?: 'm3u8' | 'dash-mpd';
        id?: string;
    }
    interface Progress {
        num: number;
        size: number;
        duration: number;
        url: string;
    }
    interface Stream extends PassThrough {
        end: () => void;
        on(event: 'progress', progress: Progress, totalSegments: number, downloadedBytes: number): this;
        on(event: string | symbol, listener: (...args: any) => void): this;
    }
}
declare let m3u8stream: (playlistURL: string, options?: m3u8stream.Options) => m3u8stream.Stream;
export = m3u8stream;
