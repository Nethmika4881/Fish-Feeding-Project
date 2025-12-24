"use client";
import { useTankDetails } from "@/app/_context/tankDetailsContext";
import { manualFeedingAction } from "@/app/_lib/manualFeedingAction";
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
import Spinner from "../../_components/Spinner";

function Form({ feedNames }) {
  const { tanksDetails, loading } = useTankDetails();
  const [selectedTank, setSelectedTank] = useState("");
  const [selectedFood, setSelectedFood] = useState("");
  const [amount, setAmount] = useState("");

  if (loading) return <Spinner />;

  const handleSubmit = async (formData) => {
    const result = await manualFeedingAction(formData);

    if (result.success) {
      toast.success(result.message);
    } else if (result.partialSuccess) {
      toast.warning(result.error); // Show warning, not error
    } else {
      toast.error(result.error);
    }
  };

  // Retry failed request
  const handleRetry = async (requestId) => {
    const result = await retryFeedingRequest(requestId);
    if (result.success) {
      toast.success("Feeding command resent!");
    }
  };
  return (
    <form className="flex flex-col gap-6 text-lg" action={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="tank">Select Tank</Label>
        <Select
          name="tank"
          value={selectedTank}
          onValueChange={setSelectedTank}
          required
        >
          <SelectTrigger
            id="tank"
            className="w-full border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
          >
            <SelectValue placeholder="Select Tank" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {tanksDetails.map((tank) => (
              <SelectItem value={tank.id.toString()} key={tank.id}>
                {tank.tank_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="food">Food Name</Label>
        <Select
          name="foodType"
          value={selectedFood}
          onValueChange={setSelectedFood}
          required
        >
          <SelectTrigger
            id="food"
            className="w-full border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
          >
            <SelectValue placeholder="Select food type" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {feedNames.map((feed) => (
              <SelectItem value={feed.feed_name} key={feed.feed_name}>
                {feed.feed_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">
          Select the amount do you want to feed (kg)?
        </Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="e.g., 100"
          required
          className="w-full border-none shadow-sm focus-visible:ring-2 focus-visible:ring-[#50A2FF] focus-visible:ring-offset-2"
        />
      </div>

      <div className="ml-auto">
        <Button />
      </div>
    </form>
  );
}

const Button = function () {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`cursor-pointer rounded-md bg-[#0DA2E7] px-6 py-2 font-semibold text-white transition hover:bg-[#0DA2E7]/90 disabled:cursor-not-allowed disabled:opacity-50 ${
        pending ? "opacity-60" : ""
      }`}
      disabled={pending}
    >
      {pending ? "Sending..." : "Feed Now"}
    </button>
  );
};

export default Form;
