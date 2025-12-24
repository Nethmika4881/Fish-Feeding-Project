"use client";

import { updateFeedStocks } from "@/app/_services/actions";
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

export default function EditInventoryDetails({ inventoryDetails, inventory }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // Validate max > min
    const maxStock = Number(formData.get("max_stock"));
    const minStock = Number(formData.get("min_stock"));

    if (maxStock <= minStock) {
      toast.error("Maximum stock must be greater than minimum stock");
      return;
    }

    const result = await updateFeedStocks(formData);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Stock updated successfully");

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex h-12 w-full cursor-pointer items-center justify-between bg-[#ced4da] px-4 py-2 text-[.8rem] font-semibold transition-all duration-300 hover:bg-[#adb5bd] hover:opacity-80">
          <span>View Details</span>
          <span>&rarr;</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[650px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Edit Stock - {inventory?.feed_name}
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Edit feed inventory to track stock levels.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Hidden input for feed_id */}
          <input type="hidden" name="feed_id" value={inventory?.id || ""} />

          <div className="space-y-2">
            <Label htmlFor="feed_name">Feed Name</Label>
            <Input
              id="feed_name"
              name="feed_name"
              type="text"
              value={inventory?.feed_name || ""}
              readOnly
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Current Quantity (kg)</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              value={inventory?.quantity_now_kg || 0}
              readOnly
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="add_stock">Add Stock (kg)</Label>
            <Input
              id="add_stock"
              name="add_stock"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 50"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="max_stock">Expected Maximum Stock (kg)</Label>
            <Input
              id="max_stock"
              name="max_stock"
              type="number"
              step="0.01"
              min="0"
              defaultValue={inventory?.maxCapacity_kg || ""}
              placeholder="e.g., 250"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="min_stock">Expected Minimum Stock (kg)</Label>
            <Input
              id="min_stock"
              name="min_stock"
              type="number"
              step="0.01"
              min="0"
              defaultValue={inventory?.low_stock_threshold_kg || ""}
              placeholder="e.g., 50"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cost">Cost per kg ($)</Label>
            <Input
              id="cost"
              name="cost"
              type="number"
              step="0.01"
              min="0"
              defaultValue={inventory?.cost_per_kg || ""}
              placeholder="e.g., 12.50"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <DialogFooter className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
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
      {pending ? "Updating..." : "Update Stock"}
    </Button>
  );
};
