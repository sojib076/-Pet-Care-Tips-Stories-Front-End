import type { Metadata } from "next";

import NavBar from "./components/page/shared/Navbar";

export const metadata: Metadata = {
  title: "Home -",
  description: "Pet social media platform",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar></NavBar>
      {children}
    </div>
  );
}
