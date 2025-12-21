function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="">
        <h1 className="text-2xl font-extrabold">Feeding Schedule</h1>
        <h4 className="text-stone-500">
          Manage automated feeding times and amounts
        </h4>
      </div>
      <Button />
    </div>
  );
}

export default Header;

function Button() {
  return (
    <button className="cursor-pointer self-center rounded-xl bg-[#0DA2E7] px-4 py-2 text-sm text-white shadow-sm hover:opacity-100">
      + Add Schedule
    </button>
  );
}
