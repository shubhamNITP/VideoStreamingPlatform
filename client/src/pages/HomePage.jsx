import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import VideoCard from "../components/VideoCard";

import {
  getAllVideos,
} from "../api/videoApi";

import "./HomePage.css";

function HomePage() {

  const [search, setSearch] =
    useState("");

  const [videos, setVideos] =
    useState([]);

  const fetchVideos =
    async () => {

      try {

        const data =
          await getAllVideos(
            search
          );

        console.log(data);

        setVideos(
          data.videos
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  useEffect(() => {

    fetchVideos();

  }, []);

  const handleSearch =
    (e) => {

      e.preventDefault();

      fetchVideos();
    };

  return (
    <>
      <Navbar />

      <main className="home-page container home-shell">
        <h1 className="page-title">Home Page</h1>

        <form onSubmit={handleSearch} className="search-panel">
          <input
            type="text"
            className="search-input"
            placeholder="Search videos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        <h3 className="video-count">Total Videos: {videos.length}</h3>

        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      </main>
    </>
  );
}

export default HomePage;