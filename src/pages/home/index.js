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
import ServerInfoCard from './ServerInfoCard';
import Table from './Table';
import Header from './Header';
import Editor from './Editor';

export class Home extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      serverInfo: window.serverInfo,
      hosts: '',
      rewrites: '',
      showPacFile: true
    }
  }

  render () {
    let originServerInfo = window.serverInfo;
    let { serverInfo, hosts, rewrites, showPacFile } = this.state;
    let httpServer = serverInfo.httpServer;
    let httpsServer = serverInfo.httpsServer;
    let pacFile = "http://127.0.0.1:" + httpServer.port + '/proxy.pac';
    httpServer.type = 'http';
    httpsServer.type = 'https';

    return (
      <div className="home-page col-gapless">
        <div className="side-bar">
          <div className="logo">
            <img src="./source/logo-light.svg" />
          </div>
          <Menu />
          {/*<br/>
          <div style={{padding: '10px'}}>
            <h4>Counter: {result}</h4>
            <button className="btn btn-primary" onClick={this.onClick.bind(this)}>primary button</button>
          </div>*/}
        </div>
        <div className="body">
          <Header />
          {
            showPacFile && httpServer.address ?
            <div className="toast ml-10 mr-10 mt-10" style={{width: 'auto'}}>
              <button onClick={()=>{this.setState({showPacFile:false})}} className="btn btn-clear float-right"></button>
              Proxy-Auto-Conifg File: <a href={pacFile + '?type=view'} target="_blank" style={{fontWeight: 400}}>{pacFile}</a>
            </div> :
            null
          }
          {/*<SimpleEditor />*/}
          <div className="main">
            <div className="cards mt-10">
              <ServerInfoCard data={[httpServer,httpsServer]} pid={serverInfo.pid}/>
            </div>
            {!!Object.keys(originServerInfo.hosts).length && <div>
              <div className="table-header">
                <h5 className="mt-10">Hosts Files</h5>
                <div className="search input-group input-inline">
                  <input className="form-input input-sm"
                    onChange={ this.changeValue.bind(this, 'hosts') }
                    value={ hosts }
                    type="text"
                    placeholder="file name or domain" />
                  <button className="btn btn-primary btn-sm input-group-btn">Filter</button>
                </div>
            </div>
             <Table files={serverInfo.hosts} fileType="hosts" port={serverInfo.httpServer.port}/>
            </div>
            }

            {!!Object.keys(originServerInfo.rewrites).length && <div>
              <div className="table-header">
                <h5 className="mt-10">Rewrite Files</h5>
                <div className="search input-group input-inline">
                  <input className="form-input input-sm"
                    onChange={ this.changeValue.bind(this, 'rewrites') }
                    type="text"
                    value={ rewrites }
                    placeholder="file name or domain" />
                  <button className="btn btn-primary btn-sm input-group-btn">Filter</button>
                </div>
              </div>
              <Table files={serverInfo.rewrites} fileType="rewrite" className="mt-10" port={serverInfo.httpServer.port}/>
            </div>
            }
            {/*<Editor />*/}
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

  changeValue(type,e) {
    let orginServerInfo = window.serverInfo;
    let key = e.currentTarget.value;
    let serverInfo = JSON.parse(JSON.stringify(orginServerInfo))
    let temp = {};
    let result = {};

    Object.keys(orginServerInfo[type]).forEach( item => {
      if (item.indexOf(key) != -1) {
        temp[item] = orginServerInfo.rewrites[item];
      }
    });

    serverInfo[type] = temp;

    result[type] = key;
    result.serverInfo = serverInfo;

    this.setState(Object.assign(this.state,result))
  }
}

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
