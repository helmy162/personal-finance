"use client";

import { useState, useEffect } from "react";
import { IExpense } from "@/types";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";
import ExpenseTableSkeleton from "./ExpenseTableSkeleton";
import {
  fetchExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from "@/lib/api/expenses";
import { fetchCategories } from "@/lib/api/categories";
import { fetchPayees } from "@/lib/api/payees";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ExpenseManager() {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [payees, setPayees] = useState<{ [key: string]: string }>({});
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadExpenses();
    loadCategories();
    loadPayees();
  }, []);

  const loadExpenses = async () => {
    setIsLoading(true);
    try {
      const fetchedExpenses = await fetchExpenses();
      setExpenses(fetchedExpenses);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      toast({
        title: "Error",
        description: "Failed to load expenses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      const categoryMap = fetchedCategories.reduce((acc, category) => {
        acc[category.Key] = category.CategoryName;
        return acc;
      }, {} as { [key: string]: string });
      setCategories(categoryMap);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast({
        title: "Error",
        description: "Failed to load categories. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadPayees = async () => {
    try {
      const fetchedPayees = await fetchPayees();
      const payeeMap = fetchedPayees.reduce((acc, payee) => {
        acc[payee.Key] = payee.CompanyName;
        return acc;
      }, {} as { [key: string]: string });
      setPayees(payeeMap);
    } catch (error) {
      console.error("Failed to fetch payees:", error);
      toast({
        title: "Error",
        description: "Failed to load payees. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddExpense = async (expenseData: Partial<IExpense>) => {
    try {
      const newExpense = await createExpense(expenseData);
      setExpenses([...expenses, newExpense]);
      toast({
        title: "Success",
        description: "Expense added successfully.",
      });
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateExpense = async (expenseData: Partial<IExpense>) => {
    if (selectedExpense) {
      try {
        const updatedExpense = await updateExpense(
          selectedExpense.Key,
          expenseData
        );
        setExpenses(
          expenses.map((expense) =>
            expense.Key === updatedExpense.Key ? updatedExpense : expense
          )
        );
        toast({
          title: "Success",
          description: "Expense updated successfully.",
        });
      } catch (error) {
        console.error("Failed to update expense:", error);
        toast({
          title: "Error",
          description: "Failed to update expense. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteExpense = async (expense: IExpense) => {
    try {
      await deleteExpense(expense.Key);
      setExpenses(expenses.filter((e) => e.Key !== expense.Key));
      toast({
        title: "Success",
        description: "Expense deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete expense:", error);
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openForm = (expense: IExpense | null = null) => {
    setSelectedExpense(expense);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setSelectedExpense(null);
    setIsFormOpen(false);
  };

  const [expandAll, setExpandAll] = useState<boolean | null>(null);

  useEffect(() => {
    const savedExpandAll = localStorage.getItem("expandAllExpenses");
    if (savedExpandAll && JSON.parse(savedExpandAll) == true) {
      setExpandAll(true);
    } else {
      setExpandAll(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("expandAllExpenses", JSON.stringify(expandAll));
    if (expandAll) {
      setExpandedRows(new Set(expenses.map((exp) => exp.Key)));
    } else {
      setExpandedRows(new Set());
    }
  }, [expandAll, expenses]);

  const toggleExpandAll = () => {
    setExpandAll(!expandAll);
  };

  const toggleRow = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end items-center">
        <Button
          onClick={() => openForm()}
          className="bg-primary text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Expense
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-primary">Expenses</h2>
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
        <ExpenseTableSkeleton />
      ) : (
        <ExpenseTable
          expenses={expenses}
          categories={categories}
          payees={payees}
          onEdit={openForm}
          onDelete={handleDeleteExpense}
          expandedRows={expandedRows}
          handleExpandRow={toggleRow}
        />
      )}
      <ExpenseForm
        expense={selectedExpense}
        categories={categories}
        payees={payees}
        isOpen={isFormOpen}
        onClose={closeForm}
        onSubmit={selectedExpense ? handleUpdateExpense : handleAddExpense}
      />
    </div>
  );
}
