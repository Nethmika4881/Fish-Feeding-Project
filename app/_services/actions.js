"use server";

import { revalidatePath } from "next/cache";
import { updateProfileDetails } from "./supabaseActions";

export const profileDetailsAction = async function (formData) {
  const nationalID = formData.get("nationalID");
  const email = formData.get("email");
  const phonenumber = formData.get("phonenumber");
  const shopName = formData.get("shop_name");

  // Only validate if values exist and are not empty
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email");
  }

  if (nationalID && !/^(?:[0-9]{9}[VvXx]|[0-9]{12})$/.test(nationalID)) {
    throw new Error("Please enter a valid NIC number");
  }

  if (phonenumber && phonenumber.trim() !== "") {
    if (
      !/^(?:\+94|94|0)(70|71|72|74|75|76|77|78)[0-9]{7}$/.test(phonenumber) &&
      !/^(?:\+94|94|0)(?:7[0-9]{8}|(?:11|21|23|31|33|34|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)[0-9]{6})$/.test(
        phonenumber,
      )
    ) {
      throw new Error("Please enter a valid phone number");
    }
  }

  // Build update object with only non-empty values
  const updatedFields = {};
  if (shopName && shopName.trim()) updatedFields.shop_name = shopName.trim();
  if (phonenumber && phonenumber.trim())
    updatedFields.phone = phonenumber.trim();

  // Only update if there are fields to update
  if (Object.keys(updatedFields).length === 0) {
    throw new Error("No fields to update");
  }

  await updateProfileDetails(
    "4e7ab86b-37b2-40e8-a789-01f675d6df3b",
    updatedFields,
  );

  revalidatePath("/settings");
};
