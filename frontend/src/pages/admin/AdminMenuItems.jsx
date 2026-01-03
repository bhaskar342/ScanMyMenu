import { useContext, useEffect, useState } from "react";
import { MenuContext } from "../../context/MenuContext";
import { AuthContext } from "../../context/AuthContext";
import SkeletonLoader from "../../components/SkeletonLoader";
import AddItemModal from "../../components/admin/AddItemModal";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import CategoryList from "../../components/admin/CategoryList";
import MenuItemList from "../../components/admin/MenuItemList";
import { FaPlus } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import { CategoryContext } from "../../context/CategoryContext";
import FoodCatSkeleton from "../../components/FoodCatSkeleton";
import ErrorModal from "../../components/ErrorModal";

export default function AdminMenuItems() {
  const { token } = useContext(AuthContext);
  const [editingItem, setEditingItem] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCatAddModal, setShowCatAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [errorMessage, setErrorMessage] = useState("");

  const { isMenuLoading, updateMenuItem, handleDelete, menuItems } =
    useContext(MenuContext);

  const { categories, getAllCategories, handleDeleteCategory, isCatLoading } =
    useContext(CategoryContext);

  useEffect(() => {
    if (token) {
      getAllCategories();
    }
  }, [token]);

  //-----------------------------------------------------------------------
  // MENU ITEMS HANDLERS
  //-----------------------------------------------------------------------
  const toggleAvailability = async (id, value) => {
    const fd = new FormData();
    fd.append("isAvailable", value ? "true" : "false");
    return await updateMenuItem(id, fd);
  };

  const onEdit = (item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const onDelete = async (id) => {
    const result = await handleDelete(id);
    if (!result.success) {
      setErrorMessage(result.message || "Failed to delete item.");
    }
  };

  //-----------------------------------------------------------------------
  // CATEGORIES  HANDLERS
  //-----------------------------------------------------------------------
  const handleCategoryEdit = (cat) => {
    setEditingCategory(cat);
    setShowCatAddModal(true);
  };

  const handleCategoryDelete = async (id) => {
    const result = await handleDeleteCategory(id);
    if (!result.success) {
      setErrorMessage(result.message || "Failed to delete category.");
    }
  };

  return (
    <div className="container-fluid">
      {showAddModal && (
        <AddItemModal
          editingItem={editingItem}
          setEditingItem={setEditingItem}
          setShowAddModal={setShowAddModal}
        />
      )}

      <ErrorModal message={errorMessage} onClose={() => setErrorMessage("")} />

      {showCatAddModal && (
        <AddCategoryModal
          key={editingCategory ? editingCategory._id : "new"}
          setShowCatAddModal={setShowCatAddModal}
          editingCategory={editingCategory}
          setEditingCategory={setEditingCategory}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category */}
        <div className="w-full sm:w-2/9">
          {/* Category Header Section */}
          <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl shadow-sm border border-emerald-100 p-2 mb-4 md:p-3.5 ">
            <div className="flex items-center gap-2 md:gap-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-2.5 rounded-xl shadow-lg">
                <GiMeal className="text-white w-5 h-5" />
              </div>
              <div className="flex flex-col ">
                <div className="text-base sm:text-sm  md:text-base lg:text-xl font-bold text-gray-900">
                  Categories
                </div>
                <p className="text-base sm:text-[9px] md:text-[10px] lg:text-lg text-gray-600">
                  Filter by category
                </p>
              </div>
            </div>

            {/* Add Category Button */}
            <button
              className="w-full flex items-center justify-center gap-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-2 sm:p-1.5 md:px-4 md:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm transform hover:scale-105"
              onClick={() => {
                setEditingCategory(null);
                setShowCatAddModal(true);
              }}
            >
              <FaPlus className="w-3 h-3" />
              <span className="text-base sm:text-sm md:text-xs lg:text-lg">Add Category</span>
            </button>
          </div>

          {/* Category List */}
          {isCatLoading ? (
            <FoodCatSkeleton count={5} />
          ) : (
            <CategoryList
              categories={categories}
              onEdit={handleCategoryEdit}
              onDelete={handleCategoryDelete}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
        </div>

        {/* Menu Items */}
        <div className="w-full sm:w-7/9">
          {/* Header Section with Gradient Background */}
          <div className="bg-gradient-to-r from-emerald-50 via-white to-emerald-50 rounded-2xl shadow-sm border border-emerald-100 p-2 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Title Section */}
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <MdRestaurantMenu className="text-white w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    Menu Items
                  </h2>
                  <p className="text-sm text-gray-600 mt-0.5">
                    Manage your restaurant menu
                  </p>
                </div>
              </div>

              {/* Add Button */}
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base transform hover:scale-105"
                onClick={() => {
                  setEditingItem(null);
                  setShowAddModal(true);
                }}
              >
                <FaPlus className="w-4 h-4" />
                <span>Add New Item</span>
              </button>
            </div>

            {/* Stats Section */}
            <div className="mt-2 pt-3 border-t border-emerald-100">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Total Items:
                    <span className="font-semibold text-gray-900 ml-1">
                      {selectedCategory === "all"
                        ? menuItems.length
                        : menuItems.filter(
                            (item) => item.category?._id === selectedCategory
                          ).length}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">
                    Available:
                    <span className="font-semibold text-gray-900 ml-1">
                      {
                        (selectedCategory === "all"
                          ? menuItems
                          : menuItems.filter(
                              (item) => item.category?._id === selectedCategory
                            )
                        ).filter((item) => item.isAvailable).length
                      }
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Item List */}
          {isMenuLoading ? (
            <SkeletonLoader count={7} />
          ) : (
            <MenuItemList
              menuItems={
                selectedCategory === "all"
                  ? menuItems
                  : menuItems.filter(
                      (item) => item.category?._id === selectedCategory
                    )
              }
              categories={categories}
              onEdit={onEdit}
              onDelete={onDelete}
              selectedCategory={selectedCategory}
              toggleAvailability={toggleAvailability}
            />
          )}
        </div>
      </div>
    </div>
  );
}
