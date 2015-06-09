'use strict';

import React from 'react/addons';
import AnchorifyText  from '../components/AnchorifyText';

//allow react dev tools work
window.React = React;

const t0 = 'Hello　World';
const t1 = 'Hello Google(http://google.com)';
const t2 = 'Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';
const t3 = 'With custome anchor => Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';

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
          <p>{t2}</p>
          <p>↓</p>
          <p><AnchorifyText text={t2} regex={'google'} flags={""}/><CustomeAnchor /></p>
        </div>
      </div>
    )
  }
};

React.render(<App/>, document.getElementById('out'));
