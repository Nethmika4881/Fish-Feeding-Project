import HowItWorksStepsList from "./HowItWorksStepsList";

function HowItWorksSection() {
  return (
    <section className="min-h-[calc(100vh-18rem)] px-10 pt-10">
      <Header />
      <HowItWorksStepsList />
    </section>
  );
}

export default HowItWorksSection;

function Header() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Topic />
      <SubTopic />
    </div>
  );
}
function Topic() {
  return (
    <h1 className="text-3xl font-extrabold text-[#0F1729]">How It Works</h1>
  );
}

function SubTopic() {
  return (
    <h1 className="my-5 text-[#9CA6B5]">Get started in three simple steps</h1>
  );
}
