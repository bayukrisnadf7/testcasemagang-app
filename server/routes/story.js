const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
let stories = require("../data/stories");

// Setup multer for cover upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/img");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// GET all stories
router.get("/", (req, res) => {
  res.json(stories);
});

// GET story by id
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const story = stories.find((s) => s.id === id);
  if (!story) return res.status(404).json({ message: "Story not found" });
  res.json(story);
});

// POST create new story
router.post("/", upload.single("cover"), (req, res) => {
  const { title, writer, synopsis, category, status } = req.body;
  const tags = req.body.tags
    ? req.body.tags.split(",").map((t) => t.trim())
    : [];

  const newStory = {
    id: stories.length + 1,
    title,
    writer,
    synopsis,
    category,
    status,
    tags,
    cover: req.file ? req.file.filename : null,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  stories.push(newStory);
  res.status(201).json(newStory);
});

// PUT update story by id
router.put("/:id", upload.single("cover"), (req, res) => {
  console.log("===== EDIT STORY CALLED =====");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  const id = parseInt(req.params.id);
  const index = stories.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Story not found" });
  }

  // Parse tags safely
  let tags = stories[index].tags;
  if (req.body.tags) {
    tags = req.body.tags.split(",").map((t) => t.trim());
  }

  // Update fields
  stories[index] = {
    ...stories[index],
    title: req.body.title || stories[index].title,
    writer: req.body.writer || stories[index].writer,
    synopsis: req.body.synopsis || stories[index].synopsis,
    category: req.body.category || stories[index].category,
    status: req.body.status || stories[index].status,
    tags,
    cover: req.file ? req.file.filename : stories[index].cover,
    lastUpdated: new Date().toISOString().split("T")[0],
  };

  res.json(stories[index]);
});

// DELETE story by id
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = stories.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Story not found" });
  }

  stories.splice(index, 1);
  res.json({ message: "Story deleted" });
});

module.exports = router;
