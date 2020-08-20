"use strict";
/** @internal @packageDocumentation */
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
exports.fromMediaObj = exports.fromMediaObjBase = exports.fromURL = exports.fromURLBase = exports.getHLSStream = exports.getProgressiveStream = exports.getMediaURL = void 0;
var axios_1 = __importDefault(require("axios"));
var m3u8stream_1 = __importDefault(require("m3u8stream"));
var util_1 = require("./util");
exports.getMediaURL = function (url, clientID, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axiosInstance.get(url + "?client_id=" + clientID, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
                        Accept: '*/*',
                        'Accept-Encoding': 'gzip, deflate, br'
                    },
                    withCredentials: true
                })];
            case 1:
                res = _a.sent();
                if (!res.data.url)
                    throw new Error("Invalid response from Soundcloud. Check if the URL provided is correct: " + url);
                return [2 /*return*/, res.data.url];
        }
    });
}); };
exports.getProgressiveStream = function (mediaUrl, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axiosInstance.get(mediaUrl, {
                    withCredentials: true,
                    responseType: 'stream'
                })];
            case 1:
                r = _a.sent();
                return [2 /*return*/, r.data];
        }
    });
}); };
exports.getHLSStream = function (mediaUrl) { return m3u8stream_1["default"](mediaUrl); };
exports.fromURLBase = function (url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    var mediaUrl, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, getMediaURLFunction(url, clientID, axiosInstance)];
            case 1:
                mediaUrl = _a.sent();
                if (!url.includes('/progressive')) return [3 /*break*/, 3];
                return [4 /*yield*/, getProgressiveStreamFunction(mediaUrl, axiosInstance)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/, getHLSStreamFunction(mediaUrl)];
            case 4:
                err_1 = _a.sent();
                throw util_1.handleRequestErrs(err_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.fromURL = function (url, clientID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.fromURLBase(url, clientID, exports.getMediaURL, exports.getProgressiveStream, exports.getHLSStream, axios_1["default"])];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.fromMediaObjBase = function (media, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, fromURLFunction, axiosInstance) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!validatemedia(media))
                    throw new Error('Invalid media object provided');
                return [4 /*yield*/, fromURLFunction(media.url, clientID, getMediaURLFunction, getProgressiveStreamFunction, getHLSStreamFunction, axiosInstance)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.fromMediaObj = function (media, clientID) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, exports.fromMediaObjBase(media, clientID, exports.getMediaURL, exports.getProgressiveStream, exports.getHLSStream, exports.fromURL, axios_1["default"])];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
var validatemedia = function (media) {
    if (!media.url || !media.format)
        return false;
    return true;
};
