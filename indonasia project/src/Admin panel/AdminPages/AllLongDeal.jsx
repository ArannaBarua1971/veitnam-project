import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/conf";
import { Button, ContentHeader } from "../adminComponents";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AllLongDeal() {
  const navigate=useNavigate()
  const notify = (message) => toast(message);

  const [dealDatas, setDealData] = useState([]);
  const getAllDeal = () => {
    axios
      .get(`${conf}/get_long_deal`)
      .then(function (response) {
        setDealData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const activeShortDeal = (id,index) => {
    axios
      .post(`${conf}/status_change_specific_long_deal/${id}`)
      .then((response) => {
        notify(`status change  deal of ${index+1} sl no`);
        getAllDeal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteDeal = (id) => {
    axios
      .post(`${conf}/delete_long_deal/${id}`)
      .then((response) => {
        notify(`Delete deal `);
        getAllDeal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = (id) => {
    navigate(`/admin/long-deal/${id}`)
  };

  useEffect(() => {
    getAllDeal();
  }, []);
  return (
    <div>
      {/* heading */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">All Long Deal</ContentHeader>
        <Button
          className="py-2 my-3 bg-dark"
          onClick={() => navigate("/admin/long-deal")}
        >
          Add Long Deal
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
            {dealDatas.map((data, index) => (
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
                    onClick={() => activeShortDeal(data.id,index)}
                  >
                    {data.status ? "Deactive" : "Active"}
                  </Button>
                  <Button
                    className="p-1 bg-danger"
                    onClick={() => deleteDeal(data.id)}
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

export default AllLongDeal;
