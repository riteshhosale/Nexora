import api from "./axios";

export const getAllPosts = () => api.get("/posts");

export const createPost = (formData) =>
  api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const likePost = (id) =>
  api.put(`/posts/${id}/like`);

export const savePost = (id) =>
  api.put(`/posts/${id}/save`);

export const deletePost = (id) =>
  api.delete(`/posts/${id}`);