// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList, { Transaction } from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import Dashboard from "../components/Dashboard";
import BudgetForm, { BudgetData } from "../components/BudgetForm";
import BudgetComparisonChart from "../components/BudgetComparisonChart";
import SpendingInsights from "../components/SpendingInsights";

export type Budget = {
  _id?: string;
  category: string;
  month: string;
  amount: number;
};

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.transactions);
  };

  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data.budgets);
  };

  useEffect(() => {
    fetchTransactions();
    fetchBudgets();
  }, []);

  const addTransaction = async (transaction: {
    amount: number | string;
    date: string;
    description: string;
    category: string;
  }) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      fetchTransactions();
    }
  };

  const updateTransaction = async (
    id: string,
    updatedData: {
      amount: number | string;
      date: string;
      description: string;
      category: string;
    }
  ) => {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (res.ok) {
      fetchTransactions();
    }
  };

  const deleteTransaction = async (id: string) => {
    const res = await fetch(`/api/transactions/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchTransactions();
    }
  };

  const setBudget = async (budget: BudgetData) => {
    const res = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(budget),
    });
    if (res.ok) {
      fetchBudgets();
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Visualizer
      </h1>

      <Dashboard transactions={transactions} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthlyExpensesChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      <BudgetForm onSubmit={setBudget} />

      <BudgetComparisonChart transactions={transactions} budgets={budgets} />

      <SpendingInsights transactions={transactions} budgets={budgets} />

      <TransactionForm onSubmit={addTransaction} />

      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
      />
    </div>
  );
}
