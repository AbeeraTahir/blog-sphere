import Navbar from "@/src/components/Navbar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("blogAppToken") || null;
  let decodedToken;

  if (token) {
    decodedToken = jwtDecode(token.value);
  } else {
    decodedToken = null;
  }

  return (
    <div className="flex h-screen flex-col">
      <Navbar token={decodedToken} />
      {children}
    </div>
  );
}
