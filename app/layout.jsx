import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-advanced-cropper/dist/style.css";
import "cropperjs/dist/cropper.css";

import { Loading, Navbar, Provider, Sidebar } from "@/exports";

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
        <Provider>
          <div className="h-full flex gap-2 sm:px-4 px-1 py-6">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
          <ToastContainer />
          <Loading />
        </Provider>
      </body>
    </html>
  );
}
