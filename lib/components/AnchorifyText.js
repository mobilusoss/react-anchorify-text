'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _linkifyIt = require('linkify-it');

var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

var _tlds = require('tlds');

var _tlds2 = _interopRequireDefault(_tlds);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AnchorifyText = function (_React$Component) {
  _inherits(AnchorifyText, _React$Component);

  function AnchorifyText(props) {
    _classCallCheck(this, AnchorifyText);

    return _possibleConstructorReturn(this, (AnchorifyText.__proto__ || Object.getPrototypeOf(AnchorifyText)).call(this, props));
  }

  _createClass(AnchorifyText, [{
    key: 'render',
    value: function render() {
      var content = this.anchorify(this.props.text);
      return _react2.default.createElement(
        'span',
        null,
        content
      );
    }
  }, {
    key: 'anchorify',
    value: function anchorify(text) {
      var _this2 = this;

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
          result.push(_react2.default.createElement(
            'span',
            { key: keyBefore },
            text.slice(last, match.index)
          ));
        }
        if (_react2.default.Children.count(_this2.props.children) === 1) {
          result.push(_react2.default.cloneElement(_this2.props.children, { url: match.url, key: keyMatch, match: match }));
        } else {
          result.push(_react2.default.createElement(
            'a',
            { key: keyMatch, href: match.url, target: _this2.props.target },
            match.raw
          ));
        }
        last = match.lastIndex;
      });
      if (last < text.length) {
        result.push(_react2.default.createElement(
          'span',
          { key: 'anchorify-text-last' },
          text.slice(last)
        ));
      }
      return result;
    }
  }]);

  return AnchorifyText;
}(_react2.default.Component);

AnchorifyText.propTypes = {
  text: _propTypes2.default.string.isRequired,
  linkify: _propTypes2.default.object,
  target: _propTypes2.default.string
};

AnchorifyText.defaultProps = {
  linkify: new _linkifyIt2.default().tlds(_tlds2.default),
  target: '_blank'
};

exports.default = AnchorifyText;