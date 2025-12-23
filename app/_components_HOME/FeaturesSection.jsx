import FeatureList from "./FeatureList";
import FeaturesSectionHeader from "./FeaturesSectionHeader";

function FeaturesSection() {
  return (
    <section
      id="feature-section"
      // className="mx-auto flex min-h-[calc(100vh-20rem)]  bg-amber-100 scroll-mt-30 flex-col px-5 pb-20 md:px-10"
      className="min-h-[calc(100vh-18rem)] px-10 pt-10"
    >
      <FeaturesSectionHeader />
      <FeatureList />
    </section>
  );
}

export default FeaturesSection;
