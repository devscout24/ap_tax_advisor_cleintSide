"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SelectInput from "../selectInput";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import DateTimeCalendar from "./DateTimeCalendar";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    queryMethod: z.string().min(1, { message: "Query method is required" }),
    emailAddress: z.string().optional(),
    query: z.string().optional(),
    phone: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Conditional validation: If queryMethod is 'email', then emailAddress and query are required
    if (data.queryMethod === "email") {
      if (!data.emailAddress || data.emailAddress.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Email address is required when query method is Email",
          path: ["emailAddress"],
        });
      } else if (!z.string().email().safeParse(data.emailAddress).success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid email address",
          path: ["emailAddress"],
        });
      }
    }

    // Conditional validation: If queryMethod is 'p[hone', then phoneNumber, date-time calendar and query are required
    if (data.queryMethod === "phone") {
      if (!data.phone || data.phone.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Phone number is required when query method is Phone",
          path: ["phone"],
        });
      }
    }

    // Conditional validation: If queryMethod is 'email' OR 'phone', then query is required
    if (data.queryMethod === "email" || data.queryMethod === "phone") {
      if (!data.query || data.query.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Query details are required for the selected method",
          path: ["query"],
        });
      }
    }
  });

export default function EmailQueryForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      queryMethod: "",
      emailAddress: "",
      query: "",
    },
  });

  const selectedQueryMethod = form.watch("queryMethod");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Query Method submitted successfully!");
  }

  const communicationMethods = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "meeting", label: "Meeting" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* First And Last Name */}
        <div className="space-y-2">
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-muted-foreground text-[16px]">
                    <p>
                      First name <span className="-ml-1 text-red-500">*</span>
                    </p>
                  </FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Enter your first name"
                      {...field}
                      className="text-muted-foreground border-muted-foreground/20 focus:border-muted-foreground/20 focus-visible:border-muted-foreground/20 placeholder:text-muted-foreground/50 border !bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <FormLabel className="text-muted-foreground text-[16px]">
                    Last name <span className="-ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Enter your last name"
                      {...field}
                      className="text-muted-foreground border-muted-foreground/20 focus:border-muted-foreground/20 focus-visible:border-muted-foreground/20 placeholder:text-muted-foreground/50 border !bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <p className="text-muted-foreground text-[12px]">
            Please enter your full legal name and not your nickname!
          </p>
        </div>

        {/* Query Method */}
        <FormField
          control={form.control}
          name="queryMethod"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <SelectInput
                  placeholder="Select a query method"
                  items={communicationMethods}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full"
                  contentClassName="w-10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Conditional Fields for Email Query Method */}
        {selectedQueryMethod === "email" && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-muted-foreground text-[16px]">
                    Email Address <span className="-ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      // placeholder="Enter your email address"
                      {...field}
                      className="text-muted-foreground border-muted-foreground/20 focus:border-muted-foreground/20 focus-visible:border-muted-foreground/20 placeholder:text-muted-foreground/50 border !bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {/* Conditional Fields for Phone Query Method */}
        {selectedQueryMethod === "phone" && (
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-muted-foreground text-[16px]">
                    Phone Number <span className="-ml-1 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="text-muted-foreground border-muted-foreground/20 focus:border-muted-foreground/20 focus-visible:border-muted-foreground/20 placeholder:text-muted-foreground/50 border !bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-muted-foreground hover:text-muted-foreground">
              <FormLabel className="text-muted-foreground hover:text-muted-foreground text-[16px]">
                Schedule a meeting (if required)
              </FormLabel>
              <DateTimeCalendar />
            </div>
          </div>
        )}

        {/* Query Textarea Field */}
        {(selectedQueryMethod === "email" ||
          selectedQueryMethod === "phone") && (
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-muted-foreground text-[16px]">
                  Your Query <span className="-ml-1 text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please provide details about your tax query so that we can better understand your position."
                    {...field}
                    className="text-muted-foreground border-muted-foreground/20 focus:border-muted-foreground/20 focus-visible:border-muted-foreground/20 placeholder:text-muted-foreground/50 custom-scrollbar max-h-[200px] border !bg-white focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button
          type="submit"
          className="w-full cursor-pointer rounded-sm bg-[#00990099] text-white transition-colors duration-300 hover:bg-[#009900ab]"
          size={"lg"}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
