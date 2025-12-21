"use client";
import { User } from "lucide-react";
import { Poppins } from "next/font/google";
import DividerComponent from "./Divider";
import { Separator } from "@/components/ui/separator";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});
function Brand() {
  return (
    <div className="mt-5 mb-5 flex flex-col gap-3">
      <div className="flex items-center gap-3 px-4">
        <Logo />
        <BrandName />
      </div>
      <Separator className="mt-3 bg-slate-700" />
    </div>
  );
}

export default Brand;

function Logo() {
  return (
    <div className="rounded-lg bg-blue-400 p-1">
      <User size={25} color="white" />
    </div>
  );
}

function BrandName() {
  return (
    <div className={`text-2xl ${poppins.className} font-black text-white`}>
      AquaFeed Pro
    </div>
  );
}
