/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/media-type/lib/mediaType.js":
/*!******************************************************!*\
  !*** ../../node_modules/media-type/lib/mediaType.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

/**
 * media-type
 * @author Lovell Fuller
 *
 * This code is distributed under the Apache License Version 2.0, the terms of
 * which may be found at http://www.apache.org/licenses/LICENSE-2.0.html
 */

var MediaType = function() {
  this.type = null;
  this._setSubtypeAndSuffix(null);
  this.parameters = {};
};

MediaType.prototype.isValid = function() {
  return this.type !== null && this.subtype !== null && this.subtype !== "example";
};

MediaType.prototype._setSubtypeAndSuffix = function(subtype) {
  this.subtype = subtype;
  this.subtypeFacets = [];
  this.suffix = null;
  if (subtype) {
    if (subtype.indexOf("+") > -1 && subtype.substr(-1) !== "+") {
      var fixes = subtype.split("+", 2);
      this.subtype = fixes[0];
      this.subtypeFacets = fixes[0].split(".");
      this.suffix = fixes[1];
    } else {
      this.subtypeFacets = subtype.split(".");
    }
  }
};

MediaType.prototype.hasSuffix = function() {
  return !!this.suffix;
};

MediaType.prototype._firstSubtypeFacetEquals = function(str) {
  return this.subtypeFacets.length > 0 && this.subtypeFacets[0] === str;
};

MediaType.prototype.isVendor = function() {
  return this._firstSubtypeFacetEquals("vnd");
};

MediaType.prototype.isPersonal = function() {
  return this._firstSubtypeFacetEquals("prs");
};

MediaType.prototype.isExperimental = function() {
  return this._firstSubtypeFacetEquals("x") || this.subtype.substring(0, 2).toLowerCase() === "x-";
};

MediaType.prototype.asString = function() {
  var str = "";
  if (this.isValid()) {
    str = str + this.type + "/" + this.subtype;
    if (this.hasSuffix()) {
      str = str + "+" + this.suffix;
    }
    var parameterKeys = Object.keys(this.parameters);
    if (parameterKeys.length > 0) {
      var parameters = [];
      var that = this;
      parameterKeys.sort(function(a, b) {
        return a.localeCompare(b);
      }).forEach(function(element) {
        parameters.push(element + "=" + wrapQuotes(that.parameters[element]));
      });
      str = str + ";" + parameters.join(";");
    }
  }
  return str;
};

var wrapQuotes = function(str) {
  return (str.indexOf(";") > -1) ? '"' + str + '"' : str;
};

var unwrapQuotes = function(str) {
  return (str.substr(0, 1) === '"' && str.substr(-1) === '"') ? str.substr(1, str.length - 2) : str;
};

var mediaTypeMatcher = /^(application|audio|font|image|message|model|multipart|text|video|\*)\/([a-zA-Z0-9!#$%^&\*_\-\+{}\|'.`~]{1,127})(;.*)?$/;

var parameterSplitter = /;(?=(?:[^\"]*\"[^\"]*\")*(?![^\"]*\"))/;

exports.fromString = function(str) {
  var mediaType = new MediaType();
  if (str) {
    var match = str.match(mediaTypeMatcher);
    if (match && !(match[1] === '*' && match[2] !== '*')) { 
      mediaType.type = match[1];
      mediaType._setSubtypeAndSuffix(match[2]);
      if (match[3]) {
        match[3].substr(1).split(parameterSplitter).forEach(function(parameter) {
          var keyAndValue = parameter.split('=', 2);
          if (keyAndValue.length === 2) {
            mediaType.parameters[keyAndValue[0].toLowerCase().trim()] = unwrapQuotes(keyAndValue[1].trim());
          }
        });
      }
    }
  }
  return mediaType;
};


/***/ }),

/***/ "./src/fetch.ts":
/*!**********************!*\
  !*** ./src/fetch.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 *
 * @param {*} ipfs
 * @param {*} this.element
 * @returns {ArrayBuffer} content
 */
async function fetch(ipfs, context) {
    /**
     * ipfs.cat
     * https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/FILES.md#ipfscatipfspath-options
     * https://discuss.ipfs.tech/t/how-to-ipfs-dag-get-the-image-in-browser/15938/3
     */
    const content = [];
    for await (const chunk of ipfs.cat(context.cid)) {
        content.push(chunk);
    }
    const blob = new Blob(content, { type: context.mediatype.type });
    return blob;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fetch);


/***/ }),

/***/ "./src/insert/index.ts":
/*!*****************************!*\
  !*** ./src/insert/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _insertAudio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./insertAudio */ "./src/insert/insertAudio.ts");
