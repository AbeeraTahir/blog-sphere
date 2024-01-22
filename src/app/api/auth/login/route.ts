import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { connect } from "@/src/lib/database/dbConnection";
import User from "@/src/lib/models/userModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    let user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid Email or Password!" },
        { status: 400 }
      );
    }

    const isPasswordMatch = await bcryptjs.compare(password, user.password);

    if (!isPasswordMatch) {
      return NextResponse.json(
        { error: "Invalid Email or Password!" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      full_name: user.full_name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json(
      {
        message: "Logged in successfully!",
        success: true,
        blogAppToken: token,
      },
      { status: 200 }
    );

    res.cookies.set("blogAppToken", token, { httpOnly: true });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
