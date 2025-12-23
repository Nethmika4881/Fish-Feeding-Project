function FeaturesSectionHeader() {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <Topic />
      <SubTopic />
    </div>
  );
}

function Topic() {
  return (
    <h1 className="text-3xl font-extrabold text-[#0F1729]">
      Powerful Features
    </h1>
  );
}

function SubTopic() {
  return (
    <h1 className="my-5 text-center text-[#9CA6B5]">
      Everything you need to manage your fish feeding system efficiently
    </h1>
  );
}

export default FeaturesSectionHeader;
