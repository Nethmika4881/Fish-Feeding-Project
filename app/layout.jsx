// layout.jsx
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import "./globals.css";
import Footer from "./_components/Footer";
import { TanksDetailsProvider } from "./_context/tankDetailsContext";
import { Toaster } from "react-hot-toast";
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Fish Farm Management",
  description: "Manage your fish farm operations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} h-screen overflow-hidden antialiased`}
      >
        <div className="flex h-screen flex-col justify-between lg:grid lg:grid-cols-[18rem_1fr] lg:grid-rows-[auto_1fr]">
          {/* Sidebar spans all rows on desktop */}
          <aside className="row-span-2 hidden lg:block">
            <Sidebar />
          </aside>
          {/* Header */}
          <Header />
          {/* Main Content */}
          <main className="h-full overflow-y-auto bg-stone-50 px-4 py-2">
            {/* position: 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center' */}
            {/* Controls whether new toasts appear on top or bottom of previous ones , reverseOrder: true | false */}
            {/*gutter:  Spacing between multiple toasts (in px): */}
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
            {/* <TanksDetailsProvider>{children}</TanksDetailsProvider> */}
            <TanksDetailsProvider>{children}</TanksDetailsProvider>
          </main>
          <div className="mt-auto w-full bg-[#0F1729] text-red-100 md:hidden">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
