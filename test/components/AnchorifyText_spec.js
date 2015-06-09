'use strict';
import React from 'react/addons';
import chai from 'chai';
let expect = chai.expect;
import AnchorifyText from '../../components/AnchorifyText';
const {TestUtils} = React.addons;

describe('Test of AnchorifyText', () => {

  const t0 = 'Hello World';
  const t1 = 'Hello Google(http://google.com)';
  const t2 = 'Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';
  const t3 = 'With custome anchor => Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com)';

  class CustomeAnchor extends React.Component {
    render() {
      return (
        <strong>
          {this.props.url}
        </strong>
      );
    }
  }

  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = TestUtils.renderIntoDocument(<AnchorifyText text={t1}/>);
    expect(component.props.regex).to.be.eql('\\b((?:[a-z][\\w-]+:(?:\\/{1,3}|[a-z0-9%])|www\\d{0,3}[.]|[a-z0-9.\\-]+[.][a-z]{2,4}\\/)(?:[^\\s()<>]+|\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\))+(?:\\(([^\\s()<>]+|(\\([^\\s()<>]+\\)))*\\)|[^\\s`!()\\[\\]{};:' + "'" + '.,<>?«»“”‘’]))');
    expect(component.props.flags).to.be.eql('ig');
    expect(component.props.target).to.be.eql('_blank');
  });

  it('should render only span tag when no urls found', function () {
    component = TestUtils.renderIntoDocument(<AnchorifyText text={t0}/>);
    const atag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag.length).to.be.eql(0);
    const spanTag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
    expect(React.findDOMNode(spanTag[0]).textContent).to.be.eql('Hello World');
  });

  it('should parse text and render url with a tag', function () {
    component = TestUtils.renderIntoDocument(<AnchorifyText text={t1}/>);
    const atag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag).to.be.length(1);
    expect(React.findDOMNode(atag[0]).getAttribute('href')).to.be.eql('http://google.com');
    expect(React.findDOMNode(atag[0]).textContent).to.be.eql('http://google.com');
    expect(React.findDOMNode(atag[0]).getAttribute('target')).to.be.eql('_blank');
  });


  it('should parse text and render urls with a tag', function () {
    component = TestUtils.renderIntoDocument(<AnchorifyText text={t2}/>);
    const atag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag).to.be.length(3);
    expect(React.findDOMNode(atag[0]).getAttribute('href')).to.be.eql('http://google.com');
    expect(React.findDOMNode(atag[0]).textContent).to.be.eql('http://google.com');
    expect(React.findDOMNode(atag[0]).getAttribute('target')).to.be.eql('_blank');

    expect(React.findDOMNode(atag[1]).getAttribute('href')).to.be.eql('https://github.com/');
    expect(React.findDOMNode(atag[1]).textContent).to.be.eql('https://github.com/');
    expect(React.findDOMNode(atag[1]).getAttribute('target')).to.be.eql('_blank');

    expect(React.findDOMNode(atag[2]).getAttribute('href')).to.be.eql('www.apple.com');
    expect(React.findDOMNode(atag[2]).textContent).to.be.eql('www.apple.com');
    expect(React.findDOMNode(atag[2]).getAttribute('target')).to.be.eql('_blank');
  });

  it('should parse text and render urls with custome tag', function () {

    component = TestUtils.renderIntoDocument(<AnchorifyText text={t3}><CustomeAnchor /></AnchorifyText>);
    const atag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag.length).to.be.eql(0);
    const strongTag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'strong');
    expect(strongTag).to.be.length(3);
    expect(React.findDOMNode(strongTag[0]).textContent).to.be.eql('http://google.com');
    expect(React.findDOMNode(strongTag[1]).textContent).to.be.eql('https://github.com/');
    expect(React.findDOMNode(strongTag[2]).textContent).to.be.eql('www.apple.com');
  });

  it('should parse text with custome regex', function () {

    component = TestUtils.renderIntoDocument(<AnchorifyText text={t2} regex={'google'} ><CustomeAnchor /></AnchorifyText>);
    const strongTag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'strong');
    expect(strongTag).to.be.length(2);
    expect(React.findDOMNode(strongTag[0]).textContent).to.be.eql('Google');
    expect(React.findDOMNode(strongTag[1]).textContent).to.be.eql('google');
  });

  it('should parse text with custome regex and flags', function () {

    component = TestUtils.renderIntoDocument(<AnchorifyText text={t2} regex={'google'} flags={''}><CustomeAnchor /></AnchorifyText>);
    const strongTag = TestUtils.scryRenderedDOMComponentsWithTag(component, 'strong');
    expect(strongTag).to.be.length(1);
    expect(React.findDOMNode(strongTag[0]).textContent).to.be.eql('google');
  });

});
