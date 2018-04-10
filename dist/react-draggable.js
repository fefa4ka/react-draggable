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
  onMoveSnap: PropTypes.func,
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
        _this.setState({ x: _this.state.x + xDistance }, function () {
          _this.props.onMoveSnap(_extends({}, _this.state));
          console.log('this.state', _this.state);
        });
      }

      if (yDistance && Math.abs(yDistance) <= snapTreshhold) {
        _this.setState({ y: _this.state.y + yDistance }, function () {
          _this.props.onMoveSnap(_extends({}, _this.state));
          console.log('this.state', _this.state);
        });
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
      var _classNames;

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
        _extends({}, this.props, {
          onStart: this.onDragStart,
          onDrag: this.onDrag,
          onStop: this.onDragStop,
          onKeyUp: this.onKeyUp,
          onKeyDown: this.onKeyDown }),
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
  onMoveSnap: _propTypes2.default.func,
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
  onMoveSnap: function onMoveSnap() {},
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
        var _position = edges[i];
        var distance = this[axis];
        var halfSideLength = Math.abs(rect[side] / 2);
        var center = distance + halfSideLength;
        var endDistance = distance + rect[side];
        var setGuide = false;

        if (Math.abs(distance - _position) <= snapTreshhold) {
          this[axis] = _position;
          setGuide = true;
        } else if (Math.abs(center - _position) <= snapTreshhold) {
          this[axis] = _position - halfSideLength; // move snap behavior 
          setGuide = true;
        } else if (Math.abs(endDistance - _position) <= snapTreshhold) {
          this[axis] = _position - rect[side]; // move snap behavior     
          setGuide = true;
        }

        if (setGuide) {
          // console.log('success axis position moveDistance', axis, position)
          return { axis: axis, position: _position
            // this.parent.renderGuide(axis, position);
          };
        }
      }
    }
  }, {
    key: 'excludeBoxformEdges',
    value: function excludeBoxformEdges(rect) {
      if (this.edges) {
        if (this.edges.x) {
          removeEntry(this.edges.x, rect.x);
          removeEntry(this.edges.x, rect.x + Math.round(rect.width / 2));
          removeEntry(this.edges.x, rect.x + rect.width);
        }

        if (this.edges.y) {
          removeEntry(this.edges.y, rect.y);
          removeEntry(this.edges.y, rect.y + Math.round(rect.height / 2));
          removeEntry(this.edges.y, rect.y + rect.height);
        }
      }
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
      var string = _ref3.axis,
          number = _ref3.position,
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
      return thisNode.getBoundingClientRect && thisNode.getBoundingClientRect();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIDY1Zjk0ZDMyOTM2NDFlNzNjY2U0IiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifSIsIi4uLy4vbGliL3V0aWxzL2RvbUZucy5qcyIsIi4uLy4vbGliL3V0aWxzL3NoaW1zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwiLi4vLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLi4vLi9saWIvdXRpbHMvbG9nLmpzIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4vbGliL3V0aWxzL2dldFByZWZpeC5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwibmFtZXMiOlsibWF0Y2hlc1NlbGVjdG9yIiwibWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsIm91dGVySGVpZ2h0Iiwib3V0ZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm9mZnNldFhZRnJvbVBhcmVudCIsImNyZWF0ZUNTU1RyYW5zZm9ybSIsImNyZWF0ZVNWR1RyYW5zZm9ybSIsImdldFRvdWNoIiwiZ2V0VG91Y2hJZGVudGlmaWVyIiwiYWRkVXNlclNlbGVjdFN0eWxlcyIsInJlbW92ZVVzZXJTZWxlY3RTdHlsZXMiLCJzdHlsZUhhY2tzIiwiYWRkQ2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3NOYW1lIiwibWF0Y2hlc1NlbGVjdG9yRnVuYyIsImVsIiwic2VsZWN0b3IiLCJtZXRob2QiLCJjYWxsIiwiYmFzZU5vZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsImV2ZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbXB1dGVkU3R5bGUiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImV2dCIsIm9mZnNldFBhcmVudCIsImlzQm9keSIsImJvZHkiLCJvZmZzZXRQYXJlbnRSZWN0IiwibGVmdCIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwic2Nyb2xsTGVmdCIsInkiLCJjbGllbnRZIiwic2Nyb2xsVG9wIiwiZGVncmVlIiwiY3NzU3R5bGUiLCJlIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJkb2MiLCJzdHlsZUVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImlkIiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsImNoaWxkU3R5bGUiLCJ0b3VjaEFjdGlvbiIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsIm1hdGNoIiwiUmVnRXhwIiwicmVtb3ZlIiwicmVwbGFjZSIsImZpbmRJbkFycmF5IiwiaXNGdW5jdGlvbiIsImlzTnVtIiwiaW50IiwiZG9udFNldE1lIiwiYXJyYXkiLCJjYWxsYmFjayIsImkiLCJsZW5ndGgiLCJhcHBseSIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm51bSIsImlzTmFOIiwiYSIsInBhcnNlSW50IiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJFcnJvciIsImdldEJvdW5kUG9zaXRpb24iLCJzbmFwVG9HcmlkIiwiY2FuRHJhZ1giLCJjYW5EcmFnWSIsImdldENvbnRyb2xQb3NpdGlvbiIsImNyZWF0ZUNvcmVEYXRhIiwiY3JlYXRlRHJhZ2dhYmxlRGF0YSIsImRyYWdnYWJsZSIsImJvdW5kcyIsImNsb25lQm91bmRzIiwiZmluZERPTU5vZGUiLCJvd25lcldpbmRvdyIsImJvdW5kTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MRWxlbWVudCIsIm5vZGVTdHlsZSIsImJvdW5kTm9kZVN0eWxlIiwib2Zmc2V0TGVmdCIsIm1hcmdpbkxlZnQiLCJvZmZzZXRUb3AiLCJtYXJnaW5Ub3AiLCJyaWdodCIsIm1hcmdpblJpZ2h0IiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwiTWF0aCIsIm1pbiIsIm1heCIsImdyaWQiLCJwZW5kaW5nWCIsInBlbmRpbmdZIiwicm91bmQiLCJheGlzIiwidG91Y2hJZGVudGlmaWVyIiwiZHJhZ2dhYmxlQ29yZSIsInRvdWNoT2JqIiwic3RhdGUiLCJpc1N0YXJ0IiwibGFzdFgiLCJkZWx0YVgiLCJkZWx0YVkiLCJsYXN0WSIsImNvcmVEYXRhIiwiZXZlbnRzRm9yIiwidG91Y2giLCJzdGFydCIsIm1vdmUiLCJzdG9wIiwibW91c2UiLCJkcmFnRXZlbnRGb3IiLCJEcmFnZ2FibGVDb3JlIiwiZHJhZ2dpbmciLCJOYU4iLCJoYW5kbGVEcmFnU3RhcnQiLCJvbk1vdXNlRG93biIsImFsbG93QW55Q2xpY2siLCJidXR0b24iLCJ0aGlzTm9kZSIsImRpc2FibGVkIiwidGFyZ2V0IiwiTm9kZSIsImhhbmRsZSIsImNhbmNlbCIsInNldFN0YXRlIiwicG9zaXRpb24iLCJjb3JlRXZlbnQiLCJvblN0YXJ0Iiwic2hvdWxkVXBkYXRlIiwiZW5hYmxlVXNlclNlbGVjdEhhY2siLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJhZ1N0b3AiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiaXNBcnJheSIsIm9uRHJhZyIsIk1vdXNlRXZlbnQiLCJlcnIiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJvblN0b3AiLCJvbk1vdXNlVXAiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25LZXlVcCIsIm9uS2V5RG93biIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkcmVuIiwic3R5bGUiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJwcm9jZXNzIiwiYnJvd3NlciIsIm5vZGVUeXBlIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsInRyYW5zZm9ybSIsImRlZmF1bHRQcm9wcyIsImxvZyIsIkRyYWdnYWJsZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkRyYWdnYWJsZUFsaWduR3VpZGUiLCJhdXRvU3RlcFRpbWVyIiwib25EcmFnU3RhcnQiLCJzaG91bGRTdGFydCIsImRyYWdnZWQiLCJ1aURhdGEiLCJuZXdTdGF0ZSIsInNsYWNrWCIsInNsYWNrWSIsIm5ld1N0YXRlWCIsIm5ld1N0YXRlWSIsIm9uRHJhZ1N0b3AiLCJzaG91bGRTdG9wIiwiY29udHJvbGxlZCIsIkJvb2xlYW4iLCJzdG9wTW92ZSIsImNsZWFyVGltZW91dCIsIm9uS2V5TW92ZSIsImtleUNvZGUiLCJwZXJzaXN0IiwiX3giLCJfeSIsInNldFRpbWVvdXQiLCJrZXlNb3ZlU3BlZWQiLCJrZXlNb3ZlRW5hYmxlZCIsIm1vdmVTbmFwaW5nIiwic25hcCIsInhEaXN0YW5jZSIsInlEaXN0YW5jZSIsInNuYXBUcmVzaGhvbGQiLCJhYnMiLCJvbk1vdmVTbmFwIiwiY29uc29sZSIsImRlZmF1bHRQb3NpdGlvbiIsImlzRWxlbWVudFNWRyIsImZvY3VzZWQiLCJ3YXJuIiwiU1ZHRWxlbWVudCIsIm5leHRQcm9wcyIsInN2Z1RyYW5zZm9ybSIsInRyYW5zZm9ybU9wdHMiLCJwb3NpdGlvblJvdGF0ZSIsImRlZmF1bHRDbGFzc05hbWUiLCJkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmciLCJkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZCIsImRlZmF1bHRDbGFzc05hbWVGb2N1c2VkIiwidGFiSW5kZXgiLCJOdW1iZXIiLCJvbmVPZiIsIm9uZU9mVHlwZSIsInNoYXBlIiwiZ2V0UHJlZml4IiwiYnJvd3NlclByZWZpeFRvS2V5IiwiYnJvd3NlclByZWZpeFRvU3R5bGUiLCJwcmVmaXhlcyIsInByb3AiLCJkb2N1bWVudEVsZW1lbnQiLCJwcmVmaXgiLCJrZWJhYlRvVGl0bGVDYXNlIiwidG9Mb3dlckNhc2UiLCJzdHIiLCJvdXQiLCJzaG91bGRDYXBpdGFsaXplIiwidG9VcHBlckNhc2UiLCJmcm9tIiwidG8iLCJyZXN0Iiwic2xpY2UiLCJwdXNoIiwicmVtb3ZlRW50cnkiLCJlbnRyeSIsImluZGV4IiwiaW5kZXhPZiIsImdldFRhcmdldCIsImN1cnJlbnRUYXJnZXQiLCJzcmNFbGVtZW50IiwiZWRnZXMiLCJzdGF0aWNHdWlkZXMiLCJtb3VzZU9mZnNldFgiLCJtb3VzZU9mZnNldFkiLCJkcmFnIiwiYm94IiwicmVjdCIsInBhcmVudFJlY3QiLCJjbGllbnRSZWN0IiwicGFnZVgiLCJwYWdlWSIsInNuYXBUb0d1aWRlcyIsInN0b3BUb0RyYWciLCJsb2NrZWRBeGlzIiwiY2hhcnQiLCJyZW1vdmVHdWlkZXMiLCJib3hlcyIsIm1pbmltdW1EaXN0YW5jZSIsIm9mZnNldCIsInJlc2V0U3RhdGljR3VpZGVzIiwicmVzZXRFZGdlcyIsImtleSIsImhhc093blByb3BlcnR5IiwiaW50ZXJlc3RQb2ludHMiLCJnZXRJbnRlcmVzdFBvaW50cyIsImd1aWRlIiwiZ2V0QXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwic3RhcnRUb0RyYWciLCJzaG93QWxsR3VpZGVzIiwiX3N0YXJ0WCIsIl9zdGFydFkiLCJleGNsdWRlQm94Zm9ybUVkZ2VzIiwieEF4aXMiLCJ5QXhpcyIsImZvckVhY2giLCJpdGVtIiwib25TbmFwaW5nIiwic2lkZSIsImVuZCIsImRpc3RhbmNlIiwiaGFsZlNpZGVMZW5ndGgiLCJjZW50ZXIiLCJlbmREaXN0YW5jZSIsInNldEd1aWRlIiwiYWRkaXRpb25hbENsYXNzIiwiX3N0eWxlcyIsIm1hcCIsInJlbmRlckd1aWRlIiwic2hvd0F4aXNYIiwic2hvd0F4aXNZIiwicmVuZGVyQXhpcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJudWJtZXIiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNB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QUFLSSxLQURYLENBQ0hKLElBREc7OztBQUdYLFVBQUlBLFFBQVFBLEtBQUs5QyxNQUFqQixFQUF5QjtBQUN2QixlQUFPOEMsS0FBS3dNLEdBQUwsQ0FBUyxVQUFDWCxJQUFELEVBQVU7QUFDeEIsaUJBQU8sT0FBS1ksV0FBTCxDQUFpQlosSUFBakIsQ0FBUDtBQUNELFNBRk0sQ0FBUDtBQUdEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7NkJBQ1E7QUFBQSxtQkFDMEIsS0FBS3pMLEtBRC9CO0FBQUEsVUFDQ3NNLFNBREQsVUFDQ0EsU0FERDtBQUFBLFVBQ1lDLFNBRFosVUFDWUEsU0FEWjtBQUVQO0FBQ0E7O0FBQ0EsYUFBUTtBQUFBO0FBQVMsYUFBSy9PLEtBQWQ7QUFDTCxhQUFLQSxLQUFMLENBQVc2RixRQUROO0FBRUwsYUFBS21KLFVBQUw7QUFGSyxPQUFSO0FBSUQ7Ozt3QkF2Q1c7QUFDVixhQUFPL0osU0FBU2dLLGdCQUFULENBQTBCLEtBQUtqUCxLQUFMLENBQVd4RixRQUFyQyxDQUFQO0FBQ0Q7Ozt3QkFDZ0I7QUFDZixVQUFNcUosV0FBVyxtQkFBUy9DLFdBQVQsQ0FBcUIsSUFBckIsQ0FBakI7QUFDQSxhQUFPK0MsU0FBU2xILHFCQUFULElBQWtDa0gsU0FBU2xILHFCQUFULEVBQXpDO0FBQ0Q7Ozs7RUFuUDhDLGdCQUFNb0osUzs7QUFBbENrQixtQixDQUNaakIsVyxHQUFjLHFCO0FBREZpQixtQixDQUVaaEIsUyxHQUFZO0FBQ2pCNkMsaUJBQWUsb0JBQVVvRyxNQURSO0FBRWpCaEIsYUFBVyxvQkFBVTFPLElBRko7QUFHakJoRixZQUFVLG9CQUFVZ007QUFISCxDO0FBRkFTLG1CLENBUVpQLFksR0FBZTtBQUNwQm9DLGlCQUFlLENBREs7QUFFcEJ0TyxZQUFVLGtCQUZVO0FBR3BCMFQsYUFBVyxxQkFBTSxDQUFHO0FBSEEsQztrQkFSSGpILG1CIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1kcmFnZ2FibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdC1kb21cIiksIHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdC1kb21cIiwgXCJyZWFjdFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0LWRvbVwiKSwgcmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdERyYWdnYWJsZVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0RE9NXCJdLCByb290W1wiUmVhY3RcIl0pO1xufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXykge1xucmV0dXJuIFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjVmOTRkMzI5MzY0MWU3M2NjZTQiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMF9fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdC1kb21cIixcImNvbW1vbmpzMlwiOlwicmVhY3QtZG9tXCIsXCJhbWRcIjpcInJlYWN0LWRvbVwiLFwicm9vdFwiOlwiUmVhY3RET01cIn1cbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB7IGZpbmRJbkFycmF5LCBpc0Z1bmN0aW9uLCBpbnQgfSBmcm9tICcuL3NoaW1zJztcbmltcG9ydCBicm93c2VyUHJlZml4LCB7IGJyb3dzZXJQcmVmaXhUb0tleSB9IGZyb20gJy4vZ2V0UHJlZml4JztcblxuaW1wb3J0IHR5cGUge0NvbnRyb2xQb3NpdGlvbiwgTW91c2VUb3VjaEV2ZW50IH0gZnJvbSAnLi90eXBlcyc7XG5cbmxldCBtYXRjaGVzU2VsZWN0b3JGdW5jID0gJyc7XG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKGVsOiBOb2RlLCBzZWxlY3Rvcjogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmICghbWF0Y2hlc1NlbGVjdG9yRnVuYykge1xuICAgIG1hdGNoZXNTZWxlY3RvckZ1bmMgPSBmaW5kSW5BcnJheShbXG4gICAgICAnbWF0Y2hlcycsXG4gICAgICAnd2Via2l0TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdtb3pNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21zTWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdvTWF0Y2hlc1NlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgICAgcmV0dXJuIGlzRnVuY3Rpb24oZWxbbWV0aG9kXSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gIHJldHVybiBlbFttYXRjaGVzU2VsZWN0b3JGdW5jXS5jYWxsKGVsLCBzZWxlY3Rvcik7XG59XG5cbi8vIFdvcmtzIHVwIHRoZSB0cmVlIHRvIHRoZSBkcmFnZ2FibGUgaXRzZWxmIGF0dGVtcHRpbmcgdG8gbWF0Y2ggc2VsZWN0b3IuXG5leHBvcnQgZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGVsOiBOb2RlLCBzZWxlY3Rvcjogc3RyaW5nLCBiYXNlTm9kZTogTm9kZSk6IGJvb2xlYW4ge1xuICBsZXQgbm9kZSA9IGVsO1xuICBkbyB7XG4gICAgaWYgKG1hdGNoZXNTZWxlY3Rvcihub2RlLCBzZWxlY3RvcikpIHJldHVybiB0cnVlO1xuICAgIGlmIChub2RlID09PSBiYXNlTm9kZSkgcmV0dXJuIGZhbHNlO1xuICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gIH0gd2hpbGUgKG5vZGUpO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEV2ZW50KGVsOiA/Tm9kZSwgZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmF0dGFjaEV2ZW50KSB7XG4gICAgZWwuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgIGVsWydvbicgKyBldmVudF0gPSBoYW5kbGVyO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFdmVudChlbDogP05vZGUsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5kZXRhY2hFdmVudCkge1xuICAgIGVsLmRldGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gbnVsbDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gb3V0ZXJIZWlnaHQobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0VG9wIHdoaWNoIGlzIGluY2x1ZGluZyBtYXJnaW4uIFNlZSBnZXRCb3VuZFBvc2l0aW9uXG4gIGxldCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBoZWlnaHQgKz0gaW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyVG9wV2lkdGgpO1xuICBoZWlnaHQgKz0gaW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb3V0ZXJXaWR0aChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGluZyBtYXJnaW4gZm9yIG91ciBjYWxjdWxhdGlvbnMsIHNpbmNlIHdlIGFyZSB1c2luZ1xuICAvLyBvZmZzZXRMZWZ0IHdoaWNoIGlzIGluY2x1ZGluZyBtYXJnaW4uIFNlZSBnZXRCb3VuZFBvc2l0aW9uXG4gIGxldCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggKz0gaW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyTGVmdFdpZHRoKTtcbiAgd2lkdGggKz0gaW50KGNvbXB1dGVkU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG4gIHJldHVybiB3aWR0aDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbm5lckhlaWdodChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIGxldCBoZWlnaHQgPSBub2RlLmNsaWVudEhlaWdodDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ1RvcCk7XG4gIGhlaWdodCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nQm90dG9tKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlubmVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdMZWZ0KTtcbiAgd2lkdGggLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgcmV0dXJuIHdpZHRoO1xufVxuXG4vLyBHZXQgZnJvbSBvZmZzZXRQYXJlbnRcbmV4cG9ydCBmdW5jdGlvbiBvZmZzZXRYWUZyb21QYXJlbnQoZXZ0OiB7IGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyIH0sIG9mZnNldFBhcmVudDogSFRNTEVsZW1lbnQpOiBDb250cm9sUG9zaXRpb24ge1xuICBjb25zdCBpc0JvZHkgPSBvZmZzZXRQYXJlbnQgPT09IG9mZnNldFBhcmVudC5vd25lckRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IG9mZnNldFBhcmVudFJlY3QgPSBpc0JvZHkgPyB7IGxlZnQ6IDAsIHRvcDogMCB9IDogb2Zmc2V0UGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gIGNvbnN0IHggPSBldnQuY2xpZW50WCArIG9mZnNldFBhcmVudC5zY3JvbGxMZWZ0IC0gb2Zmc2V0UGFyZW50UmVjdC5sZWZ0O1xuICBjb25zdCB5ID0gZXZ0LmNsaWVudFkgKyBvZmZzZXRQYXJlbnQuc2Nyb2xsVG9wIC0gb2Zmc2V0UGFyZW50UmVjdC50b3A7XG5cbiAgcmV0dXJuIHsgeCwgeSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ1NTVHJhbnNmb3JtKHsgeCwgeSwgZGVncmVlIH06IHsgeDogbnVtYmVyLCB5OiBudW1iZXIsIGRlZ3JlZTogbnVtYmVyIH0pOiBPYmplY3Qge1xuICAvLyBSZXBsYWNlIHVuaXRsZXNzIGl0ZW1zIHdpdGggcHhcbiAgbGV0IGNzc1N0eWxlID0gJyc7XG4gIGlmIChkZWdyZWUpIHtcbiAgICBjc3NTdHlsZSA9ICd0cmFuc2xhdGUoJyArIHggKyAncHgsJyArIHkgKyAncHgpIHJvdGF0ZSgnICsgZGVncmVlICsgJ2RlZyknO1xuXG4gIH0gZWxzZSB7XG4gICAgY3NzU3R5bGUgPSAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSc7XG4gIH1cbiAgcmV0dXJuIHsgW2Jyb3dzZXJQcmVmaXhUb0tleSgndHJhbnNmb3JtJywgYnJvd3NlclByZWZpeCldOiBjc3NTdHlsZSB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU1ZHVHJhbnNmb3JtKHsgeCwgeSB9OiB7IHg6IG51bWJlciwgeTogbnVtYmVyIH0pOiBzdHJpbmcge1xuICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgeCArICcsJyArIHkgKyAnKSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3VjaChlOiBNb3VzZVRvdWNoRXZlbnQsIGlkZW50aWZpZXI6IG51bWJlcik6ID97IGNsaWVudFg6IG51bWJlciwgY2xpZW50WTogbnVtYmVyIH0ge1xuICByZXR1cm4gKGUudGFyZ2V0VG91Y2hlcyAmJiBmaW5kSW5BcnJheShlLnRhcmdldFRvdWNoZXMsIHQgPT4gaWRlbnRpZmllciA9PT0gdC5pZGVudGlmaWVyKSkgfHxcbiAgICAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBmaW5kSW5BcnJheShlLmNoYW5nZWRUb3VjaGVzLCB0ID0+IGlkZW50aWZpZXIgPT09IHQuaWRlbnRpZmllcikpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2hJZGVudGlmaWVyKGU6IE1vdXNlVG91Y2hFdmVudCk6ID9udW1iZXIge1xuICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlc1swXSkgcmV0dXJuIGUudGFyZ2V0VG91Y2hlc1swXS5pZGVudGlmaWVyO1xuICBpZiAoZS5jaGFuZ2VkVG91Y2hlcyAmJiBlLmNoYW5nZWRUb3VjaGVzWzBdKSByZXR1cm4gZS5jaGFuZ2VkVG91Y2hlc1swXS5pZGVudGlmaWVyO1xufVxuXG4vLyBVc2VyLXNlbGVjdCBIYWNrczpcbi8vXG4vLyBVc2VmdWwgZm9yIHByZXZlbnRpbmcgYmx1ZSBoaWdobGlnaHRzIGFsbCBvdmVyIGV2ZXJ5dGhpbmcgd2hlbiBkcmFnZ2luZy5cblxuLy8gTm90ZSB3ZSdyZSBwYXNzaW5nIGBkb2N1bWVudGAgYi9jIHdlIGNvdWxkIGJlIGlmcmFtZWRcbmV4cG9ydCBmdW5jdGlvbiBhZGRVc2VyU2VsZWN0U3R5bGVzKGRvYzogRG9jdW1lbnQpIHtcbiAgbGV0IHN0eWxlRWwgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3JlYWN0LWRyYWdnYWJsZS1zdHlsZS1lbCcpO1xuICBpZiAoIXN0eWxlRWwpIHtcbiAgICBzdHlsZUVsID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgc3R5bGVFbC50eXBlID0gJ3RleHQvY3NzJztcbiAgICBzdHlsZUVsLmlkID0gJ3JlYWN0LWRyYWdnYWJsZS1zdHlsZS1lbCc7XG4gICAgc3R5bGVFbC5pbm5lckhUTUwgPSAnLnJlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24gKjo6LW1vei1zZWxlY3Rpb24ge2JhY2tncm91bmQ6IHRyYW5zcGFyZW50O31cXG4nO1xuICAgIHN0eWxlRWwuaW5uZXJIVE1MICs9ICcucmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbiAqOjpzZWxlY3Rpb24ge2JhY2tncm91bmQ6IHRyYW5zcGFyZW50O31cXG4nO1xuICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlRWwpO1xuICB9XG4gIGlmIChkb2MuYm9keSkgYWRkQ2xhc3NOYW1lKGRvYy5ib2R5LCAncmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyhkb2M6IERvY3VtZW50KSB7XG4gIGlmIChkb2MuYm9keSkgcmVtb3ZlQ2xhc3NOYW1lKGRvYy5ib2R5LCAncmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbicpO1xuICB0cnkge1xuICAgIHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTsgIC8vIHJlbW92ZSBzZWxlY3Rpb24gY2F1c2VkIGJ5IHNjcm9sbFxuICB9IGNhdGNoIChlKSB7XG4gICAgLy8gcHJvYmFibHkgSUVcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVIYWNrcyhjaGlsZFN0eWxlOiBPYmplY3QgPSB7fSk6IE9iamVjdCB7XG4gIC8vIFdvcmthcm91bmQgSUUgcG9pbnRlciBldmVudHM7IHNlZSAjNTFcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy81MSNpc3N1ZWNvbW1lbnQtMTAzNDg4Mjc4XG4gIHJldHVybiB7XG4gICAgdG91Y2hBY3Rpb246ICdub25lJyxcbiAgICAuLi5jaGlsZFN0eWxlXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRDbGFzc05hbWUoZWw6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGlmICghZWwuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoYCg/Ol58XFxcXHMpJHtjbGFzc05hbWV9KD8hXFxcXFMpYCkpKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gYCAke2NsYXNzTmFtZX1gO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlQ2xhc3NOYW1lKGVsOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzpefFxcXFxzKSR7Y2xhc3NOYW1lfSg/IVxcXFxTKWAsICdnJyksICcnKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL2RvbUZucy5qcyIsIi8vIEBmbG93XG4vLyBAY3JlZGl0cyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9yb2dvemhuaWtvZmYvYTQzY2ZlZDI3YzQxZTRlNjhjZGNcbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5BcnJheShhcnJheTogQXJyYXk8YW55PiB8IFRvdWNoTGlzdCwgY2FsbGJhY2s6IEZ1bmN0aW9uKTogYW55IHtcbiAgZm9yIChsZXQgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBbYXJyYXlbaV0sIGksIGFycmF5XSkpIHJldHVybiBhcnJheVtpXTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChmdW5jKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtKG51bTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgbnVtID09PSAnbnVtYmVyJyAmJiAhaXNOYU4obnVtKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludChhOiBzdHJpbmcpOiBudW1iZXIge1xuICByZXR1cm4gcGFyc2VJbnQoYSwgMTApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9udFNldE1lKHByb3BzOiBPYmplY3QsIHByb3BOYW1lOiBzdHJpbmcsIGNvbXBvbmVudE5hbWU6IHN0cmluZykge1xuICBpZiAocHJvcHNbcHJvcE5hbWVdKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihgSW52YWxpZCBwcm9wICR7cHJvcE5hbWV9IHBhc3NlZCB0byAke2NvbXBvbmVudE5hbWV9IC0gZG8gbm90IHNldCB0aGlzLCBzZXQgaXQgb24gdGhlIGNoaWxkLmApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvc2hpbXMuanMiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwiLFwicm9vdFwiOlwiUmVhY3RcIn1cbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiZcbiAgICBTeW1ib2wuZm9yICYmXG4gICAgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpKSB8fFxuICAgIDB4ZWFjNztcblxuICB2YXIgaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiZcbiAgICAgIG9iamVjdCAhPT0gbnVsbCAmJlxuICAgICAgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG4gIH07XG5cbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgZGV2ZWxvcG1lbnQgYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgdmFyIHRocm93T25EaXJlY3RBY2Nlc3MgPSB0cnVlO1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMnKShpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcyk7XG59IGVsc2Uge1xuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBwcm9kdWN0aW9uIGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMnKSgpO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YXJpYW50IHJlcXVpcmVzIGFuIGVycm9yIG1lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGludmFyaWFudChjb25kaXRpb24sIGZvcm1hdCwgYSwgYiwgYywgZCwgZSwgZikge1xuICB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpO1xuXG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdmFyIGVycm9yO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoJ01pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50ICcgKyAnZm9yIHRoZSBmdWxsIGVycm9yIG1lc3NhZ2UgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGFyZ3MgPSBbYSwgYiwgYywgZCwgZSwgZl07XG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KSk7XG4gICAgICBlcnJvci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgIH1cblxuICAgIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCBpbnZhcmlhbnQncyBvd24gZnJhbWVcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludmFyaWFudDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9ICdTRUNSRVRfRE9fTk9UX1BBU1NfVEhJU19PUl9ZT1VfV0lMTF9CRV9GSVJFRCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXNTZWNyZXQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgLy8gVGhpcyBlcnJvciB3YXMgdGhyb3duIGFzIGEgY29udmVuaWVuY2Ugc28gdGhhdCB5b3UgY2FuIHVzZSB0aGlzIHN0YWNrXG4gICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9IGNhdGNoICh4KSB7fVxuICB9O1xuXG4gIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGlmIChmb3JtYXQuaW5kZXhPZignRmFpbGVkIENvbXBvc2l0ZSBwcm9wVHlwZTogJykgPT09IDApIHtcbiAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICB9XG5cbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuXG4gICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3YXJuaW5nO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCB7aXNOdW0sIGludH0gZnJvbSAnLi9zaGltcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7Z2V0VG91Y2gsIGlubmVyV2lkdGgsIGlubmVySGVpZ2h0LCBvZmZzZXRYWUZyb21QYXJlbnQsIG91dGVyV2lkdGgsIG91dGVySGVpZ2h0fSBmcm9tICcuL2RvbUZucyc7XG5cbmltcG9ydCB0eXBlIERyYWdnYWJsZSBmcm9tICcuLi9EcmFnZ2FibGUnO1xuaW1wb3J0IHR5cGUge0JvdW5kcywgQ29udHJvbFBvc2l0aW9uLCBEcmFnZ2FibGVEYXRhLCBNb3VzZVRvdWNoRXZlbnR9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZSBmcm9tICcuLi9EcmFnZ2FibGVDb3JlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kUG9zaXRpb24oZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIHg6IG51bWJlciwgeTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIC8vIElmIG5vIGJvdW5kcywgc2hvcnQtY2lyY3VpdCBhbmQgbW92ZSBvblxuICBpZiAoIWRyYWdnYWJsZS5wcm9wcy5ib3VuZHMpIHJldHVybiBbeCwgeV07XG5cbiAgLy8gQ2xvbmUgbmV3IGJvdW5kc1xuICBsZXQge2JvdW5kc30gPSBkcmFnZ2FibGUucHJvcHM7XG4gIGJvdW5kcyA9IHR5cGVvZiBib3VuZHMgPT09ICdzdHJpbmcnID8gYm91bmRzIDogY2xvbmVCb3VuZHMoYm91bmRzKTtcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG5cbiAgaWYgKHR5cGVvZiBib3VuZHMgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3Qge293bmVyRG9jdW1lbnR9ID0gbm9kZTtcbiAgICBjb25zdCBvd25lcldpbmRvdyA9IG93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gICAgbGV0IGJvdW5kTm9kZTtcbiAgICBpZiAoYm91bmRzID09PSAncGFyZW50Jykge1xuICAgICAgYm91bmROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZE5vZGUgPSBvd25lckRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYm91bmRzKTtcbiAgICB9XG4gICAgaWYgKCEoYm91bmROb2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0JvdW5kcyBzZWxlY3RvciBcIicgKyBib3VuZHMgKyAnXCIgY291bGQgbm90IGZpbmQgYW4gZWxlbWVudC4nKTtcbiAgICB9XG4gICAgY29uc3Qgbm9kZVN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgICBjb25zdCBib3VuZE5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUoYm91bmROb2RlKTtcbiAgICAvLyBDb21wdXRlIGJvdW5kcy4gVGhpcyBpcyBhIHBhaW4gd2l0aCBwYWRkaW5nIGFuZCBvZmZzZXRzIGJ1dCB0aGlzIGdldHMgaXQgZXhhY3RseSByaWdodC5cbiAgICBib3VuZHMgPSB7XG4gICAgICBsZWZ0OiAtbm9kZS5vZmZzZXRMZWZ0ICsgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdMZWZ0KSArIGludChub2RlU3R5bGUubWFyZ2luTGVmdCksXG4gICAgICB0b3A6IC1ub2RlLm9mZnNldFRvcCArIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nVG9wKSArIGludChub2RlU3R5bGUubWFyZ2luVG9wKSxcbiAgICAgIHJpZ2h0OiBpbm5lcldpZHRoKGJvdW5kTm9kZSkgLSBvdXRlcldpZHRoKG5vZGUpIC0gbm9kZS5vZmZzZXRMZWZ0ICtcbiAgICAgICAgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdSaWdodCkgLSBpbnQobm9kZVN0eWxlLm1hcmdpblJpZ2h0KSxcbiAgICAgIGJvdHRvbTogaW5uZXJIZWlnaHQoYm91bmROb2RlKSAtIG91dGVySGVpZ2h0KG5vZGUpIC0gbm9kZS5vZmZzZXRUb3AgK1xuICAgICAgICBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ0JvdHRvbSkgLSBpbnQobm9kZVN0eWxlLm1hcmdpbkJvdHRvbSlcbiAgICB9O1xuICB9XG5cbiAgLy8gS2VlcCB4IGFuZCB5IGJlbG93IHJpZ2h0IGFuZCBib3R0b20gbGltaXRzLi4uXG4gIGlmIChpc051bShib3VuZHMucmlnaHQpKSB4ID0gTWF0aC5taW4oeCwgYm91bmRzLnJpZ2h0KTtcbiAgaWYgKGlzTnVtKGJvdW5kcy5ib3R0b20pKSB5ID0gTWF0aC5taW4oeSwgYm91bmRzLmJvdHRvbSk7XG5cbiAgLy8gQnV0IGFib3ZlIGxlZnQgYW5kIHRvcCBsaW1pdHMuXG4gIGlmIChpc051bShib3VuZHMubGVmdCkpIHggPSBNYXRoLm1heCh4LCBib3VuZHMubGVmdCk7XG4gIGlmIChpc051bShib3VuZHMudG9wKSkgeSA9IE1hdGgubWF4KHksIGJvdW5kcy50b3ApO1xuXG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzbmFwVG9HcmlkKGdyaWQ6IFtudW1iZXIsIG51bWJlcl0sIHBlbmRpbmdYOiBudW1iZXIsIHBlbmRpbmdZOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgY29uc3QgeCA9IE1hdGgucm91bmQocGVuZGluZ1ggLyBncmlkWzBdKSAqIGdyaWRbMF07XG4gIGNvbnN0IHkgPSBNYXRoLnJvdW5kKHBlbmRpbmdZIC8gZ3JpZFsxXSkgKiBncmlkWzFdO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRHJhZ1goZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHwgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd4Jztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRyYWdZKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gIHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8IGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneSc7XG59XG5cbi8vIEdldCB7eCwgeX0gcG9zaXRpb25zIGZyb20gZXZlbnQuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udHJvbFBvc2l0aW9uKGU6IE1vdXNlVG91Y2hFdmVudCwgdG91Y2hJZGVudGlmaWVyOiA/bnVtYmVyLCBkcmFnZ2FibGVDb3JlOiBEcmFnZ2FibGVDb3JlKTogP0NvbnRyb2xQb3NpdGlvbiB7XG4gIGNvbnN0IHRvdWNoT2JqID0gdHlwZW9mIHRvdWNoSWRlbnRpZmllciA9PT0gJ251bWJlcicgPyBnZXRUb3VjaChlLCB0b3VjaElkZW50aWZpZXIpIDogbnVsbDtcbiAgaWYgKHR5cGVvZiB0b3VjaElkZW50aWZpZXIgPT09ICdudW1iZXInICYmICF0b3VjaE9iaikgcmV0dXJuIG51bGw7IC8vIG5vdCB0aGUgcmlnaHQgdG91Y2hcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZUNvcmUpO1xuICAvLyBVc2VyIGNhbiBwcm92aWRlIGFuIG9mZnNldFBhcmVudCBpZiBkZXNpcmVkLlxuICBjb25zdCBvZmZzZXRQYXJlbnQgPSBkcmFnZ2FibGVDb3JlLnByb3BzLm9mZnNldFBhcmVudCB8fCBub2RlLm9mZnNldFBhcmVudCB8fCBub2RlLm93bmVyRG9jdW1lbnQuYm9keTtcbiAgcmV0dXJuIG9mZnNldFhZRnJvbVBhcmVudCh0b3VjaE9iaiB8fCBlLCBvZmZzZXRQYXJlbnQpO1xufVxuXG4vLyBDcmVhdGUgYW4gZGF0YSBvYmplY3QgZXhwb3NlZCBieSA8RHJhZ2dhYmxlQ29yZT4ncyBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDb3JlRGF0YShkcmFnZ2FibGU6IERyYWdnYWJsZUNvcmUsIHg6IG51bWJlciwgeTogbnVtYmVyKTogRHJhZ2dhYmxlRGF0YSB7XG4gIGNvbnN0IHN0YXRlID0gZHJhZ2dhYmxlLnN0YXRlO1xuICBjb25zdCBpc1N0YXJ0ID0gIWlzTnVtKHN0YXRlLmxhc3RYKTtcbiAgY29uc3Qgbm9kZSA9IGZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG5cbiAgaWYgKGlzU3RhcnQpIHtcbiAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBtb3ZlLCB1c2UgdGhlIHggYW5kIHkgYXMgbGFzdCBjb29yZHMuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGUsXG4gICAgICBkZWx0YVg6IDAsIGRlbHRhWTogMCxcbiAgICAgIGxhc3RYOiB4LCBsYXN0WTogeSxcbiAgICAgIHgsIHksXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UgY2FsY3VsYXRlIHByb3BlciB2YWx1ZXMuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5vZGUsXG4gICAgICBkZWx0YVg6IHggLSBzdGF0ZS5sYXN0WCwgZGVsdGFZOiB5IC0gc3RhdGUubGFzdFksXG4gICAgICBsYXN0WDogc3RhdGUubGFzdFgsIGxhc3RZOiBzdGF0ZS5sYXN0WSxcbiAgICAgIHgsIHksXG4gICAgfTtcbiAgfVxufVxuXG4vLyBDcmVhdGUgYW4gZGF0YSBleHBvc2VkIGJ5IDxEcmFnZ2FibGU+J3MgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRHJhZ2dhYmxlRGF0YShkcmFnZ2FibGU6IERyYWdnYWJsZSwgY29yZURhdGE6IERyYWdnYWJsZURhdGEpOiBEcmFnZ2FibGVEYXRhIHtcbiAgcmV0dXJuIHtcbiAgICBub2RlOiBjb3JlRGF0YS5ub2RlLFxuICAgIHg6IGRyYWdnYWJsZS5zdGF0ZS54ICsgY29yZURhdGEuZGVsdGFYLFxuICAgIHk6IGRyYWdnYWJsZS5zdGF0ZS55ICsgY29yZURhdGEuZGVsdGFZLFxuICAgIGRlbHRhWDogY29yZURhdGEuZGVsdGFYLFxuICAgIGRlbHRhWTogY29yZURhdGEuZGVsdGFZLFxuICAgIGxhc3RYOiBkcmFnZ2FibGUuc3RhdGUueCxcbiAgICBsYXN0WTogZHJhZ2dhYmxlLnN0YXRlLnlcbiAgfTtcbn1cblxuLy8gQSBsb3QgZmFzdGVyIHRoYW4gc3RyaW5naWZ5L3BhcnNlXG5mdW5jdGlvbiBjbG9uZUJvdW5kcyhib3VuZHM6IEJvdW5kcyk6IEJvdW5kcyB7XG4gIHJldHVybiB7XG4gICAgbGVmdDogYm91bmRzLmxlZnQsXG4gICAgdG9wOiBib3VuZHMudG9wLFxuICAgIHJpZ2h0OiBib3VuZHMucmlnaHQsXG4gICAgYm90dG9tOiBib3VuZHMuYm90dG9tXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZpbmRET01Ob2RlKGRyYWdnYWJsZTogRHJhZ2dhYmxlIHwgRHJhZ2dhYmxlQ29yZSk6IEhUTUxFbGVtZW50IHtcbiAgY29uc3Qgbm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKGRyYWdnYWJsZSk7XG4gIGlmICghbm9kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+OiBVbm1vdW50ZWQgZHVyaW5nIGV2ZW50IScpO1xuICB9XG4gIC8vICRGbG93SWdub3JlIHdlIGNhbid0IGFzc2VydCBvbiBIVE1MRWxlbWVudCBkdWUgdG8gdGVzdHMuLi4gRklYTUVcbiAgcmV0dXJuIG5vZGU7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7XG4gIG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbywgYWRkRXZlbnQsIHJlbW92ZUV2ZW50LCBhZGRVc2VyU2VsZWN0U3R5bGVzLCBnZXRUb3VjaElkZW50aWZpZXIsXG4gIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMsIHN0eWxlSGFja3Ncbn0gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuaW1wb3J0IHsgY3JlYXRlQ29yZURhdGEsIGdldENvbnRyb2xQb3NpdGlvbiwgc25hcFRvR3JpZCB9IGZyb20gJy4vdXRpbHMvcG9zaXRpb25GbnMnO1xuaW1wb3J0IHsgZG9udFNldE1lIH0gZnJvbSAnLi91dGlscy9zaGltcyc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuaW1wb3J0IHR5cGUgeyBFdmVudEhhbmRsZXIsIE1vdXNlVG91Y2hFdmVudCB9IGZyb20gJy4vdXRpbHMvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBFbGVtZW50IGFzIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcblxuLy8gU2ltcGxlIGFic3RyYWN0aW9uIGZvciBkcmFnZ2luZyBldmVudHMgbmFtZXMuXG5jb25zdCBldmVudHNGb3IgPSB7XG4gIHRvdWNoOiB7XG4gICAgc3RhcnQ6ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3ZlOiAndG91Y2htb3ZlJyxcbiAgICBzdG9wOiAndG91Y2hlbmQnXG4gIH0sXG4gIG1vdXNlOiB7XG4gICAgc3RhcnQ6ICdtb3VzZWRvd24nLFxuICAgIG1vdmU6ICdtb3VzZW1vdmUnLFxuICAgIHN0b3A6ICdtb3VzZXVwJ1xuICB9XG59O1xuXG4vLyBEZWZhdWx0IHRvIG1vdXNlIGV2ZW50cy5cbmxldCBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IubW91c2U7XG5cbnR5cGUgRHJhZ2dhYmxlQ29yZVN0YXRlID0ge1xuICBkcmFnZ2luZzogYm9vbGVhbixcbiAgbGFzdFg6IG51bWJlcixcbiAgbGFzdFk6IG51bWJlcixcbiAgdG91Y2hJZGVudGlmaWVyOiA/bnVtYmVyXG59O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVCb3VuZHMgPSB7XG4gIGxlZnQ6IG51bWJlcixcbiAgcmlnaHQ6IG51bWJlcixcbiAgdG9wOiBudW1iZXIsXG4gIGJvdHRvbTogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlRGF0YSA9IHtcbiAgbm9kZTogSFRNTEVsZW1lbnQsXG4gIHg6IG51bWJlciwgeTogbnVtYmVyLFxuICBkZWx0YVg6IG51bWJlciwgZGVsdGFZOiBudW1iZXIsXG4gIGxhc3RYOiBudW1iZXIsIGxhc3RZOiBudW1iZXIsXG59O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVFdmVudEhhbmRsZXIgPSAoZTogTW91c2VFdmVudCwgZGF0YTogRHJhZ2dhYmxlRGF0YSkgPT4gdm9pZDtcblxuZXhwb3J0IHR5cGUgQ29udHJvbFBvc2l0aW9uID0geyB4OiBudW1iZXIsIHk6IG51bWJlciB9O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVDb3JlUHJvcHMgPSB7XG4gIGFsbG93QW55Q2xpY2s6IGJvb2xlYW4sXG4gIGNhbmNlbDogc3RyaW5nLFxuICBjaGlsZHJlbjogUmVhY3RFbGVtZW50PGFueT4sXG4gIGRpc2FibGVkOiBib29sZWFuLFxuICBlbmFibGVVc2VyU2VsZWN0SGFjazogYm9vbGVhbixcbiAgb2Zmc2V0UGFyZW50OiBIVE1MRWxlbWVudCxcbiAgZ3JpZDogW251bWJlciwgbnVtYmVyXSxcbiAgaGFuZGxlOiBzdHJpbmcsXG4gIG9uU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25EcmFnOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uU3RvcDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvbk1vdXNlRG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHZvaWQsXG4gIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlQ29yZT4uXG4vL1xuLy8gPERyYWdnYWJsZUNvcmU+IGlzIGZvciBhZHZhbmNlZCB1c2FnZSBvZiA8RHJhZ2dhYmxlPi4gSXQgbWFpbnRhaW5zIG1pbmltYWwgaW50ZXJuYWwgc3RhdGUgc28gaXQgY2FuXG4vLyB3b3JrIHdlbGwgd2l0aCBsaWJyYXJpZXMgdGhhdCByZXF1aXJlIG1vcmUgY29udHJvbCBvdmVyIHRoZSBlbGVtZW50LlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlQ29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxEcmFnZ2FibGVDb3JlUHJvcHMsIERyYWdnYWJsZUNvcmVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGVDb3JlJztcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIGBhbGxvd0FueUNsaWNrYCBhbGxvd3MgZHJhZ2dpbmcgdXNpbmcgYW55IG1vdXNlIGJ1dHRvbi5cbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBvbmx5IGFjY2VwdCB0aGUgbGVmdCBidXR0b24uXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIGFsbG93QW55Q2xpY2s6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogYGRpc2FibGVkYCwgaWYgdHJ1ZSwgc3RvcHMgdGhlIDxEcmFnZ2FibGU+IGZyb20gZHJhZ2dpbmcuIEFsbCBoYW5kbGVycyxcbiAgICAgKiB3aXRoIHRoZSBleGNlcHRpb24gb2YgYG9uTW91c2VEb3duYCwgd2lsbCBub3QgZmlyZS5cbiAgICAgKi9cbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBhZGQgJ3VzZXItc2VsZWN0Om5vbmUnIGF0dHJpYnV0ZXMgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgICAgKiB0byBwcmV2ZW50IHVnbHkgdGV4dCBzZWxlY3Rpb24gZHVyaW5nIGRyYWcuIElmIHRoaXMgaXMgY2F1c2luZyBwcm9ibGVtc1xuICAgICAqIGZvciB5b3VyIGFwcCwgc2V0IHRoaXMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgb2Zmc2V0UGFyZW50YCwgaWYgc2V0LCB1c2VzIHRoZSBwYXNzZWQgRE9NIG5vZGUgdG8gY29tcHV0ZSBkcmFnIG9mZnNldHNcbiAgICAgKiBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBwYXJlbnQgbm9kZS5cbiAgICAgKi9cbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSAmJiBwcm9wc1twcm9wTmFtZV0gJiYgcHJvcHNbcHJvcE5hbWVdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ2dhYmxlXFwncyBvZmZzZXRQYXJlbnQgbXVzdCBiZSBhIERPTSBOb2RlLicpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgZ3JpZGAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgZHJhZ2dpbmcgc2hvdWxkIHNuYXAgdG8uXG4gICAgICovXG4gICAgZ3JpZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0YXJ0cy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICovXG4gICAgb25TdGFydDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hpbGUgZHJhZ2dpbmcuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIG9uRHJhZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIHRoZSBkcmFnIHdpbGwgcmVtYWluIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBvblN0b3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQSB3b3JrYXJvdW5kIG9wdGlvbiB3aGljaCBjYW4gYmUgcGFzc2VkIGlmIG9uTW91c2VEb3duIG5lZWRzIHRvIGJlIGFjY2Vzc2VkLFxuICAgICAqIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChhcyB0aGVyZSBpcyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBkb250U2V0TWUsXG4gICAgc3R5bGU6IGRvbnRTZXRNZSxcbiAgICB0cmFuc2Zvcm06IGRvbnRTZXRNZVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYWxsb3dBbnlDbGljazogZmFsc2UsIC8vIGJ5IGRlZmF1bHQgb25seSBhY2NlcHQgbGVmdCBjbGlja1xuICAgIGNhbmNlbDogbnVsbCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IHRydWUsXG4gICAgb2Zmc2V0UGFyZW50OiBudWxsLFxuICAgIGhhbmRsZTogbnVsbCxcbiAgICBncmlkOiBudWxsLFxuICAgIHRyYW5zZm9ybTogbnVsbCxcbiAgICBvblN0YXJ0OiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbkRyYWc6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uU3RvcDogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25Nb3VzZURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5VXA6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5RG93bjogZnVuY3Rpb24oKSB7IH0sXG4gIH07XG5cbiAgc3RhdGUgPSB7XG4gICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgIC8vIFVzZWQgd2hpbGUgZHJhZ2dpbmcgdG8gZGV0ZXJtaW5lIGRlbHRhcy5cbiAgICBsYXN0WDogTmFOLCBsYXN0WTogTmFOLFxuICAgIHRvdWNoSWRlbnRpZmllcjogbnVsbFxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIC8vIFJlbW92ZSBhbnkgbGVmdG92ZXIgZXZlbnQgaGFuZGxlcnMuIFJlbW92ZSBib3RoIHRvdWNoIGFuZCBtb3VzZSBoYW5kbGVycyBpbiBjYXNlXG4gICAgLy8gc29tZSBicm93c2VyIHF1aXJrIGNhdXNlZCBhIHRvdWNoIGV2ZW50IHRvIGZpcmUgZHVyaW5nIGEgbW91c2UgbW92ZSwgb3IgdmljZSB2ZXJzYS5cbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgY29uc3QgeyBvd25lckRvY3VtZW50IH0gPSB0aGlzTm9kZTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLnRvdWNoLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IubW91c2Uuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IudG91Y2guc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyhvd25lckRvY3VtZW50KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVEcmFnU3RhcnQ6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICAvLyBNYWtlIGl0IHBvc3NpYmxlIHRvIGF0dGFjaCBldmVudCBoYW5kbGVycyBvbiB0b3Agb2YgdGhpcyBvbmUuICAgXG4gICAgdGhpcy5wcm9wcy5vbk1vdXNlRG93bihlKTtcblxuICAgIC8vIE9ubHkgYWNjZXB0IGxlZnQtY2xpY2tzLlxuICAgIGlmICghdGhpcy5wcm9wcy5hbGxvd0FueUNsaWNrICYmIHR5cGVvZiBlLmJ1dHRvbiA9PT0gJ251bWJlcicgJiYgZS5idXR0b24gIT09IDApIHJldHVybiBmYWxzZTtcblxuICAgIC8vIEdldCBub2Rlcy4gQmUgc3VyZSB0byBncmFiIHJlbGF0aXZlIGRvY3VtZW50IChjb3VsZCBiZSBpZnJhbWVkKVxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKCF0aGlzTm9kZSB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudCB8fCAhdGhpc05vZGUub3duZXJEb2N1bWVudC5ib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJzxEcmFnZ2FibGVDb3JlPiBub3QgbW91bnRlZCBvbiBEcmFnU3RhcnQhJyk7XG4gICAgfVxuICAgIGNvbnN0IHsgb3duZXJEb2N1bWVudCB9ID0gdGhpc05vZGU7XG5cbiAgICAvLyBTaG9ydCBjaXJjdWl0IGlmIGhhbmRsZSBvciBjYW5jZWwgcHJvcCB3YXMgcHJvdmlkZWQgYW5kIHNlbGVjdG9yIGRvZXNuJ3QgbWF0Y2guXG4gICAgaWYgKHRoaXMucHJvcHMuZGlzYWJsZWQgfHxcbiAgICAgICghKGUudGFyZ2V0IGluc3RhbmNlb2Ygb3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5Ob2RlKSkgfHxcbiAgICAgICh0aGlzLnByb3BzLmhhbmRsZSAmJiAhbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGUudGFyZ2V0LCB0aGlzLnByb3BzLmhhbmRsZSwgdGhpc05vZGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuY2FuY2VsICYmIG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlLnRhcmdldCwgdGhpcy5wcm9wcy5jYW5jZWwsIHRoaXNOb2RlKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTZXQgdG91Y2ggaWRlbnRpZmllciBpbiBjb21wb25lbnQgc3RhdGUgaWYgdGhpcyBpcyBhIHRvdWNoIGV2ZW50LiBUaGlzIGFsbG93cyB1cyB0b1xuICAgIC8vIGRpc3Rpbmd1aXNoIGJldHdlZW4gaW5kaXZpZHVhbCB0b3VjaGVzIG9uIG11bHRpdG91Y2ggc2NyZWVucyBieSBpZGVudGlmeWluZyB3aGljaFxuICAgIC8vIHRvdWNocG9pbnQgd2FzIHNldCB0byB0aGlzIGVsZW1lbnQuXG4gICAgY29uc3QgdG91Y2hJZGVudGlmaWVyID0gZ2V0VG91Y2hJZGVudGlmaWVyKGUpO1xuICAgIHRoaXMuc2V0U3RhdGUoeyB0b3VjaElkZW50aWZpZXIgfSk7XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZHJhZyBwb2ludCBmcm9tIHRoZSBldmVudC4gVGhpcyBpcyB1c2VkIGFzIHRoZSBvZmZzZXQuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdG91Y2hJZGVudGlmaWVyLCB0aGlzKTtcbiAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuOyAvLyBub3QgcG9zc2libGUgYnV0IHNhdGlzZmllcyBmbG93XG4gICAgY29uc3QgeyB4LCB5IH0gPSBwb3NpdGlvbjtcblxuICAgIC8vIENyZWF0ZSBhbiBldmVudCBvYmplY3Qgd2l0aCBhbGwgdGhlIGRhdGEgcGFyZW50cyBuZWVkIHRvIG1ha2UgYSBkZWNpc2lvbiBoZXJlLlxuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVEYXRhKHRoaXMsIHgsIHkpO1xuXG4gICAgLy8gbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnU3RhcnQ6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIENhbGwgZXZlbnQgaGFuZGxlci4gSWYgaXQgcmV0dXJucyBleHBsaWNpdCBmYWxzZSwgY2FuY2VsLlxuICAgIGxvZygnY2FsbGluZycsIHRoaXMucHJvcHMub25TdGFydCk7XG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vblN0YXJ0KGUsIGNvcmVFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybjtcblxuICAgIC8vIEFkZCBhIHN0eWxlIHRvIHRoZSBib2R5IHRvIGRpc2FibGUgdXNlci1zZWxlY3QuIFRoaXMgcHJldmVudHMgdGV4dCBmcm9tXG4gICAgLy8gYmVpbmcgc2VsZWN0ZWQgYWxsIG92ZXIgdGhlIHBhZ2UuXG4gICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlVXNlclNlbGVjdEhhY2spIGFkZFVzZXJTZWxlY3RTdHlsZXMob3duZXJEb2N1bWVudCk7XG5cbiAgICAvLyBJbml0aWF0ZSBkcmFnZ2luZy4gU2V0IHRoZSBjdXJyZW50IHggYW5kIHkgYXMgb2Zmc2V0c1xuICAgIC8vIHNvIHdlIGtub3cgaG93IG11Y2ggd2UndmUgbW92ZWQgZHVyaW5nIHRoZSBkcmFnLiBUaGlzIGFsbG93cyB1c1xuICAgIC8vIHRvIGRyYWcgZWxlbWVudHMgYXJvdW5kIGV2ZW4gaWYgdGhleSBoYXZlIGJlZW4gbW92ZWQsIHdpdGhvdXQgaXNzdWUuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnZ2luZzogdHJ1ZSxcblxuICAgICAgbGFzdFg6IHgsXG4gICAgICBsYXN0WTogeVxuICAgIH0pO1xuXG4gICAgLy8gQWRkIGV2ZW50cyB0byB0aGUgZG9jdW1lbnQgZGlyZWN0bHkgc28gd2UgY2F0Y2ggd2hlbiB0aGUgdXNlcidzIG1vdXNlL3RvdWNoIG1vdmVzIG91dHNpZGUgb2ZcbiAgICAvLyB0aGlzIGVsZW1lbnQuIFdlIHVzZSBkaWZmZXJlbnQgZXZlbnRzIGRlcGVuZGluZyBvbiB3aGV0aGVyIG9yIG5vdCB3ZSBoYXZlIGRldGVjdGVkIHRoYXQgdGhpc1xuICAgIC8vIGlzIGEgdG91Y2gtY2FwYWJsZSBkZXZpY2UuXG4gICAgYWRkRXZlbnQob3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgYWRkRXZlbnQob3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICB9O1xuXG4gIGhhbmRsZURyYWc6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcblxuICAgIC8vIFByZXZlbnQgc2Nyb2xsaW5nIG9uIG1vYmlsZSBkZXZpY2VzLCBsaWtlIGlwYWQvaXBob25lLlxuICAgIGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvLyBHZXQgdGhlIGN1cnJlbnQgZHJhZyBwb2ludCBmcm9tIHRoZSBldmVudC4gVGhpcyBpcyB1c2VkIGFzIHRoZSBvZmZzZXQuXG4gICAgY29uc3QgcG9zaXRpb24gPSBnZXRDb250cm9sUG9zaXRpb24oZSwgdGhpcy5zdGF0ZS50b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47XG4gICAgbGV0IHsgeCwgeSB9ID0gcG9zaXRpb247XG5cbiAgICAvLyBTbmFwIHRvIGdyaWQgaWYgcHJvcCBoYXMgYmVlbiBwcm92aWRlZFxuICAgIGlmIChBcnJheS5pc0FycmF5KHRoaXMucHJvcHMuZ3JpZCkpIHtcbiAgICAgIGxldCBkZWx0YVggPSB4IC0gdGhpcy5zdGF0ZS5sYXN0WCwgZGVsdGFZID0geSAtIHRoaXMuc3RhdGUubGFzdFk7XG4gICAgICBbZGVsdGFYLCBkZWx0YVldID0gc25hcFRvR3JpZCh0aGlzLnByb3BzLmdyaWQsIGRlbHRhWCwgZGVsdGFZKTtcbiAgICAgIGlmICghZGVsdGFYICYmICFkZWx0YVkpIHJldHVybjsgLy8gc2tpcCB1c2VsZXNzIGRyYWdcbiAgICAgIHggPSB0aGlzLnN0YXRlLmxhc3RYICsgZGVsdGFYLCB5ID0gdGhpcy5zdGF0ZS5sYXN0WSArIGRlbHRhWTtcbiAgICB9XG5cbiAgICBjb25zdCBjb3JlRXZlbnQgPSBjcmVhdGVDb3JlRGF0YSh0aGlzLCB4LCB5KTtcblxuICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZzogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCB0cmlnZ2VyIGVuZC5cbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uRHJhZyhlLCBjb3JlRXZlbnQpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyAkRmxvd0lnbm9yZVxuICAgICAgICB0aGlzLmhhbmRsZURyYWdTdG9wKG5ldyBNb3VzZUV2ZW50KCdtb3VzZXVwJykpO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIE9sZCBicm93c2Vyc1xuICAgICAgICBjb25zdCBldmVudCA9ICgoZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk6IGFueSk6IE1vdXNlVG91Y2hFdmVudCk7XG4gICAgICAgIC8vIEkgc2VlIHdoeSB0aGlzIGluc2FuaXR5IHdhcyBkZXByZWNhdGVkXG4gICAgICAgIC8vICRGbG93SWdub3JlXG4gICAgICAgIGV2ZW50LmluaXRNb3VzZUV2ZW50KCdtb3VzZXVwJywgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZXZlbnQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgbGFzdFg6IHgsXG4gICAgICBsYXN0WTogeVxuICAgIH0pO1xuICB9O1xuXG4gIGhhbmRsZURyYWdTdG9wOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm47XG5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCB7IHgsIHkgfSA9IHBvc2l0aW9uO1xuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVEYXRhKHRoaXMsIHgsIHkpO1xuXG4gICAgY29uc3QgdGhpc05vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBpZiAodGhpc05vZGUpIHtcbiAgICAgIC8vIFJlbW92ZSB1c2VyLXNlbGVjdCBoYWNrXG4gICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcyh0aGlzTm9kZS5vd25lckRvY3VtZW50KTtcbiAgICB9XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWdTdG9wOiAlaicsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBSZXNldCB0aGUgZWwuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICBsYXN0WDogTmFOLFxuICAgICAgbGFzdFk6IE5hTlxuICAgIH0pO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyXG4gICAgdGhpcy5wcm9wcy5vblN0b3AoZSwgY29yZUV2ZW50KTtcblxuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGhhbmRsZXJzXG4gICAgICAvLyBsb2coJ0RyYWdnYWJsZUNvcmU6IFJlbW92aW5nIGhhbmRsZXJzJyk7XG4gICAgICByZW1vdmVFdmVudCh0aGlzTm9kZS5vd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3IubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgIHJlbW92ZUV2ZW50KHRoaXNOb2RlLm93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICB9XG4gIH07XG5cbiAgb25Nb3VzZURvd246IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IubW91c2U7IC8vIG9uIHRvdWNoc2NyZWVuIGxhcHRvcHMgd2UgY291bGQgc3dpdGNoIGJhY2sgdG8gbW91c2VcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdGFydChlKTtcbiAgfTtcblxuICBvbk1vdXNlVXA6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IubW91c2U7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RvcChlKTtcbiAgfTtcblxuICAvLyBTYW1lIGFzIG9uTW91c2VEb3duIChzdGFydCBkcmFnKSwgYnV0IG5vdyBjb25zaWRlciB0aGlzIGEgdG91Y2ggZGV2aWNlLlxuICBvblRvdWNoU3RhcnQ6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICAvLyBXZSdyZSBvbiBhIHRvdWNoIGRldmljZSBub3csIHNvIGNoYW5nZSB0aGUgZXZlbnQgaGFuZGxlcnNcbiAgICBkcmFnRXZlbnRGb3IgPSBldmVudHNGb3IudG91Y2g7XG5cbiAgICByZXR1cm4gdGhpcy5oYW5kbGVEcmFnU3RhcnQoZSk7XG4gIH07XG5cbiAgb25Ub3VjaEVuZDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIFdlJ3JlIG9uIGEgdG91Y2ggZGV2aWNlIG5vdywgc28gY2hhbmdlIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdG9wKGUpO1xuICB9O1xuXG4gIG9uS2V5VXA6IGFueSA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleVVwKGUpXG4gIH1cbiAgb25LZXlEb3duOiBhbnkgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGUpXG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIC8vIFJldXNlIHRoZSBjaGlsZCBwcm92aWRlZFxuICAgIC8vIFRoaXMgbWFrZXMgaXQgZmxleGlibGUgdG8gdXNlIHdoYXRldmVyIGVsZW1lbnQgaXMgd2FudGVkIChkaXYsIHVsLCBldGMpXG4gICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICBzdHlsZTogc3R5bGVIYWNrcyh0aGlzLnByb3BzLmNoaWxkcmVuLnByb3BzLnN0eWxlKSxcblxuICAgICAgLy8gTm90ZTogbW91c2VNb3ZlIGhhbmRsZXIgaXMgYXR0YWNoZWQgdG8gZG9jdW1lbnQgc28gaXQgd2lsbCBzdGlsbCBmdW5jdGlvblxuICAgICAgLy8gd2hlbiB0aGUgdXNlciBkcmFncyBxdWlja2x5IGFuZCBsZWF2ZXMgdGhlIGJvdW5kcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgIG9uTW91c2VEb3duOiB0aGlzLm9uTW91c2VEb3duLFxuICAgICAgb25Ub3VjaFN0YXJ0OiB0aGlzLm9uVG91Y2hTdGFydCxcbiAgICAgIG9uTW91c2VVcDogdGhpcy5vbk1vdXNlVXAsXG4gICAgICBvblRvdWNoRW5kOiB0aGlzLm9uVG91Y2hFbmQsXG4gICAgICBvbktleVVwOiB0aGlzLm9uS2V5VXAsXG4gICAgICBvbktleURvd246IHRoaXMub25LZXlEb3duLFxuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvRHJhZ2dhYmxlQ29yZS5qcyIsIi8vIEBmbG93XG4vKmVzbGludCBuby1jb25zb2xlOjAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbG9nKC4uLmFyZ3M6IGFueSkge1xuICBpZiAocHJvY2Vzcy5lbnYuRFJBR0dBQkxFX0RFQlVHKSBjb25zb2xlLmxvZyguLi5hcmdzKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9sb2cuanMiLCJ2YXIgRHJhZ2dhYmxlID0gcmVxdWlyZSgnLi9saWIvRHJhZ2dhYmxlJykuZGVmYXVsdDtcblxuLy8gUHJldmlvdXMgdmVyc2lvbnMgb2YgdGhpcyBsaWIgZXhwb3J0ZWQgPERyYWdnYWJsZT4gYXMgdGhlIHJvb3QgZXhwb3J0LiBBcyB0byBub3QgYnJlYWtcbi8vIHRoZW0sIG9yIFR5cGVTY3JpcHQsIHdlIGV4cG9ydCAqYm90aCogYXMgdGhlIHJvb3QgYW5kIGFzICdkZWZhdWx0Jy5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvcHVsbC8yNTRcbi8vIGFuZCBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvaXNzdWVzLzI2NlxubW9kdWxlLmV4cG9ydHMgPSBEcmFnZ2FibGU7XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuRHJhZ2dhYmxlQ29yZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZUNvcmUnKS5kZWZhdWx0O1xubW9kdWxlLmV4cG9ydHMuRHJhZ2dhYmxlQWxpZ25HdWlkZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUnKS5kZWZhdWx0O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vaW5kZXguanMiLCIvLyBAZmxvd1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgY3JlYXRlQ1NTVHJhbnNmb3JtLCBjcmVhdGVTVkdUcmFuc2Zvcm0gfSBmcm9tICcuL3V0aWxzL2RvbUZucyc7XG5pbXBvcnQgeyBjYW5EcmFnWCwgY2FuRHJhZ1ksIGNyZWF0ZURyYWdnYWJsZURhdGEsIGdldEJvdW5kUG9zaXRpb24gfSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7IGRvbnRTZXRNZSB9IGZyb20gJy4vdXRpbHMvc2hpbXMnO1xuaW1wb3J0IERyYWdnYWJsZUNvcmUgZnJvbSAnLi9EcmFnZ2FibGVDb3JlJztcbmltcG9ydCB0eXBlIHsgQ29udHJvbFBvc2l0aW9uLCBEcmFnZ2FibGVCb3VuZHMsIERyYWdnYWJsZUNvcmVQcm9wcyB9IGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcbmltcG9ydCB0eXBlIHsgRHJhZ2dhYmxlRXZlbnRIYW5kbGVyIH0gZnJvbSAnLi91dGlscy90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IEVsZW1lbnQgYXMgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuXG50eXBlIERyYWdnYWJsZVN0YXRlID0ge1xuICBkcmFnZ2luZzogYm9vbGVhbixcbiAgZHJhZ2dlZDogYm9vbGVhbixcbiAgeDogbnVtYmVyLCB5OiBudW1iZXIsXG4gIHNsYWNrWDogbnVtYmVyLCBzbGFja1k6IG51bWJlcixcbiAgaXNFbGVtZW50U1ZHOiBib29sZWFuLFxuICBmb2N1c2VkOiBib29sZWFuLFxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlUHJvcHMgPSB7XG4gIC4uLiRFeGFjdDxEcmFnZ2FibGVDb3JlUHJvcHM+LFxuICBheGlzOiAnYm90aCcgfCAneCcgfCAneScgfCAnbm9uZScsXG4gIGJvdW5kczogRHJhZ2dhYmxlQm91bmRzIHwgc3RyaW5nIHwgZmFsc2UsXG4gIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVGb2N1c2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBwb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlNb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAga2V5TW92ZUVuYWJsZWQ6IGJvb2xlYW4sXG4gIGtleU1vdmVTcGVlZDogbnVtYmVyLFxuICBkZWdyZWU6IG51bWJlcixcbiAgb25Nb3ZlU25hcDogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGU+XG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8RHJhZ2dhYmxlUHJvcHMsIERyYWdnYWJsZVN0YXRlPiB7XG5cbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0RyYWdnYWJsZSc7XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAvLyBBY2NlcHRzIGFsbCBwcm9wcyA8RHJhZ2dhYmxlQ29yZT4gYWNjZXB0cy5cbiAgICAuLi5EcmFnZ2FibGVDb3JlLnByb3BUeXBlcyxcblxuICAgIC8qKlxuICAgICAqIGBheGlzYCBkZXRlcm1pbmVzIHdoaWNoIGF4aXMgdGhlIGRyYWdnYWJsZSBjYW4gbW92ZS5cbiAgICAgKlxuICAgICAqICBOb3RlIHRoYXQgYWxsIGNhbGxiYWNrcyB3aWxsIHN0aWxsIHJldHVybiBkYXRhIGFzIG5vcm1hbC4gVGhpcyBvbmx5XG4gICAgICogIGNvbnRyb2xzIGZsdXNoaW5nIHRvIHRoZSBET00uXG4gICAgICpcbiAgICAgKiAnYm90aCcgYWxsb3dzIG1vdmVtZW50IGhvcml6b250YWxseSBhbmQgdmVydGljYWxseS5cbiAgICAgKiAneCcgbGltaXRzIG1vdmVtZW50IHRvIGhvcml6b250YWwgYXhpcy5cbiAgICAgKiAneScgbGltaXRzIG1vdmVtZW50IHRvIHZlcnRpY2FsIGF4aXMuXG4gICAgICogJ25vbmUnIGxpbWl0cyBhbGwgbW92ZW1lbnQuXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byAnYm90aCcuXG4gICAgICovXG4gICAgYXhpczogUHJvcFR5cGVzLm9uZU9mKFsnYm90aCcsICd4JywgJ3knLCAnbm9uZSddKSxcblxuICAgIC8qKlxuICAgICAqIGBib3VuZHNgIGRldGVybWluZXMgdGhlIHJhbmdlIG9mIG1vdmVtZW50IGF2YWlsYWJsZSB0byB0aGUgZWxlbWVudC5cbiAgICAgKiBBdmFpbGFibGUgdmFsdWVzIGFyZTpcbiAgICAgKlxuICAgICAqICdwYXJlbnQnIHJlc3RyaWN0cyBtb3ZlbWVudCB3aXRoaW4gdGhlIERyYWdnYWJsZSdzIHBhcmVudCBub2RlLlxuICAgICAqXG4gICAgICogQWx0ZXJuYXRpdmVseSwgcGFzcyBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nIHByb3BlcnRpZXMsIGFsbCBvZiB3aGljaCBhcmUgb3B0aW9uYWw6XG4gICAgICpcbiAgICAgKiB7bGVmdDogTEVGVF9CT1VORCwgcmlnaHQ6IFJJR0hUX0JPVU5ELCBib3R0b206IEJPVFRPTV9CT1VORCwgdG9wOiBUT1BfQk9VTkR9XG4gICAgICpcbiAgICAgKiBBbGwgdmFsdWVzIGFyZSBpbiBweC5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBib3VuZHM9e3tyaWdodDogMzAwLCBib3R0b206IDMwMH19PlxuICAgICAqICAgICAgICAgICAgICA8ZGl2PkNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGJvdW5kczogUHJvcFR5cGVzLm9uZU9mVHlwZShbXG4gICAgICBQcm9wVHlwZXMuc2hhcGUoe1xuICAgICAgICBsZWZ0OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICByaWdodDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgdG9wOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBib3R0b206IFByb3BUeXBlcy5udW1iZXJcbiAgICAgIH0pLFxuICAgICAgUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgIFByb3BUeXBlcy5vbmVPZihbZmFsc2VdKVxuICAgIF0pLFxuXG4gICAgZGVmYXVsdENsYXNzTmFtZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmc6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgZGVmYXVsdFBvc2l0aW9uYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCB0aGUgZHJhZ2dlZCBpdGVtIHNob3VsZCBzdGFydCBhdFxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgZGVmYXVsdFBvc2l0aW9uPXt7eDogMjUsIHk6IDI1fX0+XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgPGRpdj5JIHN0YXJ0IHdpdGggdHJhbnNmb3JtWDogMjVweCBhbmQgdHJhbnNmb3JtWTogMjVweDs8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICAgICApO1xuICAgICAqICAgICAgICAgIH1cbiAgICAgKiAgICAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGRlZmF1bHRQb3NpdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBgcG9zaXRpb25gLCBpZiBwcmVzZW50LCBkZWZpbmVzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBlbGVtZW50LlxuICAgICAqXG4gICAgICogIFRoaXMgaXMgc2ltaWxhciB0byBob3cgZm9ybSBlbGVtZW50cyBpbiBSZWFjdCB3b3JrIC0gaWYgbm8gYHBvc2l0aW9uYCBpcyBzdXBwbGllZCwgdGhlIGNvbXBvbmVudFxuICAgICAqICBpcyB1bmNvbnRyb2xsZWQuXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICAgICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgICAgICAgPERyYWdnYWJsZSBwb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBwb3NpdGlvbjogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgIHg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICB5OiBQcm9wVHlwZXMubnVtYmVyXG4gICAgfSksXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBkb250U2V0TWUsXG4gICAgc3R5bGU6IGRvbnRTZXRNZSxcbiAgICB0cmFuc2Zvcm06IGRvbnRTZXRNZSxcbiAgICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5TW92ZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25Nb3ZlU25hcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAga2V5TW92ZUVuYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuICAgIGtleU1vdmVTcGVlZDogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIGRlZmF1bHRDbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZycsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gICAgZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZm9jdXNlZCcsXG4gICAgZGVmYXVsdFBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICBwb3NpdGlvbjogbnVsbCxcbiAgICBvbktleVVwOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5TW92ZTogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25Nb3ZlU25hcDogZnVuY3Rpb24oKSB7IH0sXG4gICAga2V5TW92ZUVuYWJsZWQ6IHRydWUsXG4gICAga2V5TW92ZVNwZWVkOiAyNTBcbiAgfTtcblxuICBhdXRvU3RlcFRpbWVyID0gbnVsbDtcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogRHJhZ2dhYmxlUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgYXJlIGN1cnJlbnRseSBkcmFnZ2luZy5cbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcblxuICAgICAgLy8gV2hldGhlciBvciBub3Qgd2UgaGF2ZSBiZWVuIGRyYWdnZWQgYmVmb3JlLlxuICAgICAgZHJhZ2dlZDogZmFsc2UsXG5cbiAgICAgIC8vIEN1cnJlbnQgdHJhbnNmb3JtIHggYW5kIHkuXG4gICAgICB4OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnggOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueCxcbiAgICAgIHk6IHByb3BzLnBvc2l0aW9uID8gcHJvcHMucG9zaXRpb24ueSA6IHByb3BzLmRlZmF1bHRQb3NpdGlvbi55LFxuXG4gICAgICAvLyBVc2VkIGZvciBjb21wZW5zYXRpbmcgZm9yIG91dC1vZi1ib3VuZHMgZHJhZ3NcbiAgICAgIHNsYWNrWDogMCwgc2xhY2tZOiAwLFxuXG4gICAgICAvLyBDYW4gb25seSBkZXRlcm1pbmUgaWYgU1ZHIGFmdGVyIG1vdW50aW5nXG4gICAgICBpc0VsZW1lbnRTVkc6IGZhbHNlLFxuXG4gICAgICBmb2N1c2VkOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgaWYgKHRoaXMucHJvcHMucG9zaXRpb24gJiYgISh0aGlzLnByb3BzLm9uRHJhZyB8fCB0aGlzLnByb3BzLm9uU3RvcCkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgY29uc29sZS53YXJuKCdBIGBwb3NpdGlvbmAgd2FzIGFwcGxpZWQgdG8gdGhpcyA8RHJhZ2dhYmxlPiwgd2l0aG91dCBkcmFnIGhhbmRsZXJzLiBUaGlzIHdpbGwgbWFrZSB0aGlzICcgK1xuICAgICAgICAnY29tcG9uZW50IGVmZmVjdGl2ZWx5IHVuZHJhZ2dhYmxlLiBQbGVhc2UgYXR0YWNoIGBvbkRyYWdgIG9yIGBvblN0b3BgIGhhbmRsZXJzIHNvIHlvdSBjYW4gYWRqdXN0IHRoZSAnICtcbiAgICAgICAgJ2Bwb3NpdGlvbmAgb2YgdGhpcyBlbGVtZW50LicpO1xuICAgIH1cbiAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgdGhlIGVsZW1lbnQgcGFzc2VkIGlzIGFuIGluc3RhbmNlb2YgU1ZHRWxlbWVudFxuICAgIGlmICh0eXBlb2Ygd2luZG93LlNWR0VsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpIGluc3RhbmNlb2Ygd2luZG93LlNWR0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0VsZW1lbnRTVkc6IHRydWUgfSk7XG4gICAgfVxuICAgIHRoaXMuc3RvcE1vdmUoKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBPYmplY3QpIHtcbiAgICAvLyBTZXQgeC95IGlmIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXG4gICAgaWYgKG5leHRQcm9wcy5wb3NpdGlvbiAmJlxuICAgICAgKCF0aGlzLnByb3BzLnBvc2l0aW9uIHx8XG4gICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi54ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnggfHxcbiAgICAgICAgbmV4dFByb3BzLnBvc2l0aW9uLnkgIT09IHRoaXMucHJvcHMucG9zaXRpb24ueVxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IG5leHRQcm9wcy5wb3NpdGlvbi54LCB5OiBuZXh0UHJvcHMucG9zaXRpb24ueSB9KTtcbiAgICB9XG4gIH1cblxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgZHJhZ2dpbmc6IGZhbHNlIH0pOyAvLyBwcmV2ZW50cyBpbnZhcmlhbnQgaWYgdW5tb3VudGVkIHdoaWxlIGRyYWdnaW5nXG4gIH1cblxuICBvbkRyYWdTdGFydDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgLy8gbG9nKCdEcmFnZ2FibGU6IG9uRHJhZ1N0YXJ0OiAlaicsIGNvcmVEYXRhKTtcblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBjb25zdCBzaG91bGRTdGFydCA9IHRoaXMucHJvcHMub25TdGFydChlLCBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKSk7XG4gICAgLy8gS2lsbHMgc3RhcnQgZXZlbnQgb24gY29yZSBhcyB3ZWxsLCBzbyBtb3ZlIGhhbmRsZXJzIGFyZSBuZXZlciBib3VuZC5cbiAgICBpZiAoc2hvdWxkU3RhcnQgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgZHJhZ2dpbmc6IHRydWUsIGRyYWdnZWQ6IHRydWUgfSk7XG4gIH07XG5cbiAgb25EcmFnOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIgPSAoZSwgY29yZURhdGEpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBsb2coJ0RyYWdnYWJsZTogb25EcmFnOiAlaicsIGNvcmVEYXRhKTtcbiAgICBjb25zdCB1aURhdGEgPSBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKTtcbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIHg6IHVpRGF0YS54LFxuICAgICAgeTogdWlEYXRhLnlcbiAgICB9O1xuXG4gICAgLy8gS2VlcCB3aXRoaW4gYm91bmRzLlxuICAgIGlmICh0aGlzLnByb3BzLmJvdW5kcykge1xuICAgICAgLy8gU2F2ZSBvcmlnaW5hbCB4IGFuZCB5LlxuICAgICAgY29uc3QgeyB4LCB5IH0gPSBuZXdTdGF0ZTtcblxuICAgICAgLy8gQWRkIHNsYWNrIHRvIHRoZSB2YWx1ZXMgdXNlZCB0byBjYWxjdWxhdGUgYm91bmQgcG9zaXRpb24uIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCBpZlxuICAgICAgLy8gd2Ugc3RhcnQgcmVtb3Zpbmcgc2xhY2ssIHRoZSBlbGVtZW50IHdvbid0IHJlYWN0IHRvIGl0IHJpZ2h0IGF3YXkgdW50aWwgaXQncyBiZWVuXG4gICAgICAvLyBjb21wbGV0ZWx5IHJlbW92ZWQuXG4gICAgICBuZXdTdGF0ZS54ICs9IHRoaXMuc3RhdGUuc2xhY2tYO1xuICAgICAgbmV3U3RhdGUueSArPSB0aGlzLnN0YXRlLnNsYWNrWTtcblxuICAgICAgLy8gR2V0IGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgY2VpbC9mbG9vciB0aGUgeCBhbmQgeSB3aXRoaW4gdGhlIGJvdW5kYXJpZXMuXG4gICAgICBjb25zdCBbbmV3U3RhdGVYLCBuZXdTdGF0ZVldID0gZ2V0Qm91bmRQb3NpdGlvbih0aGlzLCBuZXdTdGF0ZS54LCBuZXdTdGF0ZS55KTtcbiAgICAgIG5ld1N0YXRlLnggPSBuZXdTdGF0ZVg7XG4gICAgICBuZXdTdGF0ZS55ID0gbmV3U3RhdGVZO1xuXG4gICAgICAvLyBSZWNhbGN1bGF0ZSBzbGFjayBieSBub3RpbmcgaG93IG11Y2ggd2FzIHNoYXZlZCBieSB0aGUgYm91bmRQb3NpdGlvbiBoYW5kbGVyLlxuICAgICAgbmV3U3RhdGUuc2xhY2tYID0gdGhpcy5zdGF0ZS5zbGFja1ggKyAoeCAtIG5ld1N0YXRlLngpO1xuICAgICAgbmV3U3RhdGUuc2xhY2tZID0gdGhpcy5zdGF0ZS5zbGFja1kgKyAoeSAtIG5ld1N0YXRlLnkpO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIGV2ZW50IHdlIGZpcmUgdG8gcmVmbGVjdCB3aGF0IHJlYWxseSBoYXBwZW5lZCBhZnRlciBib3VuZHMgdG9vayBlZmZlY3QuXG4gICAgICB1aURhdGEueCA9IG5ld1N0YXRlLng7XG4gICAgICB1aURhdGEueSA9IG5ld1N0YXRlLnk7XG4gICAgICB1aURhdGEuZGVsdGFYID0gbmV3U3RhdGUueCAtIHRoaXMuc3RhdGUueDtcbiAgICAgIHVpRGF0YS5kZWx0YVkgPSBuZXdTdGF0ZS55IC0gdGhpcy5zdGF0ZS55O1xuICAgIH1cblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uRHJhZyhlLCB1aURhdGEpO1xuICAgIGlmIChzaG91bGRVcGRhdGUgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBsb2coJ29uRHJhZyBuZXdTdGF0ZScsIG5ld1N0YXRlKVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuXG4gIG9uRHJhZ1N0b3A6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIGlmICghdGhpcy5zdGF0ZS5kcmFnZ2luZykgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuICAgIGNvbnN0IHNob3VsZFN0b3AgPSB0aGlzLnByb3BzLm9uU3RvcChlLCBjcmVhdGVEcmFnZ2FibGVEYXRhKHRoaXMsIGNvcmVEYXRhKSk7XG4gICAgaWYgKHNob3VsZFN0b3AgPT09IGZhbHNlKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZTogb25EcmFnU3RvcDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICBjb25zdCBuZXdTdGF0ZTogJFNoYXBlPERyYWdnYWJsZVN0YXRlPiA9IHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHNsYWNrWDogMCxcbiAgICAgIHNsYWNrWTogMFxuICAgIH07XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgY29udHJvbGxlZCBjb21wb25lbnQsIHRoZSByZXN1bHQgb2YgdGhpcyBvcGVyYXRpb24gd2lsbCBiZSB0b1xuICAgIC8vIHJldmVydCBiYWNrIHRvIHRoZSBvbGQgcG9zaXRpb24uIFdlIGV4cGVjdCBhIGhhbmRsZXIgb24gYG9uRHJhZ1N0b3BgLCBhdCB0aGUgbGVhc3QuXG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgaWYgKGNvbnRyb2xsZWQpIHtcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5wcm9wcy5wb3NpdGlvbjtcbiAgICAgIG5ld1N0YXRlLnggPSB4O1xuICAgICAgbmV3U3RhdGUueSA9IHk7XG4gICAgfVxuICAgIGxvZygnb25EcmFnU3RvcCBuZXdTdGF0ZScsIG5ld1N0YXRlKVxuICAgIHRoaXMuc2V0U3RhdGUobmV3U3RhdGUpO1xuICB9O1xuICBzdG9wTW92ZTogYW55ID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmF1dG9TdGVwVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmF1dG9TdGVwVGltZXIpO1xuICAgIH1cbiAgfVxuICBvbktleU1vdmU6IGFueSA9IChlKSA9PiB7XG4gICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIGlmIChlICYmIChlLmtleUNvZGUgPT09IDM3IHx8IGUua2V5Q29kZSA9PT0gMzggfHwgZS5rZXlDb2RlID09PSAzOSB8fCBlLmtleUNvZGUgPT09IDQwKSkge1xuICAgICAgaWYgKGUucGVyc2lzdCkge1xuICAgICAgICBlLnBlcnNpc3QoKVxuICAgICAgfVxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMuc3RhdGU7XG4gICAgICBsZXQgX3ggPSB4O1xuICAgICAgbGV0IF95ID0geTtcbiAgICAgIC8vIGxvZygnb25LZXlVcCcsIGUua2V5Q29kZSlcbiAgICAgIC8vIGxvZygnb25LZXlVcCcsIGUua2V5Q29kZSwgdGhpcy5zdGF0ZSlcbiAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XG4gICAgICAgIC8vIOW3plxuICAgICAgICBjYXNlIDM3OlxuICAgICAgICAgIF94IC09IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOS4ilxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIF95IC09IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOWPs1xuICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgIF94ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOS4i1xuICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgIF95ICs9IDE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHsgeDogX3gsIHk6IF95IH1cbiAgICAgIHRoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25LZXlNb3ZlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25LZXlNb3ZlKGUsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b1N0ZXBUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgfSwgdGhpcy5wcm9wcy5rZXlNb3ZlU3BlZWQpO1xuICAgIH1cbiAgfVxuICBvbktleVVwOiBhbnkgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmtleU1vdmVFbmFibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICAvLyB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25LZXlVcChlKTtcbiAgfTtcbiAgb25LZXlEb3duOiBhbnkgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmtleU1vdmVFbmFibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgdGhpcy5zdG9wTW92ZSgpO1xuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGUpO1xuICB9XG4gIG1vdmVTbmFwaW5nOiBhbnkgPSAoc25hcCA9IHt9KSA9PiB7XG4gICAgY29uc3QgeyB4RGlzdGFuY2UsIHlEaXN0YW5jZSwgc25hcFRyZXNoaG9sZCB9ID0gc25hcDtcblxuICAgIGxvZygneCx5JywgeERpc3RhbmNlLCB5RGlzdGFuY2UpXG5cbiAgICBpZiAoeERpc3RhbmNlICYmIE1hdGguYWJzKHhEaXN0YW5jZSkgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHg6IHRoaXMuc3RhdGUueCArIHhEaXN0YW5jZSB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25Nb3ZlU25hcCh7IC4uLnRoaXMuc3RhdGUgfSlcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuc3RhdGUnLCB0aGlzLnN0YXRlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoeURpc3RhbmNlICYmIE1hdGguYWJzKHlEaXN0YW5jZSkgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHk6IHRoaXMuc3RhdGUueSArIHlEaXN0YW5jZSB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMucHJvcHMub25Nb3ZlU25hcCh7IC4uLnRoaXMuc3RhdGUgfSlcbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMuc3RhdGUnLCB0aGlzLnN0YXRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0IHBvc2l0aW9uUm90YXRlKCk6IGFueSB7XG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgY29uc3QgZHJhZ2dhYmxlID0gIWNvbnRyb2xsZWQgfHwgdGhpcy5zdGF0ZS5kcmFnZ2luZztcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb24gfHwgdGhpcy5wcm9wcy5kZWZhdWx0UG9zaXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNhbkRyYWdYKHRoaXMpICYmIGRyYWdnYWJsZSA/XG4gICAgICAgIHRoaXMuc3RhdGUueCA6XG4gICAgICAgIHBvc2l0aW9uLngsXG5cbiAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICB5OiBjYW5EcmFnWSh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnkgOlxuICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgZGVncmVlOiBOdW1iZXIodGhpcy5wcm9wcy5kZWdyZWUpIHx8IDBcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICBsZXQgc3R5bGUgPSB7fSwgc3ZnVHJhbnNmb3JtID0gbnVsbDtcblxuICAgIC8vIElmIHRoaXMgaXMgY29udHJvbGxlZCwgd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGl0IC0gdW5sZXNzIGl0J3MgZHJhZ2dpbmcuXG4gICAgY29uc3QgdHJhbnNmb3JtT3B0cyA9IHRoaXMucG9zaXRpb25Sb3RhdGU7XG4gICAgLy8gbG9nKCdyZW5kZXIgdHJhbnNmb3JtT3B0cycsIHRyYW5zZm9ybU9wdHMpO1xuICAgIC8vIElmIHRoaXMgZWxlbWVudCB3YXMgU1ZHLCB3ZSB1c2UgdGhlIGB0cmFuc2Zvcm1gIGF0dHJpYnV0ZS5cbiAgICBpZiAodGhpcy5zdGF0ZS5pc0VsZW1lbnRTVkcpIHtcbiAgICAgIHN2Z1RyYW5zZm9ybSA9IGNyZWF0ZVNWR1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIGEgQ1NTIHRyYW5zZm9ybSB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZC4gVGhpcyBhbGxvd3MgdXMgdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmRcbiAgICAgIC8vIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgd2hldGhlciBvciBub3QgaXQgaXMgcmVsYXRpdmVseSBvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuXG4gICAgICAvLyBJZiB0aGUgaXRlbSB5b3UgYXJlIGRyYWdnaW5nIGFscmVhZHkgaGFzIGEgdHJhbnNmb3JtIHNldCwgd3JhcCBpdCBpbiBhIDxzcGFuPiBzbyA8RHJhZ2dhYmxlPlxuICAgICAgLy8gaGFzIGEgY2xlYW4gc2xhdGUuXG4gICAgICBzdHlsZSA9IGNyZWF0ZUNTU1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQsXG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gTWFyayB3aXRoIGNsYXNzIHdoaWxlIGRyYWdnaW5nXG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCBkZWZhdWx0Q2xhc3NOYW1lLCB7XG4gICAgICBbZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nXTogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZF06IHRoaXMuc3RhdGUuZHJhZ2dlZCxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZF06IHRoaXMuc3RhdGUuZm9jdXNlZFxuICAgIH0pO1xuXG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKFxuICAgICAgPERyYWdnYWJsZUNvcmVcbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIG9uU3RhcnQ9e3RoaXMub25EcmFnU3RhcnR9XG4gICAgICAgIG9uRHJhZz17dGhpcy5vbkRyYWd9XG4gICAgICAgIG9uU3RvcD17dGhpcy5vbkRyYWdTdG9wfVxuICAgICAgICBvbktleVVwPXt0aGlzLm9uS2V5VXB9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5vbktleURvd259ID5cbiAgICAgICAge1xuICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybSxcbiAgICAgICAgICAgIHRhYkluZGV4OiAtMSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L0RyYWdnYWJsZUNvcmU+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZS5qcyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuY29uc3QgcHJlZml4ZXMgPSBbJ01veicsICdXZWJraXQnLCAnTycsICdtcyddO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWZpeChwcm9wOiBzdHJpbmc9J3RyYW5zZm9ybScpOiBzdHJpbmcge1xuICAvLyBDaGVja2luZyBzcGVjaWZpY2FsbHkgZm9yICd3aW5kb3cuZG9jdW1lbnQnIGlzIGZvciBwc2V1ZG8tYnJvd3NlciBzZXJ2ZXItc2lkZVxuICAvLyBlbnZpcm9ubWVudHMgdGhhdCBkZWZpbmUgJ3dpbmRvdycgYXMgdGhlIGdsb2JhbCBjb250ZXh0LlxuICAvLyBFLmcuIFJlYWN0LXJhaWxzIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3QtcmFpbHMvcHVsbC84NClcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJyc7XG5cbiAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG4gIGlmIChwcm9wIGluIHN0eWxlKSByZXR1cm4gJyc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChicm93c2VyUHJlZml4VG9LZXkocHJvcCwgcHJlZml4ZXNbaV0pIGluIHN0eWxlKSByZXR1cm4gcHJlZml4ZXNbaV07XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4VG9LZXkocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgJHtwcmVmaXh9JHtrZWJhYlRvVGl0bGVDYXNlKHByb3ApfWAgOiBwcm9wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeFRvU3R5bGUocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgLSR7cHJlZml4LnRvTG93ZXJDYXNlKCl9LSR7cHJvcH1gIDogcHJvcDtcbn1cblxuZnVuY3Rpb24ga2ViYWJUb1RpdGxlQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSAnJztcbiAgbGV0IHNob3VsZENhcGl0YWxpemUgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzaG91bGRDYXBpdGFsaXplKSB7XG4gICAgICBvdXQgKz0gc3RyW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgICBzaG91bGRDYXBpdGFsaXplID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPT09ICctJykge1xuICAgICAgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCArPSBzdHJbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIERlZmF1bHQgZXhwb3J0IGlzIHRoZSBwcmVmaXggaXRzZWxmLCBsaWtlICdNb3onLCAnV2Via2l0JywgZXRjXG4vLyBOb3RlIHRoYXQgeW91IG1heSBoYXZlIHRvIHJlLXRlc3QgZm9yIGNlcnRhaW4gdGhpbmdzOyBmb3IgaW5zdGFuY2UsIENocm9tZSA1MFxuLy8gY2FuIGhhbmRsZSB1bnByZWZpeGVkIGB0cmFuc2Zvcm1gLCBidXQgbm90IHVucHJlZml4ZWQgYHVzZXItc2VsZWN0YFxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJlZml4KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvZ2V0UHJlZml4LmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1xuICBhZGRFdmVudCwgcmVtb3ZlRXZlbnQsXG59IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcblxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24oYXJyYXksIGZyb20sIHRvKSB7XG4gIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICBhcnJheS5sZW5ndGggPSBmcm9tIDwgMCA/IGFycmF5Lmxlbmd0aCArIGZyb20gOiBmcm9tO1xuICByZXR1cm4gYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG59O1xuXG5jb25zdCByZW1vdmVFbnRyeSA9IGZ1bmN0aW9uKGFycmF5LCBlbnRyeSkge1xuICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGVudHJ5KTtcbiAgaWYgKGluZGV4ICE9PSAtMSkgcmVtb3ZlKGFycmF5LCBpbmRleCk7XG59O1xuXG5jb25zdCBnZXRUYXJnZXQgPSBmdW5jdGlvbihldmVudCkge1xuICByZXR1cm4gZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUFsaWduR3VpZGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRHJhZ2dhYmxlQWxpZ25HdWlkZSc7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgc25hcFRyZXNoaG9sZDogUHJvcFR5cGVzLm51Ym1lcixcbiAgICBvblNuYXBpbmc6IFByb3BUeXBlcy5mdW5jLFxuICAgIHNlbGVjdG9yOiBQcm9wVHlwZXMuc3RyaW5nLFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgc25hcFRyZXNoaG9sZDogNSxcbiAgICBzZWxlY3RvcjogJy5yZWFjdC1kcmFnZ2FibGUnLFxuICAgIG9uU25hcGluZzogKCkgPT4geyB9LFxuICB9O1xuICBlZGdlcyA9IG51bGw7XG4gIHN0YXRpY0d1aWRlcyA9IG51bGw7XG4gIHggPSAwO1xuICB5ID0gMDtcbiAgbW91c2VPZmZzZXRYID0gMDtcbiAgbW91c2VPZmZzZXRZID0gMDtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYm94ZXM6IFtdLFxuICAgICAgc25hcFRyZXNoaG9sZDogcHJvcHMuc25hcFRyZXNoaG9sZCB8fCA1LFxuICAgICAgbWluaW11bURpc3RhbmNlOiAxMCxcbiAgICAgIG9mZnNldDogbnVsbCxcbiAgICAgIHN0YXRpY0d1aWRlczogbnVsbCxcbiAgICAgIGF4aXM6IFtdXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucmVzZXRTdGF0aWNHdWlkZXMoKTtcblxuICAgIHRoaXMuY2hhcnQoKTtcbiAgfVxuXG4gIGNoYXJ0KCkge1xuICAgIHRoaXMucmVzZXRFZGdlcygpO1xuICAgIC8vIHRoaXMuZGlzdGFuY2VzID0gbmV3IE9iamVjdCgpO1xuICAgIGNvbnN0IGJveGVzID0gdGhpcy5ib3hlcztcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIGlmIChib3hlcyAmJiBib3hlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGJveGVzKSB7XG4gICAgICAgIGlmIChib3hlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgY29uc3QgYm94ID0gYm94ZXNba2V5XTtcbiAgICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSA9IGJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBpbnRlcmVzdFBvaW50cyA9IHRoaXMuZ2V0SW50ZXJlc3RQb2ludHMoe1xuICAgICAgICAgICAgeDogeCAtIHBhcmVudFJlY3QueCxcbiAgICAgICAgICAgIHk6IHkgLSBwYXJlbnRSZWN0LnksXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiB4IC0gcGFyZW50UmVjdC54ICsgd2lkdGgsXG4gICAgICAgICAgICBib3R0b206IHkgLSBwYXJlbnRSZWN0LnkgKyBoZWlnaHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5lZGdlcy54LnB1c2guYXBwbHkodGhpcy5lZGdlcy54LCBpbnRlcmVzdFBvaW50cy54KTtcbiAgICAgICAgICB0aGlzLmVkZ2VzLnkucHVzaC5hcHBseSh0aGlzLmVkZ2VzLnksIGludGVyZXN0UG9pbnRzLnkpO1xuXG4gICAgICAgICAgY29uc3QgZ3VpZGUgPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLWd1aWRlJyk7XG4gICAgICAgICAgaWYgKCFndWlkZSkge1xuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1ndWlkZScsIHRydWUpO1xuXG4gICAgICAgICAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5zdGFydCwgKGUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydFRvRHJhZyhlLCBib3gpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNob3dBbGxHdWlkZXMoKTtcbiAgfVxuICBzdGFydFRvRHJhZyhldmVudCwgYm94KSB7XG4gICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuY2xpZW50UmVjdDtcbiAgICBjb25zdCByZWN0ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IF9zdGFydFggPSByZWN0LnggLSBwYXJlbnRSZWN0Lng7XG4gICAgY29uc3QgX3N0YXJ0WSA9IHJlY3QueSAtIHBhcmVudFJlY3QueTtcbiAgICB0aGlzLm1vdXNlT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gcmVjdC5sZWZ0O1xuICAgIHRoaXMubW91c2VPZmZzZXRZID0gZXZlbnQucGFnZVkgLSByZWN0LnRvcDtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IHN0YXJ0VG9EcmFnIGdldEJvdW5kaW5nQ2xpZW50UmVjdCcsIHJlY3QsIHRoaXMubW91c2VPZmZzZXRYKVxuICAgIC8vIGNvbnNvbGUubG9nKCdkaXN0YW5jZSAtIHBvc2l0aW9uJywgZXZlbnQucGFnZVgsIHRoaXMubW91c2VPZmZzZXRYKTtcblxuICAgIHRoaXMuZXhjbHVkZUJveGZvcm1FZGdlcyh7XG4gICAgICB4OiBfc3RhcnRYLFxuICAgICAgeTogX3N0YXJ0WSxcbiAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICB9KTtcbiAgICAvLyB0aGlzLmV4Y2x1ZGVCb3hGcm9tRGlzdGFuY2VzKCk7XG4gICAgdGhpcy5zaG93QWxsR3VpZGVzKCk7XG5cbiAgICB0aGlzLmRyYWcoZXZlbnQpO1xuXG4gICAgYWRkRXZlbnQoYm94LCBldmVudHNGb3IubW91c2UubW92ZSwgdGhpcy5kcmFnKTtcbiAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5zdG9wLCB0aGlzLnN0b3BUb0RyYWcpO1xuICB9XG4gIGRyYWcgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBib3ggPSBnZXRUYXJnZXQoZXZlbnQpO1xuICAgIGNvbnN0IHJlY3QgPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2JveCBkcmFnJywgZXZlbnQpXG4gICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuY2xpZW50UmVjdDtcbiAgICB0aGlzLnggPSBldmVudC5wYWdlWCAtIHBhcmVudFJlY3QubGVmdCAtIHRoaXMubW91c2VPZmZzZXRYO1xuICAgIC8vIHRoaXMueCA9IGV2ZW50LnBhZ2VYIC0gcGFyZW50UmVjdC5sZWZ0IC0gKGV2ZW50LnBhZ2VYIC0gcmVjdC5sZWZ0KTtcbiAgICB0aGlzLnkgPSBldmVudC5wYWdlWSAtIHBhcmVudFJlY3QudG9wIC0gdGhpcy5tb3VzZU9mZnNldFk7XG4gICAgLy8gY29uc29sZS5sb2coJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCcsIGV2ZW50LnBhZ2VYLCBwYXJlbnRSZWN0LmxlZnQsIHRoaXMubW91c2VPZmZzZXRYLCB0aGlzLngpXG4gICAgdGhpcy5zbmFwVG9HdWlkZXMoeyBib3gsIHBhcmVudFJlY3QgfSk7XG4gIH1cbiAgc3RvcFRvRHJhZyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJveCA9IGdldFRhcmdldChldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2JveCBzdG9wVG9EcmFnJywgZXZlbnQpXG4gICAgdGhpcy5sb2NrZWRBeGlzID0gbnVsbDtcbiAgICB0aGlzLmNoYXJ0KCk7XG4gICAgdGhpcy5yZW1vdmVHdWlkZXMoKTtcbiAgICByZW1vdmVFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmRyYWcpO1xuICAgIHJlbW92ZUV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuc3RvcFRvRHJhZyk7XG4gIH1cbiAgc25hcFRvR3VpZGVzKHsgYm94LCBwYXJlbnRSZWN0IH0pIHtcbiAgICBjb25zdCByZWN0ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5yZW1vdmVHdWlkZXMoKTtcblxuICAgIGNvbnN0IGF4aXMgPSBbXTtcblxuICAgIGNvbnN0IHhBeGlzID0gdGhpcy5zbmFwKHtcbiAgICAgIHBhcmVudFJlY3QsXG4gICAgICByZWN0LFxuICAgICAgYXhpczogJ3gnXG4gICAgfSk7XG5cbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGF4aXMucHVzaCh4QXhpcylcbiAgICB9XG5cbiAgICBjb25zdCB5QXhpcyA9IHRoaXMuc25hcCh7XG4gICAgICBwYXJlbnRSZWN0LFxuICAgICAgcmVjdCxcbiAgICAgIGF4aXM6ICd5J1xuICAgIH0pO1xuXG4gICAgaWYgKHlBeGlzKSB7XG4gICAgICBheGlzLnB1c2goeUF4aXMpXG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgYXhpcyB9LCAoKSA9PiB7XG4gICAgICAgIGF4aXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIC8vIHRoaXMucHJvcHMub25TbmFwaW5nKGl0ZW0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25TbmFwaW5nKHtcbiAgICAgIHhEaXN0YW5jZTogdGhpcy54IC0gKHJlY3QueCAtIHBhcmVudFJlY3QueCksXG4gICAgICB5RGlzdGFuY2U6IHRoaXMueSAtIChyZWN0LnkgLSBwYXJlbnRSZWN0LnkpLFxuICAgICAgc25hcFRyZXNoaG9sZDogdGhpcy5zdGF0ZS5zbmFwVHJlc2hob2xkXG4gICAgfSlcbiAgfVxuICBzbmFwKHsgcGFyZW50UmVjdCwgcmVjdCwgYXhpcyB9KSB7XG4gICAgY29uc3QgeyBzbmFwVHJlc2hob2xkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3Qgc2lkZSA9IGF4aXMgPT09ICd4JyA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICBjb25zdCBzdGFydCA9IGF4aXMgPT09ICd4JyA/ICdsZWZ0JyA6ICd0b3AnO1xuICAgIGNvbnN0IGVuZCA9IGF4aXMgPT09ICd4JyA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXNbYXhpc107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGVkZ2VzW2ldO1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzW2F4aXNdO1xuICAgICAgY29uc3QgaGFsZlNpZGVMZW5ndGggPSBNYXRoLmFicyhyZWN0W3NpZGVdIC8gMik7XG4gICAgICBjb25zdCBjZW50ZXIgPSBkaXN0YW5jZSArIGhhbGZTaWRlTGVuZ3RoO1xuICAgICAgY29uc3QgZW5kRGlzdGFuY2UgPSBkaXN0YW5jZSArIHJlY3Rbc2lkZV07XG4gICAgICBsZXQgc2V0R3VpZGUgPSBmYWxzZTtcblxuICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlIC0gcG9zaXRpb24pIDw9IHNuYXBUcmVzaGhvbGQpIHtcbiAgICAgICAgdGhpc1theGlzXSA9IHBvc2l0aW9uO1xuICAgICAgICBzZXRHdWlkZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGNlbnRlciAtIHBvc2l0aW9uKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICAgIHRoaXNbYXhpc10gPSBwb3NpdGlvbiAtIGhhbGZTaWRlTGVuZ3RoOyAvLyBtb3ZlIHNuYXAgYmVoYXZpb3IgXG4gICAgICAgIHNldEd1aWRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZW5kRGlzdGFuY2UgLSBwb3NpdGlvbikgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgICB0aGlzW2F4aXNdID0gcG9zaXRpb24gLSByZWN0W3NpZGVdOyAvLyBtb3ZlIHNuYXAgYmVoYXZpb3IgICAgIFxuICAgICAgICBzZXRHdWlkZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRHdWlkZSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc3VjY2VzcyBheGlzIHBvc2l0aW9uIG1vdmVEaXN0YW5jZScsIGF4aXMsIHBvc2l0aW9uKVxuICAgICAgICByZXR1cm4geyBheGlzLCBwb3NpdGlvbiB9XG4gICAgICAgIC8vIHRoaXMucGFyZW50LnJlbmRlckd1aWRlKGF4aXMsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXhjbHVkZUJveGZvcm1FZGdlcyhyZWN0KSB7XG4gICAgaWYgKHRoaXMuZWRnZXMpIHtcbiAgICAgIGlmICh0aGlzLmVkZ2VzLngpIHtcbiAgICAgICAgcmVtb3ZlRW50cnkodGhpcy5lZGdlcy54LCByZWN0LngpXG4gICAgICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueCwgcmVjdC54ICsgTWF0aC5yb3VuZChyZWN0LndpZHRoIC8gMikpXG4gICAgICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueCwgcmVjdC54ICsgcmVjdC53aWR0aClcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZWRnZXMueSkge1xuICAgICAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLnksIHJlY3QueSlcbiAgICAgICAgcmVtb3ZlRW50cnkodGhpcy5lZGdlcy55LCByZWN0LnkgKyBNYXRoLnJvdW5kKHJlY3QuaGVpZ2h0IC8gMikpXG4gICAgICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueSwgcmVjdC55ICsgcmVjdC5oZWlnaHQpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHNob3dBbGxHdWlkZXMoKSB7XG5cbiAgfVxuICByZW1vdmVHdWlkZXMoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBheGlzOiBbXVxuICAgIH0pXG4gIH1cblxuICBnZXRJbnRlcmVzdFBvaW50cyhib3gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogW2JveC54LCBib3gueCArIE1hdGgucm91bmQoYm94LndpZHRoIC8gMiksIGJveC5yaWdodF0sXG4gICAgICB5OiBbYm94LnksIGJveC55ICsgTWF0aC5yb3VuZChib3guaGVpZ2h0IC8gMiksIGJveC5ib3R0b21dXG4gICAgfTtcbiAgfVxuICByZXNldFN0YXRpY0d1aWRlcygpIHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIHRoaXMuc3RhdGljR3VpZGVzID0ge1xuICAgICAgeDogWzAsIE1hdGgucm91bmQoY2xpZW50UmVjdC53aWR0aCAvIDIpLCBjbGllbnRSZWN0LndpZHRoXSxcbiAgICAgIHk6IFswLCBNYXRoLnJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0IC8gMiksIGNsaWVudFJlY3QuaGVpZ2h0XVxuICAgIH07XG4gIH1cblxuICByZXNldEVkZ2VzKCkge1xuICAgIC8vIC5zbGljZSgpIHRvIG9ubHkgY29weSB0aGVtIC0gb3RoZXJ3aXNlIGEgcmVmZXJlbmNlIHdvdWxkIGdldCBjcmVhdGVkXG4gICAgdGhpcy5lZGdlcyA9IHtcbiAgICAgIHg6IHRoaXMuc3RhdGljR3VpZGVzLnguc2xpY2UoKSxcbiAgICAgIHk6IHRoaXMuc3RhdGljR3VpZGVzLnkuc2xpY2UoKVxuICAgIH07XG4gIH1cblxuICBnZXQgYm94ZXMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5wcm9wcy5zZWxlY3RvcilcbiAgfVxuICBnZXQgY2xpZW50UmVjdCgpIHtcbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgdGhpc05vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICByZW5kZXJHdWlkZSh7IGF4aXM6IHN0cmluZywgcG9zaXRpb246IG51bWJlciwgYWRkaXRpb25hbENsYXNzIH0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gJ2d1aWRlIGF4aXMtJyArIGF4aXM7XG4gICAgaWYgKGFkZGl0aW9uYWxDbGFzcykgY2xhc3NOYW1lICs9IFwiIFwiICsgYWRkaXRpb25hbENsYXNzO1xuXG4gICAgY29uc3QgX3N0eWxlcyA9IHt9XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgX3N0eWxlcy5sZWZ0ID0gcG9zaXRpb24gKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc3R5bGVzLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17X3N0eWxlc30gLz4pXG4gIH1cbiAgcmVuZGVyQXhpcygpIHtcbiAgICBjb25zdCB7IGF4aXMgfSA9IHRoaXMuc3RhdGVcblxuICAgIGlmIChheGlzICYmIGF4aXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYXhpcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyR3VpZGUoaXRlbSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0F4aXNYLCBzaG93QXhpc1kgfSA9IHRoaXMuc3RhdGU7XG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9PlxuICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICB7dGhpcy5yZW5kZXJBeGlzKCl9XG4gICAgPC9kaXY+KVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwic291cmNlUm9vdCI6IiJ9