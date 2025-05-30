import { NavLink } from "react-router-dom";
import { IoLibrary } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdHistoryEdu } from "react-icons/md";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white text-black fixed top-0 left-0 p-6 shadow">
      <div className="flex items-center justify-center mb-8">
        <MdHistoryEdu className="inline-block mr-2 text-[#129990]" size={30} />
        <h2 className="text-2xl font-bold  text-[#129990]">
          STORYKU
        </h2>
      </div>
      <nav className="space-y-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-[#129990] text-white flex items-center"
                : "hover:bg-gray-200"
            }`
          }
        >
          <MdDashboard className="inline-block mr-2" />
          Dashboard
        </NavLink>
        <NavLink
          to="/story"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${
              isActive
                ? "bg-[#129990] text-white flex items-center"
                : "hover:bg-gray-200"
            }`
          }
        >
          <IoLibrary className="inline-block mr-2" />
          Story Management
        </NavLink>
      </nav>
    </aside>
  );
}
