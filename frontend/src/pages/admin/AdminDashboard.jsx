import { useContext, useMemo, useState, useEffect } from "react";
import { TableContext } from "../../context/TableAndQrContext";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";

function Sparkline({ points = [], className = "" }) {
  if (!points.length) return null;
  const w = 60;
  const h = 20;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      className={`inline-block ${className}`}
      preserveAspectRatio="none"
    >
      <path d={path} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AreaChart({ series }) {
  const w = 560;
  const h = 160;
  const max = Math.max(...series.map((s) => s.value));
  const min = Math.min(...series.map((s) => s.value));
  const range = max - min || 1;
  const points = series
    .map((s, i) => {
      const x = (i / (series.length - 1)) * w;
      const y = h - ((s.value - min) / range) * h;
      return `${x},${y}`;
    })
    .join(" ");
  const areaPath = `M0,${h} L${points} L${w},${h} Z`;
  const linePath = `M${points}`;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-40"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#g1)" />
      <path
        d={linePath}
        fill="none"
        stroke="#059669"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// helper: compare local date (year, month, day)
function isSameLocalDay(aDate, bDate) {
  const a = new Date(aDate);
  const b = new Date(bDate);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const { tables = [] } = useContext(TableContext);
  const { menuItems } = useContext(MenuContext);

  // ================= MENU HEALTH METRICS =================
  const totalItems = menuItems?.length || 0;

  const activeItems = useMemo(
    () => menuItems?.filter((item) => item.isAvailable === true).length || 0,
    [menuItems]
  );

  const inactiveItems = totalItems - activeItems;

  const healthPercent = totalItems
    ? Math.round((activeItems / totalItems) * 100)
    : 0;

  // ================= QR ANALYTICS (MOCK) =================
  const qrScansToday = 38;
  const qrScansThisWeek = 214;

  const qrTrend = useMemo(
    () => [12, 18, 24, 20, 30, 35, 38], // sparkline points
    []
  );
  console.log("menu items:", menuItems);
  return (
    <div className="p-2 md:p-6 py-lg-4 px-lg-3">
      <div className="max-w-[1280px] mx-auto space-y-6">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-emerald-900">
              Dashboard
            </div>
            <span className="text-sm text-gray-500 mt-1">
              Real-time view of your restaurant items.
            </span>
          </div>
        </div>
        {/* ================= STATS CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Menu Items */}
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <p className="text-xl text-gray-500">Total Menu Items</p>
            <h3 className="text-4xl font-semibold text-gray-800 mt-1">
              {totalItems}
            </h3>
          </div>

          {/* Active Items */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Active Items</p>
            <h3 className="text-2xl font-semibold text-emerald-600 mt-1">
              {activeItems}
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {healthPercent}% of menu active
            </p>
          </div>

          {/* Out of Stock */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">Out of Stock</p>
            <h3 className="text-2xl font-semibold text-red-500 mt-1">
              {inactiveItems}
            </h3>
          </div>

          {/* QR Scans */}
          <div className="bg-white rounded-xl p-4 shadow-sm border">
            <p className="text-sm text-gray-500">QR Scans (Today)</p>
            <div className="flex items-center justify-between mt-1">
              <h3 className="text-2xl font-semibold text-gray-800">
                {qrScansToday}
              </h3>
              <Sparkline points={qrTrend} className="text-emerald-500" />
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {qrScansThisWeek} scans this week
            </p>
          </div>
        </div>
        {/* ================= MENU HEALTH ================= */}
        <div className="bg-white rounded-xl p-5 shadow-sm border">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-800">Menu Health</h4>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                healthPercent > 80
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {healthPercent > 80 ? "Healthy" : "Needs Attention"}
            </span>
          </div>

          <div className="mt-3 w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all"
              style={{ width: `${healthPercent}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Keep your menu updated to improve customer experience.
          </p>
        </div>
      </div>
    </div>
  );
}
