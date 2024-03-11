import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/conf";
import { Button, ContentHeader } from "../components";

function ArticleContentPart() {
  const navigate = useNavigate();
  const [article, setarticle] = useState([]);
  let { slug } = JSON.parse(localStorage.getItem("LectureArticle_slug"));

  const getArticleData = () => {
    axios
      .get(`${conf}/get_sepecific_article/${slug}`)
      .then((response) => {
        setarticle(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getArticleData();
  }, [slug]);
  return (
    <div className="p-5 main_background overflow position-relative tablepage1">
      {/* short deal header */}
      <ContentHeader className="DealHeader pb-0">
        <Button
          onClick={() => window.history.back()}
          className="d-block btn-style mb-3 "
          width="10%"
        >
          <i className="fa-solid fa-backward text-white"></i>
        </Button>
        <p>{article.title}</p>
      </ContentHeader>

      <div className="ms-4">
        {/* header */}

        <div className="course_description DealHeader">
          <div
            className="first-pera text-white"
            dangerouslySetInnerHTML={{
              __html: article.description,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ArticleContentPart;
