(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react-dom"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react-dom", "react"], factory);
	else if(typeof exports === 'object')
		exports["ReactDraggable"] = factory(require("react-dom"), require("react"));
	else
		root["ReactDraggable"] = factory(root["ReactDOM"], root["React"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.matchesSelector = matchesSelector;
exports.matchesSelectorAndParentsTo = matchesSelectorAndParentsTo;
exports.addEvent = addEvent;
exports.removeEvent = removeEvent;
exports.outerHeight = outerHeight;
exports.outerWidth = outerWidth;
exports.innerHeight = innerHeight;
exports.innerWidth = innerWidth;
exports.offsetXYFromParent = offsetXYFromParent;
exports.createCSSTransform = createCSSTransform;
exports.createSVGTransform = createSVGTransform;
exports.getTouch = getTouch;
exports.getTouchIdentifier = getTouchIdentifier;
exports.addUserSelectStyles = addUserSelectStyles;
exports.removeUserSelectStyles = removeUserSelectStyles;
exports.styleHacks = styleHacks;
exports.addClassName = addClassName;
exports.removeClassName = removeClassName;

var _shims = __webpack_require__(2);

var _getPrefix = __webpack_require__(19);

var _getPrefix2 = _interopRequireDefault(_getPrefix);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*:: import type {ControlPosition, MouseTouchEvent } from './types';*/


var matchesSelectorFunc = '';
function matchesSelector(el /*: Node*/, selector /*: string*/) /*: boolean*/ {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = (0, _shims.findInArray)(['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'], function (method) {
      // $FlowIgnore: Doesn't think elements are indexable
      return (0, _shims.isFunction)(el[method]);
    });
  }

  // $FlowIgnore: Doesn't think elements are indexable
  return el[matchesSelectorFunc].call(el, selector);
}

// Works up the tree to the draggable itself attempting to match selector.
function matchesSelectorAndParentsTo(el /*: Node*/, selector /*: string*/, baseNode /*: Node*/) /*: boolean*/ {
  var node = el;
  do {
    if (matchesSelector(node, selector)) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);

  return false;
}

function addEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler);
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = handler;
  }
}

function removeEvent(el /*: ?Node*/, event /*: string*/, handler /*: Function*/) /*: void*/ {
  if (!el) {
    return;
  }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler);
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true);
  } else {
    // $FlowIgnore: Doesn't think elements are indexable
    el['on' + event] = null;
  }
}

function outerHeight(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height += (0, _shims.int)(computedStyle.borderTopWidth);
  height += (0, _shims.int)(computedStyle.borderBottomWidth);
  return height;
}

function outerWidth(node /*: HTMLElement*/) /*: number*/ {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width += (0, _shims.int)(computedStyle.borderLeftWidth);
  width += (0, _shims.int)(computedStyle.borderRightWidth);
  return width;
}
function innerHeight(node /*: HTMLElement*/) /*: number*/ {
  var height = node.clientHeight;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  height -= (0, _shims.int)(computedStyle.paddingTop);
  height -= (0, _shims.int)(computedStyle.paddingBottom);
  return height;
}

function innerWidth(node /*: HTMLElement*/) /*: number*/ {
  var width = node.clientWidth;
  var computedStyle = node.ownerDocument.defaultView.getComputedStyle(node);
  width -= (0, _shims.int)(computedStyle.paddingLeft);
  width -= (0, _shims.int)(computedStyle.paddingRight);
  return width;
}

// Get from offsetParent
function offsetXYFromParent(evt /*: { clientX: number, clientY: number }*/, offsetParent /*: HTMLElement*/) /*: ControlPosition*/ {
  var isBody = offsetParent === offsetParent.ownerDocument.body;
  var offsetParentRect = isBody ? { left: 0, top: 0 } : offsetParent.getBoundingClientRect();

  var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
  var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;

  return { x: x, y: y };
}

function createCSSTransform(_ref) /*: Object*/ {
  var x = _ref.x,
      y = _ref.y,
      degree = _ref.degree;

  // Replace unitless items with px
  var cssStyle = '';
  if (degree) {
    cssStyle = 'translate(' + x + 'px,' + y + 'px) rotate(' + degree + 'deg)';
  } else {
    cssStyle = 'translate(' + x + 'px,' + y + 'px)';
  }
  return _defineProperty({}, (0, _getPrefix.browserPrefixToKey)('transform', _getPrefix2.default), cssStyle);
}

function createSVGTransform(_ref3) /*: string*/ {
  var x = _ref3.x,
      y = _ref3.y;

  return 'translate(' + x + ',' + y + ')';
}

function getTouch(e /*: MouseTouchEvent*/, identifier /*: number*/) /*: ?{ clientX: number, clientY: number }*/ {
  return e.targetTouches && (0, _shims.findInArray)(e.targetTouches, function (t) {
    return identifier === t.identifier;
  }) || e.changedTouches && (0, _shims.findInArray)(e.changedTouches, function (t) {
    return identifier === t.identifier;
  });
}

function getTouchIdentifier(e /*: MouseTouchEvent*/) /*: ?number*/ {
  if (e.targetTouches && e.targetTouches[0]) return e.targetTouches[0].identifier;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].identifier;
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.

// Note we're passing `document` b/c we could be iframed
function addUserSelectStyles(doc /*: Document*/) {
  var styleEl = doc.getElementById('react-draggable-style-el');
  if (!styleEl) {
    styleEl = doc.createElement('style');
    styleEl.type = 'text/css';
    styleEl.id = 'react-draggable-style-el';
    styleEl.innerHTML = '.react-draggable-transparent-selection *::-moz-selection {background: transparent;}\n';
    styleEl.innerHTML += '.react-draggable-transparent-selection *::selection {background: transparent;}\n';
    doc.getElementsByTagName('head')[0].appendChild(styleEl);
  }
  if (doc.body) addClassName(doc.body, 'react-draggable-transparent-selection');
}

function removeUserSelectStyles(doc /*: Document*/) {
  if (doc.body) removeClassName(doc.body, 'react-draggable-transparent-selection');
  try {
    window.getSelection().removeAllRanges(); // remove selection caused by scroll
  } catch (e) {
    // probably IE
  }
}

function styleHacks() /*: Object*/ {
  var childStyle /*: Object*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  return _extends({
    touchAction: 'none'
  }, childStyle);
}

function addClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    if (!el.className.match(new RegExp('(?:^|\\s)' + className + '(?!\\S)'))) {
      el.className += ' ' + className;
    }
  }
}

function removeClassName(el /*: HTMLElement*/, className /*: string*/) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    el.className = el.className.replace(new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'g'), '');
  }
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findInArray = findInArray;
exports.isFunction = isFunction;
exports.isNum = isNum;
exports.int = int;
exports.dontSetMe = dontSetMe;

// @credits https://gist.github.com/rogozhnikoff/a43cfed27c41e4e68cdc
function findInArray(array /*: Array<any> | TouchList*/, callback /*: Function*/) /*: any*/ {
  for (var i = 0, length = array.length; i < length; i++) {
    if (callback.apply(callback, [array[i], i, array])) return array[i];
  }
}

function isFunction(func /*: any*/) /*: boolean*/ {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]';
}

function isNum(num /*: any*/) /*: boolean*/ {
  return typeof num === 'number' && !isNaN(num);
}

function int(a /*: string*/) /*: number*/ {
  return parseInt(a, 10);
}

function dontSetMe(props /*: Object*/, propName /*: string*/, componentName /*: string*/) {
  if (props[propName]) {
    return new Error('Invalid prop ' + propName + ' passed to ' + componentName + ' - do not set this, set it on the child.');
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(14)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(17)();
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(5);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBoundPosition = getBoundPosition;
exports.snapToGrid = snapToGrid;
exports.canDragX = canDragX;
exports.canDragY = canDragY;
exports.getControlPosition = getControlPosition;
exports.createCoreData = createCoreData;
exports.createDraggableData = createDraggableData;

var _shims = __webpack_require__(2);

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*:: import type Draggable from '../Draggable';*/
/*:: import type {Bounds, ControlPosition, DraggableData, MouseTouchEvent} from './types';*/
/*:: import type DraggableCore from '../DraggableCore';*/
function getBoundPosition(draggable /*: Draggable*/, x /*: number*/, y /*: number*/) /*: [number, number]*/ {
  // If no bounds, short-circuit and move on
  if (!draggable.props.bounds) return [x, y];

  // Clone new bounds
  var bounds = draggable.props.bounds;

  bounds = typeof bounds === 'string' ? bounds : cloneBounds(bounds);
  var node = findDOMNode(draggable);

  if (typeof bounds === 'string') {
    var ownerDocument = node.ownerDocument;

    var ownerWindow = ownerDocument.defaultView;
    var boundNode = void 0;
    if (bounds === 'parent') {
      boundNode = node.parentNode;
    } else {
      boundNode = ownerDocument.querySelector(bounds);
    }
    if (!(boundNode instanceof HTMLElement)) {
      throw new Error('Bounds selector "' + bounds + '" could not find an element.');
    }
    var nodeStyle = ownerWindow.getComputedStyle(node);
    var boundNodeStyle = ownerWindow.getComputedStyle(boundNode);
    // Compute bounds. This is a pain with padding and offsets but this gets it exactly right.
    bounds = {
      left: -node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingLeft) + (0, _shims.int)(nodeStyle.marginLeft),
      top: -node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingTop) + (0, _shims.int)(nodeStyle.marginTop),
      right: (0, _domFns.innerWidth)(boundNode) - (0, _domFns.outerWidth)(node) - node.offsetLeft + (0, _shims.int)(boundNodeStyle.paddingRight) - (0, _shims.int)(nodeStyle.marginRight),
      bottom: (0, _domFns.innerHeight)(boundNode) - (0, _domFns.outerHeight)(node) - node.offsetTop + (0, _shims.int)(boundNodeStyle.paddingBottom) - (0, _shims.int)(nodeStyle.marginBottom)
    };
  }

  // Keep x and y below right and bottom limits...
  if ((0, _shims.isNum)(bounds.right)) x = Math.min(x, bounds.right);
  if ((0, _shims.isNum)(bounds.bottom)) y = Math.min(y, bounds.bottom);

  // But above left and top limits.
  if ((0, _shims.isNum)(bounds.left)) x = Math.max(x, bounds.left);
  if ((0, _shims.isNum)(bounds.top)) y = Math.max(y, bounds.top);

  return [x, y];
}

function snapToGrid(grid /*: [number, number]*/, pendingX /*: number*/, pendingY /*: number*/) /*: [number, number]*/ {
  var x = Math.round(pendingX / grid[0]) * grid[0];
  var y = Math.round(pendingY / grid[1]) * grid[1];
  return [x, y];
}

function canDragX(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'x';
}

function canDragY(draggable /*: Draggable*/) /*: boolean*/ {
  return draggable.props.axis === 'both' || draggable.props.axis === 'y';
}

// Get {x, y} positions from event.
function getControlPosition(e /*: MouseTouchEvent*/, touchIdentifier /*: ?number*/, draggableCore /*: DraggableCore*/) /*: ?ControlPosition*/ {
  var touchObj = typeof touchIdentifier === 'number' ? (0, _domFns.getTouch)(e, touchIdentifier) : null;
  if (typeof touchIdentifier === 'number' && !touchObj) return null; // not the right touch
  var node = findDOMNode(draggableCore);
  // User can provide an offsetParent if desired.
  var offsetParent = draggableCore.props.offsetParent || node.offsetParent || node.ownerDocument.body;
  return (0, _domFns.offsetXYFromParent)(touchObj || e, offsetParent);
}

// Create an data object exposed by <DraggableCore>'s events
function createCoreData(draggable /*: DraggableCore*/, x /*: number*/, y /*: number*/) /*: DraggableData*/ {
  var state = draggable.state;
  var isStart = !(0, _shims.isNum)(state.lastX);
  var node = findDOMNode(draggable);

  if (isStart) {
    // If this is our first move, use the x and y as last coords.
    return {
      node: node,
      deltaX: 0, deltaY: 0,
      lastX: x, lastY: y,
      x: x, y: y
    };
  } else {
    // Otherwise calculate proper values.
    return {
      node: node,
      deltaX: x - state.lastX, deltaY: y - state.lastY,
      lastX: state.lastX, lastY: state.lastY,
      x: x, y: y
    };
  }
}

// Create an data exposed by <Draggable>'s events
function createDraggableData(draggable /*: Draggable*/, coreData /*: DraggableData*/) /*: DraggableData*/ {
  return {
    node: coreData.node,
    x: draggable.state.x + coreData.deltaX,
    y: draggable.state.y + coreData.deltaY,
    deltaX: coreData.deltaX,
    deltaY: coreData.deltaY,
    lastX: draggable.state.x,
    lastY: draggable.state.y
  };
}

// A lot faster than stringify/parse
function cloneBounds(bounds /*: Bounds*/) /*: Bounds*/ {
  return {
    left: bounds.left,
    top: bounds.top,
    right: bounds.right,
    bottom: bounds.bottom
  };
}

function findDOMNode(draggable /*: Draggable | DraggableCore*/) /*: HTMLElement*/ {
  var node = _reactDom2.default.findDOMNode(draggable);
  if (!node) {
    throw new Error('<DraggableCore>: Unmounted during event!');
  }
  // $FlowIgnore we can't assert on HTMLElement due to tests... FIXME
  return node;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(1);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(2);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*:: import type { EventHandler, MouseTouchEvent } from './utils/types';*/


// Simple abstraction for dragging events names.
/*:: import type { Element as ReactElement } from 'react';*/
var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

// Default to mouse events.
var dragEventFor = eventsFor.mouse;

/*:: type DraggableCoreState = {
  dragging: boolean,
  lastX: number,
  lastY: number,
  touchIdentifier: ?number
};*/
/*:: export type DraggableBounds = {
  left: number,
  right: number,
  top: number,
  bottom: number,
};*/
/*:: export type DraggableData = {
  node: HTMLElement,
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number,
};*/
/*:: export type DraggableEventHandler = (e: MouseEvent, data: DraggableData) => void;*/
/*:: export type ControlPosition = { x: number, y: number };*/


//
// Define <DraggableCore>.
//
// <DraggableCore> is for advanced usage of <Draggable>. It maintains minimal internal state so it can
// work well with libraries that require more control over the element.
//

/*:: export type DraggableCoreProps = {
  allowAnyClick: boolean,
  cancel: string,
  children: ReactElement<any>,
  disabled: boolean,
  enableUserSelectHack: boolean,
  offsetParent: HTMLElement,
  grid: [number, number],
  handle: string,
  onStart: DraggableEventHandler,
  onDrag: DraggableEventHandler,
  onStop: DraggableEventHandler,
  onMouseDown: (e: MouseEvent) => void,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
};*/

var DraggableCore = function (_React$Component) {
  _inherits(DraggableCore, _React$Component);

  function DraggableCore() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DraggableCore);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DraggableCore.__proto__ || Object.getPrototypeOf(DraggableCore)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dragging: false,
      // Used while dragging to determine deltas.
      lastX: NaN, lastY: NaN,
      touchIdentifier: null
    }, _this.handleDragStart = function (e) {
      // Make it possible to attach event handlers on top of this one.   
      _this.props.onMouseDown(e);

      // Only accept left-clicks.
      if (!_this.props.allowAnyClick && typeof e.button === 'number' && e.button !== 0) return false;

      // Get nodes. Be sure to grab relative document (could be iframed)
      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (!thisNode || !thisNode.ownerDocument || !thisNode.ownerDocument.body) {
        throw new Error('<DraggableCore> not mounted on DragStart!');
      }
      var ownerDocument = thisNode.ownerDocument;

      // Short circuit if handle or cancel prop was provided and selector doesn't match.

      if (_this.props.disabled || !(e.target instanceof ownerDocument.defaultView.Node) || _this.props.handle && !(0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.handle, thisNode) || _this.props.cancel && (0, _domFns.matchesSelectorAndParentsTo)(e.target, _this.props.cancel, thisNode)) {
        return;
      }

      // Set touch identifier in component state if this is a touch event. This allows us to
      // distinguish between individual touches on multitouch screens by identifying which
      // touchpoint was set to this element.
      var touchIdentifier = (0, _domFns.getTouchIdentifier)(e);
      _this.setState({ touchIdentifier: touchIdentifier });

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, touchIdentifier, _this);
      if (position == null) return; // not possible but satisfies flow
      var x = position.x,
          y = position.y;

      // Create an event object with all the data parents need to make a decision here.

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      // log('DraggableCore: handleDragStart: %j', coreEvent);

      // Call event handler. If it returns explicit false, cancel.
      (0, _log2.default)('calling', _this.props.onStart);
      var shouldUpdate = _this.props.onStart(e, coreEvent);
      if (shouldUpdate === false) return;

      // Add a style to the body to disable user-select. This prevents text from
      // being selected all over the page.
      if (_this.props.enableUserSelectHack) (0, _domFns.addUserSelectStyles)(ownerDocument);

      // Initiate dragging. Set the current x and y as offsets
      // so we know how much we've moved during the drag. This allows us
      // to drag elements around even if they have been moved, without issue.
      _this.setState({
        dragging: true,

        lastX: x,
        lastY: y
      });

      // Add events to the document directly so we catch when the user's mouse/touch moves outside of
      // this element. We use different events depending on whether or not we have detected that this
      // is a touch-capable device.
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.move, _this.handleDrag);
      (0, _domFns.addEvent)(ownerDocument, dragEventFor.stop, _this.handleDragStop);
    }, _this.handleDrag = function (e) {

      // Prevent scrolling on mobile devices, like ipad/iphone.
      if (e.type === 'touchmove') e.preventDefault();

      // Get the current drag point from the event. This is used as the offset.
      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      // Snap to grid if prop has been provided

      if (Array.isArray(_this.props.grid)) {
        var _deltaX = x - _this.state.lastX,
            _deltaY = y - _this.state.lastY;

        var _snapToGrid = (0, _positionFns.snapToGrid)(_this.props.grid, _deltaX, _deltaY);

        var _snapToGrid2 = _slicedToArray(_snapToGrid, 2);

        _deltaX = _snapToGrid2[0];
        _deltaY = _snapToGrid2[1];

        if (!_deltaX && !_deltaY) return; // skip useless drag
        x = _this.state.lastX + _deltaX, y = _this.state.lastY + _deltaY;
      }

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      // log('DraggableCore: handleDrag: %j', coreEvent);

      // Call event handler. If it returns explicit false, trigger end.
      var shouldUpdate = _this.props.onDrag(e, coreEvent);
      if (shouldUpdate === false) {
        try {
          // $FlowIgnore
          _this.handleDragStop(new MouseEvent('mouseup'));
        } catch (err) {
          // Old browsers
          var event = ((document.createEvent('MouseEvents') /*: any*/) /*: MouseTouchEvent*/);
          // I see why this insanity was deprecated
          // $FlowIgnore
          event.initMouseEvent('mouseup', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          _this.handleDragStop(event);
        }
        return;
      }

      _this.setState({
        lastX: x,
        lastY: y
      });
    }, _this.handleDragStop = function (e) {
      if (!_this.state.dragging) return;

      var position = (0, _positionFns.getControlPosition)(e, _this.state.touchIdentifier, _this);
      if (position == null) return;
      var x = position.x,
          y = position.y;

      var coreEvent = (0, _positionFns.createCoreData)(_this, x, y);

      var thisNode = _reactDom2.default.findDOMNode(_this);
      if (thisNode) {
        // Remove user-select hack
        if (_this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(thisNode.ownerDocument);
      }

      // log('DraggableCore: handleDragStop: %j', coreEvent);

      // Reset the el.
      _this.setState({
        dragging: false,
        lastX: NaN,
        lastY: NaN
      });

      // Call event handler
      _this.props.onStop(e, coreEvent);

      if (thisNode) {
        // Remove event handlers
        // log('DraggableCore: Removing handlers');
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.move, _this.handleDrag);
        (0, _domFns.removeEvent)(thisNode.ownerDocument, dragEventFor.stop, _this.handleDragStop);
      }
    }, _this.onMouseDown = function (e) {
      dragEventFor = eventsFor.mouse; // on touchscreen laptops we could switch back to mouse

      return _this.handleDragStart(e);
    }, _this.onMouseUp = function (e) {
      dragEventFor = eventsFor.mouse;

      return _this.handleDragStop(e);
    }, _this.onTouchStart = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStart(e);
    }, _this.onTouchEnd = function (e) {
      // We're on a touch device now, so change the event handlers
      dragEventFor = eventsFor.touch;

      return _this.handleDragStop(e);
    }, _this.onKeyUp = function (e) {
      _this.props.onKeyUp(e);
    }, _this.onKeyDown = function (e) {
      _this.props.onKeyDown(e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DraggableCore, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      // Remove any leftover event handlers. Remove both touch and mouse handlers in case
      // some browser quirk caused a touch event to fire during a mouse move, or vice versa.
      var thisNode = _reactDom2.default.findDOMNode(this);
      if (thisNode) {
        var ownerDocument = thisNode.ownerDocument;

        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.move, this.handleDrag);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.mouse.stop, this.handleDragStop);
        (0, _domFns.removeEvent)(ownerDocument, eventsFor.touch.stop, this.handleDragStop);
        if (this.props.enableUserSelectHack) (0, _domFns.removeUserSelectStyles)(ownerDocument);
      }
    }

    // Same as onMouseDown (start drag), but now consider this a touch device.

  }, {
    key: 'render',
    value: function render() {
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
        style: (0, _domFns.styleHacks)(this.props.children.props.style),

        // Note: mouseMove handler is attached to document so it will still function
        // when the user drags quickly and leaves the bounds of the element.
        onMouseDown: this.onMouseDown,
        onTouchStart: this.onTouchStart,
        onMouseUp: this.onMouseUp,
        onTouchEnd: this.onTouchEnd,
        onKeyUp: this.onKeyUp,
        onKeyDown: this.onKeyDown
      });
    }
  }]);

  return DraggableCore;
}(_react2.default.Component);

