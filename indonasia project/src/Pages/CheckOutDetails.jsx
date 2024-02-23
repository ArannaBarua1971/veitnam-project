import React, { useEffect, useState } from "react";
import { Header, Input, Card, ErrorMessage } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";

function CheckOutDetails() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [months, setMonth] = useState([]);
  const { slug, course } = useParams();
  const [price, setPrice] = useState();
  const [monthSelected, setMonthSelected] = useState();
  const [priceSelected, setPriceSelected] = useState();
  const [membership_id, setmembership_id] = useState();

  // user data
  const [name, setName] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [email, setEmail] = useState("");
  const [promotional_code, setPromotional_code] = useState("");
  const [duration, setDuration] = useState("");
  const [validationError, setValidationError] = useState({});

  const priceSetup = (price, month, discount) => {
    setPriceSelected(null);
    setMonthSelected(null);
    setDuration(month);
    let Price = discount ? price * (discount / 100) : price;
    setPrice(Price);
  };

  useEffect(() => {
    if (course) {
      axios
        .get(`${conf}/getSpecificCourseDetails/${slug}`)
        .then((response) => {
          setData(response.data.data);
          setPrice(response.data.data.price);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(`${conf}/get_specific_membership/${slug}`)
        .then((response) => {
          setmembership_id(response.data.data.id);
          setPrice(
            response.data.data.membershipsmonth[0].discount
              ? response.data.data.membershipsmonth[0].price *
                  (response.data.data.membershipsmonth[0].discount / 100)
              : response.data.data.membershipsmonth[0].price
          );
          setDuration(response.data.data.membershipsmonth[0].month);
          setData(response.data.data);
          setMonth(response.data.data.membershipsmonth);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (course) {
    } else {
      try {
        let data = JSON.parse(localStorage.getItem("membership_checked_info"));
        setMonthSelected(data.month);
        setPriceSelected(
          data.discount ? data.price * (data.discount / 100) : data.price
        );
      } catch (error) {
        console.log();
      }
    }
  }, []);
  useEffect(() => {
    try {
      let data = JSON.parse(localStorage.getItem("userInfo"));
      setName(data.name);
      setEmail(data.email);
      setPhone_number(data.phone || null);
    } catch (error) {
      console.log();
    }
  }, []);

  const submit = async () => {
    if (course) {
      const { id } = JSON.parse(localStorage.getItem("userInfo"));
      const request = {
        user_id:id,
        course_id:data.id,
        name,
        email,
        phone_number,
        promotional_code,
        price: Math.round(price),
      };
      await axios
        .post(`${conf}/addCheckoutForCourse`, request)
        .then((response) => {
          localStorage.setItem(
            "checoutDetails",
            JSON.stringify({
              course:true,
              title:data.course_title,
              phone_number: phone_number,
              price:  Math.round(price),
              name: name,
            })
          );
          navigate("/check_out_page");
        })
        .catch((error) => {
          console.log(error);
          error = error.response.data.errors;
          setValidationError({ ...error });
        });
    } else {
      const { id } = JSON.parse(localStorage.getItem("userInfo"));
      console.log(id);
      console.log(membership_id);
      const request = {
        name,
        phone_number,
        email,
        user_id: id,
        membership_id,
        promotional_code,
        price: Math.round(price),
        duration,
      };
      await axios
        .post(`${conf}/add-checkoutDetails`, request)
        .then((response) => {
          localStorage.setItem(
            "checoutDetails",
            JSON.stringify({
              phone_number: phone_number,
              price: Math.round(priceSelected ? priceSelected : price),
              duration: monthSelected ? monthSelected : duration,
              title: data.title,
              catagory: data.catagory,
              name: name,
            })
          );
          navigate("/check_out_page");
        })
        .catch((error) => {
          console.log(error);
          error = error.response.data.errors;
          setValidationError({ ...error });
        });
    }
  };

  return (
    <div className="bg-white CheckOutDetails">
      {/* header section */}
      <Header />

      <div className="container mt-3">
        {/* <!-- //main form starts here --> */}
        <div className="checkout">
          <Card className="card col-lg-6 col-sm-12">
            <div className="card-body">
              <div>
                <fieldset disabled>
                  <div className="mb-3">
                    <Input
                      name="disabledTextInput"
                      label={`${course ? "tên khóa học" : "Dịch vụ"}`}
                      type="text"
                      id="disabledTextInput"
                      className="form-control disabled-field"
                      placeholder={course ? data.course_title : data.title}
                    />
                  </div>
                  {!course ? (
                    <div className="mb-3">
                      <Input
                        name="disabledTextInput"
                        label="Gói sản phẩm"
                        type="text"
                        id="disabledTextInput"
                        className="form-control disabled-field"
                        placeholder={`Gói ${data.catagory}`}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </fieldset>
              </div>
              {!course ? (
                <div className="selection-btn">
                  <div
                    className="nav nav-tabs mb-3"
                    id="about_nav"
                    role="tablist"
                  >
                    {months.map((month, index) => (
                      <a
                        href="#"
                        className={`select nav-link  ${
                          monthSelected
                            ? monthSelected == month.month
                              ? "active active-btn"
                              : ""
                            : index == 0
                            ? "active active-btn"
                            : ""
                        }`}
                        data-bs-toggle="tab"
                        data-bs-target={`#tháng${month.month + month.id}`}
                        onClick={() =>
                          priceSetup(month.price, month.month, month.discount)
                        }
                      >
                        {month.month} tháng
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <></>
              )}

              <div className="my-3 ">
                <Input
                  label="Họ và tên*"
                  name="name"
                  type="text"
                  id="disabledTextInput"
                  className="form-control disabled-field"
                  placeholder="Vui lòng nhập họ và tên"
                  value={name}
                />
              </div>
              <div className="mb-3">
                <Input
                  label="Số điện thoại*"
                  name="phone_number"
                  type="tel"
                  id="disabledTextInput"
                  className="form-control disabled-field"
                  placeholder="Vui lòng nhập số điện thoại (bắt buộc)"
                  onChange={(e) => setPhone_number(e.target.value)}
                  value={phone_number || ""}
                />
              </div>
              {validationError.phone_number ? (
                <ErrorMessage>{validationError.phone_number}</ErrorMessage>
              ) : (
                <></>
              )}

              <div className="mb-3">
                <Input
                  label="Email *"
                  name="email"
                  type="email"
                  id="disabledTextInput"
                  className="form-control disabled-field"
                  placeholder="Vui lòng nhập email (bắt buộc)"
                  value={email}
                />
              </div>
              {validationError.email ? (
                <ErrorMessage>{validationError.email}</ErrorMessage>
              ) : (
                <></>
              )}

              <div className="mb-3">
                <Input
                  label="Mã khuyến mãi (Nếu có)"
                  name="promotional_code"
                  type="text"
                  id="disabledTextInput"
                  className="form-control disabled-field"
                  placeholder="Hãy nhập mã khuyến mãi"
                  onChange={(e) => setPromotional_code(e.target.value)}
                />
              </div>
              <div class="form-check">
                <Input
                  name="XuấthóađơnVAT"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexCheckChecked">
                  Xuất hóa đơn VAT
                </label>
              </div>
            </div>
          </Card>

          {/* <!-- end first card --> */}
          <Card className="card col-lg-5 col-sm-12">
            <div className="card-body">
              <div className="row second-card-row">
                <div className="col-lg-6 title ">Tạm tính</div>
                <div className="col-lg-6 right title">
                  {Math.round(priceSelected ? priceSelected : price)} VND
                </div>
              </div>
              <div className="row second-card-row">
                <div className="col-lg-6 title ">Khuyến mãi</div>
                <div className="col-lg-6 right title">0</div>
              </div>
              <div className="row second-card-row">
                <div className="col-lg-6 title active-mode">Tổng cộng</div>
                <div className="col-lg-6 right title active-mode">
                  {Math.round(priceSelected ? priceSelected : price)} VND
                </div>
              </div>
              <div>
                <hr />
              </div>
              <div>
                <b>Phương thức thanh toán</b>
              </div>
              {/* <!-- selection  --> */}
              <select className="form-select mt-1" aria-label=" select example">
                <option selected>Chuyển khoản ngân hàng</option>
                {/* <!-- <option value="1">Chuyển khoản ngân hàng</option> --> */}
              </select>

              {/* <!-- submit --> */}
              <button
                type="button"
                className="btn w-100 mt-3 btn-sub p-2 btn-warning"
                onClick={submit}
              >
                Xác nhận đơn hàng
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CheckOutDetails;
