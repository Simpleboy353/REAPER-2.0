"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.SCDL = void 0;
var soundcloud_key_fetch_1 = __importDefault(require("soundcloud-key-fetch"));
var info_1 = __importStar(require("./info"));
var filter_media_1 = __importDefault(require("./filter-media"));
var download_1 = require("./download");
var is_url_1 = __importDefault(require("./is-url"));
var protocols_1 = require("./protocols");
var formats_1 = require("./formats");
/** @internal */
var download = function (url, clientID) { return __awaiter(void 0, void 0, void 0, function () {
    var info;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, info_1["default"](url, clientID)];
            case 1:
                info = _a.sent();
                return [4 /*yield*/, download_1.fromMediaObj(info.media.transcodings[0], clientID)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
/** @internal */
var downloadFormat = function (url, clientID, format) { return __awaiter(void 0, void 0, void 0, function () {
    var info, filtered;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, info_1["default"](url, clientID)];
            case 1:
                info = _a.sent();
                filtered = filter_media_1["default"](info.media.transcodings, { format: format });
                if (filtered.length === 0)
                    throw new Error("Could not find media with specified format: (" + format + ")");
                return [4 /*yield*/, download_1.fromMediaObj(filtered[0], clientID)];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
var SCDL = /** @class */ (function () {
    function SCDL() {
    }
    /**
     * Returns a media Transcoding that matches the given predicate object
     * @param media - The Transcodings to filter
     * @param predicateObj - The desired Transcoding object to match
     * @returns An array of Transcodings that match the predicate object
     */
    SCDL.prototype.filterMedia = function (media, predicateObj) {
        return filter_media_1["default"](media, predicateObj);
    };
    /**
     * Get the audio of a given track. It returns the first format found.
     *
     * @param url - The URL of the Soundcloud track
     * @param clientID - A Soundcloud Client ID, will find one if not provided
     * @returns A ReadableStream containing the audio data
    */
    SCDL.prototype.download = function (url, clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = download;
                        _b = [url];
                        return [4 /*yield*/, this._assignClientID(clientID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    /**
     *  Get the audio of a given track with the specified format
     * @param url - The URL of the Soundcloud track
     * @param format - The desired format
     * @param clientID - A Soundcloud Client ID, will find one if not provided
    */
    SCDL.prototype.downloadFormat = function (url, format, clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = downloadFormat;
                        _b = [url];
                        return [4 /*yield*/, this._assignClientID(clientID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), format]))];
                }
            });
        });
    };
    /**
     * Returns info about a given track.
     * @param url - URL of the Soundcloud track
     * @param clientID - A Soundcloud Client ID, will find one if not provided
     * @returns Info about the track
    */
    SCDL.prototype.getInfo = function (url, clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = info_1["default"];
                        _b = [url];
                        return [4 /*yield*/, this._assignClientID(clientID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                }
            });
        });
    };
    /**
     * Returns info about a given track.
     * @param id - The track ID
     * @param clientID - A Soundcloud Client ID, will find one if not provided
     * @returns Info about the track
     */
    SCDL.prototype.getTrackInfoByID = function (id, clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = info_1.getTrackInfoByID;
                        _b = [id];
                        return [4 /*yield*/, this._assignClientID(clientID)];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    /**
     * Returns info about the given set
     * @param url - URL of the Soundcloud set
     * @param full - Defaults to false. Whether or not to retrieve all info for every track in the set. Note: This is done track by track and can be quite slow if there are a large amount of tracks in the set.
     * @param clientID - A Soundcloud Client ID, will find one if not provided
     * @returns Info about the set
     */
    SCDL.prototype.getSetInfo = function (url, full, clientID) {
        if (full === void 0) { full = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = info_1.getSetInfo;
                        _b = [url];
                        return [4 /*yield*/, this._assignClientID(clientID)];
                    case 1: return [2 /*return*/, _a.apply(void 0, _b.concat([_c.sent(), full]))];
                }
            });
        });
    };
    /**
     * Returns whether or not the given URL is a valid Soundcloud URL
     * @param url - URL of the Soundcloud track
    */
    SCDL.prototype.isValidUrl = function (url) {
        return is_url_1["default"](url);
    };
    /** @internal */
    SCDL.prototype._assignClientID = function (clientID) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!clientID) return [3 /*break*/, 3];
                        if (!!this._clientID) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, soundcloud_key_fetch_1["default"].fetchKey()];
                    case 1:
                        _a._clientID = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this._clientID];
                    case 3: return [2 /*return*/, clientID];
                }
            });
        });
    };
    return SCDL;
}());
exports.SCDL = SCDL;
var scdl = new SCDL();
scdl.STREAMING_PROTOCOLS = protocols_1._PROTOCOLS;
scdl.FORMATS = formats_1._FORMATS;
exports["default"] = scdl;
