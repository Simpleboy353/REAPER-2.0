const Request = require('./Request');

const Video = require('./structures/Video');
const Playlist = require('./structures/Playlist');
const Channel = require('./structures/Channel');

const util = require('./util');
const Constants = require('./util/Constants');

/**
 * Information about a thumbnail
 * @typedef {Object} Thumbnail
 * @property {string} url The URL of this thumbnail
 * @property {number} width The width of this thumbnail
 * @property {number} height The height of this thumbnail
 */

/**
 * The YouTube API module
 */
class YouTube {
    /**
     * @param {string} key The YouTube Data API v3 key to use
     */
    constructor(key) {
        if (typeof key !== 'string') throw new Error('The YouTube API key you provided was not a string.');
        /**
         * The YouTube Data API v3 key
         * @type {?string}
         */
        this.key = key;
        Object.defineProperty(this, 'key', { enumerable: false });

        this.request = new Request(this);
    }

    /**
     * Make a request to the YouTube API
     * @param {string} endpoint The endpoint of the API
     * @param {Object} qs The query string options
     * @returns {Promise<Object>}
     */

    /**
     * Get a video by URL or ID
     * @param {string} url The video URL or ID
     * @param {Object} [options = {}] Options to request with the video.
     * @returns {Promise<?Video>}
     * @example
     * API.getVideo('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
     *  .then(video => {
     *    if (video) console.log(`The video's title is ${video.title}`);
     *    else console.log('video not found :(');
     *  })
     *  .catch(console.error);
     */
    getVideo(url, options = {}) {
        const id = Video.extractID(url);
        if (!id) return Promise.reject(new Error(`No video ID found in URL: ${url}`));
        return this.getVideoByID(id, options);
    }

    /**
     * Get a video by ID
     * @param {string} id The video ID
     * @param {Object} [options = {}] Options to request with the video.
     * @returns {Promise<?Video>}
     * @example
     * API.getVideoByID('3odIdmuFfEY')
     *  .then(video => {
     *    if (video) console.log(`The video's title is ${video.title}`);
     *    else console.log('video not found :(');
     *  })
     *  .catch(console.error);
     */
    getVideoByID(id, options = {}) {
        return this.request.getVideo(id, options).then(result => result ? new Video(this, result) : null);
    }

    /**
     * Get a playlist by URL or ID
     * @param {string} url The playlist URL or ID
     * @param {Object} [options = {}] Options to request with the playlist.
     * @returns {Promise<?Playlist>}
     * @example
     * API.getPlaylist('https://www.youtube.com/playlist?list=PLuY9odN8x9puRuCxiddyRzJ3F5jR-Gun9')
     *  .then(playlist => {
     *    if (playlist) console.log(`The playlist's title is ${playlist.title}`);
     *    else console.log('playlist not found :(');
     *  })
     *  .catch(console.error);
     */
    getPlaylist(url, options = {}) {
        const id = Playlist.extractID(url);
        if (!id) return Promise.reject(new Error(`No playlist ID found in URL: ${url}`));
        return this.getPlaylistByID(id, options);
    }

    /**
     * Get a playlist by ID
     * @param {string} id The playlist ID
     * @param {Object} [options = {}] Options to request with the playlist.
     * @returns {Promise<?Playlist>}
     * @example
     * API.getPlaylistByID('PL2BN1Zd8U_MsyMeK8r9Vdv1lnQGtoJaSa')
     *  .then(playlist => {
     *    if (playlist) console.log(`The playlist's title is ${playlist.title}`);
     *    else console.log('playlist not found :(');
     *  })
     *  .catch(console.error);
     */
    getPlaylistByID(id, options = {}) {
        return this.request.getPlaylist(id, options).then(result => result ? new Playlist(this, result) : null);
    }

