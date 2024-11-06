import { IExpense } from "@/types";

let expenses: IExpense[] = [];
let nextKey = 1;

export const fetchExpenses = async (): Promise<IExpense[]> => {
  return [
    await createExpense({
      PurchaseDate: Date.now(),
      Description: "Office Supplies",
      Amount: 150.75,
      SalesTax: true,
      PayeeKey: "payee_1",
      CategoryKey: "cat_1",
      ReceiptPath: "https://google.com"
    }),
    await createExpense({
      PurchaseDate: Date.now() - 86400000, // Yesterday
      Description: "Client Lunch",
      Amount: 85.5,
      SalesTax: true,
      PayeeKey: "payee_2",
      CategoryKey: "cat_2",
      ReceiptPath: "https://google.com"

    }),
  ];
};

export const createExpense = async (
  expenseData: Partial<IExpense>
): Promise<IExpense> => {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const newExpense: IExpense = {
    Key: `expense_${nextKey++}`,
    PurchaseDate: expenseData.PurchaseDate || Date.now(),
    Description: expenseData.Description || "",
    Amount: expenseData.Amount || 0,
    SalesTax: expenseData.SalesTax || false,
    PayeeKey: expenseData.PayeeKey || "",
    CategoryKey: expenseData.CategoryKey || "",
    ReceiptPath: expenseData.ReceiptPath || "",
    CreatedBy: "user",
    CreationDate: Date.now(),
    Deleted: false,
  };
  expenses.push(newExpense);
  return newExpense;
};

export const updateExpense = async (
  key: string,
  expenseData: Partial<IExpense>
): Promise<IExpense> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = expenses.findIndex((expense) => expense.Key === key);
  if (index !== -1) {
    expenses[index] = {
      ...expenses[index],
      ...expenseData,
    };
    return expenses[index];
  }
  throw new Error("Expense not found");
};

export const deleteExpense = async (key: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const index = expenses.findIndex((expense) => expense.Key === key);
  if (index !== -1) {
    expenses.splice(index, 1);
  } else {
    throw new Error("Expense not found");
  }
};
