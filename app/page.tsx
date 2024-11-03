import ExpenseCategoryManager from '@/components/ExpenseCategoryManager'

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-6 text-primary">ExpenseTree Manager</h1>
      <ExpenseCategoryManager />
    </main>
  )
}