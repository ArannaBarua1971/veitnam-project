import React, { useEffect, useState } from "react";
import { Button, ContentHeader, SummerNote, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

function AddShortDeal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const [MãCP, setMãCP] = useState("");
  const [NgàyKN, setNgàyKN] = useState("");
  const [Giámuakhuyếnnghị, setGiámuakhuyếnnghị] = useState("");
  const [NgưỡnggiáQtrr, setNgưỡnggiáQtrr] = useState("");
  const [Giáhiệntại, setGiáhiệntại] = useState("");
  const [LãiLỗ, setLãiLỗ] = useState("");
  const [Kịchbảnhiệntại, setKịchbảnhiệntại] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [popupText, setPopupText] = useState("");
  const [edit,setEdit]=useState(false)

  useEffect(() => {
    if (id) {
      setEdit(true)
      axios
        .get(`${conf}/get_specific_short_deal/${id}`)
        .then((response) => {
          setMãCP(response.data.data.MãCP);
          setNgàyKN(response.data.data.NgàyKN);
          setGiámuakhuyếnnghị(response.data.data.Giámuakhuyếnnghị);
          setNgưỡnggiáQtrr(response.data.data.NgưỡnggiáQtrr);
          setGiáhiệntại(response.data.data.Giáhiệntại);
          setLãiLỗ(response.data.data.LãiLỗ);
          setKịchbảnhiệntại(response.data.data.Kịchbảnhiệntại);
          setPopupTitle(response.data.data.popupTitle);
          setPopupText(response.data.data.popupText);
        })
        .catch((error) => console.log(error));
    }
  }, []);
  const submit = () => {
    let request = {
      MãCP,
      NgàyKN,
      Giámuakhuyếnnghị,
      NgưỡnggiáQtrr,
      Giáhiệntại,
      LãiLỗ,
      Kịchbảnhiệntại,
      popupTitle,
      popupText,
    };

    axios
      .post(`${conf}/add_short_deal`, request)
      .then((response) => {
        notify(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = () => {
    let request = {
      MãCP,
      NgàyKN,
      Giámuakhuyếnnghị,
      NgưỡnggiáQtrr,
      Giáhiệntại,
      LãiLỗ,
      Kịchbảnhiệntại,
      popupTitle,
      popupText,
    };

    axios
      .post(`${conf}/edit_specific_short_deal/${id}`, request)
      .then((response) => {
        notify(response.data.message);
        setTimeout(()=>navigate("/admin/all-short-deal"),2000)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div  >
      {/* notify toast */}
      <ToastContainer />
      <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
        <ContentHeader className="text-dark">Add Short Deal</ContentHeader>
        <Button
          className="py-2 my-3 bg-dark"
          onClick={() => navigate("/admin/all-short-deal")}
        >
          All Short Deal
        </Button>
      </div>

      {/* long deal form */}
      <div className="d-flex flex-wrap add">
        <Input
          classForDiv="col-md-6 px-1"
          type="text"
          onChange={(e) => setMãCP(e.target.value)}
          value={MãCP}
          label="Mã CP"
        />
        <Input
          classForDiv="col-md-6 px-1"
          type="date"
          onChange={(e) => setNgàyKN(e.target.value)}
          value={NgàyKN}
          label="Ngày KN"
        />
        <Input
          classForDiv="col-md-6 px-1"
          type="number"
          onChange={(e) => setGiámuakhuyếnnghị(e.target.value)}
          value={Giámuakhuyếnnghị}
          label="Giá mua khuyến nghị"
        />
        <Input
          classForDiv="col-md-6 px-1"
          type="number"
          onChange={(e) => setNgưỡnggiáQtrr(e.target.value)}
          value={NgưỡnggiáQtrr}
          label="Ngưỡng giá Qtrr"
        />
        <Input
          classForDiv="col-md-6 px-1"
          type="number"
          onChange={(e) => setGiáhiệntại(e.target.value)}
          value={Giáhiệntại}
          label="Giá hiện tại"
        />
        <Input
          classForDiv="col-md-6 px-1"
          type="number"
          onChange={(e) => setLãiLỗ(e.target.value)}
          value={LãiLỗ}
          label="% Lãi/Lỗ"
        />
        <Input
          type="text"
          classForDiv="col-md-6 px-1"
          onChange={(e) => setKịchbảnhiệntại(e.target.value)}
          value={Kịchbảnhiệntại}
          label="Kịch bản hiện tại"
        />
        <div className="popupEditor w-100">
          <hr className="my-2" />
          <ContentHeader>Xem chi tiết</ContentHeader>
          <Input
            type="text"
            classForDiv="w-100 mt-3"
            onChange={(e) => setPopupTitle(e.target.value)}
            value={popupTitle}
            label="Popup title"
          />
          <SummerNote
            className="mt-3 w-100"
            value={popupText}
            setContent={setPopupText}
          />
        </div>
        <Button onClick={edit ? editContent:submit} className="py-3 px-2">
          {edit ? "Edit short Deal": "Add Short Deal"}
        </Button>
      </div>
    </div>
  );
}

export default AddShortDeal;
