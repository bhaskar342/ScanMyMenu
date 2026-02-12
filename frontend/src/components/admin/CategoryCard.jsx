import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
export default function CategoryCard({
  category,
  onEdit,
  onDelete,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div
      onClick={() => setSelectedCategory(category._id)}
      className={`relative group rounded-xl  shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 
  ${
    selectedCategory === category._id
      ? category.isActive
        ? "border-2 border-emerald-500 transform scale-105 bg-gradient-to-br from-emerald-50 to-emerald-100 ring-2 ring-emerald-200"
        : "border-2 border-red-500 transform scale-105 bg-gradient-to-br from-red-50 to-red-100 ring-2 ring-red-200"
      : category.isActive
      ? "bg-gradient-to-br from-white to-emerald-50 hover:from-emerald-50 hover:to-emerald-100 border border-emerald-200"
      : "bg-gradient-to-br from-white to-red-50 hover:from-red-50 hover:to-red-100 border border-red-200"
  }
`}
    >
      {/* Desktops Action Buttons - Top Right Corner */}
      <div className="absolute top-2 right-2 hidden sm:flex gap-1.5 transition-opacity duration-200">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
          className="bg-white/90 backdrop-blur-sm text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg p-1.5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Edit category"
        >
          <MdOutlineEdit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category._id);
          }}
          className="bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-600 hover:text-white rounded-lg p-1.5 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Delete category"
        >
          <MdDeleteOutline className="h-4 w-4" />
        </button>
      </div>

      {/* Category Name */}
      <div className="px-3 py-2">
        <div
          className={`font-semibold md:text-xl text-base truncate ${
            selectedCategory === category._id
              ? category.isActive
                ? "text-emerald-800"
                : "text-red-800"
              : category.isActive
              ? "text-gray-800"
              : "text-gray-700"
          }`}
        >
          {category.name}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 mt-2">
          <div
            className={`w-2 h-2 rounded-full  ${
              category.isActive ? "bg-emerald-500" : "bg-red-500"
            }`}
          ></div>
          <span
            className={`text-xs font-medium ${
              category.isActive ? "text-emerald-700" : "text-red-700"
            }`}
          >
            {category.isActive ? "Active" : "Inactive"}
          </span>
        </div>
      </div>

      {/* MOBILE ACTION BAR */}
      <div className="flex sm:hidden border-t p-2 justify-center gap-3 rounded-xl bg-gray-50">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
          className="bg-white/90 backdrop-blur-sm text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg p-1 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Edit category"
        >
          <MdOutlineEdit className="h-4 w-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setConfirmMessage("Are you sure you want to delete this category?");
            setConfirmAction(() => () => onDelete(category._id));
          }}
          className="bg-white/90 backdrop-blur-sm text-red-600 hover:bg-red-600 hover:text-white rounded-lg p-1 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-110"
          title="Delete category"
        >
          <MdDeleteOutline className="h-4 w-4" />
        </button>
      </div>

      {/* Selected Indicator */}
      {selectedCategory === category._id && (
        <div
          className={`hidden sm:absolute bottom-0 left-0 right-0 h-1 ${
            category.isActive ? "bg-emerald-500" : "bg-red-500"
          }`}
        ></div>
      )}
    </div>
  );
}
