import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getVideoById,
  likeVideo,
} from "../api/videoApi";

import {
  getComments,
  addComment,
  deleteComment,
} from "../api/commentApi";

import "./VideoPage.css";

function VideoPage() {
  const { id } = useParams();

  const [video, setVideo] =
    useState(null);

  const [likesCount,
    setLikesCount] =
    useState(0);

  const [comments,
    setComments] =
    useState([]);

  const [newComment,
    setNewComment] =
    useState("");

  useEffect(() => {

    const fetchVideo =
      async () => {

        try {

          const data =
            await getVideoById(id);

          setVideo(
            data.video
          );

          setLikesCount(
            data.video.likesCount
          );

          const commentData =
            await getComments(id);

          setComments(
            commentData.comments
          );

        } catch (error) {

          console.error(
            error
          );
        }
      };

    fetchVideo();

  }, [id]);

  const handleLike =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        const data =
          await likeVideo(
            video._id,
            token
          );

        setLikesCount(
          data.likesCount
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  const handleComment =
    async () => {

      try {

        if (
          !newComment.trim()
        ) {
          return;
        }

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        const data =
          await addComment(
            video._id,
            newComment,
            token
          );

        setComments([
          data.comment,
          ...comments,
        ]);

        setNewComment("");

      } catch (error) {

        console.error(
          error
        );
      }
    };

  const handleDeleteComment =
    async (
      commentId
    ) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await deleteComment(
          commentId,
          token
        );

        setComments(
          comments.filter(
            (comment) =>
              comment._id !==
              commentId
          )
        );

      } catch (error) {

        console.error(
          error
        );
      }
    };

  if (!video) {

    return (
      <>
        <Navbar />
        <h2>
          Loading...
        </h2>
      </>
    );
  }

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

    console.log(
  JSON.parse(
    localStorage.getItem("user")
  )
);

  return (
    <>
      <Navbar />

      <div className="video-page">

        <h1>
          {video.title}
        </h1>

        <video
          className="video-player"
          controls
        >
          <source
            src={video.videoUrl}
            type="video/mp4"
          />
        </video>

        <div className="video-info">

          <p>
            {video.description}
          </p>

          <p>
            Views:
            {" "}
            {video.views}
          </p>

          <p>
            Likes:
            {" "}
            {likesCount}
          </p>

          <button
            onClick={
              handleLike
            }
          >
            👍 Like
          </button>

          <hr />

          <h2>
            Comments
          </h2>

          <input
            type="text"
            placeholder="Add comment..."
            value={newComment}
            onChange={(e) =>
              setNewComment(
                e.target.value
              )
            }
          />

          <button
            onClick={
              handleComment
            }
          >
            Comment
          </button>

          <br />
          <br />

          {comments.length === 0 ? (

            <p>
              No comments yet
            </p>

          ) : (

            comments.map(
              (comment) => (

                <div
                  key={
                    comment._id
                  }
                  className="comment"
                >

                  <strong>
                    {
                      comment.owner
                        ?.username
                    }
                  </strong>

                  <p>
                    {
                      comment.content
                    }
                  </p>

                  {currentUser &&
                    comment.owner
                      ?._id ===
                      currentUser.id && (

                    <button
                      onClick={() =>
                        handleDeleteComment(
                          comment._id
                        )
                      }
                    >
                      Delete
                    </button>

                  )}

                  <hr />

                </div>
              )
            )

          )}

        </div>

      </div>
    </>
  );
}

export default VideoPage;