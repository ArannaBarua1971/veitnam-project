import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import conf from "../conf/conf";

function VideoContentPart() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [video, setVideo] = useState([]);

    const getVideoData = () => {
        axios
          .get(`${conf}/get_sepecific_video/${slug}`)
          .then((response) => {
            setVideo(response.data.data);
          })
          .catch((error) => console.log(error));
      };
      useEffect(() => {
        getVideoData();
      }, [slug]);
  return (
    <div className="videoSection">
      <div class="container video-main-section-edit">
        {/* <!-- ##### Breadcrumb Area Start ##### --> */}
        <div class="vizew-breadcrumb">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                      <a className="cursor-pointer" onClick={()=> navigate("/Khóa_đào_tạo_hội_viên")}>
                        <i class="fa fa-home" aria-hidden="true"></i> Home
                      </a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ##### Breadcrumb Area End ##### --> */}

        {/* <!-- ##### Video ##### --> */}
        <div class="row">
          <div class="col-12">
            <div class="single-video-area">
              <iframe
                src={video.video_url}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        {/* <!-- ##### Video  Content Area End ##### --> */}

        <div class="row video-section-edit">
          <div class="video-title-section">{video.title}</div>
          <div class="video-content-section">
          <div
                className="first-pera d-block"
                dangerouslySetInnerHTML={{
                  __html: video.description,
                }}
              />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoContentPart;
