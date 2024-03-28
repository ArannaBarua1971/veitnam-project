import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { Button, ContentHeader } from "../components";
function AllActiveCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const getAllCourses = () => {
    axios
      .get(`${conf}/getAllActiveCourse`)
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllCourses();
  }, []);

  const course_details = (slug) => {
    localStorage.setItem("course_slug", JSON.stringify({ course_slug: slug }));
    navigate(`/course_details`);
  };
  return (
    <div>
      <div className="p-5 d-flex main_background  position-relative  overflow-y-auto flex-wrap">
        <div id="videos" className="w-100">
          <div className="main_content catagory_title text-white">
            <ContentHeader className="DealHeader">
              Khóa đào tạo hội viên
            </ContentHeader>
          </div>

          <div className="courses   d-flex flex-wrap mt-2 container justify-content-between">
            {courses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-5 col-sm-12 ">
                <div className="text-white form-bg mx-2" style={{ width: "18rem;" }}>
                  <img
                    src={course.course_thumb_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body my-2">
                    <h5 className="card-title">{course.course_title}</h5>
                    <p className="card-text">
                      {course.course_description  ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: course.course_description.substr(0, 20),
                          }}
                        />
                      ) : (
                        <p>video description</p>
                      )}
                      ...
                    </p>
                    <Button
                      onClick={() => course_details(course.slug)}
                      className="btn-style mt-3"
                    >
                      See More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllActiveCourses;
