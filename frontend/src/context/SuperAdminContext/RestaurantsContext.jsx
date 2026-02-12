import { createContext, use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import { set } from "react-hook-form";
const BASE_API = import.meta.env.VITE_BASE_API;

export const RestaurantContext = createContext();
export const RestaurantProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [isResLoading, setIsResLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const formatName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  // ----------------------------------------------------------------------
  // ✅ GET ALL RESTAURANTS
  // ----------------------------------------------------------------------
  const getAllRestaurants = async () => {
    try {
      setIsResLoading(true);
      const res = await fetch(`${BASE_API}/api/superadmin/restaurants/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      "Fetched restaurants:", result;
      setRestaurants(result.restaurants || []);
      return { success: true, restaurants: result.restaurants };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsResLoading(false);
    }
  };
  useEffect(() => {
    if (token) {
      getAllRestaurants();
    }
  }, [token]);

  // ----------------------------------------------------------------------
  // ✅ TOGGLE RESTAURANTS STATUS
  // ----------------------------------------------------------------------

  const toggleRestaurantStatus = async (
    id,
    currentStatus,
    setIsActive,
    setLoading
  ) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_API}/api/superadmin/restaurants/toggle-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive: !currentStatus }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setIsActive(data.isActive);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createTableAndQr = async (data) => {
    console.log("DATA", data);
    data.name = formatName(data.name);
    try {
      setIsQrLoading(true);
      const res = await fetch(`${BASE_API}/api/table/create`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (result.success) {
        return { success: true };
      } else {
        return {
          success: false,
          message: result.message || "Error creating table",
        };
      }
    } catch (err) {
      console.error("Server error", err);
      return {
        success: false,
        message: result.message || "Table creation failed",
      };
    } finally {
      setIsQrLoading(false);
    }
  };

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        isResLoading,
        getAllRestaurants,
        toggleRestaurantStatus,
        createTableAndQr,
        loading,
        isQrLoading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
