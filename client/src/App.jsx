import { Routes, Route } from "react-router-dom";
import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import StoryManagement from "./pages/Admin/StoryManagement";
import AddStory from "./pages/Admin/AddStory";
import AddChapter from "./pages/Admin/AddChapter";
import EditStory from "./pages/Admin/EditStory";
import EditChapter from "./pages/Admin/EditChapter";
import DetailStory from "./pages/Admin/DetailStory";

export default function App() {
  return (
    <Routes>
      {/* NESTED ROUTES */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} /> {/* ini render Dashboard di path / */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="story" element={<StoryManagement />} />
        <Route path="story/add" element={<AddStory />} />
        <Route path="story/edit/:id" element={<EditStory />} />
        <Route path="story/detail/:id" element={<DetailStory />} />
        <Route path="story/add/chapter" element={<AddChapter />} />
        <Route path="/story/add/chapter/:id" element={<EditChapter />} />
      </Route>
    </Routes>
  );
}
