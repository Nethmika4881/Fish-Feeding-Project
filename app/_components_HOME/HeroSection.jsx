import DashBoardButton from "./DashBoardButton";
import LearnMoreButton from "./LearnMoreButton";

function HeroSection() {
  return (
    <section className="flex min-h-[calc(100vh-5rem)] flex-col items-center pt-50">
      <HeroTopic />
      <SubTopic />
      <div className="mt-10 flex flex-col items-center md:flex-row md:gap-10">
        <DashBoardButton>Go to Dashboard</DashBoardButton>
        <LearnMoreButton />
      </div>
    </section>
  );
}

function HeroTopic() {
  return (
    <h1 className="text-6xl font-extrabold text-[#0F1729]">
      Smart Fish Feeding System
    </h1>
  );
}

function SubTopic() {
  return (
    <h1 className="mt-4 text-xl font-normal tracking-wide text-[#64748B]">
      Automated feeding, real-time monitoring, and smart analytics for fish
      shops
    </h1>
  );
}

export default HeroSection;
