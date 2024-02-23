import React, { useState } from "react";
import { Sidbar } from "../../components";
import MainContainer from "../../container/MainContainer";
import { Outlet } from "react-router-dom";
import "../../index.css";

function MainTemplate() {

  const [showNavigation, setShowNavigation] = useState(false);
  const [iconNav, seticonNav] = useState(true);
  const showNav = () => {
    setShowNavigation(pre => !pre)
    seticonNav(pre => !pre)
  };
  return (
    <>
      {/* sidbar */}
      <Sidbar show={showNavigation}/>

      {/* handbar */}
      <div className="handbar" onClick={showNav}>
        <i className={`${iconNav ? "fa-solid fa-bars" : "fa-solid fa-close"}`}></i>
      </div>

      {/* main Content */}
      <MainContainer className=" mt-0 ms-auto  main mainContainer ">
        <Outlet />
      </MainContainer>
    </>
  );
}

export default MainTemplate;
