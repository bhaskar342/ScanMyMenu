import { FaLayerGroup, FaArrowRight, FaFolderOpen } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function DashboardCategoryList({ categories = [], menuItems = [] }) {
  const navigate = useNavigate();

  const getItemCount = (categoryId) =>
    menuItems.filter((item) => item.category?._id === categoryId).length;

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/20 to-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative p-3 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            {/* Icon Badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg">
                <FaLayerGroup className="text-white w-5 h-5" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Categories
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {categories.length} total categories
              </p>
            </div>
          </div>

          {/* View All Button */}
          <button
            onClick={() => navigate("/admin/menu-items")}
            className="group flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm transform hover:scale-105"
          >
            <span>View All</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        </div>

        {/* Categories List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {categories.slice(0, 6).map((cat, index) => {
            const itemCount = getItemCount(cat._id);
            return (
              <div
                key={cat._id}
                className="group relative bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-white rounded-2xl p-3 border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Category Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        cat.isActive
                          ? "bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white"
                          : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500 group-hover:from-gray-300 group-hover:to-gray-400"
                      }`}
                    >
                      <MdCategory className="w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate mb-1">
                        {cat.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex-shrink-0">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-300 ${
                        cat.isActive
                          ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-300"
                          : "bg-gradient-to-r from-red-50 to-red-100 text-red-700 border-red-300"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          cat.isActive ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      ></span>
                      <span className="hidden sm:inline">
                        {cat.isActive ? "Active" : "Inactive"}
                      </span>
                      <span className="sm:hidden">
                        {cat.isActive ? "✓" : "✕"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:to-blue-400/5 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <FaFolderOpen className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-base font-semibold text-gray-700 mb-2">
                No Categories Yet
              </h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                Create categories to organize your menu
              </p>
              <button
                onClick={() => navigate("/admin/menu-items")}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
              >
                <FaLayerGroup className="w-3 h-3" />
                <span>Add Categories</span>
              </button>
            </div>
          )}
        </div>

        {/* Show More Indicator */}
        {categories.length > 6 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Showing 6 of {categories.length} categories •{" "}
              <button
                onClick={() => navigate("/admin/menu-items")}
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                View all
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"></div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2563eb;
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 #f1f1f1;
        }
      `}</style>
    </div>
  );
}
