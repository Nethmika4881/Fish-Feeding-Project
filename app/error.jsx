"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-stone-100 px-4">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-red-100 p-6">
            <AlertTriangle className="h-20 w-20 text-red-500" />
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <h1 className="text-4xl font-bold text-stone-800 md:text-5xl">
            Something Went Wrong
          </h1>
          <p className="text-lg text-stone-600">
            Something went wrong. Our team has been notified and is working on
            it.
            <br />
            The requested page could not be found or is temporarily unavailable.
          </p>

          {/* Error Details (only in development) */}
          {/* {process.env.NODE_ENV === "development" && error?.message && (
            <div className="mx-auto mt-6 max-w-lg rounded-lg bg-red-50 p-4 text-left">
              <p className="text-sm font-semibold text-red-800">
                Error Details:
              </p>
              <p className="mt-2 text-sm text-red-700">{error.message}</p>
            </div>
          )} */}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            onClick={reset}
            className="flex w-full items-center gap-2 bg-[#0DA2E7] px-6 py-6 text-base font-medium text-white hover:bg-[#0DA2E7]/90 sm:w-auto"
          >
            <RefreshCw className="h-5 w-5" />
            Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="flex w-full items-center gap-2 border-[#0DA2E7] px-6 py-6 text-base font-medium text-[#0DA2E7] hover:bg-[#0DA2E7]/10 sm:w-auto"
            >
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-sm text-stone-500">
          If this problem persists, please contact support at{" "}
          <a
            href="mailto:support@example.com"
            className="font-medium text-[#0DA2E7] hover:underline"
          >
            support@example.com
          </a>
        </p>

        <div className="mt-12 flex items-center justify-center gap-8 opacity-30">
          <div className="h-16 w-16 animate-pulse rounded-full bg-red-200"></div>
          <div
            className="h-20 w-20 animate-pulse rounded-full bg-red-300"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-16 w-16 animate-pulse rounded-full bg-red-200"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
