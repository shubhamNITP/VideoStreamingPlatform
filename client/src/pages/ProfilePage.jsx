import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";

import {
  getUserProfile,
  getUserVideos,
} from "../api/userApi";

function ProfilePage() {

  const { id } =
    useParams();

  const [profile,
    setProfile] =
    useState(null);

  const [videos,
    setVideos] =
    useState([]);

  useEffect(() => {

    const fetchData =
      async () => {

        try {

          const profileData =
            await getUserProfile(
              id
            );

          setProfile(
            profileData
          );

          const videoData =
            await getUserVideos(
              id
            );

          setVideos(
            videoData.videos
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    fetchData();

  }, [id]);

  if (!profile) {

    return (
      <>
        <Navbar />
        <h2>
          Loading...
        </h2>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">

        <h1>
          {
            profile.user
              .username
          }
        </h1>

        <p>
          Subscribers:
          {" "}
          {
            profile
              .subscriberCount
          }
        </p>

        <p>
          Videos:
          {" "}
          {
            profile
              .videoCount
          }
        </p>

        <hr />

        <h2>
          Uploaded Videos
        </h2>

        <div
          className="video-grid"
        >
          {videos.map(
            (video) => (

              <VideoCard
                key={
                  video._id
                }
                video={
                  video
                }
              />
            )
          )}
        </div>

      </div>
    </>
  );
}

export default ProfilePage;