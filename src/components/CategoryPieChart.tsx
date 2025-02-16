// components/CategoryPieChart.tsx
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export type Transaction = {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
};

type CategoryPieChartProps = {
  transactions: Transaction[];
};

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

export default function CategoryPieChart({
  transactions,
}: CategoryPieChartProps) {
  // Aggregate transactions by category
  const categoryData = transactions.reduce<Record<string, number>>(
    (acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    },
    {}
  );

  const data = Object.keys(categoryData).map((category) => ({
    name: category,
    value: categoryData[category],
  }));

  return (
    <div className="mt-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        Expenses by Category
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">
          No transaction data available
        </p>
      )}
    </div>
  );
}
