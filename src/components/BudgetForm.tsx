// components/BudgetForm.tsx
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type BudgetData = {
  category: string;
  month: string; // Expected format: "YYYY-MM"
  amount: number | string;
  _id?: string;
};

type BudgetFormProps = {
  onSubmit: (data: BudgetData) => void;
  initialData?: BudgetData;
};

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export default function BudgetForm({ onSubmit, initialData = {} as BudgetData }: BudgetFormProps) {
  const [category, setCategory] = useState(initialData.category || categories[0]);
  const [month, setMonth] = useState(initialData.month || "");
  const [amount, setAmount] = useState(initialData.amount || "");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!category || !month || !amount) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit({ category, month, amount, _id: initialData._id });
    if (!initialData._id) {
      setCategory(categories[0]);
      setMonth("");
      setAmount("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-background shadow-sm rounded-md">
      {error && <p className="text-destructive text-sm text-center">{error}</p>}
      
      <div className="grid gap-1">
        <Label htmlFor="budget-category">Category</Label>
        <select
          id="budget-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border rounded p-2 w-full"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid gap-1">
        <Label htmlFor="budget-month">Month</Label>
        <Input
          id="budget-month"
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full"
        />
      </div>
      
      <div className="grid gap-1">
        <Label htmlFor="budget-amount">Budget Amount</Label>
        <Input
          id="budget-amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter budget amount"
          className="w-full"
        />
      </div>
      
      <Button type="submit" className="w-full">
        {initialData._id ? "Update Budget" : "Set Budget"}
      </Button>
    </form>
  );
}
