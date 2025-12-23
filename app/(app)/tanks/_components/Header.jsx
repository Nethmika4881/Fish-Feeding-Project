function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Tanks</h1>
        <h4 className="text-stone-500">
          Monitor water quality and fish health status.
        </h4>
      </div>
      <Button />
    </div>
  );
}

export default Header;

function Button() {
  return (
    <button className="mt-5 cursor-pointer rounded-xl bg-[#0DA2E7] px-4 py-2 text-sm text-white shadow-sm hover:opacity-100 md:self-center">
      + Add New Tank
    </button>
  );
}
