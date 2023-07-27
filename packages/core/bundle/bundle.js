/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/fetch.js":
/*!***********************!*\
  !*** ./dist/fetch.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {Helia<Libp2p>} node
 * @param {*} this.element
 * @returns {ArrayBuffer} content
 */
async function fetch(fs, context) {
    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];
    for await (const chunk of fs.cat(context.cid)) {
        content.push(chunk);
    }
    const blob = new Blob(content, { type: context.mediatype.type });
    return blob;
}
exports["default"] = fetch;
//# sourceMappingURL=fetch.js.map

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insert = exports.fetch = exports.parse = void 0;
// import isIPFS from 'is-ipfs'
// @ts-ignore
const media_typer_1 = __importDefault(__webpack_require__(/*! media-typer */ "./node_modules/media-typer/index.js"));
const parse_1 = __importDefault(__webpack_require__(/*! ./parse */ "./dist/parse.js"));
exports.parse = parse_1.default;
const fetch_1 = __importDefault(__webpack_require__(/*! ./fetch */ "./dist/fetch.js"));
exports.fetch = fetch_1.default;
const insert_1 = __importDefault(__webpack_require__(/*! ./insert */ "./dist/insert/index.js"));
exports.insert = insert_1.default;
/**
 *
 * @param ipfs IPFS
 * @param options Options
 * @returns
 */
const IPFSTag = async (fs, element) => {
    if (element.dataset.cid !== "string")
        return false;
    let cid = element.dataset.cid;
    if (typeof element.dataset.mediatype !== "string")
        return false;
    let mediatype = media_typer_1.default.parse(element.dataset.mediatype);
    let encord = element.dataset.encord;
    let params = (0, parse_1.default)(cid, mediatype, encord);
    if (!params)
        return false;
    let blob = await (0, fetch_1.default)(fs, params);
    (0, insert_1.default)(element, params, blob);
};
exports["default"] = IPFSTag;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/insert/index.js":
/*!******************************!*\
  !*** ./dist/insert/index.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const insertAudio_1 = __importDefault(__webpack_require__(/*! ./insertAudio */ "./dist/insert/insertAudio.js"));
const insertVideo_1 = __importDefault(__webpack_require__(/*! ./insertVideo */ "./dist/insert/insertVideo.js"));
const insertImage_1 = __importDefault(__webpack_require__(/*! ./insertImage */ "./dist/insert/insertImage.js"));
const insertText_1 = __importDefault(__webpack_require__(/*! ./insertText */ "./dist/insert/insertText.js"));
async function insert(element, params, blob) {
    const reader = new FileReader();
    switch (params.mediatype.type.toLowerCase()) {
        case 'text':
            (0, insertText_1.default)(element, params, blob, reader);
            break;
        case 'image':
            (0, insertImage_1.default)(element, params, blob, reader);
            break;
        case 'audio':
            (0, insertAudio_1.default)(element, params, blob, reader);
            break;
        case 'video':
            (0, insertVideo_1.default)(element, params, blob, reader);
            break;
        default:
            return false;
    }
}
exports["default"] = insert;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/insert/insertAudio.js":
/*!************************************!*\
  !*** ./dist/insert/insertAudio.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {Blob} blob
 */
async function insertAudio(element, params, blob, reader) {
    const tagname = element.tagName;
    // const media = mediatype.fromString(element.dataset.mediatype)
    // const encord = element.dataset?.encord || null
    reader.addEventListener('load', (event) => {
        if (typeof event.target?.result !== 'string')
            return false;
        if (tagname === 'AUDIO') {
            element.src = event.target.result;
        }
    });
    reader.readAsDataURL(blob);
}
exports["default"] = insertAudio;
//# sourceMappingURL=insertAudio.js.map

/***/ }),

/***/ "./dist/insert/insertImage.js":
/*!************************************!*\
  !*** ./dist/insert/insertImage.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {IPFS} ipfs
 */
async function insertImage(element, params, blob, reader) {
    const tagname = element.tagName;
    if (element == null)
        return false;
    reader.addEventListener('load', (event) => {
        if (typeof event.target?.result !== 'string')
            return false;
        switch (element) {
            case element:
                element.src = event.target.result;
                break;
            // case element as HTMLCanvasElement:
            //   const img = new Image();
            //   img.src = event.target.result;
            //   element.clearRect(0, 0, element.width, element.height);
            //   element.getContext("2d").drawImage(img, 0, 0);
            //   break;
            default:
                break;
        }
    });
    reader.readAsDataURL(blob);
}
exports["default"] = insertImage;
//# sourceMappingURL=insertImage.js.map

/***/ }),

/***/ "./dist/insert/insertText.js":
/*!***********************************!*\
  !*** ./dist/insert/insertText.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {IPFS} ipfs
 */
