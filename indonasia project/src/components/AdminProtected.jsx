import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtected(props) {
  let { Component } = props;
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const { active_membership_status } = JSON.parse(
        localStorage.getItem("verifyMemberShipUser")
      );
      const { roles } = JSON.parse(localStorage.getItem("userInfo"));
      if (roles != "admin") {
        if (!active_membership_status) navigate("/");
      }
    } catch {
      try{const { roles } = JSON.parse(localStorage.getItem("userInfo"));
      if (roles != "admin") {
         navigate("/");
      }}
      catch{
        navigate("/")
      }
    }
  }, []);
  return <Component />;
}

export default AdminProtected;
