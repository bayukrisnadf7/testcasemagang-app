import React, { useEffect, useState } from "react";
import { getStories } from "../../services/storyService";
import { getChapters } from "../../services/chapterService";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [storyCount, setStoryCount] = useState(0);
  const [chapterCount, setChapterCount] = useState(0);

  useEffect(() => {
    getStories()
      .then((res) => setStoryCount(res.data.length))
      .catch(console.error);

    getChapters()
      .then((res) => setChapterCount(res.data.length))
      .catch(console.error);
  }, []);

  // Data chart
  const data = [
    { name: "Stories", count: storyCount },
    { name: "Chapters", count: chapterCount },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Box Ringkasan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Total Stories</h2>
          <p className="text-3xl font-bold text-orange-500">{storyCount}</p>
        </div>

        <div className="p-4 bg-white shadow rounded">
          <h2 className="text-lg font-semibold mb-2">Total Chapters</h2>
          <p className="text-3xl font-bold text-orange-500">{chapterCount}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 p-4 bg-white shadow rounded">
        <h2 className="text-lg font-semibold mb-4">Overview Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
