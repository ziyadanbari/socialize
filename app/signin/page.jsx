"use client";

import GoogleButton from "@/components/GoogleButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "@/exports";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    console.log(data);
    const status = await signIn("login", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    console.log(status);
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col gap-6">
        <div className="text-4xl font-semibold">Login to Socialize</div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <div>
              <Input
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is missed",
                  },
                })}
                placeholder="Email or username"
              />
            </div>
            <div className="relative">
              <div>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is missed",
                    },
                  })}
                  placeholder="Password"
                />
              </div>
              <div
                className="absolute right-4 top-2/4 -translate-y-2/4"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Eye /> : <EyeOff />}
              </div>
            </div>
            <div>
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </div>
        <div>
          <Separator>or</Separator>
        </div>
        <div>
          <div>
            <GoogleButton />
          </div>
        </div>
      </div>
    </div>
  );
}
