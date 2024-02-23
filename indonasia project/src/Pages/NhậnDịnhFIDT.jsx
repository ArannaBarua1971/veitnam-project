import React, { useEffect, useState } from "react";
import { ContentHeader, Lock } from "../components";
import { useNavigate } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";
import MainContainer from "../container/MainContainer";

function NhậnDịnhFIDT() {
  const [lockArticle, setLockArticle] = useState("");
  const [unLockArticle, setUnLockArticle] = useState("");
  const [unLockArticleShowLength, setUnlockArticleShowLength] = useState();
  const [loginUser, setLoginUser] = useState(false);

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
    <div
      id="NhậnDịnhfidt "
      className="pt-5 d-flex main_background overflow position-relative flex-wrap"
    >
      {/* <!-- without lock article container --> */}
      <div className="main_content catagory_title text-white col-sm-11 mx-auto">
        <ContentHeader className="DealHeader">
          Nhận định thị trường
        </ContentHeader>
      </div>
      <section className="main_content col-sm-10 mx-auto text-white">
        {!loginUser ? (
          <>
            <div
              className=" first-pera d-block"
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
                    <a className="anchore-social  bg-light" href="#">
                      <img
                        src="./imgs/download.png"
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
            {unLockArticle != "no article" ? (
              <div
                className=" first-pera d-block"
                dangerouslySetInnerHTML={{
                  __html: unLockArticle,
                }}
              />
            ) : (
              <></>
            )}

            {lockArticle != "no article" ? (
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
      </section>
    </div>
  );
}

export default NhậnDịnhFIDT;
