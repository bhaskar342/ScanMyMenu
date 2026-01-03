import { FaQrcode, FaCrown } from "react-icons/fa";
import { HiTrendingUp } from "react-icons/hi";

export function MostScannedTableCard({ table }) {
  if (!table) return null;

  return (
    <div className="group relative bg-gradient-to-br from-white via-emerald-50/30 to-white rounded-2xl p-2 sm:p-4 shadow-lg hover:shadow-2xl border border-emerald-100 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/30 to-transparent rounded-full blur-xl"></div>

      {/* Crown Badge */}
      <div className="absolute top-3 right-3">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-2 rounded-full shadow-lg animate-pulse">
          <FaCrown className="text-white w-4 h-4" />
        </div>
      </div>

      <div className="relative flex items-start gap-5">
        {/* Icon Section */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative bg-gradient-to-br from-emerald-500 to-emerald-600 p-2 sm:p-4 rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
              <FaQrcode className="text-white w-5 h-5 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:mb-2">
            <HiTrendingUp className="text-emerald-600 w-5 h-5" />
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Top Performer
            </span>
          </div>

          <h3 className="sm:text-2xl text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">
            {table.name}
          </h3>

          <p className="text-xs sm:text-sm text-gray-500 mb-1   sm:mb-3">Most Scanned Table</p>

          {/* Stats Bar */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl p-1.5 sm:p-3 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Total Scans
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-emerald-600">
                    {table.scanCount}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    scans
                  </span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 h-2 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Shine Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}
