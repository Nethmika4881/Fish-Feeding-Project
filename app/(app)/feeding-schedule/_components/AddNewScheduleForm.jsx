"use client";

import { useTankDetails } from "@/app/_context/tankDetailsContext";
import { addNewFeedSchedule } from "@/app/_services/actions";
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
import { Plus } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function AddScheduleForm() {
  const { tanksDetails, loading } = useTankDetails();
  const [open, setOpen] = useState(false);
  const [tankId, setTankId] = useState("");
  const [feedType, setFeedType] = useState(""); // Add state for feed type

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Form submitted with data:", {
      tank: formData.get("tank"),
      time: formData.get("time"),
      feedType: formData.get("feed-type"),
      amount: formData.get("amount"),
    });

    const res = await addNewFeedSchedule(formData);
    console.log(res, "Res");

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Successfully created new schedule");

    setOpen(false);
    event.currentTarget.reset();
    setTankId("");
    setFeedType(""); // Reset feed type
  };

  if (loading) return;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="cursor-pointer rounded-xl bg-[#0DA2E7] px-4 py-2 text-sm text-white shadow-sm hover:bg-[#0DA2E7]/90 hover:text-white"
        >
          <Plus /> Add Schedule
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[650px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add New Schedule
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Create a new automated feeding schedule for your tanks.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Tank</Label>
            <Select value={tankId} onValueChange={setTankId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select tank" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {tanksDetails.map((tank) => (
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
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-500"
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
      {pending ? "Creating..." : "Create Schedule"}
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
