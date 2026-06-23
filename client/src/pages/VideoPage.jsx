import { useEffect, useState } from "react";
import {
  useParams,
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  getVideoById,
  likeVideo,
  getRecommendedVideos,
} from "../api/videoApi";

import {
  getComments,
  addComment,
  deleteComment,
} from "../api/commentApi";


import {
  toggleSubscription,
  getSubscriberCount,
  getSubscriptionStatus,
} from "../api/subscriptionApi";

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
  

  const [subscriberCount,
  setSubscriberCount] =
  useState(0);

  const [subscribed,
    setSubscribed] =
    useState(false);


  const [recommendedVideos,
  setRecommendedVideos] =
  useState([]);

    useEffect(() => {

    const fetchVideo =
      async () => {

        try {

          const data =
            await getVideoById(id);

          console.log("Fetched video data:", data.video);

          setVideo(
            data.video
          );

          const channelId =
            data.video.owner._id;

          const countData =
            await getSubscriberCount(
              channelId
            );

          setSubscriberCount(
            countData.count
          );

          const token =
            localStorage.getItem(
              "token"
            );

          if (token) {

            const statusData =
              await getSubscriptionStatus(
                channelId,
                token
              );

            setSubscribed(
              statusData.subscribed
            );
          }

          setLikesCount(
            data.video.likesCount
          );

          const commentData =
            await getComments(id);

          setComments(
            commentData.comments
          );

          const recommendationData =
          await getRecommendedVideos(
            id
          );

        setRecommendedVideos(
          recommendationData.videos
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

    const handleSubscribe =
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
        await toggleSubscription(
          video.owner._id,
          token
        );

      if (
        data.subscribed
      ) {

        setSubscribed(
          true
        );

        setSubscriberCount(
          (prev) =>
            prev + 1
        );

      } else {

        setSubscribed(
          false
        );

        setSubscriberCount(
          (prev) =>
            prev - 1
        );
      }

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

           <h3>

            Uploaded By:

            {" "}

            <Link
              to={`/users/${video.owner._id}`}
            >
              {
                video.owner
                  .username
              }
            </Link>

          </h3>

          <p>
            Subscribers:
            {" "}
            {subscriberCount}
          </p>

          {currentUser?.id !==
            video.owner._id && (

            <button
              onClick={
                handleSubscribe
              }
            >
              {
                subscribed
                  ? "Subscribed"
                  : "Subscribe"
              }
            </button>

          )}

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

        <hr />

<h2>
  Recommended Videos
</h2>

<div
  className="recommended-videos"
>
  {recommendedVideos.map(
    (video) => (

      <Link
        key={video._id}
        to={`/videos/${video._id}`}
        style={{
          textDecoration:
            "none",
          color: "inherit",
        }}
      >

        <div
          className="recommended-card"
        >

          <img
            src={
              video.thumbnailUrl
            }
            alt={
              video.title
            }
            width="250"
          />

          <h4>
            {video.title}
          </h4>

          <p>
            {
              video.owner
                .username
            }
          </p>

        </div>

      </Link>
    )
  )}
</div>

      </div>
    </>
  );
}

export default VideoPage;