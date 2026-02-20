"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black text-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
