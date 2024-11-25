import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.scss";

const MainNavigation = () => {
  const navDataHandler = (navData) => navData.isActive ? classes.active : "";

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Minisearch</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/blogs" className={navDataHandler}>All Blogs</NavLink>
        
          </li>
          <li>
            <NavLink to="/blog-form" className={navDataHandler}>
              Add a Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
