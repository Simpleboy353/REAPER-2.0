"use strict";
exports.__esModule = true;
exports._PROTOCOLS = void 0;
/**
 * Soundcloud streams tracks using these protocols.
 */
var STREAMING_PROTOCOLS;
(function (STREAMING_PROTOCOLS) {
    STREAMING_PROTOCOLS["HLS"] = "hls";
    STREAMING_PROTOCOLS["PROGRESSIVE"] = "progressive";
})(STREAMING_PROTOCOLS || (STREAMING_PROTOCOLS = {}));
/** @internal */
exports._PROTOCOLS = {
    HLS: STREAMING_PROTOCOLS.HLS,
    PROGRESSIVE: STREAMING_PROTOCOLS.PROGRESSIVE
};
exports["default"] = STREAMING_PROTOCOLS;
