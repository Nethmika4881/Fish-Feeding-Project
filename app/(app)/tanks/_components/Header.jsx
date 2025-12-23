import AddNewTankForm from "./AddNewTankForm";

function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Tanks</h1>
        <h4 className="text-stone-500">
          Monitor water quality and fish health status.
        </h4>
      </div>
      <AddNewTankForm />
    </div>
  );
}

export default Header;
