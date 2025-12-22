import { Droplet } from "lucide-react";

function Box({ topic, icon, value, subMsg, textColor = "text-black" }) {
  return (
    <div className="flex min-h-30 min-w-40 flex-col gap-2 rounded-xl border border-stone-100 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{topic}</p>
        {icon}
      </div>
      <div className="flex flex-col">
        <p className={`my-.5 text-2xl ${textColor} font-bold`}>{value}</p>
        <p className="text-[.7rem] text-stone-600 opacity-60">{subMsg}</p>
      </div>
    </div>
  );
}

export default Box;
