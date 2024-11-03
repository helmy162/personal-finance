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

const noParentValue = "None";

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
  const [parentKey, setParentKey] = useState(
    category?.ParentKey ?? noParentValue
  );

  useEffect(() => {
    if (category) {
      setCategoryName(category.CategoryName);
      setParentKey(category.ParentKey ?? noParentValue);
    } else {
      setCategoryName("");
      setParentKey(noParentValue);
    }
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasParent = parentKey !== noParentValue;
    onSubmit({
      CategoryName: categoryName,
      ParentKey: hasParent ? parentKey : undefined,
    });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setCategoryName("");
    setParentKey(noParentValue);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit" : "Add"} Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="categoryName" className="text-right">
                Name
              </Label>
              <Input
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="col-span-5"
                required
              />
            </div>
            <div className="grid grid-cols-6 items-center gap-4">
              <Label htmlFor="parentCategory" className="text-right">
                Parent
              </Label>
              <Select value={parentKey} onValueChange={setParentKey}>
                <SelectTrigger id="parentCategory" className="col-span-5">
                  <SelectValue placeholder="Select a parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={noParentValue}>None</SelectItem>
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
