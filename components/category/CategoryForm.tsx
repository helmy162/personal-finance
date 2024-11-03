"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface CategoryFormProps {
  categories: ICategory[];
  category?: ICategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: Partial<ICategory>) => void;
}

const noParentValue = "None";

const formSchema = z.object({
  CategoryName: z.string().min(1, "Category name is required"),
  ParentKey: z.string().optional(),
});

export default function CategoryForm({
  categories,
  category,
  isOpen,
  onClose,
  onSubmit,
}: CategoryFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      CategoryName: "",
      ParentKey: noParentValue,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        CategoryName: category.CategoryName,
        ParentKey: category.ParentKey ?? noParentValue,
      });
    } else {
      form.reset({
        CategoryName: "",
        ParentKey: noParentValue,
      });
    }
  }, [category, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const hasParent = values.ParentKey && values.ParentKey !== noParentValue;

    // Check if the selected parent is a child of the current category (for updates)
    if (category && hasParent) {
      const isChildOfCurrent = (parentKey: string): boolean => {
        const parent = categories.find((cat) => cat.Key === parentKey);
        if (!parent) return false;
        if (parent.Key === category.Key) return true;
        return parent.ParentKey ? isChildOfCurrent(parent.ParentKey) : false;
      };

      if (hasParent && isChildOfCurrent(values.ParentKey!)) {
        form.setError("ParentKey", {
          type: "manual",
          message: "Cannot set a child category as the parent",
        });
        return;
      }
    }

    onSubmit({
      CategoryName: values.CategoryName,
      ParentKey: hasParent ? values.ParentKey : undefined,
    });
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit" : "Add"} Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="CategoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ParentKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={noParentValue}>None</SelectItem>
                      {categories
                        .filter((cat) => cat.Key !== category?.Key)
                        .map((cat) => (
                          <SelectItem key={cat.Key} value={cat.Key}>
                            {cat.CategoryName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">
                {category ? "Update" : "Create"} Category
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
