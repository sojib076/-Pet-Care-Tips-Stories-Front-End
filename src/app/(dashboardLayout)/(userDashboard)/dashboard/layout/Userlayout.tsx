"use client"
import { NavbarWrapper } from "@/app/(dashboardLayout)/components/dashboardNavbar/dashboardNavbar";
import { SidebarWrapper } from "@/app/(dashboardLayout)/components/sidebar/userSidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard -",
  description: "",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarWrapper />
      
        <NavbarWrapper> {children} </NavbarWrapper>
      
    </div>
  );
}


