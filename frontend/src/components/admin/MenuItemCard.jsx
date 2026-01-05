import React, { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "../ConfirmationModal";
import { FaCircle } from "react-icons/fa";
import { BsTriangleFill } from "react-icons/bs";
import { AuthContext } from "../../context/AuthContext";

export default function MenuItemCard({
  item,
  onEdit,
  onDelete,
  resCurrency,
  toggleAvailability,
}) {
  const isDiscounted =
    item.discountedPrice &&
    item.discountedPrice !== item.basePrice &&
    item.discountedPrice < item.basePrice;
  console.log("MenuItemCard render:", resCurrency);
  const discountPercent = isDiscounted
    ? Math.round(
        ((item.basePrice - item.discountedPrice) / item.basePrice) * 100
      )
    : 0;
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1">
      <ConfirmModal
        message={confirmMessage}
        onCancel={() => {
          setConfirmMessage("");
          setConfirmAction(null);
        }}
        onConfirm={() => {
          confirmAction();
          setConfirmMessage("");
          setConfirmAction(null);
        }}
      />

      {/* Image Section */}
      <div className="relative h-40 sm:h-56 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Veg/Non-Veg Badge */}
        <div className="absolute top-3 left-3">
          <span>
            {item.isVeg ? (
              <FaCircle
                size={20}
                className="text-emerald-600 border border-emerald-700 bg-white p-1 rounded-lg"
              />
            ) : (
              <BsTriangleFill
                size={20}
                className="text-red-600 border border-red-700 bg-white p-1 rounded-lg"
              />
            )}
          </span>
        </div>

        {/* Availability Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-red-500 text-white sm:px-4 sm:py-2 px-3 py-2 rounded-full font-semibold text-xs sm:text-sm shadow-xl">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-2.5 sm:py-5 sm:px-3">
        {/* Title + Price */}
        <div className="flex justify-between items-center gap-2">
          <h3 className="text-sm sm:text-xl font-semibold text-gray-900 leading-tight flex-1 line-clamp-2 ">
            {item.name}
          </h3>

          {/* Price Display */}
          <div className="text-right flex-shrink-0 flex flex-col items-end">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-600">
              {item.discountedPrice &&
              item.basePrice !== item.discountedPrice ? (
                <div>
                  {resCurrency}
                  {item.discountedPrice}
                </div>
              ) : (
                <div className="">
                  {resCurrency}
                  {item.basePrice || "NA"}
                </div>
              )}
            </span>

            {/* Original Price - shown only when discounted */}
            {item.discountedPrice &&
              item.basePrice !== item.discountedPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {resCurrency}
                  {item.basePrice || "NA"}
                </span>
              )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed truncate sm:whitespace-normal mb-1">
          {item.description || "No description available"}
        </p>

        {/* Availability Toggle + Actions */}
        <div className="flex flex-col flex-wrap gap-2 sm:flex-row pt-2 justify-between sm:justify-center items-center border-t border-gray-100">
          {/* Availability Toggle */}
          <div
            onClick={() => toggleAvailability(item._id, !item.isAvailable)}
            className="flex gap-2 items-center cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <div
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-all duration-300 shadow-inner ${
                item.isAvailable
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600"
                  : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                  item.isAvailable ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </div>
            <span
              className={`text-xs sm:text-base font-semibold ${
                item.isAvailable ? "text-emerald-600" : "text-gray-500"
              }`}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          {/* Edit + Delete Buttons */}
          <div className="flex gap-2">
            <button
              className="p-2 sm:p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 hover:from-blue-100 hover:to-blue-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
              onClick={() => onEdit(item)}
              title="Edit item"
            >
              <FaEdit size={16} />
            </button>
            <button
              className="p-2 sm:p-2.5 bg-gradient-to-br from-red-50 to-red-100 text-red-600 hover:from-red-100 hover:to-red-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-110"
              onClick={() => {
                setConfirmMessage("Are you sure you want to delete this item?");
                setConfirmAction(() => () => onDelete(item._id));
              }}
              title="Delete item"
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
