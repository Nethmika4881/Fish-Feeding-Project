import AddNewScheduleForm from "./AddNewScheduleForm";

function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Feeding Schedule</h1>
        <h4 className="text-stone-500">
          Manage automated feeding times and amounts
        </h4>
      </div>
      <AddNewScheduleForm />
    </div>
  );
}

export default Header;
