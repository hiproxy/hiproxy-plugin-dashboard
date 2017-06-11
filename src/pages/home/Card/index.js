/**
 * @file Card component
 * @author zdying
 */

import './styles.less';

export default ({title, subTitle, body}) => {
  return (
    <div className="card mr-10">
      {/*<div className="card-image">
        <img src="https://picturepan2.github.io/spectre/img/macos-sierra.jpg" className="img-responsive" />
      </div>*/}
      <div className="card-header">
        <h4 className="card-title">hiproxy http server</h4>
        {/*<h6 className="card-subtitle">Software and hardware</h6>*/}
      </div>
      <div className="card-body">
        <ul>
          <li>
            <span className="service-label">HTTP</span>
            <span className="service-state color-green">running</span>
          </li>
          <li>
            <span className="service-label">HTTPS</span>
            <span className="service-state color-blue">stoped</span>
          </li>
          <li>
            <span className="service-label">Service Port</span>
            <span className="service-state">5525</span>
          </li>
          <li>
            <span className="service-label">Process ID</span>
            <span className="service-state">6513</span>
          </li>
        </ul>
      </div>
      <div className="card-footer">
        <button className="btn btn-primary btn-sm">Restart</button>
        <button className="btn btn-primary btn-sm">Stop</button>        
      </div>
    </div>
  )
}