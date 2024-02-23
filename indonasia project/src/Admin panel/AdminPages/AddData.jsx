import React, { useState } from "react";
import { Button, ContentHeader, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";
import { ErrorMessage } from "../../components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddData() {
  const notify = (message) => toast(message);
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [validationError1, setValidationError1] = useState({});
  const [validationError2, setValidationError2] = useState({});
  const [validationError3, setValidationError3] = useState({});

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
        error = error.response.data.errors;
        if (error) setValidationError1({ ...error });
        else notify("file is uploaded");
      });
  };
  const upload_Muabánròngtheomã_data = () => {
    const formData = new FormData();
    formData.append("csv_file", file2);

    axios
      .post(`${conf}/upload_Muabánròngtheomã_data`, formData)
      .then((response) => {
        notify("file is uploaded");
        setValidationError2("");
      })
      .catch((error) => {
        error = error.response.data.errors;
        if (error) setValidationError2({ ...error });
        else notify("file is uploaded");
      });
  };
  const upload_Diễnbiếnmua_bán_data = () => {
    const formData = new FormData();
    formData.append("csv_file", file3);

    axios
      .post(`${conf}/upload_Diễnbiếnmua_bán_data`, formData)
      .then((response) => {
        notify("file is uploaded");
        setValidationError3("");
      })
      .catch((error) => {
        console.log(error);
        error = error.response.data.errors;
        if (error) setValidationError3({ ...error });
        notify("check your file data");
      });
  };
  return (
    <div>
      {/* notify toast */}
      <ToastContainer />
      {/* header */}
      <ContentHeader>Upload Data</ContentHeader>

      {/* import csv file */}
      <div className="d-flex justify-content-between flex-wrap">
        <div className="import my-3 col-lg-3">
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

        <div className="import my-3 col-lg-3">
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

        <div className="import my-3 col-lg-3">
          <Input
            label="upload csv file for chart"
            onChange={(e) => setFile3(e.target.files[0])}
            className="form-control"
            type="file"
          ></Input>
          {validationError3.csv_file ? (
            <ErrorMessage className="d-block">
              {validationError3.csv_file}
            </ErrorMessage>
          ) : (
            <></>
          )}
          <Button onClick={() => upload_Diễnbiếnmua_bán_data()} className="p-3">
            Upload file
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddData;
