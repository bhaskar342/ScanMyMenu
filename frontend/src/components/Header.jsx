import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Search, X, Menu } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

function Header({ isMobileSidebarOpen, setIsMobileSidebarOpen, sidebaritems }) {
  const { restaurant } = useContext(AuthContext);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-14 sm:h-16 bg-white/95 backdrop-blur-xl shadow-sm z-40 border-b border-gray-200/60">
        <div className="h-full px-3 sm:px-4 md:px-6 flex items-center justify-between gap-3 w-full overflow-hidden">
          {/* LEFT: MOBILE MENU */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="sm:hidden p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-md active:scale-95 transition-all"
            >
              {isMobileSidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* CENTER: HEADER NAV (DESKTOP ONLY) */}
          <nav className="hidden sm:flex items-center gap-6">
            {sidebaritems.map((item) => {
              const Icon = item.icon; // 👈 IMPORTANT
              return (
                <NavLink
                  key={item.id}
                  to={`/${item.path}`}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-sm font-medium transition-all text-decoration-none ${
                      isActive
                        ? "text-emerald-600 border-b-2 border-emerald-600"
                        : "text-gray-600 hover:text-emerald-500"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="sm:hidden text-2xl font-semibold text-emerald-700">
            {restaurant?.name || "Restaurant"}
          </div>

          {/* RIGHT: USER PROFILE */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden lg:flex flex-col text-right">
              <span className="text-base font-semibold text-gray-800">
                {restaurant?.ownerName || "Owner"}
              </span>
              <span className="text-xs text-gray-500 uppercase">
                {restaurant?.role || "NA"}
              </span>
            </div>

            <button onClick={() => navigate(`/${restaurant?.role}/settings`)}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
                {restaurant?.ownerName ? restaurant.ownerName.charAt(0).toUpperCase() : "S"}
              </div>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
