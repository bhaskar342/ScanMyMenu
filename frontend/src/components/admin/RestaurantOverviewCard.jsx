import {
  FaStore,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

export default function RestaurantOverviewCard({ restaurant }) {
  if (!restaurant) return null;

  return (
    <div className="hidden sm:block relative bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-3xl shadow-xl border border-emerald-100 sm:p-5 overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-100/30 to-transparent rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-4">
          <div className="flex items-start gap-4">
            {/* Restaurant Icon */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur-lg opacity-50"></div>
              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-xl transform hover:scale-105 transition-transform duration-300">
                <FaStore className="w-8 h-8 sm:w-8 sm:h-8" />
              </div>
            </div>

            {/* Title Section */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
                  {restaurant.name}
                </h2>
                <HiSparkles className="text-emerald-500 w-5 h-5 flex-shrink-0" />
              </div>
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Restaurant Overview
              </p>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex gap-3 flex-wrap">
            <StatusBadge
              label={restaurant.isOpen ? "Open Now" : "Closed"}
              active={restaurant.isOpen}
              type="open"
            />
            <StatusBadge
              label={restaurant.isActive ? "Active" : "Inactive"}
              active={restaurant.isActive}
              type="active"
            />
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
          <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
            Details
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
          <InfoItem
            icon={<FaUser />}
            label="Owner"
            value={restaurant.ownerName}
          />

          <InfoItem
            icon={<FaEnvelope />}
            label="Email"
            value={restaurant.email}
          />

          <InfoItem
            icon={<FaPhone />}
            label="Phone"
            value={restaurant.phoneNumber}
          />

          <InfoItem
            icon={<FaMoneyBillWave />}
            label="Currency"
            value={restaurant.currency}
          />

          <InfoItem
            icon={<FaMapMarkerAlt />}
            label="Address"
            value={restaurant.address}
            full
          />
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>
    </div>
  );
}

/* ---------- Small Reusable Pieces ---------- */

function InfoItem({ icon, label, value, full = false }) {
  return (
    <div
      className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl p-3 border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        full ? "sm:col-span-2 xl:col-span-3" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-600 group-hover:from-emerald-500 group-hover:to-emerald-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <span className="text-lg sm:text-xl">{icon}</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-sm sm:text-base font-semibold text-gray-900 leading-relaxed break-words">
            {value || (
              <span className="text-gray-400 italic">Not provided</span>
            )}
          </p>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/10 group-hover:to-teal-400/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  );
}

function StatusBadge({ label, active, type }) {
  const colors = active
    ? type === "open"
      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400"
      : "bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400"
    : "bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400";

  return (
    <div
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border-2 shadow-lg ${colors} transform hover:scale-105 transition-all duration-300`}
    >
      {/* Icon */}
      <div className="relative">
        {active ? (
          <FaCheckCircle className="w-4 h-4" />
        ) : (
          <FaTimesCircle className="w-4 h-4" />
        )}
      </div>

      {/* Label */}
      <span className="whitespace-nowrap">{label}</span>

      {/* Shine Effect */}
      {active && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      )}
    </div>
  );
}

/* Add shimmer animation */
const style = document.createElement("style");
style.textContent = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-shimmer {
    animation: shimmer 3s infinite;
  }
`;
document.head.appendChild(style);
