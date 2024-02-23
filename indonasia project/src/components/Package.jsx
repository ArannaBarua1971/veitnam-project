import React, { useState } from "react";
import { Card, Button, ContentHeader } from "../components";
import { useNavigate } from "react-router-dom";

function Package({ id, img, details, months, monthSlug }) {
  const navigate = useNavigate();
  const [month, setMonth] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  const MemberShipCheckInfo = (month, price, discont) => {
    setMonth(month);
    setPrice(price);
    setDiscount(discont);
  };
  const Buy = () => {
    localStorage.setItem(
      "membership_checked_info",
      JSON.stringify({ month, price, discount })
    );
    navigate(`/check_out_details/${monthSlug}`);
  };

  return (
    <>
      <Card className="mx-1 my-2 card_box_shadow card_package">
        {/* card_img */}
        <div className="card_img">
          <img src={img} alt="" />
        </div>

        {/* card_content */}
        <div className="card_content mt-2">
          {/* card title */}
          <div className="card_title my-2">
            <ContentHeader className="h5">{id}</ContentHeader>
          </div>

          {/* card description */}
          <div className="card_description">
            <p>{details}</p>

            {/* pricing section */}

            <div className="prices my-3">
              {/* month selector */}

              <nav>
                <div
                  className="nav nav-tabs mb-3"
                  id="about_nav"
                  role="tablist"
                >
                  {months.map((month, index) => (
                    <button
                      className={`nav-link  ${
                        index == 0 ? "active active-btn" : ""
                      }`}
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target={`#tháng${month.month + month.id}`}
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                      onClick={() =>
                        MemberShipCheckInfo(
                          month.month,
                          month.price,
                          month.discount
                        )
                      }
                    >
                      <span>{month.month} tháng</span>
                    </button>
                  ))}
                </div>
              </nav>

              <div className="tab-content container-box" id="nav-tabContent">
                {months.map((month, index) => (
                  <div
                    className={`tab-pane fade show ${
                      index == 0 ? "active" : ""
                    }`}
                    id={`tháng${month.month + month.id}`}
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <p className="bold-rate">
                      {month.discount ? (
                        <s>
                          {month.price} <span>đ</span>
                        </s>
                      ) : (
                        <></>
                      )}
                      <br />
                      {month.discount
                        ? Math.round(month.price * (month.discount / 100))
                        : month.price}{" "}
                      <span>đ</span>
                    </p>
                    <p className="semi-text">
                      {month.discount
                        ? Math.round(
                            (month.price * (month.discount / 100)) / 12
                          )
                        : Math.round(month.price / 12)}{" "}
                      <span>đ/ tháng</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* buy section */}
          <Button
            className="border-0 w-100 mt-3"
            textStyle="h6 my-2 p-0"
            onClick={Buy}
          >
            Đăng ký ngay
          </Button>
        </div>
      </Card>
    </>
  );
}

export default Package;
