import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("blogAppToken") || null;
  const decodedToken = token ? jwtDecode(token.value) : null;

  return (
    <div className="flex h-screen flex-col">
      <Navbar token={decodedToken} />
      {children}
    </div>
  );
}
