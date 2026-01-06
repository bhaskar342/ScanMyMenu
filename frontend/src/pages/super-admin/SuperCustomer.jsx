import { useContext } from "react";
import RestaurantDetailCard from "../../components/superadmin/RestaurantsDetail";
import { RestaurantContext } from "../../context/SuperAdminContext/RestaurantsContext";

function SuperCustomer() {
  const { restaurants, isLoading } = useContext(RestaurantContext);
  "Restaurants in SuperCustomer:", restaurants;
  return (
    <div>
      {!isLoading &&
        restaurants.map((restaurant) => (
          <RestaurantDetailCard key={restaurant._id} restaurant={restaurant} />
        ))}
    </div>
  );
}

export default SuperCustomer;
