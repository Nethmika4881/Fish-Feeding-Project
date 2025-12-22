import { getUpcomingFeedingScheduleForToday } from "../_services/supabaseActions";
import BoxGroup from "./_components/BoxGroup";
import DailyFeedConsumption from "./_components/DailyFeedConsumption";
import UpcomingFeeds from "./_components/UpcomingFeeds";

async function page() {
  const upcomingFeeds = await getUpcomingFeedingScheduleForToday();
  return (
    <div className="py-10">
      <BoxGroup />
      <div className="rouned my-5 grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
        <DailyFeedConsumption />
        <UpcomingFeeds upcomingFeeds={upcomingFeeds} />
      </div>
    </div>
  );
}

export default page;
