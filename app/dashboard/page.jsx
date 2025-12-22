import { getUpcomingFeedingScheduleForToday } from "../_services/supabaseActions";
import BoxGroup from "./_components/BoxGroup";
import DailyFeedConsumption from "./_components/DailyFeedConsumption";
import UpcomingFeeds from "./_components/UpcomingFeeds";

async function page() {
  const upcomingFeeds = await getUpcomingFeedingScheduleForToday();
  return (
    <>
      <BoxGroup />
      <div className="rouned my-5 grid grid-cols-[3fr_2fr] gap-10">
        <DailyFeedConsumption />
        <UpcomingFeeds upcomingFeeds={upcomingFeeds} />
      </div>
    </>
  );
}

export default page;