/* harmony import */ var _insertVideo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./insertVideo */ "./src/insert/insertVideo.ts");
/* harmony import */ var _insertImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./insertImage */ "./src/insert/insertImage.ts");
/* harmony import */ var _insertText__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insertText */ "./src/insert/insertText.ts");




async function insert(element, params, blob) {
    const reader = new FileReader();
    switch (params.mediatype.type.toLowerCase()) {
        case 'text':
            (0,_insertText__WEBPACK_IMPORTED_MODULE_3__["default"])(element, params, blob, reader);
            break;
        case 'image':
            (0,_insertImage__WEBPACK_IMPORTED_MODULE_2__["default"])(element, params, blob, reader);
            break;
        case 'audio':
            (0,_insertAudio__WEBPACK_IMPORTED_MODULE_0__["default"])(element, params, blob, reader);
            break;
        case 'video':
            (0,_insertVideo__WEBPACK_IMPORTED_MODULE_1__["default"])(element, params, blob, reader);
            break;
        default:
            return false;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insert);


/***/ }),

/***/ "./src/insert/insertAudio.ts":
/*!***********************************!*\
  !*** ./src/insert/insertAudio.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertAudio);


/***/ }),

/***/ "./src/insert/insertImage.ts":
/*!***********************************!*\
  !*** ./src/insert/insertImage.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertImage);


/***/ }),

/***/ "./src/insert/insertText.ts":
/*!**********************************!*\
  !*** ./src/insert/insertText.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var media_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! media-type */ "../../node_modules/media-type/lib/mediaType.js");

/**
 *
 * @param {IPFS} ipfs
 */
async function insertText(element, params, blob, reader) {
    const media = media_type__WEBPACK_IMPORTED_MODULE_0__.fromString(element.dataset.mediatype);
    const encord = element.dataset?.encord || null;
    reader.onload = (event) => {
        if (typeof event.target?.result !== 'string')
            return false;
        switch (media.subtype) {
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertText);


/***/ }),

/***/ "./src/insert/insertVideo.ts":
/*!***********************************!*\
  !*** ./src/insert/insertVideo.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (insertVideo);


/***/ }),

/***/ "./src/parse.ts":
/*!**********************!*\
  !*** ./src/parse.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function parse(cid, type, subtype, encord) {
    // let _cid = cid
    // if (typeof cid === 'string') _cid = CID.parse(cid)
    // else _cid = cid
    return {
        cid: cid,
        mediatype: {
            type: type.toLowerCase(),
            subtype: subtype.toLowerCase(),
        },
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (parse);


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   fetch: () => (/* reexport safe */ _fetch__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   insert: () => (/* reexport safe */ _insert__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   parse: () => (/* reexport safe */ _parse__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var media_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! media-type */ "../../node_modules/media-type/lib/mediaType.js");
/* harmony import */ var _parse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse */ "./src/parse.ts");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetch */ "./src/fetch.ts");
/* harmony import */ var _insert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./insert */ "./src/insert/index.ts");
// @ts-ignore




/**
 *
 * @param ipfs IPFS
 * @param options Options
 * @returns
 */
const IPFSTag = async (ipfs, element) => {
    if (element.dataset.cid !== "string")
        return false;
    let cid = element.dataset.cid;
    let type = media_type__WEBPACK_IMPORTED_MODULE_0__.fromString(element.dataset.mediatype).type.toLowerCase();
    let subtype = media_type__WEBPACK_IMPORTED_MODULE_0__.fromString(element.dataset.mediatype).subtype.toLowerCase();
    let encord = element.dataset.encord;
    let params = (0,_parse__WEBPACK_IMPORTED_MODULE_1__["default"])(cid, type, subtype, encord);
    if (!params)
        return false;
    let blob = await (0,_fetch__WEBPACK_IMPORTED_MODULE_2__["default"])(ipfs, params);
    (0,_insert__WEBPACK_IMPORTED_MODULE_3__["default"])(element, params, blob);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IPFSTag);


})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map