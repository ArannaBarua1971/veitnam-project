import React from "react";
import { NavLink,useMatch } from "react-router-dom";

function Submenu({ children ,nav}) {
  return (
    <div className="submenu">
      {nav.map((childNav) => (
        <div className="mainNav">
          <NavLink
            to={childNav.path}
            className={({ isActive }) =>
              isActive
                ? "active-nav text-light h6 p-2  d-flex justify-content-between"
                : "text-light h6 p-2  d-flex justify-content-between"
            }
          >
            <div className="navigation">{childNav.name}</div>
          </NavLink>
          {children}
        </div>
      ))}
    </div>
  );
}

export default Submenu;