    /**
     * Get a channel by URL or ID
     * @param {string} url The channel URL or ID
     * @param {Object} [options = {}] Options to request with the channel.
     * @returns {Promise<?Channel>}
     * @example
     * API.getChannel('https://www.youtube.com/channel/UC477Kvszl9JivqOxN1dFgPQ')
     *  .then(channel => {
     *    if (channel) console.log(`The channel's title is ${channel.title}`);
     *    else console.log('channel not found :(');
     *  })
     *  .catch(console.error);
     */
    getChannel(url, options = {}) {
        const id = Channel.extractID(url);
        if (!id) return Promise.reject(new Error(`No channel ID found in URL: ${url}`));
        return this.getChannelByID(id, options);
    }

    /**
     * Get a channel by ID
     * @param {string} id The channel ID
     * @param {Object} [options = {}] Options to request with the channel.
     * @returns {Promise<?Channel>}
     * @example
     * API.getChannelByID('UC477Kvszl9JivqOxN1dFgPQ')
     *  .then(channel => {
     *    if (channel) console.log(`The channel's title is ${channel.title}`);
     *    else console.log('channel not found :(');
     *  })
     *  .catch(console.error);
     */
    getChannelByID(id, options = {}) {
        return this.request.getChannel(id, options).then(result => result ? new Channel(this, result) : null);
    }

    /**
     * Search YouTube for videos, playlists, and channels
     * @param {string} query The string to search for
     * @param {number} [limit = 5] Maximum results to obtain
     * @param {Object} [options] Additional options to pass to the API request
     * @returns {Promise<Array<Video|Playlist|Channel|null>>}
     * @example
     * API.search('Centuries')
     *  .then(results => {
     *    console.log(`I got ${results.length} results`);
     *  })
     *  .catch(console.error);
     */
    search(query, limit = 5, options = {}) {
        return this.request.getPaginated(Constants.ENDPOINTS.Search, limit, Object.assign(options, { q: query, part: Constants.PARTS.Search }))
            .then(result => result.map(item => {
                if (item.id.kind === Constants.KINDS.Video) return new Video(this, item);
                if (item.id.kind === Constants.KINDS.Playlist) return new Playlist(this, item);
                if (item.id.kind === Constants.KINDS.Channel) return new Channel(this, item);
                return null;
            }));
    }

    /**
     * Search YouTube for videos
     * @param {string} query The string to search for
     * @param {number} [limit = 5] Maximum results to obtain
     * @param {Object} [options] Additional options to pass to the API request
     * @returns {Promise<Video[]>}
     * @example
     * API.searchVideos('Centuries')
     *  .then(results => {
     *    console.log(`I got ${results.length} videos`);
     *  })
     *  .catch(console.error);
     */
    searchVideos(query, limit = 5, options = {}) {
        return this.search(query, limit, Object.assign(options, { type: 'video' }));
    }

    /**
     * Search YouTube for playlists
     * @param {string} query The string to search for
     * @param {number} [limit = 5] Maximum results to obtain
     * @param {Object} [options] Additional options to pass to the API request
     * @returns {Promise<Playlist[]>}
     * @example
     * API.searchPlaylists('Centuries')
     *  .then(results => {
     *    console.log(`I got ${results.length} playlists`);
     *  })
     *  .catch(console.error);
     */
    searchPlaylists(query, limit = 5, options = {}) {
        return this.search(query, limit, Object.assign(options, { type: 'playlist' }));
    }

    /**
     * Search YouTube for channels
     * @param {string} query The string to search for
     * @param {number} [limit = 5] Maximum results to obtain
     * @param {Object} [options] Additional options to pass to the API request
     * @returns {Promise<Channel[]>}
     * @example
     * API.searchChannels('Centuries')
     *  .then(results => {
     *    console.log(`I got ${results.length} channels`);
     *  })
     *  .catch(console.error);
     */
    searchChannels(query, limit = 5, options = {}) {
        return this.search(query, limit, Object.assign(options, { type: 'channel' }));
    }
}

YouTube.Video = Video;
YouTube.Playlist = Playlist;
YouTube.Channel = Channel;
YouTube.util = util;

module.exports = YouTube;
