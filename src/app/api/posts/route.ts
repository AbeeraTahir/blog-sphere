import { NextResponse } from "next/server";
import Post from "@/lib/models/postModel";
import { connect } from "@/lib/database/dbConnection";

connect();

export async function GET() {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 400 });
  }
}
