import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getChapterById, updateChapter } from "../../services/chapterService";

export default function EditChapter() {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const { id } = useParams(); // ambil id chapter
  const navigate = useNavigate();

  // Fetch data chapter saat page load
  useEffect(() => {
    getChapterById(id)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load chapter data");
      });
  }, [id]);

  const handleSave = async () => {
    try {
      if (!title || !content) {
        alert("Title and content are required!");
        return;
      }

      const updatedChapter = {
        title,
        content,
      };

      await updateChapter(id, updatedChapter);
      alert("Chapter updated successfully!");
      navigate("/story/add"); // redirect back to story's chapter list
    } catch (error) {
      console.error(error);
      alert("Error updating chapter");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <Link to="/story/add" className="text-indigo-600 hover:underline">
          &larr; Back
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>

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
          placeholder="Edit your chapter here..."
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
          className="border rounded-3xl px-4 py-2 mr-2"
          onClick={() => window.history.back()}
        >
          Cancel
        </button>
        <button
          className="bg-orange-500 text-white rounded-3xl px-4 py-2"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
