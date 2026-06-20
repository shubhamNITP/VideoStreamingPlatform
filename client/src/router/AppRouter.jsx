import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UploadPage from "../pages/UploadPage";
import VideoPage from "../pages/VideoPage";
import MyVideosPage from "../pages/MyVideosPage";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
        path="/upload"
        element={
            <ProtectedRoute>
            <UploadPage />
            </ProtectedRoute>
        }
        />

        <Route
        path="/videos/:id"
        element={<VideoPage />}
        />

        <Route
        path="/my-videos"
        element={
            <ProtectedRoute>
            <MyVideosPage />
            </ProtectedRoute>
        }
        />

        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
        
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;