async function insertText(element, params, blob, reader) {
    // const media = MediaType.parse(element.dataset.mediatype)
    const encord = element.dataset?.encord || null;
    reader.onload = (event) => {
        if (typeof event.target?.result !== 'string')
            return false;
        switch (params.mediatype.subtype) {
            case 'plain':
                element.innerText = escapeHtml(replaceControlCharacters(event.target.result));
                break;
            case 'html':
                return false;
                // element.innerHTML = replaceControlCharacters(event.target.result);
                break;
            case 'css':
                return false;
                // element.innerHTML = event.target.result;
                break;
            case 'javascript':
                return false;
                // element.innerHTML = event.target.result;
                break;
            default:
        }
    };
    reader.readAsText(blob, params.encord);
}
function replaceControlCharacters(str, replacementStr = '') {
    return str; //.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g,replacementStr)
}
function escapeHtml(htmlStr) {
    return htmlStr.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
exports["default"] = insertText;
//# sourceMappingURL=insertText.js.map

/***/ }),

/***/ "./dist/insert/insertVideo.js":
/*!************************************!*\
  !*** ./dist/insert/insertVideo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 *
 * @param {Blob} blob
 */
async function insertVideo(element, params, blob, reader) {
    const tagname = element.tagName;
    reader.addEventListener('load', (event) => {
        if (typeof event.target?.result !== 'string')
            return false;
        if (tagname === 'VIDEO') {
            element.src = event.target.result;
        }
    });
    reader.readAsDataURL(blob);
}
exports["default"] = insertVideo;
//# sourceMappingURL=insertVideo.js.map

/***/ }),

/***/ "./dist/parse.js":
/*!***********************!*\
  !*** ./dist/parse.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const multiformats_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'multiformats'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
function parse(cid, mediaType, encord) {
    return {
        cid: multiformats_1.CID.parse(cid),
        mediatype: mediaType,
        encord: encord || undefined
    };
    // return {
    //   cid: cid,
    //   mediatype: {
    //     type: MediaType.fromString(element.dataset.mediatype).type.toLowerCase(),
    //     subtype: MediaType.fromString(element.dataset.mediatype).subtype.toLowerCase(),
    //   },
    //   encord: element.dataset.encord || undefined
    // };
}
exports["default"] = parse;
//# sourceMappingURL=parse.js.map

/***/ }),

/***/ "./node_modules/media-typer/index.js":
/*!*******************************************!*\
  !*** ./node_modules/media-typer/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

/*!
 * media-typer
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match type in RFC 6838
 *
 * type-name = restricted-name
 * subtype-name = restricted-name
 * restricted-name = restricted-name-first *126restricted-name-chars
 * restricted-name-first  = ALPHA / DIGIT
 * restricted-name-chars  = ALPHA / DIGIT / "!" / "#" /
 *                          "$" / "&" / "-" / "^" / "_"
 * restricted-name-chars =/ "." ; Characters before first dot always
 *                              ; specify a facet name
 * restricted-name-chars =/ "+" ; Characters after last plus always
 *                              ; specify a structured syntax suffix
 * ALPHA =  %x41-5A / %x61-7A   ; A-Z / a-z
 * DIGIT =  %x30-39             ; 0-9
 */
var SUBTYPE_NAME_REGEXP = /^[A-Za-z0-9][A-Za-z0-9!#$&^_.-]{0,126}$/
var TYPE_NAME_REGEXP = /^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}$/
var TYPE_REGEXP = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/

/**
 * Module exports.
 */

exports.format = format
exports.parse = parse
exports.test = test

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var subtype = obj.subtype
  var suffix = obj.suffix
  var type = obj.type

  if (!type || !TYPE_NAME_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  if (!subtype || !SUBTYPE_NAME_REGEXP.test(subtype)) {
    throw new TypeError('invalid subtype')
  }

  // format as type/subtype
  var string = type + '/' + subtype

  // append +suffix
  if (suffix) {
    if (!TYPE_NAME_REGEXP.test(suffix)) {
      throw new TypeError('invalid suffix')
    }

    string += '+' + suffix
  }

  return string
}

/**
 * Test media type.
 *
 * @param {string} string
 * @return {object}
 * @public
 */

function test (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  return TYPE_REGEXP.test(string.toLowerCase())
}

/**
 * Parse media type to object.
 *
 * @param {string} string
 * @return {object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  if (typeof string !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var match = TYPE_REGEXP.exec(string.toLowerCase())

  if (!match) {
    throw new TypeError('invalid media type')
  }

  var type = match[1]
  var subtype = match[2]
  var suffix

  // suffix after last +
  var index = subtype.lastIndexOf('+')
  if (index !== -1) {
    suffix = subtype.substr(index + 1)
    subtype = subtype.substr(0, index)
  }

  return new MediaType(type, subtype, suffix)
}

/**
 * Class for MediaType object.
 * @public
 */

function MediaType (type, subtype, suffix) {
  this.type = type
  this.subtype = subtype
  this.suffix = suffix
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=bundle.js.map