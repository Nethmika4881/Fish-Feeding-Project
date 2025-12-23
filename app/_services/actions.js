"use server";

import { revalidatePath } from "next/cache";
import {
  addANewSchedule,
  addANewTank,
  getExistingTankNamesOfASpecificUser,
  updateProfileDetails,
} from "./supabaseActions";

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
      max_population: Number(formData.get("capacity")),
      tank_volume_liters: Number(formData.get("tankVolumeLiters")),
      recommended_feed_per_day: Number(formData.get("recommendedFeedPerDay")),
    };

    if (tankNames.includes(details.tank_name)) {
      throw new Error("This tank name is already exist");
    }
    await addANewTank([details]);

    revalidatePath("/tanks");

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: error.message || "Failed to create tank" };
  }
};

export const addNewFeedSchedule = async (formData) => {
  console.log(formData, "formdata");
  try {
    const details = {
      shop_id: "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
      tank_id: formData.get("tank"),
      feed_type: formData.get("feed-type"),
      feed_time: formData.get("time"),
      feed_amount: Number(formData.get("amount")),
      today_status: "not-info",
      is_enabled: true, // Set to true by default
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
