import Post from "@/lib/models/postModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/database/dbConnection";
import { Params } from "@/lib/utils";

connect();

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { postId } = params;

  const post = await Post.findOne({ _id: postId });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { postId } = params;

    const postData = await req.json();

    await Post.findByIdAndUpdate(postId, {
      ...postData,
    });

    return NextResponse.json(
      { message: "Post updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Couldn't update post!", error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { postId } = params;

    await Post.findByIdAndDelete(postId);
    return NextResponse.json(
      { message: "Post deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting post!", error },
      { status: 400 }
    );
  }
}
