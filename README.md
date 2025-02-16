# Personal Finance Visualizer

A simple web application for tracking personal finances. Users can manage transactions, categorize expenses, set monthly budgets, and visualize their spending with interactive charts and dashboards.

## Overview

**Personal Finance Visualizer** is built with Next.js (App Router), React, TypeScript, shadcn/ui, Tailwind CSS, Recharts, and MongoDB. The project is structured in three development stages:

- **Stage 1:** Basic transaction tracking with CRUD operations and a monthly expenses chart.
- **Stage 2:** Adds predefined transaction categories, a category-wise pie chart, and a dashboard with summary cards.
- **Stage 3:** Introduces budgeting features, including setting monthly budgets, budget vs. actual comparison charts, and spending insights.

## Features

### Stage 1: Basic Transaction Tracking

- Add, edit, and delete transactions (amount, date, description).
- Transaction list view.
- Monthly expenses bar chart.
- Basic form validation.

### Stage 2: Categories

- All Stage 1 features.
- Predefined categories for transactions.
- Category-wise pie chart.
- Dashboard with summary cards (total expenses, category breakdown, recent transactions).

### Stage 3: Budgeting

- All Stage 2 features.
- Set monthly budgets for each category.
- Budget vs. actual comparison chart.
- Simple spending insights (over/under budget analysis).

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, shadcn/ui, Tailwind CSS, Recharts
- **Backend:** Next.js API Routes (App Router)
- **Database:** MongoDB (Atlas)

## Installation

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB Atlas account

### Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd personal-finance-visualizer
   ```


2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Configure Environment Variables:**

   Create a `.env.local` file in the project root and add your MongoDB connection string:

   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   or

   ```bash
   yarn dev
   ```

5. **Open your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## API Endpoints

- **Transactions**

  - `GET /api/transactions` – Retrieve all transactions.
  - `POST /api/transactions` – Create a new transaction.
  - `PUT /api/transactions/[id]` – Update an existing transaction.
  - `DELETE /api/transactions/[id]` – Delete a transaction.

- **Budgets**
  - `GET /api/budgets` – Retrieve all budget entries.
  - `POST /api/budgets` – Create or update a budget for a category and month.

## Deployment

This project can be deployed on platforms like [Vercel](https://vercel.com/). Simply connect your GitHub repository to Vercel and set up your environment variables (such as `MONGODB_URI`) in the Vercel dashboard.

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

```

This README provides an overview, setup instructions, and details on features, technologies, and API endpoints to help users understand and run your project. Feel free to customize it further to match your project's specifics.
```

