import DashBoardButton from "./DashBoardButton";
import LearnMoreButton from "./LearnMoreButton";

function HeroSection() {
  return (
    <section className="flex flex-col items-center py-10 md:min-h-[calc(100vh-15rem)] md:pt-30 lg:pt-50">
      <HeroTopic />
      <SubTopic />
      <SubTopicForMobile />
      <div className="mt-10 flex items-center gap-5 md:flex-row md:gap-10">
        <DashBoardButton>Go to Dashboard</DashBoardButton>
        <LearnMoreButton />
      </div>
    </section>
  );
}

function HeroTopic() {
  return (
    <h1 className="text-center text-3xl font-extrabold text-[#0F1729] md:text-5xl lg:text-6xl">
      Smart Fish Feeding System
    </h1>
  );
}

function SubTopic() {
  return (
    <h1 className="mt-4 hidden text-center text-[.8rem] font-normal text-[#64748B] md:text-xl md:tracking-wide">
      Automated feeding, real-time monitoring, and smart analytics for fish
      shops
    </h1>
  );
}

function SubTopicForMobile() {
  return (
    <h1 className="mt-4 text-[1rem] font-normal text-[#64748B] md:hidden md:text-xl md:tracking-wide">
      Automated feeding, real-time monitoring, <br />
      and smart analytics for fish shops
    </h1>
  );
}

export default HeroSection;
