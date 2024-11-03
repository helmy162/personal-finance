"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IPayee } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PayeeFormProps {
  payee?: IPayee | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payeeData: Partial<IPayee>) => void;
}

const formSchema = z.object({
  CompanyName: z.string().min(1, "Company name is required"),
  Address1: z.string().optional(),
  Address2: z.string().optional(),
  City: z.string().optional(),
  State: z.string().optional(),
  PostalCode: z.string().optional(),
  Country: z.string().optional(),
  TaxID: z.string().optional(),
  PrimaryContact: z.string().optional(),
  PrimaryContactPhone: z.string().optional(),
  PrimaryContactEmail: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
});

export default function PayeeForm({
  payee,
  isOpen,
  onClose,
  onSubmit,
}: PayeeFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CompanyName: "",
      Address1: "",
      Address2: "",
      City: "",
      State: "",
      PostalCode: "",
      Country: "",
      TaxID: "",
      PrimaryContact: "",
      PrimaryContactPhone: "",
      PrimaryContactEmail: "",
    },
  });

  useEffect(() => {
    if (payee) {
      form.reset(payee);
    } else {
      form.reset();
    }
  }, [payee, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{payee ? "Edit" : "Add"} Payee</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="CompanyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Address1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="State"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PrimaryContact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PrimaryContactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Contact Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">{payee ? "Update" : "Create"} Payee</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
