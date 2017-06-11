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
          <ul className="menu">
            <li className="menu-item">
              <a href="#">
                <i className="icon icon-link"></i> Slack
              </a>
            </li>
            <li className="menu-item">
              <a href="#">
                <i className="icon icon-photo"></i> HiProxy
              </a>
            </li>
            <li className="menu-item">
              <a href="#">
                <i className="icon icon-emoji"></i> Nginx
              </a>
            </li>
            <li className="menu-item">
              <div className="menu-badge">
                <label className="label label-primary">2</label>
              </div>
              <a href="#">
                <i className="icon icon-message"></i> Settings
              </a>
            </li>
          </ul>
        </div>
        <div className="column col-10">
          <header className="navbar">
            <section className="navbar-section">
              <a href="#" className="navbar-brand mr-10">hiproxy</a>
            </section>
            <section className="navbar-section">
              <div className="input-group input-inline">
                <input className="form-input" type="text" placeholder="search" />
                <button className="btn btn-primary input-group-btn">Search</button>
              </div>
            </section>
          </header>
          <div className="main">
            <h1 style={{fontWeight: 300}}>Welcome to Hiproxy Dashboard</h1>
            Counter: <h4>{result}</h4>
            <button className="btn btn-primary" onClick={this.onClick.bind(this)}>primary button</button>
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
