import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createChapter } from "../../services/chapterService";

export default function AddChapter() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const location = useLocation();
  const storyId = new URLSearchParams(location.search).get("storyId");

  const handleSave = async () => {
    try {
      if (!title || !content) {
        alert("Title and content are required!");
        return;
      }

      const newChapter = {
        title,
        content,
        storyId: storyId || 1, // fallback default
      };

      await createChapter(newChapter);
      alert("Chapter saved successfully!");
      window.location.href = "/story/add"; // redirect
    } catch (error) {
      console.error(error);
      alert("Error saving chapter");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <Link to="/story/add" className="text-indigo-600 hover:underline">
          &larr; Back
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Add Chapter</h1>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Title</label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Story</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your chapter here..."
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ header: [1, 2, 3, 4, 5, false] }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["link", "image", "code-block"],
              ["clean"],
            ],
          }}
          formats={[
            "header",
            "bold",
            "italic",
            "underline",
            "strike",
            "list",
            "bullet",
            "align",
            "link",
            "image",
            "code-block",
          ]}
          className="bg-white"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="border rounded px-4 py-2 mr-2"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          className="bg-orange-500 text-white rounded px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
