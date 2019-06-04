"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _linkifyIt = _interopRequireDefault(require("linkify-it"));

var _tlds = _interopRequireDefault(require("tlds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AnchorifyText =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AnchorifyText, _React$Component);

  function AnchorifyText(props) {
    _classCallCheck(this, AnchorifyText);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnchorifyText).call(this, props));
  }

  _createClass(AnchorifyText, [{
    key: "render",
    value: function render() {
      var content = this.anchorify(this.props.text);
      return _react["default"].createElement("span", null, content);
    }
  }, {
    key: "anchorify",
    value: function anchorify(text) {
      var _this = this;

      var matches = this.props.linkify.match(text);

      if (matches === null) {
        return text;
      }

      var last = 0;
      var result = [];
      matches.forEach(function (match, i) {
        var keyBefore = 'anchorify-text-before' + i;
        var keyMatch = 'anchorify-text-match' + i;

        if (last < match.index) {
          result.push(_react["default"].createElement("span", {
            key: keyBefore
          }, text.slice(last, match.index)));
        }

        if (_react["default"].Children.count(_this.props.children) === 1) {
          result.push(_react["default"].cloneElement(_this.props.children, {
            url: match.url,
            key: keyMatch,
            match: match
          }));
        } else {
          result.push(_react["default"].createElement("a", {
            key: keyMatch,
            href: match.url,
            target: _this.props.target
          }, match.raw));
        }

        last = match.lastIndex;
      });

      if (last < text.length) {
        result.push(_react["default"].createElement("span", {
          key: 'anchorify-text-last'
        }, text.slice(last)));
      }

      return result;
    }
  }]);

  return AnchorifyText;
}(_react["default"].Component);

AnchorifyText.propTypes = {
  text: _propTypes["default"].string.isRequired,
  linkify: _propTypes["default"].object,
  target: _propTypes["default"].string
};
AnchorifyText.defaultProps = {
  linkify: new _linkifyIt["default"]().tlds(_tlds["default"]),
  target: '_blank'
};
var _default = AnchorifyText;
exports["default"] = _default;