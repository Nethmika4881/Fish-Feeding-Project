"use client";
import { useState } from "react";
import {
  BarChart2,
  Bell,
  ClipboardClock,
  Cpu,
  Fish,
  HandCoins,
  LayoutDashboard,
  Menu,
  Package,
  Settings,
  X,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import Footer from "./Footer";

const SidebarContent = ({ matchPathName, closeDrawer }) => (
  <div className="flex h-screen flex-col justify-between">
    <Brand />
    <nav className="flex flex-col gap-1 px-4">
      {NavLinks.map(({ name, icon, link }) => {
        return (
          <Link
            href={`/${link}`}
            onClick={closeDrawer}
            className={`flex ${matchPathName === link ? "bg-[#1D283A]" : ""} items-center gap-2 rounded-lg px-2 py-3 text-[.9rem] font-medium text-stone-200 opacity-80 transition-all duration-200 hover:bg-[#1D283A]`}
            key={name}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </Link>
        );
      })}
    </nav>
    <Footer />
  </div>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const matchPathName = pathName.slice(1);

  const toggleDrawer = () => setIsOpen(!isOpen);
  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleDrawer}
        className="fixed top-4 right-4 z-50 rounded-lg bg-[#0F1729] p-2 text-stone-200 lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-40 bg-black lg:hidden"
          onClick={closeDrawer}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 transform bg-[#0F1729] transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent
          matchPathName={matchPathName}
          closeDrawer={closeDrawer}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden h-full overflow-y-auto bg-[#0F1729] lg:block">
        <SidebarContent matchPathName={matchPathName} closeDrawer={() => {}} />
      </div>
    </>
  );
}

const NavLinks = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "dashboard",
  },
  {
    name: "Tanks",
    icon: <Fish size={18} />,
    link: "tanks",
  },
  {
    name: "Feeding Schedule",
    icon: <ClipboardClock size={18} />,
    link: "feeding-schedule",
  },
  {
    name: "Manual Feed",
    icon: <HandCoins size={18} />,
    link: "manual-feed",
  },
  {
    name: "Inventory",
    icon: <Package size={18} />,
    link: "inventory",
  },
  {
    name: "Alerts",
    icon: <Bell size={18} />,
    link: "alerts",
  },
  {
    name: "Analytics",
    icon: <BarChart2 size={18} />,
    link: "analytics",
  },
  {
    name: "Devices",
    icon: <Cpu size={18} />,
    link: "devices",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "settings",
  },
];

export default Sidebar;
