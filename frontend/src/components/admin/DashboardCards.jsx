import { FaUtensils, FaQrcode, FaLayerGroup } from "react-icons/fa";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import { HiTrendingUp } from "react-icons/hi";

export default function DashboardCards({
  totalItems = 0,
  activeCategories = 0,
  totalScans = 0,
  totalTables = 0,
}) {
  const cards = [
    {
      label: "Menu Items",
      value: totalItems,
      icon: <FaUtensils />,
      gradient: "from-emerald-500 to-emerald-600",
      lightBg: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-500",
      textColor: "text-emerald-700",
    },
    {
      label: "Active Categories",
      value: activeCategories,
      icon: <FaLayerGroup />,
      gradient: "from-blue-500 to-blue-600",
      lightBg: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
      textColor: "text-blue-700",
    },
    {
      label: "Total QR Scans",
      value: totalScans,
      icon: <MdOutlineQrCodeScanner />,
      gradient: "from-purple-500 to-purple-600",
      lightBg: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-500",
      textColor: "text-purple-700",
    },
    {
      label: "Tables / QRs",
      value: totalTables,
      icon: <FaQrcode />,
      gradient: "from-orange-500 to-orange-600",
      lightBg: "from-orange-50 to-orange-100",
      iconBg: "bg-orange-500",
      textColor: "text-orange-700",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
        >
          {/* Decorative Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.lightBg} opacity-50`}
          ></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/50 to-transparent rounded-full blur-2xl"></div>

          {/* Content */}
          <div className="relative p-2.5 sm:p-4">
            {/* Icon Badge */}
            <div className="flex items-start justify-between mb-2 sm:mb-3">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
                ></div>
                <div
                  className={`relative bg-gradient-to-br ${card.gradient} p-2 sm:p-3 rounded-xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <span className="text-white text-base sm:text-xl">
                    {card.icon}
                  </span>
                </div>
              </div>

              {/* Trending Icon */}
              <div
                className={`bg-gradient-to-br ${card.lightBg} p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              >
                <HiTrendingUp className={`w-4 h-4 ${card.textColor}`} />
              </div>
            </div>

            {/* Label */}
            <div className="mb-1 ">
              <h3 className="text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wide">
                {card.label}
              </h3>
            </div>

            {/* Value */}
            <div className="flex items-baseline gap-2">
              <div
                className={`text-3xl sm:text-5xl font-black ${card.textColor} group-hover:scale-105 transition-transform duration-300`}
              >
                {card.value}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="sm:mt-4 mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${card.gradient} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          {/* Bottom Accent */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          {/* Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>
      ))}
    </div>
  );
}
