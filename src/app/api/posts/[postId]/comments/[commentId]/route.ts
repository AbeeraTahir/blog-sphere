import Comment from "@/lib/models/commentModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/database/dbConnection";
import { Params } from "@/lib/utils";

connect();

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { commentId } = params;

    const body = await req.json();
    const commentData = body.formData;

    await Comment.findByIdAndUpdate(commentId, {
      ...commentData,
    });

    return NextResponse.json(
      { message: "Comment updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Couldn't update comment!", error },
      { status: 400 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { commentId } = params;

    await Comment.findByIdAndDelete(commentId);
    return NextResponse.json(
      { message: "Comment deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting comment!", error },
      { status: 400 }
    );
  }
}
