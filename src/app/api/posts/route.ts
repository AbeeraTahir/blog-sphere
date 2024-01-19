import { NextResponse } from "next/server";
import Post from "@/src/lib/models/postModel";
import { connect } from "@/src/lib/database/dbConnection";

connect();

export async function GET() {
  try {
    const posts = await Post.find();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 400 });
  }
}
