import BrandName from "./BrandName";
import DashBoardButton from "./DashBoardButton";

function Header() {
  return (
    <header className="z-50 flex h-20 items-center justify-between border-b border-b-stone-100 bg-white/70 px-5 backdrop-blur-md md:fixed md:inset-x-0 md:top-0 md:px-10">
      <BrandName />
      <DashBoardButton>Dashboard</DashBoardButton>
    </header>
  );
}

export default Header;
