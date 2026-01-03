import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import Footer from "../_components/Footer";
import "../globals.css";
import { TanksDetailsProvider } from "../_context/tankDetailsContext";
import { Toaster } from "react-hot-toast";
const inter = Inter({
  subsets: ["latin"],
});

export default function DashboardLayout({ children }) {
  return (
    <div className={`${inter.className} h-screen overflow-hidden antialiased`}>
      <div className="flex h-screen flex-col lg:grid lg:grid-cols-[18rem_1fr] lg:grid-rows-[auto_1fr]">
        <aside className="row-span-2 hidden lg:block">
          <Sidebar />
        </aside>
        <Header />
        <main className="h-full overflow-y-auto bg-stone-50 px-4 py-2">
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              duration: 4000,
              style: {
                color: "#363636",
                background: "#fff",
                fontWeight: 500,
              },
              className: "",
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
              error: {
                duration: 5000,
              },
            }}
          />
          <SpeedInsights />

          <TanksDetailsProvider>{children}</TanksDetailsProvider>
        </main>

        <div className="mt-auto w-full bg-[#0F1729] text-red-100 md:hidden">
          <Footer />
        </div>
      </div>
    </div>
  );
}
