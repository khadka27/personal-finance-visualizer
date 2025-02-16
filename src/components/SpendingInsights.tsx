// components/SpendingInsights.tsx
import { Transaction } from "./BudgetComparisonChart";
import { Budget } from "./BudgetComparisonChart";

type SpendingInsightsProps = {
  transactions: Transaction[];
  budgets: Budget[];
};

export default function SpendingInsights({
  transactions,
  budgets,
}: SpendingInsightsProps) {
  const currentMonth = new Date().toISOString().substring(0, 7);
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Other",
  ];

  const insights = categories.map((category) => {
    const actual = transactions.reduce((sum, tx) => {
      const txMonth = new Date(tx.date).toISOString().substring(0, 7);
      return tx.category === category && txMonth === currentMonth
        ? sum + tx.amount
        : sum;
    }, 0);
    const budgetObj = budgets.find(
      (b) => b.category === category && b.month === currentMonth
    );
    const budget = budgetObj ? budgetObj.amount : 0;
    const diff = budget - actual;
    return { category, actual, budget, diff };
  });

  return (
    <div className="mt-4 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">
        Spending Insights - {currentMonth}
      </h2>
      <ul className="space-y-2">
        {insights.map((insight) => (
          <li key={insight.category} className="text-sm">
            {insight.budget > 0 ? (
              insight.diff < 0 ? (
                <span className="text-destructive">
                  You have exceeded your {insight.category} budget by $
                  {Math.abs(insight.diff).toFixed(2)}.
                </span>
              ) : (
                <span className="text-success">
                  You are under budget in {insight.category} by $
                  {insight.diff.toFixed(2)}.
                </span>
              )
            ) : (
              <span className="text-muted-foreground">
                No budget set for {insight.category}.
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
