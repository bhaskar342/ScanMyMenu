import React, { useState } from "react";
import {
  Home,
  QrCode,
  Users,
  Bell,
  ShoppingBag,
  BarChart3,
} from "lucide-react";
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
      path: "superadmin/home",
    },
    {
      id: "qr-codes",
      icon: QrCode,
      label: "QR Codes",
      badge: null,
      path: "superadmin/qr-codes",
    },
    {
      id: "customers",
      icon: Users,
      label: "Customers",
      badge: null,
      path: "superadmin/customers",
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
      <main className="pt-16 lg:pl-72 min-h-screen bg-emerald-50">
        <div className="px-3 px-sm-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default SuperAdminLayout;
