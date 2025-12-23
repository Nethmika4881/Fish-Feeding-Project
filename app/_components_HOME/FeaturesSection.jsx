import FeatureList from "./FeatureList";
import FeaturesSectionHeader from "./FeaturesSectionHeader";

function FeaturesSection() {
  return (
    <section
      id="feature-section"
      className="flex min-h-[calc(100vh-20rem)] min-w-7xl scroll-mt-30 flex-col px-10 pb-20"
    >
      <FeaturesSectionHeader />
      <FeatureList />
    </section>
  );
}

export default FeaturesSection;
