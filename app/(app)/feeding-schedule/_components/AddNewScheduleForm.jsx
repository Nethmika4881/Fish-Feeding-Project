"use client";

import { useState } from "react";
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

export default function AddScheduleForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Form submitted with data:", {
      tank: formData.get("tank"),
      time: formData.get("time"),
      feedType: formData.get("feedType"),
      amount: formData.get("amount"),
    });

    setOpen(false);
    event.currentTarget.reset();
  };

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
            <Label
              htmlFor="tank"
              className="text-base font-medium text-slate-900"
            >
              Tank
            </Label>
            <Select name="tank" required>
              <SelectTrigger
                id="tank"
                className="w-full rounded-lg border-2 border-[#0DA2E7] bg-white px-4 py-3 text-base text-slate-500"
              >
                <SelectValue placeholder="Select tank" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="tank-1">Tank 1 - Koi Pond</SelectItem>
                <SelectItem value="tank-2">Tank 2 - Tropical</SelectItem>
                <SelectItem value="tank-3">Tank 3 - Cichlid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="time"
              className="text-base font-medium text-slate-900"
            >
              Time
            </Label>
            <Input
              id="time"
              name="time"
              type="time"
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
            <Select name="feedType" required>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer rounded-lg border border-slate-300 bg-white px-8 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer rounded-lg bg-[#0DA2E7] px-8 py-3 text-base font-medium text-white hover:bg-[#0DA2E7]/90"
            >
              Create Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
