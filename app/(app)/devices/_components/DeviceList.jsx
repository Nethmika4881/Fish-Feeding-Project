import DeviceCard from "./DeviceCard";

function DeviceList({ deviceDetails }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 md:px-4 lg:grid-cols-3">
      {deviceDetails.map((device) => (
        <DeviceCard device={device} key={device.id} />
      ))}
    </div>
  );
}

export default DeviceList;
