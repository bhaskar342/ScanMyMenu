import { RestaurantProvider } from "../../context/SuperAdminContext/RestaurantsContext";

export default function SuperAdminProvider({ children }) {
  return <RestaurantProvider>{children}</RestaurantProvider>;
}
