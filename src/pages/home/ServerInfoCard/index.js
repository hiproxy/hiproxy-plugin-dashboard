/**
 * @file Card component
 * @author zdying
 */

import './styles.less';

export default ({data, pid}) => {
  let {title, port, listening, address} = data;
  console.log('data:', data);
  return (
    <div className="card mr-10">
      <div className="card-header">
        <h4 className="card-title">{title}</h4>
      </div>
      <div className="card-body">
        <ul>
          <li>
            <span className="service-label">State</span>
            <span className="service-state color-green text-capitalize">&nbsp;</span>
          </li>
          <li>
            <span className="service-label"></span>
            <span className="service-state color-blue text-capitalize">{listening ? 'running' : 'stoped'}</span>
          </li>
          <li>
            <span className="service-label">Service Port</span>
            <span className="service-state">{address.port}</span>
          </li>
          <li>
            <span className="service-label">Process ID</span>
            <span className="service-state">{pid}</span>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary btn-sm">Restart</button>
        <button className="btn btn-primary btn-sm">Stop</button>
        <button className="btn btn-primary btn-sm" onClick={open}>Open Browser</button>
      </div>
    </div>
  )
}

function open () {
  fetch('http://127.0.0.1:5525/api?action=open').then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.log(err);
  });
}