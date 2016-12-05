'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tinperBeeCore = require('tinper-bee-core');

var _util = require('./util');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave'
};

var propTypes = {
  children: _react.PropTypes.any
};

var AnimateChild = function (_Component) {
  _inherits(AnimateChild, _Component);

  function AnimateChild(props) {
    _classCallCheck(this, AnimateChild);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.transition = _this.transition.bind(_this);
    _this.stop = _this.stop.bind(_this);
    return _this;
  }

  AnimateChild.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stop();
  };

  AnimateChild.prototype.componentWillEnter = function componentWillEnter(done) {
    if (_util2["default"].isEnterSupported(this.props)) {
      this.transition('enter', done);
    } else {
      done();
    }
  };

  AnimateChild.prototype.componentWillAppear = function componentWillAppear(done) {
    if (_util2["default"].isAppearSupported(this.props)) {
      this.transition('appear', done);
    } else {
      done();
    }
  };

  AnimateChild.prototype.componentWillLeave = function componentWillLeave(done) {
    if (_util2["default"].isLeaveSupported(this.props)) {
      this.transition('leave', done);
    } else {
      // always sync, do not interupt with react component life cycle
      // update hidden -> animate hidden ->
      // didUpdate -> animate leave -> unmount (if animate is none)
      done();
    }
  };

  AnimateChild.prototype.transition = function transition(animationType, finishCallback) {
    var _this2 = this;

    var node = _reactDom2["default"].findDOMNode(this);
    var props = this.props;
    var transitionName = props.transitionName;
    var nameIsObj = (typeof transitionName === 'undefined' ? 'undefined' : _typeof(transitionName)) === 'object';
    this.stop();
    var end = function end() {
      _this2.stopper = null;
      finishCallback();
    };
    if ((_tinperBeeCore.cssAnimation.isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
      var name = nameIsObj ? transitionName[animationType] : transitionName + '-' + animationType;
      var activeName = name + '-active';
      if (nameIsObj && transitionName[animationType + 'Active']) {
        activeName = transitionName[animationType + 'Active'];
      }
      this.stopper = (0, _tinperBeeCore.cssAnimation)(node, {
        name: name,
        active: activeName
      }, end);
    } else {
      this.stopper = props.animation[animationType](node, end);
    }
  };

  AnimateChild.prototype.stop = function stop() {
    var stopper = this.stopper;
    if (stopper) {
      this.stopper = null;
      stopper.stop();
    }
  };

  AnimateChild.prototype.render = function render() {
    return this.props.children;
  };

  return AnimateChild;
}(_react.Component);

;

AnimateChild.propTypes = propTypes;

exports["default"] = AnimateChild;
module.exports = exports['default'];