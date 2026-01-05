import { MapPin, Phone, Mail, Calendar } from "lucide-react";
import { useContext, useState } from "react";
import ActiveToggle from "../ActiveToggle";
import { RestaurantContext } from "../../context/SuperAdminContext/RestaurantsContext";

export default function RestaurantDetailCard({ restaurant }) {
  if (!restaurant) return null;
  const { toggleRestaurantStatus } = useContext(RestaurantContext);
  const {
    _id,
    name,
    ownerName,
    email,
    phoneNumber,
    address,
    currency,
    isOpen,
    createdAt,
  } = restaurant;

  // 🔑 LOCAL STATE (IMPORTANT)
  const [isActive, setIsActive] = useState(restaurant.isActive);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    toggleRestaurantStatus(_id, isActive, setIsActive, setLoading);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-sm text-gray-500">Owner: {ownerName}</p>
        </div>

        <div className="flex items-center gap-3">
          {/* STATUS BADGE */}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                isActive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {isActive ? "Active" : "Suspended"}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold
              ${
                isOpen
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-600"
              }`}
          >
            {isOpen ? "Open" : "Closed"}
          </span>

          {/* 🔥 ACTIVE TOGGLE */}
          <ActiveToggle
            isActive={isActive}
            loading={loading}
            onToggle={handleToggle}
          />
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail size={16} />
          <span>{email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Phone size={16} />
          <span>{phoneNumber}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
          <MapPin size={16} />
          <span>{address}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar size={16} />
          <span>Joined on {new Date(createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          💱 <span>Currency: {currency}</span>
        </div>
      </div>
    </div>
  );
}
