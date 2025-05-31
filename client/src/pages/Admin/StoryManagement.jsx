import React from "react";
import { FiSearch, FiFilter, FiEdit, FiTrash, FiEye } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getStories, deleteStory } from "../../services/storyService";

export default function StoryManagement() {
  const [showFilter, setShowFilter] = useState(false);
  const [stories, setStories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    getStories()
      .then((res) => {
        const parsedData = res.data.map((story) => ({
          ...story,
          tags:
            typeof story.tags === "string" && story.tags.startsWith("[")
              ? JSON.parse(story.tags)
              : story.tags,
        }));
        setStories(parsedData);
      })
      .catch(console.error);
  }, []);

  // Filtered stories
  const filteredStories = [...stories].reverse().filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.writer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "" || story.category === selectedCategory;

    const matchesStatus =
      selectedStatus === "" || story.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + pageSize
  );
  const totalPages = Math.ceil(filteredStories.length / pageSize);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Stories</h1>

      {/* Search and Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-gray-300 rounded-lg px-4 py-2 w-[300px] max-w-md">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by Writers / Title"
            className="bg-transparent outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            className="p-3 rounded-full bg-white hover:bg-gray-200"
            onClick={() => setShowFilter(true)}
          >
            <FiFilter className="text-black" />
          </button>
          <div className="h-10 border-l border-gray-300"></div>
          <button
            onClick={() => (window.location.href = "/story/add")}
            className="ml-4 px-4 py-2 bg-orange-500 text-white rounded-2xl hover:bg-orange-600"
          >
            + Add Story
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">No</th>
              <th className="p-4">Title</th>
              <th className="p-4">Writers</th>
              <th className="p-4">Category</th>
              <th className="p-4">Keyword</th>
              <th className="p-4">Status</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredStories.length > 0 ? (
              paginatedStories.map((story, index) => (
                <tr key={story.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">{startIndex + index + 1}</td>
                  <td className="p-4">{story.title}</td>
                  <td className="p-4">{story.writer}</td>
                  <td className="p-4">{story.category}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {(() => {
                        let parsedTags = [];

                        if (Array.isArray(story.tags)) {
                          parsedTags = story.tags;
                        } else if (typeof story.tags === "string") {
                          try {
                            // Kalau bisa parse JSON, langsung pakai array hasilnya
                            parsedTags = JSON.parse(story.tags);
                          } catch {
                            // Kalau gagal, hapus karakter "[" dan "]" dulu
                            const cleaned = story.tags.replace(/^\[|\]$/g, "");
                            // Split dan trim
                            parsedTags = cleaned
                              .split(",")
                              .map((tag) => tag.trim().replace(/"/g, ""));
                          }
                        }

                        // Pastikan parsedTags adalah array
                        if (!Array.isArray(parsedTags)) parsedTags = [];

                        return parsedTags.map((tag, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ));
                      })()}
                    </div>
                  </td>

                  <td className="p-4">
                    {story.status === "Draft" ? (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">
                        Draft
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                        Publish
                      </span>
                    )}
                  </td>
                  <td className="p-4 flex gap-2 text-right">
                    {/* Detail button */}
                    <button
                      onClick={() =>
                        (window.location.href = `/story/detail/${story.id}`)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <FiEye className="text-indigo-500" />
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() =>
                        (window.location.href = `/story/edit/${story.id}`)
                      }
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <FiEdit className="text-blue-500" />
                    </button>

                    {/* Delete button */}
                    <button
                      data-testid={`delete-button-${story.id}`}
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this story?"
                          )
                        ) {
                          deleteStory(story.id)
                            .then(() => {
                              setStories(
                                stories.filter((s) => s.id !== story.id)
                              );
                              alert("Story deleted successfully!");
                            })
                            .catch((err) => {
                              console.error(err);
                              alert("Failed to delete story");
                            });
                        }
                      }}
                      className="p-2 rounded hover:bg-gray-100"
                    >
                      <FiTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-4 text-center" colSpan={7}>
                  No stories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
        <p>
          Menampilkan {paginatedStories.length} dari {filteredStories.length}{" "}
          data
        </p>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              className={`px-3 py-1 rounded ${
                currentPage === idx + 1
                  ? "bg-orange-500 text-white"
                  : "bg-white border"
              }`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal Filter */}
      {showFilter && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filter</h2>
              <button
                onClick={() => setShowFilter(false)}
                className="text-xl font-bold text-gray-400 hover:text-black"
              >
                &times;
              </button>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Category</label>
              <div className="relative">
                <select
                  className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Category</option>
                  <option>Financial</option>
                  <option>Technology</option>
                  <option>Health</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="mb-6">
              <label className="block mb-1 font-semibold">Status</label>
              <div className="relative">
                <select
                  className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option>Draft</option>
                  <option>Publish</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between">
              <button
                className="flex-1 px-4 py-2 border rounded-full text-black hover:bg-gray-100 mr-2"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedStatus("");
                  setShowFilter(false);
                }}
              >
                Reset
              </button>
              <button
                className="flex-1 px-4 py-2 border rounded-full text-black hover:bg-gray-100 mr-2"
                onClick={() => setShowFilter(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 px-4 py-2 bg-orange-500 rounded-full text-white hover:bg-orange-600"
                onClick={() => setShowFilter(false)}
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
