import InventoryCard from "./InventoryCard";

function InventoryList({ inventoryDetails }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:px-4 lg:grid-cols-3">
      {inventoryDetails.map((inventory) => (
        <InventoryCard inventory={inventory} key={inventory.id} />
      ))}
    </div>
  );
}

export default InventoryList;
