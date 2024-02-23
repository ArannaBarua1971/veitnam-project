import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import conf from "../conf/conf";
import { Button } from "../components";
function VideoSecton() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const getAllVideo = () => {
    axios
      .get(`${conf}/get_allActive_video`)
      .then((response) => {
        setVideos(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllVideo();
  }, []);
  return (
    <div>
      <div className="container">
        <div id="videos">
          <div className="row">
            <div className="courses-title mt-5">
              <h3>Courses</h3>
            </div>
          </div>
          <div className="row mt-2">
            {videos.map((video, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 my-2">
                <div className="card" style={{ width: "18rem;" }}>
                  <img
                    src={video.video_thumb_url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text">
                      {video.description != "" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: video.description.substr(0,20),
                          }}
                        />
                      ) : (
                        <p>video description</p>
                      )}
                      ...
                    </p>
                    <Button
                      onClick={()=>navigate(`/video_content/${video.slug}`)}
                      className="btn-style"
                    >
                      See More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSecton;
