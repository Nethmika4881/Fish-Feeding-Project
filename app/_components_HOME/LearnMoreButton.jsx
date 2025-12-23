"use client";
const scrollFeature = () => {
  document
    .getElementById("feature-section")
    ?.scrollIntoView({ behavior: "smooth" });
};

export default function LearnMoreButton() {
  return (
    <button
      onClick={scrollFeature}
      className="rounded-xl border border-stone-700 bg-white px-4 py-2"
    >
      Learn More &rarr;
    </button>
  );
}
