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
          <div className="flex flex-wrap items-center gap-2">
            {(() => {
              let parsedTags = [];

              if (Array.isArray(story.tags)) {
                // Sudah array → langsung
                parsedTags = story.tags;
              } else if (typeof story.tags === "string") {
                try {
                  parsedTags = JSON.parse(story.tags);
                  if (!Array.isArray(parsedTags)) {
                    // Kalau hasil parse bukan array, fallback split
                    parsedTags = story.tags.split(",");
                  }
                } catch {
                  parsedTags = story.tags.split(",");
                }
              }

              return parsedTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm"
                >
                  {tag}
                </span>
              ));
            })()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Cover Image</label>
          {story.cover ? (
            <img
              src={`https://testcasemagang-app-production.up.railway.app/img/${story.cover}`}
              alt="cover"
              className="border rounded"
              width={150}
              height={150}
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
