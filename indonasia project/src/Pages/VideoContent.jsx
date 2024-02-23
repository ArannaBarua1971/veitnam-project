import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { Button, Card, ContentHeader } from "../components";

function VideoContent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [videos, setVideos] = useState([]);
  const [curentVideo, setCurrentVideo] = useState([]);

  const getVideoData = () => {
    axios
      .get(`${conf}/get_ActiveCourse_video/${id}`)
      .then((response) => {
        setVideos(response.data.data);
        setCurrentVideo(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getVideoData();
  }, [id]);
  return (
    <div>
      <div className="container videoSection">
        <section className="hero--area section-padding-80 video-main-section-edit">
          <div className="container">
            <Button
              onClick={() => navigate("/Khóa_đào_tạo_hội_viên")}
              className="d-block btn-style mb-3 "
              width="10%"
            >
              <i className="fa-solid fa-backward text-white "></i>
            </Button>
            <div className="row no-gutters">
              {/* header */}
              <ContentHeader>{curentVideo? curentVideo.title:""}</ContentHeader>

              {/* back to history */}
              <div className="col-12 col-md-7 col-lg-8">
                <div class="tab-content">
                  <div
                    class="tab-pane fade show active"
                    id="post-1"
                    role="tabpanel"
                    aria-labelledby="post-1-tab"
                  >
                    {/* <!-- Single Feature Post --> */}
                    <div class="single-feature-post video-post bg-img">
                      <video
                        src={curentVideo? curentVideo.video_url:""}
                        width="100%"
                        height="100%"
                        controls
                      ></video>
                    </div>

                    <div
                      className="first-pera d-block"
                      dangerouslySetInnerHTML={{
                        __html:curentVideo? curentVideo.description:"",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-5 col-lg-4">
                <ul className="nav vizew-nav-tab" role="tablist">
                  {videos.map((video, index) => (
                    <li
                      key={index}
                      className="nav-item cursor-pointer"
                      onClick={() => setCurrentVideo(videos[index])}
                    >
                      <a
                        className={`nav-link ${
                          video.id == curentVideo.id ? "active" : ""
                        } `}
                        id="post-1-tab"
                        data-toggle="pill"
                        role="tab"
                        aria-controls="post-1"
                        aria-selected="true"
                      >
                        {/* <!-- Single Blog Post --> */}
                        <div className="single-blog-post style-2 d-flex align-items-center">
                          <div className="post-thumbnail">
                            <img src={video.video_thumb_url} alt="" />
                          </div>
                          <div className="post-content">
                            <h6 className="post-title">{video.title}</h6>
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VideoContent;
