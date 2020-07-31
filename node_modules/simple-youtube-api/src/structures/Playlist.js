const { parseURL } = require('../util');
const Constants = require('../util/Constants');
const Video = require('./Video');
const Channel = require('./Channel');

/** Represents a YouTube playlist */
class Playlist {
    /**
     * @param {YouTube} youtube The YouTube instance creating this
     * @param {Object} data The data of the playlist
     */
    constructor(youtube, data) {
        /**
         * The YouTube instance that created this
         * @type {YouTube}
         */
        this.youtube = youtube;
        Object.defineProperty(this, 'youtube', { enumerable: false });

        /**
         * The type to filter search results
         * @type {string}
         */
        this.type = 'playlist';

        /**
         * Videos in this playlist.  Available after calling {@link Playlist#getVideos}.
         * @type {Array<Video>}
         */
        this.videos = [];

        this._patch(data);
    }

    _patch(data) {
        if (!data) return;

        this.raw = data;

        /**
         * The channel this playlist is in
         * @type {Channel}
         */
        this.channel = new Channel(this.youtube, data);

        /**
         * This playlist's ID
         * @type {string}
         * @name Playlist#id
         */

        switch (data.kind) {
            case Constants.KINDS.SearchResult:
                if (data.id.kind === Constants.KINDS.Playlist) this.id = data.id.playlistId;
                else throw new Error('Attempted to make a playlist out of a non-playlist search result.');
                break;
            case Constants.KINDS.Playlist:
                this.id = data.id;
                break;
            case Constants.KINDS.PlaylistItem:
                if (data.snippet) this.id = data.snippet.playlistId;
                else throw new Error('Attempted to make a playlist out of a resource with no playlist data.');
                return this; // don't pull extra info from playlist item info
            default:
                throw new Error(`Unknown playlist kind: ${data.kind}.`);
        }

        if (data.snippet) {
            /**
             * This playlist's title
             * @type {?string}
             */
            this.title = data.snippet.title;

            /**
             * This playlist's description
             * @type {?string}
             */
            this.description = data.snippet.description;

            /**
             * The date/time this playlist was published
             * @type {?Date}
             */
            this.publishedAt = new Date(data.snippet.publishedAt);

            /**
             * Thumbnails for this playlist
             * @type {?Object.<string, Thumbnail>}
             */
            this.thumbnails = data.snippet.thumbnails;

            /**
             * Channel title of this playlist
             * @type {?string}
             */
            this.channelTitle = data.snippet.channelTitle;

            /**
             * The language in this playlist's title and description
             * @type {?string}
             */
            this.defaultLanguage = data.snippet.defaultLanguage;

            /**
             * Information about the playlist as specified in the `hl` parameter
             * @type {?{title: string, description: string}}
             */
            this.localized = data.snippet.localized;
        }

        if (data.status) {
            /**
             * The privacy status of this video
             * @type {string}
             */
            this.privacy = data.status.privacyStatus;
        }

        if (data.contentDetails) {
            /**
             * The total number of videos in this playlist
             * @type {number}
             */
            this.length = data.contentDetails.itemCount;
        }

        if (data.player) {
            /**
             * A string with an iframe tag for embedding this playlist
             * @type {string}
             */
            this.embedHTML = data.player.embedHtml;
        }

        return this;
    }

    /**
     * The URL to this playlist
     * @type {string}
     */
    get url() {
        return `https://www.youtube.com/playlist?list=${this.id}`;
    }

    /**
     * Fetch the full representation of this playlist.
     * @param {object} [options] Any extra query params
     * @returns {Playlist}
     */
    fetch(options) {
        return this.youtube.request.getPlaylist(this.id, options).then(this._patch.bind(this));
    }

    /**
     * Gets videos in the playlist
     * @param {Number} [limit] Maximum number of videos to obtain.  Fetches all if not provided.
     * @param {Object} [options] Options to retrieve for each video.
     * @returns {Promise<Video[]>}
     */
    getVideos(limit, options) {
        return this.youtube.request.getPaginated(
            Constants.ENDPOINTS.PlaylistItems,
            limit,
            Object.assign({ playlistId: this.id, part: Constants.PARTS.PlaylistItems }, options)
        ).then(items => this.videos = items.map(i => new Video(this.youtube, i)));
    }

    /**
     * Get a playlist ID from a string (URL or ID)
     * @param {string} url The string to get the ID from
     * @returns {?string}
     */
    static extractID(url) {
        return parseURL(url).playlist;
    }
}

module.exports = Playlist;