DraggableCore.displayName = 'DraggableCore';
DraggableCore.propTypes = {
  /**
   * `allowAnyClick` allows dragging using any mouse button.
   * By default, we only accept the left button.
   *
   * Defaults to `false`.
   */
  allowAnyClick: _propTypes2.default.bool,

  /**
   * `disabled`, if true, stops the <Draggable> from dragging. All handlers,
   * with the exception of `onMouseDown`, will not fire.
   */
  disabled: _propTypes2.default.bool,

  /**
   * By default, we add 'user-select:none' attributes to the document body
   * to prevent ugly text selection during drag. If this is causing problems
   * for your app, set this to `false`.
   */
  enableUserSelectHack: _propTypes2.default.bool,

  /**
   * `offsetParent`, if set, uses the passed DOM node to compute drag offsets
   * instead of using the parent node.
   */
  offsetParent: function offsetParent(props, propName) {
    if (process.browser === true && props[propName] && props[propName].nodeType !== 1) {
      throw new Error('Draggable\'s offsetParent must be a DOM Node.');
    }
  },

  /**
   * `grid` specifies the x and y that dragging should snap to.
   */
  grid: _propTypes2.default.arrayOf(_propTypes2.default.number),

  /**
   * `handle` specifies a selector to be used as the handle that initiates drag.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable handle=".handle">
   *              <div>
   *                  <div className="handle">Click me to drag</div>
   *                  <div>This is some other content</div>
   *              </div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  handle: _propTypes2.default.string,

  /**
   * `cancel` specifies a selector to be used to prevent drag initialization.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *           return(
   *               <Draggable cancel=".cancel">
   *                   <div>
   *                     <div className="cancel">You can't drag from here</div>
   *                     <div>Dragging here works fine</div>
   *                   </div>
   *               </Draggable>
   *           );
   *       }
   *   });
   * ```
   */
  cancel: _propTypes2.default.string,

  /**
   * Called when dragging starts.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onStart: _propTypes2.default.func,

  /**
   * Called while dragging.
   * If this function returns the boolean false, dragging will be canceled.
   */
  onDrag: _propTypes2.default.func,

  /**
   * Called when dragging stops.
   * If this function returns the boolean false, the drag will remain active.
   */
  onStop: _propTypes2.default.func,

  /**
   * A workaround option which can be passed if onMouseDown needs to be accessed,
   * since it'll always be blocked (as there is internal use of onMouseDown)
   */
  onMouseDown: _propTypes2.default.func,
  onKeyUp: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe
};
DraggableCore.defaultProps = {
  allowAnyClick: false, // by default only accept left click
  cancel: null,
  disabled: false,
  enableUserSelectHack: true,
  offsetParent: null,
  handle: null,
  grid: null,
  transform: null,
  onStart: function onStart() {},
  onDrag: function onDrag() {},
  onStop: function onStop() {},
  onMouseDown: function onMouseDown() {},
  onKeyUp: function onKeyUp() {},
  onKeyDown: function onKeyDown() {}
};
exports.default = DraggableCore;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(20)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = log;

/*eslint no-console:0*/
function log() {
  var _console;

  if (true) (_console = console).log.apply(_console, arguments);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Draggable = __webpack_require__(13).default;

// Previous versions of this lib exported <Draggable> as the root export. As to not break
// them, or TypeScript, we export *both* as the root and as 'default'.
// See https://github.com/mzabriskie/react-draggable/pull/254
// and https://github.com/mzabriskie/react-draggable/issues/266
module.exports = Draggable;
module.exports.default = Draggable;
module.exports.DraggableCore = __webpack_require__(10).default;
module.exports.DraggableAlignGuide = __webpack_require__(21).default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = __webpack_require__(18);

var _classnames2 = _interopRequireDefault(_classnames);

var _domFns = __webpack_require__(1);

var _positionFns = __webpack_require__(9);

var _shims = __webpack_require__(2);

var _DraggableCore = __webpack_require__(10);

var _DraggableCore2 = _interopRequireDefault(_DraggableCore);

var _log = __webpack_require__(11);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*:: import type { ControlPosition, DraggableBounds, DraggableCoreProps } from './DraggableCore';*/
/*:: import type { DraggableEventHandler } from './utils/types';*/
/*:: import type { Element as ReactElement } from 'react';*/
/*:: type DraggableState = {
  dragging: boolean,
  dragged: boolean,
  x: number, y: number,
  slackX: number, slackY: number,
  isElementSVG: boolean,
  focused: boolean,
};*/


//
// Define <Draggable>
//

/*:: export type DraggableProps = {
  ...$Exact<DraggableCoreProps>,
  axis: 'both' | 'x' | 'y' | 'none',
  bounds: DraggableBounds | string | false,
  defaultClassName: string,
  defaultClassNameDragging: string,
  defaultClassNameDragged: string,
  defaultClassNameFocused: string,
  defaultPosition: ControlPosition,
  position: ControlPosition,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyMove: PropTypes.func,
  keyMoveEnabled: boolean,
  keyMoveSpeed: number,
  degree: number,
};*/

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable(props /*: DraggableProps*/) {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

    _this.autoStepTimer = null;

    _this.onDragStart = function (e, coreData) {
      // log('Draggable: onDragStart: %j', coreData);

      // Short-circuit if user's callback killed it.
      var shouldStart = _this.props.onStart(e, (0, _positionFns.createDraggableData)(_this, coreData));
      // Kills start event on core as well, so move handlers are never bound.
      if (shouldStart === false) return false;

      _this.setState({ dragging: true, dragged: true });
    };

    _this.onDrag = function (e, coreData) {
      if (!_this.state.dragging) return false;
      // log('Draggable: onDrag: %j', coreData);
      var uiData = (0, _positionFns.createDraggableData)(_this, coreData);
      var newState /*: $Shape<DraggableState>*/ = {
        x: uiData.x,
        y: uiData.y
      };

      // Keep within bounds.
      if (_this.props.bounds) {
        // Save original x and y.
        var _x2 = newState.x,
            _y2 = newState.y;

        // Add slack to the values used to calculate bound position. This will ensure that if
        // we start removing slack, the element won't react to it right away until it's been
        // completely removed.

        newState.x += _this.state.slackX;
        newState.y += _this.state.slackY;

        // Get bound position. This will ceil/floor the x and y within the boundaries.

        var _getBoundPosition = (0, _positionFns.getBoundPosition)(_this, newState.x, newState.y),
            _getBoundPosition2 = _slicedToArray(_getBoundPosition, 2),
            newStateX = _getBoundPosition2[0],
            newStateY = _getBoundPosition2[1];

        newState.x = newStateX;
        newState.y = newStateY;

        // Recalculate slack by noting how much was shaved by the boundPosition handler.
        newState.slackX = _this.state.slackX + (_x2 - newState.x);
        newState.slackY = _this.state.slackY + (_y2 - newState.y);

        // Update the event we fire to reflect what really happened after bounds took effect.
        uiData.x = newState.x;
        uiData.y = newState.y;
        uiData.deltaX = newState.x - _this.state.x;
        uiData.deltaY = newState.y - _this.state.y;
      }

      // Short-circuit if user's callback killed it.
      var shouldUpdate = _this.props.onDrag(e, uiData);
      if (shouldUpdate === false) return false;

      // log('onDrag newState', newState)
      _this.setState(newState);
    };

    _this.onDragStop = function (e, coreData) {
      if (!_this.state.dragging) return false;

      // Short-circuit if user's callback killed it.
      var shouldStop = _this.props.onStop(e, (0, _positionFns.createDraggableData)(_this, coreData));
      if (shouldStop === false) return false;

      // log('Draggable: onDragStop: %j', coreData);

      var newState /*: $Shape<DraggableState>*/ = {
        dragging: false,
        slackX: 0,
        slackY: 0
      };

      // If this is a controlled component, the result of this operation will be to
      // revert back to the old position. We expect a handler on `onDragStop`, at the least.
      var controlled = Boolean(_this.props.position);
      if (controlled) {
        var _this$props$position = _this.props.position,
            _x3 = _this$props$position.x,
            _y3 = _this$props$position.y;

        newState.x = _x3;
        newState.y = _y3;
      }
      (0, _log2.default)('onDragStop newState', newState);
      _this.setState(newState);
    };

    _this.stopMove = function () {
      if (_this.autoStepTimer) {
        clearTimeout(_this.autoStepTimer);
      }
    };

    _this.onKeyMove = function (e) {
      _this.stopMove();
      if (e && (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40)) {
        if (e.persist) {
          e.persist();
        }
        e.preventDefault();
        var _this$state = _this.state,
            _x4 = _this$state.x,
            _y4 = _this$state.y;

        var _x = _x4;
        var _y = _y4;
        // log('onKeyUp', e.keyCode)
        // log('onKeyUp', e.keyCode, this.state)
        switch (e.keyCode) {
          // 左
          case 37:
            _x -= 1;
            break;
          // 上
          case 38:
            _y -= 1;
            break;
          // 右
          case 39:
            _x += 1;
            break;
          // 下
          case 40:
            _y += 1;
            break;
          default:
            break;
        }
        var _position = { x: _x, y: _y };
        _this.setState(_position);
        if (_this.props.onKeyMove) {
          _this.props.onKeyMove(e, _position);
        }
        _this.autoStepTimer = setTimeout(function () {
          _this.onKeyMove(e);
        }, _this.props.keyMoveSpeed);
      }
    };

    _this.onKeyUp = function (e) {
      if (_this.props.keyMoveEnabled && !_this.props.disabled) {
        // this.onKeyMove(e)
        _this.stopMove();
      }

      _this.props.onKeyUp(e);
    };

    _this.onKeyDown = function (e) {
      if (_this.props.keyMoveEnabled && !_this.props.disabled) {
        _this.onKeyMove(e);
        _this.stopMove();
      }

      _this.props.onKeyDown(e);
    };

    _this.moveSnaping = function () {
      var snap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var xDistance = snap.xDistance,
          yDistance = snap.yDistance,
          snapTreshhold = snap.snapTreshhold;


      (0, _log2.default)('x,y', xDistance, yDistance);

      if (xDistance && Math.abs(xDistance) <= snapTreshhold) {
        _this.setState({ x: _this.state.x + xDistance });
      }

      if (yDistance && Math.abs(yDistance) <= snapTreshhold) {
        _this.setState({ y: _this.state.y + yDistance });
      }
    };

    _this.state = {
      // Whether or not we are currently dragging.
      dragging: false,

      // Whether or not we have been dragged before.
      dragged: false,

      // Current transform x and y.
      x: props.position ? props.position.x : props.defaultPosition.x,
      y: props.position ? props.position.y : props.defaultPosition.y,

      // Used for compensating for out-of-bounds drags
      slackX: 0, slackY: 0,

      // Can only determine if SVG after mounting
      isElementSVG: false,

      focused: false
    };
    return _this;
  }

  _createClass(Draggable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (this.props.position && !(this.props.onDrag || this.props.onStop)) {
        // eslint-disable-next-line
        console.warn('A `position` was applied to this <Draggable>, without drag handlers. This will make this ' + 'component effectively undraggable. Please attach `onDrag` or `onStop` handlers so you can adjust the ' + '`position` of this element.');
      }
      this.stopMove();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Check to see if the element passed is an instanceof SVGElement
      if (typeof window.SVGElement !== 'undefined' && _reactDom2.default.findDOMNode(this) instanceof window.SVGElement) {
        this.setState({ isElementSVG: true });
      }
      this.stopMove();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps /*: Object*/) {
      // Set x/y if position has changed
      if (nextProps.position && (!this.props.position || nextProps.position.x !== this.props.position.x || nextProps.position.y !== this.props.position.y)) {
        this.setState({ x: nextProps.position.x, y: nextProps.position.y });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ dragging: false }); // prevents invariant if unmounted while dragging
    }
  }, {
    key: 'render',
    value: function render() /*: ReactElement<any>*/ {
      var _classNames,
          _this2 = this;

      var style = {},
          svgTransform = null;

      // If this is controlled, we don't want to move it - unless it's dragging.
      var transformOpts = this.positionRotate;
      // log('render transformOpts', transformOpts);
      // If this element was SVG, we use the `transform` attribute.
      if (this.state.isElementSVG) {
        svgTransform = (0, _domFns.createSVGTransform)(transformOpts);
      } else {
        // Add a CSS transform to move the element around. This allows us to move the element around
        // without worrying about whether or not it is relatively or absolutely positioned.
        // If the item you are dragging already has a transform set, wrap it in a <span> so <Draggable>
        // has a clean slate.
        style = (0, _domFns.createCSSTransform)(transformOpts);
      }

      var _props = this.props,
          defaultClassName = _props.defaultClassName,
          defaultClassNameDragging = _props.defaultClassNameDragging,
          defaultClassNameDragged = _props.defaultClassNameDragged,
          defaultClassNameFocused = _props.defaultClassNameFocused;

      // Mark with class while dragging

      var className = (0, _classnames2.default)(this.props.children.props.className || '', defaultClassName, (_classNames = {}, _defineProperty(_classNames, defaultClassNameDragging, this.state.dragging), _defineProperty(_classNames, defaultClassNameDragged, this.state.dragged), _defineProperty(_classNames, defaultClassNameFocused, this.state.focused), _classNames));

      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)
      return _react2.default.createElement(
        _DraggableCore2.default,
        _extends({ ref: function ref(e) {
            _this2.draggableCore = e;
          } }, this.props, { onStart: this.onDragStart, onDrag: this.onDrag, onStop: this.onDragStop, onKeyUp: this.onKeyUp, onKeyDown: this.onKeyDown }),
        _react2.default.cloneElement(_react2.default.Children.only(this.props.children), {
          className: className,
          style: _extends({}, this.props.children.props.style, style),
          transform: svgTransform,
          tabIndex: -1
        })
      );
    }
  }, {
    key: 'positionRotate',
    get: function get() /*: any*/ {
      var controlled = Boolean(this.props.position);
      var draggable = !controlled || this.state.dragging;
      var position = this.props.position || this.props.defaultPosition;
      return {
        x: (0, _positionFns.canDragX)(this) && draggable ? this.state.x : position.x,

        // Set top if vertical drag is enabled
        y: (0, _positionFns.canDragY)(this) && draggable ? this.state.y : position.y,
        degree: Number(this.props.degree) || 0
      };
    }
  }]);

  return Draggable;
}(_react2.default.Component);

