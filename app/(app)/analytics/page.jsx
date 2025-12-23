import BoxGroup from "./_components/BoxGroup";
import FeedDistributionAmongTanks from "./_components/FeedDistributionAmongTanks";
import WeeklyConsumption from "./_components/WeeklyConsumption";

function page() {
  return (
    <div className="pb-25">
      <BoxGroup />
      <div className="rouned my-5 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <WeeklyConsumption />
        <FeedDistributionAmongTanks />
        {/* <DailyFeedConsumption />
        <UpcomingFeeds upcomingFeeds={upcomingFeeds} />
        <WarningList pastAlerts={pastAlerts} /> */}
      </div>
    </div>
  );
}

export default page;
