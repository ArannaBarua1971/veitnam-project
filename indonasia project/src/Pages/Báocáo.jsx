import React, { useEffect, useState } from "react";
import { ContentHeader, Popup } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
function Báocáo() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState();
  const [longDeals, setLongDeals] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`${conf}/get_allActive_shortDeal`)
        .then((response) => {
          setLongDeals(response.data.data);
        })
        .catch((error) => console.log(error));
    } catch {
      navigate("/");
    }
  }, []);
  return (
    <div  className="p-5 main_background overflow position-relative tablepage1">
      {/* longDeal */}
      <section className="longDealHeader">
        <ContentHeader className="DealHeader">
          Deal cổ phiếu đánh ngắn
          <div className="subtitle">
            <p>
              Giới thiệu phương pháp và luận điểm khi chọn cổ phiếu trung hạn
              của KDĐT
            </p>
          </div>
        </ContentHeader>
        <div className="tableOfShortDeal">
          <table className="table longDeal">
            <thead>
              <tr>
                <th scope="col" className="p-3">
                  Mã CP
                </th>
                <th scope="col" className="p-3">
                  Ngày KN
                </th>
                <th scope="col" className="p-3">
                  Giá mua khuyến nghị
                </th>
                <th scope="col" className="p-3">
                  Ngưỡng giá Qtrr
                </th>
                <th scope="col" className="p-3">
                  Giá hiện tại
                </th>
                <th scope="col" className="p-3">
                  % Lãi/Lỗ
                </th>
                <th scope="col" className="p-3">
                  Kịch bản hiện tại
                </th>
                <th scope="col" className="p-3">
                  Xem chi tiết
                </th>
              </tr>
            </thead>
            <tbody>
              {longDeals.map((deal, index) => (
                <tr key={index}>
                  <td className="bg-white p-3">{deal.MãCP ? deal.MãCP : ""}</td>
                  <td className="bg-white p-3">
                    {deal.NgàyKN ? deal.NgàyKN : ""}
                  </td>
                  <td className="bg-white p-3">
                    {deal.Giámuakhuyếnnghị ? deal.Giámuakhuyếnnghị : ""}
                  </td>
                  <td className="bg-white p-3">
                    {deal.NgưỡnggiáQtrr ? deal.NgưỡnggiáQtrr : ""}
                  </td>
                  <td className="bg-white p-3">
                    {deal.Giáhiệntại ? deal.Giáhiệntại : ""}
                  </td>
                  <td className="bg-white p-3">
                    {deal.LãiLỗ ? deal.LãiLỗ + "%" : ""}
                  </td>
                  <td className="bg-white p-3">
                    {deal.Kịchbảnhiệntại ? deal.Kịchbảnhiệntại : ""}
                  </td>
                  <td className="bg-white article p-3 ">
                    {deal.popupTitle && deal.popupText ? (
                      <>
                        {" "}
                        <a
                          href="#"
                          className=" h5 cursor-pointer articleHeader"
                          onClick={() => setShowPopup(index)}
                        >
                          {deal.popupTitle + ">>"}
                        </a>
                        {index == showPopup ? (
                          <Popup
                            // className="ms-auto"
                            trigger={showPopup}
                            setTrigger={setShowPopup}
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: deal.popupText,
                              }}
                            />
                          </Popup>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Báocáo;
