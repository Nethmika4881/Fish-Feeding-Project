"use client";
import { deleteScheduleAction } from "@/app/_services/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import EditScheduleForm from "./EditScheduleForm"; // Import the form

export default function EditAndDelete({ log }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this schedule?")) {
      return;
    }
    setIsDeleting(true);
    try {
      const res = await deleteScheduleAction(log?.id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Successfully deleted schedule");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete schedule");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0DA2E7] focus-visible:ring-offset-1"
          disabled={isDeleting}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border border-stone-100 bg-stone-50"
        align="end"
      >
        <EditScheduleForm log={log} />
        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive cursor-pointer hover:bg-stone-100"
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" color="red" />
          <span>{isDeleting ? "Deleting..." : "Delete"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
