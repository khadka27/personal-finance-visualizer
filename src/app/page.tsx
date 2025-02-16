// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList, { Transaction } from "../components/TransactionList";
import MonthlyExpensesChart from "../components/MonthlyExpensesChart";

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

  const addTransaction = async (transaction: { amount: number | string; date: string; description: string }) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    });
    if (res.ok) {
      fetchTransactions();
    }
  };

  const updateTransaction = async (id: string, updatedData: { amount: number | string; date: string; description: string }) => {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Personal Finance Visualizer - Stage 1</h1>
      <TransactionForm onSubmit={addTransaction} />
      <TransactionList
        transactions={transactions}
        onDelete={deleteTransaction}
        onUpdate={updateTransaction}
      />
      <MonthlyExpensesChart transactions={transactions} />
    </div>
  );
}
