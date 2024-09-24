import AuthenticationCheck from "@/components/authentication-check";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SidebarMobile from "@/components/sidebar-mobile";
import { ReactNode } from "react";

const AuthenticatedLayout = ({ children, modal }: { children: ReactNode, modal:ReactNode }) => {
  return (
    <AuthenticationCheck>
      {/* <PostModal /> */}
      {modal}
      <div className="w-full h-full flex flex-row">
        <div className="sm:block hidden">
          <Sidebar />
        </div>
        <div className="flex-1 h-full">
          <div className="flex h-full flex-col">
            <div>
              <Navbar />
            </div>
            <div className="mx-auto overflow-auto flex-1 w-full">
              <div className="w-full xs:py-5 py-4 px-2 min-h-full">{children}</div>
            </div>
            <div className="w-full sm:hidden block">
              <SidebarMobile />
            </div>
          </div>
        </div>
      </div>
    </AuthenticationCheck>
  );
};

export default AuthenticatedLayout;
