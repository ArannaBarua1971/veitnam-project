import React, { useState, useEffect } from "react";
import { ContentHeader, Popup } from "../components";
import axios from "axios";
import conf from "../conf/conf";

function Dealtíchsảncổphiếu() {
  const [showPopup, setShowPopup] = useState();
  const [shortDeals, setShortDeals] = useState([]);

  useEffect(() => {
    try {
      axios
        .get(`${conf}/get_allActive_asset`)
        .then((response) => {
          setShortDeals(response.data.data);
        })
        .catch((error) => console.log(error));
    } catch {
      console.log("error happend");
    }
  }, []);

  return (
    <div className="p-5 main_background overflow position-relative tablepage1">
      {/* short deal header */}
      <ContentHeader className="DealHeader">
      Deal tích sản cổ phiếu
        <div className="subtitle">
          <p>
            Giới thiệu phương pháp và luận điểm khi chọn cổ phiếu trung hạn của
            KDĐT
          </p>
        </div>
      </ContentHeader>

      {/* all short deals */}

      {shortDeals.map((deal, index) => (
        <div className="mb-5">
          {/* short deal table */}
          <div className="tableOfShortDeal">
            <table className="table ">
              <thead>
                <tr>
                  <th scope="col" className="p-3">
                    Mã cổ phiếu
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
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="p-3">{deal.Mãcổphiếu?deal.Mãcổphiếu:""}</td>
                  <td className="p-3">{deal.NgàyKN?deal.NgàyKN:""}</td>
                  <td className="p-3">{deal.Giámuakhuyếnnghị?deal.Giámuakhuyếnnghị:""}</td>
                  <td className="p-3">{deal.NgưỡnggiáQtrr?deal.NgưỡnggiáQtrr:""}</td>
                  <td className="p-3">{deal.Giáhiệntại?deal.Giáhiệntại:""}</td>
                  <td className="p-3">{deal.LãiLỗ?deal.LãiLỗ+"%":""}</td>
                  <td className="p-3">{deal.Kịchbảnhiệntại?deal.Kịchbảnhiệntại:""}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* article part 1*/}
          {deal.popupTitle && deal.popupText ? (
            <section className="article">
              <a
                href="#"
                className=" articleHeader cursor-pointer"
                onClick={() => setShowPopup(index)}
              >
                {deal.popupTitle + ">>"}
              </a>
              {showPopup == index ? (
                <Popup trigger={showPopup} setTrigger={setShowPopup}>
                  <div dangerouslySetInnerHTML={{ __html: deal.popupText }} />
                </Popup>
              ) : (
                <></>
              )}
            </section>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dealtíchsảncổphiếu;
