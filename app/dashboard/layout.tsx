import Header from "@/components/header";
import { ClerkLoaded } from "@clerk/nextjs";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkLoaded>
      <div className="flex-1 flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto"></main>
        {children}
      </div>
    </ClerkLoaded>
  );
};

export default DashboardLayout;
