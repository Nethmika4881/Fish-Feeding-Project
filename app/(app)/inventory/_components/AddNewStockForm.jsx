"use client";

import { useMemo, useState } from "react";
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
import { useFormStatus } from "react-dom";
import { updateFeedStocks } from "@/app/_services/actions";
import toast from "react-hot-toast";

export default function AddFeedStockForm({ inventoryDetails }) {
  const [selectedFeed, setSelectedFeed] = useState("");
  const [open, setOpen] = useState(false);

  const inventoryFeedDetailsObj = useMemo(() => {
    if (!selectedFeed) return null;
    return inventoryDetails.find((t) => t.id === selectedFeed);
  }, [selectedFeed, inventoryDetails]);

  console.log(inventoryFeedDetailsObj);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // const submitData = {
    //   feedId: formData.get("feedType"),
    //   currentQuantity: Number(formData.get("quantity")),
    //   addStock: Number(formData.get("add_stock")),
    //   maxStock: Number(formData.get("max_stock")),
    //   costPerKg: Number(formData.get("cost")),
    //   // Calculate new quantity
    //   newQuantity:
    //     Number(formData.get("quantity")) + Number(formData.get("add_stock")),
    // };

    // console.log("Form submitted with data:", submitData);

    // Add your API call here
    const result = await updateFeedStocks(formData);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Stock updated successfully");

    setOpen(false);
    event.currentTarget.reset();
    setSelectedFeed("");
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

      <DialogContent className="bg-white sm:max-w-[650px]">
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
            <Select
              value={selectedFeed}
              onValueChange={setSelectedFeed}
              required
            >
              <SelectTrigger id="feed-type">
                <SelectValue placeholder="Select feed type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {inventoryDetails.map((inventory) => (
                  <SelectItem key={inventory.id} value={inventory.id}>
                    {inventory.feed_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              name="feed_id"
              value={inventoryFeedDetailsObj?.id || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Current Quantity (kg)</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              step="0.01"
              value={inventoryFeedDetailsObj?.quantity_now_kg || 0}
              readOnly
              className="border-none bg-slate-50 text-slate-600 shadow-sm"
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
              key={inventoryFeedDetailsObj?.id}
              defaultValue={inventoryFeedDetailsObj?.maxCapacity_kg || ""}
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
              key={inventoryFeedDetailsObj?.id}
              defaultValue={
                inventoryFeedDetailsObj?.low_stock_threshold_kg || ""
              }
              placeholder="e.g., 250"
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
              key={`cost-${inventoryFeedDetailsObj?.id}`}
              defaultValue={inventoryFeedDetailsObj?.cost_per_kg || ""}
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
      {pending ? "Updating..." : "Add to Inventory"}
    </Button>
  );
};
