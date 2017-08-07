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
      {
        this.state.serverInfo.map( server => {
          let {title, listening, port, type, address} = server;

          return <div className="card-body">
              <ul>
                <li>
                  <span className="service-label">{title}</span>
                  <span className="service-state color-green text-capitalize">&nbsp;</span>
                </li>
                <li>
                  <span className="service-label"></span>
                  <span className="service-state color-blue text-capitalize">{address ? 'running' : 'stoped'}</span>
                </li>
                <li>
                  <span className="service-label">Service Port</span>
                  <span className="service-state">{port}</span>
                </li>
                <li>
                  <span className="service-label">Process ID</span>
                  <span className="service-state">{pid}</span>
                </li>
              </ul>
            </div>
        })
      }
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

