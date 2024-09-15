"use client";

import { signUpSecondStepSchema } from "@/schemas/auth.schema";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import {
  setCurrentStep,
  setSecondStepData,
} from "@/store/reducers/registerReducer";

import { validateImage } from "image-validator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DEFAULT_PROFILE_PICTURE } from "@/constants";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { createUser } from "@/actions/createUser";
import { imageToBase64 } from "@/utils/fileToBase64";
import { checkUserAvailability } from "@/actions/checkUserAvailability";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";

type FormType = z.infer<typeof signUpSecondStepSchema>;

const SignUpSecondStep = () => {
  const { toast } = useToast();
  const registerStepsData = useAppSelector(
    (state) => state.registerStepsReducer
  );
  const dispatch = useAppDispatch();
  const { email, firstname, lastname, password } = registerStepsData;
  const form = useForm<FormType>({
    resolver: zodResolver(signUpSecondStepSchema),
    defaultValues: {
      email,
      password,
      firstname,
      lastname,
      username: "",
      profilePic: undefined,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  const [profilePicPreview, setProfilePicPreview] = useState<string>(
    DEFAULT_PROFILE_PICTURE
  );

  const { profilePic, username } = form.watch();

  useEffect(() => {
    if (!profilePic) {
      if (profilePictureInputRef.current)
        profilePictureInputRef.current.value = "";
      return setProfilePicPreview(DEFAULT_PROFILE_PICTURE);
    }
    const imageFile = profilePic as File;
    const blobImageFile = URL.createObjectURL(imageFile);
    setProfilePicPreview(blobImageFile);
  }, [profilePic]);

  useEffect(() => {
    dispatch(setCurrentStep(2));
  }, [dispatch]);

  useEffect(() => {
    if (username && !username.startsWith("@")) {
      form.setValue("username", `@${username}`);
    }
  }, [username, form]);

  const submit = async (values: FormType) => {
    if (values.profilePic instanceof File) {
      try {
        const base64ProfilePic = await imageToBase64(values.profilePic);
        values.profilePic = base64ProfilePic;
      } catch (error) {
        console.error("Failed to convert file to base64", error);
        return;
      }
    }
    const response = await createUser(values);
    if (!response.created) {
      return toast({
        title: "Cannot create your user!",
        description: response.error,
        variant: "destructive",
      });
    }
    toast({
      title: "User created successfully!",
    });
    if (response.userId) {
      signIn("credentials", { email, password, redirect:false, callbackUrl: "/" });
    }
  };

  async function onSubmit(values: FormType) {
    try {
      setIsLoading(true);
      const userAvailability = await checkUserAvailability({
        username: values.username,
      });

      if (!userAvailability.available) {
        return form.setError("username", {
          message: "Username is already taken",
        });
      }
      dispatch(setSecondStepData(values));
      await submit(values);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Username..."
                    {...field}
                    value={field.value}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      field.onChange(newValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profilePic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={profilePicPreview} />
                    </Avatar>
                    {profilePicPreview !== DEFAULT_PROFILE_PICTURE && (
                      <div className="absolute top-full right-0 h-fit -translate-y-2/4 -mt-1">
                        <Badge
                          className="rounded-full !p-0 hover:bg-black cursor-pointer"
                          onClick={() => {
                            field.onChange(null);
                          }}>
                          <X size={16} />
                        </Badge>
                      </div>
                    )}
                  </div>
                  <FormControl className="flex-1">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload profile picture..."
                      ref={profilePictureInputRef}
                      onChange={async (e) => {
                        if (!e?.target?.files) return;
                        const file = e?.target?.files[0];
                        const isImage = await validateImage(file);
                        if (!isImage) {
                          form.setError("profilePic", {
                            message: "You can only upload an image",
                          });
                          return;
                        }
                        field.onChange(file);
                      }}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={isLoading} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpSecondStep;
