import React, { useEffect, useState } from "react";
import { ContentHeader, Button, SummerNote, Input } from "../adminComponents";
import axios from "axios";
import conf from "../../conf/conf";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddArticle() {
  const notify = (message) => toast(message);

  const [unLockArticle, setUnlockArticle] = useState("");
  const [unlockCatagory, setUnlockCatagory] = useState("");
  const [unlockPercentage, setUnlockPercentage] = useState(0);
  const [lockArticle, setLockArticle] = useState("");
  const [lockCatagory, setlockCatagory] = useState("");
  const [lockPercentage, setlockPercentage] = useState(0);
  const [uploadMedia, setUploadMedia] = useState();
  const [uploadMediaUrl, setUploadMideaUrl] = useState();

  const [unlock, setUnlock] = useState(true);

  useEffect(() => {
    axios
      .get(`${conf}/getArticle/${unlockCatagory}`)
      .then(function (response) {
        setUnlockArticle(response.data.data.article);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get(`${conf}/getLockArticle/${lockCatagory}`)
      .then(function (response) {
        setLockArticle(response.data.data.article);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${conf}/getArticle/${unlockCatagory}`)
      .then(function (response) {
        setUnlockArticle(response.data.data.article);
        setUnlockPercentage(response.data.data.percentage);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [unlockCatagory]);

  useEffect(() => {
    axios
      .get(`${conf}/getLockArticle/${lockCatagory}`)
      .then(function (response) {
        setLockArticle(response.data.data.article);
        setlockPercentage(response.data.data.percentage);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [lockCatagory]);

  const SubmitUnlockArticle = async () => {
    const request = {
      article: unLockArticle == "" ? "no more article..." : unLockArticle,
      catagory: unlockCatagory,
      percentage: unlockPercentage ? unlockPercentage : 0,
    };
    console.log(request);
    let res = await axios
      .post(`${conf}/add-article`, request)
      .then(function (response) {
        notify("Unlock article Added!");
        setUnlockArticle(unLockArticle);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const SubmitLockArticle = async () => {
    const request = {
      article: lockArticle == "" ? "no more article..." : lockArticle,
      catagory: lockCatagory,
      percentage: lockPercentage ? lockArticle : 0,
    };

    let res = await axios
      .post(`${conf}/add-lock-article`, request)
      .then(function (response) {
        notify("Lock article Added!");
        setLockArticle(lockArticle);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const UploadMedia=()=>{
    const formData = new FormData();
    formData.append("media", uploadMedia);
    axios
      .post(`${conf}/upload_image`, formData)
      .then((response) => {
        
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return (
    <>
      {/* notify toast */}
      <ToastContainer />
      {/* toggle btn   */}
      <div className="togglebtn my-3 d-flex">
        <input type="checkbox" onClick={() => setUnlock((pre) => !pre)} />
        <p className="ms-2">{unlock ? "Unlock" : "Lock"}</p>
      </div>

      {unlock ? (
        <>
          {/* unlockArticle */}
          <div>
            {/* title of daseboard */}
            <ContentHeader className="text-black8mez ">
              Add Unlock Article
            </ContentHeader>

            {/* form for to add article */}
            <div className="mt-4">
              <SummerNote value={unLockArticle} setContent={setUnlockArticle} />
              {/* <div className="">
                <ContentHeader className="mt-3">get url of image and video</ContentHeader>
                <Input onChange={(e)=> setUploadMedia(e.target.files[0])} classForDiv="d-block" type="file" className="bg-white col-lg-6" />
                <Input value={uploadMediaUrl} classForDiv="col-lg-6"></Input>
                <Button className="p-3" onClick={UploadMedia} >Upload Image</Button>
              </div> */}
              <div className="d-flex flex-wrap justify-content-between mt-3">
                <div className="catagory_selector col-lg-6">
                  <ContentHeader className="text-dark h5 py-3">
                    Catagory* :
                  </ContentHeader>
                  <select
                    className="form-select"
                    name="catagory"
                    id="catagory"
                    onChange={(e) => setUnlockCatagory(e.target.value)}
                    value={unlockCatagory}
                  >
                    <option selected>Choose One</option>
                    <option value="Tổng quan">Tổng quan</option>
                    <option value="Nhận định thị trường">
                      Nhận định thị trường
                    </option>
                  </select>
                </div>
                <div className="percentage col-lg-5">
                  <ContentHeader className="text-dark h5 py-3">
                    Visiable percentage* :
                  </ContentHeader>
                  <Input
                    onChange={(e) => setUnlockPercentage(e.target.value)}
                    value={unlockPercentage}
                    className="m-0"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>
              </div>
              <Button
                onClick={SubmitUnlockArticle}
                className="py-3 bg-dark mt-2"
              >
                ADD Unlock Article
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* lock article */}
          <div>
            {/* title of daseboard */}
            <ContentHeader className="text-dark">
              Add Lock Article
            </ContentHeader>

            {/* form for to add article */}
            <div className="mt-4">
              <SummerNote value={lockArticle} setContent={setLockArticle} />
              <div className="d-flex flex-wrap justify-content-between mt-3">
                <div className="catagory_selector col-lg-6">
                  <ContentHeader className="text-dark h5 py-3">
                    Catagory* :
                  </ContentHeader>
                  <select
                    className="form-select"
                    name="catagory"
                    id="catagory"
                    onChange={(e) => setlockCatagory(e.target.value)}
                    value={lockCatagory}
                  >
                    <option selected>Choose One</option>
                    <option value="Tổng quan">Tổng quan</option>
                    <option value="Nhận định thị trường">
                      Nhận định thị trường
                    </option>
                  </select>
                </div>
                <div className="percentage col-lg-5">
                  <ContentHeader className="text-dark h5 py-3">
                    Visiable percentage* :
                  </ContentHeader>
                  <Input
                    onChange={(e) => setlockPercentage(e.target.value)}
                    value={lockPercentage}
                    className="m-0"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                  />
                </div>
              </div>
              <Button
                onClick={SubmitLockArticle}
                className="py-3 py-3 bg-dark mt-2"
              >
                ADD Lock Article
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AddArticle;
