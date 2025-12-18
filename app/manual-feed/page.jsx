import { HandCoins } from "lucide-react";
import { Suspense } from "react";
import Form from "./_components/Form";
import SelectTank from "./_components/SelectTank";
import { getTankDetails } from "../_services/supabaseActions";

async function page() {
  const data = await getTankDetails();
  console.log(data, "Data");
  return (
    <>
      <div className="mx-auto mt-10 flex w-7/8 flex-col gap-6 rounded-lg border border-[#CFECFA] bg-white px-12 py-8 shadow-sm lg:w-200">
        <h1 className="flex items-center gap-2 font-bold">
          <span>
            <HandCoins color="#2e9ed6" size={25} />
          </span>
          <span>Manual Feeds</span>
        </h1>
        <Suspense fallback={<p>Loading....</p>}>
          <Form>
            <SelectTank tanks={data} id="tanks" />
          </Form>
        </Suspense>
      </div>
    </>
  );
}

export default page;
