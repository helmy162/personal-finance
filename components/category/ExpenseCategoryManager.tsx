"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ICategory } from "@/types";
import CategoryTable from "@/components/category/CategoryTable";
import CategoryTableSkeleton from "@/components/category/CategoryTableSkeleton";
import CategoryForm from "@/components/category/CategoryForm";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/api/categories";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, PlusCircle } from "lucide-react";

export default function ExpenseCategoryManager() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  );

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
        title: "Error",
        description: "Failed to load categories. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async (categoryData: Partial<ICategory>) => {
    try {
      const newCategory = await createCategory(categoryData);
      setCategories([...categories, newCategory]);
      toast({
        title: "Success",
        description: "Category added successfully.",
      });
    } catch (error) {
      console.error("Failed to add category:", error);
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateCategory = async (categoryData: Partial<ICategory>) => {
    if (selectedCategory) {
      try {
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
        toast({
          title: "Success",
          description: "Category updated successfully.",
        });
      } catch (error) {
        console.error("Failed to update category:", error);
        toast({
          title: "Error",
          description: "Failed to update category. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteCategory = async (category: ICategory) => {
    try {
      await deleteCategory(category.Key);
      setCategories((prevCategories) =>
        prevCategories.filter(
          (cat) => cat.Key !== category.Key && cat.ParentKey !== category.Key
        )
      );
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category. Please try again.",
        variant: "destructive",
      });
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

  const [expandAll, setExpandAll] = useState<boolean | null>(null);

  useEffect(() => {
    const savedExpandAll = localStorage.getItem("expandAllCategories");
    if (savedExpandAll && JSON.parse(savedExpandAll) == true) {
      setExpandAll(true);
    } else {
      setExpandAll(false);
    }
  }, []);

  useEffect(() => {
    if (expandAll !== null)
      localStorage.setItem("expandAllCategories", JSON.stringify(expandAll));
    if (expandAll) {
      setExpandedCategories(new Set(categories.map((cat) => cat.Key)));
    } else {
      setExpandedCategories(new Set());
    }
  }, [expandAll, categories]);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const toggleCategory = (key: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button
          onClick={() => openForm()}
          className="bg-primary text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Category
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Categories</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleExpandAll}
          className="flex items-center space-x-2"
        >
          {expandAll ? <Minimize2 /> : <Maximize2 />}
          <span>{expandAll ? "Collapse All" : "Expand All"}</span>
        </Button>
      </div>
      {isLoading ? (
        <CategoryTableSkeleton />
      ) : (
        <CategoryTable
          categories={categories}
          onEdit={openForm}
          onDelete={handleDeleteCategory}
          expandedCategories={expandedCategories}
          handleExpandRow={toggleCategory}
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
