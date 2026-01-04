import WarningCard from "./WarningCard";

function WarningList({ alerts }) {
  return (
    <div className="my-10 h-120 w-full overflow-y-scroll rounded-xl bg-white px-5 pt-3 pb-5 shadow-sm">
      <Heading />
      <div className="flex flex-col gap-3">
        {alerts.map((alertMsg) => (
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
        Requires attention or acknowledgement
      </h4>
    </div>
  );
}

export default WarningList;
