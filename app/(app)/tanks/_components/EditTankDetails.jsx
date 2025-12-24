"use client";

import {
  addNewTankAction,
  deleteTankAction,
  updateExistingTankAction,
} from "@/app/_services/actions";
import { deleteTank } from "@/app/_services/supabaseActions";
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
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

export default function EditTankDetails({ tank }) {
  const [selectFishType, setSelectFishType] = useState(tank?.fish_type || "");
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    id: tank_id,
    tank_name: name,
    fish_type: fishType,
    fish_count: population,
    max_population: maxPopulation,
    tank_volume_liters: tankVolumeLiters,
    recommended_feed_per_day: dailyFeedLimit,
  } = tank || {};

  const handleSubmit = async (event) => {
    event?.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await updateExistingTankAction(tank_id, formData);

    if (res?.error) {
      toast.error(res.error);
      return;
    }

    toast.success("Successfully updated tank");
    setOpen(false);
  };

  const handleDelete = async () => {
    // Add confirmation dialog
    if (!confirm("Are you sure you want to delete this tank?")) {
      return;
    }

    setIsDeleting(true);
    try {
      const res = await deleteTankAction(tank_id);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      toast.success("Successfully deleted tank");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to delete tank");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex h-12 w-full cursor-pointer items-center justify-between bg-[#ced4da] px-4 py-2 text-[.8rem] font-semibold transition-all duration-300 hover:bg-[#adb5bd] hover:opacity-80">
          <span>View Details</span>
          <span>&rarr;</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[520px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Edit Tank Details
          </DialogTitle>
          <DialogDescription>
            Edit an existing aquarium in the system.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Tank Name */}
          <div className="space-y-2">
            <Label htmlFor="tankName">Tank Name</Label>
            <Input
              id="tankName"
              name="tankName"
              placeholder="e.g., Tank A1"
              required
              defaultValue={name}
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Fish Type */}
          <div className="space-y-2">
            <Label>Fish Type</Label>
            <Select
              name="fishType"
              required
              value={selectFishType}
              onValueChange={setSelectFishType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fish type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="koi">Koi</SelectItem>
                <SelectItem value="tilapia">Tilapia</SelectItem>
                <SelectItem value="goldfish">Goldfish</SelectItem>
                <SelectItem value="guppy">Guppy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Current Population */}
          <div className="space-y-2">
            <Label htmlFor="now_population">Current Population</Label>
            <Input
              id="now_population"
              name="now_population"
              type="number"
              defaultValue={population}
              placeholder="Number of fish"
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Tank Capacity */}
          <div className="space-y-2">
            <Label htmlFor="max_population">Max Population</Label>
            <Input
              id="max_population"
              name="max_population"
              type="number"
              defaultValue={maxPopulation}
              placeholder="e.g., 500"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Tank Volume */}
          <div className="space-y-2">
            <Label htmlFor="tankVolumeLiters">Tank Volume (Liters)</Label>
            <Input
              id="tankVolumeLiters"
              defaultValue={tankVolumeLiters}
              name="tankVolumeLiters"
              type="number"
              placeholder="e.g., 2000"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Recommended feed per day */}
          <div className="space-y-2">
            <Label htmlFor="recommendedFeedPerDay">
              Recommended Feed Per Day (grams)
            </Label>
            <Input
              defaultValue={dailyFeedLimit}
              id="recommendedFeedPerDay"
              name="recommendedFeedPerDay"
              type="number"
              placeholder="e.g., 200"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <DialogFooter className="flex w-full gap-3 pt-2">
            <DeleteButton handleDelete={handleDelete} isDeleting={isDeleting} />
            <CancelButton setOpen={setOpen} isDeleting={isDeleting} />
            <SubmitButton isDeleting={isDeleting} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const SubmitButton = function ({ isDeleting }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || isDeleting}
      className="cursor-pointer bg-[#0DA2E7] text-white hover:bg-[#0DA2E7]/90"
    >
      {pending ? "Updating..." : "Update Tank"}
    </Button>
  );
};

const CancelButton = function ({ setOpen, isDeleting }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="button"
      variant="outline"
      onClick={() => setOpen(false)}
      className="cursor-pointer"
      disabled={pending || isDeletingt}
    >
      Cancel
    </Button>
  );
};

const DeleteButton = function ({ handleDelete, isDeleting }) {
  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleDelete}
      className="mr-auto cursor-pointer hover:opacity-80 disabled:cursor-not-allowed"
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};
