import React, { useEffect, useState } from "react";
import MainContainer from "../container/MainContainer";
import {
  Card,
  ContentHeader,
  Button,
  CardBadge,
  PricingTable,
  Package,
} from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";

function GóiDịchVụ() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);

  const getMembershipts = async () => {
    await axios
      .get(`${conf}/get-active-membership`)
      .then(function (response) {
        setMemberships(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      getMembershipts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="bg-white GóiDịchVụ">
      {/* hero section */}
      <section id="hero" className="py-5">
        <MainContainer className="mx-auto col-xl-9 col-sm-11 d-flex flex-wrap align-items-center ">
          <div className="content_part col-lg-5 col-md-6 col-sm-12">
            <h1 className="title h1">IDP - INVESTMENT DATA PLATFORM</h1>
            <p className="subtitle">
              Nền tảng khuyến nghị và truy xuất thông tin đầu tư được kiểm chứng
              bởi chuyên gia
            </p>

            <p className="other_content">
              <span>5000+</span>
              Nhà đầu tư lựa chọn vì hiệu quả đầu tư
            </p>
          </div>
          <div className="img_part col-lg-7 col-md-6 col-sm-12 d-block mx-auto">
            <img
              className="w-75 ms-auto d-block"
              src="imgs/heroBanner.png"
              alt="hero Banner"
            />
          </div>
        </MainContainer>
      </section>

      {/* service section */}
      <section id="services">
        <MainContainer className="mx-auto col-xl-9 col-sm-11">
          <ContentHeader className="h2">
            Tính năng vượt trội của sản phẩm
          </ContentHeader>

          {/* all services */}
          <div className="allServices my-5 d-flex flex-wrap justify-content-between">
            {Array(3)
              .fill(0)
              .map((index) => (
                <Card
                  key={index}
                  id="card"
                  className="border-0 col-md-4 col-sm-6 my-2"
                >
                  {/* card_img */}
                  <div className="card_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100"
                      height="100"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <circle cx="57" cy="43" r="43" fill="#FFE9DB"></circle>
                      <path
                        d="M48 79V91H30V79M18.6 79H59.4C62.7603 79 64.4405 79 65.7239 78.346C66.8529 77.7708 67.7708 76.8529 68.346 75.7239C69 74.4405 69 72.7603 69 69.4V46.6C69 43.2397 69 41.5595 68.346 40.2761C67.7708 39.1471 66.8529 38.2292 65.7239 37.654C64.4405 37 62.7603 37 59.4 37H18.6C15.2397 37 13.5595 37 12.2761 37.654C11.1471 38.2292 10.2292 39.1471 9.65396 40.2761C9 41.5595 9 43.2397 9 46.6V69.4C9 72.7603 9 74.4405 9.65396 75.7239C10.2292 76.8529 11.1471 77.7708 12.2761 78.346C13.5595 79 15.2397 79 18.6 79Z"
                        stroke="#FF914D"
                        stroke-width="5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </div>

                  {/* card_content */}
                  <div className="card_content mt-2">
                    {/* card title */}
                    <div className="card_title">
                      <ContentHeader className="h5">
                        Đơn giản và dễ sử dụng
                      </ContentHeader>
                    </div>

                    {/* card description */}
                    <div className="card_description">
                      <p>
                        Giao diện đơn giản, thân thiện và thông minh. Truy xuất
                        thông tin real-time
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </MainContainer>
      </section>

      {/* offer section */}
      <section id="offer" className="bg-dark py-5">
        <MainContainer className="mx-auto offer_section  col-xl-9 col-md-11 d-flex flex-wrap align-items-center">
          {/* offer card */}
          <div className="offer_card  col-lg-4 col-md-6 col-sm-8 mx-auto">
            <Card>
              {/* card badge */}
              {/* <CardBadge>
                <img src="./imgs/exclusive-badge.png" alt="exclusive-badge" />
              </CardBadge> */}

              {/* card title */}
              <div className="card_title">
                <ContentHeader>
                  Priority Lounge Phòng tư vấn ưu tiên
                </ContentHeader>
              </div>

              {/* card description */}
              <div className="card_description my-3">
                <p className="text-dark">
                  Hỏi đáp, chia sẻ, cập nhật thông tin trực tiếp với ông Huỳnh
                  Minh Tuấn – Chủ tịch HĐQT FIDT và FIDT Research.
                  <span className="d-block mt-5 mb-2">
                    Chuyên Gia – Nhà Đầu Tư hơn 20 năm kinh nghiệm, dẫn dắt
                    thành công nhiều thương vụ hàng trăm triệu USD.
                  </span>
                </p>

                <Button
                  className="border-0 w-100 mt-3"
                  textStyle="h5 my-2 p-0"
                  onClick={() => navigate("/check_out_details")}
                >
                  Gửi yêu cầu ngay
                </Button>
              </div>
            </Card>
          </div>

          {/* cover of offer */}
          <div className="cover  col-lg-7 col-md-6 col-sm-10">
            <img
              src="./imgs/cover.png"
              alt="cover"
              className="w-75 ms-auto d-block"
            />
          </div>
        </MainContainer>
      </section>

      {/* Go to IDP section */}
      <section id="IDP">
        <MainContainer className="mx-auto  col-lg-8 col-sm-11 my-3">
          <ContentHeader className="h2 mx-2">Gói dịch vụ IDP</ContentHeader>

          {/* all IDP */}
          <div className="IDP my-5 w-100 d-flex ">
            {memberships.map((membership) => (
              <Package
                id={membership.catagory}
                img={`./imgs/${membership.catagory}.svg`}
                details={membership.title}
                months={membership.membershipsmonth}
                monthSlug={membership.slug}
                
              />
            ))}
          </div>
        </MainContainer>
      </section>

      {/* pricing table secton */}
      <section className="pricingTable py-1">
        <MainContainer className="mx-auto col-xl-9 col-sm-11 my-3">
          <PricingTable
          className="PricingTableSection"
            pricingPackage={["Starter", "Standard", "Private", "Priority"]}
            pricingDetails={[
              [
                "RMS",
                [
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                ],
                [
                  [true, true, true, false],
                  [true, true, true, false],
                ],
              ],
              [
                "RMS",
                [
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                ],
                [
                  [true, true, true, false],
                  [true, true, true, false],
                ],
              ],
              [
                "RMS",
                [
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                  [
                    "Hệ thống FIDT RMS",
                    "Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng) dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng",
                  ],
                ],
                [
                  [true, true, true, false],
                  [true, true, true, false],
                ],
              ],
            ]}
          />

          <a href="#IDP">
            <Button
              className="border-0 py-2 px-5 ms-auto d-block"
              textStyle="p-0 m-0 px-5"
            >
              Đăng ký ngay
            </Button>
          </a>
        </MainContainer>
      </section>
    </div>
  );
}

export default GóiDịchVụ;
