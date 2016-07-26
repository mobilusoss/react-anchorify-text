import React from 'react';
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
    const matches = this.props.linkify.match(text);
    if (matches === null){
      return text;
    }
    let last = 0;
    const result = [];
    matches.forEach((match, i) => {
      const keyBefore = 'anchorify-text-before' + i;
      const keyMatch = 'anchorify-text-match' + i;
      if (last < match.index) {
        result.push(<span key={keyBefore}>{text.slice(last, match.index)}</span>);
      }
      if (React.Children.count(this.props.children) === 1) {
        result.push(React.cloneElement(this.props.children, {url: match.url, key: keyMatch, match: match}));
      } else {
        result.push(<a key={keyMatch} href={match.url} target={this.props.target}>{match.raw}</a>);
      }
      last = match.lastIndex;
    });
    if (last < text.length) {
      result.push(<span key={'anchorify-text-last'}>{text.slice(last)}</span>);
    }
    return result;
  }
}

AnchorifyText.propTypes = {
  text: React.PropTypes.string.isRequired,
  linkify: React.PropTypes.object,
  target: React.PropTypes.string,
};

AnchorifyText.defaultProps = {
  linkify: new LinkifyIt().tlds(tlds),
  target: '_blank',
};

export default AnchorifyText;
