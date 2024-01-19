import { NextRequest, NextResponse } from "next/server";
import Post from "@/src/lib/models/postModel";
import { connect } from "@/src/lib/database/dbConnection";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const postData = body.formData;

    await Post.create(postData);

    return NextResponse.json(
      { message: "Post created successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Couldn't create post!", err },
      { status: 400 }
    );
  }
}
