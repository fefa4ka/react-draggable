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
  onKeyDown: PropTypes.func
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
  focused: boolean
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
  keyMoveShiftStepLength: number,
  degree: number,
  onMoveSnap: PropTypes.func
};*/

var Draggable = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable(props /*: DraggableProps*/) {
    _classCallCheck(this, Draggable);

    var _this = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this, props));

    _this.autoStepTimer = null;
    _this.stepLength = 1;

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
            _x -= _this.stepLength;
            break;
          // 上
          case 38:
            _y -= _this.stepLength;
            break;
          // 右
          case 39:
            _x += _this.stepLength;
            break;
          // 下
          case 40:
            _y += _this.stepLength;
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
        if (e.keyCode === 16) {
          _this.stepLength = 1;
        }
        // this.onKeyMove(e)
        _this.stopMove();
      }

      _this.props.onKeyUp(e);
    };

    _this.onKeyDown = function (e) {
      if (_this.props.keyMoveEnabled && !_this.props.disabled) {
        if (e.keyCode === 16) {
          _this.stepLength = _this.props.keyMoveShiftStepLength;
        }
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
          (0, _log2.default)('this.state', _this.state);
        });
      }

      if (yDistance && Math.abs(yDistance) <= snapTreshhold) {
        _this.setState({ y: _this.state.y + yDistance }, function () {
          _this.props.onMoveSnap(_extends({}, _this.state));
          (0, _log2.default)('this.state', _this.state);
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
  keyMoveSpeed: _propTypes2.default.number,
  keyMoveShiftStepLength: _propTypes2.default.number
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
  keyMoveSpeed: 250,
  keyMoveShiftStepLength: 10
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

    _this.refresh = function () {
      _this.resetStaticGuides();

      _this.resetAll();
    };

    _this.resetAll = function () {
      _this.resetEdges();
      // this.distances = new Object();
      var boxes = _this.boxes;
      var parentRect = _this.clientRect;
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

              var interestPoints = _this.getInterestPoints({
                x: x - parentRect.x,
                y: y - parentRect.y,
                width: width,
                height: height,
                right: x - parentRect.x + width,
                bottom: y - parentRect.y + height
              });
              _this.edges.x.push.apply(_this.edges.x, interestPoints.x);
              _this.edges.y.push.apply(_this.edges.y, interestPoints.y);

              var guide = box.getAttribute('data-guide');
              if (!guide) {
                box.setAttribute('data-guide', true);

                (0, _domFns.addEvent)(box, eventsFor.mouse.start, function (e) {
                  _this.startToDrag(e, box);
                });
              }
            })();
          }
        }
      }

      _this.showAllGuides();
    };

    _this.startToDrag = function (event, box) {
      // event.stopPropagation();
      var parentRect = _this.clientRect;
      var rect = box.getBoundingClientRect();
      var _startX = rect.x - parentRect.x;
      var _startY = rect.y - parentRect.y;
      _this.mouseOffsetX = event.pageX - rect.left;
      _this.mouseOffsetY = event.pageY - rect.top;
      // console.log('box startToDrag getBoundingClientRect', rect, this.mouseOffsetX)
      // console.log('distance - position', event.pageX, this.mouseOffsetX);

      _this.excludeBoxformEdges({
        x: _startX,
        y: _startY,
        width: rect.width,
        height: rect.height
      });
      // this.excludeBoxFromDistances();
      _this.showAllGuides();

      _this.drag(event);

      (0, _domFns.addEvent)(box, eventsFor.mouse.move, _this.drag);
      (0, _domFns.addEvent)(box, eventsFor.mouse.stop, _this.stopToDrag);
    };

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
      _this.resetAll();
      _this.removeGuides();
      (0, _domFns.removeEvent)(box, eventsFor.mouse.move, _this.drag);
      (0, _domFns.removeEvent)(box, eventsFor.mouse.stop, _this.stopToDrag);
    };

    _this.snapToGuides = function (_ref) {
      var box = _ref.box,
          parentRect = _ref.parentRect;

      var rect = box.getBoundingClientRect();

      _this.removeGuides();

      var axis = [];

      var xAxis = _this.snap({
        parentRect: parentRect,
        rect: rect,
        axis: 'x'
      });

      if (xAxis) {
        axis.push(xAxis);
      }

      var yAxis = _this.snap({
        parentRect: parentRect,
        rect: rect,
        axis: 'y'
      });

      if (yAxis) {
        axis.push(yAxis);
      }

      if (axis.length) {
        _this.setState({ axis: axis }, function () {
          axis.forEach(function (item) {
            // this.props.onSnaping(item)
          });
        });
      }

      _this.props.onSnaping({
        xDistance: _this.x - (rect.x - parentRect.x),
        yDistance: _this.y - (rect.y - parentRect.y),
        snapTreshhold: _this.state.snapTreshhold
      });
    };

    _this.snap = function (_ref2) {
      var parentRect = _ref2.parentRect,
          rect = _ref2.rect,
          axis = _ref2.axis;
      var snapTreshhold = _this.state.snapTreshhold;

      var side = axis === 'x' ? 'width' : 'height';
      var start = axis === 'x' ? 'left' : 'top';
      var end = axis === 'x' ? 'right' : 'bottom';
      var edges = _this.edges[axis];

      for (var i = 0; i < edges.length; i++) {
        var position = edges[i];
        var distance = _this[axis];
        var halfSideLength = Math.abs(rect[side] / 2);
        var center = distance + halfSideLength;
        var endDistance = distance + rect[side];
        var setGuide = false;

        if (Math.abs(distance - position) <= snapTreshhold) {
          _this[axis] = position;
          setGuide = true;
        } else if (Math.abs(center - position) <= snapTreshhold) {
          _this[axis] = position - halfSideLength; // move snap behavior 
          setGuide = true;
        } else if (Math.abs(endDistance - position) <= snapTreshhold) {
          _this[axis] = position - rect[side]; // move snap behavior     
          setGuide = true;
        }

        if (setGuide) {
          return { axis: axis, position: position };
        }
      }
    };

    _this.excludeBoxformEdges = function (rect) {
      if (_this.edges) {
        if (_this.edges.x) {
          removeEntry(_this.edges.x, rect.x);
          removeEntry(_this.edges.x, rect.x + Math.round(rect.width / 2));
          removeEntry(_this.edges.x, rect.x + rect.width);
        }

        if (_this.edges.y) {
          removeEntry(_this.edges.y, rect.y);
          removeEntry(_this.edges.y, rect.y + Math.round(rect.height / 2));
          removeEntry(_this.edges.y, rect.y + rect.height);
        }
      }
    };

    _this.showAllGuides = function () {};

    _this.removeGuides = function () {
      _this.setState({
        axis: []
      });
    };

    _this.getInterestPoints = function (box) {
      return {
        x: [box.x, box.x + Math.round(box.width / 2), box.right],
        y: [box.y, box.y + Math.round(box.height / 2), box.bottom]
      };
    };

    _this.resetStaticGuides = function () {
      var clientRect = _this.clientRect;
      _this.staticGuides = {
        x: [0, Math.round(clientRect.width / 2), clientRect.width],
        y: [0, Math.round(clientRect.height / 2), clientRect.height]
      };
    };

    _this.resetEdges = function () {
      // .slice() to only copy them - otherwise a reference would get created
      _this.edges = {
        x: _this.staticGuides.x.slice(),
        y: _this.staticGuides.y.slice()
      };
    };

    _this.renderGuide = function () {
      var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var index = arguments[1];
      var axis = item.axis,
          position = item.position,
          additionalClass = item.additionalClass;

      var className = 'guide axis-' + axis;
      if (additionalClass) className += " " + additionalClass;

      var _styles = {};
      if (axis === 'x') {
        _styles.left = position + 'px';
      } else {
        _styles.top = position + 'px';
      }
      return _react2.default.createElement('div', { key: index, className: className, style: _styles });
    };

    _this.renderAxis = function () {
      var axis = _this.state.axis;


      if (axis && axis.length) {
        return axis.map(function (item, index) {
          if (item) {
            return _this.renderGuide(item, index);
          }
        });
      }

      return null;
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
      this.refresh();
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
        this.props.wrapperProps,
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
  wrapperProps: _propTypes2.default.object,
  snapTreshhold: _propTypes2.default.number,
  onSnaping: _propTypes2.default.func,
  selector: _propTypes2.default.string
};
DraggableAlignGuide.defaultProps = {
  wrapperProps: {},
  snapTreshhold: 5,
  selector: '.react-draggable',
  onSnaping: function onSnaping() {}
};
exports.default = DraggableAlignGuide;

