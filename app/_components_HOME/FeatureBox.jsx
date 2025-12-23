function FeatureBox({ feature }) {
  const { icon, topic, des } = feature;
  return (
    <div className="h-40 min-w-60 rounded-xl bg-white p-4 shadow-sm shadow-blue-100 md:min-w-60">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F5FC]">
        {icon}
      </div>

      <div className="mt-2 text-[1.1rem] font-semibold">{topic}</div>
      <div className="mt-3 text-sm text-[#64748B] opacity-90">{des}</div>
    </div>
  );
}

export default FeatureBox;
