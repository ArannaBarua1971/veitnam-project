import React, { useEffect, useState } from "react";
import MainContainer from "../container/MainContainer";
import { ContentHeader, Lock } from "./../components";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/conf";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/currentUserSlice";

function Tổngquan() {
  const { token } = useParams("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(false);

  const [unlockArticle, setUnlockArticle] = useState("");
  const [lockArticle, setLockArticle] = useState("");
  const [unlockArticleShowLength, setUnlockArticleShowLength] = useState(0);
  useEffect(() => {
    try {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      if (data != null) setLoginUser(true);
    } catch {
      console.log("error found");
    }
  }, []);
  useEffect(() => {
    const request = {
      token,
    };
    if (token) {
      axios
        .post(`${conf}/verifyMail`, request)
        .then(function (response) {
          const id = response.data.data.id;
          const email = response.data.data.email;
          const roles = response.data.data.roles[0].name;
          const name = response.data.data.name;
          const userData = { id, email, name, roles };
          console.log(roles);

          dispatch(login(userData));
          navigate("/");
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${conf}/getArticle/Tổng quan`)
      .then(function (response) {
        setUnlockArticle(response.data.data.article);
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
    axios
      .get(`${conf}/getLockArticle/Tổng quan`)
      .then(function (response) {
        setLockArticle(response.data.data.article);
      })
      .catch(function (error) {
        navigate("/");
      });
  }, []);

  return (
    <section
      id="Tổngquan"
      className="pt-5 d-flex main_background overflow position-relative flex-wrap"
    >
      {/* alert section */}
      {/* <div class="alert alert-success alert-dismissible fade show position-absolute z-1 top-0 w-100" style={{ height:"60px"}} role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those
        fields below.
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div> */}
      <div className="main_content catagory_title text-white col-sm-11 mx-auto">
        <ContentHeader className="DealHeader">Tổng quan</ContentHeader>
      </div>
      <div className="main_content col-lg-10 col-sm-10 mx-auto text-white ">
        {loginUser ? (
          <>
            {unlockArticle != "no article" ? (
              <div
                className="first-pera d-block "
                dangerouslySetInnerHTML={{
                  __html: unlockArticle,
                }}
              />
            ) : (
              <></>
            )}
            {lockArticle != "no article" ? (
              <div
                className="first-pera d-block"
                dangerouslySetInnerHTML={{
                  __html: lockArticle,
                }}
              />
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <div
              className=" first-pera"
              dangerouslySetInnerHTML={{
                __html: unlockArticle.substr(0, unlockArticleShowLength),
              }}
            />
            <div className="lockContext ">
              <Lock>
                <span
                  className=" first-pera"
                  dangerouslySetInnerHTML={{
                    __html: unlockArticle.substr(
                      unlockArticleShowLength,
                      unlockArticle.length
                    ),
                  }}
                />
              </Lock>
              <Lock>
                <div
                  className=" first-pera"
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
        )}

        {/* Market forecast  section*/}
        {/* <section id="market_forcast"> */}
        {/* <MainContainer className="px-3"> */}
        {/* <div className="logo w-25 mx-auto text-center">
              <Logo style={{ width: "50%" }} />
            </div> */}
        {/* Market forecast this week  layout*/}
        {/* <div className="market_forcast mt-2">
              <div className="card_wrapper">
                <Card className="bg-transparent border-0 card_bg col-lg-8 ">
                  <ContentHeader className="mx-auto text-white">
                    Dự báo thị trường trong tuần này
                  </ContentHeader>
                  <div class="prediction mx-auto d-flex align-items-center">
                    <span>tăng</span>
                    <img
                      alt="bull"
                      src="/imgs/bull.svg"
                      width="114"
                      height="120"
                    />
                  </div>
                  <p className="mx-auto text-white">
                    Dự báo bởi{" "}
                    <span className="text-white h5">FIDT Research Model</span>{" "}
                    với độ chính xác trong quá khứ: 85%
                  </p>
                </Card>
                <Card className="bg-transparent col-lg-4 bg-light text-center d-flex flex-col justify-content-center">
                  <div class="information">
                    <div class="items">
                      <div class="info-item">
                        <div class="inter">Tỉ lệ rủi ro</div>
                        <div class="up">37.56%</div>
                      </div>
                      <div class="info-item">
                        <div class="inter">Tỉ lệ rủi ro thay đổi</div>
                        <div class="up">-1.19%</div>
                      </div>
                    </div>
                    <Button
                      type="button"
                      className="py-2 px-3 mx-auto d-block my-3"
                      textStyle="p-0 m-0"
                    >
                      Xem thêm
                    </Button>
                    <a
                      target="_blank"
                      class="learn-more inter"
                      href="#"
                      className="d-block text-white btn-link"
                    >
                      Tìm hiểu thêm về RMS
                    </a>
                  </div>
                </Card>
              </div>
            </div> */}
        {/* </MainContainer> */}
        {/* </section> */}

        {/* lock section */}
        {/* <section className="mt-3">
          <div className="container">
            <div
              className="about_cnt col-lg-12 col-sm-12"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="300"
            > */}
        {/* <nav>
                <div
                  className="nav nav-tabs mb-3"
                  id="about_nav"
                  role="tablist"
                >
                  <button
                    className="nav-link active active-btn"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#history"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    HISTORY
                  </button>
                  <button
                    className="nav-link"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#mission"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    MISSION
                  </button>
                </div>
              </nav> */}
        {/* <div className="tab-content container-box" id="nav-tabContent"> */}
        {/* <!-- ////// --> */}
        {/* <div
                  className="tab-pane fade show active "
                  id="history"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <p>
                    Vietnam is a socialist state in Southeast Asia that borders
                    the Gulf of Thailand, the Gulf of Tonkin, and the South
                    China Sea. It's a popular travel destination for its
                    beaches, relaxation, heritage, and cuisine. Vietnam is also
                    known for its fish sauce and for fighting wars against the
                    French, the US, the Cambodians, and the Chinese between 1945
                    and 1979
                  </p>
                </div>
                <div
                  className="tab-pane fade show "
                  id="mission"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <p>
                    Vietnam is a socialist state in Southeast Asia that borders
                    the Gulf of Thailand, the Gulf of Tonkin, and the South
                    China Sea. It's a popular travel destination for its
                    beaches, relaxation, heritage, and cuisine. Vietnam is also
                    known for its fish sauce and for fighting wars against the
                    French, the US, the Cambodians, and the Chinese between 1945
                    and 1979
                  </p>
                </div>
              </div> */}
        {/* </div> */}
        {/* </div> */}
        {/* </section> */}
      </div>

      {/* news section */}
      {/* <section id="news" className="col-lg-4"> */}
      {/* news card section */}
      {/* <Card>
          <div className="title">
            <ContentHeader className="h1">Trang tin</ContentHeader>
          </div>
          <div className="news-content-wrap">
            <div className="news-content">
              {Array(2)
                .fill(0)
                .map((item, index) => (
                  <Card key={index} className="news-item mt-2">
                    <div className="news-head">
                      <div className="category">
                        <img
                          alt=""
                          src="/imgs/mail.svg"
                          width="32"
                          height="32"
                          decoding="async"
                          data-nimg="1"
                          loading="lazy"
                        />
                        <span>OFFICIAL</span>
                      </div>
                      <div className="posted-time my-2">2 ngày trước</div>
                    </div>
                    <div className="news-item-content">
                      <ContentHeader className="news-title">
                        🔥 Thủ tướng chỉ đạo NHNN xử lý nghiêm những ngân hàng
                        cố tình “gây khó” doanh nghiệp bất động sản, người mua
                        nhà vay vốn
                      </ContentHeader>
                      <div className="news-body inter">
                        <div className="content ">
                          <p>
                            Thủ tướng Phạm Minh Chính vừa ký công điện 1177 về
                            việc tiếp tục thực hiện quyết liệt các giải pháp
                            tăng cường khả năng tiếp cận vốn tín dụng, thúc đẩy
                            phát triển thị trường trái phiếu doanh nghiệp, bất
                            động sản hiệu quả, an toàn, lành mạnh, bền vững.
                          </p>
                        </div>
                        <div className="toggle">Xem thêm...</div>
                      </div>
                    </div>
                    <div className="like d-flex mt-3 ms-auto">
                      <img
                        alt=""
                        src="/imgs/heart.svg"
                        width="24"
                        height="24"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />
                      <div className="inter">153</div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        </Card> */}
      {/* </section> */}
    </section>
  );
}

export default Tổngquan;
