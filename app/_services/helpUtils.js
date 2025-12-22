import { formatDistanceToNow } from "date-fns";
import { format, parse } from "date-fns";

export function formatTimeHHMM(supabaseTime) {
  if (!supabaseTime) return "";

  const date = parse(supabaseTime, "HH:mm:ss", new Date()); // Parse as time
  return format(date, "HH:mm"); // Format as "HH:mm"
}

export function formatTwoDecimals(value) {
  if (value === null || value === undefined) return "0.00";
  return Number(value).toFixed(2);
}

export const timeAgo = function (time) {
  return formatDistanceToNow(new Date(time), {
    addSuffix: true,
  });
};
