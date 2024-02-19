import { NextRequest, NextResponse } from "next/server";
import Comment from "@/lib/models/commentModel";
import { connect } from "@/lib/database/dbConnection";
import { Params } from "@/lib/utils";

export const dynamic = "force-dynamic";

connect();

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { postId } = params;

  try {
    const comments = await Comment.find({ post: postId }).sort({
      createdAt: -1,
    });
    return NextResponse.json(comments, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 400 });
  }
}
