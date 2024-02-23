import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/conf";
import { Button, ContentHeader } from "../components";

function CourseDetails() {
  const navigate = useNavigate();
  const [slug,setSlug] = useState()
  const [couseDetails, setCourseDetails] = useState([]);
  const [courseVideo, setCourseVideo] = useState([]);
  const [courseBuy, setCourseBuy] = useState(false);

  const getCourseVideos =async (id) => {
    await axios
      .get(`${conf}/get_ActiveCourse_video/${id}`)
      .then((response) => {
        setCourseVideo(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const CourseBuyVerify = async (course_id) => {

    let {roles}=JSON.parse(localStorage.getItem("userInfo"))
    if(roles!="admin"){

      let { id } = JSON.parse(localStorage.getItem("userInfo"));
  
      
     await axios
        .get(`${conf}/courseBuyVerify/${id}/${course_id}`)
        .then((response) => {
          setCourseBuy(response.data.data);
        })
        .catch((error) => console.log(error));
    }
    else{
      console.log(roles)
      setCourseBuy(true)
    }
  };

  useEffect(() => {
    let {course_slug}=JSON.parse(localStorage.getItem("course_slug"))
    setSlug(course_slug)
    axios
    .get(`${conf}/getSpecificCourseDetails/${course_slug}`)
    .then((response) => {
      getCourseVideos(response.data.data.id);
      setCourseDetails(response.data.data);
      CourseBuyVerify(response.data.data.id);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="p-5 main_background overflow position-relative tablepage1">
      {/* short deal header */}
      <ContentHeader className="DealHeader pb-0">
        Khóa đào tạo hội viên
        <div className="subtitle fw-bolder">
          <p>{couseDetails.course_title}</p>
        </div>
      </ContentHeader>

      <div className="ms-4">
        {/* header */}

        <div className="course_description DealHeader">
          <div className="subtitle fw-bolder">
            <p>Giới thiệu khóa học</p>
          </div>

          <div
            className="text-white"
            dangerouslySetInnerHTML={{
              __html: couseDetails.course_description,
            }}
          />
        </div>

        <div className="course_video">
          <ul class="list-group ">
            <li class="list-group-item border-1 bg-body-tertiary fw-bolder">
              course videos
            </li>
            {courseVideo.map((video, index) => (
              <li key={index} class="list-group-item border-1 bg-body-tertiary">
                {video.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="btn_Checkout d-flex justify-content-center mt-5">
          {courseBuy ? (
            <Button
              className="mx-auto"
              onClick={(e) => navigate(`/video_content/${couseDetails.id}`)}
            >
              Vào học
            </Button>
          ) : (
            <Button
              className="mx-auto"
              onClick={(e) => navigate(`/check_out_details/${true}/${slug}`)}
            >
              Đăng ký ngay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
