import { format } from "date-fns";
import { getFeedLogs } from "../_services/supabaseActions";
import Header from "./_components/Header";
import FishFeedScheduleClient from "./_components/Table";

export const dynamic = "force-dynamic";
async function page() {
  const data = await getFeedLogs();
  console.log(data);
  const formattedLogs = data.map((log) => ({
    id: log?.id,
    date: format(
      new Date(log.created_at).toLocaleString().split(",")[0],
      "MMMM do, yyyy",
    ),
    time: new Date(log.created_at).toLocaleString().split(",")[1],
    tank: log.tanks?.tank_name || "Unknown Tank",
    type: log.type, //schedule or manual
    amount: `${log.manual_feeding_requests?.feed_amount || log.feeding_schedules?.feed_amount}g`,
    feedName: `${log.manual_feeding_requests?.feed_name || log.feeding_schedules?.feed_name}`,
  }));
  console.log(formattedLogs);
  return (
    <div>
      <Header />
      <FishFeedScheduleClient initialData={formattedLogs} />
    </div>
  );
}

export default page;
