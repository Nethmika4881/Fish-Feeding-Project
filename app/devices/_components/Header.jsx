import { RefreshCcw } from "lucide-react";

function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2">
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
    <button className="flex cursor-pointer gap-3 self-center rounded-xl bg-[#0DA2E7] px-4 py-2 text-sm text-white shadow-sm hover:opacity-100">
      <RefreshCcw size={18} /> scan for devices
    </button>
  );
}
