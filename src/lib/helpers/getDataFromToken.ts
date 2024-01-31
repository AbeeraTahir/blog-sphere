import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const decodeToken = (token: string) => {
  const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
  return decodedToken;
};

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("blogAppToken")?.value || null;
    if (token) {
      const decodedToken: any = decodeToken(token);
      console.log(decodedToken);
      return decodedToken.id;
    } else {
      return null;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};
