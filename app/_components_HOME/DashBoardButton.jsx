"use client";
import { useRouter } from "next/navigation";

function DashBoardButton({ children }) {
  const router = useRouter();

  const handleNavigation = function () {
    router.push("/dashboard");
  };
  return (
    <button
      onClick={handleNavigation}
      className="cursor-pointer rounded-xl bg-[#0DA2E7] px-4 py-2 font-semibold text-white"
    >
      {children}
    </button>
  );
}

export default DashBoardButton;
