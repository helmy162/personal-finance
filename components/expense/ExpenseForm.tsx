"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IExpense } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface ExpenseFormProps {
  expense?: IExpense | null;
  categories: { [key: string]: string };
  payees: { [key: string]: string };
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (expenseData: Partial<IExpense>) => void;
}

const formSchema = z.object({
  PurchaseDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  Description: z.string().min(1, "Description is required"),
  Amount: z.number().nonnegative("Amount must be positive"),
  SalesTax: z.boolean(),
  PayeeKey: z.string().min(1, "Payee is required"),
  CategoryKey: z.string().min(1, "Category is required"),
  ReceiptPath: z.string().optional(),
});

export default function ExpenseForm({
  expense,
  categories,
  payees,
  isOpen,
  onClose,
  onSubmit,
}: ExpenseFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PurchaseDate: new Date().toISOString().split("T")[0],
      Description: "",
      Amount: 0,
      SalesTax: false,
      PayeeKey: "",
      CategoryKey: "",
      ReceiptPath: "",
    },
  });

  useEffect(() => {
    if (expense) {
      form.reset({
        PurchaseDate: new Date(expense.PurchaseDate)
          .toISOString()
          .split("T")[0],
        Description: expense.Description,
        Amount: expense.Amount,
        SalesTax: expense.SalesTax,
        PayeeKey: expense.PayeeKey,
        CategoryKey: expense.CategoryKey,
        ReceiptPath: expense.ReceiptPath || "",
      });
    } else {
      form.reset({
        PurchaseDate: new Date().toISOString().split("T")[0],
        Description: "",
        Amount: 0,
        SalesTax: false,
        PayeeKey: "",
        CategoryKey: "",
        ReceiptPath: "",
      });
    }
  }, [expense, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      PurchaseDate: new Date(values.PurchaseDate).getTime(),
      Amount: Number(values.Amount),
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{expense ? "Edit" : "Add"} Expense</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="PurchaseDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Date</FormLabel>
                  <FormControl>
                    <Input type="date" className="!w-full" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      step="0.01"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PayeeKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payee</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a payee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(payees).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CategoryKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categories).map(([key, name]) => (
                        <SelectItem key={key} value={key}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ReceiptPath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Path</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="SalesTax"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Sales Tax</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {expense ? "Update" : "Add"} Expense
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
