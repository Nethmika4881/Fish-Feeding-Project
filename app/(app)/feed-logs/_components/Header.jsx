function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Feeding Logs</h1>
        <h4 className="text-stone-500">
          Last 15 feed logs you can checkout here
        </h4>
      </div>
    </div>
  );
}

export default Header;
