import AuthenticationCheck from "@/components/AuthenticationCheck";
import { ReactNode } from "react";


const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return <AuthenticationCheck>
    {children}
  </AuthenticationCheck>
};

export default AuthenticatedLayout;
