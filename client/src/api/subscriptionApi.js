import api from "./axios";

export const toggleSubscription =
  async (
    channelId,
    token
  ) => {

    const response =
      await api.post(
        `/subscriptions/${channelId}`,
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

export const getSubscriberCount =
  async (
    channelId
  ) => {

    const response =
      await api.get(
        `/subscriptions/${channelId}/count`
      );

    return response.data;
};

export const getSubscriptionStatus =
  async (
    channelId,
    token
  ) => {

    const response =
      await api.get(
        `/subscriptions/${channelId}/status`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};