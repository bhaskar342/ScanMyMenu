import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { restaurant, authenticated } = useContext(AuthContext);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);
  if (checked && !authenticated) {
    return <Navigate to={"/"} replace />;
  }
  if (checked && restaurant && allowedRoles && !allowedRoles.includes(restaurant.role)) {
    return <Navigate to={"/404"} replace />;
  }
  return children;
}

export default ProtectedRoute;
