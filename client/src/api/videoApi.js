import api from "./axios";


export const getAllVideos =
  async (search = "") => {

    console.log("Fetching videos with search:", search);
    const response =
      await api.get(
        `/videos?search=${search}`
      );

    return response.data;
};

export const getVideoById = async (id) => {
  const response = await api.get(
    `/videos/${id}`
  );

  return response.data;
};


export const getMyVideos = async (token) => {
  const response = await api.get(
    "/videos/my-videos",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



export const uploadVideo = async (formData, token) => {
  const response = await api.post(
    "/videos/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const deleteVideo =
  async (id, token) => {

    const response =
      await api.delete(
        `/videos/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};


export const likeVideo =
  async (id, token) => {

    const response =
      await api.post(
        `/videos/${id}/like`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};



export const updateVideo =
  async (
    id,
    formData,
    token
  ) => {

    const response =
      await api.put(
        `/videos/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
};