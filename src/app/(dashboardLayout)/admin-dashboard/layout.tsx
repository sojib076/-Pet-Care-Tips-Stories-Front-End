import type { Metadata } from "next";

import Adminlayout from "./layout/Adminlayout";
import DashboardLayout from "../layout/dashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard - Apollo Gears",
  description: "Next Level Riding Sharing Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardLayout> 
  <Adminlayout> {children} </Adminlayout>

      </DashboardLayout>
      
    
    </div>
  );
}
