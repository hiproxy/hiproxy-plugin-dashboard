export default (props) => {
  return (
    <ul className="menu">
      <li className="menu-item">
        <a href="/dashboard/">
          <i className="icon icon-link"></i> Hiproxy Dashboard
        </a>
      </li>
      <li className="menu-item">
        <a href="https://github.com/hiproxy" target="_blank">
          <i className="icon icon-photo"></i> Github
        </a>
      </li>
      <li className="menu-item">
        <a href="https://github.com/hiproxy/hiproxy/issues" target="_blank">
          <i className="icon icon-emoji"></i> New Issues
        </a>
      </li>
    </ul>
  )
}