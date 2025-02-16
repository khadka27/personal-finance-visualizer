// components/Dashboard.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Transaction } from "./TransactionList";

type DashboardProps = {
  transactions: Transaction[];
};

export default function Dashboard({ transactions }: DashboardProps) {
  // Total expenses
  const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Category breakdown: aggregate amounts per category
  const categoryTotals = transactions.reduce<Record<string, number>>(
    (acc, tx) => {
      acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
      return acc;
    },
    {}
  );

  // Most recent transactions: sort by date descending, take top 3
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Expenses Card */}
        <Card className="p-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">Total Expenses</h3>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
          </CardContent>
        </Card>

        {/* Category Breakdown Card */}
        <Card className="p-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">Category Breakdown</h3>
          </CardHeader>
          <CardContent>
            {Object.keys(categoryTotals).length > 0 ? (
              <ul>
                {Object.entries(categoryTotals).map(([cat, total]) => (
                  <li key={cat} className="flex justify-between">
                    <span>{cat}</span>
                    <span>${total.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No data available.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Transactions Card */}
        <Card className="p-4">
          <CardHeader>
            <h3 className="text-xl font-semibold">Recent Transactions</h3>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <ul>
                {recentTransactions.map((tx) => (
                  <li key={tx._id} className="mb-2">
                    <p className="font-semibold">{tx.category}</p>
                    <p>
                      ${tx.amount} on {new Date(tx.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {tx.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No recent transactions.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
