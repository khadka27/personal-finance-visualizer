// app/api/transactions/route.ts
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("transactions");
  const transactions = await collection.find({}).toArray();
  return NextResponse.json({ transactions });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { amount, date, description, category } = body;
  if (!amount || !date || !description || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const newTransaction = {
    amount: parseFloat(amount),
    date: new Date(date),
    description,
    category,
  };
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("transactions");
  const result = await collection.insertOne(newTransaction);
  return NextResponse.json(
    { transaction: newTransaction, id: result.insertedId },
    { status: 201 }
  );
}
