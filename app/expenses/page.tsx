import ExpenseManager from "@/components/expense/ExpenseManager";

export default function ExpensesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Expenses</h1>
      <ExpenseManager />
    </div>
  );
}
