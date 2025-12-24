"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "lucide-react";
import EditAndDelete from "./dropDownMenu";

function StatusBadge({ status }) {
  const variant =
    status === "completed" || status === "not-info"
      ? "default"
      : status === "pending"
        ? "warning"
        : "destructive";
  return <Badge variant={variant}>{status}</Badge>;
}

export default function FishFeedScheduleClient({ initialData }) {
  return (
    <div className="mx-auto mt-5 w-full max-w-7xl md:mt-0 md:p-6">
      <div className="min-h-50 rounded-lg px-8 py-4 shadow-sm">
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
            {initialData.map((log, i) => (
              <TableEachRow log={log} key={log.id} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const TableEachRow = function ({ log }) {
  return (
    <TableRow className="px-4 py-3 hover:bg-stone-100">
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="text-muted-foreground h-4 w-4" color="#64748B" />
          <span className="font-medium">{log.time}</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">{log.tank}</TableCell>
      <TableCell className="text-muted-foreground">{log.feedType}</TableCell>
      <TableCell className="font-medium">{log.amount}</TableCell>
      <TableCell>
        <StatusBadge status={log.status} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-1">
          <EditAndDelete log={log} />
        </div>
      </TableCell>
    </TableRow>
  );
};
