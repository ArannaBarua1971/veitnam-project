import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { ContentHeader,Button } from "../adminComponents";
import { useNavigate } from "react-router-dom";

function AllData() {
    const navigate=useNavigate()
  const [Data, setData] = useState([]);
  const getData = () => {
    axios
      .get(`${conf}/get_data_byDate`)
      .then(function (response) {
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const delete_data_byDate = (date) => {
    axios
      .post(`${conf}/delete_data_byDate/${date}`)
      .then(function (response) {
        getData()        
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => getData(), []);
  return (
    <div>
      {/* heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">All Data</ContentHeader>
        <Button className="py-2 mx-3 bg-dark" onClick={() => navigate("/admin/upload-data")}>Add Data</Button>
      </div>

      {/* user info */}
      <div className="table_data">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">sl no</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.created_at}</td>
                <td><Button className="bg-danger p-1" onClick={(e)=>delete_data_byDate(data.created_at)}>Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllData;
