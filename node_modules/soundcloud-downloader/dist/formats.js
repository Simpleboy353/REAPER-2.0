"use strict";
exports.__esModule = true;
exports._FORMATS = void 0;
/**
 * Audio formats a track can be encoded in.
 */
var FORMATS;
(function (FORMATS) {
    FORMATS["MP3"] = "audio/mpeg";
    FORMATS["OPUS"] = "audio/ogg; codecs=\"opus\"";
})(FORMATS || (FORMATS = {}));
/** @internal */
exports._FORMATS = {
    MP3: FORMATS.MP3,
    OPUS: FORMATS.OPUS
};
exports["default"] = FORMATS;
