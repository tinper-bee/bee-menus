'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var propTypes = {
    renderMenuItem: _propTypes2["default"].func,
    index: _propTypes2["default"].number,
    className: _propTypes2["default"].string,
    rootPrefixCls: _propTypes2["default"].string,
    title: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].node]),
    children: _propTypes2["default"].oneOfType([_propTypes2["default"].string, _propTypes2["default"].node])
};

var defaultProps = {
    disabled: true
};

var MenuItemGroup = function (_Component) {
    _inherits(MenuItemGroup, _Component);

    function MenuItemGroup() {
        _classCallCheck(this, MenuItemGroup);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    MenuItemGroup.prototype.renderInnerMenuItem = function renderInnerMenuItem(item, subIndex) {
        var _props = this.props,
            renderMenuItem = _props.renderMenuItem,
            index = _props.index;

        return renderMenuItem(item, index, subIndex);
    };

    MenuItemGroup.prototype.render = function render() {
        var _props2 = this.props,
            _props2$className = _props2.className,
            className = _props2$className === undefined ? '' : _props2$className,
            title = _props2.title,
            children = _props2.children,
            rootPrefixCls = _props2.rootPrefixCls;

        var titleClassName = rootPrefixCls + '-item-group-title';
        var listClassName = rootPrefixCls + '-item-group-list';

        return _react2["default"].createElement(
            'li',
            { className: className + ' ' + rootPrefixCls + '-item-group' },
            _react2["default"].createElement(
                'div',
                { className: titleClassName },
                title
            ),
            _react2["default"].createElement(
                'ul',
                { className: listClassName },
                _react2["default"].Children.map(children, this.renderInnerMenuItem.bind(this))
            )
        );
    };

    return MenuItemGroup;
}(_react.Component);

;

MenuItemGroup.isMenuItemGroup = true;
MenuItemGroup.propTypes = propTypes;
MenuItemGroup.defaultProps = defaultProps;

exports["default"] = MenuItemGroup;
module.exports = exports['default'];