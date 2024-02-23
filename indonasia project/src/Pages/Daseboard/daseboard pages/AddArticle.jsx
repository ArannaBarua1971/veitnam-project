import React, { useEffect, useState ,useRef } from "react";
import { ContentHeader, Button } from "../../../components";
import axios from "axios";
import conf from "../../../conf/conf";
import { useDispatch } from "react-redux";
import { addUnLockArticle } from "../../../features/currentArticleSlice";
import { useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";


function AddArticle() {
  const editor = useRef(null);
  const [article, setArticle] = useState("");
  const currentArticle = useDispatch();
  const navigate=useNavigate()

  useEffect(() => {
    axios
      .get(`${conf}/getArticle`)
      .then(function (response) {
        currentArticle(addUnLockArticle(response.data.data.article));
        setArticle(response.data.data.article)
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
      .post(`${conf}/add-article`, request)
      .then(function (response) {
        currentArticle(addUnLockArticle(response.data.data));
        setArticle(article)
        navigate("/NhậnDịnh_fidt")
      })
      .catch(function (error) {
        console.log(error);
      });

  };
  return (
    <div>
      {/* title of daseboard */}
      <ContentHeader className="text-white">Add Unlock Article</ContentHeader>

      {/* form for to add article */}
      <div className="mt-4">
        {/* <textarea
          onChange={(e) => setArticle(e.target.value)}
          type="text"
          className="w-100 p-2"
          style={{ height: "300px" }}
          value={article}
        /> */}
        <JoditEditor
          ref={editor}
          value={article}
          onChange={(newContent) => setArticle(newContent)}
        />
        <Button onClick={Submit} className="px-4 py-3 mt-3  border-0 rounded">
          ADD Unlock Article
        </Button>
      </div>
    </div>
  );
}

export default AddArticle;
