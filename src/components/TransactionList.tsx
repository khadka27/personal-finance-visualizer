// components/TransactionList.tsx
import { useState } from "react";
import TransactionForm, { TransactionData } from "./TransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type TransactionListProps = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Omit<TransactionData, "_id">) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
  onUpdate,
}: TransactionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center">Transactions</h2>
      <div className="space-y-4">
        {transactions.map((tx) => (
          <Card key={tx._id} className="p-4">
            <CardHeader className="flex justify-between items-center">
              <span className="text-lg font-bold">
                {tx.category} Transaction
              </span>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingId(tx._id)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(tx._id)}
                >
                  Delete
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Amount:</strong> ${tx.amount}
              </p>
              <p>
                <strong>Date:</strong> {new Date(tx.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {tx.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      {editingId && (
        <div className="mt-6 space-y-4">
          <h3 className="text-xl font-bold text-center">Edit Transaction</h3>
          {transactions
            .filter((tx) => tx._id === editingId)
            .map((tx) => (
              <TransactionForm
                key={tx._id}
                initialData={tx}
                onSubmit={(data) => {
                  onUpdate(editingId, data);
                  setEditingId(null);
                }}
              />
            ))}
          <div className="flex justify-center">
            <Button variant="secondary" onClick={() => setEditingId(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
