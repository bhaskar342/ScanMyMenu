import { useParams } from "react-router-dom";
import { PublicProvider } from "../../context/PublicContext";

export default function CustomerProviders({ children }) {
  const { restaurantId, tableId } = useParams();
  return (
    <PublicProvider restaurantId={restaurantId} tableId={tableId}>
      {children}
    </PublicProvider>
  );
}
