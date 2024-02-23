import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import home from "../../conf/home"

function Sidbar({ className }) {
  const navigate=useNavigate()
  const navBar = [
    {
      path: "/admin/add-article",
      name: "Add Article",
      icon: "fa-solid fa-newspaper",
    },
    {
      path: "/admin/add-membership",
      name: "Add Membership",
      icon: "fa-solid fa-check",
    },
    {
      path: "/admin/all-user",
      name: "All User",
      icon: "fa-solid fa-users",
    },
    {
      path: "/admin/all-membership-user",
      name: "All Membership User",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/all-course-user",
      name: "All Course User",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/short-deal",
      name: "Add Short Deal ",
      icon: "fas fa-truck",
    },
    {
      path: "/admin/long-deal",
      name: "Add Long Deal",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/add-asset",
      name: "Add Asset",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/upload-data",
      name: "Upload Data",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/Add-course",
      name: "Add Course",
      icon: "fa-solid fa-user",
    },
    {
      path: "/admin/Add-vedio",
      name: "Add Video for Course",
      icon: "fa-solid fa-user",
    },
  ];
  

  return (
    <nav className={`side-nav ${className} bg-black`}>
      <NavLink to={"/"} className="intro-x d-flex align-items-center ps-3 pt-4">
        <i className="text-white border p-3 rounded fa-solid fa-house"></i>
        <span className="d-none d-xl-block text-white fs-lg ms-3">
          <span className="fw-medium">Home</span> 
        </span>
      </NavLink>
      <div className="side-nav__devider my-6"></div>
      <ul>
        {navBar.map((nav, index) => (
          <li key={index}>
            <NavLink
              to={nav.path}
              className={({ isActive }) =>
                isActive
                  ? "side-menu side-menu--active side-menu--open"
                  : "side-menu"
              }
              // className={`${home+nav.path==window.location.href ? "side-menu side-menu--active side-menu--open ":"side-menu "})`}
            >
              <div className="side-menu__icon">
                {" "}
                <i className={nav.icon}></i>{" "}
              </div>
              <div className="side-menu__title"> {nav.name} </div>
            </NavLink>
          </li>
        ))}

        {/* <li>
          <a
            href="javascript:;"
            className="side-menu side-menu--active side-menu--open"
          >
            <div className="side-menu__icon">
              {" "}
              <i data-feather="home"></i>{" "}
            </div>
            <div className="side-menu__title">
              Dashboard
              <div className="side-menu__sub-icon">
                {" "}
                <i data-feather="chevron-down"></i>{" "}
              </div>
            </div>
          </a>
          <ul className="side-menu__sub-open">
            <li>
              <a
                href="index.html"
                className="side-menu side-menu--active side-menu--open"
              >
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="activity"></i>{" "}
                </div>
                <div className="side-menu__title"> Overview 1 </div>
              </a>
            </li>
            <li>
              <a
                href="side-menu-light-dashboard-overview-2.html"
                className="side-menu"
              >
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="activity"></i>{" "}
                </div>
                <div className="side-menu__title"> Overview 2 </div>
              </a>
            </li>
            <li>
              <a
                href="side-menu-light-dashboard-overview-3.html"
                className="side-menu"
              >
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="activity"></i>{" "}
                </div>
                <div className="side-menu__title"> Overview 3 </div>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="side-menu-light-inbox.html" className="side-menu">
            <div className="side-menu__icon">
              {" "}
              <i data-feather="inbox"></i>{" "}
            </div>
            <div className="side-menu__title"> Inbox </div>
          </a>
        </li> */}
      </ul>
    </nav>
  );
}

export default Sidbar;
