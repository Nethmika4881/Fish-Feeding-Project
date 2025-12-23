// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   Deno.env.get("MY_SUPABASE_URL")!,
//   Deno.env.get("MY_SUPABASE_SERVICE_ROLE_KEY")!,
// );

// serve(async (req) => {
//   // Example: Delete all records older than 3 days from "logs" table
//   const { error } = await supabase
//     .from("alerts")
//     .delete()
//     .lt(
//       "created_at",
//       new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
//     );

//   if (error) return new Response(error.message, { status: 500 });
//   return new Response("Database cleared successfully!");
// });
