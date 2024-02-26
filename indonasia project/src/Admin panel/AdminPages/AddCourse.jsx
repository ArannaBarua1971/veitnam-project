import React, { useEffect, useState } from "react";
import { ContentHeader, Button, Input, SummerNote } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
function AddCourse() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);

  const [course_title, setCourse_title] = useState("");
  const [course_description, setCourse_description] = useState("");
  const [course_thumb, setCourse_thumb] = useState();
  const [price, setprice] = useState(0);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (slug) {
      setEdit(true);
      axios
        .get(`${conf}/get_specific_course/${slug}`)
        .then((response) => {
          setCourse_title(response.data.data.course_title)
          setCourse_description(response.data.data.course_description)
          setprice(response.data.data.price)
        })
        .catch((error) => console.log(error));
    }
  }, [slug]);
  const handleSubmission = async () => {
    let formData = new FormData();
    formData.append("course_title", course_title);
    formData.append("course_description", course_description);
    formData.append("course_thumb", course_thumb);
    formData.append("price", price);
    await axios
      .post(`${conf}/add_course`, formData)
      .then((response) => {
        notify(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = async () => {
    let formData = new FormData();
    formData.append("course_title", course_title);
    formData.append("course_description", course_description);
    formData.append("course_thumb", course_thumb);
    formData.append("price", price);
    await axios
      .post(`${conf}/edit_course/${slug}`, formData)
      .then((response) => {
        notify(response.data.message);
        setTimeout(() => navigate("/admin/all-course"), 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* title of daseboard */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">Add Course</ContentHeader>
        <Button
          className="py-2 mx-3 bg-dark"
          onClick={() => navigate("/admin/all-course")}
        >
          All Course
        </Button>
      </div>
      {/* notify toast */}
      <ToastContainer />

      {/* form for to add article */}
      <section className="mt-4">
        {/* membership title section */}
        <div className="membership_info my-4">
          <Input
            type="text"
            name="course_title"
            onChange={(e) => setCourse_title(e.target.value)}
            label="Course Title *:"
            placeholder="Enter course title .."
            labelStyle="text-dark"
            value={course_title}
          />
          <Input
            type="file"
            name="course_thumb"
            onChange={(e) => setCourse_thumb(e.target.files[0])}
            label="Course Thumb *:"
            className="form-control"
            labelStyle="text-dark"
          />

          <Input hidden label="Course Description" />
          <SummerNote
            value={course_description}
            setContent={setCourse_description}
          />
          <Input
            type="number"
            name="price"
            onChange={(e) => setprice(e.target.value)}
            label="Course Price *:"
            labelStyle="text-dark"
            value={price}
          />
        </div>

        <Button className="py-3 px-2" onClick={edit ? editContent : handleSubmission}>
            {edit ? "Edit Course " : "Add Course"}
        </Button>
      </section>
    </div>
  );
}

export default AddCourse;
