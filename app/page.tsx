import ExpenseCategoryManager from '@/components/category/ExpenseCategoryManager'
import PayeeManager from '@/components/payee/PayeeManager'

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen bg-background">
      <h1 className="text-4xl font-bold mb-16 text-primary text-center">Personal Finance Manager</h1>
      <div className='space-y-16'>
        <ExpenseCategoryManager />
        <PayeeManager />
      </div>
    </main>
  )
}