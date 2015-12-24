'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DELIMITER = String.fromCharCode('\b');

var AnchorifyText = (function (_React$Component) {
  _inherits(AnchorifyText, _React$Component);

  function AnchorifyText(props) {
    _classCallCheck(this, AnchorifyText);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AnchorifyText).call(this, props));

    var regex = undefined;
    if (_this.props.flags) {
      regex = new RegExp(_this.props.regex, _this.props.flags);
    } else {
      regex = new RegExp(_this.props.regex);
    }
    _this.state = {
      regex: regex
    };
    return _this;
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

      return text.replace(this.state.regex, function (url) {
        return DELIMITER + url + DELIMITER;
      }).split(DELIMITER).map(function (t, i) {
        var key = 'anchorify-text-' + i;
        if (_this2.state.regex.test(t)) {
          if (_react2.default.Children.count(_this2.props.children) === 1) {
            return _react2.default.cloneElement(_this2.props.children, { url: t, key: key });
          } else {
            return _react2.default.createElement(
              'a',
              { key: key, href: t, target: _this2.props.target },
              t
            );
          }
        } else {
          return _react2.default.createElement(
            'span',
            { key: key },
            t
          );
        }
      });
    }
  }]);

  return AnchorifyText;
})(_react2.default.Component);

AnchorifyText.propTypes = {
  text: _react2.default.PropTypes.string.isRequired,
  regex: _react2.default.PropTypes.string,
  flags: _react2.default.PropTypes.string,
  target: _react2.default.PropTypes.string
};

AnchorifyText.defaultProps = {
  // http://stackoverflow.com/questions/17733236/optimize-gruber-url-regex-for-javascript
  regex: '\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + "'" + '.,<>?«»“”‘’]))',
  flags: 'ig',
  target: '_blank'
};

exports.default = AnchorifyText;