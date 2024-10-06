"use client"
import { NavbarWrapper } from "@/app/(dashboardLayout)/components/dashboardNavbar/dashboardNavbar";

import { SidebarWrapper } from "../../components/sidebar/adminSidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard -",
  description: "",
};

export default function Adminlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex ">

      <SidebarWrapper/>
    
        <NavbarWrapper> {children} </NavbarWrapper>
      
    </div>
  );
}


