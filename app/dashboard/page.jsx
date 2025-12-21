import BoxGroup from "./_components/BoxGroup";
import DailyFeedConsumption from "./_components/DailyFeedConsumption";

function page() {
  return (
    <>
      <BoxGroup />
      <div className="rouned my-5 grid grid-cols-[3fr_2fr] gap-10">
        <DailyFeedConsumption />
      </div>
    </>
  );
}

export default page;
