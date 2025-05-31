import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createStory } from "../../services/storyService";
import { getChapters, deleteChapter } from "../../services/chapterService";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function AddStory() {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [category, setCategory] = useState("Financial");
  const [status, setStatus] = useState("Publish");
  const [tags, setTags] = useState(["Best", "Mental Illness", "Short"]);
  const [cover, setCover] = useState(null);

  const [chapters, setChapters] = useState([]);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const navigate = useNavigate();
  // Fetch chapters
  const fetchChapters = () => {
    getChapters()
      .then((res) => setChapters(res.data))
      .catch((err) => console.error("Error fetching chapters:", err));
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleDeleteChapter = async (id) => {
    if (window.confirm("Are you sure to delete this chapter?")) {
      try {
        await deleteChapter(id);
        setChapters((prev) => prev.filter((c) => c.id !== id));
      } catch (error) {
        console.error("Error deleting chapter:", error);
        alert("Error deleting chapter");
      }
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("writer", writer);
      formData.append("synopsis", synopsis);
      formData.append("category", category);
      formData.append("status", status);
      formData.append("tags", JSON.stringify(tags));
      if (cover) {
        formData.append("cover", cover);
      }

      console.log("Chapters to save (on server):", chapters);
      await createStory(formData);

      alert("Story saved successfully!");
      window.location.href = "/story";
    } catch (error) {
      console.error(error);
      alert("Error saving story");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <Link to="/story" className="text-indigo-600 hover:underline">
          &larr; Back
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Add Stories</h1>

      {/* Form Input */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1">Writer Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Writer Name"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Synopsis</label>
        <textarea
          className="w-full border rounded px-3 py-2 h-24"
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Financial</option>
            <option>Technology</option>
            <option>Health</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Tags/Keywords Story</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-500 text-white rounded-full px-2 py-1 flex items-center"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-xs"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Cover Image</label>
          <input
            type="file"
            className="w-full border rounded px-3 py-2"
            onChange={(e) => setCover(e.target.files[0])}
          />
        </div>
        <div>
          <label className="block mb-1">Status</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Publish</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Tombol Add Chapter */}
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => (window.location.href = "/story/add/chapter")}
          className="bg-orange-500 text-white px-4 py-2 rounded-3xl flex items-center"
        >
          + Add Chapter
        </button>
      </div>

      {/* Table Chapters */}
      <table className="w-full border rounded">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Last Updated</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chapters.map((chapter) => (
            <tr key={chapter.id}>
              <td className="border-t px-4 py-2">{chapter.title}</td>
              <td className="border-t px-4 py-2">
                {new Date(chapter.lastUpdated).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </td>
              <td className="border-t px-4 py-2 flex gap-2">
                <Link
                  to={`/story/add/chapter/${chapter.id}`}
                  className="text-blue-500"
                >
                  <FiEdit />
                </Link>
                <button
                  onClick={() => handleDeleteChapter(chapter.id)}
                  className="text-red-500"
                >
                  <FiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tombol Save / Cancel */}
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => setShowCancelModal(true)}
          className="border rounded-3xl px-8 py-2 mr-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white rounded-3xl px-8 py-2"
        >
          Save
        </button>
      </div>

      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to cancel adding the story without saving
              the data?
            </h2>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 border rounded hover:bg-gray-100"
                onClick={() => setShowCancelModal(false)}
              >
                No
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => {
                  setShowCancelModal(false);
                  navigate("/story");
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
