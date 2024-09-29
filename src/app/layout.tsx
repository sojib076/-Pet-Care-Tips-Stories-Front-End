import type { Metadata } from "next";
import "./globals.css";
import Providers from "./lib/Providers";

export const metadata: Metadata = {
  title: "Wheels",
  description: "Next Level Riding Sharing Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <Providers>
          <div className="">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
