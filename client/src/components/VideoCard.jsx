import { Link } from "react-router-dom";
import "./VideoCard.css";

function VideoCard({ video }) {

  const uploader = video.uploader || video.user || video.author || {};
  const uploaderName = uploader.username || uploader.name || "Unknown";
  const videoAge = video.createdAt
    ? new Date(video.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Recently uploaded";

  return (
    <div className="video-card">

      <Link to={`/videos/${video._id}`} className="thumb-link">
        <div className="thumb-wrap">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="video-thumbnail"
          />

          <div className="thumb-overlay">
            <div className="play-icon">▶</div>
            {video.duration && (
              <div className="duration">{video.duration}</div>
            )}
          </div>
        </div>
      </Link>

      <div className="video-info">
        <h3 className="video-title">{video.title}</h3>

        <div className="video-meta">
          <div className="uploader">{uploaderName}</div>
          <div className="video-views">{video.views} views</div>
          <div className="video-age">{videoAge}</div>
        </div>

        <p className="video-description">{video.description}</p>
      </div>

    </div>
  );
}

export default VideoCard;