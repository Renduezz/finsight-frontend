import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TransactionsProvider } from "@/shared/context/TransactionsContext";
import { CompanyProvider } from "@/shared/context/CompanyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinSight AI",
  description: "Financial intelligence platform for SMEs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CompanyProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </CompanyProvider>
      </body>
    </html>
  );
}