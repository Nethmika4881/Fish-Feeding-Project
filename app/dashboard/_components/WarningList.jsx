import WarningCard from "./WarningCard";

function WarningList({ pastAlerts }) {
  return (
    <div className="col-span-2 my-5 min-h-100 w-full rounded-xl bg-white px-5 pt-3 pb-5 shadow-sm">
      <Heading />
      <div className="flex flex-col gap-3">
        {pastAlerts.map((alertMsg) => (
          <WarningCard key={alertMsg.id} alertMsg={alertMsg} />
        ))}
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="mt-2 mb-4">
      <h1 className="text-[1rem] font-semibold">Active Alerts</h1>
      <h4 className="text-sm opacity-60 text-shadow-stone-500">
        Recent system notifications and warnings
      </h4>
    </div>
  );
}

export default WarningList;
