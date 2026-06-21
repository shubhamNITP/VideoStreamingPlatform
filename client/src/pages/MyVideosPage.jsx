import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";
import Spinner from "../components/Spinner";
import { getMyVideos, deleteVideo } from "../api/videoApi";

import "./MyVideosPage.css";

function MyVideosPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMyVideos(token);
        setVideos(data.videos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideos();
  }, []);

  const handleDelete = async (videoId) => {
    try {
      const token = localStorage.getItem("token");
      const confirmDelete = window.confirm("Delete this video?");
      if (!confirmDelete) return;
      await deleteVideo(videoId, token);
      setVideos(videos.filter((video) => video._id !== videoId));
      alert("Video deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete video");
    }
  };

  return (
    <div>
      <Navbar />

      <main className="container my-videos-page">
        <h1>My Videos</h1>

        <div className="video-count">Total Videos: {videos.length}</div>

        <div className="video-grid">
          {videos.map((video) => (
            <div className="my-video-card card" key={video._id}>
              <VideoCard video={video} />

              <div className="card-actions">

            <Link
              to={`/videos/${video._id}`}
              className="btn-outline"
            >
              Watch Video
            </Link>

            <Link
              to={`/edit-video/${video._id}`}
              className="btn-outline"
            >
              Edit
            </Link>

            <button
              onClick={() =>
                handleDelete(video._id)
              }
              className="btn-outline btn-delete"
            >
              Delete
            </button>

            </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default MyVideosPage;