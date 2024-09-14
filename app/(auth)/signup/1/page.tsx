"use client";

import { signUpFirstStepSchema } from "@/schemas/auth.schema";
import React, { useEffect, useState } from "react";
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
  setFirstStepData,
} from "@/store/reducers/registerReducer";
import { useRouter } from "next/navigation";
import { checkUserAvailability } from "@/actions/checkUserAvailability";
import { useToast } from "@/hooks/use-toast";

type FormType = z.infer<typeof signUpFirstStepSchema>;

const SignUpFirstStep = () => {
  const registerStepsData = useAppSelector(
    (state) => state.registerStepsReducer
  );
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    email = "",
    firstname = "",
    lastname = "",
    password = "",
  } = registerStepsData;
  const form = useForm<FormType>({
    resolver: zodResolver(signUpFirstStepSchema),
    defaultValues: {
      email,
      password,
      firstname,
      lastname,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(setCurrentStep(1));
  }, [dispatch]);

  async function onSubmit(values: FormType) {
    try {
      setIsLoading(true);
      const userAvailability = await checkUserAvailability({
        email: values.email,
      });
      if (!userAvailability.available) {
        return form.setError("email", { message: "Email is already taken" });
      }
      dispatch(setFirstStepData(values));
      router.push("/signup/2");
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
          <div className="flex items-center gap-2 [&>*]:flex-1">
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button loading={isLoading} type="submit">
            Next
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignUpFirstStep;
