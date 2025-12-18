"use server";

import { supabase } from "../_lib/supabase";

export const getTankDetails = async function () {
  const { data: tanksDetails, error } = await supabase
    .from("tanks_details")
    .select("*");

  if (error) throw new Error("Couldnt get the details about tanks");

  return tanksDetails;
};
