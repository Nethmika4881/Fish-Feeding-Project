import { getInventoryDetails } from "../_services/supabaseActions";
import Header from "./_components/Header";
import InventoryList from "./_components/InventoryList";

async function page() {
  const inventoryDetails = await getInventoryDetails();
  return (
    <div className="flex flex-col">
      <Header />
      <InventoryList inventoryDetails={inventoryDetails} />
    </div>
  );
}

export default page;
