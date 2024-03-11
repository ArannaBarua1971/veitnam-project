import React, { useState } from "react";
import { Input, Header, Card, Button, ErrorMessage } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { useDispatch } from "react-redux";
import { login } from "../features/currentUserSlice";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import { jwtDecode } from "jwt-decode";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [validationError, setValidationError] = useState({});
  const [loginWihtThridParty, setLoginWithThirdParty] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoginSubmit = async () => {
    let request = {
      email,
      password,
    };

    let res = await axios
      .post(`${conf}/user_login`, request)
      .then(function (response) {
        setValidationError({});

        const userData = {
          id: response.data.data.user.id,
          email: response.data.data.user.email,
          name: response.data.data.user.name,
          roles: response.data.data.user.roles[0].name,
        };
        dispatch(login(userData));

        navigate("/");
      })
      .catch(function (error) {
        if (error.response.data.status == "failed") {
          setValidationError({
            unAuthorized: "please check your email and password",
          });
        } else {
          error = error.response.data.errors;
          setValidationError({ ...error });
        }
      });
  };

  const loginWithGoogle = async ([
    name,
    email,
    password,
    password_confirmation,
  ]) => {
    let request = {
      name,
      email,
      password,
      password_confirmation,
    };

    let res = await axios
      .post(`${conf}/loginWithThirdParty`, request)
      .then(function (response) {
        setValidationError({});

        const id = response.data.data.user.id;
        const userData = { id, email, name };
        dispatch(login(userData));
        localStorage.setItem(
          "logWithThirdParty",
          JSON.stringify({ login: true })
        );

        navigate("/");
      })
      .catch(function (error) {
        if (error.response.status == 500) {
          setValidationError({ unAuthorized: "email alreay existed" });
        }
      });
  };

  return (
    <div className="bg-white">
      {/* header section */}
      <Header />

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
            <h2>Đăng nhập</h2>
            <p>Đăng nhập tài khoản FIDT của quý khách</p>
          </div>
          {validationError.unAuthorized ? (
            <ErrorMessage>{validationError.unAuthorized}</ErrorMessage>
          ) : (
            <></>
          )}
          <Input
            label="Email"
            placeholder="email"
            type="email"
            name="email"
            className="w-100"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {!loginWihtThridParty && validationError.email ? (
            <ErrorMessage>{validationError.email}</ErrorMessage>
          ) : (
            <></>
          )}
          <Input
            label="Mật khẩu"
            placeholder="Mật khẩu"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          {!loginWihtThridParty && validationError.password ? (
            <ErrorMessage>{validationError.password}</ErrorMessage>
          ) : (
            <></>
          )}
          <Button
            className="w-100 btnStyle py-3 my-3 border-0"
            onClick={LoginSubmit}
          >
            Đăng nhập
          </Button>
          {/* another options */}
          <div className="option d-flex justify-content-between ">
            <button
              className="text-dark bg-white border-0"
              onClick={() => navigate("/Forget_password")}
            >
              Quên mật khẩu
            </button>
            <button
              className="text-dark bg-white border-0"
              onClick={() => navigate("/registration")}
            >
              Tạo tài khoản mới
            </button>
          </div>
          <hr />

          <Button
            className="w-100 btnStyle  bg-white border-0 text-dark d-flex justify-content-center"
            textStyle="h6 m-0"
          >
            <GoogleOAuthProvider clientId="538868144474-mtcndkg7sn42igvnar643oh5okdrarhv.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwtDecode(credentialResponse.credential);

                  loginWithGoogle([
                    decoded.name,
                    decoded.email,
                    decoded.email,
                    decoded.email,
                  ]);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </Button>
        </Card>
      </section>
    </div>
  );
}

export default Login;
