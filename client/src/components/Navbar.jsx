import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const user =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  const handleLogout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        StreamHub
      </Link>

      <div className="nav-links">

        <Link
          to="/"
          className="nav-link"
        >
          Home
        </Link>

        {user ? (
          <>
            <Link
              to="/upload"
              className="nav-link"
            >
              Upload
            </Link>

            <Link
              to="/my-videos"
              className="nav-link"
            >
              My Videos
            </Link>

            <button
              onClick={
                handleLogout
              }
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="nav-link"
            >
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;