import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/sessionProvider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Socialize",
  description: "Social media application made by Ziyadanbari",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark ${inter.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
