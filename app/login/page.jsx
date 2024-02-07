"use client";
import {
  Eye,
  EyeOff,
  Button,
  Input,
  Separator,
  ErrorText,
  useSession,
  toasty,
  refreshSession,
  login,
  useLoading,
  GoogleButton,
} from "@/exports";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const { setLoading } = useLoading();
  const { status, setSession } = useSession();
  if (status === "authenticated") {
    return redirect("/");
  }
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login(data.username, data.password);
      toasty("success", response.message);
      await refreshSession(setSession);
    } catch (error) {
      toasty("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center take_screen">
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
                className={errors.username && "input-error"}
                placeholder="Email or username"
              />
              {errors.username && (
                <ErrorText>{errors.username.message}</ErrorText>
              )}
            </div>
            <div>
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
                    className={errors.password && "input-error"}
                    placeholder="Password"
                  />
                </div>
                <div
                  className="absolute right-4 top-2/4 -translate-y-2/4"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
              {errors.password && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </div>
            <div>
              <Button className="w-full">Login</Button>
            </div>
          </form>
        </div>
        <div>
          <Separator>or</Separator>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div>
              <GoogleButton />
            </div>
          </div>
          <div className="text-center">
            Don't have an account?{" "}
            <Link
              className=" text-blue-500 underline hover:no-underline"
              href={"/register"}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
