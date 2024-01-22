import { NextResponse } from "next/server";
import { connect } from "@/lib/database/dbConnection";

connect();
export async function GET() {
  try {
    const res = NextResponse.json(
      { message: "Logout successfully!", success: true },
      { status: 200 }
    );

    res.cookies.set("blogAppToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
