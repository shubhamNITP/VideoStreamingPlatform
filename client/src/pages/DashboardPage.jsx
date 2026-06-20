import {
  useEffect,
  useState,
} from "react";

import Navbar
  from "../components/Navbar";

import {
  getDashboard,
} from "../api/dashboardApi";

import "./DashboardPage.css";

function DashboardPage() {

  const [stats,
    setStats] =
    useState(null);

  useEffect(() => {

    const fetchDashboard =
      async () => {

        try {

          const token =
            localStorage.getItem(
              "token"
            );

          const data =
            await getDashboard(
              token
            );

          setStats(
            data.stats
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    fetchDashboard();

  }, []);

  if (!stats) {

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

      <div className="dashboard">

        <h1>
          Dashboard
        </h1>

        <div className="stats-grid">

          <div className="card">
            <h2>
              {stats.totalVideos}
            </h2>
            <p>
              Videos
            </p>
          </div>

          <div className="card">
            <h2>
              {stats.totalViews}
            </h2>
            <p>
              Views
            </p>
          </div>

          <div className="card">
            <h2>
              {stats.totalLikes}
            </h2>
            <p>
              Likes
            </p>
          </div>

          <div className="card">
            <h2>
              {stats.totalComments}
            </h2>
            <p>
              Comments
            </p>
          </div>

        </div>

      </div>
    </>
  );
}

export default DashboardPage;