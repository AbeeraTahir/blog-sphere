import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("blogAppToken")?.value || null;
    if (token) {
      const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
      return decodedToken.id;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
