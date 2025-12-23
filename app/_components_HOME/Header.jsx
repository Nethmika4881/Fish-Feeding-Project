import BrandName from "./BrandName";
import DashBoardButton from "./DashBoardButton";

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-b-stone-100 bg-white/70 px-10 backdrop-blur-md">
      <BrandName />
      <DashBoardButton>Dashboard</DashBoardButton>
    </header>
  );
}

export default Header;
