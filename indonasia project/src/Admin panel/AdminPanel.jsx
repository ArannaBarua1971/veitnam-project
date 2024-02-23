import React, { useState, useEffect } from "react";
import "../App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidbar, SidbarMobile } from "./adminComponents";

function AdminPanel() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if (data.roles != "admin") {
        navigate("/");
      }
      else{
        navigate("/admin/add-article")
      }
    } catch {
      navigate("/");
    }
  }, []);

  return (
    <div className="dasebaord">
      <SidbarMobile onClick={() => setShowMobileMenu((pre) => !pre)} />
      <div className="d-flex">
        <Sidbar
          className={`${showMobileMenu ? "d-block" : "d-none d-md-block"}`}
        />
        <div className="content ">
          <div className="col-lg-12 py-5 mt-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
