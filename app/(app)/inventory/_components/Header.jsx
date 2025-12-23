import AddFeedStockForm from "./AddNewStockForm";

function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Feed Inventory</h1>
        <h4 className="text-stone-500">Track feed stock levels and usage.</h4>
      </div>
      <AddFeedStockForm />
    </div>
  );
}

export default Header;
