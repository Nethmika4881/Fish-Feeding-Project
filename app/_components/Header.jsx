"use client";
import { User } from "lucide-react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

function Header() {
  const pathName = usePathname();
  const matchPathName = pathName.slice(1);

  const pageTitles = {
    dashboard: "Dashboard",
    alerts: "Alerts",
    analytics: "Analytics",
    devices: "Devices",
    inventory: "Inventory",
    "manual-feed": "Manual Feed",
    settings: "Settings",
    tanks: "Tanks",
    "feeding-schedule": "Feeding Schedule",
  };

  const page = pageTitles[matchPathName] || "";

  return (
    <div className="border-b-2 border-stone-50 bg-white px-4 py-5 text-stone-800">
      <div className="flex items-center justify-between">
        <p className="font-bold text-stone-900">{page}</p>
        <div className="hidden lg:block">
          <User />
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default Header;