Draggable.displayName = 'Draggable';
Draggable.propTypes = _extends({}, _DraggableCore2.default.propTypes, {

  /**
   * `axis` determines which axis the draggable can move.
   *
   *  Note that all callbacks will still return data as normal. This only
   *  controls flushing to the DOM.
   *
   * 'both' allows movement horizontally and vertically.
   * 'x' limits movement to horizontal axis.
   * 'y' limits movement to vertical axis.
   * 'none' limits all movement.
   *
   * Defaults to 'both'.
   */
  axis: _propTypes2.default.oneOf(['both', 'x', 'y', 'none']),

  /**
   * `bounds` determines the range of movement available to the element.
   * Available values are:
   *
   * 'parent' restricts movement within the Draggable's parent node.
   *
   * Alternatively, pass an object with the following properties, all of which are optional:
   *
   * {left: LEFT_BOUND, right: RIGHT_BOUND, bottom: BOTTOM_BOUND, top: TOP_BOUND}
   *
   * All values are in px.
   *
   * Example:
   *
   * ```jsx
   *   let App = React.createClass({
   *       render: function () {
   *         return (
   *            <Draggable bounds={{right: 300, bottom: 300}}>
   *              <div>Content</div>
   *           </Draggable>
   *         );
   *       }
   *   });
   * ```
   */
  bounds: _propTypes2.default.oneOfType([_propTypes2.default.shape({
    left: _propTypes2.default.number,
    right: _propTypes2.default.number,
    top: _propTypes2.default.number,
    bottom: _propTypes2.default.number
  }), _propTypes2.default.string, _propTypes2.default.oneOf([false])]),

  defaultClassName: _propTypes2.default.string,
  defaultClassNameDragging: _propTypes2.default.string,
  defaultClassNameDragged: _propTypes2.default.string,

  /**
   * `defaultPosition` specifies the x and y that the dragged item should start at
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable defaultPosition={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  defaultPosition: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),

  /**
   * `position`, if present, defines the current position of the element.
   *
   *  This is similar to how form elements in React work - if no `position` is supplied, the component
   *  is uncontrolled.
   *
   * Example:
   *
   * ```jsx
   *      let App = React.createClass({
   *          render: function () {
   *              return (
   *                  <Draggable position={{x: 25, y: 25}}>
   *                      <div>I start with transformX: 25px and transformY: 25px;</div>
   *                  </Draggable>
   *              );
   *          }
   *      });
   * ```
   */
  position: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),

  /**
   * These properties should be defined on the child, not here.
   */
  className: _shims.dontSetMe,
  style: _shims.dontSetMe,
  transform: _shims.dontSetMe,
  onKeyUp: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onKeyMove: _propTypes2.default.func,
  keyMoveEnabled: _propTypes2.default.bool,
  keyMoveSpeed: _propTypes2.default.number
});
Draggable.defaultProps = _extends({}, _DraggableCore2.default.defaultProps, {
  axis: 'both',
  bounds: false,
  defaultClassName: 'react-draggable',
  defaultClassNameDragging: 'react-draggable-dragging',
  defaultClassNameDragged: 'react-draggable-dragged',
  defaultClassNameFocused: 'react-draggable-focused',
  defaultPosition: { x: 0, y: 0 },
  position: null,
  onKeyUp: function onKeyUp() {},
  onKeyDown: function onKeyDown() {},
  onKeyMove: function onKeyMove() {},
  keyMoveEnabled: true,
  keyMoveSpeed: 250
});
exports.default = Draggable;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(5);
var invariant = __webpack_require__(6);
var warning = __webpack_require__(8);
var assign = __webpack_require__(15);

var ReactPropTypesSecret = __webpack_require__(7);
var checkPropTypes = __webpack_require__(16);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
  var invariant = __webpack_require__(6);
  var warning = __webpack_require__(8);
  var ReactPropTypesSecret = __webpack_require__(7);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (Object({"DRAGGABLE_DEBUG":true}).NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(5);
var invariant = __webpack_require__(6);
var ReactPropTypesSecret = __webpack_require__(7);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrefix = getPrefix;
exports.browserPrefixToKey = browserPrefixToKey;
exports.browserPrefixToStyle = browserPrefixToStyle;
var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
function getPrefix() /*: string*/ {
  var prop /*: string*/ = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'transform';

  // Checking specifically for 'window.document' is for pseudo-browser server-side
  // environments that define 'window' as the global context.
  // E.g. React-rails (see https://github.com/reactjs/react-rails/pull/84)
  if (typeof window === 'undefined' || typeof window.document === 'undefined') return '';

  var style = window.document.documentElement.style;

  if (prop in style) return '';

  for (var i = 0; i < prefixes.length; i++) {
    if (browserPrefixToKey(prop, prefixes[i]) in style) return prefixes[i];
  }

  return '';
}

function browserPrefixToKey(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '' + prefix + kebabToTitleCase(prop) : prop;
}

function browserPrefixToStyle(prop /*: string*/, prefix /*: string*/) /*: string*/ {
  return prefix ? '-' + prefix.toLowerCase() + '-' + prop : prop;
}

function kebabToTitleCase(str /*: string*/) /*: string*/ {
  var out = '';
  var shouldCapitalize = true;
  for (var i = 0; i < str.length; i++) {
    if (shouldCapitalize) {
      out += str[i].toUpperCase();
      shouldCapitalize = false;
    } else if (str[i] === '-') {
      shouldCapitalize = true;
    } else {
      out += str[i];
    }
  }
  return out;
}

// Default export is the prefix itself, like 'Moz', 'Webkit', etc
// Note that you may have to re-test for certain things; for instance, Chrome 50
// can handle unprefixed `transform`, but not unprefixed `user-select`
exports.default = getPrefix();

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(4);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = __webpack_require__(0);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domFns = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var eventsFor = {
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  },
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  }
};

var remove = function remove(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

var removeEntry = function removeEntry(array, entry) {
  var index = array.indexOf(entry);
  if (index !== -1) remove(array, index);
};

var getTarget = function getTarget(event) {
  return event.currentTarget || event.target || event.srcElement;
};

var DraggableAlignGuide = function (_React$Component) {
  _inherits(DraggableAlignGuide, _React$Component);

  function DraggableAlignGuide(props) {
    _classCallCheck(this, DraggableAlignGuide);

    var _this = _possibleConstructorReturn(this, (DraggableAlignGuide.__proto__ || Object.getPrototypeOf(DraggableAlignGuide)).call(this, props));

    _this.edges = null;
    _this.staticGuides = null;
    _this.x = 0;
    _this.y = 0;
    _this.mouseOffsetX = 0;
    _this.mouseOffsetY = 0;

    _this.drag = function (event) {
      var box = getTarget(event);
      var rect = box.getBoundingClientRect();
      // console.log('box drag', event)
      var parentRect = _this.clientRect;
      _this.x = event.pageX - parentRect.left - _this.mouseOffsetX;
      // this.x = event.pageX - parentRect.left - (event.pageX - rect.left);
      _this.y = event.pageY - parentRect.top - _this.mouseOffsetY;
      // console.log('getBoundingClientRect', event.pageX, parentRect.left, this.mouseOffsetX, this.x)
      _this.snapToGuides({ box: box, parentRect: parentRect });
    };

    _this.stopToDrag = function (event) {
      var box = getTarget(event);
      // console.log('box stopToDrag', event)
      _this.lockedAxis = null;
      _this.chart();
      _this.removeGuides();
      (0, _domFns.removeEvent)(box, eventsFor.mouse.move, _this.drag);
      (0, _domFns.removeEvent)(box, eventsFor.mouse.stop, _this.stopToDrag);
    };

    _this.state = {
      boxes: [],
      snapTreshhold: props.snapTreshhold || 5,
      minimumDistance: 10,
      offset: null,
      staticGuides: null,
      axis: []
    };
    return _this;
  }

  _createClass(DraggableAlignGuide, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.resetStaticGuides();

      this.chart();
    }
  }, {
    key: 'chart',
    value: function chart() {
      var _this2 = this;

      this.resetEdges();
      // this.distances = new Object();
      var boxes = this.boxes;
      var parentRect = this.clientRect;
      if (boxes && boxes.length) {
        for (var key in boxes) {
          if (boxes.hasOwnProperty(key)) {
            (function () {
              var box = boxes[key];

              var _box$getBoundingClien = box.getBoundingClientRect(),
                  x = _box$getBoundingClien.x,
                  y = _box$getBoundingClien.y,
                  width = _box$getBoundingClien.width,
                  height = _box$getBoundingClien.height;

              var interestPoints = _this2.getInterestPoints({
                x: x - parentRect.x,
                y: y - parentRect.y,
                width: width,
                height: height,
                right: x - parentRect.x + width,
                bottom: y - parentRect.y + height
              });
              _this2.edges.x.push.apply(_this2.edges.x, interestPoints.x);
              _this2.edges.y.push.apply(_this2.edges.y, interestPoints.y);

              var guide = box.getAttribute('data-guide');
              if (!guide) {
                box.setAttribute('data-guide', true);

                (0, _domFns.addEvent)(box, eventsFor.mouse.start, function (e) {
                  _this2.startToDrag(e, box);
                });
              }
            })();
          }
        }
      }

      this.showAllGuides();
    }
  }, {
    key: 'startToDrag',
    value: function startToDrag(event, box) {
      // event.stopPropagation();
      var parentRect = this.clientRect;
      var rect = box.getBoundingClientRect();
      var _startX = rect.x - parentRect.x;
      var _startY = rect.y - parentRect.y;
      this.mouseOffsetX = event.pageX - rect.left;
      this.mouseOffsetY = event.pageY - rect.top;
      // console.log('box startToDrag getBoundingClientRect', rect, this.mouseOffsetX)
      // console.log('distance - position', event.pageX, this.mouseOffsetX);

      this.excludeBoxformEdges({
        x: _startX,
        y: _startY,
        width: rect.width,
        height: rect.height
      });
      // this.excludeBoxFromDistances();
      this.showAllGuides();

      this.drag(event);

      (0, _domFns.addEvent)(box, eventsFor.mouse.move, this.drag);
      (0, _domFns.addEvent)(box, eventsFor.mouse.stop, this.stopToDrag);
    }
  }, {
    key: 'snapToGuides',
    value: function snapToGuides(_ref) {
      var box = _ref.box,
          parentRect = _ref.parentRect;

      var rect = box.getBoundingClientRect();

      this.removeGuides();

      var axis = [];

      var xAxis = this.snap({
        parentRect: parentRect,
        rect: rect,
        axis: 'x'
      });

      if (xAxis) {
        axis.push(xAxis);
      }

      var yAxis = this.snap({
        parentRect: parentRect,
        rect: rect,
        axis: 'y'
      });

      if (yAxis) {
        axis.push(yAxis);
      }

      if (axis.length) {
        this.setState({ axis: axis }, function () {
          axis.forEach(function (item) {
            // this.props.onSnaping(item)
          });
        });
      }

      this.props.onSnaping({
        xDistance: this.x - (rect.x - parentRect.x),
        yDistance: this.y - (rect.y - parentRect.y),
        snapTreshhold: this.state.snapTreshhold
      });
    }
  }, {
    key: 'snap',
    value: function snap(_ref2) {
      var parentRect = _ref2.parentRect,
          rect = _ref2.rect,
          axis = _ref2.axis;
      var snapTreshhold = this.state.snapTreshhold;

      var side = axis === 'x' ? 'width' : 'height';
      var start = axis === 'x' ? 'left' : 'top';
      var end = axis === 'x' ? 'right' : 'bottom';
      var edges = this.edges[axis];

      for (var i = 0; i < edges.length; i++) {
        var position = edges[i];
        var distance = this[axis];
        var halfSideLength = Math.abs(rect[side] / 2);
        var center = distance + halfSideLength;
        var endDistance = distance + rect[side];
        var setGuide = false;

        if (Math.abs(distance - position) <= snapTreshhold) {
          this[axis] = position;
          setGuide = true;
        } else if (Math.abs(center - position) <= snapTreshhold) {
          this[axis] = position - halfSideLength; // move snap behavior 
          setGuide = true;
        } else if (Math.abs(endDistance - position) <= snapTreshhold) {
          this[axis] = position - rect[side]; // move snap behavior     
          setGuide = true;
        }

        if (setGuide) {
          // console.log('success axis position moveDistance', axis, position)
          return { axis: axis, position: position
            // this.parent.renderGuide(axis, position);
          };
        }
      }
    }
  }, {
    key: 'excludeBoxformEdges',
    value: function excludeBoxformEdges(rect) {
      removeEntry(this.edges.x, rect.x);
      removeEntry(this.edges.x, rect.x + Math.round(rect.width / 2));
      removeEntry(this.edges.x, rect.x + rect.width);

      removeEntry(this.edges.y, rect.y);
      removeEntry(this.edges.y, rect.y + Math.round(rect.height / 2));
      removeEntry(this.edges.y, rect.y + rect.height);
    }
  }, {
    key: 'showAllGuides',
    value: function showAllGuides() {}
  }, {
    key: 'removeGuides',
    value: function removeGuides() {
      this.setState({
        axis: []
      });
    }
  }, {
    key: 'getInterestPoints',
    value: function getInterestPoints(box) {
      return {
        x: [box.x, box.x + Math.round(box.width / 2), box.right],
        y: [box.y, box.y + Math.round(box.height / 2), box.bottom]
      };
    }
  }, {
    key: 'resetStaticGuides',
    value: function resetStaticGuides() {
      var clientRect = this.clientRect;
      this.staticGuides = {
        x: [0, Math.round(clientRect.width / 2), clientRect.width],
        y: [0, Math.round(clientRect.height / 2), clientRect.height]
      };
    }
  }, {
    key: 'resetEdges',
    value: function resetEdges() {
      // .slice() to only copy them - otherwise a reference would get created
      this.edges = {
        x: this.staticGuides.x.slice(),
        y: this.staticGuides.y.slice()
      };
    }
  }, {
    key: 'renderGuide',
    value: function renderGuide(_ref3) {
      var axis = _ref3.axis,
          position = _ref3.position,
          additionalClass = _ref3.additionalClass;

      var className = 'guide axis-' + axis;
      if (additionalClass) className += " " + additionalClass;

      var _styles = {};
      if (axis === 'x') {
        _styles.left = position + 'px';
      } else {
        _styles.top = position + 'px';
      }
      return _react2.default.createElement('div', { className: className, style: _styles });
    }
  }, {
    key: 'renderAxis',
    value: function renderAxis() {
      var _this3 = this;

      var axis = this.state.axis;


      if (axis && axis.length) {
        return axis.map(function (item) {
          return _this3.renderGuide(item);
        });
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          showAxisX = _state.showAxisX,
          showAxisY = _state.showAxisY;
      // Reuse the child provided
      // This makes it flexible to use whatever element is wanted (div, ul, etc)

      return _react2.default.createElement(
        'div',
        this.props,
        this.props.children,
        this.renderAxis()
      );
    }
  }, {
    key: 'boxes',
    get: function get() {
      return document.querySelectorAll(this.props.selector);
    }
  }, {
    key: 'clientRect',
    get: function get() {
      var thisNode = _reactDom2.default.findDOMNode(this);
      return thisNode.getBoundingClientRect();
    }
  }]);

  return DraggableAlignGuide;
}(_react2.default.Component);

