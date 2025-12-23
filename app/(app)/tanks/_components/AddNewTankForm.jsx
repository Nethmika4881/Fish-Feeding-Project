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

export default function AddNewTankForm() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log("Tank data:", {
      tankName: formData.get("tankName"),
      fishType: formData.get("fishType"),
      population: formData.get("population"),
      capacity: formData.get("capacity"),
    });

    setOpen(false);
    event.currentTarget.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer bg-[#0DA2E7] text-white hover:bg-[#0DA2E7]/90">
          <Plus /> Add New Tank
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white sm:max-w-[520px]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold">
            Add New Tank
          </DialogTitle>
          <DialogDescription>
            Set up a new aquarium in the system.
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
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Fish Type */}
          <div className="space-y-2">
            <Label>Fish Type</Label>
            <Select name="fishType" required>
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

          {/* Initial Population */}
          <div className="space-y-2">
            <Label htmlFor="population">Initial Population</Label>
            <Input
              id="population"
              name="population"
              type="number"
              placeholder="Number of fish"
              required
              className="border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
            />
          </div>

          {/* Tank Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacity">Tank Capacity (Liters)</Label>
            <Input
              id="capacity"
              name="capacity"
              type="number"
              placeholder="e.g., 500"
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
            <Button
              type="submit"
              className="cursor-pointer bg-[#0DA2E7] text-white hover:bg-[#0DA2E7]/90"
            >
              Create Tank
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
