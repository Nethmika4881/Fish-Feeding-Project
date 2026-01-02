"use client";
import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-stone-100 px-4">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#0DA2E7] drop-shadow-lg">
            404
          </h1>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="h-1 w-20 rounded-full bg-[#0DA2E7]"></div>
            <Search className="h-8 w-8 text-stone-400" />
            <div className="h-1 w-20 rounded-full bg-[#0DA2E7]"></div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <h2 className="text-3xl font-bold text-stone-800 md:text-4xl">
            Page Not Found
          </h2>
          <p className="text-lg text-stone-600">
            Oops! The page you&apos;re looking for seems to have swum away.Check
            your internet connection
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/">
            <Button className="flex w-full items-center gap-2 bg-[#0DA2E7] px-6 py-6 text-base font-medium text-white hover:bg-[#0DA2E7]/90 sm:w-auto">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex w-full items-center gap-2 border-[#0DA2E7] px-6 py-6 text-base font-medium text-[#0DA2E7] hover:bg-[#0DA2E7]/10 sm:w-auto"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 flex items-center justify-center gap-8 opacity-30">
          <div className="h-16 w-16 animate-bounce rounded-full bg-[#0DA2E7]/20"></div>
          <div
            className="h-20 w-20 animate-bounce rounded-full bg-[#0DA2E7]/30"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="h-16 w-16 animate-bounce rounded-full bg-[#0DA2E7]/20"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
