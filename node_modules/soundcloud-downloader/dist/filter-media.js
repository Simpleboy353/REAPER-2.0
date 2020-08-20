"use strict";
exports.__esModule = true;
/** @internal */
var filterMedia = function (media, predicateObj) {
    return media.filter(function (_a) {
        var format = _a.format;
        var match = false;
        if (predicateObj.protocol)
            match = format.protocol === predicateObj.protocol;
        if (predicateObj.format)
            match = format.mime_type === predicateObj.format;
        return match;
    });
};
exports["default"] = filterMedia;
