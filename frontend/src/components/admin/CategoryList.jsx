import { useState } from "react";
import CategoryCard from "./CategoryCard";
import ConfirmModal from "../ConfirmationModal";

export default function CategoryList({
  categories,
  onEdit,
  onDelete,
  selectedCategory,
  setSelectedCategory,
}) {
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  return (
    <div className="w-full overflow-x-auto p-2 sm:overflow-x-hidden">
      <div className="flex flex-row sm:flex-col gap-3">
        {/* ALL ITEMS BUTTON */}
        <div
          onClick={() => setSelectedCategory("all")}
          className={`flex items-center  justify-center p-3 md:px-6 md:py-4 rounded-xl shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 font-semibold ${
            selectedCategory === "all"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-700 text-white ring-2 ring-emerald-300 transform scale-105"
              : "bg-gradient-to-r from-white to-emerald-50 text-gray-800 border border-emerald-200 hover:from-emerald-50 hover:to-emerald-100"
          }`}
        >
          <span className="text-base truncate ">All Items</span>
          {selectedCategory === "all" && (
            <div className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          )}
        </div>

        {/* CATEGORY CARDS */}
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <div className="text-gray-400 mb-2">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div className="text-gray-600 font-medium text-center">
              No Categories Added Yet
            </div>
            <div className="text-gray-500 text-sm mt-1 text-center">
              Click "Add Category" to get started
            </div>
          </div>
        ) : (
          categories?.map((cat) => (
            <CategoryCard
              key={cat._id}
              category={cat}
              onEdit={onEdit}
              onDelete={(id) => {
                setConfirmMessage(
                  "Are you sure you want to delete this category?"
                );
                setConfirmAction(() => () => onDelete(id));
              }}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))
        )}
      </div>
      <ConfirmModal
        message={confirmMessage}
        onCancel={() => {
          setConfirmMessage("");
          setConfirmAction(null);
        }}
        onConfirm={() => {
          confirmAction?.();
          setConfirmMessage("");
          setConfirmAction(null);
        }}
      />
    </div>
  );
}
