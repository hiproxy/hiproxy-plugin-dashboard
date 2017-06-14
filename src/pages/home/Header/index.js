/**
 * @file Header component
 * @author zdying
 */

import './styles.less';

export default (props) => {
  return (
    <header className="navbar">
      <section className="navbar-section">
        <h1>
          <a href="#" className="header-title mr-10">Welcome to Hiproxy Dashboard</a>          
        </h1>
      </section>
      <section className="navbar-section">
        {/*<div className="input-group input-inline">
          <input className="form-input" type="text" placeholder="search" />
          <button className="btn btn-primary input-group-btn">Search</button>
        </div>*/}
        <figure className="avatar" data-initial="Face">
          <img src="./source/avatar-1.png" alt="Face" />
        </figure>
      </section>
    </header>
  )
}