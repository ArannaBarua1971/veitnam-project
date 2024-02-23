import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { Button, ContentHeader } from "../adminComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AllCourseBuyerUser() {
  const notify = (message) => toast(message);

  const [userData, setUserData] = useState([]);
  const getUserData = () => {
    axios
      .get(`${conf}/all_CourseUser`)
      .then(function (response) {
        setUserData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const activeCourse = (id,name) => {
    const $request = {
      id: id,
    };
    axios
      .post(`${conf}/active_course_user_status`, $request)
      .then((response) => {
        notify(`course status of ${name} updated!`);
        getUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteCourse = (id,name) => {
    const $request = {
      id: id,
    };
    axios
      .post(`${conf}/delete_course_user`, $request)
      .then((response) => {
        notify(`Delete course of ${name}!`);
        getUserData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      {/* heading */}
      <ContentHeader>All Course User Info .</ContentHeader>
      {/* notify toast */}
      <ToastContainer />
      {/* user info */}
      <div className="table_data">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">sl no</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Promotional Code</th>
              <th scope="col">Price</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.phone_number == null ? "012XXXXXX" : user.phone_number}
                </td>
                <td>
                  {user.promotional_code == null ? "" : user.promotional_code}
                </td>
                <td>{user.price}</td>
                <td>
                  <Button
                    className="p-1 bg-dark"
                    onClick={() => activeCourse(user.id,user.name)}
                  >
                    {user.status ? "Deactive" : "Active"}
                  </Button>
                  <Button
                    className="p-1 mx-1 bg-danger"
                    onClick={() => deleteCourse(user.id,user.name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCourseBuyerUser;
