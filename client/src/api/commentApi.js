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