import type { Metadata } from "next";

import Adminlayout from "./layout/Adminlayout";
import DashboardLayout from "../layout/dashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin Dashboard",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardLayout>
        <Adminlayout>   <div className="lg:px-10 px-4 pt-10">
          {children}
        </div> 
        </Adminlayout>

      </DashboardLayout>


    </div>
  );
}
