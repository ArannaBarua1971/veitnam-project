import React, { useEffect, useState } from "react";
import { Button, ContentHeader, Input, SummerNote } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../../components";

function AddVedio() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoThumb, setVideoThumb] = useState("");
  const [course_id, setCourseId] = useState();
  const notify = (message) => toast(message);
  const [videoUploadLoader, setVideoUploadLoader] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [edit, setEdit] = useState(false);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (slug) {
      setEdit(true);
      axios
        .get(`${conf}/get_sepecific_video/${slug}`)
        .then((response) => {
          setVideoTitle(response.data.data.title);
          // setVideoThumb(response.data.data.video_thumb);
          // setVideo(response.data.data.video);
          setVideoDescription(response.data.data.description);
          setCourseId(response.data.data.course_id)
        })
        .catch((error) => console.log(error));
    }
    axios
      .get(`${conf}/getAll_course`)
      .then((response) => {
        setCourses(response.data.data)
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmission = () => {
    setVideoUploadLoader(true);
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("video", video);
    formData.append("video_thumb", videoThumb);
    formData.append("course_id", course_id);
    axios
      .post(`${conf}/upload_video`, formData)
      .then((response) => {
        setVideoUploadLoader(false);
        setValidationError({})
        notify("video added");
      })
      .catch((error) => {
        error = error.response.data.errors;
        setValidationError({ ...error });
        setVideoUploadLoader(false);
      });
  };
  const editContent = () => {
    setVideoUploadLoader(true);
    const formData = new FormData();
    formData.append("title", videoTitle);
    formData.append("description", videoDescription);
    formData.append("video", video);
    formData.append("video_thumb", videoThumb);
    formData.append("course_id", course_id);
    axios
      .post(`${conf}/edit_video/${slug}`, formData)
      .then((response) => {
        setVideoUploadLoader(false);
        setValidationError({})
        notify("video updated");
        setTimeout(() => navigate("/admin/all-vedio"), 2000);
      })
      .catch((error) => {
        error = error.response.data.errors;
        setValidationError({ ...error });
        setVideoUploadLoader(false);
      });
  };
  return (
    <div>
      {/* notify toast */}
      <ToastContainer />

      {/* shortDeal section */}
      <div className="shortDeal">
        {/* title of daseboard */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
          <ContentHeader className="text-dark">
            Add Video for Course
          </ContentHeader>
          <Button
            className="py-2 my-3 bg-dark"
            onClick={() => navigate("/admin/all-vedio")}
          >
            All Video
          </Button>
        </div>
        <div className="shortDealFrom d-flex flex-wrap add">
          <div className="catagory_selector col-lg-6">
            <ContentHeader className="text-dark h5 py-3">
              Choose Course * :
            </ContentHeader>
            <select
              className="form-select"
              name="catagory"
              id="catagory"
              onChange={(e) => setCourseId(e.target.value)}
              value={course_id}
            >
              <option selected>Choose One</option>
              {
                courses.map((course,index)=>(

                  <option key={index} value={course.id}>{course.course_title}</option>
                ))
              }
            </select>
          </div>
          <div className="col-md-6 add">
            <Input
              classForDiv="col-md-12 px-1"
              type="text"
              onChange={(e) => setVideoTitle(e.target.value)}
              value={videoTitle}
              label="Video Title"
            />
            {validationError.title ? (
              <ErrorMessage className="d-block">
                {validationError.title}
              </ErrorMessage>
            ) : (
              <></>
            )}
          </div>
          <div className="col-sm-6 ">
            <Input
              classForDiv="col-sm-12 px-1"
              className="form bg-white"
              type="file"
              onChange={(e) => setVideoThumb(e.target.files[0])}
              // value={videoThumb}
              label="Video Thumb Upload"
            />
            {validationError.video_thumb ? (
              <ErrorMessage>{validationError.video_thumb}</ErrorMessage>
            ) : (
              <></>
            )}
          </div>
          <div className="col-sm-6">
            <Input
              classForDiv="col-sm-12 px-1"
              className="form bg-white"
              type="file"
              onChange={(e) => setVideo(e.target.files[0])}
              // value={video}
              label="Upload Video "
            />
            {validationError.video ? (
              <ErrorMessage>{validationError.video}</ErrorMessage>
            ) : (
              <></>
            )}
          </div>
          <div className="popupEditor w-100">
            <hr className="my-2" />
            <ContentHeader>Video Description</ContentHeader>
            <SummerNote
              className="mt-3 w-100"
              value={videoDescription}
              setContent={setVideoDescription}
            />
          </div>
          <Button className="py-3 px-2" onClick={edit ? editContent : handleSubmission}>
            {videoUploadLoader ? (
              <div class="spinner-border mx-2 " role="status"></div>
            ) : (
              <>
                {edit ? "Edit Course Video " : "Add Course Video"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddVedio;
