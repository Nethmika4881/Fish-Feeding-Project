import { formatTimeHHMM } from "@/app/_services/helpUtils";
import { Separator } from "@/components/ui/separator";
import { Timer } from "lucide-react";

function UpcomingFeedsCard({ feed, isLast }) {
  const {
    feed_amount: feedAmount,
    feed_name: feedType,
    feed_time: feedTime,
    tanks: { tank_name: tankName },
  } = feed;

  console.log({
    feedAmount,
    feedType,
    feedTime,
    tankName,
  });
  return (
    <div className={`flex flex-col gap-4 ${isLast ? "pb-4" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E6F5FC]">
          <Timer size={30} strokeWidth={2.5} color="#0DA2E7" />
        </div>

        <div className="flex flex-col">
          <span className="text-[1rem] font-semibold text-stone-800">{`${tankName}`}</span>
          <span className="text-[.8rem] text-stone-500 opacity-80">{`${feedAmount}g -${feedType}`}</span>
        </div>

        <div className="ml-auto text-[1rem] font-semibold text-stone-800">
          {formatTimeHHMM(feedTime)}
        </div>
      </div>
      {!isLast && <Separator className="bg-slate-200" />}
    </div>
  );
}

export default UpcomingFeedsCard;
