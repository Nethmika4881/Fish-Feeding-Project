import { getTankDetails } from "@/app/_services/supabaseActions";
import TankCard from "./TankCard";

async function TankList() {
  const data = await getTankDetails();
  console.log(data, "tank list data");
  return (
    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2 md:px-4 lg:grid-cols-3">
      {data.map((tank) => (
        <TankCard tank={tank} key={tank.id} />
      ))}
    </div>
  );
}

export default TankList;
