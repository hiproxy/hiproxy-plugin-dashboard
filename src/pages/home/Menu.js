export default (props) => {
  return (
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
  )
}