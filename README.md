# React-anchorify-text [![Build Status](https://travis-ci.org/georgeOsdDev/react-anchorify-text.svg?branch=develop)](https://travis-ci.org/georgeOsdDev/react-anchorify-text) [![npm version](https://badge.fury.io/js/react-anchorify-text.svg)](http://badge.fury.io/js/react-anchorify-text)

Create anchor tag with urls in text.

## Demo

[View Demo](http://georgeosddev.github.io/react-anchorify-text/example/)

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
  regex: React.PropTypes.string,
  flags: React.PropTypes.string,
  target: React.PropTypes.string
};
```

  * `text`: String to parse url

  * `regex`: Regular expression as string to detect url .
    Default to

    ```javascript
    '\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + "'" + '.,<>?«»“”‘’]))',
    ```
    from http://stackoverflow.com/questions/17733236/optimize-gruber-url-regex-for-javascript

  * `flags`: Regular expression's frag, default to "ig".

  * `target`: href target for anchor tag, default to "_blank".

  passed `regex` and `flags` will be used as `new Regex(this.props.regex, this.props.flags)`


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

See  [example](https://github.com/georgeOsdDev/react-anchorify-text/tree/develop/example)

```bash
npm install
npm run start:example
```

## Tests

```bash
npm test
```