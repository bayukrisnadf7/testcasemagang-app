import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById } from "../../services/storyService";

export default function DetailStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState({
    title: "",
    writer: "",
    synopsis: "",
    category: "",
    tags: [],
    status: "",
    cover: null, // asumsi backend simpan "cover" bukan "coverImage"
  });

  useEffect(() => {
    getStoryById(id)
      .then((res) => setStory(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load story data");
      });
  }, [id]);

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <button
          onClick={() => navigate("/story")}
          className="text-indigo-600 hover:underline"
        >
          &larr; Back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6">Story Detail</h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={story.title}
            readOnly
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Writer Name</label>
          <input
            type="text"
            value={story.writer}
            readOnly
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Synopsis</label>
        <textarea
          value={story.synopsis}
          readOnly
          className="border w-full p-2 rounded bg-gray-100 h-24"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            value={story.category}
            readOnly
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Tags/Keywords</label>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-500 text-white rounded-full px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Cover Image</label>
          {story.cover ? (
            <img
              src={`http://localhost:5000/img/${story.cover}`}
              alt="cover"
              className="border w-full rounded"
            />
          ) : (
            <p className="text-gray-500 italic">Tidak ada gambar cover</p>
          )}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <input
            type="text"
            value={story.status}
            readOnly
            className="border w-full p-2 rounded bg-gray-100"
          />
        </div>
      </div>

      {/* Tombol kembali */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => navigate("/story")}
          className="border rounded-3xl px-8 py-2"
        >
          Back
        </button>
      </div>
    </div>
  );
}
