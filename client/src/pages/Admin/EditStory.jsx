import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById, updateStory } from "../../services/storyService";

export default function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState({
    title: "",
    writer: "",
    synopsis: "",
    category: "",
    tags: [],
    status: "Draft",
    coverImage: null,
  });

  useEffect(() => {
    getStoryById(id)
      .then((res) => setStory(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load story data");
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStory({ ...story, [name]: value });
  };

  const handleRemoveTag = (tagToRemove) => {
    setStory((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileChange = (e) => {
    setStory({ ...story, coverImage: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", story.title);
    formData.append("writer", story.writer);
    formData.append("synopsis", story.synopsis);
    formData.append("category", story.category);
    formData.append("tags", story.tags.join(","));
    formData.append("status", story.status);
    if (story.coverImage) {
      // 🟢 GANTI DARI "coverImage" KE "cover"
      formData.append("cover", story.coverImage);
    }

    updateStory(id, formData)
      .then(() => {
        alert("Story updated successfully!");
        navigate("/story");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update story");
      });
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Story</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={story.title}
            onChange={handleInputChange}
            className="border w-full p-2 rounded"
            placeholder="Title"
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Writer Name</label>
          <input
            type="text"
            name="writer"
            value={story.writer}
            onChange={handleInputChange}
            className="border w-full p-2 rounded"
            placeholder="Writer Name"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Synopsis</label>
          <textarea
            name="synopsis"
            value={story.synopsis}
            onChange={handleInputChange}
            className="border w-full p-2 rounded"
            placeholder="Synopsis"
            rows="4"
          ></textarea>
        </div>
        <div>
          <label className="block font-semibold mb-1">Category</label>
          <select
            name="category"
            value={story.category}
            onChange={handleInputChange}
            className="border w-full p-2 rounded"
          >
            <option value="">Select category</option>
            <option>Financial</option>
            <option>Technology</option>
            <option>Health</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Tags/Keywords Story
          </label>
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="bg-orange-500 text-white rounded-full px-2 py-1 flex items-center"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 text-xs"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Cover Image</label>
          {/* Input upload cover baru */}
          <input
            type="file"
            onChange={handleFileChange}
            className="border w-full p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Status</label>
          <select
            name="status"
            value={story.status}
            onChange={handleInputChange}
            className="border w-full p-2 rounded"
          >
            <option>Draft</option>
            <option>Publish</option>
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/story")}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-orange-500 text-white hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
