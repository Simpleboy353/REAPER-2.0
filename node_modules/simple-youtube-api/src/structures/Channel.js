const { parseURL } = require('../util');
const Constants = require('../util/Constants');

/**
 * Represents a YouTube channel
 * @class
 */
class Channel {
    /**
     * @param {YouTube} youtube The YouTube instance creating this
     * @param {Object} data The data of the channel
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
        this.type = 'channel';

        this._patch(data);
    }

    _patch(data) {
        if (!data) return;

        /**
         * Raw data from the YouTube API
         * @type {object}
         */
        this.raw = data;

        /**
         * Whether this is a full channel object.
         * @type {boolean}
         */
        this.full = data.kind === Constants.KINDS.Channel;

        /**
         * The YouTube resource from which this channel was created.
         * @type {string}
         */
        this.kind = data.kind;

        /**
         * This channel's ID
         * @type {string}
         * @name Channel#id
         */

        /**
         * This channel's title
         * @type {?string}
         * @name Channel#title
         */

        switch (data.kind) {
            case Constants.KINDS.Playlist:
            case Constants.KINDS.PlaylistItem:
            case Constants.KINDS.Video:
                if (data.snippet) {
                    this.id = data.snippet.channelId;
                    this.title = data.snippet.channelTitle;
                    break;
                } else {
                    throw new Error('Attempted to make a channel out of a resource with no channel data.');
                }
            case Constants.KINDS.SearchResult:
                if (data.id.kind === Constants.KINDS.Channel) {
                    this.id = data.id.channelId;
                    break;
                } else if (data.snippet) {
                    this.id = data.snippet.channelId;
                    this.title = data.snippet.channelTitle;
                    break;
                } else {
                    throw new Error('Attempted to make a channel out of a search result with no channel data.');
                }
            case Constants.KINDS.Channel:
                this.id = data.id;
                if (data.snippet) {
                    this.title = data.snippet.title;

                    /**
                     * This channel's description
                     * @type {?string}
                     * @name Channel#description
                     */
                    this.description = data.snippet.description;

                    /**
                     * The channel's custom URL if it has one
                     * @type {?string}
                     */
                    this.customURL = data.snippet.customUrl;

                    /**
                     * The channel's creation date
                     * @type {?Date}
                     * @name Channel#publishedAt
                     */
                    this.publishedAt = new Date(data.snippet.publishedAt);

                    /**
                     * The channel's thumbnails: available types are 'default', 'medium', and 'high'
                     * @type {?Object.<string, Thumbnail>}
                     */
                    this.thumbnails = data.snippet.thumbnails;

                    /**
                     * The channel's default language
                     * @type {?string}
                     */
                    this.defaultLanguage = data.snippet.defaultLanguage;

                    /**
                     * Information about the channel as specified in the `hl` query parameter
                     * @type {?{title: string, description: string}}
                     */
                    this.localized = data.snippet.localized;

                    /**
                     * The country of the channel
                     * @type {?string}
                     */
                    this.country = data.snippet.country;
                }

                if (data.contentDetails) {
                    /**
                     * Playlists associated with this channel; all values are playlist IDs
                     * @type {?Object}
                     * @property {?string} likes The channel's liked videos
                     * @property {?string} favorites The channel's favorited videos (note: favorited videos are deprecated)
                     * @property {?string} uploads The channel's uploaded videos
                     */
                    this.relatedPlaylists = data.contentDetails.relatedPlaylists;
                }

                if (data.statistics) {
                    /**
                     * The number of times the channel has been viewed
                     * @type {?number}
                     */
                    this.viewCount = data.statistics.viewCount;

                    /**
                     * The number of comments on the channel
                     * @type {?number}
                     */
                    this.commentCount = data.statistics.commentCount;

                    /**
                     * The number of subscribers the channel has
                     * @type {?number}
                     */
                    this.subscriberCount = data.statistics.subscriberCount;

                    /**
                     * Whether the channel's subscriber count is public
                     * @type {?boolean}
                     */
                    this.hiddenSubscriberCount = data.statistics.hiddenSubscriberCount;

                    /**
                     * The number of videos this channel has uploaded
                     * @type {?number}
                     */
                    this.videoCount = data.statistics.videoCount;
                }
                break;
            default:
                throw new Error(`Unknown channel kind: ${data.kind}.`);
        }

        return this;
    }

    /**
     * Fetch the full representation of this channel.
     * @param {object} [options] Any extra query params
     * @returns {Channel}
     */
    fetch(options) {
        return this.youtube.request.getChannel(this.id, options).then(this._patch.bind(this));
    }

    /**
     * The URL to this channel
     * @type {string}
     */
    get url() {
        return `https://www.youtube.com/channel/${this.id}`;
    }

    /**
     * Get a channel ID from a string (URL or ID)
     * @param {string} url The string to get the ID from
     * @returns {?string}
     */
    static extractID(url) {
        return parseURL(url).channel;
    }
}

module.exports = Channel;
