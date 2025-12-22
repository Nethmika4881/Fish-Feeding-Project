import { Suspense } from "react";
import { getProfileDetails } from "../_services/supabaseActions";
import BasicDetailsComponent from "./_components/BasicDetailsComponent";
import Header from "./_components/Header";

async function page() {
  const profileDetails = await getProfileDetails();
  return (
    <div>
      <Header />
      <Suspense fallback={<p>Loading....</p>}>
        <BasicDetailsComponent profileDetails={profileDetails} />
      </Suspense>
    </div>
  );
}

export default page;
