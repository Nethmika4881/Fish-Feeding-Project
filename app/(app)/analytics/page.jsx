import {
  get_tank_amountoffeedused_numoftimesfeeded_lastweek,
  get_week_feed_amounts_daily,
  getInventoryDetails,
} from "../_services/supabaseActions";
import BoxGroup from "./_components/BoxGroup";
import FeedDistributionAmongTanks from "./_components/FeedDistributionAmongTanks";
import WeeklyConsumption from "./_components/WeeklyConsumption";

async function page() {
  const [inventoryDetails, details, detailsWeekly] = await Promise.all([
    getInventoryDetails(),
    get_tank_amountoffeedused_numoftimesfeeded_lastweek(),
    get_week_feed_amounts_daily(),
  ]);
  // const inventoryDetails = await getInventoryDetails();
  // const details = await get_tank_amountoffeedused_numoftimesfeeded_lastweek();
  // const detailsWeekly = await get_week_feed_amounts_daily();
  return (
    <div className="pb-25">
      <BoxGroup
        detailsWeekly={detailsWeekly}
        details={details}
        inventoryDetails={inventoryDetails}
      />
      <div className="rouned my-5 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
        <WeeklyConsumption detailsWeekly={detailsWeekly} />
        <FeedDistributionAmongTanks details={details} />
        {/* <DailyFeedConsumption />
        <UpcomingFeeds upcomingFeeds={upcomingFeeds} />
        <WarningList pastAlerts={pastAlerts} /> */}
      </div>
    </div>
  );
}

export default page;
