/**
 * @file Card component
 * @author zdying
 */

import './styles.less';

export default class ServerInfoCard extends React.Component {

  constructor(props,state) {
    super(props, state);

    this.state = {
      serverInfo: this.props.data,
      pid: this.props.pid,
      port: this.props.data[0].port
    }

    this.open = this.open.bind(this);
    this.restartServer = this.restartServer.bind(this);
  }

  render() {
    let pid = this.state.pid;

    return <div className="servers">
      <div className="card mr-10">

      <div className="card-header">
        <h4 className="card-title">hiproxy server</h4>
      </div>
      <ul className="card-body">
      {
        this.state.serverInfo.map( server => {
          let {port, type} = server;

          return <li>
                  <span className="service-label">{ type } port</span>
                  <span className="service-state">{ port }</span>
                </li>
        })
      }
      </ul>
        <div>
        <span className="service-label">Process ID</span>
        <span className="service-state">{pid}</span>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary btn-sm" onClick={this.restartServer}>Restart</button>
        <button className="btn btn-primary btn-sm" onClick={this.open}>Open Browser</button>
      </div>
      </div>
    </div>
  }


  open () {
    fetch('http://127.0.0.1:' + this.state.port + '/api?action=open').then(function (res) {
      console.log(res);
    }).catch(function (err) {
      console.log(err);
    });
  }

  restartServer () {
    fetch('http://127.0.0.1:' + this.state.port + '/api?action=restart').then(function (res) {
      location.reload();
    }).catch(function (err) {
      console.log(err);
    });
  }
}

