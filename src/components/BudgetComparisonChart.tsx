// components/BudgetComparisonChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

export type Budget = {
  _id?: string;
  category: string;
  month: string; // Format: "YYYY-MM"
  amount: number;
};

type BudgetComparisonChartProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function BudgetComparisonChart({ transactions, budgets }: BudgetComparisonChartProps) {
  // Get current month in "YYYY-MM" format.
  const currentMonth = new Date().toISOString().substring(0, 7);
  
  // Predefined categories (should match those used in BudgetForm)
  const categories = ["Food", "Transport", "Entertainment", "Utilities", "Other"];
  
  // Calculate actual spending per category for the current month.
  const actuals = categories.reduce<Record<string, number>>((acc, category) => {
    acc[category] = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      if (tx.category === category && txMonth === currentMonth) {
        return sum + tx.amount;
      }
      return sum;
    }, 0);
    return acc;
  }, {});

  // Merge budgets and actuals into a data array.
  const data = categories.map((category) => {
    const budgetObj = budgets.find(b => b.category === category && b.month === currentMonth);
    return {
      category,
      actual: actuals[category],
      budget: budgetObj ? budgetObj.amount : 0,
    };
  });

  return (
    <div className="mt-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Budget vs Actual - {currentMonth}</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip contentStyle={{ fontSize: '12px' }} />
            <Legend />
            <Bar dataKey="actual" fill="#8884d8" name="Actual Spending" />
            <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available for the current month</p>
      )}
    </div>
  );
}
