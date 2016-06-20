'use strict';

import React from 'react';

const DELIMITER = String.fromCharCode('\u0008');

class AnchorifyText extends React.Component {
  constructor(props) {
    super(props);

    let regex;
    if (this.props.flags) {
      regex = new RegExp(this.props.regex, this.props.flags);
    } else {
      regex = new RegExp(this.props.regex);
    }
    this.state = {
      regex: regex
    };
  }

  render() {
    let content = this.anchorify(this.props.text);
    return (
      <span>{content}</span>
    );
  }

  anchorify(text) {
    return text.replace(this.state.regex, function(url) {
                    return DELIMITER + url + DELIMITER;
                })
                .split(DELIMITER)
                .map((t, i) => {
                  let key = 'anchorify-text-' + i;
                  if (this.state.regex.test(t)) {
                    if (React.Children.count(this.props.children) === 1) {
                      return React.cloneElement(this.props.children, {url: t, key: key});
                    } else {
                      const hrefURL = t.indexOf('://') === -1 ? 'http://' + t : t;
                      return (<a key={key} href={hrefURL} target={this.props.target}>{t}</a>);
                    }
                  } else {
                    return (<span key={key} >{t}</span>);
                  }
                });
  }
}

AnchorifyText.propTypes = {
  text: React.PropTypes.string.isRequired,
  regex: React.PropTypes.string,
  flags: React.PropTypes.string,
  target: React.PropTypes.string
};

AnchorifyText.defaultProps = {
  // http://stackoverflow.com/questions/17733236/optimize-gruber-url-regex-for-javascript
  regex: '\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + "'" + '.,<>?«»“”‘’]))',
  flags: 'ig',
  target: '_blank'
};

export default AnchorifyText;
