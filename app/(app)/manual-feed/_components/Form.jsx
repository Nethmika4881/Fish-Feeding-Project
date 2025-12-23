"use client";
import { manualFeedingAction } from "@/app/_lib/manualFeedingAction";

import { useFormStatus } from "react-dom";

function Form({ children }) {
  return (
    <form className="flex flex-col gap-10 text-lg" action={manualFeedingAction}>
      {/* <div className="space-y-2">
          <label>Full name</label>
          <input
            name="name"
            disabled
            //   defaultValue={fullName}
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            name="email"
            //   defaultValue={email}
            disabled
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div> */}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="tanks">Select the tank do you want to feed ?</label>
        </div>

        {children}
      </div>

      {/* <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            //   defaultValue={nationalID}
            name="nationalID"
            className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-3 shadow-sm"
          />
        </div> */}
      <div className="flex flex-col gap-3">
        <label htmlFor="amount">
          Select the amount do you want to feed (grams)?
        </label>

        <input
          required
          name="amount"
          className="bg-primary-200 text-primary-800 w-full rounded-sm px-5 py-1 shadow-sm focus:outline-2 focus:outline-blue-500"
        />
      </div>
      <div className="ml-auto">
        <Button />
      </div>
    </form>
  );
}

//useformstatus should be use in a component in  a form
const Button = function () {
  const { pending } = useFormStatus();

  return (
    <button
      className={`cursor-pointer rounded-md border-2 border-blue-500 bg-blue-500 px-4 py-2 font-semibold text-white transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${pending ? "opacity-60" : ""}`}
      disabled={pending}
    >
      Feed Now
    </button>
  );
};

export default Form;
