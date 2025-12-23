import DashBoardButton from "./DashBoardButton";

function ReadyToTransform() {
  return (
    <div className="my-10 flex h-100 w-full flex-col items-center justify-center gap-5 border-y border-stone-200 bg-[#EDF5FA] text-center">
      <h1 className="text-center text-4xl font-extrabold text-stone-800">
        Ready to Transform Your Fish Shop?
      </h1>

      <h4 className="mb-5 text-xl text-stone-400 opacity-80">
        Start managing your feeding system more efficiently today
      </h4>

      <DashBoardButton>Get Started Now &rarr;</DashBoardButton>
    </div>
  );
}

export default ReadyToTransform;
