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

export default function AddFeedStockForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Form submitted with data:", {
      feedType: formData.get("feedType"),
      quantity: formData.get("quantity"),
      supplier: formData.get("supplier"),
      cost: formData.get("cost"),
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
          <Plus /> Add Stock
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-130">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-slate-900">
            Add Feed Stock
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-600">
            Record new feed inventory to track stock levels.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="feed-type">Feed Type</Label>
            <Select name="feedType" required>
              <SelectTrigger id="feed-type">
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
            <Label htmlFor="quantity">Quantity (kg)</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              placeholder="e.g., 25"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              name="supplier"
              type="text"
              placeholder="e.g., AquaCorp"
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
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
              placeholder="e.g., 12.50"
              required
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
            <Button
              type="submit"
              className="cursor-pointer bg-[#0DA2E7] text-white hover:bg-[#0DA2E7]/90"
            >
              Add to Inventory
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
