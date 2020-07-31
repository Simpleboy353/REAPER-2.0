const { parse } = require('url');

/**
 * Parse a string as a potential YouTube resource URL.
 * @param {string} url
 * @returns {{video: ?string, channel: ?string, playlist: ?string}}
 */
exports.parseURL = (url) => {
    const parsed = parse(url, true);
    switch (parsed.hostname) {
        case 'www.youtube.com':
        case 'youtube.com':
        case 'm.youtube.com':
        case 'music.youtube.com': {
            const idRegex = /^[a-zA-Z0-9-_]+$/;
            if (parsed.pathname === '/watch') {
                if (!idRegex.test(parsed.query.v)) return {};
                const response = { video: parsed.query.v };
                if (parsed.query.list) response.playlist = parsed.query.list;
                return response;
            } else if (parsed.pathname === '/playlist') {
                if(!idRegex.test(parsed.query.list)) return {};
                return { playlist: parsed.query.list };
            } else if (parsed.pathname.startsWith('/channel/')) {
                const id = parsed.pathname.replace('/channel/', '');
                if (!idRegex.test(id)) return {};
                return { channel: id };
            } else if (parsed.pathname.startsWith('/browse/')) {
                const id = parsed.pathname.replace('/browse/', '');
                if (!idRegex.test(id)) return {};
                return { channel: id };
            }

            return {};
        }
        case 'youtu.be':
            return { video: /^\/[a-zA-Z0-9-_]+$/.test(parsed.pathname) ? parsed.pathname.slice(1) : null };
        default:
            return {};
    }
};
