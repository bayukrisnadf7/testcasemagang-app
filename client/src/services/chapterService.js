import axios from "axios";

const API_BASE = "http://localhost:5000/api/chapters";

// GET all chapters
export const getChapters = () => axios.get(API_BASE);

// GET chapter by ID
export const getChapterById = (id) => axios.get(`${API_BASE}/${id}`);

// CREATE chapter
export const createChapter = (data) => axios.post(API_BASE, data);

// UPDATE chapter by ID
export const updateChapter = (id, data) => axios.put(`${API_BASE}/${id}`, data);

// DELETE chapter by ID
export const deleteChapter = (id) => axios.delete(`${API_BASE}/${id}`);
