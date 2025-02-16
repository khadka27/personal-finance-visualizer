// app/api/budgets/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("budgets");
  const budgets = await collection.find({}).toArray();
  return NextResponse.json({ budgets });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { category, month, amount } = body;
  if (!category || !month || !amount) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("budgets");

  // Check if a budget already exists for this category and month.
  const existing = await collection.findOne({ category, month });
  if (existing) {
    await collection.updateOne(
      { _id: existing._id },
      { $set: { amount: parseFloat(amount) } }
    );
    return NextResponse.json({ message: "Budget updated" });
  } else {
    const newBudget = { category, month, amount: parseFloat(amount) };
    const result = await collection.insertOne(newBudget);
    return NextResponse.json(
      { budget: newBudget, id: result.insertedId },
      { status: 201 }
    );
  }
}
