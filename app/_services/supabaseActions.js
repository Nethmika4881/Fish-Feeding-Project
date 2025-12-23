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

export const getFeedingSchedule = async function () {
  const { data: feedingSchedule, error } = await supabase
    .from("feeding_schedules")
    .select("*,tanks(tank_name)");

  console.log(feedingSchedule, "feeding_schedule");

  if (error) throw new Error("Couldnt get the details about feeding schedule");

  return feedingSchedule;
};

export const getUpcomingFeedingScheduleForToday = async function () {
  const { data, error } = await supabase
    .from("feeding_schedules")
    .select("*,tanks(tank_name)")
    .gt("feed_time", new Date().toLocaleTimeString("en-GB")); // e.g., "12:40:12"

  console.log(data, "Data now");
  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
export const getInventoryDetails = async function () {
  const { data: inventoryDetails, error } = await supabase
    .from("feed_inventory")
    .select("*");

  console.log(inventoryDetails, "inventoryDetails");

  if (error)
    throw new Error("Couldnt get the details about Inventory Details  ");

  return inventoryDetails;
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
