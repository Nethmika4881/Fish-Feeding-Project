"use server";

import { revalidatePath } from "next/cache";
import { updateProfileDetails } from "./supabaseActions";

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
