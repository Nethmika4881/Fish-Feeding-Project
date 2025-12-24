"use client";

import { useTankDetails } from "@/app/_context/tankDetailsContext";
import { updateScheduleAction } from "@/app/_services/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function EditScheduleForm({ log }) {
  const { id, time, tank: tank_name, feedType: feed_type, amount } = log;
  const { tanksDetails, loading } = useTankDetails();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const currentTank = tanksDetails?.find((t) => t.tank_name === tank_name);
  const [tankId, setTankId] = useState(currentTank?.id || "");

  const [feedType, setFeedType] = useState(feed_type || "");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Form submitted with data:", {
      id,
      tank: formData.get("tank"),
      time: formData.get("time"),
      feedType: formData.get("feed-type"),
      amount: formData.get("amount"),
    });

    const res = await updateScheduleAction(id, formData);
    console.log(res, "Res");

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Successfully updated schedule");
    setOpen(false);
    router.refresh(); // Refresh the page data
  };

  if (loading) return null;

  // Clean the amount value (remove 'g' if present)
  const cleanAmount =
    typeof amount === "string" ? amount.replace("g", "") : amount;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="focus:text-destructive flex w-full cursor-pointer items-center justify-start bg-stone-50 hover:bg-stone-100">
          <Pencil className="mr-2 h-4 w-4" color="#0DA2E7" /> Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[650px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Edit Schedule
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Edit a schedule already in the system
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-base font-medium text-slate-900">Tank</Label>
            <Select value={tankId} onValueChange={setTankId} required>
              <SelectTrigger className="w-full border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2">
                <SelectValue placeholder="Select a tank" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {tanksDetails?.map((tank) => (
                  <SelectItem key={tank.id} value={tank.id}>
                    {tank.tank_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="tank" value={tankId} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="time"
              className="text-base font-medium text-slate-900"
            >
              Time (24-hour format)
            </Label>
            <Input
              id="time"
              defaultValue={time}
              name="time"
              type="time"
              step="1"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="feed-type"
              className="text-base font-medium text-slate-900"
            >
              Feed Type
            </Label>
            <Select value={feedType} onValueChange={setFeedType} required>
              <SelectTrigger
                id="feed-type"
                className="w-full border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
              >
                <SelectValue placeholder="Select feed type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="premium-koi">
                  Premium Koi Pellets (L)
                </SelectItem>
                <SelectItem value="tropical-micro">
                  Tropical Micro Pellets
                </SelectItem>
                <SelectItem value="cichlid-sticks">Cichlid Sticks</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="feed-type" value={feedType} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="amount"
              className="text-base font-medium text-slate-900"
            >
              Amount (grams)
            </Label>
            <Input
              defaultValue={cleanAmount}
              id="amount"
              name="amount"
              type="number"
              step="1"
              placeholder="e.g., 50"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <DialogFooter className="flex gap-3 pt-2">
            <CancelButton setOpen={setOpen} />
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const SubmitButton = function () {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="cursor-pointer bg-[#0DA2E7] text-white hover:bg-[#0DA2E7]/90"
    >
      {pending ? "Updating..." : "Update Schedule"}
    </Button>
  );
};

const CancelButton = function ({ setOpen }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setOpen(false)}
      className="cursor-pointer"
      disabled={pending}
    >
      Cancel
    </Button>
  );
};
