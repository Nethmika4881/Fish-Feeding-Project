"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "../login/actions";

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, {});

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="flex justify-center pt-2 pb-4">
          <Image width={300} height={300} src="/logoLoginForm.png" alt="logo" />
        </div>
        <h1 className="mb-6 text-3xl font-bold">Welcome Back</h1>
        <form action={formAction} className="space-y-6">
          {state?.error && (
            <p className="rounded bg-red-100 p-3 text-red-700">{state.error}</p>
          )}

          <input
            name="email"
            type="email"
            required
            placeholder="sample@gmail.com"
            className="w-full rounded-xl border border-blue-400 px-4 py-4"
          />

          <input
            name="password"
            type="password"
            required
            placeholder="password"
            className="w-full rounded-xl border border-blue-400 px-4 py-4"
          />

          <Button />
        </form>
      </div>
    </div>
  );
}

const Button = function () {
  const { pending } = useFormStatus();
  return (
    <div className="flex w-full items-center justify-center">
      <button
        type="submit"
        disabled={pending}
        className={`w-full cursor-pointer rounded-xl bg-blue-500 py-4 font-semibold text-white ${pending ? "opacity-60" : ""}`}
      >
        {pending ? (
          <Loader size={25} className="mx-auto animate-spin" />
        ) : (
          "Log in"
        )}
      </button>
    </div>
  );
};
