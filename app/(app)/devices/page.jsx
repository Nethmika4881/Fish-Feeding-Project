import { getDeviceDetails } from "../_services/supabaseActions";
import DeviceList from "./_components/DeviceList";
import Header from "./_components/Header";

async function page() {
  const deviceDetails = await getDeviceDetails();
  return (
    <div>
      <Header />
      <DeviceList deviceDetails={deviceDetails} />
    </div>
  );
}

export default page;
