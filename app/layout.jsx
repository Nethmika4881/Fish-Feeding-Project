// layout.jsx
import { Inter } from "next/font/google";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import "./globals.css";
import Footer from "./_components/Footer";
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
            {/* <TanksDetailsProvider>{children}</TanksDetailsProvider> */}
            {children}
          </main>
          <div className="mt-auto w-full bg-[#0F1729] text-red-100 md:hidden">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
