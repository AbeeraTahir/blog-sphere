import Post from "@/lib/models/postModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/database/dbConnection";

interface Params {
  id: string;
}

connect();

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const { id } = params;

  console.log(id);

  const post = await Post.findOne({ _id: id });
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;

    const body = await req.json();
    const postData = body.formData;

    await Post.findByIdAndUpdate(id, {
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
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { id } = params;

    await Post.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Post deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error deleting post!", error },
      { status: 500 }
    );
  }
}