DraggableAlignGuide.displayName = 'DraggableAlignGuide';
DraggableAlignGuide.propTypes = {
  snapTreshhold: _propTypes2.default.nubmer,
  onSnaping: _propTypes2.default.func,
  selector: _propTypes2.default.string
};
DraggableAlignGuide.defaultProps = {
  snapTreshhold: 5,
  selector: '.react-draggable',
  onSnaping: function onSnaping() {}
};
exports.default = DraggableAlignGuide;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIDU4YTg1M2JhOWRiYWUwNzEwOWEwIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifSIsIi4uLy4vbGliL3V0aWxzL2RvbUZucy5qcyIsIi4uLy4vbGliL3V0aWxzL3NoaW1zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwiLi4vLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLi4vLi9saWIvdXRpbHMvbG9nLmpzIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4vbGliL3V0aWxzL2dldFByZWZpeC5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwibmFtZXMiOlsibWF0Y2hlc1NlbGVjdG9yIiwibWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsIm91dGVySGVpZ2h0Iiwib3V0ZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm9mZnNldFhZRnJvbVBhcmVudCIsImNyZWF0ZUNTU1RyYW5zZm9ybSIsImNyZWF0ZVNWR1RyYW5zZm9ybSIsImdldFRvdWNoIiwiZ2V0VG91Y2hJZGVudGlmaWVyIiwiYWRkVXNlclNlbGVjdFN0eWxlcyIsInJlbW92ZVVzZXJTZWxlY3RTdHlsZXMiLCJzdHlsZUhhY2tzIiwiYWRkQ2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3NOYW1lIiwibWF0Y2hlc1NlbGVjdG9yRnVuYyIsImVsIiwic2VsZWN0b3IiLCJtZXRob2QiLCJjYWxsIiwiYmFzZU5vZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsImV2ZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbXB1dGVkU3R5bGUiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImV2dCIsIm9mZnNldFBhcmVudCIsImlzQm9keSIsImJvZHkiLCJvZmZzZXRQYXJlbnRSZWN0IiwibGVmdCIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwic2Nyb2xsTGVmdCIsInkiLCJjbGllbnRZIiwic2Nyb2xsVG9wIiwiZGVncmVlIiwiY3NzU3R5bGUiLCJlIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJkb2MiLCJzdHlsZUVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImlkIiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsImNoaWxkU3R5bGUiLCJ0b3VjaEFjdGlvbiIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsIm1hdGNoIiwiUmVnRXhwIiwicmVtb3ZlIiwicmVwbGFjZSIsImZpbmRJbkFycmF5IiwiaXNGdW5jdGlvbiIsImlzTnVtIiwiaW50IiwiZG9udFNldE1lIiwiYXJyYXkiLCJjYWxsYmFjayIsImkiLCJsZW5ndGgiLCJhcHBseSIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm51bSIsImlzTmFOIiwiYSIsInBhcnNlSW50IiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJFcnJvciIsImdldEJvdW5kUG9zaXRpb24iLCJzbmFwVG9HcmlkIiwiY2FuRHJhZ1giLCJjYW5EcmFnWSIsImdldENvbnRyb2xQb3NpdGlvbiIsImNyZWF0ZUNvcmVEYXRhIiwiY3JlYXRlRHJhZ2dhYmxlRGF0YSIsImRyYWdnYWJsZSIsImJvdW5kcyIsImNsb25lQm91bmRzIiwiZmluZERPTU5vZGUiLCJvd25lcldpbmRvdyIsImJvdW5kTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MRWxlbWVudCIsIm5vZGVTdHlsZSIsImJvdW5kTm9kZVN0eWxlIiwib2Zmc2V0TGVmdCIsIm1hcmdpbkxlZnQiLCJvZmZzZXRUb3AiLCJtYXJnaW5Ub3AiLCJyaWdodCIsIm1hcmdpblJpZ2h0IiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwiTWF0aCIsIm1pbiIsIm1heCIsImdyaWQiLCJwZW5kaW5nWCIsInBlbmRpbmdZIiwicm91bmQiLCJheGlzIiwidG91Y2hJZGVudGlmaWVyIiwiZHJhZ2dhYmxlQ29yZSIsInRvdWNoT2JqIiwic3RhdGUiLCJpc1N0YXJ0IiwibGFzdFgiLCJkZWx0YVgiLCJkZWx0YVkiLCJsYXN0WSIsImNvcmVEYXRhIiwiZXZlbnRzRm9yIiwidG91Y2giLCJzdGFydCIsIm1vdmUiLCJzdG9wIiwibW91c2UiLCJkcmFnRXZlbnRGb3IiLCJEcmFnZ2FibGVDb3JlIiwiZHJhZ2dpbmciLCJOYU4iLCJoYW5kbGVEcmFnU3RhcnQiLCJvbk1vdXNlRG93biIsImFsbG93QW55Q2xpY2siLCJidXR0b24iLCJ0aGlzTm9kZSIsImRpc2FibGVkIiwidGFyZ2V0IiwiTm9kZSIsImhhbmRsZSIsImNhbmNlbCIsInNldFN0YXRlIiwicG9zaXRpb24iLCJjb3JlRXZlbnQiLCJvblN0YXJ0Iiwic2hvdWxkVXBkYXRlIiwiZW5hYmxlVXNlclNlbGVjdEhhY2siLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJhZ1N0b3AiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiaXNBcnJheSIsIm9uRHJhZyIsIk1vdXNlRXZlbnQiLCJlcnIiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJvblN0b3AiLCJvbk1vdXNlVXAiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25LZXlVcCIsIm9uS2V5RG93biIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkcmVuIiwic3R5bGUiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJwcm9jZXNzIiwiYnJvd3NlciIsIm5vZGVUeXBlIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsInRyYW5zZm9ybSIsImRlZmF1bHRQcm9wcyIsImxvZyIsIkRyYWdnYWJsZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkRyYWdnYWJsZUFsaWduR3VpZGUiLCJhdXRvU3RlcFRpbWVyIiwib25EcmFnU3RhcnQiLCJzaG91bGRTdGFydCIsImRyYWdnZWQiLCJ1aURhdGEiLCJuZXdTdGF0ZSIsInNsYWNrWCIsInNsYWNrWSIsIm5ld1N0YXRlWCIsIm5ld1N0YXRlWSIsIm9uRHJhZ1N0b3AiLCJzaG91bGRTdG9wIiwiY29udHJvbGxlZCIsIkJvb2xlYW4iLCJzdG9wTW92ZSIsImNsZWFyVGltZW91dCIsIm9uS2V5TW92ZSIsImtleUNvZGUiLCJwZXJzaXN0IiwiX3giLCJfeSIsInNldFRpbWVvdXQiLCJrZXlNb3ZlU3BlZWQiLCJrZXlNb3ZlRW5hYmxlZCIsIm1vdmVTbmFwaW5nIiwic25hcCIsInhEaXN0YW5jZSIsInlEaXN0YW5jZSIsInNuYXBUcmVzaGhvbGQiLCJhYnMiLCJkZWZhdWx0UG9zaXRpb24iLCJpc0VsZW1lbnRTVkciLCJmb2N1c2VkIiwiY29uc29sZSIsIndhcm4iLCJTVkdFbGVtZW50IiwibmV4dFByb3BzIiwic3ZnVHJhbnNmb3JtIiwidHJhbnNmb3JtT3B0cyIsInBvc2l0aW9uUm90YXRlIiwiZGVmYXVsdENsYXNzTmFtZSIsImRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyIsImRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkIiwiZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQiLCJ0YWJJbmRleCIsIk51bWJlciIsIm9uZU9mIiwib25lT2ZUeXBlIiwic2hhcGUiLCJnZXRQcmVmaXgiLCJicm93c2VyUHJlZml4VG9LZXkiLCJicm93c2VyUHJlZml4VG9TdHlsZSIsInByZWZpeGVzIiwicHJvcCIsImRvY3VtZW50RWxlbWVudCIsInByZWZpeCIsImtlYmFiVG9UaXRsZUNhc2UiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsIm91dCIsInNob3VsZENhcGl0YWxpemUiLCJ0b1VwcGVyQ2FzZSIsImZyb20iLCJ0byIsInJlc3QiLCJzbGljZSIsInB1c2giLCJyZW1vdmVFbnRyeSIsImVudHJ5IiwiaW5kZXgiLCJpbmRleE9mIiwiZ2V0VGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInNyY0VsZW1lbnQiLCJlZGdlcyIsInN0YXRpY0d1aWRlcyIsIm1vdXNlT2Zmc2V0WCIsIm1vdXNlT2Zmc2V0WSIsImRyYWciLCJib3giLCJyZWN0IiwicGFyZW50UmVjdCIsImNsaWVudFJlY3QiLCJwYWdlWCIsInBhZ2VZIiwic25hcFRvR3VpZGVzIiwic3RvcFRvRHJhZyIsImxvY2tlZEF4aXMiLCJjaGFydCIsInJlbW92ZUd1aWRlcyIsImJveGVzIiwibWluaW11bURpc3RhbmNlIiwib2Zmc2V0IiwicmVzZXRTdGF0aWNHdWlkZXMiLCJyZXNldEVkZ2VzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJpbnRlcmVzdFBvaW50cyIsImdldEludGVyZXN0UG9pbnRzIiwiZ3VpZGUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJzdGFydFRvRHJhZyIsInNob3dBbGxHdWlkZXMiLCJfc3RhcnRYIiwiX3N0YXJ0WSIsImV4Y2x1ZGVCb3hmb3JtRWRnZXMiLCJ4QXhpcyIsInlBeGlzIiwiZm9yRWFjaCIsIml0ZW0iLCJvblNuYXBpbmciLCJzaWRlIiwiZW5kIiwiZGlzdGFuY2UiLCJoYWxmU2lkZUxlbmd0aCIsImNlbnRlciIsImVuZERpc3RhbmNlIiwic2V0R3VpZGUiLCJhZGRpdGlvbmFsQ2xhc3MiLCJfc3R5bGVzIiwibWFwIiwicmVuZGVyR3VpZGUiLCJzaG93QXhpc1giLCJzaG93QXhpc1kiLCJyZW5kZXJBeGlzIiwicXVlcnlTZWxlY3RvckFsbCIsIm51Ym1lciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztB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QUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsMkJBQTJCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixnQ0FBZ0M7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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TCxhQUFLa0osVUFBTDtBQUZLLE9BQVI7QUFJRDs7O3dCQXZDVztBQUNWLGFBQU85SixTQUFTK0osZ0JBQVQsQ0FBMEIsS0FBS2hQLEtBQUwsQ0FBV3hGLFFBQXJDLENBQVA7QUFDRDs7O3dCQUNnQjtBQUNmLFVBQU1xSixXQUFXLG1CQUFTL0MsV0FBVCxDQUFxQixJQUFyQixDQUFqQjtBQUNBLGFBQU8rQyxTQUFTbEgscUJBQVQsRUFBUDtBQUNEOzs7O0VBN084QyxnQkFBTW9KLFM7O0FBQWxDa0IsbUIsQ0FDWmpCLFcsR0FBYyxxQjtBQURGaUIsbUIsQ0FFWmhCLFMsR0FBWTtBQUNqQjZDLGlCQUFlLG9CQUFVbUcsTUFEUjtBQUVqQmhCLGFBQVcsb0JBQVV6TyxJQUZKO0FBR2pCaEYsWUFBVSxvQkFBVWdNO0FBSEgsQztBQUZBUyxtQixDQVFaUCxZLEdBQWU7QUFDcEJvQyxpQkFBZSxDQURLO0FBRXBCdE8sWUFBVSxrQkFGVTtBQUdwQnlULGFBQVcscUJBQU0sQ0FBRztBQUhBLEM7a0JBUkhoSCxtQiIsImZpbGUiOiIuL2Rpc3QvcmVhY3QtZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3QtZG9tXCIpLCByZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3QtZG9tXCIsIFwicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdC1kb21cIiksIHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdERPTVwiXSwgcm9vdFtcIlJlYWN0XCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDU4YTg1M2JhOWRiYWUwNzEwOWEwIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgeyBmaW5kSW5BcnJheSwgaXNGdW5jdGlvbiwgaW50IH0gZnJvbSAnLi9zaGltcyc7XG5pbXBvcnQgYnJvd3NlclByZWZpeCwgeyBicm93c2VyUHJlZml4VG9LZXkgfSBmcm9tICcuL2dldFByZWZpeCc7XG5cbmltcG9ydCB0eXBlIHtDb250cm9sUG9zaXRpb24sIE1vdXNlVG91Y2hFdmVudCB9IGZyb20gJy4vdHlwZXMnO1xuXG5sZXQgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9ICcnO1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvcihlbDogTm9kZSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoIW1hdGNoZXNTZWxlY3RvckZ1bmMpIHtcbiAgICBtYXRjaGVzU2VsZWN0b3JGdW5jID0gZmluZEluQXJyYXkoW1xuICAgICAgJ21hdGNoZXMnLFxuICAgICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbW96TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdtc01hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnb01hdGNoZXNTZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICByZXR1cm4gZWxbbWF0Y2hlc1NlbGVjdG9yRnVuY10uY2FsbChlbCwgc2VsZWN0b3IpO1xufVxuXG4vLyBXb3JrcyB1cCB0aGUgdHJlZSB0byB0aGUgZHJhZ2dhYmxlIGl0c2VsZiBhdHRlbXB0aW5nIHRvIG1hdGNoIHNlbGVjdG9yLlxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlbDogTm9kZSwgc2VsZWN0b3I6IHN0cmluZywgYmFzZU5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgbGV0IG5vZGUgPSBlbDtcbiAgZG8ge1xuICAgIGlmIChtYXRjaGVzU2VsZWN0b3Iobm9kZSwgc2VsZWN0b3IpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9kZSA9PT0gYmFzZU5vZGUpIHJldHVybiBmYWxzZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChub2RlKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudChlbDogP05vZGUsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gaGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWw6ID9Ob2RlLCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuZGV0YWNoRXZlbnQpIHtcbiAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldFRvcCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0TGVmdCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpO1xuICByZXR1cm4gd2lkdGg7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJIZWlnaHQobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdUb3ApO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbm5lcldpZHRoKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuLy8gR2V0IGZyb20gb2Zmc2V0UGFyZW50XG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0WFlGcm9tUGFyZW50KGV2dDogeyBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlciB9LCBvZmZzZXRQYXJlbnQ6IEhUTUxFbGVtZW50KTogQ29udHJvbFBvc2l0aW9uIHtcbiAgY29uc3QgaXNCb2R5ID0gb2Zmc2V0UGFyZW50ID09PSBvZmZzZXRQYXJlbnQub3duZXJEb2N1bWVudC5ib2R5O1xuICBjb25zdCBvZmZzZXRQYXJlbnRSZWN0ID0gaXNCb2R5ID8geyBsZWZ0OiAwLCB0b3A6IDAgfSA6IG9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCB4ID0gZXZ0LmNsaWVudFggKyBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdCAtIG9mZnNldFBhcmVudFJlY3QubGVmdDtcbiAgY29uc3QgeSA9IGV2dC5jbGllbnRZICsgb2Zmc2V0UGFyZW50LnNjcm9sbFRvcCAtIG9mZnNldFBhcmVudFJlY3QudG9wO1xuXG4gIHJldHVybiB7IHgsIHkgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTU1RyYW5zZm9ybSh7IHgsIHksIGRlZ3JlZSB9OiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCBkZWdyZWU6IG51bWJlciB9KTogT2JqZWN0IHtcbiAgLy8gUmVwbGFjZSB1bml0bGVzcyBpdGVtcyB3aXRoIHB4XG4gIGxldCBjc3NTdHlsZSA9ICcnO1xuICBpZiAoZGVncmVlKSB7XG4gICAgY3NzU3R5bGUgPSAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSByb3RhdGUoJyArIGRlZ3JlZSArICdkZWcpJztcblxuICB9IGVsc2Uge1xuICAgIGNzc1N0eWxlID0gJ3RyYW5zbGF0ZSgnICsgeCArICdweCwnICsgeSArICdweCknO1xuICB9XG4gIHJldHVybiB7IFticm93c2VyUHJlZml4VG9LZXkoJ3RyYW5zZm9ybScsIGJyb3dzZXJQcmVmaXgpXTogY3NzU3R5bGUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWR1RyYW5zZm9ybSh7IHgsIHkgfTogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2goZTogTW91c2VUb3VjaEV2ZW50LCBpZGVudGlmaWVyOiBudW1iZXIpOiA/eyBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlciB9IHtcbiAgcmV0dXJuIChlLnRhcmdldFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS50YXJnZXRUb3VjaGVzLCB0ID0+IGlkZW50aWZpZXIgPT09IHQuaWRlbnRpZmllcikpIHx8XG4gICAgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS5jaGFuZ2VkVG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoSWRlbnRpZmllcihlOiBNb3VzZVRvdWNoRXZlbnQpOiA/bnVtYmVyIHtcbiAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbn1cblxuLy8gVXNlci1zZWxlY3QgSGFja3M6XG4vL1xuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG5cbi8vIE5vdGUgd2UncmUgcGFzc2luZyBgZG9jdW1lbnRgIGIvYyB3ZSBjb3VsZCBiZSBpZnJhbWVkXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlclNlbGVjdFN0eWxlcyhkb2M6IERvY3VtZW50KSB7XG4gIGxldCBzdHlsZUVsID0gZG9jLmdldEVsZW1lbnRCeUlkKCdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnKTtcbiAgaWYgKCFzdHlsZUVsKSB7XG4gICAgc3R5bGVFbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWwudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVFbC5pZCA9ICdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnO1xuICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gJy5yZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uICo6Oi1tb3otc2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCArPSAnLnJlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24gKjo6c2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgfVxuICBpZiAoZG9jLmJvZHkpIGFkZENsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMoZG9jOiBEb2N1bWVudCkge1xuICBpZiAoZG9jLmJvZHkpIHJlbW92ZUNsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbiAgdHJ5IHtcbiAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7ICAvLyByZW1vdmUgc2VsZWN0aW9uIGNhdXNlZCBieSBzY3JvbGxcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHByb2JhYmx5IElFXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSGFja3MoY2hpbGRTdHlsZTogT2JqZWN0ID0ge30pOiBPYmplY3Qge1xuICAvLyBXb3JrYXJvdW5kIElFIHBvaW50ZXIgZXZlbnRzOyBzZWUgIzUxXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL3JlYWN0LWRyYWdnYWJsZS9pc3N1ZXMvNTEjaXNzdWVjb21tZW50LTEwMzQ4ODI3OFxuICByZXR1cm4ge1xuICAgIHRvdWNoQWN0aW9uOiAnbm9uZScsXG4gICAgLi4uY2hpbGRTdHlsZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKGAoPzpefFxcXFxzKSR7Y2xhc3NOYW1lfSg/IVxcXFxTKWApKSkge1xuICAgICAgZWwuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzTmFtZShlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86XnxcXFxccykke2NsYXNzTmFtZX0oPyFcXFxcUylgLCAnZycpLCAnJyk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9kb21GbnMuanMiLCIvLyBAZmxvd1xuLy8gQGNyZWRpdHMgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcm9nb3pobmlrb2ZmL2E0M2NmZWQyN2M0MWU0ZTY4Y2RjXG5leHBvcnQgZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXk6IEFycmF5PGFueT4gfCBUb3VjaExpc3QsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5hcHBseShjYWxsYmFjaywgW2FycmF5W2ldLCBpLCBhcnJheV0pKSByZXR1cm4gYXJyYXlbaV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYzogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bShudW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKG51bSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnQoYTogc3RyaW5nKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbnRTZXRNZShwcm9wczogT2JqZWN0LCBwcm9wTmFtZTogc3RyaW5nLCBjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHByb3BzW3Byb3BOYW1lXSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYEludmFsaWQgcHJvcCAke3Byb3BOYW1lfSBwYXNzZWQgdG8gJHtjb21wb25lbnROYW1lfSAtIGRvIG5vdCBzZXQgdGhpcywgc2V0IGl0IG9uIHRoZSBjaGlsZC5gKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL3NoaW1zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQge2lzTnVtLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge2dldFRvdWNoLCBpbm5lcldpZHRoLCBpbm5lckhlaWdodCwgb2Zmc2V0WFlGcm9tUGFyZW50LCBvdXRlcldpZHRoLCBvdXRlckhlaWdodH0gZnJvbSAnLi9kb21GbnMnO1xuXG5pbXBvcnQgdHlwZSBEcmFnZ2FibGUgZnJvbSAnLi4vRHJhZ2dhYmxlJztcbmltcG9ydCB0eXBlIHtCb3VuZHMsIENvbnRyb2xQb3NpdGlvbiwgRHJhZ2dhYmxlRGF0YSwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIERyYWdnYWJsZUNvcmUgZnJvbSAnLi4vRHJhZ2dhYmxlQ29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZFBvc2l0aW9uKGRyYWdnYWJsZTogRHJhZ2dhYmxlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAvLyBJZiBubyBib3VuZHMsIHNob3J0LWNpcmN1aXQgYW5kIG1vdmUgb25cbiAgaWYgKCFkcmFnZ2FibGUucHJvcHMuYm91bmRzKSByZXR1cm4gW3gsIHldO1xuXG4gIC8vIENsb25lIG5ldyBib3VuZHNcbiAgbGV0IHtib3VuZHN9ID0gZHJhZ2dhYmxlLnByb3BzO1xuICBib3VuZHMgPSB0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJyA/IGJvdW5kcyA6IGNsb25lQm91bmRzKGJvdW5kcyk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmICh0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHtvd25lckRvY3VtZW50fSA9IG5vZGU7XG4gICAgY29uc3Qgb3duZXJXaW5kb3cgPSBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIGxldCBib3VuZE5vZGU7XG4gICAgaWYgKGJvdW5kcyA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIGJvdW5kTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmROb2RlID0gb3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvdW5kcyk7XG4gICAgfVxuICAgIGlmICghKGJvdW5kTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZHMgc2VsZWN0b3IgXCInICsgYm91bmRzICsgJ1wiIGNvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgYm91bmROb2RlU3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvdW5kTm9kZSk7XG4gICAgLy8gQ29tcHV0ZSBib3VuZHMuIFRoaXMgaXMgYSBwYWluIHdpdGggcGFkZGluZyBhbmQgb2Zmc2V0cyBidXQgdGhpcyBnZXRzIGl0IGV4YWN0bHkgcmlnaHQuXG4gICAgYm91bmRzID0ge1xuICAgICAgbGVmdDogLW5vZGUub2Zmc2V0TGVmdCArIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nTGVmdCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpbkxlZnQpLFxuICAgICAgdG9wOiAtbm9kZS5vZmZzZXRUb3AgKyBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ1RvcCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpblRvcCksXG4gICAgICByaWdodDogaW5uZXJXaWR0aChib3VuZE5vZGUpIC0gb3V0ZXJXaWR0aChub2RlKSAtIG5vZGUub2Zmc2V0TGVmdCArXG4gICAgICAgIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nUmlnaHQpIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5SaWdodCksXG4gICAgICBib3R0b206IGlubmVySGVpZ2h0KGJvdW5kTm9kZSkgLSBvdXRlckhlaWdodChub2RlKSAtIG5vZGUub2Zmc2V0VG9wICtcbiAgICAgICAgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdCb3R0b20pIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5Cb3R0b20pXG4gICAgfTtcbiAgfVxuXG4gIC8vIEtlZXAgeCBhbmQgeSBiZWxvdyByaWdodCBhbmQgYm90dG9tIGxpbWl0cy4uLlxuICBpZiAoaXNOdW0oYm91bmRzLnJpZ2h0KSkgeCA9IE1hdGgubWluKHgsIGJvdW5kcy5yaWdodCk7XG4gIGlmIChpc051bShib3VuZHMuYm90dG9tKSkgeSA9IE1hdGgubWluKHksIGJvdW5kcy5ib3R0b20pO1xuXG4gIC8vIEJ1dCBhYm92ZSBsZWZ0IGFuZCB0b3AgbGltaXRzLlxuICBpZiAoaXNOdW0oYm91bmRzLmxlZnQpKSB4ID0gTWF0aC5tYXgoeCwgYm91bmRzLmxlZnQpO1xuICBpZiAoaXNOdW0oYm91bmRzLnRvcCkpIHkgPSBNYXRoLm1heCh5LCBib3VuZHMudG9wKTtcblxuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc25hcFRvR3JpZChncmlkOiBbbnVtYmVyLCBudW1iZXJdLCBwZW5kaW5nWDogbnVtYmVyLCBwZW5kaW5nWTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHggPSBNYXRoLnJvdW5kKHBlbmRpbmdYIC8gZ3JpZFswXSkgKiBncmlkWzBdO1xuICBjb25zdCB5ID0gTWF0aC5yb3VuZChwZW5kaW5nWSAvIGdyaWRbMV0pICogZ3JpZFsxXTtcbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gIHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8IGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3knO1xufVxuXG4vLyBHZXQge3gsIHl9IHBvc2l0aW9ucyBmcm9tIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xQb3NpdGlvbihlOiBNb3VzZVRvdWNoRXZlbnQsIHRvdWNoSWRlbnRpZmllcjogP251bWJlciwgZHJhZ2dhYmxlQ29yZTogRHJhZ2dhYmxlQ29yZSk6ID9Db250cm9sUG9zaXRpb24ge1xuICBjb25zdCB0b3VjaE9iaiA9IHR5cGVvZiB0b3VjaElkZW50aWZpZXIgPT09ICdudW1iZXInID8gZ2V0VG91Y2goZSwgdG91Y2hJZGVudGlmaWVyKSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdG91Y2hJZGVudGlmaWVyID09PSAnbnVtYmVyJyAmJiAhdG91Y2hPYmopIHJldHVybiBudWxsOyAvLyBub3QgdGhlIHJpZ2h0IHRvdWNoXG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGVDb3JlKTtcbiAgLy8gVXNlciBjYW4gcHJvdmlkZSBhbiBvZmZzZXRQYXJlbnQgaWYgZGVzaXJlZC5cbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZHJhZ2dhYmxlQ29yZS5wcm9wcy5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vd25lckRvY3VtZW50LmJvZHk7XG4gIHJldHVybiBvZmZzZXRYWUZyb21QYXJlbnQodG91Y2hPYmogfHwgZSwgb2Zmc2V0UGFyZW50KTtcbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgb2JqZWN0IGV4cG9zZWQgYnkgPERyYWdnYWJsZUNvcmU+J3MgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29yZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGVDb3JlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZURhdGEge1xuICBjb25zdCBzdGF0ZSA9IGRyYWdnYWJsZS5zdGF0ZTtcbiAgY29uc3QgaXNTdGFydCA9ICFpc051bShzdGF0ZS5sYXN0WCk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmIChpc1N0YXJ0KSB7XG4gICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgbW92ZSwgdXNlIHRoZSB4IGFuZCB5IGFzIGxhc3QgY29vcmRzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiAwLCBkZWx0YVk6IDAsXG4gICAgICBsYXN0WDogeCwgbGFzdFk6IHksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIGNhbGN1bGF0ZSBwcm9wZXIgdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiB4IC0gc3RhdGUubGFzdFgsIGRlbHRhWTogeSAtIHN0YXRlLmxhc3RZLFxuICAgICAgbGFzdFg6IHN0YXRlLmxhc3RYLCBsYXN0WTogc3RhdGUubGFzdFksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH1cbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgZXhwb3NlZCBieSA8RHJhZ2dhYmxlPidzIGV2ZW50c1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyYWdnYWJsZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIGNvcmVEYXRhOiBEcmFnZ2FibGVEYXRhKTogRHJhZ2dhYmxlRGF0YSB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogY29yZURhdGEubm9kZSxcbiAgICB4OiBkcmFnZ2FibGUuc3RhdGUueCArIGNvcmVEYXRhLmRlbHRhWCxcbiAgICB5OiBkcmFnZ2FibGUuc3RhdGUueSArIGNvcmVEYXRhLmRlbHRhWSxcbiAgICBkZWx0YVg6IGNvcmVEYXRhLmRlbHRhWCxcbiAgICBkZWx0YVk6IGNvcmVEYXRhLmRlbHRhWSxcbiAgICBsYXN0WDogZHJhZ2dhYmxlLnN0YXRlLngsXG4gICAgbGFzdFk6IGRyYWdnYWJsZS5zdGF0ZS55XG4gIH07XG59XG5cbi8vIEEgbG90IGZhc3RlciB0aGFuIHN0cmluZ2lmeS9wYXJzZVxuZnVuY3Rpb24gY2xvbmVCb3VuZHMoYm91bmRzOiBCb3VuZHMpOiBCb3VuZHMge1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGJvdW5kcy5sZWZ0LFxuICAgIHRvcDogYm91bmRzLnRvcCxcbiAgICByaWdodDogYm91bmRzLnJpZ2h0LFxuICAgIGJvdHRvbTogYm91bmRzLmJvdHRvbVxuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kRE9NTm9kZShkcmFnZ2FibGU6IERyYWdnYWJsZSB8IERyYWdnYWJsZUNvcmUpOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJzxEcmFnZ2FibGVDb3JlPjogVW5tb3VudGVkIGR1cmluZyBldmVudCEnKTtcbiAgfVxuICAvLyAkRmxvd0lnbm9yZSB3ZSBjYW4ndCBhc3NlcnQgb24gSFRNTEVsZW1lbnQgZHVlIHRvIHRlc3RzLi4uIEZJWE1FXG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL3Bvc2l0aW9uRm5zLmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1xuICBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8sIGFkZEV2ZW50LCByZW1vdmVFdmVudCwgYWRkVXNlclNlbGVjdFN0eWxlcywgZ2V0VG91Y2hJZGVudGlmaWVyLFxuICByZW1vdmVVc2VyU2VsZWN0U3R5bGVzLCBzdHlsZUhhY2tzXG59IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7IGNyZWF0ZUNvcmVEYXRhLCBnZXRDb250cm9sUG9zaXRpb24sIHNuYXBUb0dyaWQgfSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7IGRvbnRTZXRNZSB9IGZyb20gJy4vdXRpbHMvc2hpbXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cbmltcG9ydCB0eXBlIHsgRXZlbnRIYW5kbGVyLCBNb3VzZVRvdWNoRXZlbnQgfSBmcm9tICcuL3V0aWxzL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgRWxlbWVudCBhcyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbi8vIFNpbXBsZSBhYnN0cmFjdGlvbiBmb3IgZHJhZ2dpbmcgZXZlbnRzIG5hbWVzLlxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuLy8gRGVmYXVsdCB0byBtb3VzZSBldmVudHMuXG5sZXQgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuXG50eXBlIERyYWdnYWJsZUNvcmVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGxhc3RYOiBudW1iZXIsXG4gIGxhc3RZOiBudW1iZXIsXG4gIHRvdWNoSWRlbnRpZmllcjogP251bWJlclxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQm91bmRzID0ge1xuICBsZWZ0OiBudW1iZXIsXG4gIHJpZ2h0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyLFxuICBib3R0b206IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZURhdGEgPSB7XG4gIG5vZGU6IEhUTUxFbGVtZW50LFxuICB4OiBudW1iZXIsIHk6IG51bWJlcixcbiAgZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyLFxuICBsYXN0WDogbnVtYmVyLCBsYXN0WTogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQsIGRhdGE6IERyYWdnYWJsZURhdGEpID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xQb3NpdGlvbiA9IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZVByb3BzID0ge1xuICBhbGxvd0FueUNsaWNrOiBib29sZWFuLFxuICBjYW5jZWw6IHN0cmluZyxcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudDxhbnk+LFxuICBkaXNhYmxlZDogYm9vbGVhbixcbiAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IGJvb2xlYW4sXG4gIG9mZnNldFBhcmVudDogSFRNTEVsZW1lbnQsXG4gIGdyaWQ6IFtudW1iZXIsIG51bWJlcl0sXG4gIGhhbmRsZTogc3RyaW5nLFxuICBvblN0YXJ0OiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uRHJhZzogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvblN0b3A6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25Nb3VzZURvd246IChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkLFxuICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbn07XG5cbi8vXG4vLyBEZWZpbmUgPERyYWdnYWJsZUNvcmU+LlxuLy9cbi8vIDxEcmFnZ2FibGVDb3JlPiBpcyBmb3IgYWR2YW5jZWQgdXNhZ2Ugb2YgPERyYWdnYWJsZT4uIEl0IG1haW50YWlucyBtaW5pbWFsIGludGVybmFsIHN0YXRlIHNvIGl0IGNhblxuLy8gd29yayB3ZWxsIHdpdGggbGlicmFyaWVzIHRoYXQgcmVxdWlyZSBtb3JlIGNvbnRyb2wgb3ZlciB0aGUgZWxlbWVudC5cbi8vXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUNvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8RHJhZ2dhYmxlQ29yZVByb3BzLCBEcmFnZ2FibGVDb3JlU3RhdGU+IHtcblxuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRHJhZ2dhYmxlQ29yZSc7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvKipcbiAgICAgKiBgYWxsb3dBbnlDbGlja2AgYWxsb3dzIGRyYWdnaW5nIHVzaW5nIGFueSBtb3VzZSBidXR0b24uXG4gICAgICogQnkgZGVmYXVsdCwgd2Ugb25seSBhY2NlcHQgdGhlIGxlZnQgYnV0dG9uLlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBhbGxvd0FueUNsaWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBkaXNhYmxlZGAsIGlmIHRydWUsIHN0b3BzIHRoZSA8RHJhZ2dhYmxlPiBmcm9tIGRyYWdnaW5nLiBBbGwgaGFuZGxlcnMsXG4gICAgICogd2l0aCB0aGUgZXhjZXB0aW9uIG9mIGBvbk1vdXNlRG93bmAsIHdpbGwgbm90IGZpcmUuXG4gICAgICovXG4gICAgZGlzYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogQnkgZGVmYXVsdCwgd2UgYWRkICd1c2VyLXNlbGVjdDpub25lJyBhdHRyaWJ1dGVzIHRvIHRoZSBkb2N1bWVudCBib2R5XG4gICAgICogdG8gcHJldmVudCB1Z2x5IHRleHQgc2VsZWN0aW9uIGR1cmluZyBkcmFnLiBJZiB0aGlzIGlzIGNhdXNpbmcgcHJvYmxlbXNcbiAgICAgKiBmb3IgeW91ciBhcHAsIHNldCB0aGlzIHRvIGBmYWxzZWAuXG4gICAgICovXG4gICAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogYG9mZnNldFBhcmVudGAsIGlmIHNldCwgdXNlcyB0aGUgcGFzc2VkIERPTSBub2RlIHRvIGNvbXB1dGUgZHJhZyBvZmZzZXRzXG4gICAgICogaW5zdGVhZCBvZiB1c2luZyB0aGUgcGFyZW50IG5vZGUuXG4gICAgICovXG4gICAgb2Zmc2V0UGFyZW50OiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUpIHtcbiAgICAgIGlmIChwcm9jZXNzLmJyb3dzZXIgPT09IHRydWUgJiYgcHJvcHNbcHJvcE5hbWVdICYmIHByb3BzW3Byb3BOYW1lXS5ub2RlVHlwZSAhPT0gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RyYWdnYWJsZVxcJ3Mgb2Zmc2V0UGFyZW50IG11c3QgYmUgYSBET00gTm9kZS4nKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogYGdyaWRgIHNwZWNpZmllcyB0aGUgeCBhbmQgeSB0aGF0IGRyYWdnaW5nIHNob3VsZCBzbmFwIHRvLlxuICAgICAqL1xuICAgIGdyaWQ6IFByb3BUeXBlcy5hcnJheU9mKFByb3BUeXBlcy5udW1iZXIpLFxuXG4gICAgLyoqXG4gICAgICogYGhhbmRsZWAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCBhcyB0aGUgaGFuZGxlIHRoYXQgaW5pdGlhdGVzIGRyYWcuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgaGFuZGxlPVwiLmhhbmRsZVwiPlxuICAgICAqICAgICAgICAgICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJoYW5kbGVcIj5DbGljayBtZSB0byBkcmFnPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2PlRoaXMgaXMgc29tZSBvdGhlciBjb250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgaGFuZGxlOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGNhbmNlbGAgc3BlY2lmaWVzIGEgc2VsZWN0b3IgdG8gYmUgdXNlZCB0byBwcmV2ZW50IGRyYWcgaW5pdGlhbGl6YXRpb24uXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICByZXR1cm4oXG4gICAgICogICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGNhbmNlbD1cIi5jYW5jZWxcIj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjYW5jZWxcIj5Zb3UgY2FuJ3QgZHJhZyBmcm9tIGhlcmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIDxkaXY+RHJhZ2dpbmcgaGVyZSB3b3JrcyBmaW5lPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBjYW5jZWw6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdGFydHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIG9uU3RhcnQ6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoaWxlIGRyYWdnaW5nLlxuICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgYm9vbGVhbiBmYWxzZSwgZHJhZ2dpbmcgd2lsbCBiZSBjYW5jZWxlZC5cbiAgICAgKi9cbiAgICBvbkRyYWc6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RvcHMuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCB0aGUgZHJhZyB3aWxsIHJlbWFpbiBhY3RpdmUuXG4gICAgICovXG4gICAgb25TdG9wOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIEEgd29ya2Fyb3VuZCBvcHRpb24gd2hpY2ggY2FuIGJlIHBhc3NlZCBpZiBvbk1vdXNlRG93biBuZWVkcyB0byBiZSBhY2Nlc3NlZCxcbiAgICAgKiBzaW5jZSBpdCdsbCBhbHdheXMgYmUgYmxvY2tlZCAoYXMgdGhlcmUgaXMgaW50ZXJuYWwgdXNlIG9mIG9uTW91c2VEb3duKVxuICAgICAqL1xuICAgIG9uTW91c2VEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWVcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIGFsbG93QW55Q2xpY2s6IGZhbHNlLCAvLyBieSBkZWZhdWx0IG9ubHkgYWNjZXB0IGxlZnQgY2xpY2tcbiAgICBjYW5jZWw6IG51bGwsXG4gICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiB0cnVlLFxuICAgIG9mZnNldFBhcmVudDogbnVsbCxcbiAgICBoYW5kbGU6IG51bGwsXG4gICAgZ3JpZDogbnVsbCxcbiAgICB0cmFuc2Zvcm06IG51bGwsXG4gICAgb25TdGFydDogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25EcmFnOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvblN0b3A6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uTW91c2VEb3duOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleVVwOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICB9O1xuXG4gIHN0YXRlID0ge1xuICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAvLyBVc2VkIHdoaWxlIGRyYWdnaW5nIHRvIGRldGVybWluZSBkZWx0YXMuXG4gICAgbGFzdFg6IE5hTiwgbGFzdFk6IE5hTixcbiAgICB0b3VjaElkZW50aWZpZXI6IG51bGxcbiAgfTtcblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAvLyBSZW1vdmUgYW55IGxlZnRvdmVyIGV2ZW50IGhhbmRsZXJzLiBSZW1vdmUgYm90aCB0b3VjaCBhbmQgbW91c2UgaGFuZGxlcnMgaW4gY2FzZVxuICAgIC8vIHNvbWUgYnJvd3NlciBxdWlyayBjYXVzZWQgYSB0b3VjaCBldmVudCB0byBmaXJlIGR1cmluZyBhIG1vdXNlIG1vdmUsIG9yIHZpY2UgdmVyc2EuXG4gICAgY29uc3QgdGhpc05vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgIGNvbnN0IHsgb3duZXJEb2N1bWVudCB9ID0gdGhpc05vZGU7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IubW91c2UubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLnRvdWNoLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMob3duZXJEb2N1bWVudCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlRHJhZ1N0YXJ0OiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gTWFrZSBpdCBwb3NzaWJsZSB0byBhdHRhY2ggZXZlbnQgaGFuZGxlcnMgb24gdG9wIG9mIHRoaXMgb25lLiAgIFxuICAgIHRoaXMucHJvcHMub25Nb3VzZURvd24oZSk7XG5cbiAgICAvLyBPbmx5IGFjY2VwdCBsZWZ0LWNsaWNrcy5cbiAgICBpZiAoIXRoaXMucHJvcHMuYWxsb3dBbnlDbGljayAmJiB0eXBlb2YgZS5idXR0b24gPT09ICdudW1iZXInICYmIGUuYnV0dG9uICE9PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBHZXQgbm9kZXMuIEJlIHN1cmUgdG8gZ3JhYiByZWxhdGl2ZSBkb2N1bWVudCAoY291bGQgYmUgaWZyYW1lZClcbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICghdGhpc05vZGUgfHwgIXRoaXNOb2RlLm93bmVyRG9jdW1lbnQgfHwgIXRoaXNOb2RlLm93bmVyRG9jdW1lbnQuYm9keSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCc8RHJhZ2dhYmxlQ29yZT4gbm90IG1vdW50ZWQgb24gRHJhZ1N0YXJ0IScpO1xuICAgIH1cbiAgICBjb25zdCB7IG93bmVyRG9jdW1lbnQgfSA9IHRoaXNOb2RlO1xuXG4gICAgLy8gU2hvcnQgY2lyY3VpdCBpZiBoYW5kbGUgb3IgY2FuY2VsIHByb3Agd2FzIHByb3ZpZGVkIGFuZCBzZWxlY3RvciBkb2Vzbid0IG1hdGNoLlxuICAgIGlmICh0aGlzLnByb3BzLmRpc2FibGVkIHx8XG4gICAgICAoIShlLnRhcmdldCBpbnN0YW5jZW9mIG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuTm9kZSkpIHx8XG4gICAgICAodGhpcy5wcm9wcy5oYW5kbGUgJiYgIW1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlLnRhcmdldCwgdGhpcy5wcm9wcy5oYW5kbGUsIHRoaXNOb2RlKSkgfHxcbiAgICAgICh0aGlzLnByb3BzLmNhbmNlbCAmJiBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZS50YXJnZXQsIHRoaXMucHJvcHMuY2FuY2VsLCB0aGlzTm9kZSkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2V0IHRvdWNoIGlkZW50aWZpZXIgaW4gY29tcG9uZW50IHN0YXRlIGlmIHRoaXMgaXMgYSB0b3VjaCBldmVudC4gVGhpcyBhbGxvd3MgdXMgdG9cbiAgICAvLyBkaXN0aW5ndWlzaCBiZXR3ZWVuIGluZGl2aWR1YWwgdG91Y2hlcyBvbiBtdWx0aXRvdWNoIHNjcmVlbnMgYnkgaWRlbnRpZnlpbmcgd2hpY2hcbiAgICAvLyB0b3VjaHBvaW50IHdhcyBzZXQgdG8gdGhpcyBlbGVtZW50LlxuICAgIGNvbnN0IHRvdWNoSWRlbnRpZmllciA9IGdldFRvdWNoSWRlbnRpZmllcihlKTtcbiAgICB0aGlzLnNldFN0YXRlKHsgdG91Y2hJZGVudGlmaWVyIH0pO1xuXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IGRyYWcgcG9pbnQgZnJvbSB0aGUgZXZlbnQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgb2Zmc2V0LlxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUsIHRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjsgLy8gbm90IHBvc3NpYmxlIGJ1dCBzYXRpc2ZpZXMgZmxvd1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9zaXRpb247XG5cbiAgICAvLyBDcmVhdGUgYW4gZXZlbnQgb2JqZWN0IHdpdGggYWxsIHRoZSBkYXRhIHBhcmVudHMgbmVlZCB0byBtYWtlIGEgZGVjaXNpb24gaGVyZS5cbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0YXJ0OiAlaicsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIGNhbmNlbC5cbiAgICBsb2coJ2NhbGxpbmcnLCB0aGlzLnByb3BzLm9uU3RhcnQpO1xuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25TdGFydChlLCBjb3JlRXZlbnQpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAvLyBBZGQgYSBzdHlsZSB0byB0aGUgYm9keSB0byBkaXNhYmxlIHVzZXItc2VsZWN0LiBUaGlzIHByZXZlbnRzIHRleHQgZnJvbVxuICAgIC8vIGJlaW5nIHNlbGVjdGVkIGFsbCBvdmVyIHRoZSBwYWdlLlxuICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSBhZGRVc2VyU2VsZWN0U3R5bGVzKG93bmVyRG9jdW1lbnQpO1xuXG4gICAgLy8gSW5pdGlhdGUgZHJhZ2dpbmcuIFNldCB0aGUgY3VycmVudCB4IGFuZCB5IGFzIG9mZnNldHNcbiAgICAvLyBzbyB3ZSBrbm93IGhvdyBtdWNoIHdlJ3ZlIG1vdmVkIGR1cmluZyB0aGUgZHJhZy4gVGhpcyBhbGxvd3MgdXNcbiAgICAvLyB0byBkcmFnIGVsZW1lbnRzIGFyb3VuZCBldmVuIGlmIHRoZXkgaGF2ZSBiZWVuIG1vdmVkLCB3aXRob3V0IGlzc3VlLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IHRydWUsXG5cbiAgICAgIGxhc3RYOiB4LFxuICAgICAgbGFzdFk6IHlcbiAgICB9KTtcblxuICAgIC8vIEFkZCBldmVudHMgdG8gdGhlIGRvY3VtZW50IGRpcmVjdGx5IHNvIHdlIGNhdGNoIHdoZW4gdGhlIHVzZXIncyBtb3VzZS90b3VjaCBtb3ZlcyBvdXRzaWRlIG9mXG4gICAgLy8gdGhpcyBlbGVtZW50LiBXZSB1c2UgZGlmZmVyZW50IGV2ZW50cyBkZXBlbmRpbmcgb24gd2hldGhlciBvciBub3Qgd2UgaGF2ZSBkZXRlY3RlZCB0aGF0IHRoaXNcbiAgICAvLyBpcyBhIHRvdWNoLWNhcGFibGUgZGV2aWNlLlxuICAgIGFkZEV2ZW50KG93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgIGFkZEV2ZW50KG93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgfTtcblxuICBoYW5kbGVEcmFnOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG5cbiAgICAvLyBQcmV2ZW50IHNjcm9sbGluZyBvbiBtb2JpbGUgZGV2aWNlcywgbGlrZSBpcGFkL2lwaG9uZS5cbiAgICBpZiAoZS50eXBlID09PSAndG91Y2htb3ZlJykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gR2V0IHRoZSBjdXJyZW50IGRyYWcgcG9pbnQgZnJvbSB0aGUgZXZlbnQuIFRoaXMgaXMgdXNlZCBhcyB0aGUgb2Zmc2V0LlxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUsIHRoaXMuc3RhdGUudG91Y2hJZGVudGlmaWVyLCB0aGlzKTtcbiAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuO1xuICAgIGxldCB7IHgsIHkgfSA9IHBvc2l0aW9uO1xuXG4gICAgLy8gU25hcCB0byBncmlkIGlmIHByb3AgaGFzIGJlZW4gcHJvdmlkZWRcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnByb3BzLmdyaWQpKSB7XG4gICAgICBsZXQgZGVsdGFYID0geCAtIHRoaXMuc3RhdGUubGFzdFgsIGRlbHRhWSA9IHkgLSB0aGlzLnN0YXRlLmxhc3RZO1xuICAgICAgW2RlbHRhWCwgZGVsdGFZXSA9IHNuYXBUb0dyaWQodGhpcy5wcm9wcy5ncmlkLCBkZWx0YVgsIGRlbHRhWSk7XG4gICAgICBpZiAoIWRlbHRhWCAmJiAhZGVsdGFZKSByZXR1cm47IC8vIHNraXAgdXNlbGVzcyBkcmFnXG4gICAgICB4ID0gdGhpcy5zdGF0ZS5sYXN0WCArIGRlbHRhWCwgeSA9IHRoaXMuc3RhdGUubGFzdFkgKyBkZWx0YVk7XG4gICAgfVxuXG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWc6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgdHJpZ2dlciBlbmQuXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgY29yZUV2ZW50KTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gJEZsb3dJZ25vcmVcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnU3RvcChuZXcgTW91c2VFdmVudCgnbW91c2V1cCcpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBPbGQgYnJvd3NlcnNcbiAgICAgICAgY29uc3QgZXZlbnQgPSAoKGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpOiBhbnkpOiBNb3VzZVRvdWNoRXZlbnQpO1xuICAgICAgICAvLyBJIHNlZSB3aHkgdGhpcyBpbnNhbml0eSB3YXMgZGVwcmVjYXRlZFxuICAgICAgICAvLyAkRmxvd0lnbm9yZVxuICAgICAgICBldmVudC5pbml0TW91c2VFdmVudCgnbW91c2V1cCcsIHRydWUsIHRydWUsIHdpbmRvdywgMCwgMCwgMCwgMCwgMCwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuICAgICAgICB0aGlzLmhhbmRsZURyYWdTdG9wKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGxhc3RYOiB4LFxuICAgICAgbGFzdFk6IHlcbiAgICB9KTtcbiAgfTtcblxuICBoYW5kbGVEcmFnU3RvcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuO1xuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgY29uc3QgeyB4LCB5IH0gPSBwb3NpdGlvbjtcbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgdXNlci1zZWxlY3QgaGFja1xuICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXModGhpc05vZGUub3duZXJEb2N1bWVudCk7XG4gICAgfVxuXG4gICAgLy8gbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnU3RvcDogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gUmVzZXQgdGhlIGVsLlxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgbGFzdFg6IE5hTixcbiAgICAgIGxhc3RZOiBOYU5cbiAgICB9KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlclxuICAgIHRoaXMucHJvcHMub25TdG9wKGUsIGNvcmVFdmVudCk7XG5cbiAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgIC8vIFJlbW92ZSBldmVudCBoYW5kbGVyc1xuICAgICAgLy8gbG9nKCdEcmFnZ2FibGVDb3JlOiBSZW1vdmluZyBoYW5kbGVycycpO1xuICAgICAgcmVtb3ZlRXZlbnQodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudCh0aGlzTm9kZS5vd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3Iuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgfVxuICB9O1xuXG4gIG9uTW91c2VEb3duOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlOyAvLyBvbiB0b3VjaHNjcmVlbiBsYXB0b3BzIHdlIGNvdWxkIHN3aXRjaCBiYWNrIHRvIG1vdXNlXG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RhcnQoZSk7XG4gIH07XG5cbiAgb25Nb3VzZVVwOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgLy8gU2FtZSBhcyBvbk1vdXNlRG93biAoc3RhcnQgZHJhZyksIGJ1dCBub3cgY29uc2lkZXIgdGhpcyBhIHRvdWNoIGRldmljZS5cbiAgb25Ub3VjaFN0YXJ0OiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uVG91Y2hFbmQ6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICAvLyBXZSdyZSBvbiBhIHRvdWNoIGRldmljZSBub3csIHNvIGNoYW5nZSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IudG91Y2g7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RvcChlKTtcbiAgfTtcblxuICBvbktleVVwOiBhbnkgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlVcChlKVxuICB9XG4gIG9uS2V5RG93bjogYW55ID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihlKVxuICB9XG4gIHJlbmRlcigpIHtcbiAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKSwge1xuICAgICAgc3R5bGU6IHN0eWxlSGFja3ModGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5zdHlsZSksXG5cbiAgICAgIC8vIE5vdGU6IG1vdXNlTW92ZSBoYW5kbGVyIGlzIGF0dGFjaGVkIHRvIGRvY3VtZW50IHNvIGl0IHdpbGwgc3RpbGwgZnVuY3Rpb25cbiAgICAgIC8vIHdoZW4gdGhlIHVzZXIgZHJhZ3MgcXVpY2tseSBhbmQgbGVhdmVzIHRoZSBib3VuZHMgb2YgdGhlIGVsZW1lbnQuXG4gICAgICBvbk1vdXNlRG93bjogdGhpcy5vbk1vdXNlRG93bixcbiAgICAgIG9uVG91Y2hTdGFydDogdGhpcy5vblRvdWNoU3RhcnQsXG4gICAgICBvbk1vdXNlVXA6IHRoaXMub25Nb3VzZVVwLFxuICAgICAgb25Ub3VjaEVuZDogdGhpcy5vblRvdWNoRW5kLFxuICAgICAgb25LZXlVcDogdGhpcy5vbktleVVwLFxuICAgICAgb25LZXlEb3duOiB0aGlzLm9uS2V5RG93bixcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUNvcmUuanMiLCIvLyBAZmxvd1xuLyplc2xpbnQgbm8tY29uc29sZTowKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkRSQUdHQUJMRV9ERUJVRykgY29uc29sZS5sb2coLi4uYXJncyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvbG9nLmpzIiwidmFyIERyYWdnYWJsZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZScpLmRlZmF1bHQ7XG5cbi8vIFByZXZpb3VzIHZlcnNpb25zIG9mIHRoaXMgbGliIGV4cG9ydGVkIDxEcmFnZ2FibGU+IGFzIHRoZSByb290IGV4cG9ydC4gQXMgdG8gbm90IGJyZWFrXG4vLyB0aGVtLCBvciBUeXBlU2NyaXB0LCB3ZSBleHBvcnQgKmJvdGgqIGFzIHRoZSByb290IGFuZCBhcyAnZGVmYXVsdCcuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL3B1bGwvMjU0XG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy8yNjZcbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUNvcmUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVDb3JlJykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUFsaWduR3VpZGUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVBbGlnbkd1aWRlJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGNyZWF0ZUNTU1RyYW5zZm9ybSwgY3JlYXRlU1ZHVHJhbnNmb3JtIH0gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuaW1wb3J0IHsgY2FuRHJhZ1gsIGNhbkRyYWdZLCBjcmVhdGVEcmFnZ2FibGVEYXRhLCBnZXRCb3VuZFBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9wb3NpdGlvbkZucyc7XG5pbXBvcnQgeyBkb250U2V0TWUgfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBEcmFnZ2FibGVDb3JlIGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgdHlwZSB7IENvbnRyb2xQb3NpdGlvbiwgRHJhZ2dhYmxlQm91bmRzLCBEcmFnZ2FibGVDb3JlUHJvcHMgfSBmcm9tICcuL0RyYWdnYWJsZUNvcmUnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5pbXBvcnQgdHlwZSB7IERyYWdnYWJsZUV2ZW50SGFuZGxlciB9IGZyb20gJy4vdXRpbHMvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBFbGVtZW50IGFzIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcblxudHlwZSBEcmFnZ2FibGVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGRyYWdnZWQ6IGJvb2xlYW4sXG4gIHg6IG51bWJlciwgeTogbnVtYmVyLFxuICBzbGFja1g6IG51bWJlciwgc2xhY2tZOiBudW1iZXIsXG4gIGlzRWxlbWVudFNWRzogYm9vbGVhbixcbiAgZm9jdXNlZDogYm9vbGVhbixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZVByb3BzID0ge1xuICAuLi4kRXhhY3Q8RHJhZ2dhYmxlQ29yZVByb3BzPixcbiAgYXhpczogJ2JvdGgnIHwgJ3gnIHwgJ3knIHwgJ25vbmUnLFxuICBib3VuZHM6IERyYWdnYWJsZUJvdW5kcyB8IHN0cmluZyB8IGZhbHNlLFxuICBkZWZhdWx0Q2xhc3NOYW1lOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogc3RyaW5nLFxuICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZDogc3RyaW5nLFxuICBkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZDogc3RyaW5nLFxuICBkZWZhdWx0UG9zaXRpb246IENvbnRyb2xQb3NpdGlvbixcbiAgcG9zaXRpb246IENvbnRyb2xQb3NpdGlvbixcbiAgb25LZXlVcDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5TW92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIGtleU1vdmVFbmFibGVkOiBib29sZWFuLFxuICBrZXlNb3ZlU3BlZWQ6IG51bWJlcixcbiAgZGVncmVlOiBudW1iZXIsXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGU+XG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8RHJhZ2dhYmxlUHJvcHMsIERyYWdnYWJsZVN0YXRlPiB7XG5cbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0RyYWdnYWJsZSc7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvLyBBY2NlcHRzIGFsbCBwcm9wcyA8RHJhZ2dhYmxlQ29yZT4gYWNjZXB0cy5cbiAgICAuLi5EcmFnZ2FibGVDb3JlLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIGBheGlzYCBkZXRlcm1pbmVzIHdoaWNoIGF4aXMgdGhlIGRyYWdnYWJsZSBjYW4gbW92ZS5cbiAgICAgKlxuICAgICAqICBOb3RlIHRoYXQgYWxsIGNhbGxiYWNrcyB3aWxsIHN0aWxsIHJldHVybiBkYXRhIGFzIG5vcm1hbC4gVGhpcyBvbmx5XG4gICAgICogIGNvbnRyb2xzIGZsdXNoaW5nIHRvIHRoZSBET00uXG4gICAgICpcbiAgICAgKiAnYm90aCcgYWxsb3dzIG1vdmVtZW50IGhvcml6b250YWxseSBhbmQgdmVydGljYWxseS5cbiAgICAgKiAneCcgbGltaXRzIG1vdmVtZW50IHRvIGhvcml6b250YWwgYXhpcy5cbiAgICAgKiAneScgbGltaXRzIG1vdmVtZW50IHRvIHZlcnRpY2FsIGF4aXMuXG4gICAgICogJ25vbmUnIGxpbWl0cyBhbGwgbW92ZW1lbnQuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byAnYm90aCcuXG4gICAgICovXG4gICAgYXhpczogUHJvcFR5cGVzLm9uZU9mKFsnYm90aCcsICd4JywgJ3knLCAnbm9uZSddKSxcblxuICAgIC8qKlxuICAgICAqIGBib3VuZHNgIGRldGVybWluZXMgdGhlIHJhbmdlIG9mIG1vdmVtZW50IGF2YWlsYWJsZSB0byB0aGUgZWxlbWVudC5cbiAgICAgKiBBdmFpbGFibGUgdmFsdWVzIGFyZTpcbiAgICAgKlxuICAgICAqICdwYXJlbnQnIHJlc3RyaWN0cyBtb3ZlbWVudCB3aXRoaW4gdGhlIERyYWdnYWJsZSdzIHBhcmVudCBub2RlLlxuICAgICAqXG4gICAgICogQWx0ZXJuYXRpdmVseSwgcGFzcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMsIGFsbCBvZiB3aGljaCBhcmUgb3B0aW9uYWw6XG4gICAgICpcbiAgICAgKiB7bGVmdDogTEVGVF9CT1VORCwgcmlnaHQ6IFJJR0hUX0JPVU5ELCBib3R0b206IEJPVFRPTV9CT1VORCwgdG9wOiBUT1BfQk9VTkR9XG4gICAgICpcbiAgICAgKiBBbGwgdmFsdWVzIGFyZSBpbiBweC5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBib3VuZHM9e3tyaWdodDogMzAwLCBib3R0b206IDMwMH19PlxuICAgICAqICAgICAgICAgICAgICA8ZGl2PkNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGJvdW5kczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICByaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBib3R0b206IFByb3BUeXBlcy5udW1iZXJcbiAgICAgIH0pLFxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5vbmVPZihbZmFsc2VdKVxuICAgIF0pLFxuXG4gICAgZGVmYXVsdENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgZGVmYXVsdFBvc2l0aW9uYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCB0aGUgZHJhZ2dlZCBpdGVtIHNob3VsZCBzdGFydCBhdFxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgZGVmYXVsdFBvc2l0aW9uPXt7eDogMjUsIHk6IDI1fX0+XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgPGRpdj5JIHN0YXJ0IHdpdGggdHJhbnNmb3JtWDogMjVweCBhbmQgdHJhbnNmb3JtWTogMjVweDs8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICAgICApO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGRlZmF1bHRQb3NpdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBgcG9zaXRpb25gLCBpZiBwcmVzZW50LCBkZWZpbmVzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50LlxuICAgICAqXG4gICAgICogIFRoaXMgaXMgc2ltaWxhciB0byBob3cgZm9ybSBlbGVtZW50cyBpbiBSZWFjdCB3b3JrIC0gaWYgbm8gYHBvc2l0aW9uYCBpcyBzdXBwbGllZCwgdGhlIGNvbXBvbmVudFxuICAgICAqICBpcyB1bmNvbnRyb2xsZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICAgICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgICAgICAgPERyYWdnYWJsZSBwb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBkb250U2V0TWUsXG4gICAgc3R5bGU6IGRvbnRTZXRNZSxcbiAgICB0cmFuc2Zvcm06IGRvbnRTZXRNZSxcbiAgICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5TW92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TW92ZUVuYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGtleU1vdmVTcGVlZDogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIGRlZmF1bHRDbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZycsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gICAgZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZm9jdXNlZCcsXG4gICAgZGVmYXVsdFBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICBwb3NpdGlvbjogbnVsbCxcbiAgICBvbktleVVwOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5TW92ZTogZnVuY3Rpb24oKSB7IH0sXG4gICAga2V5TW92ZUVuYWJsZWQ6IHRydWUsXG4gICAga2V5TW92ZVNwZWVkOiAyNTBcbiAgfTtcblxuICBhdXRvU3RlcFRpbWVyID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogRHJhZ2dhYmxlUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgaGF2ZSBiZWVuIGRyYWdnZWQgYmVmb3JlLlxuICAgICAgZHJhZ2dlZDogZmFsc2UsXG5cbiAgICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgICB4OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnggOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueCxcbiAgICAgIHk6IHByb3BzLnBvc2l0aW9uID8gcHJvcHMucG9zaXRpb24ueSA6IHByb3BzLmRlZmF1bHRQb3NpdGlvbi55LFxuXG4gICAgICAvLyBVc2VkIGZvciBjb21wZW5zYXRpbmcgZm9yIG91dC1vZi1ib3VuZHMgZHJhZ3NcbiAgICAgIHNsYWNrWDogMCwgc2xhY2tZOiAwLFxuXG4gICAgICAvLyBDYW4gb25seSBkZXRlcm1pbmUgaWYgU1ZHIGFmdGVyIG1vdW50aW5nXG4gICAgICBpc0VsZW1lbnRTVkc6IGZhbHNlLFxuXG4gICAgICBmb2N1c2VkOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucG9zaXRpb24gJiYgISh0aGlzLnByb3BzLm9uRHJhZyB8fCB0aGlzLnByb3BzLm9uU3RvcCkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgY29uc29sZS53YXJuKCdBIGBwb3NpdGlvbmAgd2FzIGFwcGxpZWQgdG8gdGhpcyA8RHJhZ2dhYmxlPiwgd2l0aG91dCBkcmFnIGhhbmRsZXJzLiBUaGlzIHdpbGwgbWFrZSB0aGlzICcgK1xuICAgICAgICAnY29tcG9uZW50IGVmZmVjdGl2ZWx5IHVuZHJhZ2dhYmxlLiBQbGVhc2UgYXR0YWNoIGBvbkRyYWdgIG9yIGBvblN0b3BgIGhhbmRsZXJzIHNvIHlvdSBjYW4gYWRqdXN0IHRoZSAnICtcbiAgICAgICAgJ2Bwb3NpdGlvbmAgb2YgdGhpcyBlbGVtZW50LicpO1xuICAgIH1cbiAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGVsZW1lbnQgcGFzc2VkIGlzIGFuIGluc3RhbmNlb2YgU1ZHRWxlbWVudFxuICAgIGlmICh0eXBlb2Ygd2luZG93LlNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VsZW1lbnRTVkc6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuc3RvcE1vdmUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBPYmplY3QpIHtcbiAgICAvLyBTZXQgeC95IGlmIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgaWYgKG5leHRQcm9wcy5wb3NpdGlvbiAmJlxuICAgICAgKCF0aGlzLnByb3BzLnBvc2l0aW9uIHx8XG4gICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi54ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnggfHxcbiAgICAgICAgbmV4dFByb3BzLnBvc2l0aW9uLnkgIT09IHRoaXMucHJvcHMucG9zaXRpb24ueVxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IG5leHRQcm9wcy5wb3NpdGlvbi54LCB5OiBuZXh0UHJvcHMucG9zaXRpb24ueSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZHJhZ2dpbmc6IGZhbHNlIH0pOyAvLyBwcmV2ZW50cyBpbnZhcmlhbnQgaWYgdW5tb3VudGVkIHdoaWxlIGRyYWdnaW5nXG4gIH1cblxuICBvbkRyYWdTdGFydDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgLy8gbG9nKCdEcmFnZ2FibGU6IG9uRHJhZ1N0YXJ0OiAlaicsIGNvcmVEYXRhKTtcblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBjb25zdCBzaG91bGRTdGFydCA9IHRoaXMucHJvcHMub25TdGFydChlLCBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKSk7XG4gICAgLy8gS2lsbHMgc3RhcnQgZXZlbnQgb24gY29yZSBhcyB3ZWxsLCBzbyBtb3ZlIGhhbmRsZXJzIGFyZSBuZXZlciBib3VuZC5cbiAgICBpZiAoc2hvdWxkU3RhcnQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZHJhZ2dpbmc6IHRydWUsIGRyYWdnZWQ6IHRydWUgfSk7XG4gIH07XG5cbiAgb25EcmFnOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIgPSAoZSwgY29yZURhdGEpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBsb2coJ0RyYWdnYWJsZTogb25EcmFnOiAlaicsIGNvcmVEYXRhKTtcbiAgICBjb25zdCB1aURhdGEgPSBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKTtcbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIHg6IHVpRGF0YS54LFxuICAgICAgeTogdWlEYXRhLnlcbiAgICB9O1xuXG4gICAgLy8gS2VlcCB3aXRoaW4gYm91bmRzLlxuICAgIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgLy8gU2F2ZSBvcmlnaW5hbCB4IGFuZCB5LlxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBuZXdTdGF0ZTtcblxuICAgICAgLy8gQWRkIHNsYWNrIHRvIHRoZSB2YWx1ZXMgdXNlZCB0byBjYWxjdWxhdGUgYm91bmQgcG9zaXRpb24uIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCBpZlxuICAgICAgLy8gd2Ugc3RhcnQgcmVtb3Zpbmcgc2xhY2ssIHRoZSBlbGVtZW50IHdvbid0IHJlYWN0IHRvIGl0IHJpZ2h0IGF3YXkgdW50aWwgaXQncyBiZWVuXG4gICAgICAvLyBjb21wbGV0ZWx5IHJlbW92ZWQuXG4gICAgICBuZXdTdGF0ZS54ICs9IHRoaXMuc3RhdGUuc2xhY2tYO1xuICAgICAgbmV3U3RhdGUueSArPSB0aGlzLnN0YXRlLnNsYWNrWTtcblxuICAgICAgLy8gR2V0IGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgY2VpbC9mbG9vciB0aGUgeCBhbmQgeSB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuXG4gICAgICBjb25zdCBbbmV3U3RhdGVYLCBuZXdTdGF0ZVldID0gZ2V0Qm91bmRQb3NpdGlvbih0aGlzLCBuZXdTdGF0ZS54LCBuZXdTdGF0ZS55KTtcbiAgICAgIG5ld1N0YXRlLnggPSBuZXdTdGF0ZVg7XG4gICAgICBuZXdTdGF0ZS55ID0gbmV3U3RhdGVZO1xuXG4gICAgICAvLyBSZWNhbGN1bGF0ZSBzbGFjayBieSBub3RpbmcgaG93IG11Y2ggd2FzIHNoYXZlZCBieSB0aGUgYm91bmRQb3NpdGlvbiBoYW5kbGVyLlxuICAgICAgbmV3U3RhdGUuc2xhY2tYID0gdGhpcy5zdGF0ZS5zbGFja1ggKyAoeCAtIG5ld1N0YXRlLngpO1xuICAgICAgbmV3U3RhdGUuc2xhY2tZID0gdGhpcy5zdGF0ZS5zbGFja1kgKyAoeSAtIG5ld1N0YXRlLnkpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGV2ZW50IHdlIGZpcmUgdG8gcmVmbGVjdCB3aGF0IHJlYWxseSBoYXBwZW5lZCBhZnRlciBib3VuZHMgdG9vayBlZmZlY3QuXG4gICAgICB1aURhdGEueCA9IG5ld1N0YXRlLng7XG4gICAgICB1aURhdGEueSA9IG5ld1N0YXRlLnk7XG4gICAgICB1aURhdGEuZGVsdGFYID0gbmV3U3RhdGUueCAtIHRoaXMuc3RhdGUueDtcbiAgICAgIHVpRGF0YS5kZWx0YVkgPSBuZXdTdGF0ZS55IC0gdGhpcy5zdGF0ZS55O1xuICAgIH1cblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uRHJhZyhlLCB1aURhdGEpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBsb2coJ29uRHJhZyBuZXdTdGF0ZScsIG5ld1N0YXRlKVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuXG4gIG9uRHJhZ1N0b3A6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuICAgIGNvbnN0IHNob3VsZFN0b3AgPSB0aGlzLnByb3BzLm9uU3RvcChlLCBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKSk7XG4gICAgaWYgKHNob3VsZFN0b3AgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZTogb25EcmFnU3RvcDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHNsYWNrWDogMCxcbiAgICAgIHNsYWNrWTogMFxuICAgIH07XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgY29udHJvbGxlZCBjb21wb25lbnQsIHRoZSByZXN1bHQgb2YgdGhpcyBvcGVyYXRpb24gd2lsbCBiZSB0b1xuICAgIC8vIHJldmVydCBiYWNrIHRvIHRoZSBvbGQgcG9zaXRpb24uIFdlIGV4cGVjdCBhIGhhbmRsZXIgb24gYG9uRHJhZ1N0b3BgLCBhdCB0aGUgbGVhc3QuXG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgaWYgKGNvbnRyb2xsZWQpIHtcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcbiAgICAgIG5ld1N0YXRlLnggPSB4O1xuICAgICAgbmV3U3RhdGUueSA9IHk7XG4gICAgfVxuICAgIGxvZygnb25EcmFnU3RvcCBuZXdTdGF0ZScsIG5ld1N0YXRlKVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuICBzdG9wTW92ZTogYW55ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmF1dG9TdGVwVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmF1dG9TdGVwVGltZXIpO1xuICAgIH1cbiAgfVxuICBvbktleU1vdmU6IGFueSA9IChlKSA9PiB7XG4gICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIGlmIChlICYmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSAzOSB8fCBlLmtleUNvZGUgPT09IDQwKSkge1xuICAgICAgaWYgKGUucGVyc2lzdCkge1xuICAgICAgICBlLnBlcnNpc3QoKVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBsZXQgX3ggPSB4O1xuICAgICAgbGV0IF95ID0geTtcbiAgICAgIC8vIGxvZygnb25LZXlVcCcsIGUua2V5Q29kZSlcbiAgICAgIC8vIGxvZygnb25LZXlVcCcsIGUua2V5Q29kZSwgdGhpcy5zdGF0ZSlcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIC8vIOW3plxuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIF94IC09IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOS4ilxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIF95IC09IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOWPs1xuICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgIF94ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOS4i1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgIF95ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHsgeDogX3gsIHk6IF95IH1cbiAgICAgIHRoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25LZXlNb3ZlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25LZXlNb3ZlKGUsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b1N0ZXBUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgfSwgdGhpcy5wcm9wcy5rZXlNb3ZlU3BlZWQpO1xuICAgIH1cbiAgfVxuICBvbktleVVwOiBhbnkgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmtleU1vdmVFbmFibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAvLyB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25LZXlVcChlKTtcbiAgfTtcbiAgb25LZXlEb3duOiBhbnkgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmtleU1vdmVFbmFibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGUpO1xuICB9XG4gIG1vdmVTbmFwaW5nOiBhbnkgPSAoc25hcCA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyB4RGlzdGFuY2UsIHlEaXN0YW5jZSwgc25hcFRyZXNoaG9sZCB9ID0gc25hcDtcblxuICAgIGxvZygneCx5JywgeERpc3RhbmNlLCB5RGlzdGFuY2UpXG5cbiAgICBpZiAoeERpc3RhbmNlICYmIE1hdGguYWJzKHhEaXN0YW5jZSkgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IHRoaXMuc3RhdGUueCArIHhEaXN0YW5jZSB9KVxuICAgIH1cblxuICAgIGlmICh5RGlzdGFuY2UgJiYgTWF0aC5hYnMoeURpc3RhbmNlKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgeTogdGhpcy5zdGF0ZS55ICsgeURpc3RhbmNlIH0pXG4gICAgfVxuICB9XG4gIGdldCBwb3NpdGlvblJvdGF0ZSgpOiBhbnkge1xuICAgIGNvbnN0IGNvbnRyb2xsZWQgPSBCb29sZWFuKHRoaXMucHJvcHMucG9zaXRpb24pO1xuICAgIGNvbnN0IGRyYWdnYWJsZSA9ICFjb250cm9sbGVkIHx8IHRoaXMuc3RhdGUuZHJhZ2dpbmc7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnByb3BzLnBvc2l0aW9uIHx8IHRoaXMucHJvcHMuZGVmYXVsdFBvc2l0aW9uO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBjYW5EcmFnWCh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnggOlxuICAgICAgICBwb3NpdGlvbi54LFxuXG4gICAgICAvLyBTZXQgdG9wIGlmIHZlcnRpY2FsIGRyYWcgaXMgZW5hYmxlZFxuICAgICAgeTogY2FuRHJhZ1kodGhpcykgJiYgZHJhZ2dhYmxlID9cbiAgICAgICAgdGhpcy5zdGF0ZS55IDpcbiAgICAgICAgcG9zaXRpb24ueSxcbiAgICAgIGRlZ3JlZTogTnVtYmVyKHRoaXMucHJvcHMuZGVncmVlKSB8fCAwXG4gICAgfVxuICB9XG4gIHJlbmRlcigpOiBSZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgbGV0IHN0eWxlID0ge30sIHN2Z1RyYW5zZm9ybSA9IG51bGw7XG5cbiAgICAvLyBJZiB0aGlzIGlzIGNvbnRyb2xsZWQsIHdlIGRvbid0IHdhbnQgdG8gbW92ZSBpdCAtIHVubGVzcyBpdCdzIGRyYWdnaW5nLlxuICAgIGNvbnN0IHRyYW5zZm9ybU9wdHMgPSB0aGlzLnBvc2l0aW9uUm90YXRlO1xuICAgIC8vIGxvZygncmVuZGVyIHRyYW5zZm9ybU9wdHMnLCB0cmFuc2Zvcm1PcHRzKTtcbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgd2FzIFNWRywgd2UgdXNlIHRoZSBgdHJhbnNmb3JtYCBhdHRyaWJ1dGUuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNFbGVtZW50U1ZHKSB7XG4gICAgICBzdmdUcmFuc2Zvcm0gPSBjcmVhdGVTVkdUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBhIENTUyB0cmFuc2Zvcm0gdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmQuIFRoaXMgYWxsb3dzIHVzIHRvIG1vdmUgdGhlIGVsZW1lbnQgYXJvdW5kXG4gICAgICAvLyB3aXRob3V0IHdvcnJ5aW5nIGFib3V0IHdoZXRoZXIgb3Igbm90IGl0IGlzIHJlbGF0aXZlbHkgb3IgYWJzb2x1dGVseSBwb3NpdGlvbmVkLlxuICAgICAgLy8gSWYgdGhlIGl0ZW0geW91IGFyZSBkcmFnZ2luZyBhbHJlYWR5IGhhcyBhIHRyYW5zZm9ybSBzZXQsIHdyYXAgaXQgaW4gYSA8c3Bhbj4gc28gPERyYWdnYWJsZT5cbiAgICAgIC8vIGhhcyBhIGNsZWFuIHNsYXRlLlxuICAgICAgc3R5bGUgPSBjcmVhdGVDU1NUcmFuc2Zvcm0odHJhbnNmb3JtT3B0cyk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgZGVmYXVsdENsYXNzTmFtZSxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyxcbiAgICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZUZvY3VzZWRcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIC8vIE1hcmsgd2l0aCBjbGFzcyB3aGlsZSBkcmFnZ2luZ1xuICAgIGNvbnN0IGNsYXNzTmFtZSA9IGNsYXNzTmFtZXMoKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuY2xhc3NOYW1lIHx8ICcnKSwgZGVmYXVsdENsYXNzTmFtZSwge1xuICAgICAgW2RlZmF1bHRDbGFzc05hbWVEcmFnZ2luZ106IHRoaXMuc3RhdGUuZHJhZ2dpbmcsXG4gICAgICBbZGVmYXVsdENsYXNzTmFtZURyYWdnZWRdOiB0aGlzLnN0YXRlLmRyYWdnZWQsXG4gICAgICBbZGVmYXVsdENsYXNzTmFtZUZvY3VzZWRdOiB0aGlzLnN0YXRlLmZvY3VzZWRcbiAgICB9KTtcblxuICAgIC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgcmV0dXJuIChcbiAgICAgIDxEcmFnZ2FibGVDb3JlIHJlZj17KGUpID0+IHsgdGhpcy5kcmFnZ2FibGVDb3JlID0gZTsgfX0gey4uLnRoaXMucHJvcHN9IG9uU3RhcnQ9e3RoaXMub25EcmFnU3RhcnR9IG9uRHJhZz17dGhpcy5vbkRyYWd9IG9uU3RvcD17dGhpcy5vbkRyYWdTdG9wfSBvbktleVVwPXt0aGlzLm9uS2V5VXB9IG9uS2V5RG93bj17dGhpcy5vbktleURvd259ID5cbiAgICAgICAge1xuICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybSxcbiAgICAgICAgICAgIHRhYkluZGV4OiAtMSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L0RyYWdnYWJsZUNvcmU+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZS5qcyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuY29uc3QgcHJlZml4ZXMgPSBbJ01veicsICdXZWJraXQnLCAnTycsICdtcyddO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWZpeChwcm9wOiBzdHJpbmc9J3RyYW5zZm9ybScpOiBzdHJpbmcge1xuICAvLyBDaGVja2luZyBzcGVjaWZpY2FsbHkgZm9yICd3aW5kb3cuZG9jdW1lbnQnIGlzIGZvciBwc2V1ZG8tYnJvd3NlciBzZXJ2ZXItc2lkZVxuICAvLyBlbnZpcm9ubWVudHMgdGhhdCBkZWZpbmUgJ3dpbmRvdycgYXMgdGhlIGdsb2JhbCBjb250ZXh0LlxuICAvLyBFLmcuIFJlYWN0LXJhaWxzIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3QtcmFpbHMvcHVsbC84NClcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJyc7XG5cbiAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG4gIGlmIChwcm9wIGluIHN0eWxlKSByZXR1cm4gJyc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChicm93c2VyUHJlZml4VG9LZXkocHJvcCwgcHJlZml4ZXNbaV0pIGluIHN0eWxlKSByZXR1cm4gcHJlZml4ZXNbaV07XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4VG9LZXkocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgJHtwcmVmaXh9JHtrZWJhYlRvVGl0bGVDYXNlKHByb3ApfWAgOiBwcm9wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeFRvU3R5bGUocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgLSR7cHJlZml4LnRvTG93ZXJDYXNlKCl9LSR7cHJvcH1gIDogcHJvcDtcbn1cblxuZnVuY3Rpb24ga2ViYWJUb1RpdGxlQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSAnJztcbiAgbGV0IHNob3VsZENhcGl0YWxpemUgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzaG91bGRDYXBpdGFsaXplKSB7XG4gICAgICBvdXQgKz0gc3RyW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgICBzaG91bGRDYXBpdGFsaXplID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPT09ICctJykge1xuICAgICAgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCArPSBzdHJbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIERlZmF1bHQgZXhwb3J0IGlzIHRoZSBwcmVmaXggaXRzZWxmLCBsaWtlICdNb3onLCAnV2Via2l0JywgZXRjXG4vLyBOb3RlIHRoYXQgeW91IG1heSBoYXZlIHRvIHJlLXRlc3QgZm9yIGNlcnRhaW4gdGhpbmdzOyBmb3IgaW5zdGFuY2UsIENocm9tZSA1MFxuLy8gY2FuIGhhbmRsZSB1bnByZWZpeGVkIGB0cmFuc2Zvcm1gLCBidXQgbm90IHVucHJlZml4ZWQgYHVzZXItc2VsZWN0YFxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJlZml4KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvZ2V0UHJlZml4LmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7XG4gIGFkZEV2ZW50LCByZW1vdmVFdmVudCxcbn0gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuXG5jb25zdCBldmVudHNGb3IgPSB7XG4gIHRvdWNoOiB7XG4gICAgc3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBzdG9wOiAndG91Y2hlbmQnXG4gIH0sXG4gIG1vdXNlOiB7XG4gICAgc3RhcnQ6ICdtb3VzZWRvd24nLFxuICAgIG1vdmU6ICdtb3VzZW1vdmUnLFxuICAgIHN0b3A6ICdtb3VzZXVwJ1xuICB9XG59O1xuXG5jb25zdCByZW1vdmUgPSBmdW5jdGlvbihhcnJheSwgZnJvbSwgdG8pIHtcbiAgdmFyIHJlc3QgPSBhcnJheS5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFycmF5Lmxlbmd0aCk7XG4gIGFycmF5Lmxlbmd0aCA9IGZyb20gPCAwID8gYXJyYXkubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gIHJldHVybiBhcnJheS5wdXNoLmFwcGx5KGFycmF5LCByZXN0KTtcbn07XG5cbmNvbnN0IHJlbW92ZUVudHJ5ID0gZnVuY3Rpb24oYXJyYXksIGVudHJ5KSB7XG4gIHZhciBpbmRleCA9IGFycmF5LmluZGV4T2YoZW50cnkpO1xuICBpZiAoaW5kZXggIT09IC0xKSByZW1vdmUoYXJyYXksIGluZGV4KTtcbn07XG5cbmNvbnN0IGdldFRhcmdldCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gIHJldHVybiBldmVudC5jdXJyZW50VGFyZ2V0IHx8IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlQWxpZ25HdWlkZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGVBbGlnbkd1aWRlJztcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICBzbmFwVHJlc2hob2xkOiBQcm9wVHlwZXMubnVibWVyLFxuICAgIG9uU25hcGluZzogUHJvcFR5cGVzLmZ1bmMsXG4gICAgc2VsZWN0b3I6IFByb3BUeXBlcy5zdHJpbmcsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBzbmFwVHJlc2hob2xkOiA1LFxuICAgIHNlbGVjdG9yOiAnLnJlYWN0LWRyYWdnYWJsZScsXG4gICAgb25TbmFwaW5nOiAoKSA9PiB7IH0sXG4gIH07XG4gIGVkZ2VzID0gbnVsbDtcbiAgc3RhdGljR3VpZGVzID0gbnVsbDtcbiAgeCA9IDA7XG4gIHkgPSAwO1xuICBtb3VzZU9mZnNldFggPSAwO1xuICBtb3VzZU9mZnNldFkgPSAwO1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBib3hlczogW10sXG4gICAgICBzbmFwVHJlc2hob2xkOiBwcm9wcy5zbmFwVHJlc2hob2xkIHx8IDUsXG4gICAgICBtaW5pbXVtRGlzdGFuY2U6IDEwLFxuICAgICAgb2Zmc2V0OiBudWxsLFxuICAgICAgc3RhdGljR3VpZGVzOiBudWxsLFxuICAgICAgYXhpczogW11cbiAgICB9XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZXNldFN0YXRpY0d1aWRlcygpO1xuXG4gICAgdGhpcy5jaGFydCgpO1xuICB9XG5cbiAgY2hhcnQoKSB7XG4gICAgdGhpcy5yZXNldEVkZ2VzKCk7XG4gICAgLy8gdGhpcy5kaXN0YW5jZXMgPSBuZXcgT2JqZWN0KCk7XG4gICAgY29uc3QgYm94ZXMgPSB0aGlzLmJveGVzO1xuICAgIGNvbnN0IHBhcmVudFJlY3QgPSB0aGlzLmNsaWVudFJlY3Q7XG4gICAgaWYgKGJveGVzICYmIGJveGVzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYm94ZXMpIHtcbiAgICAgICAgaWYgKGJveGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb25zdCBib3ggPSBib3hlc1trZXldO1xuICAgICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IGludGVyZXN0UG9pbnRzID0gdGhpcy5nZXRJbnRlcmVzdFBvaW50cyh7XG4gICAgICAgICAgICB4OiB4IC0gcGFyZW50UmVjdC54LFxuICAgICAgICAgICAgeTogeSAtIHBhcmVudFJlY3QueSxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgcmlnaHQ6IHggLSBwYXJlbnRSZWN0LnggKyB3aWR0aCxcbiAgICAgICAgICAgIGJvdHRvbTogeSAtIHBhcmVudFJlY3QueSArIGhlaWdodCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmVkZ2VzLngucHVzaC5hcHBseSh0aGlzLmVkZ2VzLngsIGludGVyZXN0UG9pbnRzLngpO1xuICAgICAgICAgIHRoaXMuZWRnZXMueS5wdXNoLmFwcGx5KHRoaXMuZWRnZXMueSwgaW50ZXJlc3RQb2ludHMueSk7XG5cbiAgICAgICAgICBjb25zdCBndWlkZSA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ3VpZGUnKTtcbiAgICAgICAgICBpZiAoIWd1aWRlKSB7XG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKCdkYXRhLWd1aWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGFkZEV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0YXJ0LCAoZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0VG9EcmFnKGUsIGJveClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2hvd0FsbEd1aWRlcygpO1xuICB9XG4gIHN0YXJ0VG9EcmFnKGV2ZW50LCBib3gpIHtcbiAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIGNvbnN0IHJlY3QgPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgX3N0YXJ0WCA9IHJlY3QueCAtIHBhcmVudFJlY3QueDtcbiAgICBjb25zdCBfc3RhcnRZID0gcmVjdC55IC0gcGFyZW50UmVjdC55O1xuICAgIHRoaXMubW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVggLSByZWN0LmxlZnQ7XG4gICAgdGhpcy5tb3VzZU9mZnNldFkgPSBldmVudC5wYWdlWSAtIHJlY3QudG9wO1xuICAgIC8vIGNvbnNvbGUubG9nKCdib3ggc3RhcnRUb0RyYWcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0JywgcmVjdCwgdGhpcy5tb3VzZU9mZnNldFgpXG4gICAgLy8gY29uc29sZS5sb2coJ2Rpc3RhbmNlIC0gcG9zaXRpb24nLCBldmVudC5wYWdlWCwgdGhpcy5tb3VzZU9mZnNldFgpO1xuXG4gICAgdGhpcy5leGNsdWRlQm94Zm9ybUVkZ2VzKHtcbiAgICAgIHg6IF9zdGFydFgsXG4gICAgICB5OiBfc3RhcnRZLFxuICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgIH0pO1xuICAgIC8vIHRoaXMuZXhjbHVkZUJveEZyb21EaXN0YW5jZXMoKTtcbiAgICB0aGlzLnNob3dBbGxHdWlkZXMoKTtcblxuICAgIHRoaXMuZHJhZyhldmVudCk7XG5cbiAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmRyYWcpO1xuICAgIGFkZEV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuc3RvcFRvRHJhZyk7XG4gIH1cbiAgZHJhZyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJveCA9IGdldFRhcmdldChldmVudCk7XG4gICAgY29uc3QgcmVjdCA9IGJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IGRyYWcnLCBldmVudClcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIHRoaXMueCA9IGV2ZW50LnBhZ2VYIC0gcGFyZW50UmVjdC5sZWZ0IC0gdGhpcy5tb3VzZU9mZnNldFg7XG4gICAgLy8gdGhpcy54ID0gZXZlbnQucGFnZVggLSBwYXJlbnRSZWN0LmxlZnQgLSAoZXZlbnQucGFnZVggLSByZWN0LmxlZnQpO1xuICAgIHRoaXMueSA9IGV2ZW50LnBhZ2VZIC0gcGFyZW50UmVjdC50b3AgLSB0aGlzLm1vdXNlT2Zmc2V0WTtcbiAgICAvLyBjb25zb2xlLmxvZygnZ2V0Qm91bmRpbmdDbGllbnRSZWN0JywgZXZlbnQucGFnZVgsIHBhcmVudFJlY3QubGVmdCwgdGhpcy5tb3VzZU9mZnNldFgsIHRoaXMueClcbiAgICB0aGlzLnNuYXBUb0d1aWRlcyh7IGJveCwgcGFyZW50UmVjdCB9KTtcbiAgfVxuICBzdG9wVG9EcmFnID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYm94ID0gZ2V0VGFyZ2V0KGV2ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IHN0b3BUb0RyYWcnLCBldmVudClcbiAgICB0aGlzLmxvY2tlZEF4aXMgPSBudWxsO1xuICAgIHRoaXMuY2hhcnQoKTtcbiAgICB0aGlzLnJlbW92ZUd1aWRlcygpO1xuICAgIHJlbW92ZUV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuZHJhZyk7XG4gICAgcmVtb3ZlRXZlbnQoYm94LCBldmVudHNGb3IubW91c2Uuc3RvcCwgdGhpcy5zdG9wVG9EcmFnKTtcbiAgfVxuICBzbmFwVG9HdWlkZXMoeyBib3gsIHBhcmVudFJlY3QgfSkge1xuICAgIGNvbnN0IHJlY3QgPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICB0aGlzLnJlbW92ZUd1aWRlcygpO1xuXG4gICAgY29uc3QgYXhpcyA9IFtdO1xuXG4gICAgY29uc3QgeEF4aXMgPSB0aGlzLnNuYXAoe1xuICAgICAgcGFyZW50UmVjdCxcbiAgICAgIHJlY3QsXG4gICAgICBheGlzOiAneCdcbiAgICB9KTtcblxuICAgIGlmICh4QXhpcykge1xuICAgICAgYXhpcy5wdXNoKHhBeGlzKVxuICAgIH1cblxuICAgIGNvbnN0IHlBeGlzID0gdGhpcy5zbmFwKHtcbiAgICAgIHBhcmVudFJlY3QsXG4gICAgICByZWN0LFxuICAgICAgYXhpczogJ3knXG4gICAgfSk7XG5cbiAgICBpZiAoeUF4aXMpIHtcbiAgICAgIGF4aXMucHVzaCh5QXhpcylcbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBheGlzIH0sICgpID0+IHtcbiAgICAgICAgYXhpcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgLy8gdGhpcy5wcm9wcy5vblNuYXBpbmcoaXRlbSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vblNuYXBpbmcoe1xuICAgICAgeERpc3RhbmNlOiB0aGlzLnggLSAocmVjdC54IC0gcGFyZW50UmVjdC54KSxcbiAgICAgIHlEaXN0YW5jZTogdGhpcy55IC0gKHJlY3QueSAtIHBhcmVudFJlY3QueSksXG4gICAgICBzbmFwVHJlc2hob2xkOiB0aGlzLnN0YXRlLnNuYXBUcmVzaGhvbGRcbiAgICB9KVxuICB9XG4gIHNuYXAoeyBwYXJlbnRSZWN0LCByZWN0LCBheGlzIH0pIHtcbiAgICBjb25zdCB7IHNuYXBUcmVzaGhvbGQgfSA9IHRoaXMuc3RhdGVcbiAgICBjb25zdCBzaWRlID0gYXhpcyA9PT0gJ3gnID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuICAgIGNvbnN0IHN0YXJ0ID0gYXhpcyA9PT0gJ3gnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgY29uc3QgZW5kID0gYXhpcyA9PT0gJ3gnID8gJ3JpZ2h0JyA6ICdib3R0b20nO1xuICAgIGNvbnN0IGVkZ2VzID0gdGhpcy5lZGdlc1theGlzXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWRnZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHBvc2l0aW9uID0gZWRnZXNbaV07XG4gICAgICBjb25zdCBkaXN0YW5jZSA9IHRoaXNbYXhpc107XG4gICAgICBjb25zdCBoYWxmU2lkZUxlbmd0aCA9IE1hdGguYWJzKHJlY3Rbc2lkZV0gLyAyKTtcbiAgICAgIGNvbnN0IGNlbnRlciA9IGRpc3RhbmNlICsgaGFsZlNpZGVMZW5ndGg7XG4gICAgICBjb25zdCBlbmREaXN0YW5jZSA9IGRpc3RhbmNlICsgcmVjdFtzaWRlXTtcbiAgICAgIGxldCBzZXRHdWlkZSA9IGZhbHNlO1xuXG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UgLSBwb3NpdGlvbikgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgICB0aGlzW2F4aXNdID0gcG9zaXRpb247XG4gICAgICAgIHNldEd1aWRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoY2VudGVyIC0gcG9zaXRpb24pIDw9IHNuYXBUcmVzaGhvbGQpIHtcbiAgICAgICAgdGhpc1theGlzXSA9IHBvc2l0aW9uIC0gaGFsZlNpZGVMZW5ndGg7IC8vIG1vdmUgc25hcCBiZWhhdmlvciBcbiAgICAgICAgc2V0R3VpZGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhlbmREaXN0YW5jZSAtIHBvc2l0aW9uKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICAgIHRoaXNbYXhpc10gPSBwb3NpdGlvbiAtIHJlY3Rbc2lkZV07IC8vIG1vdmUgc25hcCBiZWhhdmlvciAgICAgXG4gICAgICAgIHNldEd1aWRlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNldEd1aWRlKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzdWNjZXNzIGF4aXMgcG9zaXRpb24gbW92ZURpc3RhbmNlJywgYXhpcywgcG9zaXRpb24pXG4gICAgICAgIHJldHVybiB7IGF4aXMsIHBvc2l0aW9uIH1cbiAgICAgICAgLy8gdGhpcy5wYXJlbnQucmVuZGVyR3VpZGUoYXhpcywgcG9zaXRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBleGNsdWRlQm94Zm9ybUVkZ2VzKHJlY3QpIHtcbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLngsIHJlY3QueClcbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLngsIHJlY3QueCArIE1hdGgucm91bmQocmVjdC53aWR0aCAvIDIpKVxuICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueCwgcmVjdC54ICsgcmVjdC53aWR0aClcblxuICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueSwgcmVjdC55KVxuICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueSwgcmVjdC55ICsgTWF0aC5yb3VuZChyZWN0LmhlaWdodCAvIDIpKVxuICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpXG4gIH1cbiAgc2hvd0FsbEd1aWRlcygpIHtcblxuICB9XG4gIHJlbW92ZUd1aWRlcygpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGF4aXM6IFtdXG4gICAgfSlcbiAgfVxuXG4gIGdldEludGVyZXN0UG9pbnRzKGJveCkge1xuICAgIHJldHVybiB7XG4gICAgICB4OiBbYm94LngsIGJveC54ICsgTWF0aC5yb3VuZChib3gud2lkdGggLyAyKSwgYm94LnJpZ2h0XSxcbiAgICAgIHk6IFtib3gueSwgYm94LnkgKyBNYXRoLnJvdW5kKGJveC5oZWlnaHQgLyAyKSwgYm94LmJvdHRvbV1cbiAgICB9O1xuICB9XG4gIHJlc2V0U3RhdGljR3VpZGVzKCkge1xuICAgIGNvbnN0IGNsaWVudFJlY3QgPSB0aGlzLmNsaWVudFJlY3Q7XG4gICAgdGhpcy5zdGF0aWNHdWlkZXMgPSB7XG4gICAgICB4OiBbMCwgTWF0aC5yb3VuZChjbGllbnRSZWN0LndpZHRoIC8gMiksIGNsaWVudFJlY3Qud2lkdGhdLFxuICAgICAgeTogWzAsIE1hdGgucm91bmQoY2xpZW50UmVjdC5oZWlnaHQgLyAyKSwgY2xpZW50UmVjdC5oZWlnaHRdXG4gICAgfTtcbiAgfVxuXG4gIHJlc2V0RWRnZXMoKSB7XG4gICAgLy8gLnNsaWNlKCkgdG8gb25seSBjb3B5IHRoZW0gLSBvdGhlcndpc2UgYSByZWZlcmVuY2Ugd291bGQgZ2V0IGNyZWF0ZWRcbiAgICB0aGlzLmVkZ2VzID0ge1xuICAgICAgeDogdGhpcy5zdGF0aWNHdWlkZXMueC5zbGljZSgpLFxuICAgICAgeTogdGhpcy5zdGF0aWNHdWlkZXMueS5zbGljZSgpXG4gICAgfTtcbiAgfVxuXG4gIGdldCBib3hlcygpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnByb3BzLnNlbGVjdG9yKVxuICB9XG4gIGdldCBjbGllbnRSZWN0KCkge1xuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgcmV0dXJuIHRoaXNOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgcmVuZGVyR3VpZGUoeyBheGlzLCBwb3NpdGlvbiwgYWRkaXRpb25hbENsYXNzIH0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gJ2d1aWRlIGF4aXMtJyArIGF4aXM7XG4gICAgaWYgKGFkZGl0aW9uYWxDbGFzcykgY2xhc3NOYW1lICs9IFwiIFwiICsgYWRkaXRpb25hbENsYXNzO1xuXG4gICAgY29uc3QgX3N0eWxlcyA9IHt9XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgX3N0eWxlcy5sZWZ0ID0gcG9zaXRpb24gKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc3R5bGVzLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17X3N0eWxlc30gLz4pXG4gIH1cbiAgcmVuZGVyQXhpcygpIHtcbiAgICBjb25zdCB7IGF4aXMgfSA9IHRoaXMuc3RhdGVcblxuICAgIGlmIChheGlzICYmIGF4aXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYXhpcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyR3VpZGUoaXRlbSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0F4aXNYLCBzaG93QXhpc1kgfSA9IHRoaXMuc3RhdGU7XG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9PlxuICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICB7dGhpcy5yZW5kZXJBeGlzKCl9XG4gICAgPC9kaXY+KVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwic291cmNlUm9vdCI6IiJ9