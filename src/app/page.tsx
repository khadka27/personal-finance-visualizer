// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList, { Transaction } from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";
import CategoryPieChart from "../components/CategoryPieChart";
import Dashboard from "../components/Dashboard";

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data.transactions);
  };

  useEffect(() => {
    fetchTransactions();
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

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Personal Finance Visualizer - Stage 2
      </h1>

      <Dashboard transactions={transactions} />

      <TransactionForm onSubmit={addTransaction} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MonthlyExpensesChart transactions={transactions} />
        <CategoryPieChart transactions={transactions} />
      </div>

      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
      />
    </div>
  );
}
