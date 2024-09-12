
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import AuthContext from "@/components/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./globals.css";

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
        <Provider store={store}>
          <AuthContext>
            {children}
          </AuthContext>
        </Provider>
      </body>
    </html>
  );
}
