
import React, { useState } from "react";
import { ContentHeader, Button, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function AddMemberShip() {
  const navigate = useNavigate();
  const notify = () => toast("Membership Added!");

  const [catagory, setCatagory] = useState("");
  const [membership_title, setMembership_title] = useState("");

  const [month_due3, setmonth_due3] = useState(false);
  const [discount3, setdiscount3] = useState("");

  const [month_due6, setmonth_due6] = useState(false);
  const [discount6, setdiscount6] = useState("");

  const [month_due12, setmonth_due12] = useState(false);
  const [discount12, setdiscount12] = useState("");

  const [price, setprice] = useState(0);

  const submit = async () => {
    const request = {
      catagory,
      membership_title,
      months: {
        month3: month_due3
          ? { month: "3", price: price, discount: discount3 }
          : null,
        month6: month_due6
          ? { month: "6", price: price * 6, discount: discount6 }
          : null,
        month12: month_due12
          ? { month: "12", price: price * 12, discount: discount12 }
          : null,
      },
    };
    await axios
      .post(`${conf}/add-membership`, request)
      .then((response) => {
        notify();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {/* title of daseboard */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">Add Memberships</ContentHeader>
        <Button className="py-2 mx-3 bg-dark" onClick={() => navigate("/admin/all-membership")}>All Membership</Button>
      </div>
      {/* notify toast */}
      <ToastContainer />

      {/* form for to add article */}
      <section className="mt-4">
        {/* catagory select section */}
        <div className="catagory_selector">
          <ContentHeader className="text-dark h5 py-3">
            Catagory* :
          </ContentHeader>
          <select
            className="form-select"
            name="catagory"
            id="catagory"
            onChange={(e) => setCatagory(e.target.value)}
          >
            <option selected disabled>Choose one</option>
            <option value="Starter">Starter</option>
            <option value="Standard">Standard</option>
            <option value="Private">Private</option>
            <option value="Priority">Priority</option>
          </select>
        </div>

        {/* membership title section */}
        <div className="membership_info my-4">
          <Input
            type="text"
            name="membership_title"
            onChange={(e) => setMembership_title(e.target.value)}
            label="Membership Title *:"
            placeholder="Enter membership title .."
            labelStyle="text-dark"
          />

          {/* month of membership */}
          <div className="months mt-3">
            <div className="first_month_duration w-100  bg-white rounded p-3">
              <Input
                type="checkbox"
                name="month_due3"
                onChange={(e) => setmonth_due3(e.target.checked)}
                label="3 month"
                classForDiv="d-flex align-item-center"
              />
              <Input
                name="price3"
                onChange={(e) => setprice(e.target.value)}
                type="text"
                label="Price :"
                classForDiv="d-flex"
              />
              <Input
                name="discount3"
                onChange={(e) => setdiscount3(e.target.value)}
                type="number"
                min="0"
                max="100"
                label="Discount (optional %) :"
                classForDiv="d-flex"
              />
            </div>
            <div className="first_month_duration w-100 bg-white rounded p-3 my-2">
              <Input
                name="month_due6"
                onChange={(e) => setmonth_due6(e.target.checked)}
                type="checkbox"
                label="6 month"
                classForDiv="d-flex align-item-center"
              />
              <Input
                name="price6"
                value={price * 6}
                type="number"
                label="Price :"
                classForDiv="d-flex"
                readonly
              />
              <Input
                name="discount6"
                onChange={(e) => setdiscount6(e.target.value)}
                type="number"
                min="0"
                max="100"
                label="Discount (optional %) :"
                classForDiv="d-flex"
              />
            </div>
            <div className="first_month_duration w-100 bg-white rounded p-3">
              <Input
                name="month_due12"
                onChange={(e) => setmonth_due12(e.target.checked)}
                type="checkbox"
                label="12 month"
                classForDiv="d-flex align-item-center"
              />
              <Input
                name="price12"
                value={price * 12}
                type="number"
                label="Price :"
                classForDiv="d-flex"
                readonly
              />
              <Input
                name="discount12"
                onChange={(e) => setdiscount12(e.target.value)}
                type="number"
                label="Discount (optional %) :"
                min="0"
                max="100"
                classForDiv="d-flex"
              />
            </div>
          </div>
        </div>

        <Button className="px-4 py-3 mt-3  border-0 rounded bg-dark" onClick={submit}>
          ADD membership
        </Button>
      </section>
    </div>
  );
}

export default AddMemberShip;
