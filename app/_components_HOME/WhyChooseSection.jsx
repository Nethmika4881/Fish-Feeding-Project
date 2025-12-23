import { Check } from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="flex min-h-[calc(100vh-20rem)] items-center justify-center lg:px-24">
      <div className="grid min-h-100 w-4/5 grid-cols-1 md:grid-cols-2">
        <LeftSide />
        <RightSide />
      </div>
    </section>
  );
}
const LeftSide = function () {
  return (
    <div className="grid place-items-start py-10 lg:p-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-extrabold text-stone-800 md:text-4xl">
          Why Choose AquaFeed Pro?
        </h1>

        <h4 className="text-stone-400">
          Designed specifically for commercial fish shop operations
        </h4>
      </div>
    </div>
  );
};

const RightSide = function () {
  const reasons = [
    "Save time with automated feeding schedules",
    "Reduce waste with precise portion control",
    "Prevent fish health issues with real-time monitoring",
    "Scale operations without additional staff",
    "Access analytics to optimize feeding patterns",
    "Instant alerts for any system issues",
  ];
  return (
    <div className="grid place-items-start">
      <div className="flex flex-col gap-2">
        <ul className="flex flex-col gap-3">
          {reasons.map((reason, i) => (
            <ListItem key={i} reason={reason} />
          ))}
        </ul>
      </div>
    </div>
  );
};

const ListItem = function ({ reason }) {
  return (
    <li className="flex items-center gap-2 text-stone-900">
      <span>
        <Check color="#00C950" />
      </span>
      <span>{reason}</span>
    </li>
  );
};
