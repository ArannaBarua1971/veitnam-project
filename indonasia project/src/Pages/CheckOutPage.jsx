import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";

function CheckOutPage() {
  const [data,setData]=useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    try{
      const data = JSON.parse(localStorage.getItem('checoutDetails'));
      setData(data);
    }
    catch{
      navigate('/check_out_page')
    }
  },[])
  return (
    <div className="checkoutPage bg-white">
      {/* HEADER SECTION */}
      <Header/>

      <div className="container">
      </div>
      {/* <!-- QR work --> */}
      <div className="container">
        {/* <!-- first bank --> */}
        <div className="row">
          <div className="col-lg-8">
            <div className="row card">
              <table>
                <tr>
                  <td className="title">Số tài khoản</td>
                  <td className="value">9973319302</td>
                </tr>
                <tr>
                  <td className="title">Ngân hàng</td>
                  <td className="value">
                  Ngân hàng TMCP Ngoại thương Việt Nam Vietcombank
                  </td>
                </tr>
                <tr>
                  <td className="title">Tài khoản thụ hưởng</td>
                  <td className="value">
                  Nguyễn Hoàng Hương

                  </td>
                </tr>
                <tr>
                  <td className="title">Số tiền thanh toán</td>
                  <td className="value amount">{data.price} VND</td>
                </tr>
                <tr>
                  <td className="title">Nội dung thanh toán</td>
                  <td className="value">
                    {data.phone_number} {data.title} Goi {data.catagory} {data.duration} thang
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="div qr-code">
              <img className="mx-auto d-block" src="./imgs/qr1.JPG" alt="" style={{ 'width':"210px"}} />
            </div>
          </div>
        </div>
        {/* <!-- second bank --> */}
        <div className="row">
          <div className="col-lg-8">
            <div className="row card">
              <table>
                <tr>
                  <td className="title">Số tài khoản</td>
                  <td className="value">8840977731</td>
                </tr>
                <tr>
                  <td className="title">Ngân hàng</td>
                  <td className="value">
                  Ngân hàng TMCP Đầu tư và Phát triển Việt Nam

                  </td>
                </tr>
                <tr>
                  <td className="title">Tài khoản thụ hưởng</td>
                  <td className="value">
                  Nguyễn Hoàng Hương

                  </td>
                </tr>
                <tr>
                  <td className="title">Số tiền thanh toán</td>
                  <td className="value amount">{data.price} VND</td>
                </tr>
                <tr>
                  <td className="title">Nội dung thanh toán</td>
                  <td className="value">
                  {data.phone_number} {data.title} Goi {data.catagory} {data.duration} thang
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="div qr-code">
              <img className="mx-auto d-block" src="./imgs/qr2.JPG" alt="" />
            </div>
          </div>
        </div>
        {/* <!-- third bank --> */}
        <div className="row">
          <div className="col-lg-8">
            <div className="row card">
              <table>
                <tr>
                  <td className="title">Số tài khoản</td>
                  <td className="value">0973319302</td>
                </tr>
                <tr>
                  <td className="title">Ngân hàng</td>
                  <td className="value">
                  Ngân hàng TMCP Công Thương Việt Nam

                  </td>
                </tr>
                <tr>
                  <td className="title">Tài khoản thụ hưởng</td>
                  <td className="value">
                  Nguyễn Hoàng Hương

                  </td>
                </tr>
                <tr>
                  <td className="title">Số tiền thanh toán</td>
                  <td className="value amount">{data.price} VND</td>
                </tr>
                <tr>
                  <td className="title">Nội dung thanh toán</td>
                  <td className="value">
                  {data.phone_number} {data.title} Goi {data.catagory} {data.duration} thang
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="div qr-code">
              <img
                src="./imgs/Screenshot_1.jpg"
                alt=""
                className="mx-auto d-block"
                style={{ 'width':"250px"}}
              />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- sub-footer --> */}

      <div className="sub-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mt-5">
              <h3>Lưu ý</h3>
              <ul>
                <li>
                  Thời gian xử lý đơn hàng từ 8h00 - 18h00 T2 - T6 và 8h00 đến
                  12h00 T7.
                </li>
                <li>
                  KDDT sẽ liên hệ xác nhận thanh toán trong vòng 24 giờ. Nếu đơn
                  hàng được tạo ngoài giờ làm việc, KDDT sẽ xử lý vào ngày làm
                  việc kế tiếp.
                </li>
                <li>
                  Để đơn hàng được ưu tiên xử lý, Quý khách có thể chủ động
                  thông báo thanh toán qua <a href="https://zalo.me/0867005742">KDDT Zalo</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <h2>Thông tin thanh toán</h2>
              <div className="card">
                <table>
                  <tr>
                    <td className="value">Khách hàng</td>
                    <td className="title">{data.name}</td>
                  </tr>
                  <tr>
                    <td className="value">Loại dịch vụ</td>
                    <td className="title">Dịch vụ Tư vấn đầu tư</td>
                  </tr>
                  <tr>
                    <td className="value">Gói dịch vụ</td>
                    <td className="title">Gói {data.catagory} {data.duration} tháng</td>
                  </tr>
                  <tr>
                    <td className="value">Số tiền thanh toán</td>
                    <td className="amount title">{data.price} VND</td>
                  </tr>
                  <tr>
                    <td className="value">Hình thức</td>
                    <td className="title">Chuyển khoản ngân hàng</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container">
          <div className="row footer-list">
            <div className="col-lg-2">
              <ul>
                <li className="list-tilte">Về chúng tôi</li>
                <li>Giới thiệu KDDT</li>
                <li>Ban pháp lý</li>
                <li>Trụ sở</li>
              </ul>
            </div>
            <div className="col-lg-2">
              <ul>
                <li className="list-tilte">Dịch vụ</li>
                <li>IDP - Investment Data Platform</li>
                <li>Tư vấn tài chính cá nhân trọn gói</li>
                <li>Tư vấn tài chính cá nhân theo nhu cầu</li>
              </ul>
            </div>
            <div className="col-lg-2">
              <ul>
                <li className="list-tilte">Khóa học</li>
                <li>Tài chính cá nhân cơ bản</li>
                <li>Tài chính cá nhân toàn diện</li>
              </ul>
            </div>
            <div className="col-lg-2">
              <ul>
                <li className="list-tilte">Câu hỏi thường gặp</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="col-lg-2">
              <ul>
                <li className="list-tilte">Cộng đồng</li>
                <li>Cộng đồng tài chính</li>
                <li>Cộng đồng đầu tư chứng khoán</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default CheckOutPage;
