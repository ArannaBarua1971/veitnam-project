import React, { useState } from "react";
import { Logo, Button, Submenu } from "../../components";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

function Daseboard() {
  const navigate = useNavigate();
  const navs = [
    {
      name: "Add Article",
      icon: "fas fa-list",
      path: "/daseboard",
      childNavs: [
        {
          name: "unlock Article",
          path: "/daseboard",
        },
        {
          name: "lock Article",
          path: "/daseboard/article/lock",
        },
      ],
    },
    {
      name: "Membership",
      icon: "fas fa-list",
      path: "/membership/daseboard/add",
      childNavs: [
        {
          name: "add memebership ",
          path: "/membership/daseboard/add",
        },
      ],
    },
  ];

  const [showNavigation, setShowNavigation] = useState(false);
  const [iconNav, seticonNav] = useState(true);
  const showNav = () => {
    setShowNavigation((pre) => !pre);
    seticonNav((pre) => !pre);
  };
  return (
    <div className="daseboard">
      {/* <!-- BEGIN: Mobile Menu --> */}
      <div className="mobile-menu d-md-none">
        <div className="mobile-menu-bar">
          <a href="index.html" className="d-flex me-auto">
            <img
              alt="Rubick Bootstrap HTML Admin Template"
              className="w-6"
              src="dist/images/logo.svg"
            />
          </a>
          <a
            href="javascript:;"
            id="mobile-menu-toggler"
            className="mobile-menu-bar__toggler"
          >
            {" "}
            <i data-feather="bar-chart-2" className="w-8 h-8 text-white"></i>{" "}
          </a>
        </div>
        <ul className="mobile-menu-wrapper border-top border-theme-29 dark-border-dark-3 py-5">
          <li>
            <a href="javascript:;.html" className="menu menu--active">
              <div className="menu__icon">
                {" "}
                <i data-feather="home"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Dashboard{" "}
                <i
                  data-feather="chevron-down"
                  className="menu__sub-icon menu__sub-icon--active"
                ></i>{" "}
              </div>
            </a>
            <ul className="menu__sub-open">
              <li>
                <a href="index.html" className="menu menu--active">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 1 </div>
                </a>
              </li>
              <li>
                <a
                  href="side-menu-light-dashboard-overview-2.html"
                  className="menu"
                >
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 2 </div>
                </a>
              </li>
              <li>
                <a
                  href="side-menu-light-dashboard-overview-3.html"
                  className="menu"
                >
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 3 </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="box"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Menu Layout{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>
              </div>
            </a>
            <ul className="">
              <li>
                <a href="index.html" className="menu menu--active">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Side Menu </div>
                </a>
              </li>
              <li>
                <a
                  href="simple-menu-light-dashboard-overview-1.html"
                  className="menu menu--active"
                >
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Simple Menu </div>
                </a>
              </li>
              <li>
                <a
                  href="top-menu-light-dashboard-overview-1.html"
                  className="menu menu--active"
                >
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Top Menu </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="side-menu-light-inbox.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="inbox"></i>{" "}
              </div>
              <div className="menu__title"> Inbox </div>
            </a>
          </li>
          <li>
            <a href="side-menu-light-file-manager.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="hard-drive"></i>{" "}
              </div>
              <div className="menu__title"> File Manager </div>
            </a>
          </li>
          <li>
            <a href="side-menu-light-point-of-sale.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="credit-card"></i>{" "}
              </div>
              <div className="menu__title"> Point of Sale </div>
            </a>
          </li>
          <li>
            <a href="side-menu-light-chat.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="message-square"></i>{" "}
              </div>
              <div className="menu__title"> Chat </div>
            </a>
          </li>
          <li>
            <a href="side-menu-light-post.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="file-text"></i>{" "}
              </div>
              <div className="menu__title"> Post </div>
            </a>
          </li>
          <li>
            <a href="side-menu-light-calendar.html" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="calendar"></i>{" "}
              </div>
              <div className="menu__title"> Calendar </div>
            </a>
          </li>
          <li className="menu__devider my-6"></li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="edit"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Crud <i
                  data-feather="chevron-down"
                  className="menu__sub-icon "
                ></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="side-menu-light-crud-data-list.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Data List </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-crud-form.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Form </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="users"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Users{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="side-menu-light-users-layout-1.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Layout 1 </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-users-layout-2.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Layout 2 </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-users-layout-3.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Layout 3 </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="trello"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Profile{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="side-menu-light-profile-overview-1.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 1 </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-profile-overview-2.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 2 </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-profile-overview-3.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Overview 3 </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="layout"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Pages{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Wizards{" "}
                    <i
                      data-feather="chevron-down"
                      className="menu__sub-icon "
                    ></i>{" "}
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a href="side-menu-light-wizard-layout-1.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 1</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-wizard-layout-2.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 2</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-wizard-layout-3.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 3</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Blog{" "}
                    <i data-feather="chevron-down" className="menu__sub-icon "></i>
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a href="side-menu-light-blog-layout-1.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 1</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-blog-layout-2.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 2</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-blog-layout-3.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 3</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Pricing{" "}
                    <i
                      data-feather="chevron-down"
                      className="menu__sub-icon "
                    ></i>{" "}
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a
                      href="side-menu-light-pricing-layout-1.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 1</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-pricing-layout-2.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 2</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Invoice{" "}
                    <i
                      data-feather="chevron-down"
                      className="menu__sub-icon "
                    ></i>{" "}
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a
                      href="side-menu-light-invoice-layout-1.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 1</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-invoice-layout-2.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 2</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    FAQ{" "}
                    <i data-feather="chevron-down" className="menu__sub-icon "></i>
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a href="side-menu-light-faq-layout-1.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 1</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-faq-layout-2.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 2</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-faq-layout-3.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Layout 3</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="login-light-login.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Login </div>
                </a>
              </li>
              <li>
                <a href="login-light-register.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Register </div>
                </a>
              </li>
              <li>
                <a href="main-light-error-page.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Error Page </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-update-profile.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Update profile </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-change-password.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Change Password </div>
                </a>
              </li>
            </ul>
          </li>
          <li className="menu__devider my-6"></li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="inbox"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Components{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>
              </div>
            </a>
            <ul className="">
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Table{" "}
                    <i data-feather="chevron-down" className="menu__sub-icon "></i>
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a href="side-menu-light-regular-table.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Regular Table</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-tabulator.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Tabulator</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Overlay{" "}
                    <i
                      data-feather="chevron-down"
                      className="menu__sub-icon "
                    ></i>{" "}
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a href="side-menu-light-modal.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Modal</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-slide-over.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Slide Over</div>
                    </a>
                  </li>
                  <li>
                    <a href="side-menu-light-notification.html" className="menu">
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Notification</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="side-menu-light-accordion.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Accordion </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-button.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Button </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-alert.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Alert </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-progress-bar.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Progress Bar </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-tooltip.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Tooltip </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-dropdown.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Dropdown </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-typography.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Typography </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-icon.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Icon </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-loading-icon.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Loading Icon </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="sidebar"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Forms{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="side-menu-light-regular-form.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Regular Form </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-datepicker.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Datepicker </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-tom-select.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Tom Select </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-file-upload.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> File Upload </div>
                </a>
              </li>
              <li>
                <a href="javascript:;" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title">
                    {" "}
                    Wysiwyg Editor{" "}
                    <i
                      data-feather="chevron-down"
                      className="menu__sub-icon "
                    ></i>{" "}
                  </div>
                </a>
                <ul className="">
                  <li>
                    <a
                      href="side-menu-light-wysiwyg-editor-classic.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Classic</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-wysiwyg-editor-inline.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Inline</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-wysiwyg-editor-balloon.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Balloon</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-wysiwyg-editor-balloon-block.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Balloon Block</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href="side-menu-light-wysiwyg-editor-document.html"
                      className="menu"
                    >
                      <div className="menu__icon">
                        {" "}
                        <i data-feather="zap"></i>{" "}
                      </div>
                      <div className="menu__title">Document</div>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="side-menu-light-validation.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Validation </div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" className="menu">
              <div className="menu__icon">
                {" "}
                <i data-feather="hard-drive"></i>{" "}
              </div>
              <div className="menu__title">
                {" "}
                Widgets{" "}
                <i data-feather="chevron-down" className="menu__sub-icon "></i>{" "}
              </div>
            </a>
            <ul className="">
              <li>
                <a href="side-menu-light-chart.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Chart </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-slider.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Slider </div>
                </a>
              </li>
              <li>
                <a href="side-menu-light-image-zoom.html" className="menu">
                  <div className="menu__icon">
                    {" "}
                    <i data-feather="activity"></i>{" "}
                  </div>
                  <div className="menu__title"> Image Zoom </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* <!-- END: Mobile Menu --> */}

      <div className="d-flex">
        {/* <!-- BEGIN: Side Menu --> */}
        <nav className="side-nav">
          <a
            href="index.html"
            className="intro-x d-flex align-items-center ps-5 pt-4"
          >
            <img
              alt="Rubick Tailwind HTML Admin Template"
              className="w-6"
              src="dist/images/logo.svg"
            />
            <span className="d-none d-xl-block text-white fs-lg ms-3">
              {" "}
              Ru<span className="fw-medium">bick</span>{" "}
            </span>
          </a>
          <div className="side-nav__devider my-6"></div>
          <ul>
            <li>
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
              <a href="javascript:;.html" className="side-menu">
                <div className="side-menu__icon">
                  {" "}
                  <i data-feather="box"></i>{" "}
                </div>
                <div className="side-menu__title">
                  Menu Layout
                  <div className="side-menu__sub-icon">
                    {" "}
                    <i data-feather="chevron-down"></i>{" "}
                  </div>
                </div>
              </a>
              <ul className="">
                <li>
                  <a href="index.html" className="side-menu">
                    <div className="side-menu__icon">
                      {" "}
                      <i data-feather="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Side Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="simple-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-feather="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Simple Menu </div>
                  </a>
                </li>
                <li>
                  <a
                    href="top-menu-light-dashboard-overview-1.html"
                    className="side-menu"
                  >
                    <div className="side-menu__icon">
                      {" "}
                      <i data-feather="activity"></i>{" "}
                    </div>
                    <div className="side-menu__title"> Top Menu </div>
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
            </li>
          </ul>
        </nav>
        {/* <!-- END: Side Menu --> */}
        {/* <!-- BEGIN: Content --> */}
        <div className="content">
          {/* <!-- BEGIN: Top Bar --> */}
          <div className="top-bar">
            {/* <!-- BEGIN: Breadcrumb --> */}
            <div className="-intro-x breadcrumb me-auto d-none d-sm-flex">
              {" "}
              <a href="index.html">Application</a>{" "}
              <i data-feather="chevron-right" className="breadcrumb__icon"></i>{" "}
              <a href="index.html" className="breadcrumb--active">
                Dashboard
              </a>{" "}
            </div>
            {/* <!-- END: Breadcrumb --> */}
            {/* <!-- BEGIN: Search --> */}
            <div className="intro-x position-relative me-3 me-sm-6">
              <div className="search d-none d-sm-block">
                <input
                  type="text"
                  className="search__input form-control border-transparent"
                  placeholder="Search..."
                />
                <i
                  data-feather="search"
                  className="search__icon dark-text-gray-300"
                ></i>
              </div>
              <a className="notification d-sm-none" href="index.html">
                {" "}
                <i
                  data-feather="search"
                  className="notification__icon dark-text-gray-300"
                ></i>{" "}
              </a>
              <div className="search-result">
                <div className="search-result__content">
                  <div className="search-result__content__title">Pages</div>
                  <div className="mb-5">
                    <a href="index.html" className="d-flex align-items-center">
                      <div className="w-8 h-8 bg-theme-18 text-theme-9 d-flex align-items-center justify-content-center rounded-circle">
                        <i className="w-4 h-4" data-feather="inbox"></i>{" "}
                      </div>
                      <div className="ms-3">Mail Settings</div>
                    </a>
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 bg-theme-17 text-theme-11 d-flex align-items-center justify-content-center rounded-circle">
                        <i className="w-4 h-4" data-feather="users"></i>{" "}
                      </div>
                      <div className="ms-3">Users & Permissions</div>
                    </a>
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 bg-theme-14 text-theme-10 d-flex align-items-center justify-content-center rounded-circle">
                        <i className="w-4 h-4" data-feather="credit-card"></i>{" "}
                      </div>
                      <div className="ms-3">Transactions Report</div>
                    </a>
                  </div>
                  <div className="search-result__content__title">Users</div>
                  <div className="mb-5">
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="Rubick Tailwind HTML Admin Template"
                          className="rounded-circle"
                          src="dist/images/profile-14.jpg"
                        />
                      </div>
                      <div className="ms-3">Robert De Niro</div>
                      <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                        robertdeniro@left4code.com
                      </div>
                    </a>
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="Rubick Tailwind HTML Admin Template"
                          className="rounded-circle"
                          src="dist/images/profile-3.jpg"
                        />
                      </div>
                      <div className="ms-3">Angelina Jolie</div>
                      <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                        angelinajolie@left4code.com
                      </div>
                    </a>
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="Rubick Tailwind HTML Admin Template"
                          className="rounded-circle"
                          src="dist/images/profile-5.jpg"
                        />
                      </div>
                      <div className="ms-3">Robert De Niro</div>
                      <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                        robertdeniro@left4code.com
                      </div>
                    </a>
                    <a
                      href="index.html"
                      className="d-flex align-items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="Rubick Tailwind HTML Admin Template"
                          className="rounded-circle"
                          src="dist/images/profile-1.jpg"
                        />
                      </div>
                      <div className="ms-3">Bruce Willis</div>
                      <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                        brucewillis@left4code.com
                      </div>
                    </a>
                  </div>
                  <div className="search-result__content__title">Products</div>
                  <a
                    href="index.html"
                    className="d-flex align-items-center mt-2"
                  >
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Rubick Tailwind HTML Admin Template"
                        className="rounded-circle"
                        src="dist/images/preview-4.jpg"
                      />
                    </div>
                    <div className="ms-3">Sony Master Series A9G</div>
                    <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                      Electronic
                    </div>
                  </a>
                  <a
                    href="index.html"
                    className="d-flex align-items-center mt-2"
                  >
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Rubick Tailwind HTML Admin Template"
                        className="rounded-circle"
                        src="dist/images/preview-1.jpg"
                      />
                    </div>
                    <div className="ms-3">Samsung Q90 QLED TV</div>
                    <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                      Electronic
                    </div>
                  </a>
                  <a
                    href="index.html"
                    className="d-flex align-items-center mt-2"
                  >
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Rubick Tailwind HTML Admin Template"
                        className="rounded-circle"
                        src="dist/images/preview-11.jpg"
                      />
                    </div>
                    <div className="ms-3">Samsung Q90 QLED TV</div>
                    <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                      Electronic
                    </div>
                  </a>
                  <a
                    href="index.html"
                    className="d-flex align-items-center mt-2"
                  >
                    <div className="w-8 h-8 image-fit">
                      <img
                        alt="Rubick Tailwind HTML Admin Template"
                        className="rounded-circle"
                        src="dist/images/preview-5.jpg"
                      />
                    </div>
                    <div className="ms-3">Nike Tanjun</div>
                    <div className="ms-auto w-48 truncate text-gray-600 fs-xs text-end">
                      Sport &amp; Outdoor
                    </div>
                  </a>
                </div>
              </div>
            </div>
            {/* <!-- END: Search --> */}
            {/* <!-- BEGIN: Notifications --> */}
            <div className="intro-x dropdown me-auto me-sm-6">
              <div
                className="dropdown-toggle notification notification--bullet cursor-pointer"
                role="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                {" "}
                <i
                  data-feather="bell"
                  className="notification__icon dark-text-gray-300"
                ></i>{" "}
              </div>
              <div className="notification-content pt-2 dropdown-menu">
                <div className="notification-content__box dropdown-content">
                  <div className="notification-content__title dark-text-gray-300">
                    Notifications
                  </div>
                  <div className="cursor-pointer position-relative d-flex align-items-center ">
                    <div className="w-12 h-12 flex-none image-fit me-1">
                      <img
                        alt="Rubick Bootstrap HTML Admin Template"
                        className="rounded-pill"
                        src="dist/images/profile-14.jpg"
                      />
                      <div className="w-3 h-3 bg-theme-9 position-absolute end-0 bottom-0 rounded-pill border-2 border-white dark-border-dark-3"></div>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <a
                          href="javascript:;"
                          className="fw-medium truncate me-5 dark-text-gray-300"
                        >
                          Robert De Niro
                        </a>
                        <div className="fs-xs text-gray-500 ms-auto text-nowrap">
                          01:10 PM
                        </div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&#039;s standard dummy text ever since the 1500
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer position-relative d-flex align-items-center mt-5">
                    <div className="w-12 h-12 flex-none image-fit me-1">
                      <img
                        alt="Rubick Bootstrap HTML Admin Template"
                        className="rounded-pill"
                        src="dist/images/profile-3.jpg"
                      />
                      <div className="w-3 h-3 bg-theme-9 position-absolute end-0 bottom-0 rounded-pill border-2 border-white dark-border-dark-3"></div>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <a
                          href="javascript:;"
                          className="fw-medium truncate me-5 dark-text-gray-300"
                        >
                          Angelina Jolie
                        </a>
                        <div className="fs-xs text-gray-500 ms-auto text-nowrap">
                          06:05 AM
                        </div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem{" "}
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer position-relative d-flex align-items-center mt-5">
                    <div className="w-12 h-12 flex-none image-fit me-1">
                      <img
                        alt="Rubick Bootstrap HTML Admin Template"
                        className="rounded-pill"
                        src="dist/images/profile-5.jpg"
                      />
                      <div className="w-3 h-3 bg-theme-9 position-absolute end-0 bottom-0 rounded-pill border-2 border-white dark-border-dark-3"></div>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <a
                          href="javascript:;"
                          className="fw-medium truncate me-5 dark-text-gray-300"
                        >
                          Robert De Niro
                        </a>
                        <div className="fs-xs text-gray-500 ms-auto text-nowrap">
                          05:09 AM
                        </div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem{" "}
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer position-relative d-flex align-items-center mt-5">
                    <div className="w-12 h-12 flex-none image-fit me-1">
                      <img
                        alt="Rubick Bootstrap HTML Admin Template"
                        className="rounded-pill"
                        src="dist/images/profile-1.jpg"
                      />
                      <div className="w-3 h-3 bg-theme-9 position-absolute end-0 bottom-0 rounded-pill border-2 border-white dark-border-dark-3"></div>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <a
                          href="javascript:;"
                          className="fw-medium truncate me-5 dark-text-gray-300"
                        >
                          Bruce Willis
                        </a>
                        <div className="fs-xs text-gray-500 ms-auto text-nowrap">
                          03:20 PM
                        </div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry&#039;s standard dummy text ever since the 1500
                      </div>
                    </div>
                  </div>
                  <div className="cursor-pointer position-relative d-flex align-items-center mt-5">
                    <div className="w-12 h-12 flex-none image-fit me-1">
                      <img
                        alt="Rubick Bootstrap HTML Admin Template"
                        className="rounded-pill"
                        src="dist/images/profile-5.jpg"
                      />
                      <div className="w-3 h-3 bg-theme-9 position-absolute end-0 bottom-0 rounded-pill border-2 border-white dark-border-dark-3"></div>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <div className="d-flex align-items-center">
                        <a
                          href="javascript:;"
                          className="fw-medium truncate me-5 dark-text-gray-300"
                        >
                          Kevin Spacey
                        </a>
                        <div className="fs-xs text-gray-500 ms-auto text-nowrap">
                          01:10 PM
                        </div>
                      </div>
                      <div className="w-full truncate text-gray-600 mt-0.5">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- END: Notifications --> */}
            {/* <!-- BEGIN: Account Menu --> */}
            <div className="intro-x dropdown w-8 h-8">
              <div
                className="dropdown-toggle w-8 h-8 rounded-pill overflow-hidden shadow-lg image-fit zoom-in"
                role="button"
                aria-expanded="false"
                data-bs-toggle="dropdown"
              >
                <img
                  alt="Rubick Tailwind HTML Admin Template"
                  src="dist/images/profile-2.jpg"
                />
              </div>
              <div className="dropdown-menu w-56">
                <ul className="dropdown-content bg-theme-26 dark-bg-dark-6 text-white">
                  <li className="p-2">
                    <div className="fw-medium text-white">Robert De Niro</div>
                    <div className="fs-xs text-theme-28 mt-0.5 dark-text-gray-600">
                      DevOps Engineer
                    </div>
                  </li>
                  <li>
                    <hr className="dropdown-divider border-theme-27 dark-border-dark-3" />
                  </li>
                  <li>
                    <a
                      href="index.html"
                      className="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"
                    >
                      {" "}
                      <i data-feather="user" className="w-4 h-4 me-2"></i>{" "}
                      Profile{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="index.html"
                      className="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"
                    >
                      {" "}
                      <i data-feather="edit" className="w-4 h-4 me-2"></i> Add
                      Account{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="index.html"
                      className="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"
                    >
                      {" "}
                      <i data-feather="lock" className="w-4 h-4 me-2"></i> Reset
                      Password{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="index.html"
                      className="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"
                    >
                      {" "}
                      <i
                        data-feather="help-circle"
                        className="w-4 h-4 me-2"
                      ></i>{" "}
                      Help{" "}
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider border-theme-27 dark-border-dark-3" />
                  </li>
                  <li>
                    <a
                      href="index.html"
                      className="dropdown-item text-white bg-theme-1-hover dark-bg-dark-3-hover"
                    >
                      {" "}
                      <i
                        data-feather="toggle-right"
                        className="w-4 h-4 me-2"
                      ></i>{" "}
                      Logout{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* <!-- END: Account Menu --> */}
          </div>
        </div>
        {/* <!-- END: Content --> */}
      </div>
    </div>
  );
}

export default Daseboard;
