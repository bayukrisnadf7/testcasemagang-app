import axios from "axios";

const API_BASE = "https://testcasemagang-app-production.up.railway.app/api/stories";


// GET all stories
export const getStories = () => axios.get(API_BASE);

// GET a story by ID
export const getStoryById = (id) => axios.get(`${API_BASE}/${id}`);

// CREATE new story (pakai FormData untuk cover image)
export const createStory = (data) =>
  axios.post(API_BASE, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// UPDATE story by ID (pakai FormData juga kalau upload cover image)
export const updateStory = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// DELETE story by ID
export const deleteStory = (id) => axios.delete(`${API_BASE}/${id}`);
