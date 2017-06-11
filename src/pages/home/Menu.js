export default (props) => {
  return (
    <ul className="menu">
      <li className="menu-item">
        <a href="#">
          <i className="icon icon-link"></i> Hiproxy Service
        </a>
      </li>
      <li className="menu-item">
        <a href="#">
          <i className="icon icon-photo"></i> Github
        </a>
      </li>
      <li className="menu-item">
        <a href="#">
          <i className="icon icon-emoji"></i> Create Issues
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