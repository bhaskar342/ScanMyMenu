import { useContext, useMemo, useState, useEffect } from "react";
import { TableContext } from "../../context/TableAndQrContext";
import { SettingContext } from "../../context/SettingsContext";
import { MenuContext } from "../../context/MenuContext";
import DashboardCards from "../../components/admin/DashboardCards";
import { CategoryContext } from "../../context/CategoryContext";
import { OpenStatusCard } from "../../components/admin/OpenStatusCard";
import { MenuHealthCards } from "../../components/admin/MenuHealthCards";
import { MostScannedTableCard } from "../../components/admin/MostScannedTableCard";
import { DashboardCategoryList } from "../../components/admin/DashboardCategoryList";
import { DashboardMenuItemsList } from "../../components/admin/DashboardMenuItemsList";
import Footer from "../../components/Footer";
import DashboardSkeleton from "../../components/DashboardSkeleton";
import RestaurantOverviewCard from "../../components/admin/RestaurantOverviewCard";
import { MdDashboard } from "react-icons/md";

export default function AdminDashboard() {
  const { tables = [] } = useContext(TableContext);
  const { menuItems } = useContext(MenuContext);
  const { categories } = useContext(CategoryContext);
  const { settings, updateSettings } = useContext(SettingContext);

  // ================= MENU HEALTH METRICS =================
  const totalItems = menuItems?.length || 0;

  const activeItems = useMemo(
    () => menuItems?.filter((item) => item.isAvailable === true).length || 0,
    [menuItems]
  );
  const isLoading =
    !settings ||
    Object.keys(settings).length === 0 ||
    menuItems === undefined ||
    categories === undefined ||
    tables === undefined;

  const inactiveItems = totalItems - activeItems;

  const emptyCategories = categories.filter((category) => {
    return !menuItems.some((item) => item.category?._id === category._id);
  }).length;

  const topTable = tables.reduce(
    (max, t) => (t.scanCount > max.scanCount ? t : max),
    tables[0]
  );

  const toggleOpen = async () => {
    await updateSettings({
      isOpen: !settings.isOpen,
    });
  };

  return (
    <div className="min-h-screen ">
      <div className="w-full sm:px-4 lg:px-6 sm:pt-8 ">
        <div className=" mx-auto space-y-6 sm:space-y-8">
          {isLoading ? (
            <DashboardSkeleton />
          ) : (
            <>
              {/* ===== HEADER ===== */}
              <div className="relative">
                {/* Decorative Background */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-3xl -z-10"></div>

                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-3 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Title Section */}
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl blur-lg opacity-50"></div>
                        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-xl">
                          <MdDashboard className="w-8 h-8 sm:w-10 sm:h-10" />
                        </div>
                      </div>

                      <div>
                        <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                          Dashboard
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                          Real-time overview of your restaurant
                        </p>
                      </div>
                    </div>

                    {/* Open Status Card */}
                    <div className="lg:self-start">
                      <OpenStatusCard
                        isOpen={settings.isOpen}
                        onToggle={toggleOpen}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== METRICS CARDS ===== */}
              <div>
                <DashboardCards
                  totalItems={menuItems.length}
                  activeCategories={categories.filter((c) => c.isActive).length}
                  totalScans={tables.reduce((sum, t) => sum + t.scanCount, 0)}
                  totalTables={tables.length}
                  inactiveItems={inactiveItems}
                />
              </div>

              {/* ===== INSIGHTS & HEALTH SECTION ===== */}
              <div className="grid grid-cols-1 gap-6">
                {/* Most Scanned Table */}
                {topTable && (
                  <div>
                    <MostScannedTableCard table={topTable} />
                  </div>
                )}

                {/* Health Alerts */}
                {(inactiveItems > 0 || emptyCategories > 0) && (
                  <div>
                    <MenuHealthCards
                      inactiveItems={inactiveItems}
                      emptyCategories={emptyCategories}
                    />
                  </div>
                )}
              </div>

              {/* ===== MENU & CATEGORY LISTS ===== */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCategoryList
                  categories={categories}
                  menuItems={menuItems}
                />
                <DashboardMenuItemsList menuItems={menuItems} />
              </div>
              {/* ===== RESTAURANT OVERVIEW ===== */}
              <div>
                <RestaurantOverviewCard restaurant={settings} />
              </div>

              {/* ===== FOOTER ===== */}
              <div className="mt-12">
                <Footer />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
