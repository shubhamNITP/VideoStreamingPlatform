import { Link } from "react-router-dom";
import "./VideoCard.css";

function VideoCard({ video }) {

  return (
    <div className="video-card">

      <Link
        to={`/videos/${video._id}`}
      >
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="video-thumbnail"
        />
      </Link>

      <h3 className="video-title">
        {video.title}
      </h3>

      <p className="video-description">
        {video.description}
      </p>

      <p className="video-views">
        {video.views} views
      </p>

    </div>
  );
}

export default VideoCard;