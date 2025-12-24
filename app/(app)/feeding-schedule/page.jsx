import { formatTimeHHMM } from "../_services/helpUtils";
import { getFeedingSchedule } from "../_services/supabaseActions";
import Header from "./_components/Header";
import FishFeedScheduleClient from "./_components/Table";

async function page() {
  const data = await getFeedingSchedule();
  const formattedLogs = data.map((log) => ({
    id: log?.id,
    time: formatTimeHHMM(log.feed_time),
    tank: log.tanks?.tank_name || "Unknown Tank",
    feedType: log.feed_type,
    amount: `${log.feed_amount}g`,
    status: log.today_status || "pending",
  }));
  return (
    <div>
      <Header />
      <FishFeedScheduleClient initialData={formattedLogs} />
    </div>
  );
}

export default page;
