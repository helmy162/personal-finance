"use client";

import { useState, useEffect } from "react";
import { ICategory } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface CategoryFormProps {
  categories: ICategory[];
  category?: ICategory | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (categoryData: Partial<ICategory>) => void;
}

export default function CategoryForm({
  categories,
  category,
  isOpen,
  onClose,
  onSubmit,
}: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(
    category?.CategoryName || ""
  );
  const [parentKey, setParentKey] = useState(category?.ParentKey || "");

  useEffect(() => {
    if (category) {
      setCategoryName(category.CategoryName);
      setParentKey(category.ParentKey || "");
    } else {
      setCategoryName("");
      setParentKey("");
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ CategoryName: categoryName, ParentKey: parentKey || undefined });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit" : "Add"} Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Name
              </Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parentCategory" className="text-right">
                Parent
              </Label>
              <Select value={parentKey} onValueChange={setParentKey}>
                <SelectTrigger id="parentCategory" className="col-span-3">
                  <SelectValue placeholder="Select a parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.Key} value={cat.Key}>
                      {cat.CategoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {category ? "Update" : "Create"} Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
