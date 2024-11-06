import ExpenseCategoryManager from "@/components/category/ExpenseCategoryManager";

export default function CategoriesPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-primary">Categories</h1>
      <ExpenseCategoryManager />
    </div>
  );
}
