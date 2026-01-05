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
      console.log("Fetched restaurants:", result);
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

  return (
    <RestaurantContext.Provider
      value={{
        restaurants,
        setRestaurants,
        isResLoading,
        getAllRestaurants,
        toggleRestaurantStatus,
        loading,
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};
