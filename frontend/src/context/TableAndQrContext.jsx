import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
const BASE_API = import.meta.env.VITE_BASE_API;

export const TableContext = createContext();
export const TableProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const { token } = useContext(AuthContext);

  const getAllTables = async () => {
    try {
      setIsLoading(true);
      const r = await fetch(`${BASE_API}/api/table/tables`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await r.json();
      "Tables fetched:", res;
      setTables(res.tables);
    } catch (error) {
      "Error", error;
      return {
        success: false,
        message: res.message || "Table categories failed",
      };
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      getAllTables();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);

      const r = await fetch(`${BASE_API}/api/table/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await r.json();

      if (r.ok && res.success) {
        setTables((prev) => prev.filter((t) => t._id !== id));
        return { success: true, message: "Table deleted successfully" };
      } else {
        return {
          success: false,
          message: res.message || "Failed to delete table",
        };
      }
    } catch (error) {
      return { success: false, message: error.message || "Unexpected error" };
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (qr) => {
    try {
      qr;
      const response = await fetch(qr.qrImage);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${qr.name || "table"}_QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return { success: true };
    } catch (error) {
      return { success: false, message: error };
    }
  };

  return (
    <TableContext.Provider
      value={{
        getAllTables,
        handleDelete,
        handleDownload,
        tables,
        isLoading,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};
