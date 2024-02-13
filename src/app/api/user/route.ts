import { getDataFromToken } from "@/lib/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/userModel";
import { connect } from "@/lib/database/dbConnection";

connect();

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (userId) {
      const user = await User.findOne({ _id: userId }).select("-password");
      return NextResponse.json({
        message: "User found",
        data: user,
      });
    } else {
      return NextResponse.json({
        message: "User found",
        data: null,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
