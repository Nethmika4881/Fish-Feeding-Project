import UpcomingFeedsCard from "./UpcomingFeedsCard";

function UpcomingFeedsList({ upcomingFeeds }) {
  const feeds = upcomingFeeds.filter((x) => x.today_status === "pending");
  return (
    <div className="flex flex-col gap-4">
      {feeds.map((feed) => (
        <UpcomingFeedsCard
          key={feed.id}
          feed={feed}
          isLast={feeds.at(-1) === feed}
        />
      ))}
    </div>
  );
}

export default UpcomingFeedsList;
