import React, { useState, useEffect } from "react";
import SidbarContainer from "../container/SidbarContainer";
import { Button, ContentHeader, Logo } from "../components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/currentUserSlice";
import axios from "axios";
import conf from "./../conf/conf";
function Sidbar({ show }) {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [verifyMemberShipUser, setVerifyMemberShipUser] = useState(false);
  const navs = [
    {
      name: "Tổng quan",
      icon: "fas fa-list",
      path: "/",
      lock: false,
    },
    {
      name: " Nhận định thị trường",
      icon: " fa-solid fa-magnifying-glass",
      path: "/nhan-dinh-thi-truong",
      lock: false,
    },
    {
      name: "Deal cổ phiếu đánh ngắn",
      icon: "fa-solid fa-cloud",
      path: "/Deal-cổ-phiếu-đánh-ngắn",
      lock: !verifyMemberShipUser,
    },
    {
      name: "Deal cổ phiếu trung hạn",
      icon: "fa-regular fa-message",
      path: "/Deal-cổ-phiếu-trung-hạn",
      lock: !verifyMemberShipUser,
    },
    {
      name: "Deal tích sản cổ phiếu",
      icon: "fa-regular fa-message",
      path: "/Deal-tích-sản-cổ-phiếu",
      lock: !verifyMemberShipUser,
    },
    {
      name: "Dữ liệu",
      icon: "fa-solid fa-sitemap",
      path: "/Dữ-liệu",
      lock: false,
    },
    {
      name: "Khóa đào tạo hội viên",
      icon: "fa-solid fa-arrow-up-right-dots",
      path: "/Khóa_đào_tạo_hội_viên",
      lock: false,
    },
    {
      name: "Kiến Thức Đầu Tư",
      icon: "fa-solid fa-book",
      path: "https://n18.vn/shop/",
      lock: !verifyMemberShipUser,
    },
    {
      name: "Bài Giảng Thực Chiến",
      icon: "fas fa-tablet-alt",
      path: "/Bài-Giảng-Thực-Chiến",
      lock: !verifyMemberShipUser,
    },
  ];

  const verifyMemberUser = (email) => {
    axios
      .get(`${conf}/verifyMemberShipUser/${email}`)
      .then((response) => {
        localStorage.setItem(
          "verifyMemberShipUser",
          JSON.stringify(response.data.data)
        );
        if (response.data.data.active_membership_status)
          setVerifyMemberShipUser(true);
      })
      .catch((error) => navigate("/"));
  };

  useEffect(() => {
    try {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      setUserInfo(data);
      if (data.roles == "admin") {
        setVerifyMemberShipUser(true);
      } else {
        try {
          verifyMemberUser(data.email);
        } catch {
          console.log("not exit");
        }
      }
    } catch (error) {
      setUserInfo(null);
      console.log(error);
    }
  }, []);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    localStorage.setItem("verifyMemberShipUser", null);
    dispatch(logout());
    window.location.reload();
    localStorage.clear();
    navigate("/");
  };

  const AdminPanel = () => {
    navigate("/admin");
  };

  return (
    <>
      <SidbarContainer show={show}>
        {/* logo section */}
        <section id="logo" className="w-100 px-3 pt-3">
          {/* logo */}
          <Logo className="my-3" />
        </section>

        {/* menu section */}
        <section id="menu" className="w-100 p-3">
          {/* navigation */}
          <nav className="mb-4">
            {navs.map((nav, index) => (
              <div className="mainNav" key={index}>
                <NavLink
                  to={nav.path}
                  key={nav.name}
                  className={({ isActive }) =>
                    isActive
                      ? "active-nav text-light h6 d-flex "
                      : "text-light h6  d-flex "
                  }
                >
                  <div className="navigation me-2">
                    <i className={`${nav.icon} pe-2`}></i>
                    {nav.name}
                  </div>

                  {/* lock for purchase */}
                  {nav.lock ? (
                    <div className="me-1">
                      <i class="fa-solid fa-lock"></i>
                    </div>
                  ) : (
                    <></>
                  )}
                </NavLink>
              </div>
            ))}
          </nav>

          {/* button to go courses */}
          <Button
            className="w-100 btnStyle "
            onClick={() => navigate("/gói_dịch_vụ")}
            target="_blank"
          >
            Gói dịch vụ
          </Button>

          {/* button to go daseboard */}
          {userInfo && userInfo.roles == "admin" ? (
            <Button className="w-100 mt-3 btnStyle " onClick={AdminPanel}>
              Admin Panel
            </Button>
          ) : (
            <></>
          )}
        </section>

        {/* authorization section */}
        <section id="authrization" className="w-100">
          {/* Login section  (if user is not log in then show)*/}
          {!userInfo ? (
            <>
              <Button
                className="border-0 LoginBtn mx-auto w-100 font-xl"
                onClick={() => navigate("/login")}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.90002 7.56023C9.21002 3.96023 11.06 2.49023 15.11 2.49023H15.24C19.71 2.49023 21.5 4.28023 21.5 8.75023V15.2702C21.5 19.7402 19.71 21.5302 15.24 21.5302H15.11C11.09 21.5302 9.24002 20.0802 8.91002 16.5402"
                    stroke="#FF8C00"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M2 12H14.88"
                    stroke="#FF8C00"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M12.65 8.65039L16 12.0004L12.65 15.3504"
                    stroke="#FF8C00"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
                Đăng nhập
              </Button>
            </>
          ) : (
            <>
              <div
                className="mt-5 p-3 d-flex userInfoBtn  rounded border-0 align-items-center justify-content-between"
                onClick={() => navigate("/user-information")}
                style={{ cursor: "pointer"}}
              >
                <div className="info d-flex">
                  <div className="userImg rounded-circle  me-3">
                    <i className="fa-regular fa-user m-3"></i>
                    {/* <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${userInfo.name}`}
                    alt="avatar"
                    className="rounded-lg"
                    style={{ width: "2.5rem" }}
                  /> */}
                  </div>
                  <div className="data text-white  ms-1">
                    <ContentHeader
                      className="text-white p-0 m-0"
                      
                    >
                     {userInfo && userInfo.name && userInfo.name.slice(0, 6)}
                     {userInfo && userInfo.name && userInfo.name.length >6 ? " ...":""}
                    </ContentHeader>
                    <p className="p-0 m-0" style={{ fontSize: "10px" }}>
                      {userInfo.email}
                    </p>
                  </div>
                </div>
                <div className="icon">
                  <i className="fas fa-chevron-right fa-fw text-white"></i>
                </div>
              </div>

              <Button
                className="border-0 LogoutBtn text-white mx-auto w-100 p-3"
                onClick={logoutHandler}
              >
                <span>Thoát tài khoản</span>
                <svg
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5624 8.625V10.0375C1.5624 12.8313 2.68115 13.95 5.4749 13.95H5.55615C8.06865 13.95 9.2249 13.0438 9.43115 10.8313"
                    stroke="currentcolor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M9.4375 5.22502C9.24375 2.97502 8.0875 2.05627 5.55625 2.05627H5.475C2.68125 2.05627 1.5625 3.17502 1.5625 5.96877"
                    stroke="currentcolor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M5.62505 8H12.7375"
                    stroke="currentcolor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M11.3438 5.90625L13.4375 8L11.3438 10.0938"
                    stroke="currentcolor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </Button>
            </>
          )}
        </section>
      </SidbarContainer>
    </>
  );
}

export default Sidbar;
