import { RefreshCcw } from "lucide-react";
import UpcomingFeedsList from "./UpcomingFeedsList";

function UpcomingFeeds({ upcomingFeeds }) {
  console.log(upcomingFeeds);
  return (
    <div className="col-span-2 h-full w-full rounded-xl bg-white px-4 py-4 text-[.7rem] shadow-sm lg:col-span-1">
      <Heading />
      <UpcomingFeedsList upcomingFeeds={upcomingFeeds} />
    </div>
  );
}

export default UpcomingFeeds;

function Heading() {
  return (
    <div className="mt-2 mb-4">
      <h1 className="text-[1rem] font-semibold">Upcoming Feedings</h1>
      <h4 className="text-sm opacity-60 text-shadow-stone-500">
        Next scheduled automated feedings
      </h4>
    </div>
  );
}
