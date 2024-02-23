import React, { useState, useEffect } from "react";
import axios from "axios";
import conf from "../../conf/conf";
import MainContainer from "../../container/MainContainer";
import { ContentHeader, Package, Button, Card } from "../adminComponents";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AllCourses() {
  const navigate = useNavigate();
  const [Courses, setCourses] = useState([]);
  const notify = (message) => toast(message);

  const getCourses = async () => {
    await axios
      .get(`${conf}/getAll_course`)
      .then(function (response) {
        setCourses(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const Delete = async (id) => {
    await axios
      .post(`${conf}/Delete_sepecific_course/${id}`)
      .then(function (response) {
        notify(response.data.message);

        getCourses();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const statusChange = async (id) => {
    await axios
      .post(`${conf}/status_change_course/${id}`)
      .then(function (response) {
        notify(response.data.message);

        getCourses();
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const editContent=(slug)=>{
    navigate(`/admin/Add-course/${slug}`)
  }

  useEffect(() => {
    try {
      getCourses();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {/* Go to IDP section */}
      <section id="IDP">
        <MainContainer className="mx-auto  col-xl-9 col-sm-11 my-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
            <ContentHeader className=" mx-2">All Courses</ContentHeader>
            <Button
              className="py-2 mx-2 bg-dark"
              onClick={() => navigate("/admin/Add-course")}
            >
              Add Courses
            </Button>
          </div>
          {/* notify toast */}
          <ToastContainer />
          {/* all Course */}
          <div className="IDP my-5 d-flex flex-wrap">
            {Courses.map((course, index) => (
              <Card key={index} className="col-lg-4 m-2">
                <img
                  src={course.course_thumb_url}
                  alt={course.course_thumb_url}
                />
                <p>{course.course_title}</p>
                {course.course_description ? (
                  <div
                    className="inline"
                    dangerouslySetInnerHTML={{
                      __html: course.course_description.substr(0, 100),
                    }}
                  />
                ) : (
                  <></>
                )}
                <p className="mt-2">price : {course.price}</p>
                <div className="d-flex flex-wrap justify-content-between">
                  <Button
                    onClick={() => editContent(course.slug)}
                    className="p-1 mt-3  border-0 rounded bg-primary col-sm-5"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => statusChange(course.id)}
                    className="p-1 mt-3  border-0 rounded bg-dark col-sm-5"
                  >
                    {course.status ? "Deactive" : "active"}
                  </Button>
                  <Button
                    onClick={() => Delete(course.id)}
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
  );
}

export default AllCourses;
