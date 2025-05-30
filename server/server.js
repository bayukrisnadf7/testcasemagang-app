const express = require("express");
const cors = require("cors");
const path = require("path");
const storyRoutes = require("./routes/story");
const chapterRoutes = require("./routes/chapter");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Static folder untuk gambar
app.use("/img", express.static(path.join(__dirname, "public/img")));

// Healthcheck (untuk Railway/Vercel)
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Route untuk chapter
app.use("/api/chapters", chapterRoutes);

// Route untuk story
app.use("/api/stories", storyRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
