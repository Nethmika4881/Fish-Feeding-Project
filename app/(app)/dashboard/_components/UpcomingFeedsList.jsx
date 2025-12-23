import UpcomingFeedsCard from "./UpcomingFeedsCard";

function UpcomingFeedsList({ upcomingFeeds }) {
  console.log("upcoming", upcomingFeeds);
  return (
    <div className="flex flex-col gap-4">
      {upcomingFeeds.map((feed) => (
        <UpcomingFeedsCard
          key={feed.id}
          feed={feed}
          isLast={upcomingFeeds.at(-1) === feed}
        />
      ))}
    </div>
  );
}

export default UpcomingFeedsList;
