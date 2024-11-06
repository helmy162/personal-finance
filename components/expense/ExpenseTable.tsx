"use client";

import React, { useState } from "react";
import { IExpense } from "@/types";
import { Edit, Trash2, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteExpenseDialog from "@/components/expense/DeleteExpenseDialog";

interface ExpenseTableProps {
  expenses: IExpense[];
  categories: { [key: string]: string };
  payees: { [key: string]: string };
  onEdit: (expense: IExpense) => void;
  onDelete: (expense: IExpense) => void;
  expandedRows: Set<string>;
  handleExpandRow: (expenseKey: string) => void;
}

export default function ExpenseTable({
  expenses,
  categories,
  payees,
  onEdit,
  onDelete,
  expandedRows,
  handleExpandRow,
}: ExpenseTableProps) {
  const [deleteConfirmation, setDeleteConfirmation] = useState<IExpense | null>(
    null
  );

  const handleDeleteClick = (expense: IExpense) => {
    setDeleteConfirmation(expense);
  };

  const renderExpenseRow = (expense: IExpense) => {
    const isExpanded = expandedRows.has(expense.Key);

    return (
      <React.Fragment key={expense.Key}>
        <TableRow>
          <TableCell>
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6 mr-1"
              onClick={() => handleExpandRow(expense.Key)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
            {new Date(expense.PurchaseDate).toLocaleDateString()}
          </TableCell>
          <TableCell>{expense.Description}</TableCell>
          <TableCell>{expense.Amount.toFixed(2)}</TableCell>
          <TableCell>{categories[expense.CategoryKey] || "Unknown"}</TableCell>
          <TableCell>{payees[expense.PayeeKey] || "Unknown"}</TableCell>
          <TableCell>{expense.SalesTax ? "Yes" : "No"}</TableCell>
          <TableCell>
            <div className="flex justify-end space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(expense)}
                className="px-2"
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteClick(expense)}
                className="px-2"
              >
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </TableCell>
        </TableRow>
        {isExpanded && (
          <TableRow>
            <TableCell colSpan={6}>
              <div className="p-4 bg-muted/50">
                {expense.ReceiptPath && (
                  <p>
                    <strong>Receipt:</strong>{" "}
                    <a
                      href={expense.ReceiptPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Receipt
                    </a>
                  </p>
                )}
              </div>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Payee</TableHead>
              <TableHead>Sales Tax</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.map((expense) => renderExpenseRow(expense))}
          </TableBody>
        </Table>
      </div>

      <DeleteExpenseDialog
        deleteConfirmation={deleteConfirmation}
        setDeleteConfirmation={setDeleteConfirmation}
        onDelete={onDelete}
      />
    </>
  );
}
