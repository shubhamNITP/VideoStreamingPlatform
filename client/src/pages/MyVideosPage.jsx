import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getMyVideos,
  deleteVideo,
} from "../api/videoApi";

function MyVideosPage() {

  const [videos, setVideos] =
    useState([]);

  useEffect(() => {

    const fetchVideos =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const data =
            await getMyVideos(
              token
            );

          setVideos(
            data.videos
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    fetchVideos();

  }, []);

  const handleDelete =
    async (videoId) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const confirmDelete =
          window.confirm(
            "Delete this video?"
          );

        if (!confirmDelete)
          return;

        await deleteVideo(
          videoId,
          token
        );

        setVideos(
          videos.filter(
            (video) =>
              video._id !==
              videoId
          )
        );

        alert(
          "Video deleted successfully"
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to delete video"
        );
      }
    };

  return (
    <>
      <Navbar />

      <h1>
        My Videos
      </h1>

      <h3>
        Total Videos:
        {videos.length}
      </h3>

      {videos.map(
        (video) => (
          <div
            key={video._id}
          >

            <Link
              to={`/videos/${video._id}`}
            >
              <img
                src={
                  video.thumbnailUrl
                }
                alt={
                  video.title
                }
                width="250"
              />
            </Link>

            <Link
              to={`/videos/${video._id}`}
            >
              <h2>
                {video.title}
              </h2>
            </Link>

            <p>
              Views:
              {video.views}
            </p>

            <Link
              to={`/videos/${video._id}`}
            >
              <button>
                Watch Video
              </button>
            </Link>

            {" "}

            <button
              onClick={() =>
                handleDelete(
                  video._id
                )
              }
            >
              Delete
            </button>

            <hr />
          </div>
        )
      )}
    </>
  );
}

export default MyVideosPage;