import { MenuProvider } from "../../context/MenuContext";
import { CategoryProvider } from "../../context/CategoryContext";
import { TableProvider } from "../../context/TableAndQrContext";
import { SettingProvider } from "../../context/SettingsContext";

export default function AdminProviders({ children }) {
  return (
    <SettingProvider>
      <MenuProvider>
        <CategoryProvider>
          <TableProvider>{children}</TableProvider>
        </CategoryProvider>
      </MenuProvider>
    </SettingProvider>
  );
}
