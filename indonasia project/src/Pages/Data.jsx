import React, { useEffect, useState } from "react";
import { DataChart, Input } from "../components";
import axios from "axios";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";

function Data() {
  const navigate = useNavigate();
  const [datas1, setDatas1] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const [datas3, setDatas3] = useState([]);

  useEffect(() => {
    axios
      .get(`${conf}/get_Data`)
      .then((response) => {
        setDatas1(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    axios
      .get(`${conf}/get_Muabánròngtheomã_data`)
      .then((response) => {
        setDatas2(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(`${conf}/get_Diễnbiếnmua_bán_data`)
      .then((response) => {
        console.log(response.data.data)
        setDatas3(response.data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <section id="short-deal">
        <div className="heading">
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
                      Post Date
                    </label>
                    <div className="row">
                      <div className="col-lg-6">
                        <Input
                          type="date"
                          className="datepicker form-control"
                          id="post-form-2"
                        />
                      </div>
                      <div className="col-lg-6">
                        <Input
                          type="date"
                          className="datepicker form-control"
                          id="post-form-2"
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
                      Category Select
                    </label>

                    <select
                      className="form-select form-select-sm"
                      aria-label="Small select example"
                    >
                      <option selected>All</option>
                      <option value="1">AAA</option>
                      <option value="2">AAM</option>
                      <option value="3">AAT</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>

        <div className="data-list row">
          <div className="col-lg-6">
            <table className="table table-dark">
              <thead>
                <h6 className="my-2">Mua bán ròng theo ngành</h6>
                <tr className="table-active">
                  <th scope="col">Phân ngành - ICB 2</th>
                  <th scope="col">Cá nhân trong nước</th>
                  <th scope="col">Tổ chức trong nước</th>
                  <th scope="col">Tự doanh</th>
                  <th scope="col">Nước ngoài</th>
                </tr>
              </thead>
              <tbody>
                {datas1.length ? (
                  <>
                    {datas1.map((data, index) => (
                      <tr key={index}>
                        <td>{data.Phânngành_ICB2}</td>
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
                            data.Nước_ngoài > 0 ? "text-success" : "text-danger"
                          }`}
                        >
                          {data.Nước_ngoài}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      <td>Ngân hàng</td>
                      <td className="text-success">{9.8}</td>
                      <td className="text-danger">-90.8</td>
                      <td className="text-success">34.5</td>
                      <td className="text-danger">-89.9</td>
                    </tr>
                    <tr>
                      <td>Xây dựng và Vật liệu</td>
                      <td className="text-danger">-909.8</td>
                      <td className="text-success">{89.8}</td>
                      <td className="text-success">34.5</td>
                      <td className="text-danger">-89.9</td>
                    </tr>
                    <tr>
                      <td>Bán lẻ</td>
                      <td className="text-success">909.8</td>
                      <td className="text-success">{89.8}</td>
                      <td className="text-danger">-789.9</td>
                      <td className="text-success">34.5</td>
                    </tr>
                    <tr>
                      <td>Thực phẩm và đồ uống</td>
                      <td className="text-danger">-99.8</td>
                      <td className="text-success">{89.8}</td>
                      <td className="text-danger">-789.9</td>
                      <td className="text-success">34.5</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className="col-lg-6">
            <table className="table table-dark">
              <thead>
                <h6 className="my-2">Mua bán ròng theo ngành</h6>
                <tr className="table-active">
                  <th scope="col">Mã</th>
                  <th scope="col">Cá nhân trong nước</th>
                  <th scope="col">Tổ chức trong nước</th>
                  <th scope="col">Tự doanh</th>
                  <th scope="col">Nước ngoài</th>
                </tr>
              </thead>
              <tbody>
                {datas2.length ? (
                  <>
                    {datas2.map((data, index) => (
                      <tr key={index}>
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
                            data.Nước_ngoài > 0 ? "text-success" : "text-danger"
                          }`}
                        >
                          {data.Nước_ngoài}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    <tr>
                      {" "}
                      <td>MWG</td>
                      <td className="text-danger">{-99.8}</td>
                      <td className="text-danger">-90.8</td>
                      <td className="text-success">34.5</td>
                      <td className="text-danger">-89.9</td>
                    </tr>
                    <tr>
                      <td>DGW</td>
                      <td className="text-danger">-909.8</td>
                      <td className="text-danger">{-89.8}</td>
                      <td className="text-success">34.5</td>
                      <td className="text-danger">-89.9</td>
                    </tr>
                    <tr>
                      <td>AST</td>
                      <td className="text-success">909.8</td>
                      <td className="text-success">{89.8}</td>
                      <td className="text-danger">-789.9</td>
                      <td className="text-success">34.5</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
            {/* <div className="images "> */}
              {/* <img width="50%" src="./imgs/dataChart.png" alt="" />
              <img width="50%" src="./imgs/dataChart.png" alt="" /> */}
              <DataChart chart_Data={datas3}/>
            {/* </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Data;
