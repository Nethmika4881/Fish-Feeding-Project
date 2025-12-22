import { RefreshCcw } from "lucide-react";

function Header() {
  return (
    <div className="flex flex-col py-2 md:flex-row md:items-center md:justify-between">
      <div className="">
        <h1 className="text-2xl font-extrabold">Devices</h1>
        <h4 className="text-stone-500">
          Manage connected feeders and sensors.
        </h4>
      </div>
      <Button />
    </div>
  );
}

export default Header;

function Button() {
  return (
    <button className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#0DA2E7] px-4 py-3 text-sm text-white shadow-sm hover:opacity-100 md:self-center md:py-2">
      <span>
        <RefreshCcw size={18} />
      </span>
      <span>scan for devices</span>
    </button>
  );
}
