import { NextRequest, NextResponse } from "next/server";
import Post from "@/lib/models/postModel";
import { connect } from "@/lib/database/dbConnection";
import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

connect();

export async function POST(req: NextRequest) {
  try {
    const postData = await req.json();
    const author = await getDataFromToken(req);
    console.log({ ...postData, author });
    await Post.create({ ...postData, author });

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
