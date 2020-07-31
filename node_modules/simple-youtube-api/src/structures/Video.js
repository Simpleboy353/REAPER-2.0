const duration = require('iso8601-duration');
const { parseURL } = require('../util');
const Constants = require('../util/Constants');
const Channel = require('./Channel');

/** Represents a YouTube video */
class Video {
    /**
     * @param {YouTube} youtube The YouTube instance creating this
     * @param {Object} data The data of the video
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
        this.type = 'video';

        this._patch(data);
    }

    _patch(data) {
        if (!data) return;

        /**
         * The raw data from the YouTube API.
         * @type {object}
         */
        this.raw = data;

        /**
         * Whether this is a full (returned from the videos API end point) or partial video (returned
         * as part of another resource).
         * @type {boolean}
         */
        this.full = data.kind === Constants.KINDS.Video;

        /**
         * The resource that this video was created from.
         * @type {string}
         */
        this.kind = data.kind;

        /**
         * This video's ID
         * @type {string}
         * @name Video#id
         */

        switch (data.kind) {
            case Constants.KINDS.PlaylistItem:
                if (data.snippet) {
                    if (data.snippet.resourceId.kind === Constants.KINDS.Video) this.id = data.snippet.resourceId.videoId;
                    else throw new Error('Attempted to make a video out of a non-video playlist item.');
                    break;
                } else {
                    throw new Error('Attempted to make a video out of a playlist item with no video data.');
                }
            case Constants.KINDS.Video:
                this.id = data.id;
                break;
            case Constants.KINDS.SearchResult:
                if (data.id.kind === Constants.KINDS.Video) this.id = data.id.videoId;
                else throw new Error('Attempted to make a video out of a non-video search result.');
                break;
            default:
                throw new Error(`Unknown video kind: ${data.kind}.`);
        }

        if (data.snippet) {
            /**
             * This video's title
             * @type {string}
             */
            this.title = data.snippet.title;

            /**
             * This video's description
             * @type {string}
             */
            this.description = data.snippet.description;

            /**
             * The thumbnails of this video.
             * @type {Object.<'default', 'medium', 'high', 'standard', 'maxres'>}
             */
            this.thumbnails = data.snippet.thumbnails;

            /**
             * The date/time this video was published
             * @type {Date}
             */
            this.publishedAt = new Date(data.snippet.publishedAt);

            /**
             * The channel this video is in.
             * @type {Channel}
             */
            this.channel = new Channel(this.youtube, data);
        }

        if(data.contentDetails) {
            /**
             * An object containing time period information. All properties are integers, and do not include the lower
             * precision ones.
             * @typedef {Object} DurationObject
             * @property {number} [hours] How many hours the video is long
             * @property {number} [minutes] How many minutes the video is long
             * @property {number} [seconds] How many seconds the video is long
             */

            /**
             * The duration of the video
             * @type {?DurationObject}
             */
            this.duration = data.contentDetails.duration ? duration.parse(data.contentDetails.duration) : null;
        }

        return this;
    }

    /**
     * The maxiumum available resolution thumbnail.
     * @type {object}
     */
    get maxRes() {
        const t = this.thumbnails;
        return t.maxres || t.standard || t.high || t.medium || t.default;
    }

    /**
     * The URL to this video
     * @type {string}
     */
    get url() {
        return `https://www.youtube.com/watch?v=${this.id}`;
    }

    /**
     * The short URL to this video
     * @type {string}
     */
    get shortURL() {
        return `https://youtu.be/${this.id}`;
    }

    /**
     * The duration of the video in seconds
     * @type {number}
     */
    get durationSeconds() {
        return this.duration ? duration.toSeconds(this.duration) : -1;
    }

    /**
     * Fetch the full representation of this video.
     * @param {object} [options] Any extra query params
     * @returns {Video}
     */
    fetch(options) {
        return this.youtube.request.getVideo(this.id, options).then(this._patch.bind(this));
    }

    /**
     * Get a video ID from a string (URL or ID)
     * @param {string} url The string to get the ID from
     * @returns {?string}
     */
    static extractID(url) {
        return parseURL(url).video;
    }
}

module.exports = Video;
