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
        <section className="hero-panel card">
          <div className="hero-copy">
            <p className="eyebrow">Featured streaming library</p>
            <h1>Find standout videos, then upload your own.</h1>
            <p className="hero-text">
              Browse a cleaner library experience with faster search, clearer cards,
              and a homepage that feels built for watching instead of just listing.
            </p>

            <form onSubmit={handleSearch} className="search-panel">
              <input
                type="text"
                className="search-input"
                placeholder="Search videos, creators, or topics"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button type="submit" className="search-btn">
                Search
              </button>
            </form>
          </div>

          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">{videos.length}</span>
              <span className="stat-label">videos available</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">4K</span>
              <span className="stat-label">playback ready</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">Fast</span>
              <span className="stat-label">search and browse</span>
            </div>
          </div>
        </section>

        <div className="results-header">
          <h2>Trending now</h2>
          <p className="video-count">Showing {videos.length} videos</p>
        </div>

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