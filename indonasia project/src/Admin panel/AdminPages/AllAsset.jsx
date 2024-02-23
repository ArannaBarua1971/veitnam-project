import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { Button, ContentHeader } from "../adminComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AllAsset() {
  const navigate=useNavigate()
  const notify = (message) => toast(message);

  const [assetDatas, setAssetData] = useState([]);

  const getAllAsset = () => {
    axios
      .get(`${conf}/get_asset`)
      .then(function (response) {
        setAssetData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const activeAsset = (id,index) => {
    console.log(id)
    axios
      .post(`${conf}/status_change_specific_asset/${id}`)
      .then((response) => {
        notify(`status change  deal of ${index+1} sl no`);
        getAllAsset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAsset = (id) => {
    axios
      .post(`${conf}/delete_asset/${id}`)
      .then((response) => {
        notify(`Delete asset `);
        getAllAsset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = (id) => {
    navigate(`/admin/add-asset/${id}`)
  };

  useEffect(() => {
    getAllAsset();
  }, []);
  return (
    <div>
      {/* heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">All Asset</ContentHeader>
        <Button
          className="py-2 my-3 bg-dark"
          onClick={() => navigate("/admin/add-asset")}
        >
          Add Asset
        </Button>
      </div>
      {/* notify toast */}
      <ToastContainer />
      {/* user info */}
      <div className="table_data">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">sl no</th>
              <th scope="col">Mãcổphiếu</th>
              <th scope="col">NgàyKN</th>
              <th scope="col">Giámuakhuyếnnghị</th>
              <th scope="col">NgưỡnggiáQtrr</th>
              <th scope="col">Giáhiệntại</th>
              <th scope="col">LãiLỗ</th>
              <th scope="col">Kịchbảnhiệntại</th>
              <th scope="col">manipulate</th>
            </tr>
          </thead>
          <tbody>
            {assetDatas.map((data, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{data.Mãcổphiếu}</td>
                <td>{data.NgàyKN}</td>
                <td>
                  {data.Giámuakhuyếnnghị }
                </td>
                <td>
                  {data.NgưỡnggiáQtrr }
                </td>
                <td>{data.Giáhiệntại}</td>
                <td>{data.LãiLỗ}</td>
                <td>{data.Kịchbảnhiệntại}</td>
                <td>
                  <Button
                    className="p-1 bg-primary"
                    onClick={()=>editContent(data.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="p-1 mx-1 bg-dark"
                    onClick={() => activeAsset(data.id,index)}
                  >
                    {data.status ? "Deactive" : "Active"}
                  </Button>
                  <Button
                    className="p-1  bg-danger"
                    onClick={() => deleteAsset(data.id)}
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

export default AllAsset;
