import HowItWorksStepsCard from "./HowItWorksStepsCard";

function HowItWorksStepsList() {
  const steps = [
    {
      id: 1,
      topic: "Connect Devices",
      des: " Set up your IoT feeder units and sensors to the system",
    },
    {
      id: 2,
      topic: "Configure Tanks",
      des: "Add your tanks and set up species-specific feeding requireme",
    },
    {
      id: 3,
      topic: "Monitor & Control",
      des: "Access real-time dashboards and manage everything from one place",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {steps.map((step) => (
        <HowItWorksStepsCard key={step.id} step={step} />
      ))}
    </div>
  );
}

export default HowItWorksStepsList;
