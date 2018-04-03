import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {
  addEvent, removeEvent,
} from './utils/domFns';

const eventsFor = {
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

const remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

const removeEntry = function(array, entry) {
  var index = array.indexOf(entry);
  if (index !== -1) remove(array, index);
};

const getTarget = function(event) {
  return event.currentTarget || event.target || event.srcElement;
};

export default class DraggableAlignGuide extends React.Component {
  static displayName = 'DraggableAlignGuide';
  static propTypes = {
    onSnaping: PropTypes.func,
  };

  static defaultProps = {
    onSnaping: () => { },
  };
  edges = null;
  staticGuides = null;
  x = 0;
  y = 0;
  mouseOffsetX = 0;
  mouseOffsetY = 0;
  constructor(props) {
    super(props);

    this.state = {
      boxes: [],
      snapTreshhold: 5,
      minimumDistance: 10,
      offset: null,
      staticGuides: null,
      axis: []
    }
  }
  componentDidMount() {
    this.resetStaticGuides();

    this.chart();
  }

  chart() {
    this.resetEdges();
    // this.distances = new Object();
    const boxes = this.boxes;
    const parentRect = this.clientRect;
    if (boxes && boxes.length) {
      for (const key in boxes) {
        if (boxes.hasOwnProperty(key)) {
          const box = boxes[key];
          const { x, y, width, height } = box.getBoundingClientRect();
          const interestPoints = this.getInterestPoints({
            x: x - parentRect.x,
            y: y - parentRect.y,
            width,
            height,
            right: x - parentRect.x + width,
            bottom: y - parentRect.y + height,
          });
          this.edges.x.push.apply(this.edges.x, interestPoints.x);
          this.edges.y.push.apply(this.edges.y, interestPoints.y);

          const guide = box.getAttribute('data-guide');
          if (!guide) {
            box.setAttribute('data-guide', true);

            addEvent(box, eventsFor.mouse.start, (e) => {
              this.startToDrag(e, box)
            });
          }
        }
      }
    }

    this.showAllGuides();
  }
  startToDrag(event, box) {
    console.log('box startToDrag', event)
    // event.stopPropagation();
    const parentRect = this.clientRect;
    const rect = box.getBoundingClientRect();
    const _startX = rect.x - parentRect.x;
    const _startY = rect.y - parentRect.y;
    this.mouseOffsetX = event.pageX - rect.left;
    this.mouseOffsetY = event.pageY - rect.top;

    console.log('distance - position', event.pageX, this.mouseOffsetX);

    // this.startX = _startX + this.mouseOffsetX;
    // this.startY = _startY + this.mouseOffsetY;

    this.excludeBoxformEdges({
      x: _startX,
      y: _startY,
      width: rect.width,
      height: rect.height,
    });
    // this.excludeBoxFromDistances();
    this.showAllGuides();

    this.drag(event);

    addEvent(box, eventsFor.mouse.move, this.drag);
    addEvent(box, eventsFor.mouse.stop, this.stopToDrag);
  }
  drag = (event) => {
    const box = getTarget(event);
    const rect = box.getBoundingClientRect();
    // console.log('box drag', event)
    const parentRect = this.clientRect;
    this.x = event.pageX - parentRect.left - this.mouseOffsetX;
    this.y = event.pageY - parentRect.top - this.mouseOffsetY;
    console.log('getBoundingClientRect', event.pageX, parentRect.left, this.mouseOffsetX, this.x)
    this.snapToGuides({ box, parentRect });
  }
  stopToDrag = (event) => {
    const box = getTarget(event);
    // console.log('box stopToDrag', event)
    this.lockedAxis = null;
    this.chart();
    // this.removeGuides();
    removeEvent(box, eventsFor.mouse.move, this.drag);
    removeEvent(box, eventsFor.mouse.stop, this.stopToDrag);
  }
  snapToGuides({ resize, box, parentRect }) {
    const _resize = Boolean(resize);
    const rect = box.getBoundingClientRect();

    this.removeGuides();

    const axis = [];

    const xAxis = this.snap({
      parentRect,
      rect,
      resize: _resize,
      axis: 'x'
    });

    if (xAxis) {
      axis.push(xAxis)
    }

    const yAxis = this.snap({
      parentRect,
      rect,
      resize: _resize,
      axis: 'y'
    });

    if (yAxis) {
      axis.push(yAxis)
    }

    if (axis.length) {
      this.setState({ axis }, () => {
        axis.forEach((item) => {
          this.props.onSnaping(item)
        })
      })
    }
  }
  snap({ parentRect, rect, axis }) {
    const { snapTreshhold } = this.state
    const side = axis === 'x' ? 'width' : 'height';
    const start = axis === 'x' ? 'left' : 'top';
    const end = axis === 'x' ? 'right' : 'bottom';
    const edges = this.edges[axis];


    for (var i = 0; i < edges.length; i++) {
      const position = edges[i];
      const distance = this[axis];
      const halfSideLength = Math.abs(rect[side] / 2);
      const center = distance + halfSideLength;
      const endDistance = distance + rect[side];
      let moveDistance = 0;
      let targetPosition = 0;
      let setGuide = false;

      if (axis === 'x' && 190 === position) {
        // console.log('Math.abs(distance - position)', edges, distance, Math.abs(distance - position), Math.abs(distance - position) <= snapTreshhold)
      }

      if (Math.abs(distance - position) <= snapTreshhold) {
        // this[axis] = position;
        targetPosition = position;
        // moveDistance = position - distance;
        setGuide = true;
      } else if (Math.abs(center - position) <= snapTreshhold) {
        // this[axis] = position - halfSideLength; // move snap behavior 
        targetPosition = position - halfSideLength;
        moveDistance = center - position;
        setGuide = true;
      } else if (Math.abs(endDistance - position) <= snapTreshhold) {
        // this[axis] = position - rect[side]; // move snap behavior     
        targetPosition = position - rect[side];
        moveDistance = endDistance - position;
        setGuide = true;
      }

      if (setGuide) {
        moveDistance = targetPosition - (rect[axis] - parentRect[axis]);
        console.log('success axis position moveDistance', axis, position, moveDistance)
        return { axis, position, moveDistance, snapTreshhold, targetPosition }
        // this.parent.renderGuide(axis, position);
      }
    }
  }
  excludeBoxformEdges(rect) {
    removeEntry(this.edges.x, rect.x)
    removeEntry(this.edges.x, rect.x + Math.round(rect.width / 2))
    removeEntry(this.edges.x, rect.x + rect.width)

    removeEntry(this.edges.y, rect.y)
    removeEntry(this.edges.y, rect.y + Math.round(rect.height / 2))
    removeEntry(this.edges.y, rect.y + rect.height)
  }
  showAllGuides() {

  }
  removeGuides() {
    this.setState({
      axis: []
    })
  }

  getInterestPoints(box) {
    return {
      x: [box.x, box.x + Math.round(box.width / 2), box.right],
      y: [box.y, box.y + Math.round(box.height / 2), box.bottom]
    };
  }
  resetStaticGuides() {
    const clientRect = this.clientRect;
    this.staticGuides = {
      x: [0, Math.round(clientRect.width / 2), clientRect.width],
      y: [0, Math.round(clientRect.height / 2), clientRect.height]
    };
  }

  resetEdges() {
    // .slice() to only copy them - otherwise a reference would get created
    this.edges = {
      x: this.staticGuides.x.slice(),
      y: this.staticGuides.y.slice()
    };
  }

  get boxes() {
    return document.querySelectorAll('.react-draggable')
  }
  get clientRect() {
    const thisNode = ReactDOM.findDOMNode(this);
    return thisNode.getBoundingClientRect();
  }

  renderGuide({ axis, position, additionalClass }) {
    let className = 'guide axis-' + axis;
    if (additionalClass) className += " " + additionalClass;

    const _styles = {}
    if (axis === 'x') {
      _styles.left = position + 'px';
    } else {
      _styles.top = position + 'px';
    }
    return (<div className={className} style={_styles} />)
  }
  renderAxis() {
    const { axis } = this.state

    if (axis && axis.length) {
      return axis.map((item) => {
        return this.renderGuide(item)
      })
    }

    return null;
  }
  render() {
    const { showAxisX, showAxisY } = this.state;
    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return (<div {...this.props}>
      {this.props.children}
      {this.renderAxis()}
    </div>)
  }
}