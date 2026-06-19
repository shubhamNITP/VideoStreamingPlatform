import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getVideoById,
} from "../api/videoApi";



function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] =
    useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data =
          await getVideoById(id);
            console.log(data);
        setVideo(data.video);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideo();
  }, [id]);

  if (!video) {
    return (
      <>
        <Navbar />
        <h2>Loading...</h2>
      </>
    );
  }

  

  return (
    <>
      <Navbar />

      <h1>{video.title}</h1>

      <video
        width="700"
        controls
      >
        <source
          src={video.videoUrl}
          type="video/mp4"
        />
      </video>

      <p>
        {video.description}
      </p>

      <p>
        Views: {video.views}
      </p>
    </>
  );
}

export default VideoPage;