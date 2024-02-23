import React from "react";
import MainContainer from "../container/MainContainer";

function PricingTable({ pricingPackage, pricingDetails, className }) {
  return (
    <div className="pricingTable">
      {/* <!-- package title section starts here --> */}
      <div className="container">
        <div className="row ">
          <div className="col-lg-6 col-md-12 col-sm-12"></div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="row package-head col-lg-12 col-sm-12">
              <div className="pricing-package col-lg-3 col-sm-3 first-package curve-left">
                Starter
              </div>
              <div className="pricing-package col-lg-3 col-sm-3 second-package">
                Standard
              </div>
              <div className="pricing-package col-lg-3 col-sm-3 third-package">
                Private
              </div>
              <div className="pricing-package col-lg-3 col-sm-3 fourth-package curve-right">
                Priority
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- package title section end here --> */}

      {/* <!-- RMS section starts here --> */}
      <div className="container table-row">
        <div className="row first-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>RMS</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Hệ thống FIDT RMS</div>
                  <p className="empasis">
                    Độc quyền - Dự báo xu hướng thị trường (đã được kiểm chứng)
                    dựa trên phân tích Vĩ mô - Kỹ thuật - Động lượng
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Chiến lược đầu tư</div>
                  <p className="empasis">
                    Chiến lược đầu tư phù hợp với trạng thái và xu hướng của thị
                    trường
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row second-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Tin tức</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Tin nhanh thị trường</div>
                  <p className="empasis">
                    Cập nhật nhanh nhất tin tức nổi bật của thị trườn
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Tin nóng độc quyền</div>
                  <p className="empasis">
                    Tin tức đặc biệt và độc quyền cùng nhận định từ FIDT
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3"></div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row third-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>TA</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Hệ thống BOT Trade</div>
                  <p className="empasis">
                    Tín hiệu mua-bán theo BOT (Backtested in Data Science)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row fourth-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>FA</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Chỉ số Sức mạnh Ngành</div>
                  <p className="empasis">
                    Đánh giá sức mạnh và xu hướng ngành dựa trên phân tích cơ
                    bản chuyên sâu
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Chỉ số Sức mạnh cổ phiếu</div>
                  <p className="empasis">
                    Đánh giá sức mạnh và xu hướng cổ phiếu dựa trên phân tích cơ
                    bản chuyên sâu
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading head-merge">
                    Chỉ số đánh giá sức khỏe tài chính
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3 col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row fifth-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Danh&nbsp;mục</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Danh mục đầu tư</div>
                  <p className="empasis">
                    Danh mục tối ưu hoá theo thời kỳ dựa trên phân tích Vĩ mô,
                    Ngành nghề và Doanh nghiệp
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Danh mục tích sản</div>
                  <p className="empasis">Danh mục phù hợp đầu tư định kỳ (SIP)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3"></div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row sixth-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Báo&nbsp;cáo</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Báo cáo tuần</div>
                  <p className="empasis">
                    Cập nhật, phân tích thị trường hàng tuần
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Data Talk</div>
                  <p className="empasis">
                    Thống kê và nhận định dữ liệu thị trường
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Báo cáo ngành & cổ phiếu</div>
                  <p className="empasis">
                    Phân tích chi tiết, chuyên sâu ngành và cổ phiếu đi kèm với
                    nhận định từ FIDT Research
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Báo cáo chuyên đề</div>
                  <p className="empasis">
                    Phân tích các chủ đề quan trọng về vĩ mô, sự kiện lớn trong
                    và ngoài nước
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Flash note</div>
                  <p className="empasis">
                    Nhận định ngắn về các sự kiện quan trọng của thị trường
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3"></div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row seventh-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Data</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading head-merge">Data thị trường</div>
                </div>
                <div className="row row-border">
                  <div className="heading head-merge">Data vĩ mô</div>
                </div>
                <div className="row row-border">
                  <div className="heading head-merge">Data ngành</div>
                </div>
                <div className="row row-border">
                  <div className="heading head-merge">Bộ lọc cổ phiếu</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-second  col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row row-custom eight-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Notifi chung</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Notification Space</div>
                  <p className="empasis">
                    Cập nhật thông báo, khuyến nghị và nhận định FIDT
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3"></div>
              <div className="tikmark-second col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-third col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img src="./imgs/check-circle.png" alt="tikmark" />
              </div>
            </div>
          </div>
        </div>
        <div className="row sixth-row-package-table">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 rms">
                <h4>Private&nbsp;Service</h4>
              </div>
              <div className="col-lg-10">
                <div className="row row-border">
                  <div className="heading">Private Suite</div>
                  <p className="empasis">
                    Hỏi đáp, chia sẻ, cập nhật thông tin trực tiếp từ FIDT
                    Research
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Priority Lounge</div>
                  <p className="empasis">
                    Hỏi đáp, chia sẻ, cập nhật thông tin trực tiếp với ông Huỳnh
                    Minh Tuấn - Chủ tịch HĐQT FIDT và FIDT Research
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Online Meeting</div>
                  <p className="empasis">
                    Chia sẻ trực tuyến cùng nhà đầu tư (tối thiểu 1 tháng/ lần)
                  </p>
                </div>
                <div className="row row-border">
                  <div className="heading">Exclusive Dining</div>
                  <p className="empasis">
                    Dùng bữa thân mật và giao lưu, chia sẻ về tài chính đầu tư
                    cùng chuyên gia FIDT (định kỳ hằng Quý)
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row row-border tikmark ">
              <div className="tikmark-first col-lg-3"></div>
              <div className="tikmark-second col-lg-3"></div>
              <div className="tikmark-third col-lg-3">
                <img
                  src="./imgs/hot-feature.png"
                  className="hot-feature"
                  alt="tikmark"
                />
              </div>
              <div className="tikmark-fourth col-lg-3"></div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3"></div>
              <div className="tikmark-third col-lg-3"></div>
              <div className="tikmark-fourth col-lg-3">
                <img
                  src="./imgs/hot-feature.png"
                  className="hot-feature"
                  alt="tikmark"
                />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3"></div>
              <div className="tikmark-third col-lg-3">
                <img
                  src="./imgs/hot-feature.png"
                  className="hot-feature"
                  alt="tikmark"
                />
              </div>
              <div className="tikmark-fourth col-lg-3">
                <img
                  src="./imgs/hot-feature.png"
                  className="hot-feature"
                  alt="tikmark"
                />
              </div>
            </div>
            <div className="row row-border tikmark">
              <div className="tikmark-first  col-lg-3"></div>
              <div className="tikmark-second  col-lg-3"></div>
              <div className="tikmark-third col-lg-3"></div>
              <div className="tikmark-fourth col-lg-3">
                <img
                  src="./imgs/hot-feature.png"
                  className="hot-feature"
                  alt="tikmark"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- RMS section ends here --> */}
    </div>
  );
}

export default PricingTable;
