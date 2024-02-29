import React, { useState, useEffect } from "react";
import axios from "axios";
import conf from "../../conf/conf";
import MainContainer from "../../container/MainContainer";
import { ContentHeader, Button, Card } from "../adminComponents";
import { useNavigate } from "react-router-dom";

function AllVideo() {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);

  const getAllVideo = () => {
    axios
      .get(`${conf}/get_all_video`)
      .then((response) => {
        setVideos(response.data.data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAllVideo();
  }, []);

  const Delete = (id) => {
    console.log(id)
    axios
      .post(`${conf}/Delete_sepecific_video/${id}`)
      .then((response) => {
        getAllVideo();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const editContent = (slug) => {
    navigate(`/admin/Add-vedio/${slug}`)
  };
  const statusChange = (id) => {
    console.log(id);
    axios
      .post(`${conf}/status_change_video/${id}`)
      .then((response) => {
        getAllVideo();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div>
        {/* Go to IDP section */}
        <section id="IDP">
          <MainContainer className="mx-auto  col-xl-9 col-sm-11 my-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <ContentHeader>All Video for Courses</ContentHeader>
              <Button
                className="py-2 mx-2 bg-dark"
                onClick={() => navigate("/admin/Add-vedio")}
              >
                Add Video
              </Button>
            </div>

            {/* all IDP */}
            <div className="IDP my-5 d-flex flex-wrap">
              {videos.map((video, index) => (
                <Card key={index} className="col-lg-4 col-md-6 m-2">
                  <img
                    src={video.video_thumb_url}
                    alt={video.video_thumb_url}
                  />
                  <p>{video.title}</p>
                  {video.description ? (
                    <div
                      className="inline"
                      dangerouslySetInnerHTML={{
                        __html: video.description.substr(0, 100),
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <div className="d-flex flex-wrap justify-content-between">
                    <Button
                      onClick={() => editContent(video.slug)}
                      className="p-1 mt-3  border-0 rounded bg-primary col-sm-5"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => statusChange(video.id)}
                      className="p-1 mt-3  border-0 rounded bg-dark col-sm-5"
                    >
                      {video.status ? "Deactive" : "active"}
                    </Button>
                    <Button
                      onClick={() => Delete(video.id)}
                      className="p-1 mt-3  border-0 rounded bg-danger col-sm-5"
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </MainContainer>
        </section>
      </div>
    </div>
  );
}

export default AllVideo;
