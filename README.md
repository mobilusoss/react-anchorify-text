# React-anchorify-text [![Build Status](https://travis-ci.org/mobilusoss/react-anchorify-text.svg?branch=develop)](https://travis-ci.org/mobilusoss/react-anchorify-text) [![npm version](https://badge.fury.io/js/react-anchorify-text.svg)](http://badge.fury.io/js/react-anchorify-text)

Create anchor tag with urls in text.

## Demo

[View Demo](http://mobilusoss.github.io/react-anchorify-text/example/)

## Installation

```bash
npm install --save react-anchorify-text
```

## API

### `AnchorifyText`

#### Props

```javascript
AnchorifyText.propTypes = {
  text: React.PropTypes.string.isRequired,
  linkify: React.PropTypes.object,
  flags: React.PropTypes.string,
};
```

  * `text`: String to parse url

  * `linkify`: An instance of [linkify-it](https://github.com/markdown-it/linkify-it). default: `new LinkifyIt().tlds(require('tlds'))`

  * `target`: href target for anchor tag, default to "_blank".

  * ~~`regex`: Regular expression as string to detect url .~~

  * ~~`flags`: Regular expression's frag, default to "ig".~~

  `regex` and `flags` props are removed from v2.0.0. Use [linkify-it](https://github.com/markdown-it/linkify-it) instance instead.

#### Children

If no children are passed to `AnchorifyText`, found urls will be rendered as `<a>` tag.
If one child are passed to `AnchorifyText`, found urls are rendered as child tag with `url` as prop.


## Usage example

```javascript

const textWithUrl = "Hello Google(http://google.com) and GitHub => https://github.com/ and Apple(www.apple.com)";

<AnchorifyText text={textWithUrl}></AnchorifyText>

<AnchorifyText text={textWithUrl}>
  <MyCustomAnchor></MyCustomAnchor>
</AnchorifyText>
```

See  [example](https://github.com/mobilusoss/react-anchorify-text/tree/develop/example)

```bash
npm install
npm run start:example
```

## Tests

```bash
npm test
```
