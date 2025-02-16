// components/TransactionForm.tsx
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type TransactionData = {
  amount: number | string;
  date: string;
  description: string;
  category: string;
  _id?: string;
};

type TransactionFormProps = {
  onSubmit: (data: TransactionData) => void;
  initialData?: TransactionData;
};

const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];

export default function TransactionForm({
  onSubmit,
  initialData = {} as TransactionData,
}: TransactionFormProps) {
  const [amount, setAmount] = useState(initialData.amount || "");
  const [date, setDate] = useState(
    initialData.date
      ? new Date(initialData.date).toISOString().substring(0, 10)
      : ""
  );
  const [description, setDescription] = useState(initialData.description || "");
  const [category, setCategory] = useState(
    initialData.category || categories[0]
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description || !category) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSubmit({ amount, date, description, category, _id: initialData._id });
    if (!initialData._id) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory(categories[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-background shadow-sm rounded-md"
    >
      {error && <p className="text-destructive text-sm text-center">{error}</p>}

      <div className="grid gap-1">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full"
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full"
        />
      </div>

      <div className="grid gap-1">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
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

      <Button type="submit" className="w-full">
        {initialData._id ? "Update Transaction" : "Add Transaction"}
      </Button>
    </form>
  );
}
