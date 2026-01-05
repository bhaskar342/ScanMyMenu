import React, { useState } from "react";
import { Home, QrCode, Users } from "lucide-react";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

function SuperAdminLayout() {
  const sidebaritems = [
    {
      id: "home",
      icon: Home,
      label: "Home",
      badge: null,
      path: "superadmin/dashboard",
    },
    {
      id: "qr-codes",
      icon: QrCode,
      label: "QR Codes",
      badge: null,
      path: "superadmin/qr-codes",
    },
    {
      id: "Restaurants",
      icon: Users,
      label: "Restaurants",
      badge: null,
      path: "superadmin/restaurants",
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
        role={"superadmin"}
      />
      {/* Main Content */}
      <div className="sm:pt-20 px-3 px-sm-4">
        <Outlet />
      </div>
    </div>
  );
}

export default SuperAdminLayout;
