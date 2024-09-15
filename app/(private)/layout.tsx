import AuthenticationCheck from "@/components/AuthenticationCheck";
import Navbar from "@/components/ui/navbar";
import Sidebar from "@/components/ui/sidebar";
import SidebarMobile from "@/components/ui/sidebar-mobile";
import { ReactNode } from "react";


const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return <AuthenticationCheck>
    <div className="w-full h-full flex flex-row">
      <div className="sm:block hidden">
        <Sidebar />
      </div>
      <div className="flex-1 h-full">
        <div className="flex h-full flex-col">
          <div>
            <Navbar/>
          </div>
          <div className="mx-auto overflow-auto flex-1 w-full">
            <div className="w-full xs:py-5 p-4 ">
              {children}
            </div>
          </div>
          <div className="w-full sm:hidden block">
            <SidebarMobile/>
          </div>
        </div>
      </div>
    </div>
  </AuthenticationCheck>
};

export default AuthenticatedLayout;
