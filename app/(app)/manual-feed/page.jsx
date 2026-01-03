import { AlertCircle, HandCoins } from "lucide-react";
import { Suspense } from "react";
import Spinner from "../_components/Spinner";
import { getFoodNames } from "../_services/supabaseActions";
import Form from "./_components/Form";

async function page() {
  const feedNames = await getFoodNames();
  return (
    <>
      <div className="mx-auto mt-10 flex w-full flex-col gap-6 rounded-xl border border-[#CFECFA] bg-white px-3 py-8 shadow-sm md:px-8 lg:w-200 lg:px-12">
        <h1 className="flex items-center gap-2 font-bold">
          <span>
            <HandCoins color="#2e9ed6" size={25} />
          </span>
          <span>Manual Feeds</span>
        </h1>
        <Suspense fallback={<Spinner />}>
          <Form feedNames={feedNames}></Form>
        </Suspense>

        <div className="flex flex-col gap-2 rounded-xl bg-[#FFFBEB] px-3 py-4 text-sm">
          <span className="flex items-center gap-2 text-[#973C00]">
            <AlertCircle size={20} color="#973C00" />
            Safety Note
          </span>
          <span className="text-[#973C00]">
            Ensure the tank water level is normal before manual feeding. Maximum
            safe single dose is 200g.
          </span>
        </div>
      </div>
    </>
  );
}

export default page;
