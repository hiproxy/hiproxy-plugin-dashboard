/**
 * @file
 * @author zdying
 */

/**
 * @file
 * @author zdying
 */

// https://www.behance.net/gallery/40165625/uKit-Dashboard-UIUX-Kit-Redesign
// https://picturepan2.github.io/spectre/layout.html#navbar

import React from 'react';
import { connect } from 'react-redux';

import {doClick} from './action';

import './styles.less';

import Menu from './Menu';
import Card from './Card';
import Table from './Table';
import Header from './Header';

export class Home extends React.Component {
  constructor (props) {
    super(props);
  }

  componentWillMount () {
  }

  render () {
    let {result} = this.props;
    return (
      <div className="container columns col-gapless">
        <div className="column col-2 side-bar">
          <div className="logo">
            <img src="./source/logo-light.svg" />
          </div>
          <Menu />
          <br/>
          <div style={{padding: '10px'}}>
            <h4>Counter: {result}</h4>
            <button className="btn btn-primary" onClick={this.onClick.bind(this)}>primary button</button>
          </div>
        </div>
        <div className="column col-10 body">
          <Header />
          <div className="main">
            <div className="cards mt-10">
              <Card />
              <Card />
              <Card />
            </div>
            <Table />
          </div>
        </div>
      </div>
    );
  }

  onClick () {
    let {dispatch} = this.props;

    dispatch({
      type: 'ADD'
    })
  }
};

function mapStateToProps (state) {
  return state.home;
// let {
//     list, fetchState, msg
// } = state.list
//
// return {
//     list,
//     fetchState,
//     msg
// }
}

export default connect(mapStateToProps)(Home);

Home.contextTypes = {
  // router: React.PropTypes.object.isRequired
};
