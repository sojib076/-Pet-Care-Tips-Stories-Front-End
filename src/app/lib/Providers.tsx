"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/uAuthContext";
import { SessionProvider } from "next-auth/react"; // Import SessionProvider


function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <Toaster />
        <NextThemesProvider attribute="class" >
          <SessionProvider>
    
            <UserProvider>
              {children}
            </UserProvider>
          
          </SessionProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default Providers;
