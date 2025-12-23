import { getAlerts } from "../_services/supabaseActions";
import Header from "./_components/Header";
import WarningList from "./_components/WarningList";

async function page() {
  const alerts = await getAlerts();
  console.log(alerts);
  return (
    <div>
      <Header />
      <WarningList alerts={alerts} />
    </div>
  );
}

export default page;
