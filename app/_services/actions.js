"use server";

import { revalidatePath } from "next/cache";
import {
  addANewSchedule,
  addANewTank,
  deleteSchedule,
  deleteTank,
  getExistingTankNamesOfASpecificUser,
  logout,
  updateInventoryDetails,
  updateProfileDetails,
  updateTankDetails,
} from "./supabaseActions";
import { supabase } from "../_lib/supabase";
import { redirect } from "next/dist/server/api-utils";
import { getMQTTService } from "../_lib/mqtt/mqttClient";

export const profileDetailsAction = async (formData) => {
  const phone = formData.get("phonenumber")?.trim();
  const shop = formData.get("shop_name")?.trim();

  const phoneRegex1 = /^(?:\+94|94|0)(70|71|72|74|75|76|77|78)[0-9]{7}$/;
  const phoneRegex2 =
    /^(?:\+94|94|0)(?:7[0-9]{8}|(?:11|21|23|31|33|34|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)[0-9]{6})$/;

  if (phone && !phoneRegex1.test(phone) && !phoneRegex2.test(phone)) {
    return { error: "Invalid Phone Number" };
  }

  const updatedFields = {};
  if (shop) updatedFields.shop_name = shop;
  if (phone) updatedFields.phone = phone;

  if (Object.keys(updatedFields).length === 0) return;

  await updateProfileDetails(
    "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
    updatedFields,
  );

  revalidatePath("/settings");

  return { success: true };
};

export const addNewTankAction = async (formData) => {
  const tanks = await getExistingTankNamesOfASpecificUser(
    "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
  );
  const tankNames = tanks.map((tank) => tank.tank_name);
  try {
    const details = {
      shop_id: "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
      tank_name: formData.get("tankName"),
      fish_type: formData.get("fishType"),
      fish_count: Number(formData.get("population")),
      max_population: Number(formData.get("max_population")),
      tank_volume_liters: Number(formData.get("tankVolumeLiters")),
      recommended_feed_per_day: Number(formData.get("recommendedFeedPerDay")),
    };

    if (tankNames.includes(details.tank_name)) {
      throw new Error("This tank name is already exist");
    }

    if (details.max_population < details.fish_count) {
      throw new Error(
        "Initial population must be less than the maximum fish count",
      );
    }
    await addANewTank([details]);

    revalidatePath("/tanks");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error.message || "Failed to create tank" };
  }
};

export const updateExistingTankAction = async (tank_id, formData) => {
  try {
    const details = {
      tank_name: formData.get("tankName"),
      fish_type: formData.get("fishType"),
      fish_count: Number(formData.get("now_population")),
      max_population: Number(formData.get("max_population")),
      tank_volume_liters: Number(formData.get("tankVolumeLiters")),
      recommended_feed_per_day: Number(formData.get("recommendedFeedPerDay")),
    };

    if (details.max_population < details.fish_count) {
      throw new Error(
        "Current population must be less than the maximum fish count",
      );
    }
    await updateTankDetails(tank_id, details);

    revalidatePath("/tanks");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error.message || "Failed to edit tank" };
  }
};

export const deleteTankAction = async (tank_id) => {
  try {
    await deleteTank(tank_id);

    revalidatePath("/tanks");

    return { success: true };
  } catch (error) {
    console.error(error);
    console.log(error);
    return { error: error.message || "Failed to delete tank" };
  }
};
export const addNewFeedSchedule = async (formData) => {
  console.log(formData, "formdata");
  const feedTime = formData.get("time");
  const currentTime = new Date();
  const [hours, minutes] = feedTime.split(":");
  const scheduledTime = new Date();
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

  try {
    const details = {
      shop_id: "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
      tank_id: formData.get("tank"),
      feed_name: formData.get("feed-type"),
      feed_time: feedTime,
      feed_amount: Number(formData.get("amount")),
      today_status: currentTime > scheduledTime ? "scheduled" : "pending",
      is_enabled: true,
    };

    console.log(details, "DETAILSSSSSSS");
    const result = await addANewSchedule([details]);
    console.log("Insert result:", result);

    revalidatePath("/feeding-schedule");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Full error:", error);
    return { error: error.message || "Failed to create schedule" };
  }
};

export const updateFeedStocks = async function (formData) {
  console.log(formData, "got go g");
  const id = formData.get("feed_id");
  try {
    const details = {
      quantity_now_kg:
        Number(formData.get("quantity")) + Number(formData.get("add_stock")),
      maxCapacity_kg: Number(formData.get("max_stock")),
      cost_per_kg: Number(formData.get("cost")),
      low_stock_threshold_kg: Number(formData.get("min_stock")),
    };
    await updateInventoryDetails(id, details);
    revalidatePath("/inventory");
    revalidatePath("/analytics");

    return { success: true };
  } catch (error) {
    console.error("Full error:", error);
    return { error: error.message || "Failed to update inventory" };
  }
};

export const deleteScheduleAction = async function (id) {
  console.log(id, " my id ");
  try {
    await deleteSchedule(id);
    revalidatePath("/feeding-schedule");

    return { success: true };
  } catch (error) {
    console.error("Full error:", error);
    return { error: error.message || "Failed to delete feeding schedule" };
  }
};

export const updateScheduleAction = async function (id, formData) {
  try {
    const tank = formData.get("tank");
    const time = formData.get("time");
    const feedType = formData.get("feed-type");
    const amount = formData.get("amount");

    const { error } = await supabase
      .from("feeding_schedules")
      .update({
        tank_id: tank,
        feed_time: time,
        feed_name: feedType,
        feed_amount: amount,
      })
      .eq("id", id);

    if (error) throw new Error("Couldn't update schedule");

    revalidatePath("/feeding-schedule");
    return { success: true };
  } catch (error) {
    console.error("Full error:", error);
    return { error: error.message || "Failed to update feeding schedule" };
  }
};