/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIi4uL3dlYnBhY2svYm9vdHN0cmFwIDM3ZDVhNDllNmFiYzJhN2QwNmY4IiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0LWRvbVwiLFwiY29tbW9uanMyXCI6XCJyZWFjdC1kb21cIixcImFtZFwiOlwicmVhY3QtZG9tXCIsXCJyb290XCI6XCJSZWFjdERPTVwifSIsIi4uLy4vbGliL3V0aWxzL2RvbUZucy5qcyIsIi4uLy4vbGliL3V0aWxzL3NoaW1zLmpzIiwiLi4vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifSIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eUZ1bmN0aW9uLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzIiwiLi4vLi9saWIvdXRpbHMvcG9zaXRpb25GbnMuanMiLCIuLi8uL2xpYi9EcmFnZ2FibGVDb3JlLmpzIiwiLi4vLi9saWIvdXRpbHMvbG9nLmpzIiwiLi4vLi9pbmRleC5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZS5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanMiLCIuLi8uL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zLmpzIiwiLi4vLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uLy4vbGliL3V0aWxzL2dldFByZWZpeC5qcyIsIi4uLy4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIi4uLy4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwibmFtZXMiOlsibWF0Y2hlc1NlbGVjdG9yIiwibWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvIiwiYWRkRXZlbnQiLCJyZW1vdmVFdmVudCIsIm91dGVySGVpZ2h0Iiwib3V0ZXJXaWR0aCIsImlubmVySGVpZ2h0IiwiaW5uZXJXaWR0aCIsIm9mZnNldFhZRnJvbVBhcmVudCIsImNyZWF0ZUNTU1RyYW5zZm9ybSIsImNyZWF0ZVNWR1RyYW5zZm9ybSIsImdldFRvdWNoIiwiZ2V0VG91Y2hJZGVudGlmaWVyIiwiYWRkVXNlclNlbGVjdFN0eWxlcyIsInJlbW92ZVVzZXJTZWxlY3RTdHlsZXMiLCJzdHlsZUhhY2tzIiwiYWRkQ2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3NOYW1lIiwibWF0Y2hlc1NlbGVjdG9yRnVuYyIsImVsIiwic2VsZWN0b3IiLCJtZXRob2QiLCJjYWxsIiwiYmFzZU5vZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsImV2ZW50IiwiaGFuZGxlciIsImF0dGFjaEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRldGFjaEV2ZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhlaWdodCIsImNsaWVudEhlaWdodCIsImNvbXB1dGVkU3R5bGUiLCJvd25lckRvY3VtZW50IiwiZGVmYXVsdFZpZXciLCJnZXRDb21wdXRlZFN0eWxlIiwiYm9yZGVyVG9wV2lkdGgiLCJib3JkZXJCb3R0b21XaWR0aCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJib3JkZXJMZWZ0V2lkdGgiLCJib3JkZXJSaWdodFdpZHRoIiwicGFkZGluZ1RvcCIsInBhZGRpbmdCb3R0b20iLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdSaWdodCIsImV2dCIsIm9mZnNldFBhcmVudCIsImlzQm9keSIsImJvZHkiLCJvZmZzZXRQYXJlbnRSZWN0IiwibGVmdCIsInRvcCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwic2Nyb2xsTGVmdCIsInkiLCJjbGllbnRZIiwic2Nyb2xsVG9wIiwiZGVncmVlIiwiY3NzU3R5bGUiLCJlIiwiaWRlbnRpZmllciIsInRhcmdldFRvdWNoZXMiLCJ0IiwiY2hhbmdlZFRvdWNoZXMiLCJkb2MiLCJzdHlsZUVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImlkIiwiaW5uZXJIVE1MIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJhcHBlbmRDaGlsZCIsIndpbmRvdyIsImdldFNlbGVjdGlvbiIsInJlbW92ZUFsbFJhbmdlcyIsImNoaWxkU3R5bGUiLCJ0b3VjaEFjdGlvbiIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsIm1hdGNoIiwiUmVnRXhwIiwicmVtb3ZlIiwicmVwbGFjZSIsImZpbmRJbkFycmF5IiwiaXNGdW5jdGlvbiIsImlzTnVtIiwiaW50IiwiZG9udFNldE1lIiwiYXJyYXkiLCJjYWxsYmFjayIsImkiLCJsZW5ndGgiLCJhcHBseSIsImZ1bmMiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsIm51bSIsImlzTmFOIiwiYSIsInBhcnNlSW50IiwicHJvcHMiLCJwcm9wTmFtZSIsImNvbXBvbmVudE5hbWUiLCJFcnJvciIsImdldEJvdW5kUG9zaXRpb24iLCJzbmFwVG9HcmlkIiwiY2FuRHJhZ1giLCJjYW5EcmFnWSIsImdldENvbnRyb2xQb3NpdGlvbiIsImNyZWF0ZUNvcmVEYXRhIiwiY3JlYXRlRHJhZ2dhYmxlRGF0YSIsImRyYWdnYWJsZSIsImJvdW5kcyIsImNsb25lQm91bmRzIiwiZmluZERPTU5vZGUiLCJvd25lcldpbmRvdyIsImJvdW5kTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJIVE1MRWxlbWVudCIsIm5vZGVTdHlsZSIsImJvdW5kTm9kZVN0eWxlIiwib2Zmc2V0TGVmdCIsIm1hcmdpbkxlZnQiLCJvZmZzZXRUb3AiLCJtYXJnaW5Ub3AiLCJyaWdodCIsIm1hcmdpblJpZ2h0IiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwiTWF0aCIsIm1pbiIsIm1heCIsImdyaWQiLCJwZW5kaW5nWCIsInBlbmRpbmdZIiwicm91bmQiLCJheGlzIiwidG91Y2hJZGVudGlmaWVyIiwiZHJhZ2dhYmxlQ29yZSIsInRvdWNoT2JqIiwic3RhdGUiLCJpc1N0YXJ0IiwibGFzdFgiLCJkZWx0YVgiLCJkZWx0YVkiLCJsYXN0WSIsImNvcmVEYXRhIiwiZXZlbnRzRm9yIiwidG91Y2giLCJzdGFydCIsIm1vdmUiLCJzdG9wIiwibW91c2UiLCJkcmFnRXZlbnRGb3IiLCJEcmFnZ2FibGVDb3JlIiwiZHJhZ2dpbmciLCJOYU4iLCJoYW5kbGVEcmFnU3RhcnQiLCJvbk1vdXNlRG93biIsImFsbG93QW55Q2xpY2siLCJidXR0b24iLCJ0aGlzTm9kZSIsImRpc2FibGVkIiwidGFyZ2V0IiwiTm9kZSIsImhhbmRsZSIsImNhbmNlbCIsInNldFN0YXRlIiwicG9zaXRpb24iLCJjb3JlRXZlbnQiLCJvblN0YXJ0Iiwic2hvdWxkVXBkYXRlIiwiZW5hYmxlVXNlclNlbGVjdEhhY2siLCJoYW5kbGVEcmFnIiwiaGFuZGxlRHJhZ1N0b3AiLCJwcmV2ZW50RGVmYXVsdCIsIkFycmF5IiwiaXNBcnJheSIsIm9uRHJhZyIsIk1vdXNlRXZlbnQiLCJlcnIiLCJkb2N1bWVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdE1vdXNlRXZlbnQiLCJvblN0b3AiLCJvbk1vdXNlVXAiLCJvblRvdWNoU3RhcnQiLCJvblRvdWNoRW5kIiwib25LZXlVcCIsIm9uS2V5RG93biIsImNsb25lRWxlbWVudCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkcmVuIiwic3R5bGUiLCJDb21wb25lbnQiLCJkaXNwbGF5TmFtZSIsInByb3BUeXBlcyIsImJvb2wiLCJwcm9jZXNzIiwiYnJvd3NlciIsIm5vZGVUeXBlIiwiYXJyYXlPZiIsIm51bWJlciIsInN0cmluZyIsInRyYW5zZm9ybSIsImRlZmF1bHRQcm9wcyIsImxvZyIsIkRyYWdnYWJsZSIsInJlcXVpcmUiLCJkZWZhdWx0IiwibW9kdWxlIiwiZXhwb3J0cyIsIkRyYWdnYWJsZUFsaWduR3VpZGUiLCJhdXRvU3RlcFRpbWVyIiwic3RlcExlbmd0aCIsIm9uRHJhZ1N0YXJ0Iiwic2hvdWxkU3RhcnQiLCJkcmFnZ2VkIiwidWlEYXRhIiwibmV3U3RhdGUiLCJzbGFja1giLCJzbGFja1kiLCJuZXdTdGF0ZVgiLCJuZXdTdGF0ZVkiLCJvbkRyYWdTdG9wIiwic2hvdWxkU3RvcCIsImNvbnRyb2xsZWQiLCJCb29sZWFuIiwic3RvcE1vdmUiLCJjbGVhclRpbWVvdXQiLCJvbktleU1vdmUiLCJrZXlDb2RlIiwicGVyc2lzdCIsIl94IiwiX3kiLCJzZXRUaW1lb3V0Iiwia2V5TW92ZVNwZWVkIiwia2V5TW92ZUVuYWJsZWQiLCJrZXlNb3ZlU2hpZnRTdGVwTGVuZ3RoIiwibW92ZVNuYXBpbmciLCJzbmFwIiwieERpc3RhbmNlIiwieURpc3RhbmNlIiwic25hcFRyZXNoaG9sZCIsImFicyIsIm9uTW92ZVNuYXAiLCJkZWZhdWx0UG9zaXRpb24iLCJpc0VsZW1lbnRTVkciLCJmb2N1c2VkIiwiY29uc29sZSIsIndhcm4iLCJTVkdFbGVtZW50IiwibmV4dFByb3BzIiwic3ZnVHJhbnNmb3JtIiwidHJhbnNmb3JtT3B0cyIsInBvc2l0aW9uUm90YXRlIiwiZGVmYXVsdENsYXNzTmFtZSIsImRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZyIsImRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkIiwiZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQiLCJ0YWJJbmRleCIsIk51bWJlciIsIm9uZU9mIiwib25lT2ZUeXBlIiwic2hhcGUiLCJnZXRQcmVmaXgiLCJicm93c2VyUHJlZml4VG9LZXkiLCJicm93c2VyUHJlZml4VG9TdHlsZSIsInByZWZpeGVzIiwicHJvcCIsImRvY3VtZW50RWxlbWVudCIsInByZWZpeCIsImtlYmFiVG9UaXRsZUNhc2UiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsIm91dCIsInNob3VsZENhcGl0YWxpemUiLCJ0b1VwcGVyQ2FzZSIsImZyb20iLCJ0byIsInJlc3QiLCJzbGljZSIsInB1c2giLCJyZW1vdmVFbnRyeSIsImVudHJ5IiwiaW5kZXgiLCJpbmRleE9mIiwiZ2V0VGFyZ2V0IiwiY3VycmVudFRhcmdldCIsInNyY0VsZW1lbnQiLCJlZGdlcyIsInN0YXRpY0d1aWRlcyIsIm1vdXNlT2Zmc2V0WCIsIm1vdXNlT2Zmc2V0WSIsInJlZnJlc2giLCJyZXNldFN0YXRpY0d1aWRlcyIsInJlc2V0QWxsIiwicmVzZXRFZGdlcyIsImJveGVzIiwicGFyZW50UmVjdCIsImNsaWVudFJlY3QiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImJveCIsImludGVyZXN0UG9pbnRzIiwiZ2V0SW50ZXJlc3RQb2ludHMiLCJndWlkZSIsImdldEF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsInN0YXJ0VG9EcmFnIiwic2hvd0FsbEd1aWRlcyIsInJlY3QiLCJfc3RhcnRYIiwiX3N0YXJ0WSIsInBhZ2VYIiwicGFnZVkiLCJleGNsdWRlQm94Zm9ybUVkZ2VzIiwiZHJhZyIsInN0b3BUb0RyYWciLCJzbmFwVG9HdWlkZXMiLCJsb2NrZWRBeGlzIiwicmVtb3ZlR3VpZGVzIiwieEF4aXMiLCJ5QXhpcyIsImZvckVhY2giLCJpdGVtIiwib25TbmFwaW5nIiwic2lkZSIsImVuZCIsImRpc3RhbmNlIiwiaGFsZlNpZGVMZW5ndGgiLCJjZW50ZXIiLCJlbmREaXN0YW5jZSIsInNldEd1aWRlIiwicmVuZGVyR3VpZGUiLCJhZGRpdGlvbmFsQ2xhc3MiLCJfc3R5bGVzIiwicmVuZGVyQXhpcyIsIm1hcCIsIm1pbmltdW1EaXN0YW5jZSIsIm9mZnNldCIsInNob3dBeGlzWCIsInNob3dBeGlzWSIsIndyYXBwZXJQcm9wcyIsInF1ZXJ5U2VsZWN0b3JBbGwi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QUFDQTtBQUNBO0FBQ0EsMENBQTBDOztBQUUxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixLQUFLO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNEJBQTRCO0FBQzVCLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDJCQUEyQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsZ0NBQWdDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCLFFBQVE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLHNCQUFzQjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0Isb0JBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdHQUFnRztBQUNoRztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0dBQWdHO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0JBQWdCOztBQUVoQjtBQUNBOztBQUVBLGlCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQUE7QUFDSCxFQUFFO0FBQ0Y7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7UUM3Q2UwRCxTLEdBQUFBLFM7UUFpQkFDLGtCLEdBQUFBLGtCO1FBSUFDLG9CLEdBQUFBLG9CO0FBdEJoQixJQUFNQyxXQUFXLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsR0FBbEIsRUFBdUIsSUFBdkIsQ0FBakI7QUFDTyxTQUFTSCxTQUFULGdCQUFxRDtBQUFBLE1BQWxDSSxJQUFrQyxvRkFBckIsV0FBcUI7O0FBQzFEO0FBQ0E7QUFDQTtBQUNBLE1BQUksT0FBT3hNLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsT0FBT0EsT0FBTytHLFFBQWQsS0FBMkIsV0FBaEUsRUFBNkUsT0FBTyxFQUFQOztBQUU3RSxNQUFNYSxRQUFRNUgsT0FBTytHLFFBQVAsQ0FBZ0IwRixlQUFoQixDQUFnQzdFLEtBQTlDOztBQUVBLE1BQUk0RSxRQUFRNUUsS0FBWixFQUFtQixPQUFPLEVBQVA7O0FBRW5CLE9BQUssSUFBSXpHLElBQUksQ0FBYixFQUFnQkEsSUFBSW9MLFNBQVNuTCxNQUE3QixFQUFxQ0QsR0FBckMsRUFBMEM7QUFDeEMsUUFBSWtMLG1CQUFtQkcsSUFBbkIsRUFBeUJELFNBQVNwTCxDQUFULENBQXpCLEtBQXlDeUcsS0FBN0MsRUFBb0QsT0FBTzJFLFNBQVNwTCxDQUFULENBQVA7QUFDckQ7O0FBRUQsU0FBTyxFQUFQO0FBQ0Q7O0FBRU0sU0FBU2tMLGtCQUFULENBQTRCRyxJQUE1QixlQUEwQ0UsTUFBMUMsNEJBQWtFO0FBQ3ZFLFNBQU9BLGNBQVlBLE1BQVosR0FBcUJDLGlCQUFpQkgsSUFBakIsQ0FBckIsR0FBZ0RBLElBQXZEO0FBQ0Q7O0FBRU0sU0FBU0Ysb0JBQVQsQ0FBOEJFLElBQTlCLGVBQTRDRSxNQUE1Qyw0QkFBb0U7QUFDekUsU0FBT0EsZUFBYUEsT0FBT0UsV0FBUCxFQUFiLFNBQXFDSixJQUFyQyxHQUE4Q0EsSUFBckQ7QUFDRDs7QUFFRCxTQUFTRyxnQkFBVCxDQUEwQkUsR0FBMUIsNEJBQStDO0FBQzdDLE1BQUlDLE1BQU0sRUFBVjtBQUNBLE1BQUlDLG1CQUFtQixJQUF2QjtBQUNBLE9BQUssSUFBSTVMLElBQUksQ0FBYixFQUFnQkEsSUFBSTBMLElBQUl6TCxNQUF4QixFQUFnQ0QsR0FBaEMsRUFBcUM7QUFDbkMsUUFBSTRMLGdCQUFKLEVBQXNCO0FBQ3BCRCxhQUFPRCxJQUFJMUwsQ0FBSixFQUFPNkwsV0FBUCxFQUFQO0FBQ0FELHlCQUFtQixLQUFuQjtBQUNELEtBSEQsTUFHTyxJQUFJRixJQUFJMUwsQ0FBSixNQUFXLEdBQWYsRUFBb0I7QUFDekI0TCx5QkFBbUIsSUFBbkI7QUFDRCxLQUZNLE1BRUE7QUFDTEQsYUFBT0QsSUFBSTFMLENBQUosQ0FBUDtBQUNEO0FBQ0Y7QUFDRCxTQUFPMkwsR0FBUDtBQUNEOztBQUVEO0FBQ0E7QUFDQTtrQkFDZVYsVzs7Ozs7O0FDOUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2THRDOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTXZILFlBQVk7QUFDaEJDLFNBQU87QUFDTEMsV0FBTyxZQURGO0FB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Y3QtZHJhZ2dhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3QtZG9tXCIpLCByZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3QtZG9tXCIsIFwicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdC1kb21cIiksIHJlcXVpcmUoXCJyZWFjdFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3REcmFnZ2FibGVcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdERPTVwiXSwgcm9vdFtcIlJlYWN0XCJdKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zX18pIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDM3ZDVhNDllNmFiYzJhN2QwNmY4IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzBfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3QtZG9tXCIsXCJjb21tb25qczJcIjpcInJlYWN0LWRvbVwiLFwiYW1kXCI6XCJyZWFjdC1kb21cIixcInJvb3RcIjpcIlJlYWN0RE9NXCJ9XG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQgeyBmaW5kSW5BcnJheSwgaXNGdW5jdGlvbiwgaW50IH0gZnJvbSAnLi9zaGltcyc7XG5pbXBvcnQgYnJvd3NlclByZWZpeCwgeyBicm93c2VyUHJlZml4VG9LZXkgfSBmcm9tICcuL2dldFByZWZpeCc7XG5cbmltcG9ydCB0eXBlIHtDb250cm9sUG9zaXRpb24sIE1vdXNlVG91Y2hFdmVudCB9IGZyb20gJy4vdHlwZXMnO1xuXG5sZXQgbWF0Y2hlc1NlbGVjdG9yRnVuYyA9ICcnO1xuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvcihlbDogTm9kZSwgc2VsZWN0b3I6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoIW1hdGNoZXNTZWxlY3RvckZ1bmMpIHtcbiAgICBtYXRjaGVzU2VsZWN0b3JGdW5jID0gZmluZEluQXJyYXkoW1xuICAgICAgJ21hdGNoZXMnLFxuICAgICAgJ3dlYmtpdE1hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnbW96TWF0Y2hlc1NlbGVjdG9yJyxcbiAgICAgICdtc01hdGNoZXNTZWxlY3RvcicsXG4gICAgICAnb01hdGNoZXNTZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICAgIHJldHVybiBpc0Z1bmN0aW9uKGVsW21ldGhvZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gJEZsb3dJZ25vcmU6IERvZXNuJ3QgdGhpbmsgZWxlbWVudHMgYXJlIGluZGV4YWJsZVxuICByZXR1cm4gZWxbbWF0Y2hlc1NlbGVjdG9yRnVuY10uY2FsbChlbCwgc2VsZWN0b3IpO1xufVxuXG4vLyBXb3JrcyB1cCB0aGUgdHJlZSB0byB0aGUgZHJhZ2dhYmxlIGl0c2VsZiBhdHRlbXB0aW5nIHRvIG1hdGNoIHNlbGVjdG9yLlxuZXhwb3J0IGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvckFuZFBhcmVudHNUbyhlbDogTm9kZSwgc2VsZWN0b3I6IHN0cmluZywgYmFzZU5vZGU6IE5vZGUpOiBib29sZWFuIHtcbiAgbGV0IG5vZGUgPSBlbDtcbiAgZG8ge1xuICAgIGlmIChtYXRjaGVzU2VsZWN0b3Iobm9kZSwgc2VsZWN0b3IpKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAobm9kZSA9PT0gYmFzZU5vZGUpIHJldHVybiBmYWxzZTtcbiAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICB9IHdoaWxlIChub2RlKTtcblxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRFdmVudChlbDogP05vZGUsIGV2ZW50OiBzdHJpbmcsIGhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XG4gIGlmIChlbC5hdHRhY2hFdmVudCkge1xuICAgIGVsLmF0dGFjaEV2ZW50KCdvbicgKyBldmVudCwgaGFuZGxlcik7XG4gIH0gZWxzZSBpZiAoZWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIC8vICRGbG93SWdub3JlOiBEb2Vzbid0IHRoaW5rIGVsZW1lbnRzIGFyZSBpbmRleGFibGVcbiAgICBlbFsnb24nICsgZXZlbnRdID0gaGFuZGxlcjtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZWw6ID9Ob2RlLCBldmVudDogc3RyaW5nLCBoYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xuICBpZiAoIWVsKSB7IHJldHVybjsgfVxuICBpZiAoZWwuZGV0YWNoRXZlbnQpIHtcbiAgICBlbC5kZXRhY2hFdmVudCgnb24nICsgZXZlbnQsIGhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICAvLyAkRmxvd0lnbm9yZTogRG9lc24ndCB0aGluayBlbGVtZW50cyBhcmUgaW5kZXhhYmxlXG4gICAgZWxbJ29uJyArIGV2ZW50XSA9IG51bGw7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVySGVpZ2h0KG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgLy8gVGhpcyBpcyBkZWxpYmVyYXRlbHkgZXhjbHVkaW5nIG1hcmdpbiBmb3Igb3VyIGNhbGN1bGF0aW9ucywgc2luY2Ugd2UgYXJlIHVzaW5nXG4gIC8vIG9mZnNldFRvcCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclRvcFdpZHRoKTtcbiAgaGVpZ2h0ICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckJvdHRvbVdpZHRoKTtcbiAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG91dGVyV2lkdGgobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAvLyBUaGlzIGlzIGRlbGliZXJhdGVseSBleGNsdWRpbmcgbWFyZ2luIGZvciBvdXIgY2FsY3VsYXRpb25zLCBzaW5jZSB3ZSBhcmUgdXNpbmdcbiAgLy8gb2Zmc2V0TGVmdCB3aGljaCBpcyBpbmNsdWRpbmcgbWFyZ2luLiBTZWUgZ2V0Qm91bmRQb3NpdGlvblxuICBsZXQgd2lkdGggPSBub2RlLmNsaWVudFdpZHRoO1xuICBjb25zdCBjb21wdXRlZFN0eWxlID0gbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlckxlZnRXaWR0aCk7XG4gIHdpZHRoICs9IGludChjb21wdXRlZFN0eWxlLmJvcmRlclJpZ2h0V2lkdGgpO1xuICByZXR1cm4gd2lkdGg7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5uZXJIZWlnaHQobm9kZTogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICBsZXQgaGVpZ2h0ID0gbm9kZS5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IGNvbXB1dGVkU3R5bGUgPSBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShub2RlKTtcbiAgaGVpZ2h0IC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdUb3ApO1xuICBoZWlnaHQgLT0gaW50KGNvbXB1dGVkU3R5bGUucGFkZGluZ0JvdHRvbSk7XG4gIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbm5lcldpZHRoKG5vZGU6IEhUTUxFbGVtZW50KTogbnVtYmVyIHtcbiAgbGV0IHdpZHRoID0gbm9kZS5jbGllbnRXaWR0aDtcbiAgY29uc3QgY29tcHV0ZWRTdHlsZSA9IG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpO1xuICB3aWR0aCAtPSBpbnQoY29tcHV0ZWRTdHlsZS5wYWRkaW5nTGVmdCk7XG4gIHdpZHRoIC09IGludChjb21wdXRlZFN0eWxlLnBhZGRpbmdSaWdodCk7XG4gIHJldHVybiB3aWR0aDtcbn1cblxuLy8gR2V0IGZyb20gb2Zmc2V0UGFyZW50XG5leHBvcnQgZnVuY3Rpb24gb2Zmc2V0WFlGcm9tUGFyZW50KGV2dDogeyBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlciB9LCBvZmZzZXRQYXJlbnQ6IEhUTUxFbGVtZW50KTogQ29udHJvbFBvc2l0aW9uIHtcbiAgY29uc3QgaXNCb2R5ID0gb2Zmc2V0UGFyZW50ID09PSBvZmZzZXRQYXJlbnQub3duZXJEb2N1bWVudC5ib2R5O1xuICBjb25zdCBvZmZzZXRQYXJlbnRSZWN0ID0gaXNCb2R5ID8geyBsZWZ0OiAwLCB0b3A6IDAgfSA6IG9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICBjb25zdCB4ID0gZXZ0LmNsaWVudFggKyBvZmZzZXRQYXJlbnQuc2Nyb2xsTGVmdCAtIG9mZnNldFBhcmVudFJlY3QubGVmdDtcbiAgY29uc3QgeSA9IGV2dC5jbGllbnRZICsgb2Zmc2V0UGFyZW50LnNjcm9sbFRvcCAtIG9mZnNldFBhcmVudFJlY3QudG9wO1xuXG4gIHJldHVybiB7IHgsIHkgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNTU1RyYW5zZm9ybSh7IHgsIHksIGRlZ3JlZSB9OiB7IHg6IG51bWJlciwgeTogbnVtYmVyLCBkZWdyZWU6IG51bWJlciB9KTogT2JqZWN0IHtcbiAgLy8gUmVwbGFjZSB1bml0bGVzcyBpdGVtcyB3aXRoIHB4XG4gIGxldCBjc3NTdHlsZSA9ICcnO1xuICBpZiAoZGVncmVlKSB7XG4gICAgY3NzU3R5bGUgPSAndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCcgKyB5ICsgJ3B4KSByb3RhdGUoJyArIGRlZ3JlZSArICdkZWcpJztcblxuICB9IGVsc2Uge1xuICAgIGNzc1N0eWxlID0gJ3RyYW5zbGF0ZSgnICsgeCArICdweCwnICsgeSArICdweCknO1xuICB9XG4gIHJldHVybiB7IFticm93c2VyUHJlZml4VG9LZXkoJ3RyYW5zZm9ybScsIGJyb3dzZXJQcmVmaXgpXTogY3NzU3R5bGUgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNWR1RyYW5zZm9ybSh7IHgsIHkgfTogeyB4OiBudW1iZXIsIHk6IG51bWJlciB9KTogc3RyaW5nIHtcbiAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHggKyAnLCcgKyB5ICsgJyknO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VG91Y2goZTogTW91c2VUb3VjaEV2ZW50LCBpZGVudGlmaWVyOiBudW1iZXIpOiA/eyBjbGllbnRYOiBudW1iZXIsIGNsaWVudFk6IG51bWJlciB9IHtcbiAgcmV0dXJuIChlLnRhcmdldFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS50YXJnZXRUb3VjaGVzLCB0ID0+IGlkZW50aWZpZXIgPT09IHQuaWRlbnRpZmllcikpIHx8XG4gICAgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZmluZEluQXJyYXkoZS5jaGFuZ2VkVG91Y2hlcywgdCA9PiBpZGVudGlmaWVyID09PSB0LmlkZW50aWZpZXIpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRvdWNoSWRlbnRpZmllcihlOiBNb3VzZVRvdWNoRXZlbnQpOiA/bnVtYmVyIHtcbiAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXNbMF0pIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgaWYgKGUuY2hhbmdlZFRvdWNoZXMgJiYgZS5jaGFuZ2VkVG91Y2hlc1swXSkgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbn1cblxuLy8gVXNlci1zZWxlY3QgSGFja3M6XG4vL1xuLy8gVXNlZnVsIGZvciBwcmV2ZW50aW5nIGJsdWUgaGlnaGxpZ2h0cyBhbGwgb3ZlciBldmVyeXRoaW5nIHdoZW4gZHJhZ2dpbmcuXG5cbi8vIE5vdGUgd2UncmUgcGFzc2luZyBgZG9jdW1lbnRgIGIvYyB3ZSBjb3VsZCBiZSBpZnJhbWVkXG5leHBvcnQgZnVuY3Rpb24gYWRkVXNlclNlbGVjdFN0eWxlcyhkb2M6IERvY3VtZW50KSB7XG4gIGxldCBzdHlsZUVsID0gZG9jLmdldEVsZW1lbnRCeUlkKCdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnKTtcbiAgaWYgKCFzdHlsZUVsKSB7XG4gICAgc3R5bGVFbCA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIHN0eWxlRWwudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gICAgc3R5bGVFbC5pZCA9ICdyZWFjdC1kcmFnZ2FibGUtc3R5bGUtZWwnO1xuICAgIHN0eWxlRWwuaW5uZXJIVE1MID0gJy5yZWFjdC1kcmFnZ2FibGUtdHJhbnNwYXJlbnQtc2VsZWN0aW9uICo6Oi1tb3otc2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBzdHlsZUVsLmlubmVySFRNTCArPSAnLnJlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24gKjo6c2VsZWN0aW9uIHtiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDt9XFxuJztcbiAgICBkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZUVsKTtcbiAgfVxuICBpZiAoZG9jLmJvZHkpIGFkZENsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZVVzZXJTZWxlY3RTdHlsZXMoZG9jOiBEb2N1bWVudCkge1xuICBpZiAoZG9jLmJvZHkpIHJlbW92ZUNsYXNzTmFtZShkb2MuYm9keSwgJ3JlYWN0LWRyYWdnYWJsZS10cmFuc3BhcmVudC1zZWxlY3Rpb24nKTtcbiAgdHJ5IHtcbiAgICB3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCk7ICAvLyByZW1vdmUgc2VsZWN0aW9uIGNhdXNlZCBieSBzY3JvbGxcbiAgfSBjYXRjaCAoZSkge1xuICAgIC8vIHByb2JhYmx5IElFXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0eWxlSGFja3MoY2hpbGRTdHlsZTogT2JqZWN0ID0ge30pOiBPYmplY3Qge1xuICAvLyBXb3JrYXJvdW5kIElFIHBvaW50ZXIgZXZlbnRzOyBzZWUgIzUxXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9temFicmlza2llL3JlYWN0LWRyYWdnYWJsZS9pc3N1ZXMvNTEjaXNzdWVjb21tZW50LTEwMzQ4ODI3OFxuICByZXR1cm4ge1xuICAgIHRvdWNoQWN0aW9uOiAnbm9uZScsXG4gICAgLi4uY2hpbGRTdHlsZVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQ2xhc3NOYW1lKGVsOiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcpIHtcbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWVsLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKGAoPzpefFxcXFxzKSR7Y2xhc3NOYW1lfSg/IVxcXFxTKWApKSkge1xuICAgICAgZWwuY2xhc3NOYW1lICs9IGAgJHtjbGFzc05hbWV9YDtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNsYXNzTmFtZShlbDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nKSB7XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cChgKD86XnxcXFxccykke2NsYXNzTmFtZX0oPyFcXFxcUylgLCAnZycpLCAnJyk7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi91dGlscy9kb21GbnMuanMiLCIvLyBAZmxvd1xuLy8gQGNyZWRpdHMgaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcm9nb3pobmlrb2ZmL2E0M2NmZWQyN2M0MWU0ZTY4Y2RjXG5leHBvcnQgZnVuY3Rpb24gZmluZEluQXJyYXkoYXJyYXk6IEFycmF5PGFueT4gfCBUb3VjaExpc3QsIGNhbGxiYWNrOiBGdW5jdGlvbik6IGFueSB7XG4gIGZvciAobGV0IGkgPSAwLCBsZW5ndGggPSBhcnJheS5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChjYWxsYmFjay5hcHBseShjYWxsYmFjaywgW2FycmF5W2ldLCBpLCBhcnJheV0pKSByZXR1cm4gYXJyYXlbaV07XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuYzogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJyB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZnVuYykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bShudW06IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIG51bSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKG51bSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnQoYTogc3RyaW5nKTogbnVtYmVyIHtcbiAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRvbnRTZXRNZShwcm9wczogT2JqZWN0LCBwcm9wTmFtZTogc3RyaW5nLCBjb21wb25lbnROYW1lOiBzdHJpbmcpIHtcbiAgaWYgKHByb3BzW3Byb3BOYW1lXSkge1xuICAgIHJldHVybiBuZXcgRXJyb3IoYEludmFsaWQgcHJvcCAke3Byb3BOYW1lfSBwYXNzZWQgdG8gJHtjb21wb25lbnROYW1lfSAtIGRvIG5vdCBzZXQgdGhpcywgc2V0IGl0IG9uIHRoZSBjaGlsZC5gKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL3NoaW1zLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9XG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9ICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmXG4gICAgU3ltYm9sLmZvciAmJlxuICAgIFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSkgfHxcbiAgICAweGVhYzc7XG5cbiAgdmFyIGlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmXG4gICAgICBvYmplY3QgIT09IG51bGwgJiZcbiAgICAgIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xuICB9O1xuXG4gIC8vIEJ5IGV4cGxpY2l0bHkgdXNpbmcgYHByb3AtdHlwZXNgIHlvdSBhcmUgb3B0aW5nIGludG8gbmV3IGRldmVsb3BtZW50IGJlaGF2aW9yLlxuICAvLyBodHRwOi8vZmIubWUvcHJvcC10eXBlcy1pbi1wcm9kXG4gIHZhciB0aHJvd09uRGlyZWN0QWNjZXNzID0gdHJ1ZTtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzJykoaXNWYWxpZEVsZW1lbnQsIHRocm93T25EaXJlY3RBY2Nlc3MpO1xufSBlbHNlIHtcbiAgLy8gQnkgZXhwbGljaXRseSB1c2luZyBgcHJvcC10eXBlc2AgeW91IGFyZSBvcHRpbmcgaW50byBuZXcgcHJvZHVjdGlvbiBiZWhhdmlvci5cbiAgLy8gaHR0cDovL2ZiLm1lL3Byb3AtdHlwZXMtaW4tcHJvZFxuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZmFjdG9yeVdpdGhUaHJvd2luZ1NoaW1zJykoKTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJy4vZW1wdHlGdW5jdGlvbicpO1xuXG4vKipcbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgd2FybmluZyA9IGVtcHR5RnVuY3Rpb247XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbiBwcmludFdhcm5pbmcoZm9ybWF0KSB7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG5cbiAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIC8vIC0tLSBXZWxjb21lIHRvIGRlYnVnZ2luZyBSZWFjdCAtLS1cbiAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcblxuICB3YXJuaW5nID0gZnVuY3Rpb24gd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICB9XG5cbiAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgfVxuXG4gICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgYXJnc1tfa2V5MiAtIDJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9mYmpzL2xpYi93YXJuaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIEBmbG93XG5pbXBvcnQge2lzTnVtLCBpbnR9IGZyb20gJy4vc2hpbXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge2dldFRvdWNoLCBpbm5lcldpZHRoLCBpbm5lckhlaWdodCwgb2Zmc2V0WFlGcm9tUGFyZW50LCBvdXRlcldpZHRoLCBvdXRlckhlaWdodH0gZnJvbSAnLi9kb21GbnMnO1xuXG5pbXBvcnQgdHlwZSBEcmFnZ2FibGUgZnJvbSAnLi4vRHJhZ2dhYmxlJztcbmltcG9ydCB0eXBlIHtCb3VuZHMsIENvbnRyb2xQb3NpdGlvbiwgRHJhZ2dhYmxlRGF0YSwgTW91c2VUb3VjaEV2ZW50fSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB0eXBlIERyYWdnYWJsZUNvcmUgZnJvbSAnLi4vRHJhZ2dhYmxlQ29yZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3VuZFBvc2l0aW9uKGRyYWdnYWJsZTogRHJhZ2dhYmxlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IFtudW1iZXIsIG51bWJlcl0ge1xuICAvLyBJZiBubyBib3VuZHMsIHNob3J0LWNpcmN1aXQgYW5kIG1vdmUgb25cbiAgaWYgKCFkcmFnZ2FibGUucHJvcHMuYm91bmRzKSByZXR1cm4gW3gsIHldO1xuXG4gIC8vIENsb25lIG5ldyBib3VuZHNcbiAgbGV0IHtib3VuZHN9ID0gZHJhZ2dhYmxlLnByb3BzO1xuICBib3VuZHMgPSB0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJyA/IGJvdW5kcyA6IGNsb25lQm91bmRzKGJvdW5kcyk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmICh0eXBlb2YgYm91bmRzID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IHtvd25lckRvY3VtZW50fSA9IG5vZGU7XG4gICAgY29uc3Qgb3duZXJXaW5kb3cgPSBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICAgIGxldCBib3VuZE5vZGU7XG4gICAgaWYgKGJvdW5kcyA9PT0gJ3BhcmVudCcpIHtcbiAgICAgIGJvdW5kTm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmROb2RlID0gb3duZXJEb2N1bWVudC5xdWVyeVNlbGVjdG9yKGJvdW5kcyk7XG4gICAgfVxuICAgIGlmICghKGJvdW5kTm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdCb3VuZHMgc2VsZWN0b3IgXCInICsgYm91bmRzICsgJ1wiIGNvdWxkIG5vdCBmaW5kIGFuIGVsZW1lbnQuJyk7XG4gICAgfVxuICAgIGNvbnN0IG5vZGVTdHlsZSA9IG93bmVyV2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSk7XG4gICAgY29uc3QgYm91bmROb2RlU3R5bGUgPSBvd25lcldpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGJvdW5kTm9kZSk7XG4gICAgLy8gQ29tcHV0ZSBib3VuZHMuIFRoaXMgaXMgYSBwYWluIHdpdGggcGFkZGluZyBhbmQgb2Zmc2V0cyBidXQgdGhpcyBnZXRzIGl0IGV4YWN0bHkgcmlnaHQuXG4gICAgYm91bmRzID0ge1xuICAgICAgbGVmdDogLW5vZGUub2Zmc2V0TGVmdCArIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nTGVmdCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpbkxlZnQpLFxuICAgICAgdG9wOiAtbm9kZS5vZmZzZXRUb3AgKyBpbnQoYm91bmROb2RlU3R5bGUucGFkZGluZ1RvcCkgKyBpbnQobm9kZVN0eWxlLm1hcmdpblRvcCksXG4gICAgICByaWdodDogaW5uZXJXaWR0aChib3VuZE5vZGUpIC0gb3V0ZXJXaWR0aChub2RlKSAtIG5vZGUub2Zmc2V0TGVmdCArXG4gICAgICAgIGludChib3VuZE5vZGVTdHlsZS5wYWRkaW5nUmlnaHQpIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5SaWdodCksXG4gICAgICBib3R0b206IGlubmVySGVpZ2h0KGJvdW5kTm9kZSkgLSBvdXRlckhlaWdodChub2RlKSAtIG5vZGUub2Zmc2V0VG9wICtcbiAgICAgICAgaW50KGJvdW5kTm9kZVN0eWxlLnBhZGRpbmdCb3R0b20pIC0gaW50KG5vZGVTdHlsZS5tYXJnaW5Cb3R0b20pXG4gICAgfTtcbiAgfVxuXG4gIC8vIEtlZXAgeCBhbmQgeSBiZWxvdyByaWdodCBhbmQgYm90dG9tIGxpbWl0cy4uLlxuICBpZiAoaXNOdW0oYm91bmRzLnJpZ2h0KSkgeCA9IE1hdGgubWluKHgsIGJvdW5kcy5yaWdodCk7XG4gIGlmIChpc051bShib3VuZHMuYm90dG9tKSkgeSA9IE1hdGgubWluKHksIGJvdW5kcy5ib3R0b20pO1xuXG4gIC8vIEJ1dCBhYm92ZSBsZWZ0IGFuZCB0b3AgbGltaXRzLlxuICBpZiAoaXNOdW0oYm91bmRzLmxlZnQpKSB4ID0gTWF0aC5tYXgoeCwgYm91bmRzLmxlZnQpO1xuICBpZiAoaXNOdW0oYm91bmRzLnRvcCkpIHkgPSBNYXRoLm1heCh5LCBib3VuZHMudG9wKTtcblxuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc25hcFRvR3JpZChncmlkOiBbbnVtYmVyLCBudW1iZXJdLCBwZW5kaW5nWDogbnVtYmVyLCBwZW5kaW5nWTogbnVtYmVyKTogW251bWJlciwgbnVtYmVyXSB7XG4gIGNvbnN0IHggPSBNYXRoLnJvdW5kKHBlbmRpbmdYIC8gZ3JpZFswXSkgKiBncmlkWzBdO1xuICBjb25zdCB5ID0gTWF0aC5yb3VuZChwZW5kaW5nWSAvIGdyaWRbMV0pICogZ3JpZFsxXTtcbiAgcmV0dXJuIFt4LCB5XTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbkRyYWdYKGRyYWdnYWJsZTogRHJhZ2dhYmxlKTogYm9vbGVhbiB7XG4gIHJldHVybiBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ2JvdGgnIHx8IGRyYWdnYWJsZS5wcm9wcy5heGlzID09PSAneCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EcmFnWShkcmFnZ2FibGU6IERyYWdnYWJsZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gZHJhZ2dhYmxlLnByb3BzLmF4aXMgPT09ICdib3RoJyB8fCBkcmFnZ2FibGUucHJvcHMuYXhpcyA9PT0gJ3knO1xufVxuXG4vLyBHZXQge3gsIHl9IHBvc2l0aW9ucyBmcm9tIGV2ZW50LlxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRyb2xQb3NpdGlvbihlOiBNb3VzZVRvdWNoRXZlbnQsIHRvdWNoSWRlbnRpZmllcjogP251bWJlciwgZHJhZ2dhYmxlQ29yZTogRHJhZ2dhYmxlQ29yZSk6ID9Db250cm9sUG9zaXRpb24ge1xuICBjb25zdCB0b3VjaE9iaiA9IHR5cGVvZiB0b3VjaElkZW50aWZpZXIgPT09ICdudW1iZXInID8gZ2V0VG91Y2goZSwgdG91Y2hJZGVudGlmaWVyKSA6IG51bGw7XG4gIGlmICh0eXBlb2YgdG91Y2hJZGVudGlmaWVyID09PSAnbnVtYmVyJyAmJiAhdG91Y2hPYmopIHJldHVybiBudWxsOyAvLyBub3QgdGhlIHJpZ2h0IHRvdWNoXG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGVDb3JlKTtcbiAgLy8gVXNlciBjYW4gcHJvdmlkZSBhbiBvZmZzZXRQYXJlbnQgaWYgZGVzaXJlZC5cbiAgY29uc3Qgb2Zmc2V0UGFyZW50ID0gZHJhZ2dhYmxlQ29yZS5wcm9wcy5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vZmZzZXRQYXJlbnQgfHwgbm9kZS5vd25lckRvY3VtZW50LmJvZHk7XG4gIHJldHVybiBvZmZzZXRYWUZyb21QYXJlbnQodG91Y2hPYmogfHwgZSwgb2Zmc2V0UGFyZW50KTtcbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgb2JqZWN0IGV4cG9zZWQgYnkgPERyYWdnYWJsZUNvcmU+J3MgZXZlbnRzXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29yZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGVDb3JlLCB4OiBudW1iZXIsIHk6IG51bWJlcik6IERyYWdnYWJsZURhdGEge1xuICBjb25zdCBzdGF0ZSA9IGRyYWdnYWJsZS5zdGF0ZTtcbiAgY29uc3QgaXNTdGFydCA9ICFpc051bShzdGF0ZS5sYXN0WCk7XG4gIGNvbnN0IG5vZGUgPSBmaW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuXG4gIGlmIChpc1N0YXJ0KSB7XG4gICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgbW92ZSwgdXNlIHRoZSB4IGFuZCB5IGFzIGxhc3QgY29vcmRzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiAwLCBkZWx0YVk6IDAsXG4gICAgICBsYXN0WDogeCwgbGFzdFk6IHksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIGNhbGN1bGF0ZSBwcm9wZXIgdmFsdWVzLlxuICAgIHJldHVybiB7XG4gICAgICBub2RlLFxuICAgICAgZGVsdGFYOiB4IC0gc3RhdGUubGFzdFgsIGRlbHRhWTogeSAtIHN0YXRlLmxhc3RZLFxuICAgICAgbGFzdFg6IHN0YXRlLmxhc3RYLCBsYXN0WTogc3RhdGUubGFzdFksXG4gICAgICB4LCB5LFxuICAgIH07XG4gIH1cbn1cblxuLy8gQ3JlYXRlIGFuIGRhdGEgZXhwb3NlZCBieSA8RHJhZ2dhYmxlPidzIGV2ZW50c1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURyYWdnYWJsZURhdGEoZHJhZ2dhYmxlOiBEcmFnZ2FibGUsIGNvcmVEYXRhOiBEcmFnZ2FibGVEYXRhKTogRHJhZ2dhYmxlRGF0YSB7XG4gIHJldHVybiB7XG4gICAgbm9kZTogY29yZURhdGEubm9kZSxcbiAgICB4OiBkcmFnZ2FibGUuc3RhdGUueCArIGNvcmVEYXRhLmRlbHRhWCxcbiAgICB5OiBkcmFnZ2FibGUuc3RhdGUueSArIGNvcmVEYXRhLmRlbHRhWSxcbiAgICBkZWx0YVg6IGNvcmVEYXRhLmRlbHRhWCxcbiAgICBkZWx0YVk6IGNvcmVEYXRhLmRlbHRhWSxcbiAgICBsYXN0WDogZHJhZ2dhYmxlLnN0YXRlLngsXG4gICAgbGFzdFk6IGRyYWdnYWJsZS5zdGF0ZS55XG4gIH07XG59XG5cbi8vIEEgbG90IGZhc3RlciB0aGFuIHN0cmluZ2lmeS9wYXJzZVxuZnVuY3Rpb24gY2xvbmVCb3VuZHMoYm91bmRzOiBCb3VuZHMpOiBCb3VuZHMge1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IGJvdW5kcy5sZWZ0LFxuICAgIHRvcDogYm91bmRzLnRvcCxcbiAgICByaWdodDogYm91bmRzLnJpZ2h0LFxuICAgIGJvdHRvbTogYm91bmRzLmJvdHRvbVxuICB9O1xufVxuXG5mdW5jdGlvbiBmaW5kRE9NTm9kZShkcmFnZ2FibGU6IERyYWdnYWJsZSB8IERyYWdnYWJsZUNvcmUpOiBIVE1MRWxlbWVudCB7XG4gIGNvbnN0IG5vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZShkcmFnZ2FibGUpO1xuICBpZiAoIW5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJzxEcmFnZ2FibGVDb3JlPjogVW5tb3VudGVkIGR1cmluZyBldmVudCEnKTtcbiAgfVxuICAvLyAkRmxvd0lnbm9yZSB3ZSBjYW4ndCBhc3NlcnQgb24gSFRNTEVsZW1lbnQgZHVlIHRvIHRlc3RzLi4uIEZJWE1FXG4gIHJldHVybiBub2RlO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL3V0aWxzL3Bvc2l0aW9uRm5zLmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQge1xuICBtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8sIGFkZEV2ZW50LCByZW1vdmVFdmVudCwgYWRkVXNlclNlbGVjdFN0eWxlcywgZ2V0VG91Y2hJZGVudGlmaWVyLFxuICByZW1vdmVVc2VyU2VsZWN0U3R5bGVzLCBzdHlsZUhhY2tzXG59IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcbmltcG9ydCB7IGNyZWF0ZUNvcmVEYXRhLCBnZXRDb250cm9sUG9zaXRpb24sIHNuYXBUb0dyaWQgfSBmcm9tICcuL3V0aWxzL3Bvc2l0aW9uRm5zJztcbmltcG9ydCB7IGRvbnRTZXRNZSB9IGZyb20gJy4vdXRpbHMvc2hpbXMnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5cbmltcG9ydCB0eXBlIHsgRXZlbnRIYW5kbGVyLCBNb3VzZVRvdWNoRXZlbnQgfSBmcm9tICcuL3V0aWxzL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgRWxlbWVudCBhcyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5cbi8vIFNpbXBsZSBhYnN0cmFjdGlvbiBmb3IgZHJhZ2dpbmcgZXZlbnRzIG5hbWVzLlxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuLy8gRGVmYXVsdCB0byBtb3VzZSBldmVudHMuXG5sZXQgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLm1vdXNlO1xuXG50eXBlIERyYWdnYWJsZUNvcmVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGxhc3RYOiBudW1iZXIsXG4gIGxhc3RZOiBudW1iZXIsXG4gIHRvdWNoSWRlbnRpZmllcjogP251bWJlclxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQm91bmRzID0ge1xuICBsZWZ0OiBudW1iZXIsXG4gIHJpZ2h0OiBudW1iZXIsXG4gIHRvcDogbnVtYmVyLFxuICBib3R0b206IG51bWJlcixcbn07XG5cbmV4cG9ydCB0eXBlIERyYWdnYWJsZURhdGEgPSB7XG4gIG5vZGU6IEhUTUxFbGVtZW50LFxuICB4OiBudW1iZXIsIHk6IG51bWJlcixcbiAgZGVsdGFYOiBudW1iZXIsIGRlbHRhWTogbnVtYmVyLFxuICBsYXN0WDogbnVtYmVyLCBsYXN0WTogbnVtYmVyLFxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGU6IE1vdXNlRXZlbnQsIGRhdGE6IERyYWdnYWJsZURhdGEpID0+IHZvaWQ7XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xQb3NpdGlvbiA9IHsgeDogbnVtYmVyLCB5OiBudW1iZXIgfTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlQ29yZVByb3BzID0ge1xuICBhbGxvd0FueUNsaWNrOiBib29sZWFuLFxuICBjYW5jZWw6IHN0cmluZyxcbiAgY2hpbGRyZW46IFJlYWN0RWxlbWVudDxhbnk+LFxuICBkaXNhYmxlZDogYm9vbGVhbixcbiAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IGJvb2xlYW4sXG4gIG9mZnNldFBhcmVudDogSFRNTEVsZW1lbnQsXG4gIGdyaWQ6IFtudW1iZXIsIG51bWJlcl0sXG4gIGhhbmRsZTogc3RyaW5nLFxuICBvblN0YXJ0OiBEcmFnZ2FibGVFdmVudEhhbmRsZXIsXG4gIG9uRHJhZzogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyLFxuICBvblN0b3A6IERyYWdnYWJsZUV2ZW50SGFuZGxlcixcbiAgb25Nb3VzZURvd246IChlOiBNb3VzZUV2ZW50KSA9PiB2b2lkLFxuICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlQ29yZT4uXG4vL1xuLy8gPERyYWdnYWJsZUNvcmU+IGlzIGZvciBhZHZhbmNlZCB1c2FnZSBvZiA8RHJhZ2dhYmxlPi4gSXQgbWFpbnRhaW5zIG1pbmltYWwgaW50ZXJuYWwgc3RhdGUgc28gaXQgY2FuXG4vLyB3b3JrIHdlbGwgd2l0aCBsaWJyYXJpZXMgdGhhdCByZXF1aXJlIG1vcmUgY29udHJvbCBvdmVyIHRoZSBlbGVtZW50LlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlQ29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxEcmFnZ2FibGVDb3JlUHJvcHMsIERyYWdnYWJsZUNvcmVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGVDb3JlJztcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIC8qKlxuICAgICAqIGBhbGxvd0FueUNsaWNrYCBhbGxvd3MgZHJhZ2dpbmcgdXNpbmcgYW55IG1vdXNlIGJ1dHRvbi5cbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBvbmx5IGFjY2VwdCB0aGUgbGVmdCBidXR0b24uXG4gICAgICpcbiAgICAgKiBEZWZhdWx0cyB0byBgZmFsc2VgLlxuICAgICAqL1xuICAgIGFsbG93QW55Q2xpY2s6IFByb3BUeXBlcy5ib29sLFxuXG4gICAgLyoqXG4gICAgICogYGRpc2FibGVkYCwgaWYgdHJ1ZSwgc3RvcHMgdGhlIDxEcmFnZ2FibGU+IGZyb20gZHJhZ2dpbmcuIEFsbCBoYW5kbGVycyxcbiAgICAgKiB3aXRoIHRoZSBleGNlcHRpb24gb2YgYG9uTW91c2VEb3duYCwgd2lsbCBub3QgZmlyZS5cbiAgICAgKi9cbiAgICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBCeSBkZWZhdWx0LCB3ZSBhZGQgJ3VzZXItc2VsZWN0Om5vbmUnIGF0dHJpYnV0ZXMgdG8gdGhlIGRvY3VtZW50IGJvZHlcbiAgICAgKiB0byBwcmV2ZW50IHVnbHkgdGV4dCBzZWxlY3Rpb24gZHVyaW5nIGRyYWcuIElmIHRoaXMgaXMgY2F1c2luZyBwcm9ibGVtc1xuICAgICAqIGZvciB5b3VyIGFwcCwgc2V0IHRoaXMgdG8gYGZhbHNlYC5cbiAgICAgKi9cbiAgICBlbmFibGVVc2VyU2VsZWN0SGFjazogUHJvcFR5cGVzLmJvb2wsXG5cbiAgICAvKipcbiAgICAgKiBgb2Zmc2V0UGFyZW50YCwgaWYgc2V0LCB1c2VzIHRoZSBwYXNzZWQgRE9NIG5vZGUgdG8gY29tcHV0ZSBkcmFnIG9mZnNldHNcbiAgICAgKiBpbnN0ZWFkIG9mIHVzaW5nIHRoZSBwYXJlbnQgbm9kZS5cbiAgICAgKi9cbiAgICBvZmZzZXRQYXJlbnQ6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSkge1xuICAgICAgaWYgKHByb2Nlc3MuYnJvd3NlciA9PT0gdHJ1ZSAmJiBwcm9wc1twcm9wTmFtZV0gJiYgcHJvcHNbcHJvcE5hbWVdLm5vZGVUeXBlICE9PSAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRHJhZ2dhYmxlXFwncyBvZmZzZXRQYXJlbnQgbXVzdCBiZSBhIERPTSBOb2RlLicpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBgZ3JpZGAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgZHJhZ2dpbmcgc2hvdWxkIHNuYXAgdG8uXG4gICAgICovXG4gICAgZ3JpZDogUHJvcFR5cGVzLmFycmF5T2YoUHJvcFR5cGVzLm51bWJlciksXG5cbiAgICAvKipcbiAgICAgKiBgaGFuZGxlYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIGFzIHRoZSBoYW5kbGUgdGhhdCBpbml0aWF0ZXMgZHJhZy5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICByZXR1cm4gKFxuICAgICAqICAgICAgICAgICAgPERyYWdnYWJsZSBoYW5kbGU9XCIuaGFuZGxlXCI+XG4gICAgICogICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhhbmRsZVwiPkNsaWNrIG1lIHRvIGRyYWc8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgIDxkaXY+VGhpcyBpcyBzb21lIG90aGVyIGNvbnRlbnQ8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBoYW5kbGU6IFByb3BUeXBlcy5zdHJpbmcsXG5cbiAgICAvKipcbiAgICAgKiBgY2FuY2VsYCBzcGVjaWZpZXMgYSBzZWxlY3RvciB0byBiZSB1c2VkIHRvIHByZXZlbnQgZHJhZyBpbml0aWFsaXphdGlvbi5cbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgIHJldHVybihcbiAgICAgKiAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgY2FuY2VsPVwiLmNhbmNlbFwiPlxuICAgICAqICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICogICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhbmNlbFwiPllvdSBjYW4ndCBkcmFnIGZyb20gaGVyZTwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgPGRpdj5EcmFnZ2luZyBoZXJlIHdvcmtzIGZpbmU8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgKiAgICAgICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgICApO1xuICAgICAqICAgICAgIH1cbiAgICAgKiAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNhbmNlbDogUHJvcFR5cGVzLnN0cmluZyxcblxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGRyYWdnaW5nIHN0YXJ0cy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIGRyYWdnaW5nIHdpbGwgYmUgY2FuY2VsZWQuXG4gICAgICovXG4gICAgb25TdGFydDogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hpbGUgZHJhZ2dpbmcuXG4gICAgICogSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSBib29sZWFuIGZhbHNlLCBkcmFnZ2luZyB3aWxsIGJlIGNhbmNlbGVkLlxuICAgICAqL1xuICAgIG9uRHJhZzogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBkcmFnZ2luZyBzdG9wcy5cbiAgICAgKiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIGJvb2xlYW4gZmFsc2UsIHRoZSBkcmFnIHdpbGwgcmVtYWluIGFjdGl2ZS5cbiAgICAgKi9cbiAgICBvblN0b3A6IFByb3BUeXBlcy5mdW5jLFxuXG4gICAgLyoqXG4gICAgICogQSB3b3JrYXJvdW5kIG9wdGlvbiB3aGljaCBjYW4gYmUgcGFzc2VkIGlmIG9uTW91c2VEb3duIG5lZWRzIHRvIGJlIGFjY2Vzc2VkLFxuICAgICAqIHNpbmNlIGl0J2xsIGFsd2F5cyBiZSBibG9ja2VkIChhcyB0aGVyZSBpcyBpbnRlcm5hbCB1c2Ugb2Ygb25Nb3VzZURvd24pXG4gICAgICovXG4gICAgb25Nb3VzZURvd246IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5VXA6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uS2V5RG93bjogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgICAvKipcbiAgICAgKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBiZSBkZWZpbmVkIG9uIHRoZSBjaGlsZCwgbm90IGhlcmUuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBkb250U2V0TWUsXG4gICAgc3R5bGU6IGRvbnRTZXRNZSxcbiAgICB0cmFuc2Zvcm06IGRvbnRTZXRNZVxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgYWxsb3dBbnlDbGljazogZmFsc2UsIC8vIGJ5IGRlZmF1bHQgb25seSBhY2NlcHQgbGVmdCBjbGlja1xuICAgIGNhbmNlbDogbnVsbCxcbiAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgZW5hYmxlVXNlclNlbGVjdEhhY2s6IHRydWUsXG4gICAgb2Zmc2V0UGFyZW50OiBudWxsLFxuICAgIGhhbmRsZTogbnVsbCxcbiAgICBncmlkOiBudWxsLFxuICAgIHRyYW5zZm9ybTogbnVsbCxcbiAgICBvblN0YXJ0OiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbkRyYWc6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uU3RvcDogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25Nb3VzZURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5VXA6IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5RG93bjogZnVuY3Rpb24oKSB7IH1cbiAgfTtcblxuICBzdGF0ZSA9IHtcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgLy8gVXNlZCB3aGlsZSBkcmFnZ2luZyB0byBkZXRlcm1pbmUgZGVsdGFzLlxuICAgIGxhc3RYOiBOYU4sIGxhc3RZOiBOYU4sXG4gICAgdG91Y2hJZGVudGlmaWVyOiBudWxsXG4gIH07XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgLy8gUmVtb3ZlIGFueSBsZWZ0b3ZlciBldmVudCBoYW5kbGVycy4gUmVtb3ZlIGJvdGggdG91Y2ggYW5kIG1vdXNlIGhhbmRsZXJzIGluIGNhc2VcbiAgICAvLyBzb21lIGJyb3dzZXIgcXVpcmsgY2F1c2VkIGEgdG91Y2ggZXZlbnQgdG8gZmlyZSBkdXJpbmcgYSBtb3VzZSBtb3ZlLCBvciB2aWNlIHZlcnNhLlxuICAgIGNvbnN0IHRoaXNOb2RlID0gUmVhY3RET00uZmluZERPTU5vZGUodGhpcyk7XG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICBjb25zdCB7IG93bmVyRG9jdW1lbnQgfSA9IHRoaXNOb2RlO1xuICAgICAgcmVtb3ZlRXZlbnQob3duZXJEb2N1bWVudCwgZXZlbnRzRm9yLm1vdXNlLm1vdmUsIHRoaXMuaGFuZGxlRHJhZyk7XG4gICAgICByZW1vdmVFdmVudChvd25lckRvY3VtZW50LCBldmVudHNGb3IudG91Y2gubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci5tb3VzZS5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgIHJlbW92ZUV2ZW50KG93bmVyRG9jdW1lbnQsIGV2ZW50c0Zvci50b3VjaC5zdG9wLCB0aGlzLmhhbmRsZURyYWdTdG9wKTtcbiAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKG93bmVyRG9jdW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZURyYWdTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIE1ha2UgaXQgcG9zc2libGUgdG8gYXR0YWNoIGV2ZW50IGhhbmRsZXJzIG9uIHRvcCBvZiB0aGlzIG9uZS4gICBcbiAgICB0aGlzLnByb3BzLm9uTW91c2VEb3duKGUpO1xuXG4gICAgLy8gT25seSBhY2NlcHQgbGVmdC1jbGlja3MuXG4gICAgaWYgKCF0aGlzLnByb3BzLmFsbG93QW55Q2xpY2sgJiYgdHlwZW9mIGUuYnV0dG9uID09PSAnbnVtYmVyJyAmJiBlLmJ1dHRvbiAhPT0gMCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gR2V0IG5vZGVzLiBCZSBzdXJlIHRvIGdyYWIgcmVsYXRpdmUgZG9jdW1lbnQgKGNvdWxkIGJlIGlmcmFtZWQpXG4gICAgY29uc3QgdGhpc05vZGUgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKTtcbiAgICBpZiAoIXRoaXNOb2RlIHx8ICF0aGlzTm9kZS5vd25lckRvY3VtZW50IHx8ICF0aGlzTm9kZS5vd25lckRvY3VtZW50LmJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignPERyYWdnYWJsZUNvcmU+IG5vdCBtb3VudGVkIG9uIERyYWdTdGFydCEnKTtcbiAgICB9XG4gICAgY29uc3QgeyBvd25lckRvY3VtZW50IH0gPSB0aGlzTm9kZTtcblxuICAgIC8vIFNob3J0IGNpcmN1aXQgaWYgaGFuZGxlIG9yIGNhbmNlbCBwcm9wIHdhcyBwcm92aWRlZCBhbmQgc2VsZWN0b3IgZG9lc24ndCBtYXRjaC5cbiAgICBpZiAodGhpcy5wcm9wcy5kaXNhYmxlZCB8fFxuICAgICAgKCEoZS50YXJnZXQgaW5zdGFuY2VvZiBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3Lk5vZGUpKSB8fFxuICAgICAgKHRoaXMucHJvcHMuaGFuZGxlICYmICFtYXRjaGVzU2VsZWN0b3JBbmRQYXJlbnRzVG8oZS50YXJnZXQsIHRoaXMucHJvcHMuaGFuZGxlLCB0aGlzTm9kZSkpIHx8XG4gICAgICAodGhpcy5wcm9wcy5jYW5jZWwgJiYgbWF0Y2hlc1NlbGVjdG9yQW5kUGFyZW50c1RvKGUudGFyZ2V0LCB0aGlzLnByb3BzLmNhbmNlbCwgdGhpc05vZGUpKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFNldCB0b3VjaCBpZGVudGlmaWVyIGluIGNvbXBvbmVudCBzdGF0ZSBpZiB0aGlzIGlzIGEgdG91Y2ggZXZlbnQuIFRoaXMgYWxsb3dzIHVzIHRvXG4gICAgLy8gZGlzdGluZ3Vpc2ggYmV0d2VlbiBpbmRpdmlkdWFsIHRvdWNoZXMgb24gbXVsdGl0b3VjaCBzY3JlZW5zIGJ5IGlkZW50aWZ5aW5nIHdoaWNoXG4gICAgLy8gdG91Y2hwb2ludCB3YXMgc2V0IHRvIHRoaXMgZWxlbWVudC5cbiAgICBjb25zdCB0b3VjaElkZW50aWZpZXIgPSBnZXRUb3VjaElkZW50aWZpZXIoZSk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHRvdWNoSWRlbnRpZmllciB9KTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0b3VjaElkZW50aWZpZXIsIHRoaXMpO1xuICAgIGlmIChwb3NpdGlvbiA9PSBudWxsKSByZXR1cm47IC8vIG5vdCBwb3NzaWJsZSBidXQgc2F0aXNmaWVzIGZsb3dcbiAgICBjb25zdCB7IHgsIHkgfSA9IHBvc2l0aW9uO1xuXG4gICAgLy8gQ3JlYXRlIGFuIGV2ZW50IG9iamVjdCB3aXRoIGFsbCB0aGUgZGF0YSBwYXJlbnRzIG5lZWQgdG8gbWFrZSBhIGRlY2lzaW9uIGhlcmUuXG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICAvLyBsb2coJ0RyYWdnYWJsZUNvcmU6IGhhbmRsZURyYWdTdGFydDogJWonLCBjb3JlRXZlbnQpO1xuXG4gICAgLy8gQ2FsbCBldmVudCBoYW5kbGVyLiBJZiBpdCByZXR1cm5zIGV4cGxpY2l0IGZhbHNlLCBjYW5jZWwuXG4gICAgbG9nKCdjYWxsaW5nJywgdGhpcy5wcm9wcy5vblN0YXJ0KTtcbiAgICBjb25zdCBzaG91bGRVcGRhdGUgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY29yZUV2ZW50KTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgLy8gQWRkIGEgc3R5bGUgdG8gdGhlIGJvZHkgdG8gZGlzYWJsZSB1c2VyLXNlbGVjdC4gVGhpcyBwcmV2ZW50cyB0ZXh0IGZyb21cbiAgICAvLyBiZWluZyBzZWxlY3RlZCBhbGwgb3ZlciB0aGUgcGFnZS5cbiAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVVc2VyU2VsZWN0SGFjaykgYWRkVXNlclNlbGVjdFN0eWxlcyhvd25lckRvY3VtZW50KTtcblxuICAgIC8vIEluaXRpYXRlIGRyYWdnaW5nLiBTZXQgdGhlIGN1cnJlbnQgeCBhbmQgeSBhcyBvZmZzZXRzXG4gICAgLy8gc28gd2Uga25vdyBob3cgbXVjaCB3ZSd2ZSBtb3ZlZCBkdXJpbmcgdGhlIGRyYWcuIFRoaXMgYWxsb3dzIHVzXG4gICAgLy8gdG8gZHJhZyBlbGVtZW50cyBhcm91bmQgZXZlbiBpZiB0aGV5IGhhdmUgYmVlbiBtb3ZlZCwgd2l0aG91dCBpc3N1ZS5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiB0cnVlLFxuXG4gICAgICBsYXN0WDogeCxcbiAgICAgIGxhc3RZOiB5XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgZXZlbnRzIHRvIHRoZSBkb2N1bWVudCBkaXJlY3RseSBzbyB3ZSBjYXRjaCB3aGVuIHRoZSB1c2VyJ3MgbW91c2UvdG91Y2ggbW92ZXMgb3V0c2lkZSBvZlxuICAgIC8vIHRoaXMgZWxlbWVudC4gV2UgdXNlIGRpZmZlcmVudCBldmVudHMgZGVwZW5kaW5nIG9uIHdoZXRoZXIgb3Igbm90IHdlIGhhdmUgZGV0ZWN0ZWQgdGhhdCB0aGlzXG4gICAgLy8gaXMgYSB0b3VjaC1jYXBhYmxlIGRldmljZS5cbiAgICBhZGRFdmVudChvd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3IubW92ZSwgdGhpcy5oYW5kbGVEcmFnKTtcbiAgICBhZGRFdmVudChvd25lckRvY3VtZW50LCBkcmFnRXZlbnRGb3Iuc3RvcCwgdGhpcy5oYW5kbGVEcmFnU3RvcCk7XG4gIH07XG5cbiAgaGFuZGxlRHJhZzogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuXG4gICAgLy8gUHJldmVudCBzY3JvbGxpbmcgb24gbW9iaWxlIGRldmljZXMsIGxpa2UgaXBhZC9pcGhvbmUuXG4gICAgaWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIEdldCB0aGUgY3VycmVudCBkcmFnIHBvaW50IGZyb20gdGhlIGV2ZW50LiBUaGlzIGlzIHVzZWQgYXMgdGhlIG9mZnNldC5cbiAgICBjb25zdCBwb3NpdGlvbiA9IGdldENvbnRyb2xQb3NpdGlvbihlLCB0aGlzLnN0YXRlLnRvdWNoSWRlbnRpZmllciwgdGhpcyk7XG4gICAgaWYgKHBvc2l0aW9uID09IG51bGwpIHJldHVybjtcbiAgICBsZXQgeyB4LCB5IH0gPSBwb3NpdGlvbjtcblxuICAgIC8vIFNuYXAgdG8gZ3JpZCBpZiBwcm9wIGhhcyBiZWVuIHByb3ZpZGVkXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5wcm9wcy5ncmlkKSkge1xuICAgICAgbGV0IGRlbHRhWCA9IHggLSB0aGlzLnN0YXRlLmxhc3RYLCBkZWx0YVkgPSB5IC0gdGhpcy5zdGF0ZS5sYXN0WTtcbiAgICAgIFtkZWx0YVgsIGRlbHRhWV0gPSBzbmFwVG9HcmlkKHRoaXMucHJvcHMuZ3JpZCwgZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgaWYgKCFkZWx0YVggJiYgIWRlbHRhWSkgcmV0dXJuOyAvLyBza2lwIHVzZWxlc3MgZHJhZ1xuICAgICAgeCA9IHRoaXMuc3RhdGUubGFzdFggKyBkZWx0YVgsIHkgPSB0aGlzLnN0YXRlLmxhc3RZICsgZGVsdGFZO1xuICAgIH1cblxuICAgIGNvbnN0IGNvcmVFdmVudCA9IGNyZWF0ZUNvcmVEYXRhKHRoaXMsIHgsIHkpO1xuXG4gICAgLy8gbG9nKCdEcmFnZ2FibGVDb3JlOiBoYW5kbGVEcmFnOiAlaicsIGNvcmVFdmVudCk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXIuIElmIGl0IHJldHVybnMgZXhwbGljaXQgZmFsc2UsIHRyaWdnZXIgZW5kLlxuICAgIGNvbnN0IHNob3VsZFVwZGF0ZSA9IHRoaXMucHJvcHMub25EcmFnKGUsIGNvcmVFdmVudCk7XG4gICAgaWYgKHNob3VsZFVwZGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vICRGbG93SWdub3JlXG4gICAgICAgIHRoaXMuaGFuZGxlRHJhZ1N0b3AobmV3IE1vdXNlRXZlbnQoJ21vdXNldXAnKSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgLy8gT2xkIGJyb3dzZXJzXG4gICAgICAgIGNvbnN0IGV2ZW50ID0gKChkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTogYW55KTogTW91c2VUb3VjaEV2ZW50KTtcbiAgICAgICAgLy8gSSBzZWUgd2h5IHRoaXMgaW5zYW5pdHkgd2FzIGRlcHJlY2F0ZWRcbiAgICAgICAgLy8gJEZsb3dJZ25vcmVcbiAgICAgICAgZXZlbnQuaW5pdE1vdXNlRXZlbnQoJ21vdXNldXAnLCB0cnVlLCB0cnVlLCB3aW5kb3csIDAsIDAsIDAsIDAsIDAsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcbiAgICAgICAgdGhpcy5oYW5kbGVEcmFnU3RvcChldmVudCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsYXN0WDogeCxcbiAgICAgIGxhc3RZOiB5XG4gICAgfSk7XG4gIH07XG5cbiAgaGFuZGxlRHJhZ1N0b3A6IEV2ZW50SGFuZGxlcjxNb3VzZVRvdWNoRXZlbnQ+ID0gKGUpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IHBvc2l0aW9uID0gZ2V0Q29udHJvbFBvc2l0aW9uKGUsIHRoaXMuc3RhdGUudG91Y2hJZGVudGlmaWVyLCB0aGlzKTtcbiAgICBpZiAocG9zaXRpb24gPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IHsgeCwgeSB9ID0gcG9zaXRpb247XG4gICAgY29uc3QgY29yZUV2ZW50ID0gY3JlYXRlQ29yZURhdGEodGhpcywgeCwgeSk7XG5cbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIGlmICh0aGlzTm9kZSkge1xuICAgICAgLy8gUmVtb3ZlIHVzZXItc2VsZWN0IGhhY2tcbiAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZVVzZXJTZWxlY3RIYWNrKSByZW1vdmVVc2VyU2VsZWN0U3R5bGVzKHRoaXNOb2RlLm93bmVyRG9jdW1lbnQpO1xuICAgIH1cblxuICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogaGFuZGxlRHJhZ1N0b3A6ICVqJywgY29yZUV2ZW50KTtcblxuICAgIC8vIFJlc2V0IHRoZSBlbC5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGxhc3RYOiBOYU4sXG4gICAgICBsYXN0WTogTmFOXG4gICAgfSk7XG5cbiAgICAvLyBDYWxsIGV2ZW50IGhhbmRsZXJcbiAgICB0aGlzLnByb3BzLm9uU3RvcChlLCBjb3JlRXZlbnQpO1xuXG4gICAgaWYgKHRoaXNOb2RlKSB7XG4gICAgICAvLyBSZW1vdmUgZXZlbnQgaGFuZGxlcnNcbiAgICAgIC8vIGxvZygnRHJhZ2dhYmxlQ29yZTogUmVtb3ZpbmcgaGFuZGxlcnMnKTtcbiAgICAgIHJlbW92ZUV2ZW50KHRoaXNOb2RlLm93bmVyRG9jdW1lbnQsIGRyYWdFdmVudEZvci5tb3ZlLCB0aGlzLmhhbmRsZURyYWcpO1xuICAgICAgcmVtb3ZlRXZlbnQodGhpc05vZGUub3duZXJEb2N1bWVudCwgZHJhZ0V2ZW50Rm9yLnN0b3AsIHRoaXMuaGFuZGxlRHJhZ1N0b3ApO1xuICAgIH1cbiAgfTtcblxuICBvbk1vdXNlRG93bjogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTsgLy8gb24gdG91Y2hzY3JlZW4gbGFwdG9wcyB3ZSBjb3VsZCBzd2l0Y2ggYmFjayB0byBtb3VzZVxuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0YXJ0KGUpO1xuICB9O1xuXG4gIG9uTW91c2VVcDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci5tb3VzZTtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdG9wKGUpO1xuICB9O1xuXG4gIC8vIFNhbWUgYXMgb25Nb3VzZURvd24gKHN0YXJ0IGRyYWcpLCBidXQgbm93IGNvbnNpZGVyIHRoaXMgYSB0b3VjaCBkZXZpY2UuXG4gIG9uVG91Y2hTdGFydDogRXZlbnRIYW5kbGVyPE1vdXNlVG91Y2hFdmVudD4gPSAoZSkgPT4ge1xuICAgIC8vIFdlJ3JlIG9uIGEgdG91Y2ggZGV2aWNlIG5vdywgc28gY2hhbmdlIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIGRyYWdFdmVudEZvciA9IGV2ZW50c0Zvci50b3VjaDtcblxuICAgIHJldHVybiB0aGlzLmhhbmRsZURyYWdTdGFydChlKTtcbiAgfTtcblxuICBvblRvdWNoRW5kOiBFdmVudEhhbmRsZXI8TW91c2VUb3VjaEV2ZW50PiA9IChlKSA9PiB7XG4gICAgLy8gV2UncmUgb24gYSB0b3VjaCBkZXZpY2Ugbm93LCBzbyBjaGFuZ2UgdGhlIGV2ZW50IGhhbmRsZXJzXG4gICAgZHJhZ0V2ZW50Rm9yID0gZXZlbnRzRm9yLnRvdWNoO1xuXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlRHJhZ1N0b3AoZSk7XG4gIH07XG5cbiAgb25LZXlVcDogYW55ID0gKGUpID0+IHtcbiAgICB0aGlzLnByb3BzLm9uS2V5VXAoZSk7XG4gIH07XG5cbiAgb25LZXlEb3duOiBhbnkgPSAoZSkgPT4ge1xuICAgIHRoaXMucHJvcHMub25LZXlEb3duKGUpO1xuICB9O1xuXG4gIHJlbmRlcigpIHtcbiAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoUmVhY3QuQ2hpbGRyZW4ub25seSh0aGlzLnByb3BzLmNoaWxkcmVuKSwge1xuICAgICAgc3R5bGU6IHN0eWxlSGFja3ModGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5zdHlsZSksXG4gICAgICAvLyBOb3RlOiBtb3VzZU1vdmUgaGFuZGxlciBpcyBhdHRhY2hlZCB0byBkb2N1bWVudCBzbyBpdCB3aWxsIHN0aWxsIGZ1bmN0aW9uXG4gICAgICAvLyB3aGVuIHRoZSB1c2VyIGRyYWdzIHF1aWNrbHkgYW5kIGxlYXZlcyB0aGUgYm91bmRzIG9mIHRoZSBlbGVtZW50LlxuICAgICAgb25Nb3VzZURvd246IHRoaXMub25Nb3VzZURvd24sXG4gICAgICBvblRvdWNoU3RhcnQ6IHRoaXMub25Ub3VjaFN0YXJ0LFxuICAgICAgb25Nb3VzZVVwOiB0aGlzLm9uTW91c2VVcCxcbiAgICAgIG9uVG91Y2hFbmQ6IHRoaXMub25Ub3VjaEVuZCxcbiAgICAgIG9uS2V5VXA6IHRoaXMub25LZXlVcCxcbiAgICAgIG9uS2V5RG93bjogdGhpcy5vbktleURvd25cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUNvcmUuanMiLCIvLyBAZmxvd1xuLyplc2xpbnQgbm8tY29uc29sZTowKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZyguLi5hcmdzOiBhbnkpIHtcbiAgaWYgKHByb2Nlc3MuZW52LkRSQUdHQUJMRV9ERUJVRykgY29uc29sZS5sb2coLi4uYXJncyk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvbG9nLmpzIiwidmFyIERyYWdnYWJsZSA9IHJlcXVpcmUoJy4vbGliL0RyYWdnYWJsZScpLmRlZmF1bHQ7XG5cbi8vIFByZXZpb3VzIHZlcnNpb25zIG9mIHRoaXMgbGliIGV4cG9ydGVkIDxEcmFnZ2FibGU+IGFzIHRoZSByb290IGV4cG9ydC4gQXMgdG8gbm90IGJyZWFrXG4vLyB0aGVtLCBvciBUeXBlU2NyaXB0LCB3ZSBleHBvcnQgKmJvdGgqIGFzIHRoZSByb290IGFuZCBhcyAnZGVmYXVsdCcuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL3B1bGwvMjU0XG4vLyBhbmQgaHR0cHM6Ly9naXRodWIuY29tL216YWJyaXNraWUvcmVhY3QtZHJhZ2dhYmxlL2lzc3Vlcy8yNjZcbm1vZHVsZS5leHBvcnRzID0gRHJhZ2dhYmxlO1xubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IERyYWdnYWJsZTtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUNvcmUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVDb3JlJykuZGVmYXVsdDtcbm1vZHVsZS5leHBvcnRzLkRyYWdnYWJsZUFsaWduR3VpZGUgPSByZXF1aXJlKCcuL2xpYi9EcmFnZ2FibGVBbGlnbkd1aWRlJykuZGVmYXVsdDtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiLy8gQGZsb3dcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IGNyZWF0ZUNTU1RyYW5zZm9ybSwgY3JlYXRlU1ZHVHJhbnNmb3JtIH0gZnJvbSAnLi91dGlscy9kb21GbnMnO1xuaW1wb3J0IHsgY2FuRHJhZ1gsIGNhbkRyYWdZLCBjcmVhdGVEcmFnZ2FibGVEYXRhLCBnZXRCb3VuZFBvc2l0aW9uIH0gZnJvbSAnLi91dGlscy9wb3NpdGlvbkZucyc7XG5pbXBvcnQgeyBkb250U2V0TWUgfSBmcm9tICcuL3V0aWxzL3NoaW1zJztcbmltcG9ydCBEcmFnZ2FibGVDb3JlIGZyb20gJy4vRHJhZ2dhYmxlQ29yZSc7XG5pbXBvcnQgdHlwZSB7IENvbnRyb2xQb3NpdGlvbiwgRHJhZ2dhYmxlQm91bmRzLCBEcmFnZ2FibGVDb3JlUHJvcHMgfSBmcm9tICcuL0RyYWdnYWJsZUNvcmUnO1xuaW1wb3J0IGxvZyBmcm9tICcuL3V0aWxzL2xvZyc7XG5pbXBvcnQgdHlwZSB7IERyYWdnYWJsZUV2ZW50SGFuZGxlciB9IGZyb20gJy4vdXRpbHMvdHlwZXMnO1xuaW1wb3J0IHR5cGUgeyBFbGVtZW50IGFzIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcblxudHlwZSBEcmFnZ2FibGVTdGF0ZSA9IHtcbiAgZHJhZ2dpbmc6IGJvb2xlYW4sXG4gIGRyYWdnZWQ6IGJvb2xlYW4sXG4gIHg6IG51bWJlciwgeTogbnVtYmVyLFxuICBzbGFja1g6IG51bWJlciwgc2xhY2tZOiBudW1iZXIsXG4gIGlzRWxlbWVudFNWRzogYm9vbGVhbixcbiAgZm9jdXNlZDogYm9vbGVhblxufTtcblxuZXhwb3J0IHR5cGUgRHJhZ2dhYmxlUHJvcHMgPSB7XG4gIC4uLiRFeGFjdDxEcmFnZ2FibGVDb3JlUHJvcHM+LFxuICBheGlzOiAnYm90aCcgfCAneCcgfCAneScgfCAnbm9uZScsXG4gIGJvdW5kczogRHJhZ2dhYmxlQm91bmRzIHwgc3RyaW5nIHwgZmFsc2UsXG4gIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyxcbiAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRDbGFzc05hbWVGb2N1c2VkOiBzdHJpbmcsXG4gIGRlZmF1bHRQb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBwb3NpdGlvbjogQ29udHJvbFBvc2l0aW9uLFxuICBvbktleVVwOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25LZXlNb3ZlOiBQcm9wVHlwZXMuZnVuYyxcbiAga2V5TW92ZUVuYWJsZWQ6IGJvb2xlYW4sXG4gIGtleU1vdmVTcGVlZDogbnVtYmVyLFxuICBrZXlNb3ZlU2hpZnRTdGVwTGVuZ3RoOiBudW1iZXIsXG4gIGRlZ3JlZTogbnVtYmVyLFxuICBvbk1vdmVTbmFwOiBQcm9wVHlwZXMuZnVuY1xufTtcblxuLy9cbi8vIERlZmluZSA8RHJhZ2dhYmxlPlxuLy9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhZ2dhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PERyYWdnYWJsZVByb3BzLCBEcmFnZ2FibGVTdGF0ZT4ge1xuXG4gIHN0YXRpYyBkaXNwbGF5TmFtZSA9ICdEcmFnZ2FibGUnO1xuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgLy8gQWNjZXB0cyBhbGwgcHJvcHMgPERyYWdnYWJsZUNvcmU+IGFjY2VwdHMuXG4gICAgLi4uRHJhZ2dhYmxlQ29yZS5wcm9wVHlwZXMsXG5cbiAgICAvKipcbiAgICAgKiBgYXhpc2AgZGV0ZXJtaW5lcyB3aGljaCBheGlzIHRoZSBkcmFnZ2FibGUgY2FuIG1vdmUuXG4gICAgICpcbiAgICAgKiAgTm90ZSB0aGF0IGFsbCBjYWxsYmFja3Mgd2lsbCBzdGlsbCByZXR1cm4gZGF0YSBhcyBub3JtYWwuIFRoaXMgb25seVxuICAgICAqICBjb250cm9scyBmbHVzaGluZyB0byB0aGUgRE9NLlxuICAgICAqXG4gICAgICogJ2JvdGgnIGFsbG93cyBtb3ZlbWVudCBob3Jpem9udGFsbHkgYW5kIHZlcnRpY2FsbHkuXG4gICAgICogJ3gnIGxpbWl0cyBtb3ZlbWVudCB0byBob3Jpem9udGFsIGF4aXMuXG4gICAgICogJ3knIGxpbWl0cyBtb3ZlbWVudCB0byB2ZXJ0aWNhbCBheGlzLlxuICAgICAqICdub25lJyBsaW1pdHMgYWxsIG1vdmVtZW50LlxuICAgICAqXG4gICAgICogRGVmYXVsdHMgdG8gJ2JvdGgnLlxuICAgICAqL1xuICAgIGF4aXM6IFByb3BUeXBlcy5vbmVPZihbJ2JvdGgnLCAneCcsICd5JywgJ25vbmUnXSksXG5cbiAgICAvKipcbiAgICAgKiBgYm91bmRzYCBkZXRlcm1pbmVzIHRoZSByYW5nZSBvZiBtb3ZlbWVudCBhdmFpbGFibGUgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogQXZhaWxhYmxlIHZhbHVlcyBhcmU6XG4gICAgICpcbiAgICAgKiAncGFyZW50JyByZXN0cmljdHMgbW92ZW1lbnQgd2l0aGluIHRoZSBEcmFnZ2FibGUncyBwYXJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEFsdGVybmF0aXZlbHksIHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIGZvbGxvd2luZyBwcm9wZXJ0aWVzLCBhbGwgb2Ygd2hpY2ggYXJlIG9wdGlvbmFsOlxuICAgICAqXG4gICAgICoge2xlZnQ6IExFRlRfQk9VTkQsIHJpZ2h0OiBSSUdIVF9CT1VORCwgYm90dG9tOiBCT1RUT01fQk9VTkQsIHRvcDogVE9QX0JPVU5EfVxuICAgICAqXG4gICAgICogQWxsIHZhbHVlcyBhcmUgaW4gcHguXG4gICAgICpcbiAgICAgKiBFeGFtcGxlOlxuICAgICAqXG4gICAgICogYGBganN4XG4gICAgICogICBsZXQgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgICAqICAgICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAqICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgIDxEcmFnZ2FibGUgYm91bmRzPXt7cmlnaHQ6IDMwMCwgYm90dG9tOiAzMDB9fT5cbiAgICAgKiAgICAgICAgICAgICAgPGRpdj5Db250ZW50PC9kaXY+XG4gICAgICogICAgICAgICAgIDwvRHJhZ2dhYmxlPlxuICAgICAqICAgICAgICAgKTtcbiAgICAgKiAgICAgICB9XG4gICAgICogICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBib3VuZHM6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgICAgUHJvcFR5cGVzLnNoYXBlKHtcbiAgICAgICAgbGVmdDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgcmlnaHQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIHRvcDogUHJvcFR5cGVzLm51bWJlcixcbiAgICAgICAgYm90dG9tOiBQcm9wVHlwZXMubnVtYmVyXG4gICAgICB9KSxcbiAgICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICBQcm9wVHlwZXMub25lT2YoW2ZhbHNlXSlcbiAgICBdKSxcblxuICAgIGRlZmF1bHRDbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2VkOiBQcm9wVHlwZXMuc3RyaW5nLFxuXG4gICAgLyoqXG4gICAgICogYGRlZmF1bHRQb3NpdGlvbmAgc3BlY2lmaWVzIHRoZSB4IGFuZCB5IHRoYXQgdGhlIGRyYWdnZWQgaXRlbSBzaG91bGQgc3RhcnQgYXRcbiAgICAgKlxuICAgICAqIEV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGBqc3hcbiAgICAgKiAgICAgIGxldCBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgICogICAgICAgICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICogICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICogICAgICAgICAgICAgICAgICA8RHJhZ2dhYmxlIGRlZmF1bHRQb3NpdGlvbj17e3g6IDI1LCB5OiAyNX19PlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIDxkaXY+SSBzdGFydCB3aXRoIHRyYW5zZm9ybVg6IDI1cHggYW5kIHRyYW5zZm9ybVk6IDI1cHg7PC9kaXY+XG4gICAgICogICAgICAgICAgICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICAgKiAgICAgICAgICAgICAgKTtcbiAgICAgKiAgICAgICAgICB9XG4gICAgICogICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBkZWZhdWx0UG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogYHBvc2l0aW9uYCwgaWYgcHJlc2VudCwgZGVmaW5lcyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqICBUaGlzIGlzIHNpbWlsYXIgdG8gaG93IGZvcm0gZWxlbWVudHMgaW4gUmVhY3Qgd29yayAtIGlmIG5vIGBwb3NpdGlvbmAgaXMgc3VwcGxpZWQsIHRoZSBjb21wb25lbnRcbiAgICAgKiAgaXMgdW5jb250cm9sbGVkLlxuICAgICAqXG4gICAgICogRXhhbXBsZTpcbiAgICAgKlxuICAgICAqIGBgYGpzeFxuICAgICAqICAgICAgbGV0IEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICAgKiAgICAgICAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgKiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgKiAgICAgICAgICAgICAgICAgIDxEcmFnZ2FibGUgcG9zaXRpb249e3t4OiAyNSwgeTogMjV9fT5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICA8ZGl2Pkkgc3RhcnQgd2l0aCB0cmFuc2Zvcm1YOiAyNXB4IGFuZCB0cmFuc2Zvcm1ZOiAyNXB4OzwvZGl2PlxuICAgICAqICAgICAgICAgICAgICAgICAgPC9EcmFnZ2FibGU+XG4gICAgICogICAgICAgICAgICAgICk7XG4gICAgICogICAgICAgICAgfVxuICAgICAqICAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgcG9zaXRpb246IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgICB4OiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgeTogUHJvcFR5cGVzLm51bWJlclxuICAgIH0pLFxuXG4gICAgLyoqXG4gICAgICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgYmUgZGVmaW5lZCBvbiB0aGUgY2hpbGQsIG5vdCBoZXJlLlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogZG9udFNldE1lLFxuICAgIHN0eWxlOiBkb250U2V0TWUsXG4gICAgdHJhbnNmb3JtOiBkb250U2V0TWUsXG4gICAgb25LZXlVcDogUHJvcFR5cGVzLmZ1bmMsXG4gICAgb25LZXlEb3duOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbktleU1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uTW92ZVNuYXA6IFByb3BUeXBlcy5mdW5jLFxuICAgIGtleU1vdmVFbmFibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgICBrZXlNb3ZlU3BlZWQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAga2V5TW92ZVNoaWZ0U3RlcExlbmd0aDogUHJvcFR5cGVzLm51bWJlcixcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIC4uLkRyYWdnYWJsZUNvcmUuZGVmYXVsdFByb3BzLFxuICAgIGF4aXM6ICdib3RoJyxcbiAgICBib3VuZHM6IGZhbHNlLFxuICAgIGRlZmF1bHRDbGFzc05hbWU6ICdyZWFjdC1kcmFnZ2FibGUnLFxuICAgIGRlZmF1bHRDbGFzc05hbWVEcmFnZ2luZzogJ3JlYWN0LWRyYWdnYWJsZS1kcmFnZ2luZycsXG4gICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZHJhZ2dlZCcsXG4gICAgZGVmYXVsdENsYXNzTmFtZUZvY3VzZWQ6ICdyZWFjdC1kcmFnZ2FibGUtZm9jdXNlZCcsXG4gICAgZGVmYXVsdFBvc2l0aW9uOiB7IHg6IDAsIHk6IDAgfSxcbiAgICBwb3NpdGlvbjogbnVsbCxcbiAgICBvbktleVVwOiBmdW5jdGlvbigpIHsgfSxcbiAgICBvbktleURvd246IGZ1bmN0aW9uKCkgeyB9LFxuICAgIG9uS2V5TW92ZTogZnVuY3Rpb24oKSB7IH0sXG4gICAgb25Nb3ZlU25hcDogZnVuY3Rpb24oKSB7IH0sXG4gICAga2V5TW92ZUVuYWJsZWQ6IHRydWUsXG4gICAga2V5TW92ZVNwZWVkOiAyNTAsXG4gICAga2V5TW92ZVNoaWZ0U3RlcExlbmd0aDogMTBcbiAgfTtcblxuICBhdXRvU3RlcFRpbWVyID0gbnVsbDtcbiAgc3RlcExlbmd0aCA9IDE7XG5cbiAgY29uc3RydWN0b3IocHJvcHM6IERyYWdnYWJsZVByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcuXG4gICAgICBkcmFnZ2luZzogZmFsc2UsXG5cbiAgICAgIC8vIFdoZXRoZXIgb3Igbm90IHdlIGhhdmUgYmVlbiBkcmFnZ2VkIGJlZm9yZS5cbiAgICAgIGRyYWdnZWQ6IGZhbHNlLFxuXG4gICAgICAvLyBDdXJyZW50IHRyYW5zZm9ybSB4IGFuZCB5LlxuICAgICAgeDogcHJvcHMucG9zaXRpb24gPyBwcm9wcy5wb3NpdGlvbi54IDogcHJvcHMuZGVmYXVsdFBvc2l0aW9uLngsXG4gICAgICB5OiBwcm9wcy5wb3NpdGlvbiA/IHByb3BzLnBvc2l0aW9uLnkgOiBwcm9wcy5kZWZhdWx0UG9zaXRpb24ueSxcblxuICAgICAgLy8gVXNlZCBmb3IgY29tcGVuc2F0aW5nIGZvciBvdXQtb2YtYm91bmRzIGRyYWdzXG4gICAgICBzbGFja1g6IDAsIHNsYWNrWTogMCxcblxuICAgICAgLy8gQ2FuIG9ubHkgZGV0ZXJtaW5lIGlmIFNWRyBhZnRlciBtb3VudGluZ1xuICAgICAgaXNFbGVtZW50U1ZHOiBmYWxzZSxcblxuICAgICAgZm9jdXNlZDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgY29tcG9uZW50V2lsbE1vdW50KCkge1xuICAgIGlmICh0aGlzLnByb3BzLnBvc2l0aW9uICYmICEodGhpcy5wcm9wcy5vbkRyYWcgfHwgdGhpcy5wcm9wcy5vblN0b3ApKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGNvbnNvbGUud2FybignQSBgcG9zaXRpb25gIHdhcyBhcHBsaWVkIHRvIHRoaXMgPERyYWdnYWJsZT4sIHdpdGhvdXQgZHJhZyBoYW5kbGVycy4gVGhpcyB3aWxsIG1ha2UgdGhpcyAnICtcbiAgICAgICAgJ2NvbXBvbmVudCBlZmZlY3RpdmVseSB1bmRyYWdnYWJsZS4gUGxlYXNlIGF0dGFjaCBgb25EcmFnYCBvciBgb25TdG9wYCBoYW5kbGVycyBzbyB5b3UgY2FuIGFkanVzdCB0aGUgJyArXG4gICAgICAgICdgcG9zaXRpb25gIG9mIHRoaXMgZWxlbWVudC4nKTtcbiAgICB9XG4gICAgdGhpcy5zdG9wTW92ZSgpO1xuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIHRoZSBlbGVtZW50IHBhc3NlZCBpcyBhbiBpbnN0YW5jZW9mIFNWR0VsZW1lbnRcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5TVkdFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzKSBpbnN0YW5jZW9mIHdpbmRvdy5TVkdFbGVtZW50KSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgaXNFbGVtZW50U1ZHOiB0cnVlIH0pO1xuICAgIH1cbiAgICB0aGlzLnN0b3BNb3ZlKCk7XG4gIH1cblxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogT2JqZWN0KSB7XG4gICAgLy8gU2V0IHgveSBpZiBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICAgIGlmIChuZXh0UHJvcHMucG9zaXRpb24gJiZcbiAgICAgICghdGhpcy5wcm9wcy5wb3NpdGlvbiB8fFxuICAgICAgICBuZXh0UHJvcHMucG9zaXRpb24ueCAhPT0gdGhpcy5wcm9wcy5wb3NpdGlvbi54IHx8XG4gICAgICAgIG5leHRQcm9wcy5wb3NpdGlvbi55ICE9PSB0aGlzLnByb3BzLnBvc2l0aW9uLnlcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB4OiBuZXh0UHJvcHMucG9zaXRpb24ueCwgeTogbmV4dFByb3BzLnBvc2l0aW9uLnkgfSk7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRyYWdnaW5nOiBmYWxzZSB9KTsgLy8gcHJldmVudHMgaW52YXJpYW50IGlmIHVubW91bnRlZCB3aGlsZSBkcmFnZ2luZ1xuICB9XG5cbiAgb25EcmFnU3RhcnQ6IERyYWdnYWJsZUV2ZW50SGFuZGxlciA9IChlLCBjb3JlRGF0YSkgPT4ge1xuICAgIC8vIGxvZygnRHJhZ2dhYmxlOiBvbkRyYWdTdGFydDogJWonLCBjb3JlRGF0YSk7XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkU3RhcnQgPSB0aGlzLnByb3BzLm9uU3RhcnQoZSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSkpO1xuICAgIC8vIEtpbGxzIHN0YXJ0IGV2ZW50IG9uIGNvcmUgYXMgd2VsbCwgc28gbW92ZSBoYW5kbGVycyBhcmUgbmV2ZXIgYm91bmQuXG4gICAgaWYgKHNob3VsZFN0YXJ0ID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRyYWdnaW5nOiB0cnVlLCBkcmFnZ2VkOiB0cnVlIH0pO1xuICB9O1xuXG4gIG9uRHJhZzogRHJhZ2dhYmxlRXZlbnRIYW5kbGVyID0gKGUsIGNvcmVEYXRhKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLmRyYWdnaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgLy8gbG9nKCdEcmFnZ2FibGU6IG9uRHJhZzogJWonLCBjb3JlRGF0YSk7XG4gICAgY29uc3QgdWlEYXRhID0gY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSk7XG4gICAgY29uc3QgbmV3U3RhdGU6ICRTaGFwZTxEcmFnZ2FibGVTdGF0ZT4gPSB7XG4gICAgICB4OiB1aURhdGEueCxcbiAgICAgIHk6IHVpRGF0YS55XG4gICAgfTtcblxuICAgIC8vIEtlZXAgd2l0aGluIGJvdW5kcy5cbiAgICBpZiAodGhpcy5wcm9wcy5ib3VuZHMpIHtcbiAgICAgIC8vIFNhdmUgb3JpZ2luYWwgeCBhbmQgeS5cbiAgICAgIGNvbnN0IHsgeCwgeSB9ID0gbmV3U3RhdGU7XG5cbiAgICAgIC8vIEFkZCBzbGFjayB0byB0aGUgdmFsdWVzIHVzZWQgdG8gY2FsY3VsYXRlIGJvdW5kIHBvc2l0aW9uLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgaWZcbiAgICAgIC8vIHdlIHN0YXJ0IHJlbW92aW5nIHNsYWNrLCB0aGUgZWxlbWVudCB3b24ndCByZWFjdCB0byBpdCByaWdodCBhd2F5IHVudGlsIGl0J3MgYmVlblxuICAgICAgLy8gY29tcGxldGVseSByZW1vdmVkLlxuICAgICAgbmV3U3RhdGUueCArPSB0aGlzLnN0YXRlLnNsYWNrWDtcbiAgICAgIG5ld1N0YXRlLnkgKz0gdGhpcy5zdGF0ZS5zbGFja1k7XG5cbiAgICAgIC8vIEdldCBib3VuZCBwb3NpdGlvbi4gVGhpcyB3aWxsIGNlaWwvZmxvb3IgdGhlIHggYW5kIHkgd2l0aGluIHRoZSBib3VuZGFyaWVzLlxuICAgICAgY29uc3QgW25ld1N0YXRlWCwgbmV3U3RhdGVZXSA9IGdldEJvdW5kUG9zaXRpb24odGhpcywgbmV3U3RhdGUueCwgbmV3U3RhdGUueSk7XG4gICAgICBuZXdTdGF0ZS54ID0gbmV3U3RhdGVYO1xuICAgICAgbmV3U3RhdGUueSA9IG5ld1N0YXRlWTtcblxuICAgICAgLy8gUmVjYWxjdWxhdGUgc2xhY2sgYnkgbm90aW5nIGhvdyBtdWNoIHdhcyBzaGF2ZWQgYnkgdGhlIGJvdW5kUG9zaXRpb24gaGFuZGxlci5cbiAgICAgIG5ld1N0YXRlLnNsYWNrWCA9IHRoaXMuc3RhdGUuc2xhY2tYICsgKHggLSBuZXdTdGF0ZS54KTtcbiAgICAgIG5ld1N0YXRlLnNsYWNrWSA9IHRoaXMuc3RhdGUuc2xhY2tZICsgKHkgLSBuZXdTdGF0ZS55KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBldmVudCB3ZSBmaXJlIHRvIHJlZmxlY3Qgd2hhdCByZWFsbHkgaGFwcGVuZWQgYWZ0ZXIgYm91bmRzIHRvb2sgZWZmZWN0LlxuICAgICAgdWlEYXRhLnggPSBuZXdTdGF0ZS54O1xuICAgICAgdWlEYXRhLnkgPSBuZXdTdGF0ZS55O1xuICAgICAgdWlEYXRhLmRlbHRhWCA9IG5ld1N0YXRlLnggLSB0aGlzLnN0YXRlLng7XG4gICAgICB1aURhdGEuZGVsdGFZID0gbmV3U3RhdGUueSAtIHRoaXMuc3RhdGUueTtcbiAgICB9XG5cbiAgICAvLyBTaG9ydC1jaXJjdWl0IGlmIHVzZXIncyBjYWxsYmFjayBraWxsZWQgaXQuXG4gICAgY29uc3Qgc2hvdWxkVXBkYXRlID0gdGhpcy5wcm9wcy5vbkRyYWcoZSwgdWlEYXRhKTtcbiAgICBpZiAoc2hvdWxkVXBkYXRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gbG9nKCdvbkRyYWcgbmV3U3RhdGUnLCBuZXdTdGF0ZSlcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfTtcblxuICBvbkRyYWdTdG9wOiBEcmFnZ2FibGVFdmVudEhhbmRsZXIgPSAoZSwgY29yZURhdGEpID0+IHtcbiAgICBpZiAoIXRoaXMuc3RhdGUuZHJhZ2dpbmcpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFNob3J0LWNpcmN1aXQgaWYgdXNlcidzIGNhbGxiYWNrIGtpbGxlZCBpdC5cbiAgICBjb25zdCBzaG91bGRTdG9wID0gdGhpcy5wcm9wcy5vblN0b3AoZSwgY3JlYXRlRHJhZ2dhYmxlRGF0YSh0aGlzLCBjb3JlRGF0YSkpO1xuICAgIGlmIChzaG91bGRTdG9wID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gbG9nKCdEcmFnZ2FibGU6IG9uRHJhZ1N0b3A6ICVqJywgY29yZURhdGEpO1xuXG4gICAgY29uc3QgbmV3U3RhdGU6ICRTaGFwZTxEcmFnZ2FibGVTdGF0ZT4gPSB7XG4gICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICBzbGFja1g6IDAsXG4gICAgICBzbGFja1k6IDBcbiAgICB9O1xuXG4gICAgLy8gSWYgdGhpcyBpcyBhIGNvbnRyb2xsZWQgY29tcG9uZW50LCB0aGUgcmVzdWx0IG9mIHRoaXMgb3BlcmF0aW9uIHdpbGwgYmUgdG9cbiAgICAvLyByZXZlcnQgYmFjayB0byB0aGUgb2xkIHBvc2l0aW9uLiBXZSBleHBlY3QgYSBoYW5kbGVyIG9uIGBvbkRyYWdTdG9wYCwgYXQgdGhlIGxlYXN0LlxuICAgIGNvbnN0IGNvbnRyb2xsZWQgPSBCb29sZWFuKHRoaXMucHJvcHMucG9zaXRpb24pO1xuICAgIGlmIChjb250cm9sbGVkKSB7XG4gICAgICBjb25zdCB7IHgsIHkgfSA9IHRoaXMucHJvcHMucG9zaXRpb247XG4gICAgICBuZXdTdGF0ZS54ID0geDtcbiAgICAgIG5ld1N0YXRlLnkgPSB5O1xuICAgIH1cbiAgICBsb2coJ29uRHJhZ1N0b3AgbmV3U3RhdGUnLCBuZXdTdGF0ZSlcbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKTtcbiAgfTtcbiAgc3RvcE1vdmU6IGFueSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5hdXRvU3RlcFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5hdXRvU3RlcFRpbWVyKTtcbiAgICB9XG4gIH1cbiAgb25LZXlNb3ZlOiBhbnkgPSAoZSkgPT4ge1xuICAgIHRoaXMuc3RvcE1vdmUoKTtcbiAgICBpZiAoZSAmJiAoZS5rZXlDb2RlID09PSAzNyB8fCBlLmtleUNvZGUgPT09IDM4IHx8IGUua2V5Q29kZSA9PT0gMzkgfHwgZS5rZXlDb2RlID09PSA0MCkpIHtcbiAgICAgIGlmIChlLnBlcnNpc3QpIHtcbiAgICAgICAgZS5wZXJzaXN0KClcbiAgICAgIH1cbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgY29uc3QgeyB4LCB5IH0gPSB0aGlzLnN0YXRlO1xuICAgICAgbGV0IF94ID0geDtcbiAgICAgIGxldCBfeSA9IHk7XG4gICAgICAvLyBsb2coJ29uS2V5VXAnLCBlLmtleUNvZGUpXG4gICAgICAvLyBsb2coJ29uS2V5VXAnLCBlLmtleUNvZGUsIHRoaXMuc3RhdGUpXG4gICAgICBzd2l0Y2ggKGUua2V5Q29kZSkge1xuICAgICAgICAvLyDlt6ZcbiAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICBfeCAtPSB0aGlzLnN0ZXBMZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIC8vIOS4ilxuICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgIF95IC09IHRoaXMuc3RlcExlbmd0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgLy8g5Y+zXG4gICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgX3ggKz0gdGhpcy5zdGVwTGVuZ3RoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICAvLyDkuItcbiAgICAgICAgY2FzZSA0MDpcbiAgICAgICAgICBfeSArPSB0aGlzLnN0ZXBMZW5ndGg7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IHsgeDogX3gsIHk6IF95IH1cbiAgICAgIHRoaXMuc2V0U3RhdGUocG9zaXRpb24pO1xuICAgICAgaWYgKHRoaXMucHJvcHMub25LZXlNb3ZlKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25LZXlNb3ZlKGUsIHBvc2l0aW9uKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuYXV0b1N0ZXBUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLm9uS2V5TW92ZShlKVxuICAgICAgfSwgdGhpcy5wcm9wcy5rZXlNb3ZlU3BlZWQpO1xuICAgIH1cbiAgfVxuICBvbktleVVwOiBhbnkgPSAoZSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmtleU1vdmVFbmFibGVkICYmICF0aGlzLnByb3BzLmRpc2FibGVkKSB7XG4gICAgICBpZiAoZS5rZXlDb2RlID09PSAxNikge1xuICAgICAgICB0aGlzLnN0ZXBMZW5ndGggPSAxO1xuICAgICAgfVxuICAgICAgLy8gdGhpcy5vbktleU1vdmUoZSlcbiAgICAgIHRoaXMuc3RvcE1vdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uS2V5VXAoZSk7XG4gIH07XG4gIG9uS2V5RG93bjogYW55ID0gKGUpID0+IHtcbiAgICBpZiAodGhpcy5wcm9wcy5rZXlNb3ZlRW5hYmxlZCAmJiAhdGhpcy5wcm9wcy5kaXNhYmxlZCkge1xuICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTYpIHtcbiAgICAgICAgdGhpcy5zdGVwTGVuZ3RoID0gdGhpcy5wcm9wcy5rZXlNb3ZlU2hpZnRTdGVwTGVuZ3RoO1xuICAgICAgfVxuICAgICAgdGhpcy5vbktleU1vdmUoZSlcbiAgICAgIHRoaXMuc3RvcE1vdmUoKTtcbiAgICB9XG5cbiAgICB0aGlzLnByb3BzLm9uS2V5RG93bihlKTtcbiAgfVxuICBtb3ZlU25hcGluZzogYW55ID0gKHNuYXAgPSB7fSkgPT4ge1xuICAgIGNvbnN0IHsgeERpc3RhbmNlLCB5RGlzdGFuY2UsIHNuYXBUcmVzaGhvbGQgfSA9IHNuYXA7XG5cbiAgICBsb2coJ3gseScsIHhEaXN0YW5jZSwgeURpc3RhbmNlKVxuXG4gICAgaWYgKHhEaXN0YW5jZSAmJiBNYXRoLmFicyh4RGlzdGFuY2UpIDw9IHNuYXBUcmVzaGhvbGQpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyB4OiB0aGlzLnN0YXRlLnggKyB4RGlzdGFuY2UgfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnByb3BzLm9uTW92ZVNuYXAoeyAuLi50aGlzLnN0YXRlIH0pXG4gICAgICAgIGxvZygndGhpcy5zdGF0ZScsIHRoaXMuc3RhdGUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGlmICh5RGlzdGFuY2UgJiYgTWF0aC5hYnMoeURpc3RhbmNlKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgeTogdGhpcy5zdGF0ZS55ICsgeURpc3RhbmNlIH0sICgpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbk1vdmVTbmFwKHsgLi4udGhpcy5zdGF0ZSB9KVxuICAgICAgICBsb2coJ3RoaXMuc3RhdGUnLCB0aGlzLnN0YXRlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgZ2V0IHBvc2l0aW9uUm90YXRlKCk6IGFueSB7XG4gICAgY29uc3QgY29udHJvbGxlZCA9IEJvb2xlYW4odGhpcy5wcm9wcy5wb3NpdGlvbik7XG4gICAgY29uc3QgZHJhZ2dhYmxlID0gIWNvbnRyb2xsZWQgfHwgdGhpcy5zdGF0ZS5kcmFnZ2luZztcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMucHJvcHMucG9zaXRpb24gfHwgdGhpcy5wcm9wcy5kZWZhdWx0UG9zaXRpb247XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IGNhbkRyYWdYKHRoaXMpICYmIGRyYWdnYWJsZSA/XG4gICAgICAgIHRoaXMuc3RhdGUueCA6XG4gICAgICAgIHBvc2l0aW9uLngsXG5cbiAgICAgIC8vIFNldCB0b3AgaWYgdmVydGljYWwgZHJhZyBpcyBlbmFibGVkXG4gICAgICB5OiBjYW5EcmFnWSh0aGlzKSAmJiBkcmFnZ2FibGUgP1xuICAgICAgICB0aGlzLnN0YXRlLnkgOlxuICAgICAgICBwb3NpdGlvbi55LFxuICAgICAgZGVncmVlOiBOdW1iZXIodGhpcy5wcm9wcy5kZWdyZWUpIHx8IDBcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCk6IFJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICBsZXQgc3R5bGUgPSB7fSwgc3ZnVHJhbnNmb3JtID0gbnVsbDtcblxuICAgIC8vIElmIHRoaXMgaXMgY29udHJvbGxlZCwgd2UgZG9uJ3Qgd2FudCB0byBtb3ZlIGl0IC0gdW5sZXNzIGl0J3MgZHJhZ2dpbmcuXG4gICAgY29uc3QgdHJhbnNmb3JtT3B0cyA9IHRoaXMucG9zaXRpb25Sb3RhdGU7XG4gICAgLy8gbG9nKCdyZW5kZXIgdHJhbnNmb3JtT3B0cycsIHRyYW5zZm9ybU9wdHMpO1xuICAgIC8vIElmIHRoaXMgZWxlbWVudCB3YXMgU1ZHLCB3ZSB1c2UgdGhlIGB0cmFuc2Zvcm1gIGF0dHJpYnV0ZS5cbiAgICBpZiAodGhpcy5zdGF0ZS5pc0VsZW1lbnRTVkcpIHtcbiAgICAgIHN2Z1RyYW5zZm9ybSA9IGNyZWF0ZVNWR1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQWRkIGEgQ1NTIHRyYW5zZm9ybSB0byBtb3ZlIHRoZSBlbGVtZW50IGFyb3VuZC4gVGhpcyBhbGxvd3MgdXMgdG8gbW92ZSB0aGUgZWxlbWVudCBhcm91bmRcbiAgICAgIC8vIHdpdGhvdXQgd29ycnlpbmcgYWJvdXQgd2hldGhlciBvciBub3QgaXQgaXMgcmVsYXRpdmVseSBvciBhYnNvbHV0ZWx5IHBvc2l0aW9uZWQuXG4gICAgICAvLyBJZiB0aGUgaXRlbSB5b3UgYXJlIGRyYWdnaW5nIGFscmVhZHkgaGFzIGEgdHJhbnNmb3JtIHNldCwgd3JhcCBpdCBpbiBhIDxzcGFuPiBzbyA8RHJhZ2dhYmxlPlxuICAgICAgLy8gaGFzIGEgY2xlYW4gc2xhdGUuXG4gICAgICBzdHlsZSA9IGNyZWF0ZUNTU1RyYW5zZm9ybSh0cmFuc2Zvcm1PcHRzKTtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nLFxuICAgICAgZGVmYXVsdENsYXNzTmFtZURyYWdnZWQsXG4gICAgICBkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gTWFyayB3aXRoIGNsYXNzIHdoaWxlIGRyYWdnaW5nXG4gICAgY29uc3QgY2xhc3NOYW1lID0gY2xhc3NOYW1lcygodGhpcy5wcm9wcy5jaGlsZHJlbi5wcm9wcy5jbGFzc05hbWUgfHwgJycpLCBkZWZhdWx0Q2xhc3NOYW1lLCB7XG4gICAgICBbZGVmYXVsdENsYXNzTmFtZURyYWdnaW5nXTogdGhpcy5zdGF0ZS5kcmFnZ2luZyxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRHJhZ2dlZF06IHRoaXMuc3RhdGUuZHJhZ2dlZCxcbiAgICAgIFtkZWZhdWx0Q2xhc3NOYW1lRm9jdXNlZF06IHRoaXMuc3RhdGUuZm9jdXNlZFxuICAgIH0pO1xuXG4gICAgLy8gUmV1c2UgdGhlIGNoaWxkIHByb3ZpZGVkXG4gICAgLy8gVGhpcyBtYWtlcyBpdCBmbGV4aWJsZSB0byB1c2Ugd2hhdGV2ZXIgZWxlbWVudCBpcyB3YW50ZWQgKGRpdiwgdWwsIGV0YylcbiAgICByZXR1cm4gKFxuICAgICAgPERyYWdnYWJsZUNvcmVcbiAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgIG9uU3RhcnQ9e3RoaXMub25EcmFnU3RhcnR9XG4gICAgICAgIG9uRHJhZz17dGhpcy5vbkRyYWd9XG4gICAgICAgIG9uU3RvcD17dGhpcy5vbkRyYWdTdG9wfVxuICAgICAgICBvbktleVVwPXt0aGlzLm9uS2V5VXB9XG4gICAgICAgIG9uS2V5RG93bj17dGhpcy5vbktleURvd259ID5cbiAgICAgICAge1xuICAgICAgICAgIFJlYWN0LmNsb25lRWxlbWVudChSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pLCB7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgICAgIHN0eWxlOiB7IC4uLnRoaXMucHJvcHMuY2hpbGRyZW4ucHJvcHMuc3R5bGUsIC4uLnN0eWxlIH0sXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHN2Z1RyYW5zZm9ybSxcbiAgICAgICAgICAgIHRhYkluZGV4OiAtMSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA8L0RyYWdnYWJsZUNvcmU+XG4gICAgKTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZS5qcyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbnZhciBjaGVja1Byb3BUeXBlcyA9IHJlcXVpcmUoJy4vY2hlY2tQcm9wVHlwZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc1ZhbGlkRWxlbWVudCwgdGhyb3dPbkRpcmVjdEFjY2Vzcykge1xuICAvKiBnbG9iYWwgU3ltYm9sICovXG4gIHZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbiAgdmFyIEZBVVhfSVRFUkFUT1JfU1lNQk9MID0gJ0BAaXRlcmF0b3InOyAvLyBCZWZvcmUgU3ltYm9sIHNwZWMuXG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAgICpcbiAgICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gICAqXG4gICAqICAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obXlJdGVyYWJsZSk7XG4gICAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gICAqICAgICAgIC4uLlxuICAgKiAgICAgfVxuICAgKlxuICAgKiBAcGFyYW0gez9vYmplY3R9IG1heWJlSXRlcmFibGVcbiAgICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvckZuO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICAgKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICAgKlxuICAgKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gICAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICogICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gICAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gICAqXG4gICAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAgICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICAgKlxuICAgKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAgICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICAgKiAgICAgfSxcbiAgICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gICAqICAgfSk7XG4gICAqXG4gICAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAgICpcbiAgICogICB0eXBlIDo9IGFycmF5fGJvb2x8ZnVuY3xvYmplY3R8bnVtYmVyfHN0cmluZ3xvbmVPZihbLi4uXSl8aW5zdGFuY2VPZiguLi4pXG4gICAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICAgKlxuICAgKiBFYWNoIGFuZCBldmVyeSBkZWNsYXJhdGlvbiBwcm9kdWNlcyBhIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgc2lnbmF0dXJlLiBUaGlzXG4gICAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAgICpcbiAgICogIHZhciBNeUxpbmsgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAqICAgIHByb3BUeXBlczoge1xuICAgKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAgICogICAgICBocmVmOiBmdW5jdGlvbihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUpIHtcbiAgICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAgICogICAgICAgICAgICAhKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFVSSSkpIHtcbiAgICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICAgKiAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICogICAgICAgICAgKTtcbiAgICogICAgICAgIH1cbiAgICogICAgICB9XG4gICAqICAgIH0sXG4gICAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICAgKiAgfSk7XG4gICAqXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cblxuICB2YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG4gIC8vIEltcG9ydGFudCFcbiAgLy8gS2VlcCB0aGlzIGxpc3QgaW4gc3luYyB3aXRoIHByb2R1Y3Rpb24gdmVyc2lvbiBpbiBgLi9mYWN0b3J5V2l0aFRocm93aW5nU2hpbXMuanNgLlxuICB2YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gICAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICAgIGJvb2w6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdib29sZWFuJyksXG4gICAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gICAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gICAgb2JqZWN0OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignb2JqZWN0JyksXG4gICAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gICAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgICBhbnk6IGNyZWF0ZUFueVR5cGVDaGVja2VyKCksXG4gICAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICAgIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICAgIGluc3RhbmNlT2Y6IGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIsXG4gICAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgICBvbmVPZjogY3JlYXRlRW51bVR5cGVDaGVja2VyLFxuICAgIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcixcbiAgICBleGFjdDogY3JlYXRlU3RyaWN0U2hhcGVUeXBlQ2hlY2tlcixcbiAgfTtcblxuICAvKipcbiAgICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAgICovXG4gIC8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbiAgZnVuY3Rpb24gaXMoeCwgeSkge1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICBpZiAoeCA9PT0geSkge1xuICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTdGVwIDYuYTogTmFOID09IE5hTlxuICAgICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgICB9XG4gIH1cbiAgLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbiAgLyoqXG4gICAqIFdlIHVzZSBhbiBFcnJvci1saWtlIG9iamVjdCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhcyBwZW9wbGUgbWF5IGNhbGxcbiAgICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciwgd2UgZG9uJ3QgdXNlIHJlYWxcbiAgICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICAgKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gICAqIGhhcHBlbnMgaW4gb25lT2ZUeXBlKCkgZm9yIGFueSB0eXBlIGJlZm9yZSB0aGUgb25lIHRoYXQgbWF0Y2hlZC5cbiAgICovXG4gIGZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5zdGFjayA9ICcnO1xuICB9XG4gIC8vIE1ha2UgYGluc3RhbmNlb2YgRXJyb3JgIHN0aWxsIHdvcmsgZm9yIHJldHVybmVkIGVycm9ycy5cbiAgUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbiAgZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gICAgICB2YXIgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQgPSAwO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUoaXNSZXF1aXJlZCwgcHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcblxuICAgICAgaWYgKHNlY3JldCAhPT0gUmVhY3RQcm9wVHlwZXNTZWNyZXQpIHtcbiAgICAgICAgaWYgKHRocm93T25EaXJlY3RBY2Nlc3MpIHtcbiAgICAgICAgICAvLyBOZXcgYmVoYXZpb3Igb25seSBmb3IgdXNlcnMgb2YgYHByb3AtdHlwZXNgIHBhY2thZ2VcbiAgICAgICAgICBpbnZhcmlhbnQoXG4gICAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAgICdDYWxsaW5nIFByb3BUeXBlcyB2YWxpZGF0b3JzIGRpcmVjdGx5IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICdVc2UgYFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcygpYCB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIE9sZCBiZWhhdmlvciBmb3IgcGVvcGxlIHVzaW5nIFJlYWN0LlByb3BUeXBlc1xuICAgICAgICAgIHZhciBjYWNoZUtleSA9IGNvbXBvbmVudE5hbWUgKyAnOicgKyBwcm9wTmFtZTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldICYmXG4gICAgICAgICAgICAvLyBBdm9pZCBzcGFtbWluZyB0aGUgY29uc29sZSBiZWNhdXNlIHRoZXkgYXJlIG9mdGVuIG5vdCBhY3Rpb25hYmxlIGV4Y2VwdCBmb3IgbGliIGF1dGhvcnNcbiAgICAgICAgICAgIG1hbnVhbFByb3BUeXBlV2FybmluZ0NvdW50IDwgM1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgd2FybmluZyhcbiAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAgICdZb3UgYXJlIG1hbnVhbGx5IGNhbGxpbmcgYSBSZWFjdC5Qcm9wVHlwZXMgdmFsaWRhdGlvbiAnICtcbiAgICAgICAgICAgICAgJ2Z1bmN0aW9uIGZvciB0aGUgYCVzYCBwcm9wIG9uIGAlc2AuIFRoaXMgaXMgZGVwcmVjYXRlZCAnICtcbiAgICAgICAgICAgICAgJ2FuZCB3aWxsIHRocm93IGluIHRoZSBzdGFuZGFsb25lIGBwcm9wLXR5cGVzYCBwYWNrYWdlLiAnICtcbiAgICAgICAgICAgICAgJ1lvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8gYSB0aGlyZC1wYXJ0eSBQcm9wVHlwZXMgJyArXG4gICAgICAgICAgICAgICdsaWJyYXJ5LiBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWRvbnQtY2FsbC1wcm9wdHlwZXMgJyArICdmb3IgZGV0YWlscy4nLFxuICAgICAgICAgICAgICBwcm9wRnVsbE5hbWUsXG4gICAgICAgICAgICAgIGNvbXBvbmVudE5hbWVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgbWFudWFsUHJvcFR5cGVXYXJuaW5nQ291bnQrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgICBjaGFpbmVkQ2hlY2tUeXBlLmlzUmVxdWlyZWQgPSBjaGVja1R5cGUuYmluZChudWxsLCB0cnVlKTtcblxuICAgIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoZXhwZWN0ZWRUeXBlKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgICAgLy8gYHByb3BWYWx1ZWAgYmVpbmcgaW5zdGFuY2Ugb2YsIHNheSwgZGF0ZS9yZWdleHAsIHBhc3MgdGhlICdvYmplY3QnXG4gICAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICAgIHZhciBwcmVjaXNlVHlwZSA9IGdldFByZWNpc2VUeXBlKHByb3BWYWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIoZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgICB9XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudChwcm9wVmFsdWUpKSB7XG4gICAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCEocHJvcHNbcHJvcE5hbWVdIGluc3RhbmNlb2YgZXhwZWN0ZWRDbGFzcykpIHtcbiAgICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgICAgdmFyIGFjdHVhbENsYXNzTmFtZSA9IGdldENsYXNzTmFtZShwcm9wc1twcm9wTmFtZV0pO1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShleHBlY3RlZFZhbHVlcykpIHtcbiAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbiArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICAgIH1cbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBwcm9wVHlwZSArICdgIHN1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhbiBvYmplY3QuJykpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgICBpZiAocHJvcFZhbHVlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhcnJheU9mVHlwZUNoZWNrZXJzKSkge1xuICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgICByZXR1cm4gZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAodHlwZW9mIGNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgd2FybmluZyhcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUuIEV4cGVjdGVkIGFuIGFycmF5IG9mIGNoZWNrIGZ1bmN0aW9ucywgYnV0ICcgK1xuICAgICAgICAgICdyZWNlaXZlZCAlcyBhdCBpbmRleCAlcy4nLFxuICAgICAgICAgIGdldFBvc3RmaXhGb3JUeXBlV2FybmluZyhjaGVja2VyKSxcbiAgICAgICAgICBpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICAgIGlmIChjaGVja2VyKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICAgIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdHJpY3RTaGFwZVR5cGVDaGVja2VyKHNoYXBlVHlwZXMpIHtcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgICB9XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGFsbCBrZXlzIGluIGNhc2Ugc29tZSBhcmUgcmVxdWlyZWQgYnV0IG1pc3NpbmcgZnJvbVxuICAgICAgLy8gcHJvcHMuXG4gICAgICB2YXIgYWxsS2V5cyA9IGFzc2lnbih7fSwgcHJvcHNbcHJvcE5hbWVdLCBzaGFwZVR5cGVzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBhbGxLZXlzKSB7XG4gICAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgICBpZiAoIWNoZWNrZXIpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoXG4gICAgICAgICAgICAnSW52YWxpZCAnICsgbG9jYXRpb24gKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Aga2V5IGAnICsga2V5ICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJyArXG4gICAgICAgICAgICAnXFxuQmFkIG9iamVjdDogJyArIEpTT04uc3RyaW5naWZ5KHByb3BzW3Byb3BOYW1lXSwgbnVsbCwgJyAgJykgK1xuICAgICAgICAgICAgJ1xcblZhbGlkIGtleXM6ICcgKyAgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoc2hhcGVUeXBlcyksIG51bGwsICcgICcpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyb3IgPSBjaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgICAgaWYgKGl0ZXJhdG9yRm4gIT09IHByb3BWYWx1ZS5lbnRyaWVzKSB7XG4gICAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgICB2YXIgZW50cnkgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAgIC8vIE5hdGl2ZSBTeW1ib2wuXG4gICAgaWYgKHByb3BUeXBlID09PSAnc3ltYm9sJykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXSA9PT0gJ1N5bWJvbCdcbiAgICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gICAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG4gIGZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICAgIHZhciBwcm9wVHlwZSA9IHR5cGVvZiBwcm9wVmFsdWU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfVxuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAgIC8vICdvYmplY3QnIGZvciB0eXBlb2YgYSBSZWdFeHAuIFdlJ2xsIG5vcm1hbGl6ZSB0aGlzIGhlcmUgc28gdGhhdCAvYmxhL1xuICAgICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgICByZXR1cm4gJ29iamVjdCc7XG4gICAgfVxuICAgIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgICAgcmV0dXJuICdzeW1ib2wnO1xuICAgIH1cbiAgICByZXR1cm4gcHJvcFR5cGU7XG4gIH1cblxuICAvLyBUaGlzIGhhbmRsZXMgbW9yZSB0eXBlcyB0aGFuIGBnZXRQcm9wVHlwZWAuIE9ubHkgdXNlZCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gIC8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuICBmdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgfHwgcHJvcFZhbHVlID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJycgKyBwcm9wVmFsdWU7XG4gICAgfVxuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgcmV0dXJuICdkYXRlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHByb3BUeXBlO1xuICB9XG5cbiAgLy8gUmV0dXJucyBhIHN0cmluZyB0aGF0IGlzIHBvc3RmaXhlZCB0byBhIHdhcm5pbmcgYWJvdXQgYW4gaW52YWxpZCB0eXBlLlxuICAvLyBGb3IgZXhhbXBsZSwgXCJ1bmRlZmluZWRcIiBvciBcIm9mIHR5cGUgYXJyYXlcIlxuICBmdW5jdGlvbiBnZXRQb3N0Zml4Rm9yVHlwZVdhcm5pbmcodmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IGdldFByZWNpc2VUeXBlKHZhbHVlKTtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiAnYW4gJyArIHR5cGU7XG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgcmV0dXJuICdhICcgKyB0eXBlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbiAgZnVuY3Rpb24gZ2V0Q2xhc3NOYW1lKHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgICB9XG4gICAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9XG5cbiAgUmVhY3RQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMgPSBjaGVja1Byb3BUeXBlcztcbiAgUmVhY3RQcm9wVHlwZXMuUHJvcFR5cGVzID0gUmVhY3RQcm9wVHlwZXM7XG5cbiAgcmV0dXJuIFJlYWN0UHJvcFR5cGVzO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb3AtdHlwZXMvZmFjdG9yeVdpdGhUeXBlQ2hlY2tlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuICB2YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcbiAgdmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcbiAgdmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xufVxuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9GdW5jdGlvbn0gZ2V0U3RhY2sgUmV0dXJucyB0aGUgY29tcG9uZW50IHN0YWNrLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2hlY2tQcm9wVHlwZXModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBnZXRTdGFjaykge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgICB2YXIgZXJyb3I7XG4gICAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgICAgLy8gQWZ0ZXIgdGhlc2UgaGF2ZSBiZWVuIGNsZWFuZWQgdXAsIHdlJ2xsIGxldCB0aGVtIHRocm93LlxuICAgICAgICB0cnkge1xuICAgICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAgIC8vIGJlaGF2aW9yIGFzIHdpdGhvdXQgdGhpcyBzdGF0ZW1lbnQgZXhjZXB0IHdpdGggYSBiZXR0ZXIgbWVzc2FnZS5cbiAgICAgICAgICBpbnZhcmlhbnQodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ3RoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAlc2AuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0pO1xuICAgICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgZXJyb3IgPSBleDtcbiAgICAgICAgfVxuICAgICAgICB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBsb2NhdGlvbiwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNoZWNrUHJvcFR5cGVzO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gc2hpbShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGlmIChzZWNyZXQgPT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0KSB7XG4gICAgICAvLyBJdCBpcyBzdGlsbCBzYWZlIHdoZW4gY2FsbGVkIGZyb20gUmVhY3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGludmFyaWFudChcbiAgICAgIGZhbHNlLFxuICAgICAgJ0NhbGxpbmcgUHJvcFR5cGVzIHZhbGlkYXRvcnMgZGlyZWN0bHkgaXMgbm90IHN1cHBvcnRlZCBieSB0aGUgYHByb3AtdHlwZXNgIHBhY2thZ2UuICcgK1xuICAgICAgJ1VzZSBQcm9wVHlwZXMuY2hlY2tQcm9wVHlwZXMoKSB0byBjYWxsIHRoZW0uICcgK1xuICAgICAgJ1JlYWQgbW9yZSBhdCBodHRwOi8vZmIubWUvdXNlLWNoZWNrLXByb3AtdHlwZXMnXG4gICAgKTtcbiAgfTtcbiAgc2hpbS5pc1JlcXVpcmVkID0gc2hpbTtcbiAgZnVuY3Rpb24gZ2V0U2hpbSgpIHtcbiAgICByZXR1cm4gc2hpbTtcbiAgfTtcbiAgLy8gSW1wb3J0YW50IVxuICAvLyBLZWVwIHRoaXMgbGlzdCBpbiBzeW5jIHdpdGggcHJvZHVjdGlvbiB2ZXJzaW9uIGluIGAuL2ZhY3RvcnlXaXRoVHlwZUNoZWNrZXJzLmpzYC5cbiAgdmFyIFJlYWN0UHJvcFR5cGVzID0ge1xuICAgIGFycmF5OiBzaGltLFxuICAgIGJvb2w6IHNoaW0sXG4gICAgZnVuYzogc2hpbSxcbiAgICBudW1iZXI6IHNoaW0sXG4gICAgb2JqZWN0OiBzaGltLFxuICAgIHN0cmluZzogc2hpbSxcbiAgICBzeW1ib2w6IHNoaW0sXG5cbiAgICBhbnk6IHNoaW0sXG4gICAgYXJyYXlPZjogZ2V0U2hpbSxcbiAgICBlbGVtZW50OiBzaGltLFxuICAgIGluc3RhbmNlT2Y6IGdldFNoaW0sXG4gICAgbm9kZTogc2hpbSxcbiAgICBvYmplY3RPZjogZ2V0U2hpbSxcbiAgICBvbmVPZjogZ2V0U2hpbSxcbiAgICBvbmVPZlR5cGU6IGdldFNoaW0sXG4gICAgc2hhcGU6IGdldFNoaW0sXG4gICAgZXhhY3Q6IGdldFNoaW1cbiAgfTtcblxuICBSZWFjdFByb3BUeXBlcy5jaGVja1Byb3BUeXBlcyA9IGVtcHR5RnVuY3Rpb247XG4gIFJlYWN0UHJvcFR5cGVzLlByb3BUeXBlcyA9IFJlYWN0UHJvcFR5cGVzO1xuXG4gIHJldHVybiBSZWFjdFByb3BUeXBlcztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2ZhY3RvcnlXaXRoVGhyb3dpbmdTaGltcy5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jbGFzc25hbWVzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBAZmxvd1xuY29uc3QgcHJlZml4ZXMgPSBbJ01veicsICdXZWJraXQnLCAnTycsICdtcyddO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByZWZpeChwcm9wOiBzdHJpbmc9J3RyYW5zZm9ybScpOiBzdHJpbmcge1xuICAvLyBDaGVja2luZyBzcGVjaWZpY2FsbHkgZm9yICd3aW5kb3cuZG9jdW1lbnQnIGlzIGZvciBwc2V1ZG8tYnJvd3NlciBzZXJ2ZXItc2lkZVxuICAvLyBlbnZpcm9ubWVudHMgdGhhdCBkZWZpbmUgJ3dpbmRvdycgYXMgdGhlIGdsb2JhbCBjb250ZXh0LlxuICAvLyBFLmcuIFJlYWN0LXJhaWxzIChzZWUgaHR0cHM6Ly9naXRodWIuY29tL3JlYWN0anMvcmVhY3QtcmFpbHMvcHVsbC84NClcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJyc7XG5cbiAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO1xuXG4gIGlmIChwcm9wIGluIHN0eWxlKSByZXR1cm4gJyc7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChicm93c2VyUHJlZml4VG9LZXkocHJvcCwgcHJlZml4ZXNbaV0pIGluIHN0eWxlKSByZXR1cm4gcHJlZml4ZXNbaV07XG4gIH1cblxuICByZXR1cm4gJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicm93c2VyUHJlZml4VG9LZXkocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgJHtwcmVmaXh9JHtrZWJhYlRvVGl0bGVDYXNlKHByb3ApfWAgOiBwcm9wO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnJvd3NlclByZWZpeFRvU3R5bGUocHJvcDogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBwcmVmaXggPyBgLSR7cHJlZml4LnRvTG93ZXJDYXNlKCl9LSR7cHJvcH1gIDogcHJvcDtcbn1cblxuZnVuY3Rpb24ga2ViYWJUb1RpdGxlQ2FzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxldCBvdXQgPSAnJztcbiAgbGV0IHNob3VsZENhcGl0YWxpemUgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzaG91bGRDYXBpdGFsaXplKSB7XG4gICAgICBvdXQgKz0gc3RyW2ldLnRvVXBwZXJDYXNlKCk7XG4gICAgICBzaG91bGRDYXBpdGFsaXplID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChzdHJbaV0gPT09ICctJykge1xuICAgICAgc2hvdWxkQ2FwaXRhbGl6ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIG91dCArPSBzdHJbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbi8vIERlZmF1bHQgZXhwb3J0IGlzIHRoZSBwcmVmaXggaXRzZWxmLCBsaWtlICdNb3onLCAnV2Via2l0JywgZXRjXG4vLyBOb3RlIHRoYXQgeW91IG1heSBoYXZlIHRvIHJlLXRlc3QgZm9yIGNlcnRhaW4gdGhpbmdzOyBmb3IgaW5zdGFuY2UsIENocm9tZSA1MFxuLy8gY2FuIGhhbmRsZSB1bnByZWZpeGVkIGB0cmFuc2Zvcm1gLCBidXQgbm90IHVucHJlZml4ZWQgYHVzZXItc2VsZWN0YFxuZXhwb3J0IGRlZmF1bHQgZ2V0UHJlZml4KCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvdXRpbHMvZ2V0UHJlZml4LmpzIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IGFkZEV2ZW50LCByZW1vdmVFdmVudCB9IGZyb20gJy4vdXRpbHMvZG9tRm5zJztcblxuY29uc3QgZXZlbnRzRm9yID0ge1xuICB0b3VjaDoge1xuICAgIHN0YXJ0OiAndG91Y2hzdGFydCcsXG4gICAgbW92ZTogJ3RvdWNobW92ZScsXG4gICAgc3RvcDogJ3RvdWNoZW5kJ1xuICB9LFxuICBtb3VzZToge1xuICAgIHN0YXJ0OiAnbW91c2Vkb3duJyxcbiAgICBtb3ZlOiAnbW91c2Vtb3ZlJyxcbiAgICBzdG9wOiAnbW91c2V1cCdcbiAgfVxufTtcblxuY29uc3QgcmVtb3ZlID0gZnVuY3Rpb24oYXJyYXksIGZyb20sIHRvKSB7XG4gIHZhciByZXN0ID0gYXJyYXkuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnJheS5sZW5ndGgpO1xuICBhcnJheS5sZW5ndGggPSBmcm9tIDwgMCA/IGFycmF5Lmxlbmd0aCArIGZyb20gOiBmcm9tO1xuICByZXR1cm4gYXJyYXkucHVzaC5hcHBseShhcnJheSwgcmVzdCk7XG59O1xuXG5jb25zdCByZW1vdmVFbnRyeSA9IGZ1bmN0aW9uKGFycmF5LCBlbnRyeSkge1xuICB2YXIgaW5kZXggPSBhcnJheS5pbmRleE9mKGVudHJ5KTtcbiAgaWYgKGluZGV4ICE9PSAtMSkgcmVtb3ZlKGFycmF5LCBpbmRleCk7XG59O1xuXG5jb25zdCBnZXRUYXJnZXQgPSBmdW5jdGlvbihldmVudCkge1xuICByZXR1cm4gZXZlbnQuY3VycmVudFRhcmdldCB8fCBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYWdnYWJsZUFsaWduR3VpZGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRHJhZ2dhYmxlQWxpZ25HdWlkZSc7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgd3JhcHBlclByb3BzOiBQcm9wVHlwZXMub2JqZWN0LFxuICAgIHNuYXBUcmVzaGhvbGQ6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgb25TbmFwaW5nOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBzZWxlY3RvcjogUHJvcFR5cGVzLnN0cmluZyxcbiAgfTtcblxuICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgIHdyYXBwZXJQcm9wczoge30sXG4gICAgc25hcFRyZXNoaG9sZDogNSxcbiAgICBzZWxlY3RvcjogJy5yZWFjdC1kcmFnZ2FibGUnLFxuICAgIG9uU25hcGluZzogKCkgPT4geyB9LFxuICB9O1xuICBlZGdlcyA9IG51bGw7XG4gIHN0YXRpY0d1aWRlcyA9IG51bGw7XG4gIHggPSAwO1xuICB5ID0gMDtcbiAgbW91c2VPZmZzZXRYID0gMDtcbiAgbW91c2VPZmZzZXRZID0gMDtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgYm94ZXM6IFtdLFxuICAgICAgc25hcFRyZXNoaG9sZDogcHJvcHMuc25hcFRyZXNoaG9sZCB8fCA1LFxuICAgICAgbWluaW11bURpc3RhbmNlOiAxMCxcbiAgICAgIG9mZnNldDogbnVsbCxcbiAgICAgIHN0YXRpY0d1aWRlczogbnVsbCxcbiAgICAgIGF4aXM6IFtdXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG4gIHJlZnJlc2ggPSAoKSA9PiB7XG4gICAgdGhpcy5yZXNldFN0YXRpY0d1aWRlcygpO1xuXG4gICAgdGhpcy5yZXNldEFsbCgpO1xuICB9XG4gIHJlc2V0QWxsID0gKCkgPT4ge1xuICAgIHRoaXMucmVzZXRFZGdlcygpO1xuICAgIC8vIHRoaXMuZGlzdGFuY2VzID0gbmV3IE9iamVjdCgpO1xuICAgIGNvbnN0IGJveGVzID0gdGhpcy5ib3hlcztcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIGlmIChib3hlcyAmJiBib3hlcy5sZW5ndGgpIHtcbiAgICAgIGZvciAoY29uc3Qga2V5IGluIGJveGVzKSB7XG4gICAgICAgIGlmIChib3hlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgY29uc3QgYm94ID0gYm94ZXNba2V5XTtcbiAgICAgICAgICBjb25zdCB7IHgsIHksIHdpZHRoLCBoZWlnaHQgfSA9IGJveC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBpbnRlcmVzdFBvaW50cyA9IHRoaXMuZ2V0SW50ZXJlc3RQb2ludHMoe1xuICAgICAgICAgICAgeDogeCAtIHBhcmVudFJlY3QueCxcbiAgICAgICAgICAgIHk6IHkgLSBwYXJlbnRSZWN0LnksXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgIHJpZ2h0OiB4IC0gcGFyZW50UmVjdC54ICsgd2lkdGgsXG4gICAgICAgICAgICBib3R0b206IHkgLSBwYXJlbnRSZWN0LnkgKyBoZWlnaHQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5lZGdlcy54LnB1c2guYXBwbHkodGhpcy5lZGdlcy54LCBpbnRlcmVzdFBvaW50cy54KTtcbiAgICAgICAgICB0aGlzLmVkZ2VzLnkucHVzaC5hcHBseSh0aGlzLmVkZ2VzLnksIGludGVyZXN0UG9pbnRzLnkpO1xuXG4gICAgICAgICAgY29uc3QgZ3VpZGUgPSBib3guZ2V0QXR0cmlidXRlKCdkYXRhLWd1aWRlJyk7XG4gICAgICAgICAgaWYgKCFndWlkZSkge1xuICAgICAgICAgICAgYm94LnNldEF0dHJpYnV0ZSgnZGF0YS1ndWlkZScsIHRydWUpO1xuXG4gICAgICAgICAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5zdGFydCwgKGUpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydFRvRHJhZyhlLCBib3gpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnNob3dBbGxHdWlkZXMoKTtcbiAgfVxuICBzdGFydFRvRHJhZyA9IChldmVudCwgYm94KSA9PiB7XG4gICAgLy8gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuY2xpZW50UmVjdDtcbiAgICBjb25zdCByZWN0ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IF9zdGFydFggPSByZWN0LnggLSBwYXJlbnRSZWN0Lng7XG4gICAgY29uc3QgX3N0YXJ0WSA9IHJlY3QueSAtIHBhcmVudFJlY3QueTtcbiAgICB0aGlzLm1vdXNlT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYIC0gcmVjdC5sZWZ0O1xuICAgIHRoaXMubW91c2VPZmZzZXRZID0gZXZlbnQucGFnZVkgLSByZWN0LnRvcDtcbiAgICAvLyBjb25zb2xlLmxvZygnYm94IHN0YXJ0VG9EcmFnIGdldEJvdW5kaW5nQ2xpZW50UmVjdCcsIHJlY3QsIHRoaXMubW91c2VPZmZzZXRYKVxuICAgIC8vIGNvbnNvbGUubG9nKCdkaXN0YW5jZSAtIHBvc2l0aW9uJywgZXZlbnQucGFnZVgsIHRoaXMubW91c2VPZmZzZXRYKTtcblxuICAgIHRoaXMuZXhjbHVkZUJveGZvcm1FZGdlcyh7XG4gICAgICB4OiBfc3RhcnRYLFxuICAgICAgeTogX3N0YXJ0WSxcbiAgICAgIHdpZHRoOiByZWN0LndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWN0LmhlaWdodCxcbiAgICB9KTtcbiAgICAvLyB0aGlzLmV4Y2x1ZGVCb3hGcm9tRGlzdGFuY2VzKCk7XG4gICAgdGhpcy5zaG93QWxsR3VpZGVzKCk7XG5cbiAgICB0aGlzLmRyYWcoZXZlbnQpO1xuXG4gICAgYWRkRXZlbnQoYm94LCBldmVudHNGb3IubW91c2UubW92ZSwgdGhpcy5kcmFnKTtcbiAgICBhZGRFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5zdG9wLCB0aGlzLnN0b3BUb0RyYWcpO1xuICB9XG4gIGRyYWcgPSAoZXZlbnQpID0+IHtcbiAgICBjb25zdCBib3ggPSBnZXRUYXJnZXQoZXZlbnQpO1xuICAgIGNvbnN0IHJlY3QgPSBib3guZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2JveCBkcmFnJywgZXZlbnQpXG4gICAgY29uc3QgcGFyZW50UmVjdCA9IHRoaXMuY2xpZW50UmVjdDtcbiAgICB0aGlzLnggPSBldmVudC5wYWdlWCAtIHBhcmVudFJlY3QubGVmdCAtIHRoaXMubW91c2VPZmZzZXRYO1xuICAgIC8vIHRoaXMueCA9IGV2ZW50LnBhZ2VYIC0gcGFyZW50UmVjdC5sZWZ0IC0gKGV2ZW50LnBhZ2VYIC0gcmVjdC5sZWZ0KTtcbiAgICB0aGlzLnkgPSBldmVudC5wYWdlWSAtIHBhcmVudFJlY3QudG9wIC0gdGhpcy5tb3VzZU9mZnNldFk7XG4gICAgLy8gY29uc29sZS5sb2coJ2dldEJvdW5kaW5nQ2xpZW50UmVjdCcsIGV2ZW50LnBhZ2VYLCBwYXJlbnRSZWN0LmxlZnQsIHRoaXMubW91c2VPZmZzZXRYLCB0aGlzLngpXG4gICAgdGhpcy5zbmFwVG9HdWlkZXMoeyBib3gsIHBhcmVudFJlY3QgfSk7XG4gIH1cbiAgc3RvcFRvRHJhZyA9IChldmVudCkgPT4ge1xuICAgIGNvbnN0IGJveCA9IGdldFRhcmdldChldmVudCk7XG4gICAgLy8gY29uc29sZS5sb2coJ2JveCBzdG9wVG9EcmFnJywgZXZlbnQpXG4gICAgdGhpcy5sb2NrZWRBeGlzID0gbnVsbDtcbiAgICB0aGlzLnJlc2V0QWxsKCk7XG4gICAgdGhpcy5yZW1vdmVHdWlkZXMoKTtcbiAgICByZW1vdmVFdmVudChib3gsIGV2ZW50c0Zvci5tb3VzZS5tb3ZlLCB0aGlzLmRyYWcpO1xuICAgIHJlbW92ZUV2ZW50KGJveCwgZXZlbnRzRm9yLm1vdXNlLnN0b3AsIHRoaXMuc3RvcFRvRHJhZyk7XG4gIH1cbiAgc25hcFRvR3VpZGVzID0gKHsgYm94LCBwYXJlbnRSZWN0IH0pID0+IHtcbiAgICBjb25zdCByZWN0ID0gYm94LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgdGhpcy5yZW1vdmVHdWlkZXMoKTtcblxuICAgIGNvbnN0IGF4aXMgPSBbXTtcblxuICAgIGNvbnN0IHhBeGlzID0gdGhpcy5zbmFwKHtcbiAgICAgIHBhcmVudFJlY3QsXG4gICAgICByZWN0LFxuICAgICAgYXhpczogJ3gnXG4gICAgfSk7XG5cbiAgICBpZiAoeEF4aXMpIHtcbiAgICAgIGF4aXMucHVzaCh4QXhpcylcbiAgICB9XG5cbiAgICBjb25zdCB5QXhpcyA9IHRoaXMuc25hcCh7XG4gICAgICBwYXJlbnRSZWN0LFxuICAgICAgcmVjdCxcbiAgICAgIGF4aXM6ICd5J1xuICAgIH0pO1xuXG4gICAgaWYgKHlBeGlzKSB7XG4gICAgICBheGlzLnB1c2goeUF4aXMpXG4gICAgfVxuXG4gICAgaWYgKGF4aXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHsgYXhpcyB9LCAoKSA9PiB7XG4gICAgICAgIGF4aXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgIC8vIHRoaXMucHJvcHMub25TbmFwaW5nKGl0ZW0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRoaXMucHJvcHMub25TbmFwaW5nKHtcbiAgICAgIHhEaXN0YW5jZTogdGhpcy54IC0gKHJlY3QueCAtIHBhcmVudFJlY3QueCksXG4gICAgICB5RGlzdGFuY2U6IHRoaXMueSAtIChyZWN0LnkgLSBwYXJlbnRSZWN0LnkpLFxuICAgICAgc25hcFRyZXNoaG9sZDogdGhpcy5zdGF0ZS5zbmFwVHJlc2hob2xkXG4gICAgfSlcbiAgfVxuICBzbmFwID0gKHsgcGFyZW50UmVjdCwgcmVjdCwgYXhpcyB9KSA9PiB7XG4gICAgY29uc3QgeyBzbmFwVHJlc2hob2xkIH0gPSB0aGlzLnN0YXRlXG4gICAgY29uc3Qgc2lkZSA9IGF4aXMgPT09ICd4JyA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICBjb25zdCBzdGFydCA9IGF4aXMgPT09ICd4JyA/ICdsZWZ0JyA6ICd0b3AnO1xuICAgIGNvbnN0IGVuZCA9IGF4aXMgPT09ICd4JyA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgICBjb25zdCBlZGdlcyA9IHRoaXMuZWRnZXNbYXhpc107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVkZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbiA9IGVkZ2VzW2ldO1xuICAgICAgY29uc3QgZGlzdGFuY2UgPSB0aGlzW2F4aXNdO1xuICAgICAgY29uc3QgaGFsZlNpZGVMZW5ndGggPSBNYXRoLmFicyhyZWN0W3NpZGVdIC8gMik7XG4gICAgICBjb25zdCBjZW50ZXIgPSBkaXN0YW5jZSArIGhhbGZTaWRlTGVuZ3RoO1xuICAgICAgY29uc3QgZW5kRGlzdGFuY2UgPSBkaXN0YW5jZSArIHJlY3Rbc2lkZV07XG4gICAgICBsZXQgc2V0R3VpZGUgPSBmYWxzZTtcblxuICAgICAgaWYgKE1hdGguYWJzKGRpc3RhbmNlIC0gcG9zaXRpb24pIDw9IHNuYXBUcmVzaGhvbGQpIHtcbiAgICAgICAgdGhpc1theGlzXSA9IHBvc2l0aW9uO1xuICAgICAgICBzZXRHdWlkZSA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGNlbnRlciAtIHBvc2l0aW9uKSA8PSBzbmFwVHJlc2hob2xkKSB7XG4gICAgICAgIHRoaXNbYXhpc10gPSBwb3NpdGlvbiAtIGhhbGZTaWRlTGVuZ3RoOyAvLyBtb3ZlIHNuYXAgYmVoYXZpb3IgXG4gICAgICAgIHNldEd1aWRlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoZW5kRGlzdGFuY2UgLSBwb3NpdGlvbikgPD0gc25hcFRyZXNoaG9sZCkge1xuICAgICAgICB0aGlzW2F4aXNdID0gcG9zaXRpb24gLSByZWN0W3NpZGVdOyAvLyBtb3ZlIHNuYXAgYmVoYXZpb3IgICAgIFxuICAgICAgICBzZXRHdWlkZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRHdWlkZSkge1xuICAgICAgICByZXR1cm4geyBheGlzLCBwb3NpdGlvbiB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGV4Y2x1ZGVCb3hmb3JtRWRnZXMgPSAocmVjdCkgPT4ge1xuICAgIGlmICh0aGlzLmVkZ2VzKSB7XG4gICAgICBpZiAodGhpcy5lZGdlcy54KSB7XG4gICAgICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueCwgcmVjdC54KVxuICAgICAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLngsIHJlY3QueCArIE1hdGgucm91bmQocmVjdC53aWR0aCAvIDIpKVxuICAgICAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLngsIHJlY3QueCArIHJlY3Qud2lkdGgpXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmVkZ2VzLnkpIHtcbiAgICAgICAgcmVtb3ZlRW50cnkodGhpcy5lZGdlcy55LCByZWN0LnkpXG4gICAgICAgIHJlbW92ZUVudHJ5KHRoaXMuZWRnZXMueSwgcmVjdC55ICsgTWF0aC5yb3VuZChyZWN0LmhlaWdodCAvIDIpKVxuICAgICAgICByZW1vdmVFbnRyeSh0aGlzLmVkZ2VzLnksIHJlY3QueSArIHJlY3QuaGVpZ2h0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBzaG93QWxsR3VpZGVzID0gKCkgPT4geyB9XG4gIHJlbW92ZUd1aWRlcyA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGF4aXM6IFtdXG4gICAgfSlcbiAgfVxuICBnZXRJbnRlcmVzdFBvaW50cyA9IChib3gpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgeDogW2JveC54LCBib3gueCArIE1hdGgucm91bmQoYm94LndpZHRoIC8gMiksIGJveC5yaWdodF0sXG4gICAgICB5OiBbYm94LnksIGJveC55ICsgTWF0aC5yb3VuZChib3guaGVpZ2h0IC8gMiksIGJveC5ib3R0b21dXG4gICAgfTtcbiAgfVxuICByZXNldFN0YXRpY0d1aWRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBjbGllbnRSZWN0ID0gdGhpcy5jbGllbnRSZWN0O1xuICAgIHRoaXMuc3RhdGljR3VpZGVzID0ge1xuICAgICAgeDogWzAsIE1hdGgucm91bmQoY2xpZW50UmVjdC53aWR0aCAvIDIpLCBjbGllbnRSZWN0LndpZHRoXSxcbiAgICAgIHk6IFswLCBNYXRoLnJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0IC8gMiksIGNsaWVudFJlY3QuaGVpZ2h0XVxuICAgIH07XG4gIH1cblxuICByZXNldEVkZ2VzID0gKCkgPT4ge1xuICAgIC8vIC5zbGljZSgpIHRvIG9ubHkgY29weSB0aGVtIC0gb3RoZXJ3aXNlIGEgcmVmZXJlbmNlIHdvdWxkIGdldCBjcmVhdGVkXG4gICAgdGhpcy5lZGdlcyA9IHtcbiAgICAgIHg6IHRoaXMuc3RhdGljR3VpZGVzLnguc2xpY2UoKSxcbiAgICAgIHk6IHRoaXMuc3RhdGljR3VpZGVzLnkuc2xpY2UoKVxuICAgIH07XG4gIH1cblxuICBnZXQgYm94ZXMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5wcm9wcy5zZWxlY3RvcilcbiAgfVxuICBnZXQgY2xpZW50UmVjdCgpIHtcbiAgICBjb25zdCB0aGlzTm9kZSA9IFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMpO1xuICAgIHJldHVybiB0aGlzTm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgdGhpc05vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICByZW5kZXJHdWlkZSA9IChpdGVtID0ge30sIGluZGV4KSA9PiB7XG4gICAgY29uc3QgeyBheGlzLCBwb3NpdGlvbiwgYWRkaXRpb25hbENsYXNzIH0gPSBpdGVtO1xuICAgIGxldCBjbGFzc05hbWUgPSAnZ3VpZGUgYXhpcy0nICsgYXhpcztcbiAgICBpZiAoYWRkaXRpb25hbENsYXNzKSBjbGFzc05hbWUgKz0gXCIgXCIgKyBhZGRpdGlvbmFsQ2xhc3M7XG5cbiAgICBjb25zdCBfc3R5bGVzID0ge31cbiAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICBfc3R5bGVzLmxlZnQgPSBwb3NpdGlvbiArICdweCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIF9zdHlsZXMudG9wID0gcG9zaXRpb24gKyAncHgnO1xuICAgIH1cbiAgICByZXR1cm4gKDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtjbGFzc05hbWV9IHN0eWxlPXtfc3R5bGVzfSAvPilcbiAgfVxuICByZW5kZXJBeGlzID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgYXhpcyB9ID0gdGhpcy5zdGF0ZVxuXG4gICAgaWYgKGF4aXMgJiYgYXhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBheGlzLm1hcCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJHdWlkZShpdGVtLCBpbmRleClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBzaG93QXhpc1gsIHNob3dBeGlzWSB9ID0gdGhpcy5zdGF0ZTtcbiAgICAvLyBSZXVzZSB0aGUgY2hpbGQgcHJvdmlkZWRcbiAgICAvLyBUaGlzIG1ha2VzIGl0IGZsZXhpYmxlIHRvIHVzZSB3aGF0ZXZlciBlbGVtZW50IGlzIHdhbnRlZCAoZGl2LCB1bCwgZXRjKVxuICAgIHJldHVybiAoPGRpdiB7Li4udGhpcy5wcm9wcy53cmFwcGVyUHJvcHN9PlxuICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICB7dGhpcy5yZW5kZXJBeGlzKCl9XG4gICAgPC9kaXY+KVxuICB9XG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0RyYWdnYWJsZUFsaWduR3VpZGUuanMiXSwic291cmNlUm9vdCI6IiJ9