import { Triangle } from "lucide-react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaCircle } from "react-icons/fa";

export default function FoodFilterToggles({ filter, setFilter }) {
  const toggleFilter = (value) => {
    setFilter(filter === value ? null : value);
  };

  return (
    <div className="flex gap-2 flex-wrap justify-between py-2">
      {/* 🥦 Veg Filter */}
      <button
        onClick={() => toggleFilter("veg")}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-emerald-700 shadow-sm transition-all duration-300 
          ${filter === "veg" ? "bg-emerald-700/10" : "bg-white"}`}
      >
        <div
          className={`relative w-15 h-3 rounded-full transition-all ${
            filter === "veg" ? "bg-green-600" : "bg-gray-100"
          }`}
        >
          <div
            className={`absolute -top-[4px] left-0 flex bg-white items-center justify-center border rounded-lg transition-transform duration-300 w-5 h-5 border-green-600 ${
              filter === "veg" ? "translate-x-10" : "-translate-x-1"
            }`}
          >
            <FaCircle className="w-3 h-3 text-emerald-600" />
          </div>
        </div>
      </button>

      {/* 🍗 Non-Veg Filter */}
      <button
        onClick={() => toggleFilter("nonveg")}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-red-600 shadow-sm transition-all duration-300 
          ${filter === "nonveg" ? "bg-red-100" : "bg-white"}`}
      >
        <div
          className={`relative w-15 h-3 rounded-full transition-all ${
            filter === "nonveg" ? "bg-red-600" : "bg-gray-100"
          }`}
        >
          <div
            className={`absolute -top-[4px] left-0 flex items-center justify-center border h-5 w-5 rounded-lg bg-white shadow transition-transform duration-300 border-red-600 ${
              filter === "nonveg" ? "translate-x-10" : "-translate-x-1"
            }`}
          >
            <Triangle size={11} className="text-red-600" fill="red" />
          </div>
        </div>
      </button>

      {/* 🌟 Bestseller Filter */}
      <button
        onClick={() => toggleFilter("bestseller")}
        className={`flex items-center px-3 py-1.5 rounded-xl border shadow-sm transition-all duration-300 ${
          filter === "bestseller"
            ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
            : "bg-white border-amber-400 text-amber-600"
        }`}
      >
        <div className="flex items-center text-xs gap-1">
          <MdOutlineStarPurple500 />
          <span>Bestseller</span>
        </div>
      </button>
    </div>
  );
}
