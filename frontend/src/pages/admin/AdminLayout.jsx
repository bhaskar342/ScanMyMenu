import { Home, QrCode, UtensilsCrossed } from "lucide-react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function AdminLayout() {
  const sidebaritems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      badge: null,
      path: "admin/dashboard",
    },
    {
      id: "menu-items",
      icon: UtensilsCrossed,
      label: "Menu Items",
      badge: null,
      path: "admin/menu-items",
    },
    {
      id: "qr-codes",
      icon: QrCode,
      label: "QR Codes",
      badge: null,
      path: "admin/qr-codes",
    },
  ];
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-gray-50">
      <Header
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        sidebaritems={sidebaritems}
      />
      <SideBar
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        sidebaritems={sidebaritems}
        role={"admin"}
      />
      {/* Main Content */}
      <main className="pt-16 min-h-screen bg-emerald-50">
        <div className="lg:p-4 p-2">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
