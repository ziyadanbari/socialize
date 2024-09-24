'use client'
import UnAuthenticatedChecker from "@/components/unauthenticated-checker";
import { ReactNode } from "react";
import SocialAuth from "@/components/social-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const isRegister = pathname.includes('signup')
  return (
    <UnAuthenticatedChecker>
      <div
        className="w-screen h-full flex items-center justify-center">
        <div className="flex items-center justify-center md:max-w-[50%] xs:max-w-[66%] xs:min-w-[500px] xs:w-fit w-full xs:p-8 rounded-xl bg-white xs:shadow-lg xs:border border-black/30 pl-2 pr-4 pb-5 pt-10">
          <div className="w-full h-full flex flex-col items-center gap-3">
            <div className="text-3xl font-bold">Socialize</div>
            <div className="w-full">{children}</div>
            <div>Or continue with</div>
            <div>
              <SocialAuth/>
            </div>
            <div>
              {isRegister ? "Already" : "Don't"} have account? <Link className="underline text-blue-500 hover:no-underline font-bold" href={isRegister ? "/signin" : "/signup"}>{isRegister ? "Sign in" :"Sign up"}</Link>
            </div>
          </div>
        </div>
      </div>
    </UnAuthenticatedChecker>
  );
};

export default AuthLayout;
