import React, { useEffect, useState } from "react";
import { Button, ContentHeader, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";
import { ErrorMessage } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddData() {
  const navigate=useNavigate()
  const notify = (message) => toast(message);
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [validationError1, setValidationError1] = useState({});
  const [validationError2, setValidationError2] = useState({});

  const [file1Header, setFile1Header] = useState([]);
  const [catagory, setCatagory] = useState();

  const upload = () => {
    const formData = new FormData();
    formData.append("csv_file", file1);

    axios
      .post(`${conf}/upload_Data`, formData)
      .then((response) => {
        notify("file is uploaded");
        setValidationError1("");
      })
      .catch((error) => {
        try {
          error = error.response.data.errors;
          if (error) setValidationError1({ ...error });
        } catch (error) {
          console.log(error);
        }
      });

    axios.post(`${conf}/upload_totalData`, formData).then((response) => {
      console.log(response.data.data);
    });

    getData();
  };

  const upload_Muabánròngtheomã_data = () => {
    const formData = new FormData();
    formData.append("csv_file", file2);
    formData.append("data_id", catagory);

    axios
      .post(`${conf}/upload_Muabánròngtheomã_data`, formData)
      .then((response) => {
        notify("file is uploaded");
        setValidationError2("");
      })
      .catch((error) => {
        try {
          error = error.response.data.errors;
          if (error) setValidationError2({ ...error });
          else {
            notify("file is uploaded");
            setFile2("");
            setValidationError2("");
            catagory("");
          }
        } catch (error) {
          console.log(error);
        }
      });
  };

  const getData = () => {
    axios
      .get(`${conf}/get_Data`)
      .then((response) => {
        setFile1Header(response.data.data);
        setValidationError1("");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {/* notify toast */}
      <ToastContainer />
      {/* header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">Add Data</ContentHeader>
        <Button className="py-2 mx-3 bg-dark" onClick={() => navigate("/admin/all-data")}>All Data</Button>
      </div>

      {/* import csv file */}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="import my-3 w-100 border-3 p-3">
          <Input
            label="upload csv file for Table 1"
            onChange={(e) => setFile1(e.target.files[0])}
            className="form-control"
            type="file"
          ></Input>
          {validationError1.csv_file ? (
            <ErrorMessage className="d-block">
              {validationError1.csv_file}
            </ErrorMessage>
          ) : (
            <></>
          )}
          <Button onClick={() => upload()} className="p-3">
            Upload file
          </Button>
        </div>

        <div className="import my-3 w-100 border-3 p-3">
          <div className="catagory_selector col-lg-6">
            <ContentHeader className="text-dark h5 py-3">
              Mua bán ròng theo ngành* :
            </ContentHeader>
            <select
              className="form-select"
              name="catagory"
              id="catagory"
              onChange={(e) => setCatagory(e.target.value)}
              value={catagory}
            >
              <option selected>Choose One</option>
              {file1Header.map((datahead, index) => (
                <option key={index} value={datahead.id}>
                  {datahead.Phânngành_ICB2}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="upload csv file for Table 2"
            onChange={(e) => setFile2(e.target.files[0])}
            className="form-control"
            type="file"
          ></Input>
          {validationError2.csv_file ? (
            <ErrorMessage className="d-block">
              {validationError2.csv_file}
            </ErrorMessage>
          ) : (
            <></>
          )}
          <Button
            onClick={() => upload_Muabánròngtheomã_data()}
            className="p-3"
          >
            Upload file
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddData;
