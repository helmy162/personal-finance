import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart2, PieChart, Wallet } from "lucide-react";
import FeatureCard from "@/components/home/FeatureCard";
import TreeIcon from "@/components/home/TreeIcon";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
          Welcome to ExpenseTree
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your personal finance manager for effortless expense tracking and
          budgeting
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-muted-foreground">
            ExpenseTree helps you visualize your spending habits, manage
            categories, and track expenses with ease.
          </p>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/expenses">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/categories">Explore Features</Link>
            </Button>
          </div>
        </div>
        <div className="relative h-64 sm:h-80 lg:h-96">
          <TreeIcon className="w-full h-full" />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={PieChart}
          title="Expense Categories"
          description="Organize your expenses into customizable categories for better insights."
        />
        <FeatureCard
          icon={Wallet}
          title="Payee Management"
          description="Keep track of your payees and streamline expense entry."
        />
        <FeatureCard
          icon={BarChart2}
          title="Expense Tracking"
          description="Log and monitor your expenses with detailed breakdowns and visualizations."
        />
      </section>
    </div>
  );
}
