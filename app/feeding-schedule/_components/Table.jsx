import React from "react";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

const feedLogs = [
  {
    time: "08:00 AM",
    tank: "Tank A - Koi",
    feedType: "Pellets L",
    amount: "75g",
    status: "completed",
  },
  {
    time: "08:15 AM",
    tank: "Tank B - Goldfish",
    feedType: "Flakes",
    amount: "40g",
    status: "completed",
  },
  {
    time: "06:00 PM",
    tank: "Tank A - Koi",
    feedType: "Pellets L",
    amount: "75g",
    status: "pending",
  },
  {
    time: "06:30 PM",
    tank: "Tank C - Tropical",
    feedType: "Micro Pellets",
    amount: "25g",
    status: "pending",
  },
  {
    time: "07:00 PM",
    tank: "Tank D - Cichlids",
    feedType: "Sticks",
    amount: "30g",
    status: "failed",
  },
];

function StatusBadge({ status }) {
  const variant =
    status === "completed"
      ? "default"
      : status === "pending"
        ? "warning"
        : "destructive";

  return <Badge variant={variant}>{status}</Badge>;
}

export default function FishFeedSchedule() {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="rounded-lg px-8 py-4 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="text-stone-500">
              <TableHead className="font-semibold">Time</TableHead>
              <TableHead className="font-semibold">Tank</TableHead>
              <TableHead className="font-semibold">Feed Type</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
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
      </div>
    </div>
  );
}
