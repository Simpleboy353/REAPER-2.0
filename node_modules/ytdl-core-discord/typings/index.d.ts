import ytdl from 'ytdl-core';
import { Readable } from 'stream';

declare function download(link: string, options?: ytdl.downloadOptions): Promise<Readable>;

declare namespace ytdlDiscord {
  const newDownload: typeof download & typeof ytdl;
}

export = ytdlDiscord.newDownload;