import { NextRequest, NextResponse } from "next/server";
import Comment from "@/lib/models/commentModel";
import Post from "@/lib/models/postModel";
import { connect } from "@/lib/database/dbConnection";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const commentData = body;

    const createdComment = await Comment.create(commentData);

    const commentId = createdComment._id;

    const { post } = commentData;
    await Post.findByIdAndUpdate(post, {
      $push: { comments: commentId },
    });

    return NextResponse.json(
      { message: "Comment added successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Error adding comment!", err },
      { status: 400 }
    );
  }
}
