import React, { useEffect, useState } from "react";
import { DataChart, Input } from "../components";
import axios from "axios";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";

function Data() {
  const navigate = useNavigate();
  const [datas1, setDatas1] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [selectTable1, setSelectTable1] = useState(-1);
  const [selectTable2, setSelectTable2] = useState(-1);
  const [selectTable2Root, setSelectTable2Root] = useState(-1);
  const [allCatagory, setallCatagory] = useState([]);
  const [selectCatagory, setSelectCatagory] = useState();

  const [Cá_nhân_trong_nước, setCá_nhân_trong_nước] = useState(0);
  const [Tổ_chức_trong_nước, setTổ_chức_trong_nước] = useState(0);
  const [Tự_doanh, setTự_doanh] = useState(0);
  const [Nước_ngoài, setNước_ngoài] = useState(0);
  const [chart_data, setChartData] = useState();

  // after loading page
  const get_Data = async () => {
    await axios
      .get(`${conf}/get_Data`)
      .then((response) => {
        setDatas1(response.data.data);
        setCá_nhân_trong_nước(0);
        setTổ_chức_trong_nước(0);
        setTự_doanh(0);
        setNước_ngoài(0);

        response.data.data.map((data) => {
          setCá_nhân_trong_nước((pre) => data.Cá_nhân_trong_nước + pre);
          setTổ_chức_trong_nước((pre) => data.Tổ_chức_trong_nước + pre);
          setTự_doanh((pre) => data.Tự_doanh + pre);
          setNước_ngoài((pre) => data.Nước_ngoài + pre);
        });
      })
      .catch((error) => console.log(error));
  };

  const get_Muabánròngtheomã_data = async () => {
    await axios
      .get(`${conf}/get_Muabánròngtheomã_data`)
      .then((response) => {
        setDatas2(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  // after change date
  const getDataBydate = async () => {
    if (end_date == null || end_date == "") {
      await axios
        .get(`${conf}/data_fromStart/${start_date}`)
        .then((response) => {
          setDatas1(response.data.data[0]);
          setDatas2(response.data.data[1]);
        })
        .catch((error) => console.log(error));
    } else if (start_date == null || start_date == "") {
      await axios
        .get(`${conf}/data_fromEnd/${end_date}`)
        .then((response) => {
          setDatas1(response.data.data[0]);
          setDatas2(response.data.data[1]);
        })
        .catch((error) => console.log(error));
    } else {
      await axios
        .get(`${conf}/data_fromBoth/${start_date}/${end_date}`)
        .then((response) => {
          setDatas1(response.data.data[0]);
          setDatas2(response.data.data[1]);
        })
        .catch((error) => console.log(error));
    }
  };
  useEffect(() => {
    getDataBydate();
    setSelectTable1(-1);
    setSelectTable2(-1);
    setSelectCatagory("")
  }, [start_date, end_date]);

  const getDataBycatagroy = async () => {
    await axios
      .get(`${conf}/getDataBycatagroy/${selectCatagory}`)
      .then((response) => {
        setDatas1(response.data.data[1]);
        setDatas2(response.data.data[0]);
        setCá_nhân_trong_nước(0);
        setTổ_chức_trong_nước(0);
        setTự_doanh(0);
        setNước_ngoài(0);

        response.data.data[1].map((data) => {
          setCá_nhân_trong_nước((pre) => data.Cá_nhân_trong_nước + pre);
          setTổ_chức_trong_nước((pre) => data.Tổ_chức_trong_nước + pre);
          setTự_doanh((pre) => data.Tự_doanh + pre);
          setNước_ngoài((pre) => data.Nước_ngoài + pre);
        });
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    if(selectCatagory!=""){

      setSelectTable1(-1)
      setSelectTable2(-1)
      getDataBycatagroy();
    }
    else{
      get_Data()
      get_Muabánròngtheomã_data()
    }
  }, [selectCatagory]);

  // after clicking row
  const get_Muabánròngtheomã_dataById = async () => {
    await axios
      .get(`${conf}/get_Muabánròngtheomã_dataById/${selectTable1}`)
      .then((response) => {
        setDatas2(response.data.data[0]);
        response.data.data[1].map((data) => {
          setCá_nhân_trong_nước(data.Cá_nhân_trong_nước);
          setTổ_chức_trong_nước(data.Tổ_chức_trong_nước);
          setTự_doanh(data.Tự_doanh);
          setNước_ngoài(data.Nước_ngoài);
        });
      })
      .catch((error) => console.log(error));
  };

  const get_dataById = async () => {
    await axios
      .get(`${conf}/get_dataById/${selectTable2Root}`)
      .then((response) => {
        setDatas1(response.data.data[0]);

        response.data.data[1].map((data) => {
          setCá_nhân_trong_nước(data.Cá_nhân_trong_nước);
          setTổ_chức_trong_nước(data.Tổ_chức_trong_nước);
          setTự_doanh(data.Tự_doanh);
          setNước_ngoài(data.Nước_ngoài);
        });
      })
      .catch((error) => console.log(error));
  };

  const table2 = (id, data_id) => {
    setSelectTable2(id);
    setSelectTable2Root(data_id);
  };

  useEffect(() => {
    if(selectTable1!=-1){
      get_Muabánròngtheomã_dataById()
    }
    else{
      setSelectCatagory("")
      get_Data()
      get_Muabánròngtheomã_data()
    }
  }, [selectTable1]);

  useEffect(() => {
    if (selectTable2 != -1) {
      get_dataById();
    } else {
      get_Data();
      get_Muabánròngtheomã_data();
    setSelectCatagory("")

    }
  }, [selectTable2]);

  const getTotalData = async () => {
    await axios
      .get(`${conf}/get_total_data`)
      .then((response) => {
        setChartData(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  const getStock = async () => {
    await axios
      .get(`${conf}/getStock`)
      .then((response) => {
        setallCatagory(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    get_Muabánròngtheomã_data();
    get_Data();
    getStock();
    getTotalData();

    setSelectTable1(-1);
    setSelectTable2(-1);
    setStartDate("");
    setEndDate("");
  }, []);

  return (
    <div className="p-5 d-flex main_background  position-relative overflow-y-auto">
      <section id="short-deal" className="col-lg-12">
        <div className="heading mb-3">
          <h3>Diễn biến giao dịch khớp lệnh theo loại nhà đầu tư</h3>
        </div>

        <div className="row">
          <div className="fetch-btn col-lg-6">
            <div className="d-grid gap-2 d-md-block">
              <a
                className="cursor-pointer"
                onClick={() => navigate("/gói_dịch_vụ")}
              >
                <button className="btn active btn-primary" type="button">
                  Gói dịch vụ
                </button>
              </a>
              <a
                className="cursor-pointer ms-2"
                onClick={() => navigate("/Khóa_đào_tạo_hội_viên")}
              >
                <button className="btn btn-primary" type="button">
                  Khóa đào tạo hội viên
                </button>
              </a>
            </div>
          </div>

          <div className="option-section col-lg-6">
            <div className="row">
              <div className="date-pick col-lg-6">
                <div className="date-option">
                  <div className="mt-3 date-border">
                    <label
                      for="post-form-2"
                      className="form-label form-labelpost"
                    >
                     Khung thời gian
                    </label>
                    <div className="row">
                      <div className="col-lg-6">
                        <Input
                          type="date"
                          className="datepicker form-control"
                          id="post-form-2"
                          value={start_date}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-lg-6">
                        <Input
                          type="date"
                          className="datepicker form-control"
                          id="post-form-2"
                          value={end_date}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="category col-lg-4">
                <div className="date-option">
                  <div className="mt-3 date-border">
                    <label
                      for="post-form-2"
                      className="form-label form-labelpost"
                    >
                     Chọn mã
                    </label>

                    <select
                      className="form-select form-select-sm form-control"
                      aria-label="Small select example"
                      onChange={(e) => setSelectCatagory(e.target.value)}
                    >
                      <option value="">
                        No one
                      </option>
                      {allCatagory.map((catagory, index) => (
                        <>
                          <option
                            key={index}
                            value={catagory.Mã}
                            className="bg-none"
                          >
                            <input
                              type="checkbox"
                              name="option1"
                              className="w-50"
                              value="value1"
                            />
                            {catagory.Mã}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="data-list row">
          <div className="col-lg-6">
            <h6 className="my-4 fw-bold text-white mb-0">
              Mua bán ròng theo ngành
            </h6>
            <div
              className="table_data overflow-y-auto"
              style={{ maxHeight: "500px" }}
            >
              <table className="table table-dark table-hover mb-0">
                <thead>
                  <tr className="table-active">
                    <th scope="col">Phân ngành - ICB 2</th>
                    <th scope="col">Cá nhân trong nước</th>
                    <th scope="col">Tổ chức trong nước</th>
                    <th scope="col">Tự doanh</th>
                    <th scope="col">Nước ngoài</th>
                  </tr>
                </thead>
                <tbody>
                  {datas1 ? (
                    <>
                      {datas1.map((data, index) => (
                        <tr
                          key={index}
                          onClick={(e) => setSelectTable1(data.id)}
                          className={`${
                            data.id != selectTable1 && selectTable1 != -1
                              ? "table-secondary"
                              : ""
                          } cursor-pointer`}
                        >
                          <td>{data.Phânngành_ICB2}</td>
                          <td
                            className={`${
                              data.Cá_nhân_trong_nước >= 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Cá_nhân_trong_nước}
                          </td>
                          <td
                            className={`${
                              data.Tổ_chức_trong_nước >= 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Tổ_chức_trong_nước}
                          </td>
                          <td
                            className={`${
                              data.Tự_doanh >= 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Tự_doanh}
                          </td>
                          <td
                            className={`${
                              data.Nước_ngoài >= 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Nước_ngoài}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <table className="table table-dark table-hover  mt-0">
              <thead>
                <tr className="table-active d-none">
                  <th scope="col">Phân ngành - ICB 2</th>
                  <th scope="col">Cá nhân trong nước</th>
                  <th scope="col">Tổ chức trong nước</th>
                  <th scope="col">Tự doanh</th>
                  <th scope="col">Nước ngoài</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  onClick={(e) => setSelectTable1(-1)}
                  className={`cursor-pointer`}
                >
                  <td className="w-25">Tổng cộng</td>
                  <td
                    className={`${
                      Cá_nhân_trong_nước >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Cá_nhân_trong_nước.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Tổ_chức_trong_nước >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Tổ_chức_trong_nước.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Tự_doanh >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Tự_doanh.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Nước_ngoài >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Nước_ngoài.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-lg-6">
            <h6 className="my-4 fw-bold text-white col-lg-12">
            Mua bán ròng theo mã
            </h6>

            <div
              className="table_data overflow-y-auto"
              style={{ maxHeight: "200px" }}
            >
              <table className="table table-dark mb-0">
                <thead>
                  <tr className="table-active">
                    <th scope="col">Mã</th>
                    <th scope="col">Cá nhân trong nước</th>
                    <th scope="col">Tổ chức trong nước</th>
                    <th scope="col">Tự doanh</th>
                    <th scope="col">Nước ngoài</th>
                  </tr>
                </thead>
                <tbody>
                  {datas2 ? (
                    <>
                      {datas2.map((data, index) => (
                        <tr
                          key={index}
                          onClick={(e) => {
                            table2(data.id, data.data_id);
                          }}
                          className={`${
                            data.id != selectTable2 && selectTable2 != -1
                              ? "table-secondary"
                              : ""
                          } cursor-pointer`}
                        >
                          <td>{data.Mã}</td>
                          <td
                            className={`${
                              data.Cá_nhân_trong_nước > 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Cá_nhân_trong_nước}
                          </td>
                          <td
                            className={`${
                              data.Tổ_chức_trong_nước > 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Tổ_chức_trong_nước}
                          </td>
                          <td
                            className={`${
                              data.Tự_doanh > 0 ? "text-success" : "text-danger"
                            }`}
                          >
                            {data.Tự_doanh}
                          </td>
                          <td
                            className={`${
                              data.Nước_ngoài > 0
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {data.Nước_ngoài}
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
            <table className="table table-dark ">
              <thead className="d-none">
                <tr className="table-active">
                  <th scope="col">Mã</th>
                  <th scope="col">Cá nhân trong nước</th>
                  <th scope="col">Tổ chức trong nước</th>
                  <th scope="col">Tự doanh</th>
                  <th scope="col">Nước ngoài</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  onClick={(e) => setSelectTable2(-1)}
                  className={`cursor-pointer`}
                >
                  <td className="text-start">Tổng cộng</td>
                  <td
                    className={`${
                      Cá_nhân_trong_nước >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Cá_nhân_trong_nước.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Tổ_chức_trong_nước >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Tổ_chức_trong_nước.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Tự_doanh >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Tự_doanh.toFixed(2)}
                  </td>
                  <td
                    className={`${
                      Nước_ngoài >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {Nước_ngoài.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="images w-100 ">
              <DataChart chart_Data={chart_data} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Data;
