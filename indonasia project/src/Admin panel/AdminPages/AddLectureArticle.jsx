import React, { useEffect, useState } from "react";
import { ContentHeader, Button, SummerNote, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../components";

function AddLectureArticle() {
  const notify = (message) => toast(message);
  const navigate = useNavigate();
  const { slug } = useParams();
  const [edit,setEdit]=useState(false)

  const [title, setTitle] = useState("");
  const [thumb, setThumb] = useState("");
  const [description, setDescription] = useState("");
  const [validationError, setValidationError] = useState([]);

  useEffect(() => {
    if (slug) {
      setEdit(true)
      axios
        .get(`${conf}/get_specificLectureArticle/${slug}`)
        .then((response) => {
          setTitle(response.data.data.title);
          setDescription(response.data.data.description);
        });
    }
    else{
      setEdit(false)
    }
  },[7]);

  const submitLectureArticle = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumb", thumb);

    axios
      .post(`${conf}/addLectureArticle`, formData)
      .then((response) => {
        notify(response.data.message);
        setValidationError("");
      })
      .catch((error) => {
        error = error.response.data.errors;
        setValidationError({ ...error });
      });
  };
  const editArticle = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("thumb", thumb);

    axios
      .post(`${conf}/edit_LectureArticle/${slug}`, formData)
      .then((response) => {
        notify(response.data.message);
        setValidationError("");
        setTimeout(()=>(window.history.back()),2000)
      })
      .catch((error) => {
        error = error.response.data.errors;
        setValidationError({ ...error });
      });
  };
  return (
    <div>
      {/* notify toast */}
      <ToastContainer />

      {/* unlockArticle */}
      <div>
        {/* title of daseboard */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
          <ContentHeader className="text-dark">Add Lecture Title</ContentHeader>
          <Button
            className="py-2 my-3 bg-dark"
            onClick={() => navigate("/admin/all-Lecture-Article")}
          >
            All Lecture Title
          </Button>
        </div>

        {/* form for to add article */}
        <div className="mt-4 d-flex flex-wrap">
          <div className="col-md-6 add">
            <Input
              classForDiv="col-md-12 px-1"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label="Lecture Title"
            />
            {validationError.title ? (
              <ErrorMessage className="d-block">
                {validationError.title}
              </ErrorMessage>
            ) : (
              <></>
            )}
          </div>
          <div className="col-md-6 add">
            <Input
              classForDiv="col-md-12 px-1 "
              className="form-control"
              type="file"
              onChange={(e) => setThumb(e.target.files[0])}
              label="Lecture Thumb"
            />
            {validationError.thumb ? (
              <ErrorMessage className="d-block">
                {validationError.thumb}
              </ErrorMessage>
            ) : (
              <></>
            )}
          </div>
          <div className="description col-md-12">
            <SummerNote value={description} setContent={setDescription} />
            <Button
              className="py-3 px-2"
              onClick={edit ? editArticle : submitLectureArticle}
            >
              
                {edit ? "Edit Lecture Article " : "Add Lecture Article"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddLectureArticle;
