import React, { useEffect, useState,useRef } from "react";
import { ContentHeader, Button } from "../../../components";
import axios from "axios";
import conf from "../../../conf/conf";
import { useDispatch } from "react-redux";
import { addLockArticle } from "../../../features/currentArticleSlice";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";

function LockArticle() {
  const editor = useRef(null);
  const [article, setArticle] = useState("");
  const currentArticle = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${conf}/getLockArticle`)
      .then(function (response) {
        currentArticle(addLockArticle(response.data.data.article));
        setArticle(response.data.data.article);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const Submit = async () => {
    const request = {
    article:article == "" ? "no more article..." : article,
    };

    let res = await axios
      .post(`${conf}/add-lock-article`, request)
      .then(function (response) {
        currentArticle(addLockArticle(response.data.data));
        setArticle(article);
        console.log(response)
        navigate("/NhậnDịnh_fidt");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      {/* title of daseboard */}
      <ContentHeader className="text-white">Add Lock Article</ContentHeader>

      {/* form for to add article */}
      <div className="mt-4">

        <JoditEditor
          className="textBox"
          ref={editor}
          value={article}
          onChange={(newContent) => setArticle(newContent)}
        />
        <Button onClick={Submit} className="px-4 py-3 mt-3  border-0 rounded">
          ADD Lock Article
        </Button>
      </div>
    </div>
  );
}

export default LockArticle;
