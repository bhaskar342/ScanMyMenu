import {
  FaExclamationTriangle,
  FaEyeSlash,
  FaFolderOpen,
} from "react-icons/fa";
import { MdWarning } from "react-icons/md";

export function MenuHealthCards({ inactiveItems = 0, emptyCategories = 0 }) {
  const hasIssues = inactiveItems > 0 || emptyCategories > 0;

  if (!hasIssues) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
      {/* Inactive Items Card */}
      {inactiveItems > 0 && (
        <div className="group relative bg-gradient-to-br from-red-50 via-white to-red-50 rounded-2xl p-2 sm:p-6 shadow-lg hover:shadow-xl border-2 border-red-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-200/30 to-transparent rounded-full blur-2xl"></div>

          {/* Warning Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full shadow-lg animate-pulse">
              <MdWarning className="text-white w-4 h-4" />
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-red-500 to-red-600 p-2 sm:p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaEyeSlash className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-red-700 mb-1 sm:mb-2 flex items-center gap-2">
                Inactive Menu Items
              </h3>

              <p className="text-sm sm:text-base text-red-600 mb-3 leading-relaxed">
                {inactiveItems} {inactiveItems === 1 ? "item is" : "items are"}{" "}
                currently hidden from customers
              </p>

              {/* Count Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-red-200 px-2 sm:px-5 sm:py-1 rounded-full mb-1 border border-red-300">
                <span className="text-2xl font-black text-red-700">
                  {inactiveItems}
                </span>
                <span className="text-sm font-semibold text-red-600">
                  {inactiveItems === 1 ? "Item" : "Items"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-400 to-transparent"></div>
        </div>
      )}

      {/* Empty Categories Card */}
      {emptyCategories > 0 && (
        <div className="group relative bg-gradient-to-br from-yellow-50 via-white to-yellow-50 rounded-2xl p-2 sm:p-6 shadow-lg hover:shadow-xl border-2 border-yellow-200 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-2xl"></div>

          {/* Warning Badge */}
          <div className="absolute top-3 right-3">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-2 rounded-full shadow-lg animate-pulse">
              <MdWarning className="text-white w-4 h-4" />
            </div>
          </div>

          <div className="relative flex items-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-yellow-500 to-yellow-600 p-2 sm:p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  <FaFolderOpen className="text-white w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-yellow-700 sm:mb-2 flex items-center gap-2">
                Empty Categories
              </h3>

              <p className="text-sm sm:text-base text-yellow-600 mb-3 leading-relaxed">
                {emptyCategories}{" "}
                {emptyCategories === 1 ? "category has" : "categories have"} no
                menu items added
              </p>

              {/* Count Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-yellow-200  px-2 sm:px-5 sm:py-1 rounded-full mb-1 border border-yellow-300">
                <span className="text-2xl font-black text-yellow-700">
                  {emptyCategories}
                </span>
                <span className="text-sm font-semibold text-yellow-600">
                  {emptyCategories === 1 ? "Category" : "Categories"}
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        </div>
      )}
    </div>
  );
}
