import { Suspense } from "react";
import { getProfileDetails } from "../_services/supabaseActions";
import BasicDetailsComponent from "./_components/BasicDetailsComponent";
import Header from "./_components/Header";

async function page() {
  const profileDetails = await getProfileDetails();
  return (
    <div>
      <Header />
      <div className="md:pt-2 md:pb-20">
        <BasicDetailsComponent profileDetails={profileDetails} />
      </div>
    </div>
  );
}

export default page;
