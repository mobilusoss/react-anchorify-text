import React from 'react';
import PropTypes from 'prop-types';
import LinkifyIt from 'linkify-it';
import tlds from 'tlds';

class AnchorifyText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = this.anchorify(this.props.text);
    return (
      <span>{content}</span>
    );
  }

  anchorify(text) {
    const { linkify, children, target, nonUrlPartsRenderer } = this.props;

    const matches = linkify.match(text);
    if (matches === null){
      return nonUrlPartsRenderer(text);
    }
    let last = 0;
    const result = [];
    matches.forEach((match, i) => {
      const keyBefore = 'anchorify-text-before' + i;
      const keyMatch = 'anchorify-text-match' + i;
      if (last < match.index) {
        result.push(<span key={keyBefore}>{nonUrlPartsRenderer(text.slice(last, match.index))}</span>);
      }
      if (React.Children.count(children) === 1) {
        result.push(React.cloneElement(children, {url: match.url, key: keyMatch, match: match}));
      } else {
        result.push(<a key={keyMatch} href={match.url} target={target}>{nonUrlPartsRenderer(match.raw)}</a>);
      }
      last = match.lastIndex;
    });
    if (last < text.length) {
      result.push(<span key={'anchorify-text-last'}>{nonUrlPartsRenderer(text.slice(last))}</span>);
    }
    return result;
  }
}

AnchorifyText.propTypes = {
  text: PropTypes.string.isRequired,
  linkify: PropTypes.object,
  target: PropTypes.string,
  nonUrlPartsRenderer: PropTypes.func,
};

AnchorifyText.defaultProps = {
  linkify: new LinkifyIt().tlds(tlds),
  target: '_blank',
  nonUrlPartsRenderer: (text) => text,
};

export default AnchorifyText;
