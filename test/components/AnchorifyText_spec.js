import LinkifyIt from 'linkify-it';
import tlds from 'tlds';
import React from 'react';
import ReactDom from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';
import chai from 'chai';
let expect = chai.expect;
import AnchorifyText from '../../src/components/AnchorifyText';

describe('Test of AnchorifyText', () => {

  const t0 = 'Hello World';
  const t1 = 'Hello Google(http://google.com)';
  const t2 = 'Hello Google(http://google.com) and GitHub(https://github.com/) and Apple(www.apple.com) and Onion(xxx.onion)';
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

  CustomeAnchor.propTypes = {
    url : React.PropTypes.string
  }

  let component;

  beforeEach(() => {
  });

  it('should have default properties', function () {
    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t1}/>);
    expect(component.props.target).to.be.eql('_blank');
    expect(component.props.linkify).to.be.an('object');
  });

  it('should render only span tag when no urls found', function () {
    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t0}/>);
    const atag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag.length).to.be.eql(0);
    const spanTag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'span');
    expect(ReactDom.findDOMNode(spanTag[0]).textContent).to.be.eql('Hello World');
  });

  it('should parse text and render url with a tag', function () {
    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t1}/>);
    const atag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag).to.be.length(1);
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('href')).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).textContent).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('target')).to.be.eql('_blank');
  });


  it('should parse text and render urls with a tag', function () {
    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t2}/>);
    const atag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag).to.be.length(3);
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('href')).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).textContent).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[1]).getAttribute('href')).to.be.eql('https://github.com/');
    expect(ReactDom.findDOMNode(atag[1]).textContent).to.be.eql('https://github.com/');
    expect(ReactDom.findDOMNode(atag[1]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[2]).getAttribute('href')).to.be.eql('http://www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).textContent).to.be.eql('www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).getAttribute('target')).to.be.eql('_blank');
  });

  it('should parse text and render urls with custome linkify', function () {

    const myLinkify = new LinkifyIt().tlds(tlds).tlds('onion', true);
    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t2} linkify={myLinkify} />);
    const atag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag).to.be.length(4);
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('href')).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).textContent).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(atag[0]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[1]).getAttribute('href')).to.be.eql('https://github.com/');
    expect(ReactDom.findDOMNode(atag[1]).textContent).to.be.eql('https://github.com/');
    expect(ReactDom.findDOMNode(atag[1]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[2]).getAttribute('href')).to.be.eql('http://www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).textContent).to.be.eql('www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[2]).getAttribute('href')).to.be.eql('http://www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).textContent).to.be.eql('www.apple.com');
    expect(ReactDom.findDOMNode(atag[2]).getAttribute('target')).to.be.eql('_blank');

    expect(ReactDom.findDOMNode(atag[3]).getAttribute('href')).to.be.eql('http://xxx.onion');
    expect(ReactDom.findDOMNode(atag[3]).textContent).to.be.eql('xxx.onion');
    expect(ReactDom.findDOMNode(atag[3]).getAttribute('target')).to.be.eql('_blank');

  });

  it('should parse text and render urls with custome tag', function () {

    component = ReactTestUtils.renderIntoDocument(<AnchorifyText text={t3}><CustomeAnchor /></AnchorifyText>);
    const atag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'a');
    expect(atag.length).to.be.eql(0);
    const strongTag = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, 'strong');
    expect(strongTag).to.be.length(3);
    expect(ReactDom.findDOMNode(strongTag[0]).textContent).to.be.eql('http://google.com');
    expect(ReactDom.findDOMNode(strongTag[1]).textContent).to.be.eql('https://github.com/');
    expect(ReactDom.findDOMNode(strongTag[2]).textContent).to.be.eql('http://www.apple.com');
  });

});
