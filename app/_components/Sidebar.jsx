"use client";

import { useState } from "react";
import {
  BarChart2,
  Bell,
  ClipboardClock,
  Cpu,
  Fish,
  HandCoins,
  History,
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
import { motion, AnimatePresence, useDragControls } from "framer-motion";

const SidebarContent = ({ matchPathName, closeDrawer }) => (
  <div className="flex h-screen flex-col justify-between">
    <Brand />
    <nav className="flex flex-col gap-1 px-4">
      {NavLinks.map(({ name, icon, link }) => (
        <Link
          key={name}
          href={`/${link}`}
          onClick={closeDrawer}
          className={`flex items-center gap-2 rounded-lg px-2 py-3 text-[.9rem] font-medium text-stone-200 opacity-80 transition-all duration-200 hover:bg-[#1D283A] ${
            matchPathName === link ? "bg-[#1D283A]" : ""
          }`}
        >
          <span>{icon}</span>
          <span>{name}</span>
        </Link>
      ))}
    </nav>
    <Footer />
  </div>
);

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const matchPathName = pathname.replace("/", "") || "dashboard";
  const dragControls = useDragControls();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 rounded-lg border border-stone-700 bg-[#0F1729] p-2 text-stone-200 hover:bg-[#1D283A] lg:hidden"
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              drag="x"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ left: -256, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                // Close if dragged left past threshold or with sufficient velocity
                if (offset.x < -100 || velocity.x < -500) {
                  setIsOpen(false);
                }
              }}
              className="fixed top-0 left-0 z-50 h-screen w-64 bg-[#0F1729] lg:hidden"
            >
              {/* Drag Handle Area */}
              <div
                onPointerDown={(e) => dragControls.start(e)}
                className="absolute top-0 right-0 h-full w-8 cursor-grab active:cursor-grabbing"
                aria-label="Drag to close"
              />

              <SidebarContent
                matchPathName={matchPathName}
                closeDrawer={() => setIsOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden h-full overflow-y-auto bg-[#0F1729] lg:block">
        <SidebarContent matchPathName={matchPathName} closeDrawer={() => {}} />
      </div>
    </>
  );
}

const NavLinks = [
  { name: "Dashboard", icon: <LayoutDashboard size={18} />, link: "dashboard" },
  { name: "Tanks", icon: <Fish size={18} />, link: "tanks" },
  {
    name: "Feeding Schedule",
    icon: <ClipboardClock size={18} />,
    link: "feeding-schedule",
  },
  {
    name: "Feed Logs",
    icon: <History size={18} />,
    link: "feed-logs",
  },
  { name: "Manual Feed", icon: <HandCoins size={18} />, link: "manual-feed" },
  { name: "Inventory", icon: <Package size={18} />, link: "inventory" },
  { name: "Alerts", icon: <Bell size={18} />, link: "alerts" },
  { name: "Analytics", icon: <BarChart2 size={18} />, link: "analytics" },
  { name: "Devices", icon: <Cpu size={18} />, link: "devices" },
  { name: "Settings", icon: <Settings size={18} />, link: "settings" },
];

export default Sidebar;
