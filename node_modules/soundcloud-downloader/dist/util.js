"use strict";
/** @internal @packageDocumentation */
exports.__esModule = true;
exports.handleRequestErrs = void 0;
exports.handleRequestErrs = function (err) {
    if (!err.response)
        return err;
    if (!err.response.status)
        return err;
    if (err.response.status === 401)
        err.message += ', is your Client ID correct?';
    if (err.response.status === 404)
        err.message += ', could not find the song... it may be private - check the URL';
    return err;
};
