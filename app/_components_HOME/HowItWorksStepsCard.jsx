function HowItWorksStepsCard({ step }) {
  return (
    <div className="flex h-40 min-w-60 flex-col items-center rounded-xl bg-white p-4 text-center shadow-sm shadow-blue-100">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0DA2E7] font-extrabold text-white">
        {step.id}
      </div>

      <h1 className="my-3 text-[1.2rem] font-extrabold">{step.topic}</h1>
      <h3 className="text-[.8rem] text-stone-500 opacity-90">{step.des}</h3>
    </div>
  );
}

export default HowItWorksStepsCard;
