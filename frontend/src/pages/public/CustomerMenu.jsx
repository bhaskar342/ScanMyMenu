import { useContext, useState, useMemo } from "react";
import Loader from "../../components/Loader";
import { PublicContext } from "../../context/PublicContext";
import { FaUtensils, FaCircle } from "react-icons/fa";
import { Triangle, MapPin, Phone } from "lucide-react";
import "../../index.css";
import FoodFilterToggles from "../../components/FoodFilterToggles";

export default function CustomerMenu() {
  const [filter, setFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, data, error } = useContext(PublicContext);
  const { restaurant = {}, table = {}, menu = [] } = data || {};

  const filteredMenu = useMemo(() => {
    return menu
      .filter((category) =>
        categoryFilter === "All" ? true : category.name === categoryFilter
      )
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const matchesFilter =
            (filter === "veg" && item.isVeg === true) ||
            (filter === "nonveg" && item.isVeg === false) ||
            (filter === "bestseller" && item.isBestSeller === true) ||
            filter === null;

          const matchesSearch = item.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

          return matchesFilter && matchesSearch;
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [menu, categoryFilter, filter, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50/30 pb-28">
      {isLoading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}

      {!isLoading && error && (
        <div className="text-center text-red-600 mt-10 font-semibold">
          {error}
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* HEADER */}
          <header className="bg-white shadow-lg sticky top-0 z-30">
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 text-white px-3 sm:px-6 py-3">
              <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                    <FaUtensils className="text-2xl" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
                    {restaurant.name || "Cafe"}
                  </h1>
                </div>

                <div className="space-y-1.5 text-xs sm:text-sm text-white/95">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{restaurant.phoneNumber || "NA"}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                    <span className="flex-1 line-clamp-2">
                      {restaurant.address || "NA"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Badge */}
            <div className="bg-emerald-50 border-y border-emerald-200 py-1 ">
              <div className="max-w-6xl mx-auto text-center">
                <span className="text-gray-700 text-xs sm:text-sm font-medium">
                  Dining at{" "}
                  <span className="font-bold text-emerald-700 text-sm sm:text-base">
                    {table.name}
                  </span>
                </span>
              </div>
            </div>
          </header>

          {/* MENU SECTION */}
          <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-5">
            {/* SEARCH BAR */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.65 6.65a7.5 7.5 0 016 9.999z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* FILTER TOGGLES */}
            <FoodFilterToggles filter={filter} setFilter={setFilter} />

            {/* CATEGORY TABS */}
            <div className="space-y-3">
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                Categories
              </div>
              <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
                <button
                  onClick={() => setCategoryFilter("All")}
                  className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-5 font-semibold text-xs sm:text-sm ${
                    categoryFilter === "All"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500"
                  }`}
                >
                  All
                </button>
                {menu.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setCategoryFilter(cat.name)}
                    className={`whitespace-nowrap px-4 sm:px-5 py-2 rounded-5 font-semibold text-xs sm:text-sm ${
                      categoryFilter === cat.name
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-white text-gray-700 border-2 border-gray-200 hover:border-emerald-500"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* MENU ITEMS */}
            {filteredMenu.length > 0 ? (
              filteredMenu.map((category) => (
                <section key={category._id} className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-xl sm:text-2xl font-semibold  text-gray-800">
                      {category.name}
                    </div>
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-transparent rounded"></div>
                  </div>

                  {/* 2 ITEMS PER ROW */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {category.items.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg"
                        >
                          {/* Image */}
                          <div className="relative h-32 sm:h-40 ">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="object-cover rounded-b-2xl  w-full h-full"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
                                No Image
                              </div>
                            )}

                            {/* Bestseller Badge */}
                            {item.isBestSeller && (
                              <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-amber-500 text-white text-[9px] sm:text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-md">
                                Best
                              </span>
                            )}

                            {/* Veg/Non-veg Badge */}
                            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2">
                              {item.isVeg === false ? (
                                <div className="flex items-center justify-center border-2 h-5 w-5 sm:h-6 sm:w-6 rounded bg-white shadow-md border-red-600">
                                  <Triangle
                                    size={12}
                                    className="text-red-600 sm:w-3 sm:h-3"
                                    fill="red"
                                  />
                                </div>
                              ) : (
                                <div className="flex bg-white items-center justify-center border-2 rounded h-5 w-5 sm:h-6 sm:w-6 border-green-600 shadow-md">
                                  <FaCircle className="w-3 h-3 sm:w-2.5 sm:h-2.5 text-emerald-600" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Details */}
                          <div className="p-2.5 sm:p-3 space-y-2 sm:space-y-2.5">
                            <div className="flex flex-col justify-between">
                              <div className="font-bold truncate text-gray-900 text-xs sm:text-sm mb-0.5 sm:mb-1 line-clamp-2 leading-tight">
                                {item.name || "NA"}
                              </div>
                              <div className="flex justify-between">
                                <div className="">
                                  <div className="text-emerald-700 py-1 font-bold text-sm sm:text-base">
                                    ₹{item.discountedPrice || "NA"}
                                  </div>
                                  <div className="text-[10px] text-decoration-line-through text-gray-400">
                                    ₹{item.basePrice || "NA"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))
            ) : (
              <div className="text-center text-gray-500 py-16 sm:py-20 bg-white rounded-2xl shadow-sm">
                <div className="text-4xl sm:text-5xl mb-3">🍽️</div>
                <p className="text-base sm:text-lg font-medium">
                  No items found
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
