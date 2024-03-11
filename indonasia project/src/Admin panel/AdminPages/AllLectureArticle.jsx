import React, { useState, useEffect } from "react";
import axios from "axios";
import conf from "../../conf/conf";
import MainContainer from "../../container/MainContainer";
import { ContentHeader, Button, Card } from "../adminComponents";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AllLectureArticle() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const notify = (message) => toast(message);

  const getAllArticle = () => {
    axios
      .get(`${conf}/getAllLectureArticle`)
      .then((response) => {
        setArticles(response.data.data)
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllArticle();
  }, []);

  const Delete = (slug) => {
    axios
      .post(`${conf}/deleteLectureArticle/${slug}`)
      .then((response) => {
        notify(response.data.message)
        getAllArticle();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = (slug) => {
    navigate(`/admin/Add-Lecture-Article/${slug}`)
  };
  const statusChange = (id) => {
    axios
      .post(`${conf}/status_change_LectureArticle/${id}`)
      .then((response) => {
        notify(response.data.message)

        getAllArticle();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        {/* notify toast */}
      <ToastContainer />
        {/* Go to IDP section */}
        <section id="IDP">
          <MainContainer className="mx-auto  col-xl-9 col-sm-11 my-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <ContentHeader>All lecture Article</ContentHeader>
              <Button
                className="py-2 mx-2 bg-dark"
                onClick={() => navigate("/admin/Add-Lecture-Article")}
              >
                Add Lecture Article
              </Button>
            </div>

            {/* all IDP */}
            <div className="IDP my-5 d-flex flex-wrap">
              {articles.map((article, index) => (
                <Card key={index} className="col-lg-4 col-md-6 m-2" style={{ "width":"300px" }}>
                  <img
                    src={article.thumb_url}
                    alt={article.thumb}
                    height={"300px"}
                    width={"100%"}
                  />
                  <p>{article.title}</p>
                  {article.description ? (
                    <div
                      className="inline"
                      dangerouslySetInnerHTML={{
                        __html: article.description.substr(0, 100),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="d-flex flex-wrap justify-content-between">
                    <Button
                      onClick={() => editContent(article.slug)}
                      className="p-1 mt-3  border-0 rounded bg-primary col-sm-5"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => statusChange(article.id)}
                      className="p-1 mt-3  border-0 rounded bg-dark col-sm-5"
                    >
                      {article.status ? "Deactive" : "active"}  
                    </Button>
                    <Button
                      onClick={() => Delete(article.slug)}
                      className="p-1 mt-3  border-0 rounded bg-danger col-sm-5"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </MainContainer>
        </section>
      </div>
    </div>
  );
}

export default AllLectureArticle;
