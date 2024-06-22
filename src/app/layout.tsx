import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Layout } from "@/components";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Get Tickets Here",
  description: "Movie Ticket Online Booking Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <ThemeRegistry options={{ key: "mui" }}>
            <Layout>{children}</Layout>
          </ThemeRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
