import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Settings, LogOut } from "lucide-react";
import { X, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdRestaurantMenu } from "react-icons/md";

function Header({ isMobileSidebarOpen, setIsMobileSidebarOpen, sidebaritems }) {
  const { restaurant, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 bg-white/95 backdrop-blur-2xl shadow-lg z-40 border-b-2 border-emerald-100">
      {/* Decorative gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>

      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 w-full">
        {/* LEFT: MOBILE MENU + LOGO */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="sm:hidden relative p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl blur-md opacity-50"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                <MdRestaurantMenu className="w-6 h-6" />
              </div>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold text-gray-900">
                {restaurant?.name || "Restaurant"}
              </h1>
              <p className="text-xs text-gray-500">Management Portal</p>
            </div>
          </div>
        </div>

        {/* CENTER: DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-2 bg-emerald-50/50 rounded-2xl p-1.5 border border-emerald-100">
          {sidebaritems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={`/${item.path}`}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                      : "text-gray-600 hover:bg-white hover:text-emerald-600 hover:shadow-md"
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* MOBILE TITLE - Only shown on mobile */}
        <div className="sm:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-md">
            <MdRestaurantMenu className="w-5 h-5" />
          </div>
          <span className="text-base font-bold text-gray-900">
            {restaurant?.name || "Restaurant"}
          </span>
        </div>

        {/* RIGHT: PROFILE */}
        <div
          className="relative flex items-center gap-3 flex-shrink-0"
          ref={profileRef}
        >
          {/* Restaurant Info - Desktop only */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-base font-bold text-gray-900">
              {restaurant?.name || "Owner"}
            </span>
            <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">
              {restaurant?.role || "Admin"}
            </span>
          </div>

          {/* Avatar Button */}
          <button
            onClick={() => setShowProfileMenu((p) => !p)}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 border-2 border-white">
              <span className="text-lg">
                {restaurant?.ownerName
                  ? restaurant.ownerName.charAt(0).toUpperCase()
                  : "S"}
              </span>
            </div>
          </button>

          {/* DROPDOWN MENU */}
          {showProfileMenu && (
            <div className="absolute top-14 sm:top-16 right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50 animate-slideDown">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 border-b border-emerald-100">
                <div className="font-bold text-gray-900 truncate">
                  {restaurant?.name || "Owner"}
                </div>
                <div className="text-xs text-emerald-600 font-semibold uppercase">
                  {restaurant?.role || "Admin"}
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-2">
                {/* Settings */}
                <NavLink
                  to={`/${restaurant?.role}/settings`}
                  onClick={() => {
                    navigate(`/${restaurant?.role}/settings`);
                    setShowProfileMenu(false);
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    }`
                  }
                >
                  <div className="p-2 rounded-lg bg-emerald-100 group-hover:bg-emerald-200 transition-all">
                    <Settings className="w-5 h-5 text-emerald-600 group-hover:rotate-90 transition-all duration-300" />
                  </div>
                  <span className="font-semibold">Settings</span>
                </NavLink>

                {/* Logout */}
                <button
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group mt-1"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  <div className="p-2 rounded-lg bg-red-100 group-hover:bg-red-200 transition-all">
                    <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </header>
  );
}

export default Header;
