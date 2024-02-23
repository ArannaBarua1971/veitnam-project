import React, { useState } from "react";
import { Card, Button, ContentHeader } from "../adminComponents";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../../conf/conf";
function Package({ id, img, details, months, membershipId, active,getMemberships }) {


  const ChangeActiveStatus = () => {
    const $request = {
      id: membershipId,
    };
    axios
      .post(`${conf}/active_membership_status`, $request)
      .then((response) => {
        getMemberships()
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteMemberShip = () => {
    const $request = {
      id: membershipId,
    };
    axios
      .post(`${conf}/delete_membership`, $request)
      .then((response) => {
        getMemberships()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Card className=" mx-1 my-2 card_box_shadow card_package">
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
                      {month.discount ? <s >{month.price} <span>đ</span></s> :<></>}<br/>
                      {month.discount ? Math.round(month.price *(month.discount/100)) : month.price} <span>đ</span>
                    </p>
                    <p className="semi-text">
                    {month.discount ?Math.round((month.price *(month.discount/100))/12): Math.round(month.price/12)} <span>đ/ tháng</span>
                    </p>  
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* buy section */}
          <Button
            className="border-0 w-50 mt-3  mx-auto d-block"
            textStyle="h6 my-2 p-0"
            onClick={ChangeActiveStatus}
          >
            {active ? "Deactive" : "Active"}
          </Button>
          <Button
            className="border-0 w-50 mt-3 mx-auto d-block"
            textStyle="h6 my-2 p-0"
            onClick={deleteMemberShip}
          >
            Delete
          </Button>
        </div>
      </Card>
    </>
  );
}

export default Package;
