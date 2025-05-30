const express = require("express");
const cors = require("cors");
const path = require("path");
const storyRoutes = require("./routes/story");
const chapterRoutes = require("./routes/chapter");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/img", express.static(path.join(__dirname, "public/img")));

// ✅ Route untuk chapter
app.use("/api/chapters", chapterRoutes);

// ✅ Route untuk story
app.use("/api/stories", storyRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
