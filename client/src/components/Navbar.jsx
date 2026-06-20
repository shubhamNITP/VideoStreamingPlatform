import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.username || user?.name || "Creator";

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <div className="brand-block">
        <Link to="/" className="logo">
          StreamHub
        </Link>

        <span className="brand-tagline">Watch, upload, and share in one place</span>
      </div>

      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {user ? (
          <>
            <span className="user-pill">{userName}</span>
            <Link to="/upload" className="nav-link nav-link-emphasis">
              Upload
            </Link>
            <Link to="/my-videos" className="nav-link">
              My Videos
            </Link>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link nav-link-emphasis">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;