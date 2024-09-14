
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import StoreProvider from "@/providers/StoreProvider";
import { Toaster } from "@/components/ui/toaster"

const font = Font({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
});
export const metadata: Metadata = {
  title: "Socialize",
  description: "Socialize",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <StoreProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </StoreProvider>
        <Toaster/>
      </body>
    </html>
  );
}
