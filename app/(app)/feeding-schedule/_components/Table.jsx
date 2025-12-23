"use client";

import Spinner from "@/app/_components/Spinner";
import { formatTimeHHMM } from "@/app/_services/helpUtils";
import { getFeedingSchedule } from "@/app/_services/supabaseActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

function StatusBadge({ status }) {
  const variant =
    status === "completed" || status === "not-info"
      ? "default"
      : status === "pending"
        ? "warning"
        : "destructive";

  return <Badge variant={variant}>{status}</Badge>;
}

export default function FishFeedSchedule() {
  const [feedLogs, setFeedLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getFeedingSchedule();
        // Map the fetched data to the table format

        const formattedLogs = data.map((log) => ({
          time: formatTimeHHMM(log.feed_time), // assuming log.feed_time is string
          tank: log.tanks?.tank_name || "Unknown Tank",
          feedType: log.feed_type,
          amount: `${log.feed_amount}g`,
          status: log.today_status || "pending", // add default status if missing
        }));
        setFeedLogs(formattedLogs);
      } catch (error) {
        console.error("Failed to fetch feeding schedule:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mx-auto mt-5 w-full max-w-7xl md:mt-0 md:p-6">
      <div className="min-h-100 rounded-lg px-8 py-4 shadow-sm">
        {loading && (
          <div className="mt-10">
            <Spinner />
          </div>
        )}
        {!loading && (
          <Table>
            <TableHeader>
              <TableRow className="text-stone-500">
                <TableHead className="font-semibold">Time</TableHead>
                <TableHead className="font-semibold">Tank</TableHead>
                <TableHead className="font-semibold">Feed Type</TableHead>
                <TableHead className="font-semibold">Amount</TableHead>
                <TableHead className="font-semibold">Today Status</TableHead>
                <TableHead className="text-right font-semibold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-stone-200">
              {feedLogs.map((log, i) => (
                <TableRow key={i} className="hover:bg-muted/30 px-4 py-3">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="text-muted-foreground h-4 w-4"
                        color="#64748B"
                      />
                      <span className="font-medium">{log.time}</span>
                    </div>
                  </TableCell>

                  <TableCell className="font-medium">{log.tank}</TableCell>

                  <TableCell className="text-muted-foreground">
                    {log.feedType}
                  </TableCell>

                  <TableCell className="font-medium">{log.amount}</TableCell>

                  <TableCell>
                    <StatusBadge status={log.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" color="red" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
