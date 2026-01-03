import { FaDoorOpen, FaDoorClosed } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export function OpenStatusCard({ isOpen, onToggle }) {
  return (
    <div className="relative group">
      {/* Decorative Glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
          isOpen
            ? "from-emerald-400 to-emerald-600"
            : "from-gray-400 to-gray-600"
        }`}
      ></div>

      {/* Main Card */}
      <div
        className={`relative bg-gradient-to-br rounded-2xl shadow-xl border-2 p-3 sm:p-6 transition-all duration-300 ${
          isOpen
            ? "from-emerald-50 via-white to-emerald-50 border-emerald-300"
            : "from-gray-50 via-white to-gray-50 border-gray-300"
        }`}
      >
        <div className="flex items-center justify-between gap-6">
          {/* Left Section - Status Info */}
          <div className="flex items-start gap-4">
            {/* Icon Badge */}
            <div
              className={`relative flex-shrink-0 transition-all duration-300 ${
                isOpen ? "animate-bounce-slow" : ""
              }`}
            >
              <div
                className={`absolute inset-0 rounded-xl blur-md opacity-50 ${
                  isOpen
                    ? "bg-gradient-to-br from-emerald-400 to-emerald-600"
                    : "bg-gradient-to-br from-gray-400 to-gray-600"
                }`}
              ></div>
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                  isOpen
                    ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                    : "bg-gradient-to-br from-gray-500 to-gray-600"
                }`}
              >
                {isOpen ? (
                  <FaDoorOpen className="w-6 h-6 sm:w-7 sm:h-7" />
                ) : (
                  <FaDoorClosed className="w-6 h-6 sm:w-7 sm:h-7" />
                )}
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs sm:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Restaurant Status
                </span>
                {isOpen && (
                  <HiSparkles className="text-emerald-500 w-4 h-4 animate-pulse" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`text-2xl sm:text-3xl font-black transition-colors duration-300 ${
                    isOpen ? "text-emerald-600" : "text-gray-600"
                  }`}
                >
                  {isOpen ? "Open" : "Closed"}
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isOpen ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
                  }`}
                ></div>
              </div>
              <p
                className={`text-xs sm:text-sm mt-1 ${
                  isOpen ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                {isOpen ? "Accepting orders" : "Not accepting orders"}
              </p>
            </div>
          </div>

          {/* Right Section - Toggle */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={onToggle}
              className={`relative w-16 h-8 sm:w-20 sm:h-10 rounded-full flex items-center px-1 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                isOpen
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
              }`}
              aria-label={isOpen ? "Close restaurant" : "Open restaurant"}
            >
              <span
                className={`h-6 w-6 sm:h-8 sm:w-8 bg-white rounded-full shadow-xl transform transition-all duration-300 flex items-center justify-center ${
                  isOpen ? "translate-x-8 sm:translate-x-10" : ""
                }`}
              >
                {isOpen ? (
                  <FaDoorOpen className="text-emerald-600 w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  <FaDoorClosed className="text-gray-600 w-3 h-3 sm:w-4 sm:h-4" />
                )}
              </span>
            </button>
            <span className="text-xs font-medium text-gray-500">
              Tap to toggle
            </span>
          </div>
        </div>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
