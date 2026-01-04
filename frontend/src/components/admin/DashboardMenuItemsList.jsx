import { FaUtensils, FaStar, FaArrowRight } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export function DashboardMenuItemsList({ menuItems = [] }) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl"></div>

      <div className="relative p-3 sm:p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
          <div className="flex items-center gap-3">
            {/* Icon Badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                <FaUtensils className="text-white w-5 h-5" />
              </div>
            </div>

            {/* Title */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Menu Items
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                {menuItems.length} total items
              </p>
            </div>
          </div>

          {/* Manage Button */}
          <button
            onClick={() => navigate("/admin/menu-items")}
            className="group flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm transform hover:scale-105"
          >
            <span>Manage All</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>

        {/* Menu Items List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {menuItems.slice(0, 6).map((item, index) => (
            <div
              key={item._id}
              className="group relative bg-white hover:bg-gradient-to-r hover:from-emerald-50 hover:to-white rounded-2xl p-3 border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Item Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                      {item.name}
                    </h4>
                    {item.isBestSeller && (
                      <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm flex-shrink-0">
                        <FaStar className="w-2.5 h-2.5" />
                        <span className="hidden sm:inline">Best</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-emerald-700 font-bold text-base sm:text-lg">
                      ₹{item.basePrice}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {item.category?.name || "Uncategorized"}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex-shrink-0">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-300 ${
                      item.isAvailable
                        ? "bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 border-emerald-300"
                        : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.isAvailable ? "bg-emerald-500" : "bg-gray-400"
                      }`}
                    ></span>
                    <span className="hidden sm:inline">
                      {item.isAvailable ? "Available" : "Hidden"}
                    </span>
                    <span className="sm:hidden">
                      {item.isAvailable ? "✓" : "✕"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 group-hover:to-emerald-400/5 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}

          {/* Empty State */}
          {menuItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 px-6">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 shadow-md">
                <MdRestaurantMenu className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-base font-semibold text-gray-700 mb-2">
                No Menu Items Yet
              </h4>
              <p className="text-sm text-gray-500 text-center mb-4">
                Start adding delicious items to your menu
              </p>
              <button
                onClick={() => navigate("/admin/menu-items")}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-sm"
              >
                <FaUtensils className="w-3 h-3" />
                <span>Add Items</span>
              </button>
            </div>
          )}
        </div>

        {/* Show More Indicator */}
        {menuItems.length > 6 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-center text-gray-500">
              Showing 6 of {menuItems.length} items •{" "}
              <button
                onClick={() => navigate("/admin/menu-items")}
                className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline"
              >
                View all
              </button>
            </p>
          </div>
        )}
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>

      {/* Custom Scrollbar Styles */}
      <style jsx="true">{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #10b981 #f1f1f1;
        }
      `}</style>
    </div>
  );
}
