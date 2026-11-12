import api from "./axios";

export const CreateCourseApi = async (payload) => {
  const { data } = await api.post("/course/create-course", payload);

  return data;
};

export const GetSingleCourseApi = async (id) => {
  const { data } = await api.get(`/course/get-course/${id}`);
  return data;
};

export const UpdateCourseApi = async (id, payload) => {
  const { data } = await api.put(`/course/edit-course/${id}`, payload);
  return data;
};

// GET ALL COURSES
export const GetAllAdminCoursesApi = async () => {
  const { data } = await api.get("/course/get-courses");

  return data;
};

export const GetCourseContentApi = async (id) => {
  const { data } = await api.get(`/course/get-course-content/${id}`);

  return data;
};


//LMS
export const GetAllCoursesApi = async () => {
  const { data } = await api.get("/lms/courses");

  return data;
};

export const GetMyLearningApi = async () => {
  const { data } = await api.get("/lms/my-learning");
  return data;
};

export const CreatePaymentApi = async (payload) => {
  const { data } = await api.post("/lms/payments/create", payload);

  return data;
};

export const VerifyPaymentApi = async (payload) => {
  const { data } = await api.post("/lms/payments/verify", payload);

  return data;
};

export const GetCategoriesApi = async () => {
  const { data } = await api.get("/lms/categories");

  return data;
};