import api from "./axios";

export const getComments =
  async (videoId) => {

    const response =
      await api.get(
        `/comments/${videoId}`
      );

    return response.data;
};

export const addComment =
  async (
    videoId,
    content,
    token
  ) => {

    const response =
      await api.post(
        `/comments/${videoId}`,
        { content },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};


export const deleteComment =
  async (
    commentId,
    token
  ) => {

    const response =
      await api.delete(
        `/comments/${commentId}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};