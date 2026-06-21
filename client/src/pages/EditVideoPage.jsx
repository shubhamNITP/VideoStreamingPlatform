import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import {
  getVideoById,
  updateVideo,
} from "../api/videoApi";
import "./EditVideoPage.css";

function EditVideoPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [video,
    setVideo] =
    useState(null);

  const [title,
    setTitle] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [category,
    setCategory] =
    useState("");

  const [newVideo,
    setNewVideo] =
    useState(null);

  const [newThumbnail,
    setNewThumbnail] =
    useState(null);

  useEffect(() => {

    const fetchVideo =
      async () => {

        try {

          const data =
            await getVideoById(
              id
            );

          setVideo(
            data.video
          );

          setTitle(
            data.video.title
          );

          setDescription(
            data.video.description
          );

          setCategory(
            data.video.category
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    fetchVideo();

  }, [id]);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const formData =
          new FormData();

        formData.append(
          "title",
          title
        );

        formData.append(
          "description",
          description
        );

        formData.append(
          "category",
          category
        );

        if (
          newThumbnail
        ) {

          formData.append(
            "thumbnail",
            newThumbnail
          );
        }

        if (
          newVideo
        ) {

          formData.append(
            "video",
            newVideo
          );
        }

        await updateVideo(
          id,
          formData,
          token
        );

        alert(
          "Video updated successfully"
        );

        navigate(
          "/my-videos"
        );

      } catch (error) {

        console.error(
          error
        );

        alert(
          "Failed to update video"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div className="container edit-video-page">
        <h1 className="page-title">Edit Video</h1>

        <div className="edit-video-grid">
          {/* Left Column: Form Controls */}
          <div className="edit-form-column">
            <form onSubmit={handleSubmit} className="edit-video-form">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title that describes your video"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your video"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Education</option>
                  <option>Gaming</option>
                  <option>Music</option>
                  <option>Technology</option>
                  <option>Entertainment</option>
                  <option>Sports</option>
                  <option>News</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group replace-section-container">
                <div className="replace-field">
                  <h3>Replace Thumbnail</h3>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewThumbnail(e.target.files[0])}
                  />
                </div>

                <div className="replace-field">
                  <h3>Replace Video</h3>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setNewVideo(e.target.files[0])}
                  />
                </div>
              </div>

              <button type="submit" className="save-btn">
                Update Video
              </button>
            </form>
          </div>

          {/* Right Column: Previews */}
          <div className="edit-preview-column">
            {video && (
              <div className="sticky-preview card">
                <div className="player-container">
                  <video controls className="preview-player">
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>
                </div>
                <div className="preview-details">
                  <div className="preview-heading">Video Preview</div>
                  <div className="preview-meta-info">
                    <div className="preview-label">File Link</div>
                    <a href={video.videoUrl} target="_blank" rel="noreferrer" className="video-link-anchor">
                      {video.title || "Video Link"}
                    </a>
                  </div>

                  <hr className="preview-divider" />

                  <div className="thumbnail-preview-block">
                    <div className="preview-heading">Current Thumbnail</div>
                    <img
                      src={video.thumbnailUrl}
                      alt="Thumbnail"
                      className="preview-thumbnail-img"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVideoPage;