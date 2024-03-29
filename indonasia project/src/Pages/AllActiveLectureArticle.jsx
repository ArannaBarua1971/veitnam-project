import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { Button, ContentHeader } from "../components";
import Pagination from "../components/Pagination";
function AllActiveLectureArticle() {
  const navigate = useNavigate();
  const [articles, setarticles] = useState([]);
  const [articlesForSidbar, setarticlesForSidbar] = useState([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [firstIndex, setFirstIndex] = useState();
  const [lastIndex, setLastIndex] = useState();

  const setIndexValue = () => {
    let last = currentPageNo * postPerPage;
    let first = last - postPerPage;
    setFirstIndex(first);
    setLastIndex(last);
  };
  useEffect(() => {
    setIndexValue();
  }, [currentPageNo]);
  const getAllarticles = () => {
    axios
      .get(`${conf}/getAllActiveLectureArticle`)
      .then((response) => {
        setarticles(response.data.data);
        setarticlesForSidbar(response.data.data.slice(3,response.data.data.length))
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllarticles();
  }, []);

  const article_details = (slug) => {
    localStorage.setItem("LectureArticle_slug", JSON.stringify({ slug: slug }));
    navigate(`/Bài-Giảng-Thực-Chiến-full`);
  };

  return (
    <div>
      <div className="p-5 d-flex main_background  position-relative  overflow-y-auto flex-wrap">
        <div id="videos" className="w-100">
          <div className="main_content catagory_title text-white">
            <ContentHeader className="DealHeader">
              Bài Giảng Thực Chiến
            </ContentHeader>
          </div>

          <div className="courses d-flex flex-wrap mt-2 container">
            {articles.slice(0, 3).map((article, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 col-sm-12 my-2 cursor-pointer `}
                onClick={() => article_details(article.slug)}
              >
                <div
                  className={`text-white form-bg mx-2 `}
                  style={{ width: "18rem;" }}
                >
                  <img
                    src={article.thumb_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body mt-5">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text my-2">
                      {article.description ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: article.description.substr(0, 20),
                          }}
                        />
                      ) : (
                        <p>article description</p>
                      )}
                      ...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="videoSection  container ">
            <section className="hero--area section-padding-80 video-main-section-edit p-0 mt-5">
              <div className="row no-gutters ">
                {/* back to history */}
                <div className="ps-1 w-100">
                  <ul
                    className={`nav  bg-transparent
                    `}
                    role="tablist"
                  >
                    {articlesForSidbar
                      .slice(firstIndex, lastIndex)
                      .map((article, index) => (
                        <li
                          key={index}
                          className="nav-item cursor-pointer w-100 text-white  h-25 form-bg py-2 px-0"
                          onClick={() => article_details(article.slug)}
                        >
                          <a
                            className={`nav-link `}
                            id={`post-${index}-tab`}
                            data-toggle="pill"
                            role="tab"
                            aria-controls={`post-${index}`}
                            aria-selected="true"
                          >
                            {/* <!-- Single Blog Post --> */}
                            <div className="single-blog-post style-2 d-flex align-items-center">
                              <div className="post-thumbnail">
                                <img src={article.thumb_url} alt="" style={{ height:"90px",objectFit:"cover" }} />
                              </div>
                              <div className="post-content ">
                                <h6 className="post-title ">
                                  {article.title}
                                </h6>
                                {article.description ? (
                                  <div
                                    className="inline"
                                    dangerouslySetInnerHTML={{
                                      __html: article.description.substr(
                                        0,
                                        100
                                      ),
                                    }}
                                  />
                                ) : (
                                  <></>
                                )}
                              </div>
                            </div>
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>

                {articlesForSidbar.length > 4 ? (
                  <Pagination
                    totalPost={articlesForSidbar.length}
                    postPerPage={postPerPage}
                    currentPage={currentPageNo}
                    setCurrentPageNo={setCurrentPageNo}
                  />
                ) : (
                  <></>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllActiveLectureArticle;
