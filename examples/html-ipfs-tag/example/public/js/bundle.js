/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/decodeBlob/index.js":
/*!**********************************!*\
  !*** ./dist/decodeBlob/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decodeBlob = void 0;
function decodeBlob(blob, mediaType) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.onloadend = function (e) {
            if (e.target && e.target.readyState == FileReader.DONE) {
                let data = e.target.result;
                if (data == null) {
                    reject('Failed to load blob');
                    return;
                }
                switch (mediaType.type) {
                    case 'text':
                        resolve(data);
                        break;
                    case 'image':
                        let img = new Image();
                        img.onload = function () {
                            resolve(img);
                        };
                        img.src = URL.createObjectURL(blob);
                        break;
                    case 'audio':
                    case 'video':
                        let media = new Audio();
                        media.src = URL.createObjectURL(blob);
                        media.oncanplaythrough = function () {
                            resolve(media);
                        };
                        media.load();
                        break;
                    default:
                        reject('Unsupported media type: ' + mediaType);
                }
            }
        };
        if (mediaType.type.startsWith('text') || mediaType.type === 'application/json') {
            reader.readAsText(blob);
        }
        else {
            reader.readAsDataURL(blob);
        }
    });
}
exports.decodeBlob = decodeBlob;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/fetchBlob.js":
/*!***************************!*\
  !*** ./dist/fetchBlob.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.fetchBlob = void 0;
const multiformats_1 = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'multiformats'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
/**
 *
 * @param {Helia<Libp2p>} node
 * @param {*} this.element
 * @returns {ArrayBuffer} content
 */
async function fetchBlob(fs, cid, type, endings = "transparent") {
    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];
    if (typeof cid === "string")
        cid = multiformats_1.CID.parse(cid);
    for await (const chunk of fs.cat(cid)) {
        content.push(chunk);
    }
    return new Blob(content, { type: type, endings: endings });
}
exports.fetchBlob = fetchBlob;
//# sourceMappingURL=fetchBlob.js.map

/***/ }),

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertContent = exports.decodeBlob = exports.fetchBlob = void 0;
const isIPFS = __importStar(__webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'is-ipfs'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())));
const media_typer_1 = __importDefault(__webpack_require__(/*! media-typer */ "./node_modules/media-typer/index.js"));
const fetchBlob_1 = __webpack_require__(/*! ./fetchBlob */ "./dist/fetchBlob.js");
Object.defineProperty(exports, "fetchBlob", ({ enumerable: true, get: function () { return fetchBlob_1.fetchBlob; } }));
const decodeBlob_1 = __webpack_require__(/*! ./decodeBlob */ "./dist/decodeBlob/index.js");
Object.defineProperty(exports, "decodeBlob", ({ enumerable: true, get: function () { return decodeBlob_1.decodeBlob; } }));
const insertContent_1 = __webpack_require__(/*! ./insertContent */ "./dist/insertContent/index.js");
Object.defineProperty(exports, "insertContent", ({ enumerable: true, get: function () { return insertContent_1.insertContent; } }));
/**
 *
 * @param ipfs IPFS
 * @param options Options
 * @returns
 */
const HTMLIpfs = async (fs, element) => {
    if (element.dataset.cid !== "string")
        return false;
    if (isIPFS.cid(element.dataset.cid) === false)
        return false;
    let cid = element.dataset.cid;
    if (typeof element.dataset.mediatype !== "string")
        return false;
    let mediatype = media_typer_1.default.parse(element.dataset.mediatype);
    let type = mediatype.type;
    let blob = await (0, fetchBlob_1.fetchBlob)(fs, cid, type);
    let content = await (0, decodeBlob_1.decodeBlob)(blob, mediatype);
    if (content == null)
        throw new Error("decode error");
    (0, insertContent_1.insertContent)(element, mediatype, content);
};
exports["default"] = HTMLIpfs;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/insertContent/index.js":
/*!*************************************!*\
  !*** ./dist/insertContent/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertContent = void 0;
const insertAudio_1 = __webpack_require__(/*! ./insertAudio */ "./dist/insertContent/insertAudio.js");
const insertVideo_1 = __webpack_require__(/*! ./insertVideo */ "./dist/insertContent/insertVideo.js");
const insertImage_1 = __webpack_require__(/*! ./insertImage */ "./dist/insertContent/insertImage.js");
const insertText_1 = __webpack_require__(/*! ./insertText */ "./dist/insertContent/insertText.js");
function insertContent(element, mediaType, content) {
    switch (mediaType.type) {
        case 'text':
            (0, insertText_1.insertText)(element, content);
            break;
        case 'image':
            (0, insertImage_1.insertImage)(element, content);
            break;
        case 'audio':
            (0, insertAudio_1.insertAudio)(element, content);
            break;
        case 'video':
            (0, insertVideo_1.insertVideo)(element, content);
            break;
        default:
            return false;
    }
}
exports.insertContent = insertContent;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./dist/insertContent/insertAudio.js":
/*!*******************************************!*\
  !*** ./dist/insertContent/insertAudio.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertAudio = void 0;
/**
 *
 */
function insertAudio(element, audio) {
    try {
        element.src = audio.src;
    }
    catch (error) {
        console.error(error);
    }
}
exports.insertAudio = insertAudio;
//# sourceMappingURL=insertAudio.js.map

/***/ }),

/***/ "./dist/insertContent/insertImage.js":
/*!*******************************************!*\
  !*** ./dist/insertContent/insertImage.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertImage = void 0;
/**
 *
 */
function insertImage(element, image) {
    try {
        element.src = image.src;
    }
    catch (error) {
        console.error(error);
    }
}
exports.insertImage = insertImage;
//# sourceMappingURL=insertImage.js.map

/***/ }),

/***/ "./dist/insertContent/insertText.js":
/*!******************************************!*\
  !*** ./dist/insertContent/insertText.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertText = void 0;
/**
 *
 */
function insertText(element, text) {
    element.innerText = escapeHtml(replaceControlCharacters(text));
}
exports.insertText = insertText;
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
//# sourceMappingURL=insertText.js.map

/***/ }),

/***/ "./dist/insertContent/insertVideo.js":
/*!*******************************************!*\
  !*** ./dist/insertContent/insertVideo.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.insertVideo = void 0;
/**
 *
 */
function insertVideo(element, video) {
    try {
        element.src = video.src;
    }
    catch (error) {
        console.error(error);
    }
}
exports.insertVideo = insertVideo;
//# sourceMappingURL=insertVideo.js.map

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