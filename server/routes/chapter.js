const express = require("express");
const multer = require("multer");
const router = express.Router();

const chapters = require("../data/chapters");

// Setup multer (untuk upload file kalau ada, di sini kita pakai .none() untuk JSON biasa)
const upload = multer();

// GET: Ambil semua chapters
router.get("/", (req, res) => {
  console.log("GET /api/chapters called");
  res.json(chapters);
});

// GET: Ambil 1 chapter by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`GET /api/chapters/${id} called`);
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) {
    return res.status(404).json({ message: "Chapter not found" });
  }
  res.json(chapter);
});

// POST: Buat chapter baru
router.post("/", upload.none(), (req, res) => {
  console.log("POST /api/chapters called");
  console.log("DEBUG req.body:", req.body);

  const { title, content, storyId } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newChapter = {
    id: chapters.length + 1,
    title,
    content,
    storyId: parseInt(storyId),
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  chapters.push(newChapter);
  res.status(201).json(newChapter);
});

// PUT: Update chapter by ID
router.put("/:id", upload.none(), (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`PUT /api/chapters/${id} called`);
  console.log("DEBUG req.body:", req.body);

  const index = chapters.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Chapter not found" });
  }

  const { title, content, storyId } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  chapters[index] = {
    ...chapters[index],
    title,
    content,
    storyId: parseInt(storyId),
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  res.json(chapters[index]);
});

// DELETE: Hapus chapter by ID
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  console.log(`DELETE /api/chapters/${id} called`);

  const index = chapters.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Chapter not found" });
  }

  chapters.splice(index, 1);
  res.json({ message: "Chapter deleted" });
});

module.exports = router;
