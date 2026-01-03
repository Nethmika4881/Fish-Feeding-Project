"use client";
import { LogOut } from "lucide-react";
import { logout } from "../_services/supabaseActions";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = async function () {
    const res = await logout();
    console.log(res, "Res res res");
    if (res?.success) {
      console.log(true);
      router.push("/login");
    }
  };
  return (
    <button
      onClick={handleLogout}
      className="cursor-pointer rounded-xl p-2 transition-all duration-300 hover:bg-stone-100"
    >
      <LogOut size={25} color="#25AAE8" />
    </button>
  );
}

export default Logout;
