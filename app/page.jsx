import FeaturesSection from "./_components_HOME/FeaturesSection";
import Footer from "./_components_HOME/Footer";
import Header from "./_components_HOME/Header";
import HeroSection from "./_components_HOME/HeroSection";
import HowItWorksSection from "./_components_HOME/HowItWorksSection";
import ReadyToTransform from "./_components_HOME/ReadyToTransform";
import WhyChooseSection from "./_components_HOME/WhyChooseSection";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#F9FAFB] pb-1 md:min-w-5xl lg:min-w-7xl">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <ReadyToTransform />
      <Footer />
    </div>
  );
}
