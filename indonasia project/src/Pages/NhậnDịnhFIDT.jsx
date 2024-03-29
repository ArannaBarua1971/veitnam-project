import React, { useEffect, useState } from "react";
import { ContentHeader, Lock } from "../components";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";

function NhậnDịnhFIDT() {
  const [lockArticle, setLockArticle] = useState("");
  const [unLockArticle, setUnLockArticle] = useState("");
  const [unLockArticleShowLength, setUnlockArticleShowLength] = useState();
  const [loginUser, setLoginUser] = useState(false);
  const[date,setDate]=useState("")

  const navigate = useNavigate();
  useEffect(() => {
    try {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if (data != null) setLoginUser(true);
    } catch {
      console.log("error found");
    }
  }, []);
  const articles = async () => {
    await axios
      .get(`${conf}/getArticle/Nhận định thị trường`)
      .then(function (response) {
        setDate(response.data.data.updated_at)
        setUnLockArticle(response.data.data.article);
        setUnlockArticleShowLength(
          response.data.data.percentage
            ? Math.round(
                response.data.data.article.length *
                  (response.data.data.percentage / 100)
              )
            : response.data.data.article.length
        );
      })
      .catch(function (error) {
        navigate("/");
      });
    await axios
      .get(`${conf}/getLockArticle/Nhận định thị trường`)
      .then(function (response) {
        setLockArticle(response.data.data.article);
      })
      .catch(function (error) {
        navigate("/");
      });
  };

  useEffect(() => {
    try {
      articles();
      let data = JSON.parse(localStorage.getItem("userInfo"));

      if (data != null) {
        setLock(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section
      id="Tổngquan"
      className="p-5  main_background  position-relative  overflow-y-auto"
    >
      <div className="main_content ">
        <ContentHeader className="DealHeader" date={date}>
          Nhận định thị trường
        </ContentHeader>
      </div>
      <div className="main_content col-sm-11 mx-auto text-white">
        {!loginUser ? (
          <>
            <div
              className=" first-pera d-block m-0"
              dangerouslySetInnerHTML={{
                __html: unLockArticle.substr(0, unLockArticleShowLength),
              }}
            />
            <div className="lockContext ">
              <Lock>
                <span
                  className=" first-pera d-block"
                  dangerouslySetInnerHTML={{
                    __html: unLockArticle.substr(
                      unLockArticleShowLength,
                      unLockArticle.length
                    ),
                  }}
                />
              </Lock>
              <Lock>
                <div
                  className="overflow-hidden first-pera"
                  dangerouslySetInnerHTML={{
                    __html: lockArticle,
                  }}
                />
              </Lock>
              <div className="lockText ">
                <div className="social_media">
                  <div className="social col-lg-12">
                    <a className="anchore-social  bg-light" href="#" onClick={()=>navigate("/login")}>
                      <img
                        src="./imgs/googleLogo.png"
                        height="18px"
                        alt="Google"
                      />{" "}
                      Sign Up with Google
                    </a>
                    <a className="anchore-social bg-light" href="#">
                      <img
                        src="./imgs/facebook.png"
                        height="18px"
                        alt="Facebook"
                      />
                      Sign Up with Facebook
                    </a>
                    <a
                      className="anchore-social bg-light"
                      href="#"
                      onClick={() => navigate("/registration")}
                    >
                      <img src="./imgs/email.png" height="18px" alt="Email" />
                      Sign Up with Email
                    </a>
                  </div>

                  <div className="account-exist">
                    <p className="col-lg-12">
                      Already have an account?
                      <a
                        className="text-light ms-2"
                        href="#"
                        onClick={() => navigate("/login")}
                      >
                        Sign In
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {unLockArticle != "no more article..." ? (
              <div
                className=" first-pera d-block"
                dangerouslySetInnerHTML={{
                  __html: unLockArticle,
                }}
              />
            ) : (
              <></>
            )}

            {lockArticle != "no more article..." ? (
              <div
                className=" first-pera d-block"
                dangerouslySetInnerHTML={{
                  __html: lockArticle,
                }}
              />
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default NhậnDịnhFIDT;
