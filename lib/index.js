'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

// require('./index.css')

var MultiSelectPanel = (function (_React$Component) {
  _inherits(MultiSelectPanel, _React$Component);

  function MultiSelectPanel(props) {
    _classCallCheck(this, MultiSelectPanel);

    _get(Object.getPrototypeOf(MultiSelectPanel.prototype), 'constructor', this).call(this, props);

    this.state = {
      leftSelects: {},
      rightSelects: {}
    };
  }

  _createClass(MultiSelectPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.initData();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _state = this.state;
      var leftSelects = _state.leftSelects;
      var rightSelects = _state.rightSelects;
      var warpClass = this.props.warpClass;

      return _react2['default'].createElement(
        'div',
        { className: (0, _classnames2['default'])('multi-select-panel', _defineProperty({}, warpClass, warpClass)) },
        _react2['default'].createElement(
          'div',
          { className: 'left-selects' },
          this.renderSelectList('leftSelect', Object.values(leftSelects))
        ),
        _react2['default'].createElement(
          'div',
          { className: 'middle-controllers' },
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.addList();
              } },
            '添加 '
          ),
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.removeList();
              } },
            ' 移除'
          ),
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.controlAll('add');
              } },
            '添加全部 '
          ),
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.controlAll('remove');
              } },
            ' 移除全部'
          )
        ),
        _react2['default'].createElement(
          'div',
          { className: 'right-selects' },
          this.renderSelectList('rightSelect', Object.values(rightSelects))
        ),
        _react2['default'].createElement(
          'div',
          { className: 'confirm-selects' },
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.returnClick('confirm');
              } },
            '确定'
          ),
          _react2['default'].createElement(
            'button',
            { onClick: function () {
                return _this.returnClick('cancel');
              } },
            '取消'
          )
        )
      );
    }
  }, {
    key: 'returnClick',
    value: function returnClick(type) {
      var _props = this.props;
      var submitFun = _props.submitFun;
      var cancelFun = _props.cancelFun;
      var _state2 = this.state;
      var leftSelects = _state2.leftSelects;
      var rightSelects = _state2.rightSelects;

      if (type === 'confirm' && submitFun && typeof submitFun === 'function') {
        submitFun(leftSelects, rightSelects);
      }
      if (type === 'cancel' && cancelFun && typeof cancelFun === 'function') {
        cancelFun(leftSelects, rightSelects);
      }
    }
  }, {
    key: 'initData',
    value: function initData() {
      var _props2 = this.props;
      var leftSelects = _props2.leftSelects;
      var rightSelects = _props2.rightSelects;

      if (leftSelects || rightSelects) {
        this.setInitState('leftSelects', leftSelects);
        this.setInitState('rightSelects', rightSelects);
      }
    }
  }, {
    key: 'setInitState',
    value: function setInitState(name, date) {
      if (!date) return;
      var newDate = {};
      date.forEach(function (item) {
        if (item.id) {
          newDate[item.id] = item;
        }
      });
      this.setStateWith(name, newDate);
    }
  }, {
    key: 'renderSelectList',
    value: function renderSelectList(name, selects) {
      var _this2 = this;

      if (name && selects) {
        return _react2['default'].createElement(
          'select',
          { name: name, ref: name, multiple: true, onChange: function (e) {
              return _this2.getSelected(e);
            } },
          selects.map(function (item, index) {
            return _react2['default'].createElement(
              'option',
              { key: index, value: item.id },
              item.title
            );
          })
        );
      }
    }
  }, {
    key: 'getSelected',
    value: function getSelected(e) {
      if (e.target) {
        var _e$target = e.target;
        var options = _e$target.options;
        var _name = _e$target.name;

        var readySelect = [];
        for (var i = 0; i < options.length; i++) {
          if (options[i].selected) {
            readySelect.push(options[i].value);
          }
        }
        var readyName = 'ready' + _name;
        this.setStateWith(readyName, readySelect);
      }
    }
  }, {
    key: 'addList',
    value: function addList() {
      var _this3 = this;

      var _state3 = this.state;
      var leftSelects = _state3.leftSelects;
      var rightSelects = _state3.rightSelects;
      var readyleftSelect = _state3.readyleftSelect;

      var newLeft = Object.assign(leftSelects);
      var newRight = Object.assign(rightSelects);
      if (readyleftSelect && readyleftSelect.length) {
        (function () {
          var leftKeys = Object.keys(leftSelects);
          readyleftSelect.forEach(function (item) {
            if (leftKeys.indexOf(item) >= 0) {
              newRight[item] = newLeft[item];
              _lodash2['default'].unset(newLeft, item);
            }
          });
          _this3.setStateWith('leftSelects', newLeft);
          _this3.setStateWith('rightSelects', newRight);
          // 解决无法触发onChange问题
          _this3.allMoveSelected('leftSelect');
        })();
      }
    }
  }, {
    key: 'removeList',
    value: function removeList() {
      var _this4 = this;

      var _state4 = this.state;
      var leftSelects = _state4.leftSelects;
      var rightSelects = _state4.rightSelects;
      var readyrightSelect = _state4.readyrightSelect;

      var newLeft = Object.assign(leftSelects);
      var newRight = Object.assign(rightSelects);
      if (readyrightSelect && readyrightSelect.length) {
        (function () {
          var rightKeys = Object.keys(rightSelects);
          readyrightSelect.forEach(function (item) {
            if (rightKeys.indexOf(item) >= 0) {
              newLeft[item] = newRight[item];
              _lodash2['default'].unset(newRight, item);
            }
          });
          _this4.setStateWith('leftSelects', newLeft);
          _this4.setStateWith('rightSelects', newRight);
          // 解决无法触发onChange问题
          _this4.allMoveSelected('rightSelect');
        })();
      }
    }
  }, {
    key: 'controlAll',
    value: function controlAll(type) {
      var _state5 = this.state;
      var leftSelects = _state5.leftSelects;
      var rightSelects = _state5.rightSelects;

      var newLeft = {};
      var newRight = {};
      if (type === 'add') {
        newRight = Object.assign(rightSelects, leftSelects);
      }
      if (type === 'remove') {
        newLeft = Object.assign(leftSelects, rightSelects);
      }
      this.setStateWith('leftSelects', newLeft);
      this.setStateWith('rightSelects', newRight);
    }
  }, {
    key: 'allMoveSelected',
    value: function allMoveSelected(name) {
      var options = this.refs[name].options;
      for (var i = 0; i < options.length; i++) {
        options[i].selected = false;
      }
    }
  }, {
    key: 'setStateWith',
    value: function setStateWith(name, value) {
      if (name && value) {
        this.setState(_defineProperty({}, name, value));
      }
    }
  }]);

  return MultiSelectPanel;
})(_react2['default'].Component);

exports['default'] = MultiSelectPanel;
module.exports = exports['default'];