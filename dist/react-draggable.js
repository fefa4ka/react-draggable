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
      console.log('x,y,coreData', _this.state, coreData);
      var uiData = (0, _positionFns.createDraggableData)(_this, coreData);
      console.log('x,y,uiData', uiData);
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

      // const { axis, moveDistance, snapTreshhold, targetPosition } = snap;
      var thisNode = _reactDom2.default.findDOMNode(_this);
      var rect = thisNode.getBoundingClientRect();
      var x = snap.x,
          y = snap.y,
          parentRect = snap.parentRect,
          snapTreshhold = snap.snapTreshhold;
      // const _targetPosition = Math.abs(targetPosition)
      // const _moveDistance = Math.abs(moveDistance)

      var xDistance = x - (rect.x - parentRect.x) || 0;
      console.log('x,y', x, xDistance);
      if (xDistance && Math.abs(xDistance) <= snapTreshhold) {
        _this.setState({ x: _this.state.x + xDistance });
      }

      // if (moveDistance > 0) {
      //   _x += snapTreshhold;
      // } else {
      //   _x -= snapTreshhold
      // }
      // switch (axis) {
      //   case 'x':
      //     {
      //       // const _x = x + targetPosition;
      //       // console.log('moveSnaping moveDistance', _x, moveDistance, snapTreshhold)
      //       // if ((x + _targetPosition) <= (x + snapTreshhold)) {
      //       //   this.setState({ x: _x })
      //       // }
      //     }
      //     break;
      //   case 'y':
      //     // this.setState({ y: y + moveDistance });
      //     break;
      // }
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
      console.log('getBoundingClientRect', event.pageX, parentRect.left, _this.mouseOffsetX, _this.x);
      _this.snapToGuides({ box: box, parentRect: parentRect });
    };

    _this.stopToDrag = function (event) {
      var box = getTarget(event);
      // console.log('box stopToDrag', event)
      _this.lockedAxis = null;
      _this.chart();
      // this.removeGuides();
      (0, _domFns.removeEvent)(box, eventsFor.mouse.move, _this.drag);
      (0, _domFns.removeEvent)(box, eventsFor.mouse.stop, _this.stopToDrag);
    };

    _this.state = {
      boxes: [],
      snapTreshhold: 5,
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
      console.log('box startToDrag getBoundingClientRect', rect, this.mouseOffsetX);
      console.log('distance - position', event.pageX, this.mouseOffsetX);

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
      var resize = _ref.resize,
          box = _ref.box,
          parentRect = _ref.parentRect;

      var _resize = Boolean(resize);
      var rect = box.getBoundingClientRect();

      this.removeGuides();

      var axis = [];

      var xAxis = this.snap({
        parentRect: parentRect,
        rect: rect,
        resize: _resize,
        axis: 'x'
      });

      if (xAxis) {
        axis.push(xAxis);
      }

      console.log('this.x', this.x);

      var yAxis = this.snap({
        parentRect: parentRect,
        rect: rect,
        resize: _resize,
        axis: 'y'
      });

      if (yAxis) {
        axis.push(yAxis);
      } else {}

      if (axis.length) {
        this.setState({ axis: axis }, function () {
          axis.forEach(function (item) {
            // this.props.onSnaping(item)
          });
        });
      }

      this.props.onSnaping({ x: this.x, y: this.y, parentRect: parentRect, snapTreshhold: this.state.snapTreshhold });
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
        var moveDistance = 0;
        var targetPosition = 0;
        var setGuide = false;

        if (axis === 'x' && 190 === position) {
          // console.log('Math.abs(distance - position)', edges, distance, Math.abs(distance - position), Math.abs(distance - position) <= snapTreshhold)
        }

        if (Math.abs(distance - position) <= snapTreshhold) {
          this[axis] = position;
          targetPosition = position;
          moveDistance = position - distance;
          setGuide = true;
          console.log('moveDistancemoveDistance', moveDistance, distance - position);
        } else if (Math.abs(center - position) <= snapTreshhold) {
          this[axis] = position - halfSideLength; // move snap behavior 
          targetPosition = position - halfSideLength;
          moveDistance = center - position;
          setGuide = true;
        } else if (Math.abs(endDistance - position) <= snapTreshhold) {
          this[axis] = position - rect[side]; // move snap behavior     
          targetPosition = position - rect[side];
          moveDistance = endDistance - position;
          setGuide = true;
        }

        if (setGuide) {
          targetPosition = targetPosition - (rect[axis] - parentRect[axis]);
          console.log('success axis position moveDistance', axis, position, moveDistance);
          return { axis: axis, position: position, moveDistance: moveDistance, snapTreshhold: snapTreshhold, targetPosition: targetPosition
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
      return document.querySelectorAll('.react-draggable');
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
  onSnaping: _propTypes2.default.func
};
DraggableAlignGuide.defaultProps = {
  onSnaping: function onSnaping() {}
};
exports.default = DraggableAlignGuide;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIGM0NjBiMDY3YWNjZTcwMzcwYTM3IiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifSIsIi4uLy4vbGliL3V0aWxzL2RvbUZucy5qcyIsIi4uLy4vbGliL3V0aWxzL3NoaW1zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwiLi4vLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLi4vLi9saWIvdXRpbHMvbG9nLmpzIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4vbGliL3V0aWxzL2dldFByZWZpeC5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwibmFtZXMiOlsibWF0Y2hlc1NlbGVjdG9yIiwibWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsIm91dGVySGVpZ2h0Iiwib3V0ZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm9mZnNldFhZRnJvbVBhcmVudCIsImNyZWF0ZUNTU1RyYW5zZm9ybSIsImNyZWF0ZVNWR1RyYW5zZm9ybSIsImdldFRvdWNoIiwiZ2V0VG91Y2hJZGVudGlmaWVyIiwiYWRkVXNlclNlbGVjdFN0eWxlcyIsInJlbW92ZVVzZXJTZWxlY3RTdHlsZXMiLCJzdHlsZUhhY2tzIiwiYWRkQ2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3NOYW1lIiwibWF0Y2hlc1NlbGVjdG9yRnVuYyIsImVsIiwic2VsZWN0b3IiLCJtZXRob2QiLCJjYWxsIiwiYmFzZU5vZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsImV2ZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbXB1dGVkU3R5bGUiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImV2dCIsIm9mZnNldFBhcmVudCIsImlzQm9keSIsImJvZHkiLCJvZmZzZXRQYXJlbnRSZWN0IiwibGVmdCIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwic2Nyb2xsTGVmdCIsInkiLCJjbGllbnRZIiwic2Nyb2xsVG9wIiwiZGVncmVlIiwiY3NzU3R5bGUiLCJlIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJkb2MiLCJzdHlsZUVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImlkIiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsImNoaWxkU3R5bGUiLCJ0b3VjaEFjdGlvbiIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsIm1hdGNoIiwiUmVnRXhwIiwicmVtb3ZlIiwicmVwbGFjZSIsImZpbmRJbkFycmF5IiwiaXNGdW5jdGlvbiIsImlzTnVtIiwiaW50IiwiZG9udFNldE1lIiwiYXJyYXkiLCJjYWxsYmFjayIsImkiLCJsZW5ndGgiLCJhcHBseSIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm51bSIsImlzTmFOIiwiYSIsInBhcnNlSW50IiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJFcnJvciIsImdldEJvdW5kUG9zaXRpb24iLCJzbmFwVG9HcmlkIiwiY2FuRHJhZ1giLCJjYW5EcmFnWSIsImdldENvbnRyb2xQb3NpdGlvbiIsImNyZWF0ZUNvcmVEYXRhIiwiY3JlYXRlRHJhZ2dhYmxlRGF0YSIsImRyYWdnYWJsZSIsImJvdW5kcyIsImNsb25lQm91bmRzIiwiZmluZERPTU5vZGUiLCJvd25lcldpbmRvdyIsImJvdW5kTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MRWxlbWVudCIsIm5vZGVTdHlsZSIsImJvdW5kTm9kZVN0eWxlIiwib2Zmc2V0TGVmdCIsIm1hcmdpbkxlZnQiLCJvZmZzZXRUb3AiLCJtYXJnaW5Ub3AiLCJyaWdodCIsIm1hcmdpblJpZ2h0IiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwiTWF0aCIsIm1pbiIsIm1heCIsImdyaWQiLCJwZW5kaW5nWCIsInBlbmRpbmdZIiwicm91bmQiLCJheGlzIiwidG91Y2hJZGVudGlmaWVyIiwiZHJhZ2dhYmxlQ29yZSIsInRvdWNoT2JqIiwic3RhdGUiLCJpc1N0YXJ0IiwibGFzdFgiLCJkZWx0YVgiLCJkZWx0YVkiLCJsYXN0WSIsImNvcmVEYXRhIiwiZXZlbnRzRm9yIiwidG91Y2giLCJzdGFydCIsIm1vdmUiLCJzdG9wIiwibW91c2UiLCJkcmFnRXZlbnRGb3IiLCJEcmFnZ2FibGVDb3JlIiwiZHJhZ2dpbmciLCJOYU4iLCJoYW5kbGVEcmFnU3RhcnQiLCJvbk1vdXNlRG93biIsImFsbG93QW55Q2xpY2siLCJidXR0b24iLCJ0aGlzTm9kZSIsImRpc2FibGVkIiwidGFyZ2V0IiwiTm9kZSIsImhhbmRsZSIsImNhbmNlbCIsInNldFN0YXRlIiwicG9zaXRpb24iLCJjb3JlRXZlbnQiLCJvblN0YXJ0Iiwic2hvdWxkVXBkYXRlIiwiZW5hYmxlVXNlclNlbGVjdEhhY2siLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJhZ1N0b3AiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiaXNBcnJheSIsIm9uRHJhZyIsIk1vdXNlRXZlbnQiLCJlcnIiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJvblN0b3AiLCJvbk1vdXNlVXAiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25LZXlVcCIsIm9uS2V5RG93biIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkcmVuIiwic3R5bGUiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJwcm9jZXNzIiwiYnJvd3NlciIsIm5vZGVUeXBlIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsInRyYW5zZm9ybSIsImRlZmF1bHRQcm9wcyIsImxvZyIsIkRyYWdnYWJsZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkRyYWdnYWJsZUFsaWduR3VpZGUiLCJhdXRvU3RlcFRpbWVyIiwib25EcmFnU3RhcnQiLCJzaG91bGRTdGFydCIsImRyYWdnZWQiLCJjb25zb2xlIiwidWlEYXRhIiwibmV3U3RhdGUiLCJzbGFja1giLCJzbGFja1kiLCJuZXdTdGF0ZVgiLCJuZXdTdGF0ZVkiLCJvbkRyYWdTdG9wIiwic2hvdWxkU3RvcCIsImNvbnRyb2xsZWQiLCJCb29sZWFuIiwic3RvcE1vdmUiLCJjbGVhclRpbWVvdXQiLCJvbktleU1vdmUiLCJrZXlDb2RlIiwicGVyc2lzdCIsIl94IiwiX3kiLCJzZXRUaW1lb3V0Iiwia2V5TW92ZVNwZWVkIiwia2V5TW92ZUVuYWJsZWQiLCJtb3ZlU25hcGluZyIsInNuYXAiLCJyZWN0IiwicGFyZW50UmVjdCIsInNuYXBUcmVzaGhvbGQiLCJ4RGlzdGFuY2UiLCJhYnMiLCJkZWZhdWx0UG9zaXRpb24iLCJpc0VsZW1lbnRTVkciLCJmb2N1c2VkIiwid2FybiIsIlNWR0VsZW1lbnQiLCJuZXh0UHJvcHMiLCJzdmdUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm1PcHRzIiwicG9zaXRpb25Sb3RhdGUiLCJkZWZhdWx0Q2xhc3NOYW1lIiwiZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nIiwiZGVmYXVsdENsYXNzTmFtZURyYWdnZWQiLCJkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZCIsInRhYkluZGV4IiwiTnVtYmVyIiwib25lT2YiLCJvbmVPZlR5cGUiLCJzaGFwZSIsImdldFByZWZpeCIsImJyb3dzZXJQcmVmaXhUb0tleSIsImJyb3dzZXJQcmVmaXhUb1N0eWxlIiwicHJlZml4ZXMiLCJwcm9wIiwiZG9jdW1lbnRFbGVtZW50IiwicHJlZml4Iiwia2ViYWJUb1RpdGxlQ2FzZSIsInRvTG93ZXJDYXNlIiwic3RyIiwib3V0Iiwic2hvdWxkQ2FwaXRhbGl6ZSIsInRvVXBwZXJDYXNlIiwiZnJvbSIsInRvIiwicmVzdCIsInNsaWNlIiwicHVzaCIsInJlbW92ZUVudHJ5IiwiZW50cnkiLCJpbmRleCIsImluZGV4T2YiLCJnZXRUYXJnZXQiLCJjdXJyZW50VGFyZ2V0Iiwic3JjRWxlbWVudCIsImVkZ2VzIiwic3RhdGljR3VpZGVzIiwibW91c2VPZmZzZXRYIiwibW91c2VPZmZzZXRZIiwiZHJhZyIsImJveCIsImNsaWVudFJlY3QiLCJwYWdlWCIsInBhZ2VZIiwic25hcFRvR3VpZGVzIiwic3RvcFRvRHJhZyIsImxvY2tlZEF4aXMiLCJjaGFydCIsImJveGVzIiwibWluaW11bURpc3RhbmNlIiwib2Zmc2V0IiwicmVzZXRTdGF0aWNHdWlkZXMiLCJyZXNldEVkZ2VzIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJpbnRlcmVzdFBvaW50cyIsImdldEludGVyZXN0UG9pbnRzIiwiZ3VpZGUiLCJnZXRBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiLCJzdGFydFRvRHJhZyIsInNob3dBbGxHdWlkZXMiLCJfc3RhcnRYIiwiX3N0YXJ0WSIsImV4Y2x1ZGVCb3hmb3JtRWRnZXMiLCJyZXNpemUiLCJfcmVzaXplIiwicmVtb3ZlR3VpZGVzIiwieEF4aXMiLCJ5QXhpcyIsImZvckVhY2giLCJpdGVtIiwib25TbmFwaW5nIiwic2lkZSIsImVuZCIsImRpc3RhbmNlIiwiaGFsZlNpZGVMZW5ndGgiLCJjZW50ZXIiLCJlbmREaXN0YW5jZSIsIm1vdmVEaXN0YW5jZSIsInRhcmdldFBvc2l0aW9uIiwic2V0R3VpZGUiLCJhZGRpdGlvbmFsQ2xhc3MiLCJfc3R5bGVzIiwibWFwIiwicmVuZGVyR3VpZGUiLCJzaG93QXhpc1giLCJzaG93QXhpc1kiLCJyZW5kZXJBeGlzIiwicXVlcnlTZWxlY3RvckFsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LDZCQUE2QjtBQUM3QixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULDRCQUE0QjtBQUM1QixPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNCQUFzQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQiwyQkFBMkI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixnQ0FBZ0M7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLGdDQUFnQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM3aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0Es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QUFpQmQsSUFBakIsQ0FBUDtBQUNELFNBRk0sQ0FBUDtBQUdEOztBQUVELGFBQU8sSUFBUDtBQUNEOzs7NkJBQ1E7QUFBQSxtQkFDMEIsS0FBS3pMLEtBRC9CO0FBQUEsVUFDQ3dNLFNBREQsVUFDQ0EsU0FERDtBQUFBLFVBQ1lDLFNBRFosVUFDWUEsU0FEWjtBQUVQO0FBQ0E7O0FBQ0EsYUFBUTtBQUFBO0FBQVMsYUFBS2pQLEtBQWQ7QUFDTCxhQUFLQSxLQUFMLENBQVc2RixRQUROO0FBRUwsYUFBS3FKLFVBQUw7QUFGSyxPQUFSO0FBSUQ7Ozt3QkF2Q1c7QUFDVixhQUFPakssU0FBU2tLLGdCQUFULENBQTBCLGtCQUExQixDQUFQO0FBQ0Q7Ozt3QkFDZ0I7QUFDZixVQUFNdEwsV0FBVyxtQkFBUy9DLFdBQVQsQ0FBcUIsSUFBckIsQ0FBakI7QUFDQSxhQUFPK0MsU0FBU2xILHFCQUFULEVBQVA7QUFDRDs7OztFQTFQOEMsZ0JBQU1vSixTOztBQUFsQ2tCLG1CLENBQ1pqQixXLEdBQWMscUI7QUFERmlCLG1CLENBRVpoQixTLEdBQVk7QUFDakJpSSxhQUFXLG9CQUFVMU87QUFESixDO0FBRkF5SCxtQixDQU1aUCxZLEdBQWU7QUFDcEJ3SCxhQUFXLHFCQUFNLENBQUc7QUFEQSxDO2tCQU5IakgsbUIiLCJmaWxlIjoiLi9kaXN0L3JlYWN0LWRyYWdnYWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0LWRvbVwiKSwgcmVxdWlyZShcInJlYWN0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0LWRvbVwiLCBcInJlYWN0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0RHJhZ2dhYmxlXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3QtZG9tXCIpLCByZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0RHJhZ2dhYmxlXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RET01cIl0sIHJvb3RbXCJSZWFjdFwiXSk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fKSB7XG5yZXR1cm4gXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDEyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNDYwYjA2N2FjY2U3MDM3MGEzNyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8wX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifVxuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuaW1wb3J0IHsgZmluZEluQXJyYXksIGlzRnVuY3Rpb24sIGludCB9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IGJyb3dzZXJQcmVmaXgsIHsgYnJvd3NlclByZWZpeFRvS2V5IH0gZnJvbSAnLi9nZXRQcmVmaXgnO1xuXG5pbXBvcnQgdHlwZSB7Q29udHJvbFBvc2l0aW9uLCBNb3VzZVRvdWNoRXZlbnQgfSBmcm9tICcuL3R5cGVzJztcblxubGV0IG1hdGNoZXNTZWxlY3RvckZ1bmMgPSAnJztcbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoZWw6IE5vZGUsIHNlbGVjdG9yOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKCFtYXRjaGVzU2VsZWN0b3JGdW5jKSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9IGZpbmRJbkFycmF5KFtcbiAgICAgICdtYXRjaGVzJyxcbiAgICAgICd3ZWJraXRNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ21vek1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbXNNYXRjaGVzU2VsZWN0b3InLFxuICAgICAgJ29NYXRjaGVzU2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgICByZXR1cm4gaXNGdW5jdGlvbihlbFttZXRob2RdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgcmV0dXJuIGVsW21hdGNoZXNTZWxlY3RvckZ1bmNdLmNhbGwoZWwsIHNlbGVjdG9yKTtcbn1cblxuLy8gV29ya3MgdXAgdGhlIHRyZWUgdG8gdGhlIGRyYWdnYWJsZSBpdHNlbGYgYXR0ZW1wdGluZyB0byBtYXRjaCBzZWxlY3Rvci5cbmV4cG9ydCBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZWw6IE5vZGUsIHNlbGVjdG9yOiBzdHJpbmcsIGJhc2VOb2RlOiBOb2RlKTogYm9vbGVhbiB7XG4gIGxldCBub2RlID0gZWw7XG4gIGRvIHtcbiAgICBpZiAobWF0Y2hlc1NlbGVjdG9yKG5vZGUsIHNlbGVjdG9yKSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKG5vZGUgPT09IGJhc2VOb2RlKSByZXR1cm4gZmFsc2U7XG4gICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgfSB3aGlsZSAobm9kZSk7XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkRXZlbnQoZWw6ID9Ob2RlLCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuYXR0YWNoRXZlbnQpIHtcbiAgICBlbC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IGhhbmRsZXI7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUV2ZW50KGVsOiA/Tm9kZSwgZXZlbnQ6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cbiAgaWYgKGVsLmRldGFjaEV2ZW50KSB7XG4gICAgZWwuZGV0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBoYW5kbGVyKTtcbiAgfSBlbHNlIGlmIChlbC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlciwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICAgIGVsWydvbicgKyBldmVudF0gPSBudWxsO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdXRlckhlaWdodChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIC8vIFRoaXMgaXMgZGVsaWJlcmF0ZWx5IGV4Y2x1ZGluZyBtYXJnaW4gZm9yIG91ciBjYWxjdWxhdGlvbnMsIHNpbmNlIHdlIGFyZSB1c2luZ1xuICAvLyBvZmZzZXRUb3Agd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJUb3BXaWR0aCk7XG4gIGhlaWdodCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJCb3R0b21XaWR0aCk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvdXRlcldpZHRoKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldExlZnQgd2hpY2ggaXMgaW5jbHVkaW5nIG1hcmdpbi4gU2VlIGdldEJvdW5kUG9zaXRpb25cbiAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJMZWZ0V2lkdGgpO1xuICB3aWR0aCArPSBpbnQoY29tcHV0ZWRTdHlsZS5ib3JkZXJSaWdodFdpZHRoKTtcbiAgcmV0dXJuIHdpZHRoO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlubmVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IGhlaWdodCA9IG5vZGUuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIGhlaWdodCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nVG9wKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdCb3R0b20pO1xuICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5uZXJXaWR0aChub2RlOiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gIGxldCB3aWR0aCA9IG5vZGUuY2xpZW50V2lkdGg7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgd2lkdGggLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0xlZnQpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nUmlnaHQpO1xuICByZXR1cm4gd2lkdGg7XG59XG5cbi8vIEdldCBmcm9tIG9mZnNldFBhcmVudFxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldFhZRnJvbVBhcmVudChldnQ6IHsgY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIgfSwgb2Zmc2V0UGFyZW50OiBIVE1MRWxlbWVudCk6IENvbnRyb2xQb3NpdGlvbiB7XG4gIGNvbnN0IGlzQm9keSA9IG9mZnNldFBhcmVudCA9PT0gb2Zmc2V0UGFyZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgY29uc3Qgb2Zmc2V0UGFyZW50UmVjdCA9IGlzQm9keSA/IHsgbGVmdDogMCwgdG9wOiAwIH0gOiBvZmZzZXRQYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgY29uc3QgeCA9IGV2dC5jbGllbnRYICsgb2Zmc2V0UGFyZW50LnNjcm9sbExlZnQgLSBvZmZzZXRQYXJlbnRSZWN0LmxlZnQ7XG4gIGNvbnN0IHkgPSBldnQuY2xpZW50WSArIG9mZnNldFBhcmVudC5zY3JvbGxUb3AgLSBvZmZzZXRQYXJlbnRSZWN0LnRvcDtcblxuICByZXR1cm4geyB4LCB5IH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDU1NUcmFuc2Zvcm0oeyB4LCB5LCBkZWdyZWUgfTogeyB4OiBudW1iZXIsIHk6IG51bWJlciwgZGVncmVlOiBudW1iZXIgfSk6IE9iamVjdCB7XG4gIC8vIFJlcGxhY2UgdW5pdGxlc3MgaXRlbXMgd2l0aCBweFxuICBsZXQgY3NzU3R5bGUgPSAnJztcbiAgaWYgKGRlZ3JlZSkge1xuICAgIGNzc1N0eWxlID0gJ3RyYW5zbGF0ZSgnICsgeCArICdweCwnICsgeSArICdweCkgcm90YXRlKCcgKyBkZWdyZWUgKyAnZGVnKSc7XG5cbiAgfSBlbHNlIHtcbiAgICBjc3NTdHlsZSA9ICd0cmFuc2xhdGUoJyArIHggKyAncHgsJyArIHkgKyAncHgpJztcbiAgfVxuICByZXR1cm4geyBbYnJvd3NlclByZWZpeFRvS2V5KCd0cmFuc2Zvcm0nLCBicm93c2VyUHJlZml4KV06IGNzc1N0eWxlIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTVkdUcmFuc2Zvcm0oeyB4LCB5IH06IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfSk6IHN0cmluZyB7XG4gIHJldHVybiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoKGU6IE1vdXNlVG91Y2hFdmVudCwgaWRlbnRpZmllcjogbnVtYmVyKTogP3sgY2xpZW50WDogbnVtYmVyLCBjbGllbnRZOiBudW1iZXIgfSB7XG4gIHJldHVybiAoZS50YXJnZXRUb3VjaGVzICYmIGZpbmRJbkFycmF5KGUudGFyZ2V0VG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKSB8fFxuICAgIChlLmNoYW5nZWRUb3VjaGVzICYmIGZpbmRJbkFycmF5KGUuY2hhbmdlZFRvdWNoZXMsIHQgPT4gaWRlbnRpZmllciA9PT0gdC5pZGVudGlmaWVyKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUb3VjaElkZW50aWZpZXIoZTogTW91c2VUb3VjaEV2ZW50KTogP251bWJlciB7XG4gIGlmIChlLnRhcmdldFRvdWNoZXMgJiYgZS50YXJnZXRUb3VjaGVzWzBdKSByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXNbMF0pIHJldHVybiBlLmNoYW5nZWRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG59XG5cbi8vIFVzZXItc2VsZWN0IEhhY2tzOlxuLy9cbi8vIFVzZWZ1bCBmb3IgcHJldmVudGluZyBibHVlIGhpZ2hsaWdodHMgYWxsIG92ZXIgZXZlcnl0aGluZyB3aGVuIGRyYWdnaW5nLlxuXG4vLyBOb3RlIHdlJ3JlIHBhc3NpbmcgYGRvY3VtZW50YCBiL2Mgd2UgY291bGQgYmUgaWZyYW1lZFxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVzZXJTZWxlY3RTdHlsZXMoZG9jOiBEb2N1bWVudCkge1xuICBsZXQgc3R5bGVFbCA9IGRvYy5nZXRFbGVtZW50QnlJZCgncmVhY3QtZHJhZ2dhYmxlLXN0eWxlLWVsJyk7XG4gIGlmICghc3R5bGVFbCkge1xuICAgIHN0eWxlRWwgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICBzdHlsZUVsLnR5cGUgPSAndGV4dC9jc3MnO1xuICAgIHN0eWxlRWwuaWQgPSAncmVhY3QtZHJhZ2dhYmxlLXN0eWxlLWVsJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCA9ICcucmVhY3QtZHJhZ2dhYmxlLXRyYW5zcGFyZW50LXNlbGVjdGlvbiAqOjotbW96LXNlbGVjdGlvbiB7YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7fVxcbic7XG4gICAgc3R5bGVFbC5pbm5lckhUTUwgKz0gJy5yZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uICo6OnNlbGVjdGlvbiB7YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7fVxcbic7XG4gICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGVFbCk7XG4gIH1cbiAgaWYgKGRvYy5ib2R5KSBhZGRDbGFzc05hbWUoZG9jLmJvZHksICdyZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKGRvYzogRG9jdW1lbnQpIHtcbiAgaWYgKGRvYy5ib2R5KSByZW1vdmVDbGFzc05hbWUoZG9jLmJvZHksICdyZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uJyk7XG4gIHRyeSB7XG4gICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpOyAgLy8gcmVtb3ZlIHNlbGVjdGlvbiBjYXVzZWQgYnkgc2Nyb2xsXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBwcm9iYWJseSBJRVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZUhhY2tzKGNoaWxkU3R5bGU6IE9iamVjdCA9IHt9KTogT2JqZWN0IHtcbiAgLy8gV29ya2Fyb3VuZCBJRSBwb2ludGVyIGV2ZW50czsgc2VlICM1MVxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vbXphYnJpc2tpZS9yZWFjdC1kcmFnZ2FibGUvaXNzdWVzLzUxI2lzc3VlY29tbWVudC0xMDM0ODgyNzhcbiAgcmV0dXJuIHtcbiAgICB0b3VjaEFjdGlvbjogJ25vbmUnLFxuICAgIC4uLmNoaWxkU3R5bGVcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFkZENsYXNzTmFtZShlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFlbC5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cChgKD86XnxcXFxccykke2NsYXNzTmFtZX0oPyFcXFxcUylgKSkpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSBgICR7Y2xhc3NOYW1lfWA7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVDbGFzc05hbWUoZWw6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZykge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Ol58XFxcXHMpJHtjbGFzc05hbWV9KD8hXFxcXFMpYCwgJ2cnKSwgJycpO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvZG9tRm5zLmpzIiwiLy8gQGZsb3dcbi8vIEBjcmVkaXRzIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JvZ296aG5pa29mZi9hNDNjZmVkMjdjNDFlNGU2OGNkY1xuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbkFycmF5KGFycmF5OiBBcnJheTxhbnk+IHwgVG91Y2hMaXN0LCBjYWxsYmFjazogRnVuY3Rpb24pOiBhbnkge1xuICBmb3IgKGxldCBpID0gMCwgbGVuZ3RoID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2FsbGJhY2suYXBwbHkoY2FsbGJhY2ssIFthcnJheVtpXSwgaSwgYXJyYXldKSkgcmV0dXJuIGFycmF5W2ldO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmM6IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmMpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNOdW0obnVtOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIHR5cGVvZiBudW0gPT09ICdudW1iZXInICYmICFpc05hTihudW0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW50KGE6IHN0cmluZyk6IG51bWJlciB7XG4gIHJldHVybiBwYXJzZUludChhLCAxMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkb250U2V0TWUocHJvcHM6IE9iamVjdCwgcHJvcE5hbWU6IHN0cmluZywgY29tcG9uZW50TmFtZTogc3RyaW5nKSB7XG4gIGlmIChwcm9wc1twcm9wTmFtZV0pIHtcbiAgICByZXR1cm4gbmV3IEVycm9yKGBJbnZhbGlkIHByb3AgJHtwcm9wTmFtZX0gcGFzc2VkIHRvICR7Y29tcG9uZW50TmFtZX0gLSBkbyBub3Qgc2V0IHRoaXMsIHNldCBpdCBvbiB0aGUgY2hpbGQuYCk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9zaGltcy5qcyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX187XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifVxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgIFN5bWJvbC5mb3IgJiZcbiAgICBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykpIHx8XG4gICAgMHhlYWM3O1xuXG4gIHZhciBpc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJlxuICAgICAgb2JqZWN0ICE9PSBudWxsICYmXG4gICAgICBvYmplY3QuJCR0eXBlb2YgPT09IFJFQUNUX0VMRU1FTlRfVFlQRTtcbiAgfTtcblxuICAvLyBCeSBleHBsaWNpdGx5IHVzaW5nIGBwcm9wLXR5cGVzYCB5b3UgYXJlIG9wdGluZyBpbnRvIG5ldyBkZXZlbG9wbWVudCBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICB2YXIgdGhyb3dPbkRpcmVjdEFjY2VzcyA9IHRydWU7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9mYWN0b3J5V2l0aFR5cGVDaGVja2VycycpKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKTtcbn0gZWxzZSB7XG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IHByb2R1Y3Rpb24gYmVoYXZpb3IuXG4gIC8vIGh0dHA6Ly9mYi5tZS9wcm9wLXR5cGVzLWluLXByb2RcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcycpKCk7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqIFxuICovXG5cbmZ1bmN0aW9uIG1ha2VFbXB0eUZ1bmN0aW9uKGFyZykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBhcmc7XG4gIH07XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBhY2NlcHRzIGFuZCBkaXNjYXJkcyBpbnB1dHM7IGl0IGhhcyBubyBzaWRlIGVmZmVjdHMuIFRoaXMgaXNcbiAqIHByaW1hcmlseSB1c2VmdWwgaWRpb21hdGljYWxseSBmb3Igb3ZlcnJpZGFibGUgZnVuY3Rpb24gZW5kcG9pbnRzIHdoaWNoXG4gKiBhbHdheXMgbmVlZCB0byBiZSBjYWxsYWJsZSwgc2luY2UgSlMgbGFja3MgYSBudWxsLWNhbGwgaWRpb20gYWxhIENvY29hLlxuICovXG52YXIgZW1wdHlGdW5jdGlvbiA9IGZ1bmN0aW9uIGVtcHR5RnVuY3Rpb24oKSB7fTtcblxuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJucyA9IG1ha2VFbXB0eUZ1bmN0aW9uO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0ZhbHNlID0gbWFrZUVtcHR5RnVuY3Rpb24oZmFsc2UpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RydWUgPSBtYWtlRW1wdHlGdW5jdGlvbih0cnVlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsID0gbWFrZUVtcHR5RnVuY3Rpb24obnVsbCk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVGhpcyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50ID0gZnVuY3Rpb24gKGFyZykge1xuICByZXR1cm4gYXJnO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eUZ1bmN0aW9uO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVzZSBpbnZhcmlhbnQoKSB0byBhc3NlcnQgc3RhdGUgd2hpY2ggeW91ciBwcm9ncmFtIGFzc3VtZXMgdG8gYmUgdHJ1ZS5cbiAqXG4gKiBQcm92aWRlIHNwcmludGYtc3R5bGUgZm9ybWF0IChvbmx5ICVzIGlzIHN1cHBvcnRlZCkgYW5kIGFyZ3VtZW50c1xuICogdG8gcHJvdmlkZSBpbmZvcm1hdGlvbiBhYm91dCB3aGF0IGJyb2tlIGFuZCB3aGF0IHlvdSB3ZXJlXG4gKiBleHBlY3RpbmcuXG4gKlxuICogVGhlIGludmFyaWFudCBtZXNzYWdlIHdpbGwgYmUgc3RyaXBwZWQgaW4gcHJvZHVjdGlvbiwgYnV0IHRoZSBpbnZhcmlhbnRcbiAqIHdpbGwgcmVtYWluIHRvIGVuc3VyZSBsb2dpYyBkb2VzIG5vdCBkaWZmZXIgaW4gcHJvZHVjdGlvbi5cbiAqL1xuXG52YXIgdmFsaWRhdGVGb3JtYXQgPSBmdW5jdGlvbiB2YWxpZGF0ZUZvcm1hdChmb3JtYXQpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2ZianMvbGliL2ludmFyaWFudC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICB2YXIgbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignYHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgcmV0dXJuOyAvLyBJZ25vcmUgQ29tcG9zaXRlQ29tcG9uZW50IHByb3B0eXBlIGNoZWNrLlxuICAgIH1cblxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuaW1wb3J0IHtpc051bSwgaW50fSBmcm9tICcuL3NoaW1zJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtnZXRUb3VjaCwgaW5uZXJXaWR0aCwgaW5uZXJIZWlnaHQsIG9mZnNldFhZRnJvbVBhcmVudCwgb3V0ZXJXaWR0aCwgb3V0ZXJIZWlnaHR9IGZyb20gJy4vZG9tRm5zJztcblxuaW1wb3J0IHR5cGUgRHJhZ2dhYmxlIGZyb20gJy4uL0RyYWdnYWJsZSc7XG5pbXBvcnQgdHlwZSB7Qm91bmRzLCBDb250cm9sUG9zaXRpb24sIERyYWdnYWJsZURhdGEsIE1vdXNlVG91Y2hFdmVudH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgdHlwZSBEcmFnZ2FibGVDb3JlIGZyb20gJy4uL0RyYWdnYWJsZUNvcmUnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm91bmRQb3NpdGlvbihkcmFnZ2FibGU6IERyYWdnYWJsZSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgLy8gSWYgbm8gYm91bmRzLCBzaG9ydC1jaXJjdWl0IGFuZCBtb3ZlIG9uXG4gIGlmICghZHJhZ2dhYmxlLnByb3BzLmJvdW5kcykgcmV0dXJuIFt4LCB5XTtcblxuICAvLyBDbG9uZSBuZXcgYm91bmRzXG4gIGxldCB7Ym91bmRzfSA9IGRyYWdnYWJsZS5wcm9wcztcbiAgYm91bmRzID0gdHlwZW9mIGJvdW5kcyA9PT0gJ3N0cmluZycgPyBib3VuZHMgOiBjbG9uZUJvdW5kcyhib3VuZHMpO1xuICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoZHJhZ2dhYmxlKTtcblxuICBpZiAodHlwZW9mIGJvdW5kcyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCB7b3duZXJEb2N1bWVudH0gPSBub2RlO1xuICAgIGNvbnN0IG93bmVyV2luZG93ID0gb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldztcbiAgICBsZXQgYm91bmROb2RlO1xuICAgIGlmIChib3VuZHMgPT09ICdwYXJlbnQnKSB7XG4gICAgICBib3VuZE5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdW5kTm9kZSA9IG93bmVyRG9jdW1lbnQucXVlcnlTZWxlY3Rvcihib3VuZHMpO1xuICAgIH1cbiAgICBpZiAoIShib3VuZE5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQm91bmRzIHNlbGVjdG9yIFwiJyArIGJvdW5kcyArICdcIiBjb3VsZCBub3QgZmluZCBhbiBlbGVtZW50LicpO1xuICAgIH1cbiAgICBjb25zdCBub2RlU3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICAgIGNvbnN0IGJvdW5kTm9kZVN0eWxlID0gb3duZXJXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShib3VuZE5vZGUpO1xuICAgIC8vIENvbXB1dGUgYm91bmRzLiBUaGlzIGlzIGEgcGFpbiB3aXRoIHBhZGRpbmcgYW5kIG9mZnNldHMgYnV0IHRoaXMgZ2V0cyBpdCBleGFjdGx5IHJpZ2h0LlxuICAgIGJvdW5kcyA9IHtcbiAgICAgIGxlZnQ6IC1ub2RlLm9mZnNldExlZnQgKyBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ0xlZnQpICsgaW50KG5vZGVTdHlsZS5tYXJnaW5MZWZ0KSxcbiAgICAgIHRvcDogLW5vZGUub2Zmc2V0VG9wICsgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdUb3ApICsgaW50KG5vZGVTdHlsZS5tYXJnaW5Ub3ApLFxuICAgICAgcmlnaHQ6IGlubmVyV2lkdGgoYm91bmROb2RlKSAtIG91dGVyV2lkdGgobm9kZSkgLSBub2RlLm9mZnNldExlZnQgK1xuICAgICAgICBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ1JpZ2h0KSAtIGludChub2RlU3R5bGUubWFyZ2luUmlnaHQpLFxuICAgICAgYm90dG9tOiBpbm5lckhlaWdodChib3VuZE5vZGUpIC0gb3V0ZXJIZWlnaHQobm9kZSkgLSBub2RlLm9mZnNldFRvcCArXG4gICAgICAgIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nQm90dG9tKSAtIGludChub2RlU3R5bGUubWFyZ2luQm90dG9tKVxuICAgIH07XG4gIH1cblxuICAvLyBLZWVwIHggYW5kIHkgYmVsb3cgcmlnaHQgYW5kIGJvdHRvbSBsaW1pdHMuLi5cbiAgaWYgKGlzTnVtKGJvdW5kcy5yaWdodCkpIHggPSBNYXRoLm1pbih4LCBib3VuZHMucmlnaHQpO1xuICBpZiAoaXNOdW0oYm91bmRzLmJvdHRvbSkpIHkgPSBNYXRoLm1pbih5LCBib3VuZHMuYm90dG9tKTtcblxuICAvLyBCdXQgYWJvdmUgbGVmdCBhbmQgdG9wIGxpbWl0cy5cbiAgaWYgKGlzTnVtKGJvdW5kcy5sZWZ0KSkgeCA9IE1hdGgubWF4KHgsIGJvdW5kcy5sZWZ0KTtcbiAgaWYgKGlzTnVtKGJvdW5kcy50b3ApKSB5ID0gTWF0aC5tYXgoeSwgYm91bmRzLnRvcCk7XG5cbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNuYXBUb0dyaWQoZ3JpZDogW251bWJlciwgbnVtYmVyXSwgcGVuZGluZ1g6IG51bWJlciwgcGVuZGluZ1k6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICBjb25zdCB4ID0gTWF0aC5yb3VuZChwZW5kaW5nWCAvIGdyaWRbMF0pICogZ3JpZFswXTtcbiAgY29uc3QgeSA9IE1hdGgucm91bmQocGVuZGluZ1kgLyBncmlkWzFdKSAqIGdyaWRbMV07XG4gIHJldHVybiBbeCwgeV07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EcmFnWChkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3gnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRHJhZ1koZHJhZ2dhYmxlOiBEcmFnZ2FibGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAnYm90aCcgfHwgZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICd5Jztcbn1cblxuLy8gR2V0IHt4LCB5fSBwb3NpdGlvbnMgZnJvbSBldmVudC5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cm9sUG9zaXRpb24oZTogTW91c2VUb3VjaEV2ZW50LCB0b3VjaElkZW50aWZpZXI6ID9udW1iZXIsIGRyYWdnYWJsZUNvcmU6IERyYWdnYWJsZUNvcmUpOiA/Q29udHJvbFBvc2l0aW9uIHtcbiAgY29uc3QgdG91Y2hPYmogPSB0eXBlb2YgdG91Y2hJZGVudGlmaWVyID09PSAnbnVtYmVyJyA/IGdldFRvdWNoKGUsIHRvdWNoSWRlbnRpZmllcikgOiBudWxsO1xuICBpZiAodHlwZW9mIHRvdWNoSWRlbnRpZmllciA9PT0gJ251bWJlcicgJiYgIXRvdWNoT2JqKSByZXR1cm4gbnVsbDsgLy8gbm90IHRoZSByaWdodCB0b3VjaFxuICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoZHJhZ2dhYmxlQ29yZSk7XG4gIC8vIFVzZXIgY2FuIHByb3ZpZGUgYW4gb2Zmc2V0UGFyZW50IGlmIGRlc2lyZWQuXG4gIGNvbnN0IG9mZnNldFBhcmVudCA9IGRyYWdnYWJsZUNvcmUucHJvcHMub2Zmc2V0UGFyZW50IHx8IG5vZGUub2Zmc2V0UGFyZW50IHx8IG5vZGUub3duZXJEb2N1bWVudC5ib2R5O1xuICByZXR1cm4gb2Zmc2V0WFlGcm9tUGFyZW50KHRvdWNoT2JqIHx8IGUsIG9mZnNldFBhcmVudCk7XG59XG5cbi8vIENyZWF0ZSBhbiBkYXRhIG9iamVjdCBleHBvc2VkIGJ5IDxEcmFnZ2FibGVDb3JlPidzIGV2ZW50c1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNvcmVEYXRhKGRyYWdnYWJsZTogRHJhZ2dhYmxlQ29yZSwgeDogbnVtYmVyLCB5OiBudW1iZXIpOiBEcmFnZ2FibGVEYXRhIHtcbiAgY29uc3Qgc3RhdGUgPSBkcmFnZ2FibGUuc3RhdGU7XG4gIGNvbnN0IGlzU3RhcnQgPSAhaXNOdW0oc3RhdGUubGFzdFgpO1xuICBjb25zdCBub2RlID0gZmluZERPTU5vZGUoZHJhZ2dhYmxlKTtcblxuICBpZiAoaXNTdGFydCkge1xuICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IG1vdmUsIHVzZSB0aGUgeCBhbmQgeSBhcyBsYXN0IGNvb3Jkcy5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZSxcbiAgICAgIGRlbHRhWDogMCwgZGVsdGFZOiAwLFxuICAgICAgbGFzdFg6IHgsIGxhc3RZOiB5LFxuICAgICAgeCwgeSxcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSBjYWxjdWxhdGUgcHJvcGVyIHZhbHVlcy5cbiAgICByZXR1cm4ge1xuICAgICAgbm9kZSxcbiAgICAgIGRlbHRhWDogeCAtIHN0YXRlLmxhc3RYLCBkZWx0YVk6IHkgLSBzdGF0ZS5sYXN0WSxcbiAgICAgIGxhc3RYOiBzdGF0ZS5sYXN0WCwgbGFzdFk6IHN0YXRlLmxhc3RZLFxuICAgICAgeCwgeSxcbiAgICB9O1xuICB9XG59XG5cbi8vIENyZWF0ZSBhbiBkYXRhIGV4cG9zZWQgYnkgPERyYWdnYWJsZT4ncyBldmVudHNcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEcmFnZ2FibGVEYXRhKGRyYWdnYWJsZTogRHJhZ2dhYmxlLCBjb3JlRGF0YTogRHJhZ2dhYmxlRGF0YSk6IERyYWdnYWJsZURhdGEge1xuICByZXR1cm4ge1xuICAgIG5vZGU6IGNvcmVEYXRhLm5vZGUsXG4gICAgeDogZHJhZ2dhYmxlLnN0YXRlLnggKyBjb3JlRGF0YS5kZWx0YVgsXG4gICAgeTogZHJhZ2dhYmxlLnN0YXRlLnkgKyBjb3JlRGF0YS5kZWx0YVksXG4gICAgZGVsdGFYOiBjb3JlRGF0YS5kZWx0YVgsXG4gICAgZGVsdGFZOiBjb3JlRGF0YS5kZWx0YVksXG4gICAgbGFzdFg6IGRyYWdnYWJsZS5zdGF0ZS54LFxuICAgIGxhc3RZOiBkcmFnZ2FibGUuc3RhdGUueVxuICB9O1xufVxuXG4vLyBBIGxvdCBmYXN0ZXIgdGhhbiBzdHJpbmdpZnkvcGFyc2VcbmZ1bmN0aW9uIGNsb25lQm91bmRzKGJvdW5kczogQm91bmRzKTogQm91bmRzIHtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBib3VuZHMubGVmdCxcbiAgICB0b3A6IGJvdW5kcy50b3AsXG4gICAgcmlnaHQ6IGJvdW5kcy5yaWdodCxcbiAgICBib3R0b206IGJvdW5kcy5ib3R0b21cbiAgfTtcbn1cblxuZnVuY3Rpb24gZmluZERPTU5vZGUoZHJhZ2dhYmxlOiBEcmFnZ2FibGUgfCBEcmFnZ2FibGVDb3JlKTogSFRNTEVsZW1lbnQge1xuICBjb25zdCBub2RlID0gUmVhY3RET00uZmluZERPTU5vZGUoZHJhZ2dhYmxlKTtcbiAgaWYgKCFub2RlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCc8RHJhZ2dhYmxlQ29yZT46IFVubW91bnRlZCBkdXJpbmcgZXZlbnQhJyk7XG4gIH1cbiAgLy8gJEZsb3dJZ25vcmUgd2UgY2FuJ3QgYXNzZXJ0IG9uIEhUTUxFbGVtZW50IGR1ZSB0byB0ZXN0cy4uLiBGSVhNRVxuICByZXR1cm4gbm9kZTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9wb3NpdGlvbkZucy5qcyIsIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtcbiAgbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvLCBhZGRFdmVudCwgcmVtb3ZlRXZlbnQsIGFkZFVzZXJTZWxlY3RTdHlsZXMsIGdldFRvdWNoSWRlbnRpZmllcixcbiAgcmVtb3ZlVXNlclNlbGVjdFN0eWxlcywgc3R5bGVIYWNrc1xufSBmcm9tICcuL3V0aWxzL2RvbUZucyc7XG5pbXBvcnQgeyBjcmVhdGVDb3JlRGF0YSwgZ2V0Q29udHJvbFBvc2l0aW9uLCBzbmFwVG9HcmlkIH0gZnJvbSAnLi91dGlscy9wb3NpdGlvbkZucyc7XG5pbXBvcnQgeyBkb250U2V0TWUgfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuXG5pbXBvcnQgdHlwZSB7IEV2ZW50SGFuZGxlciwgTW91c2VUb3VjaEV2ZW50IH0gZnJvbSAnLi91dGlscy90eXBlcyc7XG5pbXBvcnQgdHlwZSB7IEVsZW1lbnQgYXMgUmVhY3RFbGVtZW50IH0gZnJvbSAncmVhY3QnO1xuXG4vLyBTaW1wbGUgYWJzdHJhY3Rpb24gZm9yIGRyYWdnaW5nIGV2ZW50cyBuYW1lcy5cbmNvbnN0IGV2ZW50c0ZvciA9IHtcbiAgdG91Y2g6IHtcbiAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIHN0b3A6ICd0b3VjaGVuZCdcbiAgfSxcbiAgbW91c2U6IHtcbiAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgc3RvcDogJ21vdXNldXAnXG4gIH1cbn07XG5cbi8vIERlZmF1bHQgdG8gbW91c2UgZXZlbnRzLlxubGV0IGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxudHlwZSBEcmFnZ2FibGVDb3JlU3RhdGUgPSB7XG4gIGRyYWdnaW5nOiBib29sZWFuLFxuICBsYXN0WDogbnVtYmVyLFxuICBsYXN0WTogbnVtYmVyLFxuICB0b3VjaElkZW50aWZpZXI6ID9udW1iZXJcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUJvdW5kcyA9IHtcbiAgbGVmdDogbnVtYmVyLFxuICByaWdodDogbnVtYmVyLFxuICB0b3A6IG51bWJlcixcbiAgYm90dG9tOiBudW1iZXIsXG59O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVEYXRhID0ge1xuICBub2RlOiBIVE1MRWxlbWVudCxcbiAgeDogbnVtYmVyLCB5OiBudW1iZXIsXG4gIGRlbHRhWDogbnVtYmVyLCBkZWx0YVk6IG51bWJlcixcbiAgbGFzdFg6IG51bWJlciwgbGFzdFk6IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlOiBNb3VzZUV2ZW50LCBkYXRhOiBEcmFnZ2FibGVEYXRhKSA9PiB2b2lkO1xuXG5leHBvcnQgdHlwZSBDb250cm9sUG9zaXRpb24gPSB7IHg6IG51bWJlciwgeTogbnVtYmVyIH07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZUNvcmVQcm9wcyA9IHtcbiAgYWxsb3dBbnlDbGljazogYm9vbGVhbixcbiAgY2FuY2VsOiBzdHJpbmcsXG4gIGNoaWxkcmVuOiBSZWFjdEVsZW1lbnQ8YW55PixcbiAgZGlzYWJsZWQ6IGJvb2xlYW4sXG4gIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiBib29sZWFuLFxuICBvZmZzZXRQYXJlbnQ6IEhUTUxFbGVtZW50LFxuICBncmlkOiBbbnVtYmVyLCBudW1iZXJdLFxuICBoYW5kbGU6IHN0cmluZyxcbiAgb25TdGFydDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvbkRyYWc6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25TdG9wOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uTW91c2VEb3duOiAoZTogTW91c2VFdmVudCkgPT4gdm9pZCxcbiAgb25LZXlVcDogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG59O1xuXG4vL1xuLy8gRGVmaW5lIDxEcmFnZ2FibGVDb3JlPi5cbi8vXG4vLyA8RHJhZ2dhYmxlQ29yZT4gaXMgZm9yIGFkdmFuY2VkIHVzYWdlIG9mIDxEcmFnZ2FibGU+LiBJdCBtYWludGFpbnMgbWluaW1hbCBpbnRlcm5hbCBzdGF0ZSBzbyBpdCBjYW5cbi8vIHdvcmsgd2VsbCB3aXRoIGxpYnJhcmllcyB0aGF0IHJlcXVpcmUgbW9yZSBjb250cm9sIG92ZXIgdGhlIGVsZW1lbnQuXG4vL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVDb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZUNvcmVQcm9wcywgRHJhZ2dhYmxlQ29yZVN0YXRlPiB7XG5cbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0RyYWdnYWJsZUNvcmUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLyoqXG4gICAgICogYGFsbG93QW55Q2xpY2tgIGFsbG93cyBkcmFnZ2luZyB1c2luZyBhbnkgbW91c2UgYnV0dG9uLlxuICAgICAqIEJ5IGRlZmF1bHQsIHdlIG9ubHkgYWNjZXB0IHRoZSBsZWZ0IGJ1dHRvbi5cbiAgICAgKlxuICAgICAqIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAgICovXG4gICAgYWxsb3dBbnlDbGljazogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgZGlzYWJsZWRgLCBpZiB0cnVlLCBzdG9wcyB0aGUgPERyYWdnYWJsZT4gZnJvbSBkcmFnZ2luZy4gQWxsIGhhbmRsZXJzLFxuICAgICAqIHdpdGggdGhlIGV4Y2VwdGlvbiBvZiBgb25Nb3VzZURvd25gLCB3aWxsIG5vdCBmaXJlLlxuICAgICAqL1xuICAgIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIEJ5IGRlZmF1bHQsIHdlIGFkZCAndXNlci1zZWxlY3Q6bm9uZScgYXR0cmlidXRlcyB0byB0aGUgZG9jdW1lbnQgYm9keVxuICAgICAqIHRvIHByZXZlbnQgdWdseSB0ZXh0IHNlbGVjdGlvbiBkdXJpbmcgZHJhZy4gSWYgdGhpcyBpcyBjYXVzaW5nIHByb2JsZW1zXG4gICAgICogZm9yIHlvdXIgYXBwLCBzZXQgdGhpcyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIGVuYWJsZVVzZXJTZWxlY3RIYWNrOiBQcm9wVHlwZXMuYm9vbCxcblxuICAgIC8qKlxuICAgICAqIGBvZmZzZXRQYXJlbnRgLCBpZiBzZXQsIHVzZXMgdGhlIHBhc3NlZCBET00gbm9kZSB0byBjb21wdXRlIGRyYWcgb2Zmc2V0c1xuICAgICAqIGluc3RlYWQgb2YgdXNpbmcgdGhlIHBhcmVudCBub2RlLlxuICAgICAqL1xuICAgIG9mZnNldFBhcmVudDogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lKSB7XG4gICAgICBpZiAocHJvY2Vzcy5icm93c2VyID09PSB0cnVlICYmIHByb3BzW3Byb3BOYW1lXSAmJiBwcm9wc1twcm9wTmFtZV0ubm9kZVR5cGUgIT09IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEcmFnZ2FibGVcXCdzIG9mZnNldFBhcmVudCBtdXN0IGJlIGEgRE9NIE5vZGUuJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIGBncmlkYCBzcGVjaWZpZXMgdGhlIHggYW5kIHkgdGhhdCBkcmFnZ2luZyBzaG91bGQgc25hcCB0by5cbiAgICAgKi9cbiAgICBncmlkOiBQcm9wVHlwZXMuYXJyYXlPZihQcm9wVHlwZXMubnVtYmVyKSxcblxuICAgIC8qKlxuICAgICAqIGBoYW5kbGVgIHNwZWNpZmllcyBhIHNlbGVjdG9yIHRvIGJlIHVzZWQgYXMgdGhlIGhhbmRsZSB0aGF0IGluaXRpYXRlcyBkcmFnLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICA8RHJhZ2dhYmxlIGhhbmRsZT1cIi5oYW5kbGVcIj5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGFuZGxlXCI+Q2xpY2sgbWUgdG8gZHJhZzwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPGRpdj5UaGlzIGlzIHNvbWUgb3RoZXIgY29udGVudDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGhhbmRsZTogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIGBjYW5jZWxgIHNwZWNpZmllcyBhIHNlbGVjdG9yIHRvIGJlIHVzZWQgdG8gcHJldmVudCBkcmFnIGluaXRpYWxpemF0aW9uLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgcmV0dXJuKFxuICAgICAqICAgICAgICAgICAgICAgPERyYWdnYWJsZSBjYW5jZWw9XCIuY2FuY2VsXCI+XG4gICAgICogICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2FuY2VsXCI+WW91IGNhbid0IGRyYWcgZnJvbSBoZXJlPC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2PkRyYWdnaW5nIGhlcmUgd29ya3MgZmluZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICk7XG4gICAgICogICAgICAgfVxuICAgICAqICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgY2FuY2VsOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gZHJhZ2dpbmcgc3RhcnRzLlxuICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgYm9vbGVhbiBmYWxzZSwgZHJhZ2dpbmcgd2lsbCBiZSBjYW5jZWxlZC5cbiAgICAgKi9cbiAgICBvblN0YXJ0OiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGlsZSBkcmFnZ2luZy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICovXG4gICAgb25EcmFnOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0b3BzLlxuICAgICAqIElmIHRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgYm9vbGVhbiBmYWxzZSwgdGhlIGRyYWcgd2lsbCByZW1haW4gYWN0aXZlLlxuICAgICAqL1xuICAgIG9uU3RvcDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBBIHdvcmthcm91bmQgb3B0aW9uIHdoaWNoIGNhbiBiZSBwYXNzZWQgaWYgb25Nb3VzZURvd24gbmVlZHMgdG8gYmUgYWNjZXNzZWQsXG4gICAgICogc2luY2UgaXQnbGwgYWx3YXlzIGJlIGJsb2NrZWQgKGFzIHRoZXJlIGlzIGludGVybmFsIHVzZSBvZiBvbk1vdXNlRG93bilcbiAgICAgKi9cbiAgICBvbk1vdXNlRG93bjogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlVcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcblxuICAgIC8qKlxuICAgICAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIGJlIGRlZmluZWQgb24gdGhlIGNoaWxkLCBub3QgaGVyZS5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU6IGRvbnRTZXRNZSxcbiAgICBzdHlsZTogZG9udFNldE1lLFxuICAgIHRyYW5zZm9ybTogZG9udFNldE1lXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBhbGxvd0FueUNsaWNrOiBmYWxzZSwgLy8gYnkgZGVmYXVsdCBvbmx5IGFjY2VwdCBsZWZ0IGNsaWNrXG4gICAgY2FuY2VsOiBudWxsLFxuICAgIGRpc2FibGVkOiBmYWxzZSxcbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogdHJ1ZSxcbiAgICBvZmZzZXRQYXJlbnQ6IG51bGwsXG4gICAgaGFuZGxlOiBudWxsLFxuICAgIGdyaWQ6IG51bGwsXG4gICAgdHJhbnNmb3JtOiBudWxsLFxuICAgIG9uU3RhcnQ6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uRHJhZzogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25TdG9wOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbk1vdXNlRG93bjogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25LZXlVcDogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25LZXlEb3duOiBmdW5jdGlvbigpIHsgfSxcbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgLy8gVXNlZCB3aGlsZSBkcmFnZ2luZyB0byBkZXRlcm1pbmUgZGVsdGFzLlxuICAgIGxhc3RYOiBOYU4sIGxhc3RZOiBOYU4sXG4gICAgdG91Y2hJZGVudGlmaWVyOiBudWxsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgLy8gUmVtb3ZlIGFueSBsZWZ0b3ZlciBldmVudCBoYW5kbGVycy4gUmVtb3ZlIGJvdGggdG91Y2ggYW5kIG1vdXNlIGhhbmRsZXJzIGluIGNhc2VcbiAgICAvLyBzb21lIGJyb3dzZXIgcXVpcmsgY2F1c2VkIGEgdG91Y2ggZXZlbnQgdG8gZmlyZSBkdXJpbmcgYSBtb3VzZSBtb3ZlLCBvciB2aWNlIHZlcnNhLlxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICBjb25zdCB7IG93bmVyRG9jdW1lbnQgfSA9IHRoaXNOb2RlO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IudG91Y2gubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci5tb3VzZS5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKG93bmVyRG9jdW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURyYWdTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZS4gICBcbiAgICB0aGlzLnByb3BzLm9uTW91c2VEb3duKGUpO1xuXG4gICAgLy8gT25seSBhY2NlcHQgbGVmdC1jbGlja3MuXG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbG93QW55Q2xpY2sgJiYgdHlwZW9mIGUuYnV0dG9uID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gR2V0IG5vZGVzLiBCZSBzdXJlIHRvIGdyYWIgcmVsYXRpdmUgZG9jdW1lbnQgKGNvdWxkIGJlIGlmcmFtZWQpXG4gICAgY29uc3QgdGhpc05vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBpZiAoIXRoaXNOb2RlIHx8ICF0aGlzTm9kZS5vd25lckRvY3VtZW50IHx8ICF0aGlzTm9kZS5vd25lckRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+IG5vdCBtb3VudGVkIG9uIERyYWdTdGFydCEnKTtcbiAgICB9XG4gICAgY29uc3QgeyBvd25lckRvY3VtZW50IH0gPSB0aGlzTm9kZTtcblxuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgaGFuZGxlIG9yIGNhbmNlbCBwcm9wIHdhcyBwcm92aWRlZCBhbmQgc2VsZWN0b3IgZG9lc24ndCBtYXRjaC5cbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fFxuICAgICAgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lk5vZGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuaGFuZGxlICYmICFtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZS50YXJnZXQsIHRoaXMucHJvcHMuaGFuZGxlLCB0aGlzTm9kZSkpIHx8XG4gICAgICAodGhpcy5wcm9wcy5jYW5jZWwgJiYgbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGUudGFyZ2V0LCB0aGlzLnByb3BzLmNhbmNlbCwgdGhpc05vZGUpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCB0b3VjaCBpZGVudGlmaWVyIGluIGNvbXBvbmVudCBzdGF0ZSBpZiB0aGlzIGlzIGEgdG91Y2ggZXZlbnQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbmRpdmlkdWFsIHRvdWNoZXMgb24gbXVsdGl0b3VjaCBzY3JlZW5zIGJ5IGlkZW50aWZ5aW5nIHdoaWNoXG4gICAgLy8gdG91Y2hwb2ludCB3YXMgc2V0IHRvIHRoaXMgZWxlbWVudC5cbiAgICBjb25zdCB0b3VjaElkZW50aWZpZXIgPSBnZXRUb3VjaElkZW50aWZpZXIoZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRvdWNoSWRlbnRpZmllciB9KTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47IC8vIG5vdCBwb3NzaWJsZSBidXQgc2F0aXNmaWVzIGZsb3dcbiAgICBjb25zdCB7IHgsIHkgfSA9IHBvc2l0aW9uO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGV2ZW50IG9iamVjdCB3aXRoIGFsbCB0aGUgZGF0YSBwYXJlbnRzIG5lZWQgdG8gbWFrZSBhIGRlY2lzaW9uIGhlcmUuXG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWdTdGFydDogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCBjYW5jZWwuXG4gICAgbG9nKCdjYWxsaW5nJywgdGhpcy5wcm9wcy5vblN0YXJ0KTtcbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY29yZUV2ZW50KTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gQWRkIGEgc3R5bGUgdG8gdGhlIGJvZHkgdG8gZGlzYWJsZSB1c2VyLXNlbGVjdC4gVGhpcyBwcmV2ZW50cyB0ZXh0IGZyb21cbiAgICAvLyBiZWluZyBzZWxlY3RlZCBhbGwgb3ZlciB0aGUgcGFnZS5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgYWRkVXNlclNlbGVjdFN0eWxlcyhvd25lckRvY3VtZW50KTtcblxuICAgIC8vIEluaXRpYXRlIGRyYWdnaW5nLiBTZXQgdGhlIGN1cnJlbnQgeCBhbmQgeSBhcyBvZmZzZXRzXG4gICAgLy8gc28gd2Uga25vdyBob3cgbXVjaCB3ZSd2ZSBtb3ZlZCBkdXJpbmcgdGhlIGRyYWcuIFRoaXMgYWxsb3dzIHVzXG4gICAgLy8gdG8gZHJhZyBlbGVtZW50cyBhcm91bmQgZXZlbiBpZiB0aGV5IGhhdmUgYmVlbiBtb3ZlZCwgd2l0aG91dCBpc3N1ZS5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiB0cnVlLFxuXG4gICAgICBsYXN0WDogeCxcbiAgICAgIGxhc3RZOiB5XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgZXZlbnRzIHRvIHRoZSBkb2N1bWVudCBkaXJlY3RseSBzbyB3ZSBjYXRjaCB3aGVuIHRoZSB1c2VyJ3MgbW91c2UvdG91Y2ggbW92ZXMgb3V0c2lkZSBvZlxuICAgIC8vIHRoaXMgZWxlbWVudC4gV2UgdXNlIGRpZmZlcmVudCBldmVudHMgZGVwZW5kaW5nIG9uIHdoZXRoZXIgb3Igbm90IHdlIGhhdmUgZGV0ZWN0ZWQgdGhhdCB0aGlzXG4gICAgLy8gaXMgYSB0b3VjaC1jYXBhYmxlIGRldmljZS5cbiAgICBhZGRFdmVudChvd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3IubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICBhZGRFdmVudChvd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3Iuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gIH07XG5cbiAgaGFuZGxlRHJhZzogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuXG4gICAgLy8gUHJldmVudCBzY3JvbGxpbmcgb24gbW9iaWxlIGRldmljZXMsIGxpa2UgaXBhZC9pcGhvbmUuXG4gICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICBsZXQgeyB4LCB5IH0gPSBwb3NpdGlvbjtcblxuICAgIC8vIFNuYXAgdG8gZ3JpZCBpZiBwcm9wIGhhcyBiZWVuIHByb3ZpZGVkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5ncmlkKSkge1xuICAgICAgbGV0IGRlbHRhWCA9IHggLSB0aGlzLnN0YXRlLmxhc3RYLCBkZWx0YVkgPSB5IC0gdGhpcy5zdGF0ZS5sYXN0WTtcbiAgICAgIFtkZWx0YVgsIGRlbHRhWV0gPSBzbmFwVG9HcmlkKHRoaXMucHJvcHMuZ3JpZCwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgaWYgKCFkZWx0YVggJiYgIWRlbHRhWSkgcmV0dXJuOyAvLyBza2lwIHVzZWxlc3MgZHJhZ1xuICAgICAgeCA9IHRoaXMuc3RhdGUubGFzdFggKyBkZWx0YVgsIHkgPSB0aGlzLnN0YXRlLmxhc3RZICsgZGVsdGFZO1xuICAgIH1cblxuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVEYXRhKHRoaXMsIHgsIHkpO1xuXG4gICAgLy8gbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnOiAlaicsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIHRyaWdnZXIgZW5kLlxuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25EcmFnKGUsIGNvcmVFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vICRGbG93SWdub3JlXG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ1N0b3AobmV3IE1vdXNlRXZlbnQoJ21vdXNldXAnKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gT2xkIGJyb3dzZXJzXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gKChkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTogYW55KTogTW91c2VUb3VjaEV2ZW50KTtcbiAgICAgICAgLy8gSSBzZWUgd2h5IHRoaXMgaW5zYW5pdHkgd2FzIGRlcHJlY2F0ZWRcbiAgICAgICAgLy8gJEZsb3dJZ25vcmVcbiAgICAgICAgZXZlbnQuaW5pdE1vdXNlRXZlbnQoJ21vdXNldXAnLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnU3RvcChldmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsYXN0WDogeCxcbiAgICAgIGxhc3RZOiB5XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlRHJhZ1N0b3A6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUsIHRoaXMuc3RhdGUudG91Y2hJZGVudGlmaWVyLCB0aGlzKTtcbiAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9zaXRpb247XG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgLy8gUmVtb3ZlIHVzZXItc2VsZWN0IGhhY2tcbiAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKHRoaXNOb2RlLm93bmVyRG9jdW1lbnQpO1xuICAgIH1cblxuICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0b3A6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIFJlc2V0IHRoZSBlbC5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGxhc3RYOiBOYU4sXG4gICAgICBsYXN0WTogTmFOXG4gICAgfSk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXJcbiAgICB0aGlzLnByb3BzLm9uU3RvcChlLCBjb3JlRXZlbnQpO1xuXG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcbiAgICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogUmVtb3ZpbmcgaGFuZGxlcnMnKTtcbiAgICAgIHJlbW92ZUV2ZW50KHRoaXNOb2RlLm93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgIH1cbiAgfTtcblxuICBvbk1vdXNlRG93bjogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTsgLy8gb24gdG91Y2hzY3JlZW4gbGFwdG9wcyB3ZSBjb3VsZCBzd2l0Y2ggYmFjayB0byBtb3VzZVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uTW91c2VVcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdG9wKGUpO1xuICB9O1xuXG4gIC8vIFNhbWUgYXMgb25Nb3VzZURvd24gKHN0YXJ0IGRyYWcpLCBidXQgbm93IGNvbnNpZGVyIHRoaXMgYSB0b3VjaCBkZXZpY2UuXG4gIG9uVG91Y2hTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIFdlJ3JlIG9uIGEgdG91Y2ggZGV2aWNlIG5vdywgc28gY2hhbmdlIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdGFydChlKTtcbiAgfTtcblxuICBvblRvdWNoRW5kOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgb25LZXlVcDogYW55ID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5VXAoZSlcbiAgfVxuICBvbktleURvd246IGFueSA9IChlKSA9PiB7XG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZSlcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgIHN0eWxlOiBzdHlsZUhhY2tzKHRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUpLFxuXG4gICAgICAvLyBOb3RlOiBtb3VzZU1vdmUgaGFuZGxlciBpcyBhdHRhY2hlZCB0byBkb2N1bWVudCBzbyBpdCB3aWxsIHN0aWxsIGZ1bmN0aW9uXG4gICAgICAvLyB3aGVuIHRoZSB1c2VyIGRyYWdzIHF1aWNrbHkgYW5kIGxlYXZlcyB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICAgICAgb25Nb3VzZURvd246IHRoaXMub25Nb3VzZURvd24sXG4gICAgICBvblRvdWNoU3RhcnQ6IHRoaXMub25Ub3VjaFN0YXJ0LFxuICAgICAgb25Nb3VzZVVwOiB0aGlzLm9uTW91c2VVcCxcbiAgICAgIG9uVG91Y2hFbmQ6IHRoaXMub25Ub3VjaEVuZCxcbiAgICAgIG9uS2V5VXA6IHRoaXMub25LZXlVcCxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbktleURvd24sXG4gICAgfSk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLy8gQGZsb3dcbi8qZXNsaW50IG5vLWNvbnNvbGU6MCovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2coLi4uYXJnczogYW55KSB7XG4gIGlmIChwcm9jZXNzLmVudi5EUkFHR0FCTEVfREVCVUcpIGNvbnNvbGUubG9nKC4uLmFyZ3MpO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL2xvZy5qcyIsInZhciBEcmFnZ2FibGUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGUnKS5kZWZhdWx0O1xuXG4vLyBQcmV2aW91cyB2ZXJzaW9ucyBvZiB0aGlzIGxpYiBleHBvcnRlZCA8RHJhZ2dhYmxlPiBhcyB0aGUgcm9vdCBleHBvcnQuIEFzIHRvIG5vdCBicmVha1xuLy8gdGhlbSwgb3IgVHlwZVNjcmlwdCwgd2UgZXhwb3J0ICpib3RoKiBhcyB0aGUgcm9vdCBhbmQgYXMgJ2RlZmF1bHQnLlxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL3JlYWN0LWRyYWdnYWJsZS9wdWxsLzI1NFxuLy8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL3JlYWN0LWRyYWdnYWJsZS9pc3N1ZXMvMjY2XG5tb2R1bGUuZXhwb3J0cyA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBEcmFnZ2FibGU7XG5tb2R1bGUuZXhwb3J0cy5EcmFnZ2FibGVDb3JlID0gcmVxdWlyZSgnLi9saWIvRHJhZ2dhYmxlQ29yZScpLmRlZmF1bHQ7XG5tb2R1bGUuZXhwb3J0cy5EcmFnZ2FibGVBbGlnbkd1aWRlID0gcmVxdWlyZSgnLi9saWIvRHJhZ2dhYmxlQWxpZ25HdWlkZScpLmRlZmF1bHQ7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9pbmRleC5qcyIsIi8vIEBmbG93XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBjcmVhdGVDU1NUcmFuc2Zvcm0sIGNyZWF0ZVNWR1RyYW5zZm9ybSB9IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7IGNhbkRyYWdYLCBjYW5EcmFnWSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSwgZ2V0Qm91bmRQb3NpdGlvbiB9IGZyb20gJy4vdXRpbHMvcG9zaXRpb25GbnMnO1xuaW1wb3J0IHsgZG9udFNldE1lIH0gZnJvbSAnLi91dGlscy9zaGltcyc7XG5pbXBvcnQgRHJhZ2dhYmxlQ29yZSBmcm9tICcuL0RyYWdnYWJsZUNvcmUnO1xuaW1wb3J0IHR5cGUgeyBDb250cm9sUG9zaXRpb24sIERyYWdnYWJsZUJvdW5kcywgRHJhZ2dhYmxlQ29yZVByb3BzIH0gZnJvbSAnLi9EcmFnZ2FibGVDb3JlJztcbmltcG9ydCBsb2cgZnJvbSAnLi91dGlscy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBEcmFnZ2FibGVFdmVudEhhbmRsZXIgfSBmcm9tICcuL3V0aWxzL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgRWxlbWVudCBhcyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbnR5cGUgRHJhZ2dhYmxlU3RhdGUgPSB7XG4gIGRyYWdnaW5nOiBib29sZWFuLFxuICBkcmFnZ2VkOiBib29sZWFuLFxuICB4OiBudW1iZXIsIHk6IG51bWJlcixcbiAgc2xhY2tYOiBudW1iZXIsIHNsYWNrWTogbnVtYmVyLFxuICBpc0VsZW1lbnRTVkc6IGJvb2xlYW4sXG4gIGZvY3VzZWQ6IGJvb2xlYW4sXG59O1xuXG5leHBvcnQgdHlwZSBEcmFnZ2FibGVQcm9wcyA9IHtcbiAgLi4uJEV4YWN0PERyYWdnYWJsZUNvcmVQcm9wcz4sXG4gIGF4aXM6ICdib3RoJyB8ICd4JyB8ICd5JyB8ICdub25lJyxcbiAgYm91bmRzOiBEcmFnZ2FibGVCb3VuZHMgfCBzdHJpbmcgfCBmYWxzZSxcbiAgZGVmYXVsdENsYXNzTmFtZTogc3RyaW5nLFxuICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmc6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQ6IHN0cmluZyxcbiAgZGVmYXVsdFBvc2l0aW9uOiBDb250cm9sUG9zaXRpb24sXG4gIHBvc2l0aW9uOiBDb250cm9sUG9zaXRpb24sXG4gIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICBvbktleURvd246IFByb3BUeXBlcy5mdW5jLFxuICBvbktleU1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICBrZXlNb3ZlRW5hYmxlZDogYm9vbGVhbixcbiAga2V5TW92ZVNwZWVkOiBudW1iZXIsXG4gIGRlZ3JlZTogbnVtYmVyLFxufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlPlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZVByb3BzLCBEcmFnZ2FibGVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gQWNjZXB0cyBhbGwgcHJvcHMgPERyYWdnYWJsZUNvcmU+IGFjY2VwdHMuXG4gICAgLi4uRHJhZ2dhYmxlQ29yZS5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG4gICAgICpcbiAgICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgICAqICBjb250cm9scyBmbHVzaGluZyB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5JywgJ25vbmUnXSksXG5cbiAgICAvKipcbiAgICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQXZhaWxhYmxlIHZhbHVlcyBhcmU6XG4gICAgICpcbiAgICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLCBhbGwgb2Ygd2hpY2ggYXJlIG9wdGlvbmFsOlxuICAgICAqXG4gICAgICoge2xlZnQ6IExFRlRfQk9VTkQsIHJpZ2h0OiBSSUdIVF9CT1VORCwgYm90dG9tOiBCT1RUT01fQk9VTkQsIHRvcDogVE9QX0JPVU5EfVxuICAgICAqXG4gICAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgYm91bmRzPXt7cmlnaHQ6IDMwMCwgYm90dG9tOiAzMDB9fT5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBib3VuZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICBdKSxcblxuICAgIGRlZmF1bHRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGRlZmF1bHRQb3NpdGlvbmAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBzaG91bGQgc3RhcnQgYXRcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGRlZmF1bHRQb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBkZWZhdWx0UG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogYHBvc2l0aW9uYCwgaWYgcHJlc2VudCwgZGVmaW5lcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqICBUaGlzIGlzIHNpbWlsYXIgdG8gaG93IGZvcm0gZWxlbWVudHMgaW4gUmVhY3Qgd29yayAtIGlmIG5vIGBwb3NpdGlvbmAgaXMgc3VwcGxpZWQsIHRoZSBjb21wb25lbnRcbiAgICAgKiAgaXMgdW5jb250cm9sbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgcG9zaXRpb249e3t4OiAyNSwgeTogMjV9fT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCB0cmFuc2Zvcm1YOiAyNXB4IGFuZCB0cmFuc2Zvcm1ZOiAyNXB4OzwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICAgICk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWUsXG4gICAgb25LZXlVcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleU1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleU1vdmVFbmFibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBrZXlNb3ZlU3BlZWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAuLi5EcmFnZ2FibGVDb3JlLmRlZmF1bHRQcm9wcyxcbiAgICBheGlzOiAnYm90aCcsXG4gICAgYm91bmRzOiBmYWxzZSxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lOiAncmVhY3QtZHJhZ2dhYmxlJyxcbiAgICBkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dpbmc6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dpbmcnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiAncmVhY3QtZHJhZ2dhYmxlLWRyYWdnZWQnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVGb2N1c2VkOiAncmVhY3QtZHJhZ2dhYmxlLWZvY3VzZWQnLFxuICAgIGRlZmF1bHRQb3NpdGlvbjogeyB4OiAwLCB5OiAwIH0sXG4gICAgcG9zaXRpb246IG51bGwsXG4gICAgb25LZXlVcDogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25LZXlEb3duOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleU1vdmU6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIGtleU1vdmVFbmFibGVkOiB0cnVlLFxuICAgIGtleU1vdmVTcGVlZDogMjUwXG4gIH07XG5cbiAgYXV0b1N0ZXBUaW1lciA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IERyYWdnYWJsZVByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcuXG4gICAgICBkcmFnZ2luZzogZmFsc2UsXG5cbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGhhdmUgYmVlbiBkcmFnZ2VkIGJlZm9yZS5cbiAgICAgIGRyYWdnZWQ6IGZhbHNlLFxuXG4gICAgICAvLyBDdXJyZW50IHRyYW5zZm9ybSB4IGFuZCB5LlxuICAgICAgeDogcHJvcHMucG9zaXRpb24gPyBwcm9wcy5wb3NpdGlvbi54IDogcHJvcHMuZGVmYXVsdFBvc2l0aW9uLngsXG4gICAgICB5OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnkgOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueSxcblxuICAgICAgLy8gVXNlZCBmb3IgY29tcGVuc2F0aW5nIGZvciBvdXQtb2YtYm91bmRzIGRyYWdzXG4gICAgICBzbGFja1g6IDAsIHNsYWNrWTogMCxcblxuICAgICAgLy8gQ2FuIG9ubHkgZGV0ZXJtaW5lIGlmIFNWRyBhZnRlciBtb3VudGluZ1xuICAgICAgaXNFbGVtZW50U1ZHOiBmYWxzZSxcblxuICAgICAgZm9jdXNlZDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBvc2l0aW9uICYmICEodGhpcy5wcm9wcy5vbkRyYWcgfHwgdGhpcy5wcm9wcy5vblN0b3ApKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGNvbnNvbGUud2FybignQSBgcG9zaXRpb25gIHdhcyBhcHBsaWVkIHRvIHRoaXMgPERyYWdnYWJsZT4sIHdpdGhvdXQgZHJhZyBoYW5kbGVycy4gVGhpcyB3aWxsIG1ha2UgdGhpcyAnICtcbiAgICAgICAgJ2NvbXBvbmVudCBlZmZlY3RpdmVseSB1bmRyYWdnYWJsZS4gUGxlYXNlIGF0dGFjaCBgb25EcmFnYCBvciBgb25TdG9wYCBoYW5kbGVycyBzbyB5b3UgY2FuIGFkanVzdCB0aGUgJyArXG4gICAgICAgICdgcG9zaXRpb25gIG9mIHRoaXMgZWxlbWVudC4nKTtcbiAgICB9XG4gICAgdGhpcy5zdG9wTW92ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5TVkdFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNFbGVtZW50U1ZHOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogT2JqZWN0KSB7XG4gICAgLy8gU2V0IHgveSBpZiBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICAgIGlmIChuZXh0UHJvcHMucG9zaXRpb24gJiZcbiAgICAgICghdGhpcy5wcm9wcy5wb3NpdGlvbiB8fFxuICAgICAgICBuZXh0UHJvcHMucG9zaXRpb24ueCAhPT0gdGhpcy5wcm9wcy5wb3NpdGlvbi54IHx8XG4gICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi55ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB4OiBuZXh0UHJvcHMucG9zaXRpb24ueCwgeTogbmV4dFByb3BzLnBvc2l0aW9uLnkgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRyYWdnaW5nOiBmYWxzZSB9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICB9XG5cbiAgb25EcmFnU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIC8vIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdGFydDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RhcnQgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSkpO1xuICAgIC8vIEtpbGxzIHN0YXJ0IGV2ZW50IG9uIGNvcmUgYXMgd2VsbCwgc28gbW92ZSBoYW5kbGVycyBhcmUgbmV2ZXIgYm91bmQuXG4gICAgaWYgKHNob3VsZFN0YXJ0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRyYWdnaW5nOiB0cnVlLCBkcmFnZ2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIG9uRHJhZzogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gbG9nKCdEcmFnZ2FibGU6IG9uRHJhZzogJWonLCBjb3JlRGF0YSk7XG4gICAgY29uc29sZS5sb2coJ3gseSxjb3JlRGF0YScsIHRoaXMuc3RhdGUsIGNvcmVEYXRhKVxuICAgIGNvbnN0IHVpRGF0YSA9IGNyZWF0ZURyYWdnYWJsZURhdGEodGhpcywgY29yZURhdGEpO1xuICAgIGNvbnNvbGUubG9nKCd4LHksdWlEYXRhJywgdWlEYXRhKVxuICAgIGNvbnN0IG5ld1N0YXRlOiAkU2hhcGU8RHJhZ2dhYmxlU3RhdGU+ID0ge1xuICAgICAgeDogdWlEYXRhLngsXG4gICAgICB5OiB1aURhdGEueVxuICAgIH07XG5cbiAgICAvLyBLZWVwIHdpdGhpbiBib3VuZHMuXG4gICAgaWYgKHRoaXMucHJvcHMuYm91bmRzKSB7XG4gICAgICAvLyBTYXZlIG9yaWdpbmFsIHggYW5kIHkuXG4gICAgICBjb25zdCB7IHgsIHkgfSA9IG5ld1N0YXRlO1xuXG4gICAgICAvLyBBZGQgc2xhY2sgdG8gdGhlIHZhbHVlcyB1c2VkIHRvIGNhbGN1bGF0ZSBib3VuZCBwb3NpdGlvbi4gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IGlmXG4gICAgICAvLyB3ZSBzdGFydCByZW1vdmluZyBzbGFjaywgdGhlIGVsZW1lbnQgd29uJ3QgcmVhY3QgdG8gaXQgcmlnaHQgYXdheSB1bnRpbCBpdCdzIGJlZW5cbiAgICAgIC8vIGNvbXBsZXRlbHkgcmVtb3ZlZC5cbiAgICAgIG5ld1N0YXRlLnggKz0gdGhpcy5zdGF0ZS5zbGFja1g7XG4gICAgICBuZXdTdGF0ZS55ICs9IHRoaXMuc3RhdGUuc2xhY2tZO1xuXG4gICAgICAvLyBHZXQgYm91bmQgcG9zaXRpb24uIFRoaXMgd2lsbCBjZWlsL2Zsb29yIHRoZSB4IGFuZCB5IHdpdGhpbiB0aGUgYm91bmRhcmllcy5cbiAgICAgIGNvbnN0IFtuZXdTdGF0ZVgsIG5ld1N0YXRlWV0gPSBnZXRCb3VuZFBvc2l0aW9uKHRoaXMsIG5ld1N0YXRlLngsIG5ld1N0YXRlLnkpO1xuICAgICAgbmV3U3RhdGUueCA9IG5ld1N0YXRlWDtcbiAgICAgIG5ld1N0YXRlLnkgPSBuZXdTdGF0ZVk7XG5cbiAgICAgIC8vIFJlY2FsY3VsYXRlIHNsYWNrIGJ5IG5vdGluZyBob3cgbXVjaCB3YXMgc2hhdmVkIGJ5IHRoZSBib3VuZFBvc2l0aW9uIGhhbmRsZXIuXG4gICAgICBuZXdTdGF0ZS5zbGFja1ggPSB0aGlzLnN0YXRlLnNsYWNrWCArICh4IC0gbmV3U3RhdGUueCk7XG4gICAgICBuZXdTdGF0ZS5zbGFja1kgPSB0aGlzLnN0YXRlLnNsYWNrWSArICh5IC0gbmV3U3RhdGUueSk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgZXZlbnQgd2UgZmlyZSB0byByZWZsZWN0IHdoYXQgcmVhbGx5IGhhcHBlbmVkIGFmdGVyIGJvdW5kcyB0b29rIGVmZmVjdC5cbiAgICAgIHVpRGF0YS54ID0gbmV3U3RhdGUueDtcbiAgICAgIHVpRGF0YS55ID0gbmV3U3RhdGUueTtcbiAgICAgIHVpRGF0YS5kZWx0YVggPSBuZXdTdGF0ZS54IC0gdGhpcy5zdGF0ZS54O1xuICAgICAgdWlEYXRhLmRlbHRhWSA9IG5ld1N0YXRlLnkgLSB0aGlzLnN0YXRlLnk7XG4gICAgfVxuXG4gICAgLy8gU2hvcnQtY2lyY3VpdCBpZiB1c2VyJ3MgY2FsbGJhY2sga2lsbGVkIGl0LlxuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25EcmFnKGUsIHVpRGF0YSk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGxvZygnb25EcmFnIG5ld1N0YXRlJywgbmV3U3RhdGUpXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH07XG5cbiAgb25EcmFnU3RvcDogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm4gZmFsc2U7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RvcCA9IHRoaXMucHJvcHMub25TdG9wKGUsIGNyZWF0ZURyYWdnYWJsZURhdGEodGhpcywgY29yZURhdGEpKTtcbiAgICBpZiAoc2hvdWxkU3RvcCA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdG9wOiAlaicsIGNvcmVEYXRhKTtcblxuICAgIGNvbnN0IG5ld1N0YXRlOiAkU2hhcGU8RHJhZ2dhYmxlU3RhdGU+ID0ge1xuICAgICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgICAgc2xhY2tYOiAwLFxuICAgICAgc2xhY2tZOiAwXG4gICAgfTtcblxuICAgIC8vIElmIHRoaXMgaXMgYSBjb250cm9sbGVkIGNvbXBvbmVudCwgdGhlIHJlc3VsdCBvZiB0aGlzIG9wZXJhdGlvbiB3aWxsIGJlIHRvXG4gICAgLy8gcmV2ZXJ0IGJhY2sgdG8gdGhlIG9sZCBwb3NpdGlvbi4gV2UgZXhwZWN0IGEgaGFuZGxlciBvbiBgb25EcmFnU3RvcGAsIGF0IHRoZSBsZWFzdC5cbiAgICBjb25zdCBjb250cm9sbGVkID0gQm9vbGVhbih0aGlzLnByb3BzLnBvc2l0aW9uKTtcbiAgICBpZiAoY29udHJvbGxlZCkge1xuICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnByb3BzLnBvc2l0aW9uO1xuICAgICAgbmV3U3RhdGUueCA9IHg7XG4gICAgICBuZXdTdGF0ZS55ID0geTtcbiAgICB9XG4gICAgbG9nKCdvbkRyYWdTdG9wIG5ld1N0YXRlJywgbmV3U3RhdGUpXG4gICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSk7XG4gIH07XG4gIHN0b3BNb3ZlOiBhbnkgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuYXV0b1N0ZXBUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuYXV0b1N0ZXBUaW1lcik7XG4gICAgfVxuICB9XG4gIG9uS2V5TW92ZTogYW55ID0gKGUpID0+IHtcbiAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gICAgaWYgKGUgJiYgKGUua2V5Q29kZSA9PT0gMzcgfHwgZS5rZXlDb2RlID09PSAzOCB8fCBlLmtleUNvZGUgPT09IDM5IHx8IGUua2V5Q29kZSA9PT0gNDApKSB7XG4gICAgICBpZiAoZS5wZXJzaXN0KSB7XG4gICAgICAgIGUucGVyc2lzdCgpXG4gICAgICB9XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAgIGxldCBfeCA9IHg7XG4gICAgICBsZXQgX3kgPSB5O1xuICAgICAgLy8gbG9nKCdvbktleVVwJywgZS5rZXlDb2RlKVxuICAgICAgLy8gbG9nKCdvbktleVVwJywgZS5rZXlDb2RlLCB0aGlzLnN0YXRlKVxuICAgICAgc3dpdGNoIChlLmtleUNvZGUpIHtcbiAgICAgICAgLy8g5bemXG4gICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgX3ggLT0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8g5LiKXG4gICAgICAgIGNhc2UgMzg6XG4gICAgICAgICAgX3kgLT0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8g5Y+zXG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgX3ggKz0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8g5LiLXG4gICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgX3kgKz0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBvc2l0aW9uID0geyB4OiBfeCwgeTogX3kgfVxuICAgICAgdGhpcy5zZXRTdGF0ZShwb3NpdGlvbik7XG4gICAgICBpZiAodGhpcy5wcm9wcy5vbktleU1vdmUpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbktleU1vdmUoZSwgcG9zaXRpb24pO1xuICAgICAgfVxuICAgICAgdGhpcy5hdXRvU3RlcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMub25LZXlNb3ZlKGUpXG4gICAgICB9LCB0aGlzLnByb3BzLmtleU1vdmVTcGVlZCk7XG4gICAgfVxuICB9XG4gIG9uS2V5VXA6IGFueSA9IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMua2V5TW92ZUVuYWJsZWQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIC8vIHRoaXMub25LZXlNb3ZlKGUpXG4gICAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbktleVVwKGUpO1xuICB9O1xuICBvbktleURvd246IGFueSA9IChlKSA9PiB7XG4gICAgaWYgKHRoaXMucHJvcHMua2V5TW92ZUVuYWJsZWQgJiYgIXRoaXMucHJvcHMuZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMub25LZXlNb3ZlKGUpXG4gICAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vbktleURvd24oZSk7XG4gIH1cbiAgbW92ZVNuYXBpbmc6IGFueSA9IChzbmFwID0ge30pID0+IHtcbiAgICAvLyBjb25zdCB7IGF4aXMsIG1vdmVEaXN0YW5jZSwgc25hcFRyZXNoaG9sZCwgdGFyZ2V0UG9zaXRpb24gfSA9IHNuYXA7XG4gICAgY29uc3QgdGhpc05vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBjb25zdCByZWN0ID0gdGhpc05vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgeyB4LCB5LCBwYXJlbnRSZWN0LCBzbmFwVHJlc2hob2xkIH0gPSBzbmFwO1xuICAgIC8vIGNvbnN0IF90YXJnZXRQb3NpdGlvbiA9IE1hdGguYWJzKHRhcmdldFBvc2l0aW9uKVxuICAgIC8vIGNvbnN0IF9tb3ZlRGlzdGFuY2UgPSBNYXRoLmFicyhtb3ZlRGlzdGFuY2UpXG4gICAgY29uc3QgeERpc3RhbmNlID0geCAtIChyZWN0LnggLSBwYXJlbnRSZWN0LngpIHx8IDBcbiAgICBjb25zb2xlLmxvZygneCx5JywgeCwgeERpc3RhbmNlKVxuICAgIGlmICh4RGlzdGFuY2UgJiYgTWF0aC5hYnMoeERpc3RhbmNlKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgeDogdGhpcy5zdGF0ZS54ICsgeERpc3RhbmNlIH0pXG4gICAgfVxuXG4gICAgLy8gaWYgKG1vdmVEaXN0YW5jZSA+IDApIHtcbiAgICAvLyAgIF94ICs9IHNuYXBUcmVzaGhvbGQ7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIF94IC09IHNuYXBUcmVzaGhvbGRcbiAgICAvLyB9XG4gICAgLy8gc3dpdGNoIChheGlzKSB7XG4gICAgLy8gICBjYXNlICd4JzpcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIC8vIGNvbnN0IF94ID0geCArIHRhcmdldFBvc2l0aW9uO1xuICAgIC8vICAgICAgIC8vIGNvbnNvbGUubG9nKCdtb3ZlU25hcGluZyBtb3ZlRGlzdGFuY2UnLCBfeCwgbW92ZURpc3RhbmNlLCBzbmFwVHJlc2hob2xkKVxuICAgIC8vICAgICAgIC8vIGlmICgoeCArIF90YXJnZXRQb3NpdGlvbikgPD0gKHggKyBzbmFwVHJlc2hob2xkKSkge1xuICAgIC8vICAgICAgIC8vICAgdGhpcy5zZXRTdGF0ZSh7IHg6IF94IH0pXG4gICAgLy8gICAgICAgLy8gfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGJyZWFrO1xuICAgIC8vICAgY2FzZSAneSc6XG4gICAgLy8gICAgIC8vIHRoaXMuc2V0U3RhdGUoeyB5OiB5ICsgbW92ZURpc3RhbmNlIH0pO1xuICAgIC8vICAgICBicmVhaztcbiAgICAvLyB9XG4gIH1cbiAgZ2V0IHBvc2l0aW9uUm90YXRlKCk6IGFueSB7XG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgY29uc3QgZHJhZ2dhYmxlID0gIWNvbnRyb2xsZWQgfHwgdGhpcy5zdGF0ZS5kcmFnZ2luZztcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb24gfHwgdGhpcy5wcm9wcy5kZWZhdWx0UG9zaXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNhbkRyYWdYKHRoaXMpICYmIGRyYWdnYWJsZSA/XG4gICAgICAgIHRoaXMuc3RhdGUueCA6XG4gICAgICAgIHBvc2l0aW9uLngsXG5cbiAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICB5OiBjYW5EcmFnWSh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnkgOlxuICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgZGVncmVlOiBOdW1iZXIodGhpcy5wcm9wcy5kZWdyZWUpIHx8IDBcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICBsZXQgc3R5bGUgPSB7fSwgc3ZnVHJhbnNmb3JtID0gbnVsbDtcblxuICAgIC8vIElmIHRoaXMgaXMgY29udHJvbGxlZCwgd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGl0IC0gdW5sZXNzIGl0J3MgZHJhZ2dpbmcuXG4gICAgY29uc3QgdHJhbnNmb3JtT3B0cyA9IHRoaXMucG9zaXRpb25Sb3RhdGU7XG4gICAgLy8gbG9nKCdyZW5kZXIgdHJhbnNmb3JtT3B0cycsIHRyYW5zZm9ybU9wdHMpO1xuICAgIC8vIElmIHRoaXMgZWxlbWVudCB3YXMgU1ZHLCB3ZSB1c2UgdGhlIGB0cmFuc2Zvcm1gIGF0dHJpYnV0ZS5cbiAgICBpZiAodGhpcy5zdGF0ZS5pc0VsZW1lbnRTVkcpIHtcbiAgICAgIHN2Z1RyYW5zZm9ybSA9IGNyZWF0ZVNWR1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIGEgQ1NTIHRyYW5zZm9ybSB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZC4gVGhpcyBhbGxvd3MgdXMgdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmRcbiAgICAgIC8vIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgd2hldGhlciBvciBub3QgaXQgaXMgcmVsYXRpdmVseSBvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuXG4gICAgICAvLyBJZiB0aGUgaXRlbSB5b3UgYXJlIGRyYWdnaW5nIGFscmVhZHkgaGFzIGEgdHJhbnNmb3JtIHNldCwgd3JhcCBpdCBpbiBhIDxzcGFuPiBzbyA8RHJhZ2dhYmxlPlxuICAgICAgLy8gaGFzIGEgY2xlYW4gc2xhdGUuXG4gICAgICBzdHlsZSA9IGNyZWF0ZUNTU1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQsXG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gTWFyayB3aXRoIGNsYXNzIHdoaWxlIGRyYWdnaW5nXG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCBkZWZhdWx0Q2xhc3NOYW1lLCB7XG4gICAgICBbZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nXTogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZF06IHRoaXMuc3RhdGUuZHJhZ2dlZCxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZF06IHRoaXMuc3RhdGUuZm9jdXNlZFxuICAgIH0pO1xuXG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKFxuICAgICAgPERyYWdnYWJsZUNvcmUgcmVmPXsoZSkgPT4geyB0aGlzLmRyYWdnYWJsZUNvcmUgPSBlOyB9fSB7Li4udGhpcy5wcm9wc30gb25TdGFydD17dGhpcy5vbkRyYWdTdGFydH0gb25EcmFnPXt0aGlzLm9uRHJhZ30gb25TdG9wPXt0aGlzLm9uRHJhZ1N0b3B9IG9uS2V5VXA9e3RoaXMub25LZXlVcH0gb25LZXlEb3duPXt0aGlzLm9uS2V5RG93bn0gPlxuICAgICAgICB7XG4gICAgICAgICAgUmVhY3QuY2xvbmVFbGVtZW50KFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbiksIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICAgICAgc3R5bGU6IHsgLi4udGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5zdHlsZSwgLi4uc3R5bGUgfSxcbiAgICAgICAgICAgIHRyYW5zZm9ybTogc3ZnVHJhbnNmb3JtLFxuICAgICAgICAgICAgdGFiSW5kZXg6IC0xLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIDwvRHJhZ2dhYmxlQ29yZT5cbiAgICApO1xuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvRHJhZ2dhYmxlLmpzIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgnLi9jaGVja1Byb3BUeXBlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzVmFsaWRFbGVtZW50LCB0aHJvd09uRGlyZWN0QWNjZXNzKSB7XG4gIC8qIGdsb2JhbCBTeW1ib2wgKi9cbiAgdmFyIElURVJBVE9SX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLml0ZXJhdG9yO1xuICB2YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaXRlcmF0b3IgbWV0aG9kIGZ1bmN0aW9uIGNvbnRhaW5lZCBvbiB0aGUgaXRlcmFibGUgb2JqZWN0LlxuICAgKlxuICAgKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAgICpcbiAgICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAgICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAqICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChteUl0ZXJhYmxlKTtcbiAgICogICAgICAgLi4uXG4gICAqICAgICB9XG4gICAqXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICAgKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gICAqL1xuICBmdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICAgIGlmICh0eXBlb2YgaXRlcmF0b3JGbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gICAqIHN1cHBsaWVkIHRvIFJlYWN0IGNvbXBvbmVudHMuIEV4YW1wbGUgdXNhZ2U6XG4gICAqXG4gICAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAgICogICB2YXIgTXlBcnRpY2xlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgKiAgICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAgICogICAgICAgZGVzY3JpcHRpb246IFByb3BzLnN0cmluZyxcbiAgICpcbiAgICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICAgKiAgICAgICBjYXRlZ29yeTogUHJvcHMub25lT2YoWydOZXdzJywnUGhvdG9zJ10pLmlzUmVxdWlyZWQsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICAgKiAgICAgICBkaWFsb2c6IFByb3BzLmluc3RhbmNlT2YoRGlhbG9nKS5pc1JlcXVpcmVkXG4gICAqICAgICB9LFxuICAgKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAgICogICB9KTtcbiAgICpcbiAgICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICAgKlxuICAgKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAgICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gICAqXG4gICAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAgICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICAgKlxuICAgKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgcHJvcFR5cGVzOiB7XG4gICAqICAgICAgLy8gQW4gb3B0aW9uYWwgc3RyaW5nIG9yIFVSSSBwcm9wIG5hbWVkIFwiaHJlZlwiLlxuICAgKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICAgKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICogICAgICAgIGlmIChwcm9wVmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgcHJvcFZhbHVlICE9PSAnc3RyaW5nJyAmJlxuICAgKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICAgKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICAgKiAgICAgICAgICAgICdFeHBlY3RlZCBhIHN0cmluZyBvciBhbiBVUkkgZm9yICcgKyBwcm9wTmFtZSArICcgaW4gJyArXG4gICAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgKiAgICAgICAgICApO1xuICAgKiAgICAgICAgfVxuICAgKiAgICAgIH1cbiAgICogICAgfSxcbiAgICogICAgcmVuZGVyOiBmdW5jdGlvbigpIHsuLi59XG4gICAqICB9KTtcbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuXG4gIHZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc2AuXG4gIHZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgICBhcnJheTogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2FycmF5JyksXG4gICAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgICBudW1iZXI6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdudW1iZXInKSxcbiAgICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgICBzeW1ib2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzeW1ib2wnKSxcblxuICAgIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gICAgZWxlbWVudDogY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCksXG4gICAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICAgIG9iamVjdE9mOiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyLFxuICAgIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gICAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICAgIHNoYXBlOiBjcmVhdGVTaGFwZVR5cGVDaGVja2VyLFxuICAgIGV4YWN0OiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyLFxuICB9O1xuXG4gIC8qKlxuICAgKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9pc1xuICAgKi9cbiAgLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuICBmdW5jdGlvbiBpcyh4LCB5KSB7XG4gICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgIGlmICh4ID09PSB5KSB7XG4gICAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICAgIH1cbiAgfVxuICAvKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuICAvKipcbiAgICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICAgKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyLCB3ZSBkb24ndCB1c2UgcmVhbFxuICAgKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gICAqIGlzIHByb2hpYml0aXZlbHkgZXhwZW5zaXZlIGlmIHRoZXkgYXJlIGNyZWF0ZWQgdG9vIG9mdGVuLCBzdWNoIGFzIHdoYXRcbiAgICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICAgKi9cbiAgZnVuY3Rpb24gUHJvcFR5cGVFcnJvcihtZXNzYWdlKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB0aGlzLnN0YWNrID0gJyc7XG4gIH1cbiAgLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuICBQcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuICBmdW5jdGlvbiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGUgPSB7fTtcbiAgICAgIHZhciBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCA9IDA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgcHJvcEZ1bGxOYW1lID0gcHJvcEZ1bGxOYW1lIHx8IHByb3BOYW1lO1xuXG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCkge1xuICAgICAgICBpZiAodGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAgICAgICAgIC8vIE5ldyBiZWhhdmlvciBvbmx5IGZvciB1c2VycyBvZiBgcHJvcC10eXBlc2AgcGFja2FnZVxuICAgICAgICAgIGludmFyaWFudChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgJ1VzZSBgUHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzKClgIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAgICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gT2xkIGJlaGF2aW9yIGZvciBwZW9wbGUgdXNpbmcgUmVhY3QuUHJvcFR5cGVzXG4gICAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gJiZcbiAgICAgICAgICAgIC8vIEF2b2lkIHNwYW1taW5nIHRoZSBjb25zb2xlIGJlY2F1c2UgdGhleSBhcmUgb2Z0ZW4gbm90IGFjdGlvbmFibGUgZXhjZXB0IGZvciBsaWIgYXV0aG9yc1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPCAzXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICAgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgK1xuICAgICAgICAgICAgICAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgK1xuICAgICAgICAgICAgICAnYW5kIHdpbGwgdGhyb3cgaW4gdGhlIHN0YW5kYWxvbmUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgICAgICAgICAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICtcbiAgICAgICAgICAgICAgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsXG4gICAgICAgICAgICAgIHByb3BGdWxsTmFtZSxcbiAgICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSA9IHRydWU7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZVdhcm5pbmdDb3VudCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjaGFpbmVkQ2hlY2tUeXBlID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgZmFsc2UpO1xuICAgIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAgIC8vICdvZiB0eXBlIGBvYmplY3RgJy5cbiAgICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcmVjaXNlVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnYCcgKyBleHBlY3RlZFR5cGUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUFueVR5cGVDaGVja2VyKCkge1xuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBhcnJheS4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnWycgKyBpICsgJ10nLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBpZiAoIWlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgICB2YXIgZXhwZWN0ZWRDbGFzc05hbWUgPSBleHBlY3RlZENsYXNzLm5hbWUgfHwgQU5PTllNT1VTO1xuICAgICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIGFjdHVhbENsYXNzTmFtZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCAnKSArICgnaW5zdGFuY2Ugb2YgYCcgKyBleHBlY3RlZENsYXNzTmFtZSArICdgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlRW51bVR5cGVDaGVja2VyKGV4cGVjdGVkVmFsdWVzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChpcyhwcm9wVmFsdWUsIGV4cGVjdGVkVmFsdWVzW2ldKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZXNTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShleHBlY3RlZFZhbHVlcyk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVPYmplY3RPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIG9iamVjdE9mLicpO1xuICAgICAgfVxuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcFZhbHVlKSB7XG4gICAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlVW5pb25UeXBlQ2hlY2tlcihhcnJheU9mVHlwZUNoZWNrZXJzKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2ZUeXBlLCBleHBlY3RlZCBhbiBpbnN0YW5jZSBvZiBhcnJheS4nKSA6IHZvaWQgMDtcbiAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5T2ZUeXBlQ2hlY2tlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgIGlmICh0eXBlb2YgY2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB3YXJuaW5nKFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZS4gRXhwZWN0ZWQgYW4gYXJyYXkgb2YgY2hlY2sgZnVuY3Rpb25zLCBidXQgJyArXG4gICAgICAgICAgJ3JlY2VpdmVkICVzIGF0IGluZGV4ICVzLicsXG4gICAgICAgICAgZ2V0UG9zdGZpeEZvclR5cGVXYXJuaW5nKGNoZWNrZXIpLFxuICAgICAgICAgIGlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gYXJyYXlPZlR5cGVDaGVja2Vyc1tpXTtcbiAgICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTm9kZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlIGAnICsgcHJvcFR5cGUgKyAnYCAnICsgKCdzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYG9iamVjdGAuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0cmljdFNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIC8vIFdlIG5lZWQgdG8gY2hlY2sgYWxsIGtleXMgaW4gY2FzZSBzb21lIGFyZSByZXF1aXJlZCBidXQgbWlzc2luZyBmcm9tXG4gICAgICAvLyBwcm9wcy5cbiAgICAgIHZhciBhbGxLZXlzID0gYXNzaWduKHt9LCBwcm9wc1twcm9wTmFtZV0sIHNoYXBlVHlwZXMpO1xuICAgICAgZm9yICh2YXIga2V5IGluIGFsbEtleXMpIHtcbiAgICAgICAgdmFyIGNoZWNrZXIgPSBzaGFwZVR5cGVzW2tleV07XG4gICAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcihcbiAgICAgICAgICAgICdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBrZXkgYCcgKyBrZXkgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYC4nICtcbiAgICAgICAgICAgICdcXG5CYWQgb2JqZWN0OiAnICsgSlNPTi5zdHJpbmdpZnkocHJvcHNbcHJvcE5hbWVdLCBudWxsLCAnICAnKSArXG4gICAgICAgICAgICAnXFxuVmFsaWQga2V5czogJyArICBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhzaGFwZVR5cGVzKSwgbnVsbCwgJyAgJylcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICAgIHN3aXRjaCAodHlwZW9mIHByb3BWYWx1ZSkge1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICByZXR1cm4gIXByb3BWYWx1ZTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFZhbHVlLmV2ZXJ5KGlzTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4ocHJvcFZhbHVlKTtcbiAgICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICAgIGlmICghaXNOb2RlKGVudHJ5WzFdKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gICAgLy8gTmF0aXZlIFN5bWJvbC5cbiAgICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICAgIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wVmFsdWUgaW5zdGFuY2VvZiBTeW1ib2wpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbiAgZnVuY3Rpb24gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKSB7XG4gICAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9XG4gICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgLy8gT2xkIHdlYmtpdHMgKGF0IGxlYXN0IHVudGlsIEFuZHJvaWQgNC4wKSByZXR1cm4gJ2Z1bmN0aW9uJyByYXRoZXIgdGhhblxuICAgICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICAgIHJldHVybiAnb2JqZWN0JztcbiAgICB9XG4gICAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgICByZXR1cm4gJ3N5bWJvbCc7XG4gICAgfVxuICAgIHJldHVybiBwcm9wVHlwZTtcbiAgfVxuXG4gIC8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbiAgLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG4gIGZ1bmN0aW9uIGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcFZhbHVlID09PSAndW5kZWZpbmVkJyB8fCBwcm9wVmFsdWUgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnJyArIHByb3BWYWx1ZTtcbiAgICB9XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICByZXR1cm4gJ2RhdGUnO1xuICAgICAgfSBlbHNlIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgaXMgcG9zdGZpeGVkIHRvIGEgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIHR5cGUuXG4gIC8vIEZvciBleGFtcGxlLCBcInVuZGVmaW5lZFwiIG9yIFwib2YgdHlwZSBhcnJheVwiXG4gIGZ1bmN0aW9uIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gZ2V0UHJlY2lzZVR5cGUodmFsdWUpO1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuICdhbiAnICsgdHlwZTtcbiAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICBjYXNlICdyZWdleHAnOlxuICAgICAgICByZXR1cm4gJ2EgJyArIHR5cGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNsYXNzIG5hbWUgb2YgdGhlIG9iamVjdCwgaWYgYW55LlxuICBmdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgICByZXR1cm4gQU5PTllNT1VTO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH1cblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGNoZWNrUHJvcFR5cGVzO1xuICBSZWFjdFByb3BUeXBlcy5Qcm9wVHlwZXMgPSBSZWFjdFByb3BUeXBlcztcblxuICByZXR1cm4gUmVhY3RQcm9wVHlwZXM7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9mYWN0b3J5V2l0aFR5cGVDaGVja2Vycy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypcbm9iamVjdC1hc3NpZ25cbihjKSBTaW5kcmUgU29yaHVzXG5AbGljZW5zZSBNSVRcbiovXG5cbid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scztcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LXdyYXBwZXJzXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGVycikge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdFx0c3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL29iamVjdC1hc3NpZ24vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG4gIHZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGludmFyaWFudCh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gPT09ICdmdW5jdGlvbicsICclczogJXMgdHlwZSBgJXNgIGlzIGludmFsaWQ7IGl0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tICcgKyAndGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLCBidXQgcmVjZWl2ZWQgYCVzYC4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSk7XG4gICAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgICB9XG4gICAgICAgIHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIGxvY2F0aW9uLCB0eXBlU3BlY05hbWUsIHR5cGVvZiBlcnJvcik7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgICAgLy8gc2FtZSBlcnJvci5cbiAgICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIHN0YWNrID0gZ2V0U3RhY2sgPyBnZXRTdGFjaygpIDogJyc7XG5cbiAgICAgICAgICB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgc3RhY2sgIT0gbnVsbCA/IHN0YWNrIDogJycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tQcm9wVHlwZXM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2NoZWNrUHJvcFR5cGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBzaGltKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgaWYgKHNlY3JldCA9PT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgIC8vIEl0IGlzIHN0aWxsIHNhZmUgd2hlbiBjYWxsZWQgZnJvbSBSZWFjdC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaW52YXJpYW50KFxuICAgICAgZmFsc2UsXG4gICAgICAnQ2FsbGluZyBQcm9wVHlwZXMgdmFsaWRhdG9ycyBkaXJlY3RseSBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZS4gJyArXG4gICAgICAnVXNlIFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpIHRvIGNhbGwgdGhlbS4gJyArXG4gICAgICAnUmVhZCBtb3JlIGF0IGh0dHA6Ly9mYi5tZS91c2UtY2hlY2stcHJvcC10eXBlcydcbiAgICApO1xuICB9O1xuICBzaGltLmlzUmVxdWlyZWQgPSBzaGltO1xuICBmdW5jdGlvbiBnZXRTaGltKCkge1xuICAgIHJldHVybiBzaGltO1xuICB9O1xuICAvLyBJbXBvcnRhbnQhXG4gIC8vIEtlZXAgdGhpcyBsaXN0IGluIHN5bmMgd2l0aCBwcm9kdWN0aW9uIHZlcnNpb24gaW4gYC4vZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IHNoaW0sXG4gICAgYm9vbDogc2hpbSxcbiAgICBmdW5jOiBzaGltLFxuICAgIG51bWJlcjogc2hpbSxcbiAgICBvYmplY3Q6IHNoaW0sXG4gICAgc3RyaW5nOiBzaGltLFxuICAgIHN5bWJvbDogc2hpbSxcblxuICAgIGFueTogc2hpbSxcbiAgICBhcnJheU9mOiBnZXRTaGltLFxuICAgIGVsZW1lbnQ6IHNoaW0sXG4gICAgaW5zdGFuY2VPZjogZ2V0U2hpbSxcbiAgICBub2RlOiBzaGltLFxuICAgIG9iamVjdE9mOiBnZXRTaGltLFxuICAgIG9uZU9mOiBnZXRTaGltLFxuICAgIG9uZU9mVHlwZTogZ2V0U2hpbSxcbiAgICBzaGFwZTogZ2V0U2hpbSxcbiAgICBleGFjdDogZ2V0U2hpbVxuICB9O1xuXG4gIFJlYWN0UHJvcFR5cGVzLmNoZWNrUHJvcFR5cGVzID0gZW1wdHlGdW5jdGlvbjtcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5jb25zdCBwcmVmaXhlcyA9IFsnTW96JywgJ1dlYmtpdCcsICdPJywgJ21zJ107XG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJlZml4KHByb3A6IHN0cmluZz0ndHJhbnNmb3JtJyk6IHN0cmluZyB7XG4gIC8vIENoZWNraW5nIHNwZWNpZmljYWxseSBmb3IgJ3dpbmRvdy5kb2N1bWVudCcgaXMgZm9yIHBzZXVkby1icm93c2VyIHNlcnZlci1zaWRlXG4gIC8vIGVudmlyb25tZW50cyB0aGF0IGRlZmluZSAnd2luZG93JyBhcyB0aGUgZ2xvYmFsIGNvbnRleHQuXG4gIC8vIEUuZy4gUmVhY3QtcmFpbHMgKHNlZSBodHRwczovL2dpdGh1Yi5jb20vcmVhY3Rqcy9yZWFjdC1yYWlscy9wdWxsLzg0KVxuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHdpbmRvdy5kb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcblxuICBjb25zdCBzdHlsZSA9IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbiAgaWYgKHByb3AgaW4gc3R5bGUpIHJldHVybiAnJztcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGJyb3dzZXJQcmVmaXhUb0tleShwcm9wLCBwcmVmaXhlc1tpXSkgaW4gc3R5bGUpIHJldHVybiBwcmVmaXhlc1tpXTtcbiAgfVxuXG4gIHJldHVybiAnJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJyb3dzZXJQcmVmaXhUb0tleShwcm9wOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHByZWZpeCA/IGAke3ByZWZpeH0ke2tlYmFiVG9UaXRsZUNhc2UocHJvcCl9YCA6IHByb3A7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4VG9TdHlsZShwcm9wOiBzdHJpbmcsIHByZWZpeDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHByZWZpeCA/IGAtJHtwcmVmaXgudG9Mb3dlckNhc2UoKX0tJHtwcm9wfWAgOiBwcm9wO1xufVxuXG5mdW5jdGlvbiBrZWJhYlRvVGl0bGVDYXNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgbGV0IG91dCA9ICcnO1xuICBsZXQgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHNob3VsZENhcGl0YWxpemUpIHtcbiAgICAgIG91dCArPSBzdHJbaV0udG9VcHBlckNhc2UoKTtcbiAgICAgIHNob3VsZENhcGl0YWxpemUgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHN0cltpXSA9PT0gJy0nKSB7XG4gICAgICBzaG91bGRDYXBpdGFsaXplID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ICs9IHN0cltpXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG91dDtcbn1cblxuLy8gRGVmYXVsdCBleHBvcnQgaXMgdGhlIHByZWZpeCBpdHNlbGYsIGxpa2UgJ01veicsICdXZWJraXQnLCBldGNcbi8vIE5vdGUgdGhhdCB5b3UgbWF5IGhhdmUgdG8gcmUtdGVzdCBmb3IgY2VydGFpbiB0aGluZ3M7IGZvciBpbnN0YW5jZSwgQ2hyb21lIDUwXG4vLyBjYW4gaGFuZGxlIHVucHJlZml4ZWQgYHRyYW5zZm9ybWAsIGJ1dCBub3QgdW5wcmVmaXhlZCBgdXNlci1zZWxlY3RgXG5leHBvcnQgZGVmYXVsdCBnZXRQcmVmaXgoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9nZXRQcmVmaXguanMiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IHtcbiAgYWRkRXZlbnQsIHJlbW92ZUV2ZW50LFxufSBmcm9tICcuL3V0aWxzL2RvbUZucyc7XG5cbmNvbnN0IGV2ZW50c0ZvciA9IHtcbiAgdG91Y2g6IHtcbiAgICBzdGFydDogJ3RvdWNoc3RhcnQnLFxuICAgIG1vdmU6ICd0b3VjaG1vdmUnLFxuICAgIHN0b3A6ICd0b3VjaGVuZCdcbiAgfSxcbiAgbW91c2U6IHtcbiAgICBzdGFydDogJ21vdXNlZG93bicsXG4gICAgbW92ZTogJ21vdXNlbW92ZScsXG4gICAgc3RvcDogJ21vdXNldXAnXG4gIH1cbn07XG5cbmNvbnN0IHJlbW92ZSA9IGZ1bmN0aW9uKGFycmF5LCBmcm9tLCB0bykge1xuICB2YXIgcmVzdCA9IGFycmF5LnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyYXkubGVuZ3RoKTtcbiAgYXJyYXkubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnJheS5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgcmV0dXJuIGFycmF5LnB1c2guYXBwbHkoYXJyYXksIHJlc3QpO1xufTtcblxuY29uc3QgcmVtb3ZlRW50cnkgPSBmdW5jdGlvbihhcnJheSwgZW50cnkpIHtcbiAgdmFyIGluZGV4ID0gYXJyYXkuaW5kZXhPZihlbnRyeSk7XG4gIGlmIChpbmRleCAhPT0gLTEpIHJlbW92ZShhcnJheSwgaW5kZXgpO1xufTtcblxuY29uc3QgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgcmV0dXJuIGV2ZW50LmN1cnJlbnRUYXJnZXQgfHwgZXZlbnQudGFyZ2V0IHx8IGV2ZW50LnNyY0VsZW1lbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVBbGlnbkd1aWRlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGRpc3BsYXlOYW1lID0gJ0RyYWdnYWJsZUFsaWduR3VpZGUnO1xuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIG9uU25hcGluZzogUHJvcFR5cGVzLmZ1bmMsXG4gIH07XG5cbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBvblNuYXBpbmc6ICgpID0+IHsgfSxcbiAgfTtcbiAgZWRnZXMgPSBudWxsO1xuICBzdGF0aWNHdWlkZXMgPSBudWxsO1xuICB4ID0gMDtcbiAgeSA9IDA7XG4gIG1vdXNlT2Zmc2V0WCA9IDA7XG4gIG1vdXNlT2Zmc2V0WSA9IDA7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGJveGVzOiBbXSxcbiAgICAgIHNuYXBUcmVzaGhvbGQ6IDUsXG4gICAgICBtaW5pbXVtRGlzdGFuY2U6IDEwLFxuICAgICAgb2Zmc2V0OiBudWxsLFxuICAgICAgc3RhdGljR3VpZGVzOiBudWxsLFxuICAgICAgYXhpczogW11cbiAgICB9XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5yZXNldFN0YXRpY0d1aWRlcygpO1xuXG4gICAgdGhpcy5jaGFydCgpO1xuICB9XG5cbiAgY2hhcnQoKSB7XG4gICAgdGhpcy5yZXNldEVkZ2VzKCk7XG4gICAgLy8gdGhpcy5kaXN0YW5jZXMgPSBuZXcgT2JqZWN0KCk7XG4gICAgY29uc3QgYm94ZXMgPSB0aGlzLmJveGVzO1xuICAgIGNvbnN0IHBhcmVudFJlY3QgPSB0aGlzLmNsaWVudFJlY3Q7XG4gICAgaWYgKGJveGVzICYmIGJveGVzLmxlbmd0aCkge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gYm94ZXMpIHtcbiAgICAgICAgaWYgKGJveGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICBjb25zdCBib3ggPSBib3hlc1trZXldO1xuICAgICAgICAgIGNvbnN0IHsgeCwgeSwgd2lkdGgsIGhlaWdodCB9ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IGludGVyZXN0UG9pbnRzID0gdGhpcy5nZXRJbnRlcmVzdFBvaW50cyh7XG4gICAgICAgICAgICB4OiB4IC0gcGFyZW50UmVjdC54LFxuICAgICAgICAgICAgeTogeSAtIHBhcmVudFJlY3QueSxcbiAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgcmlnaHQ6IHggLSBwYXJlbnRSZWN0LnggKyB3aWR0aCxcbiAgICAgICAgICAgIGJvdHRvbTogeSAtIHBhcmVudFJlY3QueSArIGhlaWdodCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLmVkZ2VzLngucHVzaC5hcHBseSh0aGlzLmVkZ2VzLngsIGludGVyZXN0UG9pbnRzLngpO1xuICAgICAgICAgIHRoaXMuZWRnZXMueS5wdXNoLmFwcGx5KHRoaXMuZWRnZXMueSwgaW50ZXJlc3RQb2ludHMueSk7XG5cbiAgICAgICAgICBjb25zdCBndWlkZSA9IGJveC5nZXRBdHRyaWJ1dGUoJ2RhdGEtZ3VpZGUnKTtcbiAgICAgICAgICBpZiAoIWd1aWRlKSB7XG4gICAgICAgICAgICBib3guc2V0QXR0cmlidXRlKCdkYXRhLWd1aWRlJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIGFkZEV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0YXJ0LCAoZSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0VG9EcmFnKGUsIGJveClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuc2hvd0FsbEd1aWRlcygpO1xuICB9XG4gIHN0YXJ0VG9EcmFnKGV2ZW50LCBib3gpIHtcbiAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIGNvbnN0IHJlY3QgPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgX3N0YXJ0WCA9IHJlY3QueCAtIHBhcmVudFJlY3QueDtcbiAgICBjb25zdCBfc3RhcnRZID0gcmVjdC55IC0gcGFyZW50UmVjdC55O1xuICAgIHRoaXMubW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVggLSByZWN0LmxlZnQ7XG4gICAgdGhpcy5tb3VzZU9mZnNldFkgPSBldmVudC5wYWdlWSAtIHJlY3QudG9wO1xuICAgIGNvbnNvbGUubG9nKCdib3ggc3RhcnRUb0RyYWcgZ2V0Qm91bmRpbmdDbGllbnRSZWN0JywgcmVjdCwgdGhpcy5tb3VzZU9mZnNldFgpXG4gICAgY29uc29sZS5sb2coJ2Rpc3RhbmNlIC0gcG9zaXRpb24nLCBldmVudC5wYWdlWCwgdGhpcy5tb3VzZU9mZnNldFgpO1xuXG4gICAgdGhpcy5leGNsdWRlQm94Zm9ybUVkZ2VzKHtcbiAgICAgIHg6IF9zdGFydFgsXG4gICAgICB5OiBfc3RhcnRZLFxuICAgICAgd2lkdGg6IHJlY3Qud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlY3QuaGVpZ2h0LFxuICAgIH0pO1xuICAgIC8vIHRoaXMuZXhjbHVkZUJveEZyb21EaXN0YW5jZXMoKTtcbiAgICB0aGlzLnNob3dBbGxHdWlkZXMoKTtcblxuICAgIHRoaXMuZHJhZyhldmVudCk7XG5cbiAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmRyYWcpO1xuICAgIGFkZEV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuc3RvcFRvRHJhZyk7XG4gIH1cbiAgZHJhZyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJveCA9IGdldFRhcmdldChldmVudCk7XG4gICAgY29uc3QgcmVjdCA9IGJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IGRyYWcnLCBldmVudClcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIHRoaXMueCA9IGV2ZW50LnBhZ2VYIC0gcGFyZW50UmVjdC5sZWZ0IC0gdGhpcy5tb3VzZU9mZnNldFg7XG4gICAgLy8gdGhpcy54ID0gZXZlbnQucGFnZVggLSBwYXJlbnRSZWN0LmxlZnQgLSAoZXZlbnQucGFnZVggLSByZWN0LmxlZnQpO1xuICAgIHRoaXMueSA9IGV2ZW50LnBhZ2VZIC0gcGFyZW50UmVjdC50b3AgLSB0aGlzLm1vdXNlT2Zmc2V0WTtcbiAgICBjb25zb2xlLmxvZygnZ2V0Qm91bmRpbmdDbGllbnRSZWN0JywgZXZlbnQucGFnZVgsIHBhcmVudFJlY3QubGVmdCwgdGhpcy5tb3VzZU9mZnNldFgsIHRoaXMueClcbiAgICB0aGlzLnNuYXBUb0d1aWRlcyh7IGJveCwgcGFyZW50UmVjdCB9KTtcbiAgfVxuICBzdG9wVG9EcmFnID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYm94ID0gZ2V0VGFyZ2V0KGV2ZW50KTtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IHN0b3BUb0RyYWcnLCBldmVudClcbiAgICB0aGlzLmxvY2tlZEF4aXMgPSBudWxsO1xuICAgIHRoaXMuY2hhcnQoKTtcbiAgICAvLyB0aGlzLnJlbW92ZUd1aWRlcygpO1xuICAgIHJlbW92ZUV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuZHJhZyk7XG4gICAgcmVtb3ZlRXZlbnQoYm94LCBldmVudHNGb3IubW91c2Uuc3RvcCwgdGhpcy5zdG9wVG9EcmFnKTtcbiAgfVxuICBzbmFwVG9HdWlkZXMoeyByZXNpemUsIGJveCwgcGFyZW50UmVjdCB9KSB7XG4gICAgY29uc3QgX3Jlc2l6ZSA9IEJvb2xlYW4ocmVzaXplKTtcbiAgICBjb25zdCByZWN0ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5yZW1vdmVHdWlkZXMoKTtcblxuICAgIGNvbnN0IGF4aXMgPSBbXTtcblxuICAgIGNvbnN0IHhBeGlzID0gdGhpcy5zbmFwKHtcbiAgICAgIHBhcmVudFJlY3QsXG4gICAgICByZWN0LFxuICAgICAgcmVzaXplOiBfcmVzaXplLFxuICAgICAgYXhpczogJ3gnXG4gICAgfSk7XG5cbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGF4aXMucHVzaCh4QXhpcylcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZygndGhpcy54JywgdGhpcy54KVxuXG4gICAgY29uc3QgeUF4aXMgPSB0aGlzLnNuYXAoe1xuICAgICAgcGFyZW50UmVjdCxcbiAgICAgIHJlY3QsXG4gICAgICByZXNpemU6IF9yZXNpemUsXG4gICAgICBheGlzOiAneSdcbiAgICB9KTtcblxuICAgIGlmICh5QXhpcykge1xuICAgICAgYXhpcy5wdXNoKHlBeGlzKVxuICAgIH0gZWxzZSB7XG5cbiAgICB9XG5cbiAgICBpZiAoYXhpcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBheGlzIH0sICgpID0+IHtcbiAgICAgICAgYXhpcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgLy8gdGhpcy5wcm9wcy5vblNuYXBpbmcoaXRlbSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5wcm9wcy5vblNuYXBpbmcoeyB4OiB0aGlzLngsIHk6IHRoaXMueSwgcGFyZW50UmVjdCwgc25hcFRyZXNoaG9sZDogdGhpcy5zdGF0ZS5zbmFwVHJlc2hob2xkIH0pXG4gIH1cbiAgc25hcCh7IHBhcmVudFJlY3QsIHJlY3QsIGF4aXMgfSkge1xuICAgIGNvbnN0IHsgc25hcFRyZXNoaG9sZCB9ID0gdGhpcy5zdGF0ZVxuICAgIGNvbnN0IHNpZGUgPSBheGlzID09PSAneCcgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG4gICAgY29uc3Qgc3RhcnQgPSBheGlzID09PSAneCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICBjb25zdCBlbmQgPSBheGlzID09PSAneCcgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gICAgY29uc3QgZWRnZXMgPSB0aGlzLmVkZ2VzW2F4aXNdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlZGdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgcG9zaXRpb24gPSBlZGdlc1tpXTtcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gdGhpc1theGlzXTtcbiAgICAgIGNvbnN0IGhhbGZTaWRlTGVuZ3RoID0gTWF0aC5hYnMocmVjdFtzaWRlXSAvIDIpO1xuICAgICAgY29uc3QgY2VudGVyID0gZGlzdGFuY2UgKyBoYWxmU2lkZUxlbmd0aDtcbiAgICAgIGNvbnN0IGVuZERpc3RhbmNlID0gZGlzdGFuY2UgKyByZWN0W3NpZGVdO1xuICAgICAgbGV0IG1vdmVEaXN0YW5jZSA9IDA7XG4gICAgICBsZXQgdGFyZ2V0UG9zaXRpb24gPSAwO1xuICAgICAgbGV0IHNldEd1aWRlID0gZmFsc2U7XG5cbiAgICAgIGlmIChheGlzID09PSAneCcgJiYgMTkwID09PSBwb3NpdGlvbikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnTWF0aC5hYnMoZGlzdGFuY2UgLSBwb3NpdGlvbiknLCBlZGdlcywgZGlzdGFuY2UsIE1hdGguYWJzKGRpc3RhbmNlIC0gcG9zaXRpb24pLCBNYXRoLmFicyhkaXN0YW5jZSAtIHBvc2l0aW9uKSA8PSBzbmFwVHJlc2hob2xkKVxuICAgICAgfVxuXG4gICAgICBpZiAoTWF0aC5hYnMoZGlzdGFuY2UgLSBwb3NpdGlvbikgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgICB0aGlzW2F4aXNdID0gcG9zaXRpb247XG4gICAgICAgIHRhcmdldFBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIG1vdmVEaXN0YW5jZSA9IHBvc2l0aW9uIC0gZGlzdGFuY2U7XG4gICAgICAgIHNldEd1aWRlID0gdHJ1ZTtcbiAgICAgICAgY29uc29sZS5sb2coJ21vdmVEaXN0YW5jZW1vdmVEaXN0YW5jZScsIG1vdmVEaXN0YW5jZSwgZGlzdGFuY2UgLSBwb3NpdGlvbilcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoY2VudGVyIC0gcG9zaXRpb24pIDw9IHNuYXBUcmVzaGhvbGQpIHtcbiAgICAgICAgdGhpc1theGlzXSA9IHBvc2l0aW9uIC0gaGFsZlNpZGVMZW5ndGg7IC8vIG1vdmUgc25hcCBiZWhhdmlvciBcbiAgICAgICAgdGFyZ2V0UG9zaXRpb24gPSBwb3NpdGlvbiAtIGhhbGZTaWRlTGVuZ3RoO1xuICAgICAgICBtb3ZlRGlzdGFuY2UgPSBjZW50ZXIgLSBwb3NpdGlvbjtcbiAgICAgICAgc2V0R3VpZGUgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhlbmREaXN0YW5jZSAtIHBvc2l0aW9uKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICAgIHRoaXNbYXhpc10gPSBwb3NpdGlvbiAtIHJlY3Rbc2lkZV07IC8vIG1vdmUgc25hcCBiZWhhdmlvciAgICAgXG4gICAgICAgIHRhcmdldFBvc2l0aW9uID0gcG9zaXRpb24gLSByZWN0W3NpZGVdO1xuICAgICAgICBtb3ZlRGlzdGFuY2UgPSBlbmREaXN0YW5jZSAtIHBvc2l0aW9uO1xuICAgICAgICBzZXRHdWlkZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRHdWlkZSkge1xuICAgICAgICB0YXJnZXRQb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uIC0gKHJlY3RbYXhpc10gLSBwYXJlbnRSZWN0W2F4aXNdKTtcbiAgICAgICAgY29uc29sZS5sb2coJ3N1Y2Nlc3MgYXhpcyBwb3NpdGlvbiBtb3ZlRGlzdGFuY2UnLCBheGlzLCBwb3NpdGlvbiwgbW92ZURpc3RhbmNlKVxuICAgICAgICByZXR1cm4geyBheGlzLCBwb3NpdGlvbiwgbW92ZURpc3RhbmNlLCBzbmFwVHJlc2hob2xkLCB0YXJnZXRQb3NpdGlvbiB9XG4gICAgICAgIC8vIHRoaXMucGFyZW50LnJlbmRlckd1aWRlKGF4aXMsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZXhjbHVkZUJveGZvcm1FZGdlcyhyZWN0KSB7XG4gICAgcmVtb3ZlRW50cnkodGhpcy5lZGdlcy54LCByZWN0LngpXG4gICAgcmVtb3ZlRW50cnkodGhpcy5lZGdlcy54LCByZWN0LnggKyBNYXRoLnJvdW5kKHJlY3Qud2lkdGggLyAyKSlcbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLngsIHJlY3QueCArIHJlY3Qud2lkdGgpXG5cbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLnksIHJlY3QueSlcbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLnksIHJlY3QueSArIE1hdGgucm91bmQocmVjdC5oZWlnaHQgLyAyKSlcbiAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KVxuICB9XG4gIHNob3dBbGxHdWlkZXMoKSB7XG5cbiAgfVxuICByZW1vdmVHdWlkZXMoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBheGlzOiBbXVxuICAgIH0pXG4gIH1cblxuICBnZXRJbnRlcmVzdFBvaW50cyhib3gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogW2JveC54LCBib3gueCArIE1hdGgucm91bmQoYm94LndpZHRoIC8gMiksIGJveC5yaWdodF0sXG4gICAgICB5OiBbYm94LnksIGJveC55ICsgTWF0aC5yb3VuZChib3guaGVpZ2h0IC8gMiksIGJveC5ib3R0b21dXG4gICAgfTtcbiAgfVxuICByZXNldFN0YXRpY0d1aWRlcygpIHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIHRoaXMuc3RhdGljR3VpZGVzID0ge1xuICAgICAgeDogWzAsIE1hdGgucm91bmQoY2xpZW50UmVjdC53aWR0aCAvIDIpLCBjbGllbnRSZWN0LndpZHRoXSxcbiAgICAgIHk6IFswLCBNYXRoLnJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0IC8gMiksIGNsaWVudFJlY3QuaGVpZ2h0XVxuICAgIH07XG4gIH1cblxuICByZXNldEVkZ2VzKCkge1xuICAgIC8vIC5zbGljZSgpIHRvIG9ubHkgY29weSB0aGVtIC0gb3RoZXJ3aXNlIGEgcmVmZXJlbmNlIHdvdWxkIGdldCBjcmVhdGVkXG4gICAgdGhpcy5lZGdlcyA9IHtcbiAgICAgIHg6IHRoaXMuc3RhdGljR3VpZGVzLnguc2xpY2UoKSxcbiAgICAgIHk6IHRoaXMuc3RhdGljR3VpZGVzLnkuc2xpY2UoKVxuICAgIH07XG4gIH1cblxuICBnZXQgYm94ZXMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yZWFjdC1kcmFnZ2FibGUnKVxuICB9XG4gIGdldCBjbGllbnRSZWN0KCkge1xuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgcmV0dXJuIHRoaXNOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgcmVuZGVyR3VpZGUoeyBheGlzLCBwb3NpdGlvbiwgYWRkaXRpb25hbENsYXNzIH0pIHtcbiAgICBsZXQgY2xhc3NOYW1lID0gJ2d1aWRlIGF4aXMtJyArIGF4aXM7XG4gICAgaWYgKGFkZGl0aW9uYWxDbGFzcykgY2xhc3NOYW1lICs9IFwiIFwiICsgYWRkaXRpb25hbENsYXNzO1xuXG4gICAgY29uc3QgX3N0eWxlcyA9IHt9XG4gICAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgICAgX3N0eWxlcy5sZWZ0ID0gcG9zaXRpb24gKyAncHgnO1xuICAgIH0gZWxzZSB7XG4gICAgICBfc3R5bGVzLnRvcCA9IHBvc2l0aW9uICsgJ3B4JztcbiAgICB9XG4gICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17X3N0eWxlc30gLz4pXG4gIH1cbiAgcmVuZGVyQXhpcygpIHtcbiAgICBjb25zdCB7IGF4aXMgfSA9IHRoaXMuc3RhdGVcblxuICAgIGlmIChheGlzICYmIGF4aXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gYXhpcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyR3VpZGUoaXRlbSlcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgc2hvd0F4aXNYLCBzaG93QXhpc1kgfSA9IHRoaXMuc3RhdGU7XG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKDxkaXYgey4uLnRoaXMucHJvcHN9PlxuICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICB7dGhpcy5yZW5kZXJBeGlzKCl9XG4gICAgPC9kaXY+KVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwic291cmNlUm9vdCI6IiJ9