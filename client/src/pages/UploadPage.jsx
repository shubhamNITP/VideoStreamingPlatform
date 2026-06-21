import { useState } from "react";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { uploadVideo } from "../api/videoApi";

function UploadPage() {

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "Education",
    });

  const [videoFile, setVideoFile] =
    useState(null);

  const [thumbnailFile,
    setThumbnailFile] =
    useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const uploadData =
        new FormData();

      uploadData.append(
        "title",
        formData.title
      );

      uploadData.append(
        "description",
        formData.description
      );

      uploadData.append(
        "category",
        formData.category
      );

      uploadData.append(
        "video",
        videoFile
      );

      uploadData.append(
        "thumbnail",
        thumbnailFile
      );

      const data =
        await uploadVideo(
          uploadData,
          token
        );

      console.log(data);

      alert(
        "Video Uploaded Successfully"
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Upload Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="page auth-page">
        <section className="card auth-card upload-card">

          <form onSubmit={handleSubmit} className="auth-form upload-form">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
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

            <label className="file-field">
              <span>Video file</span>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
            </label>

            <label className="file-field">
              <span>Thumbnail image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnailFile(e.target.files[0])}
              />
            </label>

            <button type="submit">Upload</button>
          </form>
        </section>
      </main>
    </>
  );
}

export default UploadPage;