import { NavLink } from "react-router-dom";

function SideBar({
  isMobileSidebarOpen,
  setIsMobileSidebarOpen,
  sidebaritems,
}) {
  // Menu Item Component
  const MenuItem = ({ item, onClick }) => (
    <NavLink
      to={`/${item.path}`}
      onClick={onClick}
      className={({ isActive }) =>
        `flex text-decoration-none items-center space-x-3 p-2.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${
          isActive
            ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30"
            : "text-white hover:bg-white/5 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`p-2 rounded-xl transition-all ${
              isActive
                ? "bg-white/20 shadow-lg"
                : "bg-white/5 group-hover:bg-white/10"
            }`}
          >
            <item.icon
              className={`w-5 h-5 ${
                isActive
                  ? "text-white"
                  : "text-emerald-400 group-hover:text-emerald-300"
              } transition-all group-hover:scale-110`}
            />
          </div>
          <span className="font-medium text-[15px]">{item.label}</span>
        </>
      )}
    </NavLink>
  );
  return (
    <>
      {isMobileSidebarOpen && (
        <>
          <div
            className="sm:hidden fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-40 top-14"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <aside className="sm:hidden fixed left-0 top-14 bottom-0 w-56 bg-gradient-to-b from-emerald-900 via-emerald-800 to-teal-800 shadow-2xl z-50 transform transition-all duration-300 border-r border-emerald-900/30">
            <div className="h-full flex flex-col">
              <nav className="flex-1 p-2 space-y-1.5 overflow-y-auto">
                {sidebaritems.map((item, index) => (
                  <MenuItem
                    key={index}
                    item={item}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    isMobile={true}
                  />
                ))}
              </nav>
            </div>
          </aside>
        </>
      )}
    </>
  );
}

export default SideBar;
