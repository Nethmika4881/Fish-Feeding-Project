"use client";

import { useActionState } from "react";
import { loginAction } from "../login/actions";
import Image from "next/image";

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

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-500 py-4 font-semibold text-white"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
