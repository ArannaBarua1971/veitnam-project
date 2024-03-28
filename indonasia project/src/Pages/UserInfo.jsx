import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, ErrorMessage, Input } from "../components";
import axios from "axios";
import conf from "../conf/conf";
import { useDispatch } from "react-redux";
import { login } from "../features/currentUserSlice";
import { format, addDays } from "date-fns";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UserInfo() {
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [address, setAddress] = useState();
  const [allMemberShip, setAllMembership] = useState([]);
  const [loginWithThirdparty, setLoginWithThirdParty] = useState(false);

  const [password, setPasword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");
  const [showAccordian, setShowAccordian] = useState(false);
  const [admin, setAdmin] = useState(false);

  const [validationError, setValidationError] = useState({});

  const dispatch = useDispatch();
  const getAllMembership = (email) => {
    try {
      axios
        .get(`${conf}/getAllMembership/${email}`)
        .then((response) => {
          const memberShips = response.data.data;
          setAllMembership(memberShips);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      navigate("/");
    }
  };

  useEffect(() => {
    try {
      const { email, name, roles } = JSON.parse(
        localStorage.getItem("userInfo")
      );
      if (roles == "admin") setAdmin(true);
      else setAdmin(false);
      try {
        const { login } = JSON.parse(localStorage.getItem("logWithThirdParty"));
        setLoginWithThirdParty(login);
      } catch {
        setLoginWithThirdParty(false);
      }
      setEmail(email);
      setName(name);
      getAllMembership(email);
    } catch {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const id = user.id;
      axios
        .get(`${conf}/authInfo/${id}`)
        .then((response) => {
          const userData = response.data.data;

          setEmail(userData.email);
          setName(userData.name);
          setPhone(userData.phone);
          setAddress(userData.address);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch {
      navigate("/");
    }
  }, []);

  // updated profile
  const update = () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      const id = user.id;
      let request = {
        id,
        email,
        name,
        phone,
        address,
      };
      axios
        .post(`${conf}/update_profile`, request)
        .then((response) => {
          const { roles } = JSON.parse(localStorage.getItem("userInfo"));
          dispatch(login({ id, name, email, phone, roles }));
          window.location.reload();
        })
        .catch((error) => {
          if (error.response.status == 401) {
            error = error.response.data.message;
            setValidationError({ email: error });
          } else {
            error = error.response.data.errors;
            setValidationError({ ...error });
          }
        });
    } catch {
      navigate("/");
    }
  };

  // updated password
  const update_password = () => {
    if (!loginWithThirdparty) {
      try {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const id = user.id;

        const request = {
          id,
          password,
          password_confirmation,
        };
        axios
          .post(`${conf}/update_password`, request)
          .then((response) => {
            notify("password is updated");
            setValidationError({});
          })
          .catch((error) => {
            if (error.response.status == 401) {
              error = error.response.data.message;
              setValidationError({ old_password: error });
            } else {
              error = error.response.data.errors;
              setValidationError({ ...error });
            }
          });
      } catch {
        navigate("/");
      }
    }
  };

  return (
    <section className="userInformation main_background user_info overflow-y-scroll">
      <div className="px-5">
        <div className="d-flex">
          <div className="">
            <div className="dice">
              <img
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
                height="80px"
                alt=""
              />
            </div>
          </div>
          <div className="col-lg-1">
            <h5>{name}</h5>
            <p>
              <b>{email}</b>
            </p>
          </div>
        </div>
      </div>
      {/* notify toast */}
      <ToastContainer />

      <div className="px-5 ">
        <div
          className="about_cnt col-lg-12 col-sm-12"
          data-aos="fade-left"
          data-aos-duration="1000"
          data-aos-delay="300"
        >
          <nav>
            <div
              className="nav nav-tabs mb-3 border-0"
              id="about_nav"
              role="tablist"
            >
              <button
                className="nav-link active active-btn border-0"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#company"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Update Profile
              </button>
              {/* {!admin ? ( */}
              <button
                className="nav-link border-0"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#history"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true"
              >
                Subscription
              </button>
              {/* ) : (
                <></>
              )} */}
              {!loginWithThirdparty ? (
                <button
                  className="nav-link border-0"
                  id="nav-home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#mission"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Change Password
                </button>
              ) : (
                <></>
              )}
            </div>
          </nav>

          <div
            className="tab-content container-box border-0"
            id="nav-tabContent"
          >
            <div
              className="tab-pane fade show active "
              id="company"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <div>
                <div className="col-xxl-8  col-sm-12">
                  {/* <!-- form work here --> */}
                  <div className=" col-sm-12 user-box">
                    <div className="row g-3 form-bg mt-1 mb-5 text-white">
                      <h4 className="text-light">This is a user Info form</h4>
                      <div className="col-md-12 col-sm-12 col-lg-6 ">
                        <Input
                          label="Email"
                          labelStyle="text-light"
                          name="email"
                          type="email"
                          className="form-control email-field place-bg text-white "
                          id="inputEmail4"
                          value={email}
                          disabled={loginWithThirdparty ? true : false}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        {validationError.email && (
                          <ErrorMessage>{validationError.email}</ErrorMessage>
                        )}
                      </div>
                      <div className="col-md-12 col-sm-12 col-lg-6 ">
                        <Input
                          label="name"
                          labelStyle="text-light"
                          name="name"
                          type="text"
                          className="form-control place-bg text-white"
                          id="inputEmail4"
                          placeholder="Enter your FullName"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        {validationError.name && (
                          <ErrorMessage>{validationError.name}</ErrorMessage>
                        )}
                      </div>
                      <div className="col-md-12 col-sm-12 col-lg-6 ">
                        <Input
                          name="phone"
                          label="Phone"
                          labelStyle="text-light"
                          type="number"
                          className="form-control place-bg text-white"
                          id="inputPassword4"
                          placeholder="Enter your Phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {validationError.phone && (
                          <ErrorMessage>{validationError.phone}</ErrorMessage>
                        )}
                      </div>
                      <div className="col-md-12 col-sm-12 col-lg-6 ">
                        <Input
                          label="Address"
                          labelStyle="text-light"
                          name="address"
                          type="text"
                          className="form-control place-bg text-white"
                          id="inputPassword4"
                          placeholder="Enter your Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>

                      <div className="col-lg-12 ">
                        <button
                          type="submit"
                          className="w-100 form-btn btn btn-primary"
                          onClick={update}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="  col-sm-12 user-box d-block ">
                    <form className="row g-3 form-bg form-bg-2 room mt-1 mb-5 ">
                      <h3 className="pass-change-h3">KDĐT Room</h3>

                      <label
                        for="inputEmail4"
                        className="form-label room-label text-light"
                      >
                        Notification Space - Room thông tin
                      </label>

                      <div className="col-12">
                        <button
                          onClick={() => navigate("/")}
                          className="w-100 form-btn-update form-btn-or btn btn-primary"
                        >
                          Join Now
                        </button>
                      </div>

                      <label
                        for="inputEmail4"
                        className="form-label room-label text-light"
                      >
                        Priority Room
                      </label>
                      <p className="mini-p">
                        ⭐️ Room trao đổi các khách hàng Priority KDĐT
                      </p>
                      <div className="col-12">
                        <button
                          onClick={() => navigate("/")}
                          className="w-100 form-btn-update form-btn-or btn btn-primary"
                        >
                          Join Now
                        </button>
                      </div>

                      <label
                        for="inputEmail4"
                        className="form-label room-label text-light"
                      >
                        Trading Room
                      </label>
                      <p className="mini-p">
                        ⭐️ Room cập nhật các góc nhìn từ đội ngũ chuyên gia
                        KDĐT
                      </p>
                      <div className="col-12">
                        <button
                          onClick={() => navigate("/")}
                          className="w-100 form-btn-update form-btn-or btn btn-primary"
                        >
                          Join Now
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- ////// --> */}
            <div
              className="tab-pane fade show  "
              id="history"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              {/* {!admin ? ( */}
              <div className="userInformation">
                <div className="accordion overflow-auto" id="accordionExample">
                  {allMemberShip.length != 0 ? (
                    <>
                      {allMemberShip.map((membership, index) => (
                        <div key={index} className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#${membership.id}`}
                              aria-expanded={
                                showAccordian == membership.id ? true : false
                              }
                              aria-controls={`${membership.id}`}
                              onClick={() =>
                                setShowAccordian((pre) =>
                                  pre == membership.id ? -1 : membership.id
                                )
                              }
                            >
                              <div className="title col-lg-2">
                                {membership.membership.title}
                              </div>
                              <div className="date mx-5">
                                <span>Đang thực hiện: </span>
                                {format(
                                  addDays(
                                    new Date(membership.created_at),
                                    membership.duration * 30
                                  ),
                                  "dd M yyyy"
                                )}
                              </div>
                              <div className="expired mx-5">
                                {membership.active_membership_status ? (
                                  <Button
                                    textStyle="p-0 m-0"
                                    className="p-1  mx-5"
                                  >
                                    Hết hạn
                                  </Button>
                                ) : (
                                  <Button
                                    textStyle="p-0 m-0  text-white"
                                    className="p-1  m-0 bg-danger mx-5"
                                  >
                                    Hết hạn
                                  </Button>
                                )}
                              </div>
                              <Button
                                className="btn"
                                textStyle="p-0 m-0"
                                type="button"
                              >
                                Action
                              </Button>
                              <div className="up_down ">
                                {showAccordian == membership.id ? (
                                  <i class="fas fa-chevron-up"></i>
                                ) : (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </div>
                            </button>
                          </h2>
                          <div
                            id={`${membership.id}`}
                            className={`accordion-collapse collapse ${
                              showAccordian == membership.id ? "show" : ""
                            }`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body d-flex ">
                              <div className="title text-white col-lg-2">
                                {membership.membership.title}
                              </div>

                              <div className="date mx-5 text-white">
                                <span>Đang thực hiện: </span>
                                {format(
                                  addDays(new Date(membership.created_at), 0),
                                  "dd M yyyy"
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              {/* ) : (
                <></>
              )} */}
            </div>

            {!loginWithThirdparty ? (
              <div
                className="tab-pane fade show "
                id="mission"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
                <div className="col-lg-6 col-sm-12 col-md-12 user-box ">
                  <div className="row g-3 form-bg form-bg-2 m-0 mt-0 w-50">
                    <h3 className="pass-change-h3">Đổi mật khẩu</h3>
                    <div className="col-md-6 w-100">
                      <Input
                        label="Nhập mật khẩu mới"
                        labelStyle="text-light"
                        name="Nhập_mật_khẩu_mới"
                        type="password"
                        placeholder="Nhập mật khẩu mới"
                        onChange={(e) => setPasword(e.target.value)}
                        icon="fa-regular fa-eye"
                      />
                      {validationError.password && (
                        <ErrorMessage>
                          {validationError.old_password}
                        </ErrorMessage>
                      )}
                    </div>
                    <div className="col-md-6 w-100">
                      <Input
                        label="Nhập lại mật khẩu mới"
                        labelStyle="text-light"
                        name="Nhập_lại_mật_khẩu_mới"
                        type="password"
                        placeholder="Nhập lại mật khẩu mới"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        icon="fa-regular fa-eye"
                      />
                      {validationError.password_confirmation && (
                        <ErrorMessage>
                          {validationError.new_password}
                        </ErrorMessage>
                      )}
                    </div>

                    <div className="col-12">
                      <Button
                        type="submit"
                        className="btn w-100 py-3"
                        textStyle="p-0 m-0"
                        onClick={update_password}
                      >
                        Update Password
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* <!-- ////// --> */}
    </section>
  );
}

export default UserInfo;
