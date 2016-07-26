'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import AnchorifyText  from '../lib';

//allow react dev tools work
window.React = React;

const t0 = 'Hello　World';
const t1 = 'Hello Google(http://google.com)';
const t2 = 'Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';
const t3 = 'With custome anchor: Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';
const t4 = 'With custome regex: Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';

class CustomeAnchor extends React.Component {
  render() {
    return (
      <strong>
        {this.props.url}
      </strong>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (
      <div>
        <div>
          <p>{t1}</p>
          <p>↓</p>
          <p><AnchorifyText text={t1}></AnchorifyText></p>
        </div>
        <hr/>
        <div>
          <p>{t2}</p>
          <p>↓</p>
          <p><AnchorifyText text={t2}></AnchorifyText></p>
        </div>
        <hr/>
        <div>
          <p>{t3}</p>
          <p>↓</p>
          <p><AnchorifyText text={t3}>
            <CustomeAnchor />
          </AnchorifyText></p>
        </div>
        <hr/>
        <div>
          <p>{t4}</p>
          <p>Regex: 'google'</p>
          <p>↓</p>
          <p><AnchorifyText text={t4} regex={'google'} flags={""}/><CustomeAnchor /></p>
        </div>
      </div>
    )
  }
};

ReactDom.render(<App/>, document.getElementById('out'));
