import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { ContentHeader } from "../adminComponents";

function AllUser() {
  const [userData, setUserData] = useState([]);
  const getUserData = () => {
    axios
      .get(`${conf}/all-user`)
      .then(function (response) {
        console.log(response);
        setUserData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => getUserData(), []);
  return (
    <div>
      {/* heading */}
      <ContentHeader>All User Info .</ContentHeader>

      {/* user info */}
      <div className="table_data">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">sl no</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone == null ? "012XXXXXX" : user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllUser;
