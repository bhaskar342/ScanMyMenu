import React from "react";
import MenuItemCard from "./MenuItemCard";
import { useState } from "react";
import ConfirmModal from "../ConfirmationModal";

export default function MenuItemList({
  menuItems,
  categories,
  onEdit,
  onDelete,
  resCurrency,
  toggleAvailability,
  selectedCategory,
}) {
  // Group items by category
  const grouped = categories.map((cat) => ({
    ...cat,
    items: menuItems.filter((item) => item.category?._id === cat._id),
  }));

  // ✅ Filter by selected category
  const visibleCategories = grouped.filter((cat) => {
    if (selectedCategory === "all") {
      return cat.items.length > 0;
    }
    return cat._id === selectedCategory;
  });

  // ✅ Check if any visible item exists
  const hasAnyItems = visibleCategories.some((cat) => cat.items.length > 0);

  // ✅ Global fallback
  if (!hasAnyItems) {
    return (
      <div className="text-center text-gray-500 py-16 text-lg font-semibold">
        🍽️ No menu items available yet.
        <div className="text-sm mt-2">Try adding a new item to your menu!</div>
      </div>
    );
  }

  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  return (
    <>
      {visibleCategories.map((cat) => (
        <div key={cat._id} className="mb-4">
          {/* Header */}
          <div className="flex items-center mb-4">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>

            <div className="sm:px-6  text-xl sm:text-3xl font-bold text-gray-700 tracking-wide">
              {cat.name}
            </div>

            <span className="text-gray-400 text-sm ml-2">
              ({cat.items.length} {cat.items.length === 1 ? "item" : "items"})
            </span>

            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent"></div>
          </div>

          {/* Items */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6  gap-2">
            {cat.items.map((item) => (
              <MenuItemCard
                key={item._id}
                item={item}
                onEdit={onEdit}
                resCurrency={resCurrency}
                onDelete={(id) => {
                  setConfirmMessage(
                    "Are you sure you want to delete this menu item?"
                  );
                  setConfirmAction(() => () => onDelete(id));
                }}
                toggleAvailability={toggleAvailability}
              />
            ))}
          </div>
        </div>
      ))}
      <ConfirmModal
        message={confirmMessage}
        onCancel={() => {
          setConfirmMessage("");
          setConfirmAction(null);
        }}
        onConfirm={() => {
          confirmAction?.();
          setConfirmMessage("");
          setConfirmAction(null);
        }}
      />
    </>
  );
}
