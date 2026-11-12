import api from "./axios";

export const GetCourseAnalyticsApi = async () => {
  const { data } = await api.get("/analytics/get-course-analytics");

  return data;
};

export const GetUsersAnalyticsApi = async () => {
  const { data } = await api.get("/analytics/get-users-analytics");

  return data;
};
