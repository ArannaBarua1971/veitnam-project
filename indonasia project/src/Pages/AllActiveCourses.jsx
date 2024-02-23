import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { Button } from "../components";
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

  const course_details=(slug)=>{
    localStorage.setItem("course_slug",JSON.stringify({"course_slug":slug}))
    navigate(`/course_details`)
  }
  return (
    <div>
      <div className="container">
        <div id="videos">
          <div className="row">
            <div className="courses-title mt-5">
              <h3>Courses</h3>
            </div>
          </div>
          <div className="row mt-2">
            {courses.map((course, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 my-2">
                <div className="card" style={{ width: "18rem;" }}>
                  <img
                    src={course.course_thumb_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{course.course_title}</h5>
                    <p className="card-text">
                      {course.course_description != "" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: course.course_description.substr(0,20),
                          }}
                        />
                      ) : (
                        <p>video description</p>
                      )}
                      ...
                    </p>
                    <Button
                      onClick={()=>course_details(course.slug)}
                      className="btn-style"
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
