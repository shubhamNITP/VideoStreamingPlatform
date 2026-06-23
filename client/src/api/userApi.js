import api from "./axios";

export const getUserProfile =
  async (id) => {

    const response =
      await api.get(
        `/users/${id}/profile`
      );

    return response.data;
};

export const getUserVideos =
  async (id) => {

    const response =
      await api.get(
        `/users/${id}/videos`
      );

    return response.data;
};