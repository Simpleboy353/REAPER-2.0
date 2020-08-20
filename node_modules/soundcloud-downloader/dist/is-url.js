"use strict";
exports.__esModule = true;
/** @internal @packageDocumentation */
var regexp = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
var isURL = function (url) {
    if (!url.match(regexp))
        return false;
    return url.match(regexp) && url.match(regexp)[2];
};
exports["default"] = isURL;
