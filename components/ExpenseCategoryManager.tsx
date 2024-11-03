"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ICategory } from "@/types";
import CategoryTable from "./CategoryTable";
import CategoryTableSkeleton from "./CategoryTableSkeleton";
import CategoryForm from "./CategoryForm";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function ExpenseCategoryManager() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast({
        variant: "destructive",
        title: "Failed to fetch categories",
        description: "Please try again later.",
      });
      // Here you might want to set an error state and display an error message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (categoryData: Partial<ICategory>) => {
    const newCategory = await createCategory(categoryData);
    setCategories([...categories, newCategory]);
  };

  const handleUpdateCategory = async (categoryData: Partial<ICategory>) => {
    if (selectedCategory) {
      const updatedCategory = await updateCategory(
        selectedCategory.Key,
        categoryData
      );
      setCategories(
        categories.map((cat) =>
          cat.Key === updatedCategory.Key ? updatedCategory : cat
        )
      );
      setSelectedCategory(null);
    }
  };

  const handleDeleteCategory = async (category: ICategory) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${category.CategoryName}"? This will also delete all child categories.`
      )
    ) {
      await deleteCategory(category.Key);
      setCategories(categories.filter((cat) => cat.Key !== category.Key));
    }
  };

  const openForm = (category: ICategory | null = null) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedCategory(null);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-primary">
          Expense Categories
        </h2>
        <Button
          onClick={() => openForm()}
          className="bg-primary text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>
      {isLoading ? (
        <CategoryTableSkeleton />
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={openForm}
          onDelete={handleDeleteCategory}
        />
      )}
      <CategoryForm
        categories={categories}
        category={selectedCategory}
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={selectedCategory ? handleUpdateCategory : handleAddCategory}
      />
    </div>
  );
}
