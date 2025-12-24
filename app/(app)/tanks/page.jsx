import Header from "./_components/Header";
import TankList from "./_components/TankList";

function page() {
  return (
    <div>
      <Header />
      <div className="pb-10 lg:py-5 lg:pb-10">
        <TankList />
      </div>
    </div>
  );
}

export default page;
