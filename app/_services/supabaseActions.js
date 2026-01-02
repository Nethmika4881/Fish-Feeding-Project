"use server";

import { supabase } from "../_lib/supabase";

export const getTankDetails = async function () {
  const { data: tanksDetails, error } = await supabase
    .from("tanks")
    .select("*");

  console.log(tanksDetails, "tankdetails");

  if (error) throw new Error("Couldnt get the details about tanks");

  return tanksDetails;
};

export const updateTankDetails = async function (tank_id, details) {
  const { error } = await supabase
    .from("tanks")
    .update([details])
    .eq("id", tank_id)
    .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");
  if (error) throw new Error("Couldnt update the Tank Details  ");
};

export const deleteTank = async function (tank_id) {
  // 1. Delete devices in this tank first
  const { error: error1 } = await supabase
    .from("devices")
    .delete()
    .eq("location", tank_id)
    .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");

  if (error1) {
    console.error(error1, "Failed to delete devices");
    throw new Error("Couldn't delete the devices in the tank");
  }

  // 1. Delete devices in this tank first
  const { error: error2 } = await supabase
    .from("feed_logs")
    .delete()
    .eq("tankId", tank_id)
    .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");

  if (error2) {
    console.error(error2, "Failed to delete devices");
    throw new Error("Couldn't delete the feed logs of the tank");
  }
  // 2. Now delete the tank
  const { error } = await supabase
    .from("tanks")
    .delete()
    .eq("id", tank_id)
    .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");

  if (error) {
    console.error(error, "Failed to delete tank");
    throw new Error("Couldn't delete the tank");
  }

  console.log("Tank and its devices deleted successfully");
};
export const getFeedingSchedule = async function () {
  const { data: feedingSchedule, error } = await supabase
    .from("feeding_schedules")
    .select("*,tanks(tank_name)");

  console.log(feedingSchedule, "feeding_schedule");

  if (error) throw new Error("Couldnt get the details about feeding schedule");

  return feedingSchedule;
};
export const getUpcomingFeedingScheduleForToday = async function () {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 8);

  const { data, error } = await supabase
    .from("feeding_schedules")
    .select("*, tanks(tank_name)")
    .gt("feed_time", currentTime)
    .order("feed_time", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
export const getInventoryDetails = async function () {
  const { data: inventoryDetails, error } = await supabase
    .from("feed_inventory")
    .select("*");

  if (error)
    throw new Error("Couldnt get the details about Inventory Details  ");

  return inventoryDetails;
};

export const updateInventoryDetails = async function (id, details) {
  const { error } = await supabase
    .from("feed_inventory")
    .update([details])
    .eq("id", id)
    .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");
  console.log(id, details, "love");
  if (error) throw new Error("Couldnt update the Inventory Details  ");
};

export const getDeviceDetails = async function () {
  const { data: deviceDetails, error } = await supabase
    .from("devices")
    .select("*,tanks(tank_name)");

  console.log(deviceDetails, "deviceDetails");

  if (error) throw new Error("Couldnt get the details about device Details  ");

  return deviceDetails;
};

export const getProfileDetails = async function () {
  const { data: profileDetails, error } = await supabase
    .from("shop_profile")
    .select("*");

  console.log(profileDetails, "profileDetails");

  if (error) throw new Error("Couldnt get the profile Details  ");

  return profileDetails;
};

export const updateProfileDetails = async function (id, updateDetails) {
  const { error } = await supabase
    .from("shop_profile")
    .update(updateDetails)
    .eq("id", id);

  if (error) throw new Error("Couldnt update the profile Details  ");
};

export const getAlerts = async function () {
  const { data, error } = await supabase
    .from("alerts")
    .select("*,tanks(tank_name),devices(device_code,status)");

  if (error) throw new Error("Couldnt get the alerts  ");

  return data.filter((x) => x.is_read === false);
};

export const addANewTank = async function (details) {
  const { error } = await supabase.from("tanks").insert(details).select();

  if (error) throw new Error("Couldnt add the tank");
};

export const addANewSchedule = async function (details) {
  console.log(details, "details i got");
  const { data, error } = await supabase
    .from("feeding_schedules")
    .insert(details)
    .select(); // Add .select() to return the inserted data

  if (error) {
    console.error("Supabase error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw new Error(`Couldn't add the schedule: ${error.message}`);
  }

  console.log("Successfully inserted:", data);
  return data;
};

export const getExistingTankNamesOfASpecificUser = async function (id) {
  const { data, error } = await supabase
    .from("tanks")
    .select("tank_name")
    .eq("shop_id", id);

  if (error) throw new Error("Couldnt get the tank names  ");

  return data;
};

export const getFoodNames = async function () {
  const { data, error } = await supabase
    .from("feed_inventory")
    .select("feed_name");

  if (error) throw new Error("Couldnt get feed names");

  return data;
};

export const deleteSchedule = async function (id) {
  console.log(id, "id id id di");
  const { error } = await supabase
    .from("feeding_schedules")
    .delete()
    .eq("id", id);

  if (error) throw new Error("Couldnt delete schedule");
};

//dashboard boxes

export const getNumOfTanks = async function () {
  const { count, error } = await supabase
    .from("tanks")
    .select("*", { count: "exact", head: true });
  if (error) throw new Error("Couldnt get num of tanks");

  return count;
};

export const get_tank_amountoffeedused_numoftimesfeeded_lastweek =
  async function () {
    // const { data, error } = await supabase
    //   .from("feed_logs")
    //   .select(
    //     `
    //     feeding_schedules (
    //       feed_amount,
    //       tanks ( tank_name )
    //     ),
    //     manual_feeding_requests (
    //       feed_amount,
    //       tanks ( tank_name )
    //     )
    //   `,
    //   )
    //   .eq("shop_id", "4e7ab86b-37b2-40e8-a789-01f675d6df3b");

    // console.log(data);
    // if (error) throw new Error("Couldnt get feed amount details");

    // const amounts = data.reduce((acc, log) => {
    //   console.log(log, "log");
    //   const tankName =
    //     log?.manual_feeding_requests.tanks.tank_name ||
    //     log?.feeding_schedules.tanks.tank_name;

    //   if (!acc[tankName]) {
    //     acc[tankName] = {
    //       tankName,
    //       feed_amount: 0,

    //       logCount: 0,
    //     };
    //   }

    //   acc[tankName].feed_amount +=
    //     log?.manual_feeding_requests.feed_amount ||
    //     log?.feeding_schedules.feed_amount;
    //   acc[tankName].logCount += 1;
    //   // if (data?.manual_feeding_requests) {
    //   //   return data.manual_feeding_  requests.feed_amount;
    //   // }
    //   // if (data?.feeding_schedules) {
    //   //   return data.feeding_schedules.feed_amount;
    //   // }

    //   return acc;
    // }, {});
    // // const feededAmount = amounts.reduce((acc, cur) => acc + cur, 0);
    // return amounts;
    // // return feededAmount;

    const { data, error } = await supabase.rpc(
      "get_tank_amountoffeedused_numoftimesfeeded",
      {
        p_shop_id: "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
      },
    );
    if (error) throw new Error("could get analysis for pie chart");
    return data;
  };

export const get_week_feed_amounts_daily = async function () {
  const { data, error } = await supabase.rpc("get_week_feed_amounts_daily", {
    p_shop_id: "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
  });

  if (error) throw new Error("could get analysis for bar chart");

  return data;
};
export const numOfAlerts = async function name() {
  const { count, error } = await supabase
    .from("alerts")
    .select("*", { count: "exact", head: true });
  if (error) throw new Error("Couldnt get num of alerts");

  return count;
};

//authentication
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;
  console.log(session, "session");
  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  console.log(data, "user");
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
