"use client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Input,
  Separator,
  Eye,
  EyeOff,
  isImage,
  CircleUserRound,
  ErrorText,
  getBase64,
  cleanObject,
  toasty,
  register as Register,
  useSession,
  useLoading,
  refreshSession,
  GoogleButton,
} from "@/exports";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const { status, setSession } = useSession();
  if (status === "authenticated") {
    return redirect("/");
  }
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const { setLoading } = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const imageFile = watch("avatar");
  const imagePreview = imageFile
    ? window.URL.createObjectURL(new Blob(imageFile))
    : null;
  const onSubmit = async (data) => {
    setLoading(true);
    let { username, password, avatar } = data;
    if (avatar && avatar[0]) {
      const base64 = await getBase64(avatar[0]);
      if (base64) avatar = base64;
    }
    const body = cleanObject({
      username,
      password,
      avatar: typeof avatar === "string" ? avatar : undefined,
    });
    try {
      console.log(body);
      const response = await Register({ ...body });
      toasty("success", response.message);
      await refreshSession(setSession);
    } catch (error) {
      if (error?.name?.toLowerCase() === "zoderror") {
        const issues = error.issues;
        issues.forEach(({ path, message }) => {
          setError(path[0], { message });
        });
      } else {
        toasty("error", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center take_screen">
      <div className="flex flex-col gap-6 m-5">
        <div className="text-4xl font-semibold">Register to Socialize</div>
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
                placeholder="Username"
              />
              {errors.username && (
                <ErrorText className="mt-1">
                  {errors.username.message}
                </ErrorText>
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
                  className="absolute right-4 top-2/4 -translate-y-2/4 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <EyeOff />}
                </div>
              </div>
              {errors.password && (
                <ErrorText className="mt-1">
                  {errors.password.message}
                </ErrorText>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div>
                <Avatar>
                  <AvatarImage src={imagePreview} />
                  <AvatarFallback className="bg-slate-600">
                    {watch("username")?.slice(0, 1) || <CircleUserRound />}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <Input
                  type="file"
                  {...register("avatar", {
                    validate: (files) =>
                      files[0]
                        ? isImage(files[0]) || "You can just upload an image"
                        : true,
                  })}
                  className={errors.avatar && "input-error"}
                />
                {errors.avatar && (
                  <ErrorText className="mt-1">
                    {errors.avatar.message}
                  </ErrorText>
                )}
              </div>
            </div>

            <div>
              <Button className="w-full">
                <div className="text-base font-medium">Register</div>
              </Button>
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
            Already have an account?{" "}
            <Link
              className=" text-blue-500 underline hover:no-underline"
              href={"/login"}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
