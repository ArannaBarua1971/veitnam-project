import React, { useState } from "react";
import { Input, Header, Card, Button, ErrorMessage } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgetPassword() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [otp, setOtp] = useState();
  const [EnterOtp, setEnterOtp] = useState();
  const notify = (message) => toast(message);

  const [validationError, setValidationError] = useState({});

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const ForgetPasswordSubmit = async () => {
    setLoader(true);
    let request = {
      email,
    };
    setOtp(null);
    setValidationError("")
    let res = await axios
      .post(`${conf}/forget_password`, request)
      .then(function (response) {
        setValidationError({});

        setOtp(response.data.data);
      })
      .catch(function (error) {
        if (error.response.data.status == "failed") {
          setValidationError({
            unAuthorized: "please check your email",
          });
        } else {
          error = error.response.data.errors;
          setValidationError({ ...error });
        }
      })
      .finally(() => setLoader(false));
  };

  const checkOtp = () => {
    if (otp == EnterOtp) {
      setPasswordShow(true);
    } else {
      setPasswordShow(false);
    }
  };

  // updated password
  const update_password = () => {
    const request = {
      email,
      password,
      // password_confirmation,
    };
    axios
      .post(`${conf}/reset_password`, request)
      .then((response) => {
        notify("password is updated");
        setValidationError({});
        setOtp(null)
        setEnterOtp(null)

        setTimeout(()=>{
          navigate("/login")
        },2000)
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
  };

  return (
    <div className="bg-white">
      {/* header section */}
      <Header />
      {/* notify toast */}
      <ToastContainer />

      {/* login section */}
      <section className="LoginSection   d-flex justify-content-center align-items-center">
        {/* login banner */}
        <div className="loginBanner  ">
          <img
            src="/imgs/LoginBanner.png"
            className="rounded"
            alt="LoginBanner"
          />
        </div>

        {/* login form */}
        <Card className="loginForm px-xl-5 px-lg-4 card_box_shadow">
          <div className="heading text-center mt-2 mb-4">
            <h2>Quên mật khẩu</h2>
            <p>Nhập email của bạn vào tài khoản FIDT của bạn</p>
          </div>
          {validationError.unAuthorized ? (
            <ErrorMessage>{validationError.unAuthorized}</ErrorMessage>
          ) : (
            <></>
          )}

          {otp == null ? (
            <>
              <Input
                label="Email"
                placeholder="email"
                type="email"
                name="email"
                className="w-100"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              {validationError.email ? (
                <ErrorMessage>{validationError.email}</ErrorMessage>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {otp && !passwordShow ? (
            <>
              {!passwordShow ? (
                <div class="alert alert-success" role="alert">
                  please check your otp
                </div>
              ) : (
                <></>
              )}
              <Input
                label="Enter Otp"
                placeholder="Enter Otp"
                type="number"
                name="otp"
                onChange={(e) => setEnterOtp(e.target.value)}
              ></Input>
            </>
          ) : (
            <></>
          )}

          {passwordShow ? (
            <>
              <Input
                label="Mật khẩu"
                placeholder="Mật khẩu"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              {validationError.password ? (
                <ErrorMessage>{validationError.password}</ErrorMessage>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}

          {!passwordShow?<> {!otp ? (
            <>
              <Button
                className="w-100 btnStyle py-3 my-3 border-0"
                onClick={ForgetPasswordSubmit}
              >
                {loader ? (
                  <div class="spinner-border ms-2 " role="status"></div>
                ) : (
                  <>nộp</>
                )}
              </Button>
            </>
          ) : (
            <Button
              className="w-100 btnStyle py-3 my-3 border-0"
              onClick={checkOtp}
            >
              submit
            </Button>
          )}</>:<>
          <Button
              className="w-100 btnStyle py-3 my-3 border-0"
              onClick={update_password}
            >
              reset password
            </Button>
          </>}
          <hr />
          {/* another options */}
          <div className="option d-flex justify-content-between ">
            <button
              className="text-dark bg-white border-0 mx-auto"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </button>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default ForgetPassword;
