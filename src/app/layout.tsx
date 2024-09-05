import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ModalProvider} from "@/providers/ModalProvider";
import {cookieToInitialState, WagmiProvider} from "wagmi";
import {config} from "@/config/wagmi.config";
import { headers } from 'next/headers'
import AppKitProvider from "@/providers/AppKitProvider";
import {Toaster} from "@/components/ui/toaster";
import {Navbar} from "@/components/navbar";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))

  return (
    <html lang="en">
      <body className={inter.className}>
      <AppKitProvider initialState={initialState}>
        <ModalProvider>
          <Navbar />
          {children}
        </ModalProvider>
        <Toaster />
      </AppKitProvider>
      </body>
    </html>
  );
}
