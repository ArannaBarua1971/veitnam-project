import React, { useEffect, useState } from "react";
import { Input, Card, Button, Header, ErrorMessage } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";

function Registration() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [verify_mail, SetVerifyMail] = useState("");
  const [validationError, setValidationError] = useState({});

  const submit = async () => {
    setLoading(true);
    let request = {
      name,
      email,
      password,
      password_confirmation,
    };

    let res = await axios
      .post(`${conf}/user_registration`, request)
      .then(function (response) {
        setValidationError({});
        SetVerifyMail(response.data.message);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        if (error.response.status == 500) {
          setValidationError({ email: "email alreay existed" });
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

      {/* Registration section */}
      <section className="LoginSection   d-flex justify-content-center align-items-center ">
        {/* registraion banner */}
        <div className="loginBanner">
          <img
            src="/imgs/LoginBanner.png"
            className="d-block mx-auto"
            alt="LoginBanner"
          />
        </div>

        {/* registration from form */}
        <Card className="px-5 card_box_shadow loginForm">
          <div className="heading text-center mt-2 mb-4">
            <h2>Đăng nhập</h2>
            <p>Đăng nhập tài khoản FIDT của quý khách</p>
          </div>
          {verify_mail ? (
            <div className="alert alert-success">{verify_mail}</div>
          ) : (
            <></>
          )}

          <Input
            label="Họ và tên*"
            placeholder="Nhập họ và tên của quý khách "
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          ></Input>
          {validationError.name ? (
            <ErrorMessage>{validationError.name}</ErrorMessage>
          ) : (
            <></>
          )}
          <Input
            label="Email"
            placeholder="email"
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {validationError.email ? (
            <ErrorMessage>{validationError.email}</ErrorMessage>
          ) : (
            <></>
          )}
          <Input
            label="Mật khẩu*"
            placeholder="Nhập mật khẩu của quý khách "
            type="password"
            name="password"
            onChange={(e) => setPasword(e.target.value)}
          ></Input>
          {validationError.password ? (
            <ErrorMessage>{validationError.password}</ErrorMessage>
          ) : (
            <></>
          )}
          <Input
            label="Nhập lại mật khẩu*"
            placeholder="Nhập lại mật khẩu của quý khách "
            type="password"
            name="password_confirmation"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Input>
          <Button
            className="w-100 btnStyle py-3 my-3 border-0 "
            onClick={submit}
          >
            {loading ? (
              <div class="spinner-border ms-2 " role="status"></div>
            ) : (
              <>Đăng nhập</>
            )}
          </Button>

          {/* another options */}
          <div className="option d-flex justify-content-center ">
            <p className="text-dark">Quý khách đã có tài khoản?</p>
            <a className="mx-1" href="#" onClick={() => navigate("/login")}>
              Đăng nhập
            </a>
          </div>
        </Card>
      </section>
    </div>
  );
}

export default Registration;
