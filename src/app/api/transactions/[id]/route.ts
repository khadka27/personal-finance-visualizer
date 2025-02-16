// src/app/api/transactions/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export async function PUT(
  request: Request,
  { params }: { params: { id: string | string[] } }
) {
  // Ensure id is a string
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const body = await request.json();
  const { amount, date, description, category } = body;
  if (!amount || !date || !description || !category) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  const updatedTransaction = {
    amount: parseFloat(amount),
    date: new Date(date),
    description,
    category,
  };
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("transactions");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedTransaction }
  );
  return NextResponse.json({ message: "Transaction updated" });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string | string[] } }
) {
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("transactions");
  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "Transaction deleted" });
}
