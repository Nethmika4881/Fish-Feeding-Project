import {
  get_week_feed_amounts_daily,
  getAlerts,
  getCurrentUser,
  getNumOfTanks,
  getUpcomingFeedingScheduleForToday,
  numOfAlerts,
} from "../_services/supabaseActions";
import BoxGroup from "./_components/BoxGroup";
import DailyFeedConsumption from "./_components/DailyFeedConsumption";
import UpcomingFeeds from "./_components/UpcomingFeeds";
import WarningList from "./_components/WarningList";

async function page() {
  const [
    upcomingFeeds,
    session,
    numOfTanks,
    getNumOfAlerts,
    detailsWeekly,
    alerts,
  ] = await Promise.all([
    getUpcomingFeedingScheduleForToday(),
    getCurrentUser(),
    getNumOfTanks(),
    numOfAlerts(),
    get_week_feed_amounts_daily(),
    getAlerts(),
  ]);
  // const upcomingFeeds = await getUpcomingFeedingScheduleForToday();
  // const session = await getCurrentUser();
  // const numOfTanks = await getNumOfTanks();
  // const getNumOfAlerts = await numOfAlerts();
  // const detailsWeekly = await get_week_feed_amounts_daily();
  // const alerts = await getAlerts();
  const now = new Date();
  const pastAlerts = alerts.filter(
    (alert) => alert.created_at && new Date(alert.created_at) < now,
  );
  return (
    <div className="py-5 pb-25">
      <BoxGroup
        numOfTanks={numOfTanks}
        getNumOfAlerts={getNumOfAlerts}
        amountFeeded={1}
      />
      <div className="my-5 grid grid-cols-1 gap-10 rounded-xl lg:grid-cols-[3fr_2fr]">
        <DailyFeedConsumption detailsWeekly={detailsWeekly} />
        <UpcomingFeeds upcomingFeeds={upcomingFeeds} />
        <WarningList pastAlerts={pastAlerts} />
      </div>
    </div>
  );
}

export default page;
