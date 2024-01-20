import Navbar from "@/src/components/Navbar";
import { cookies } from "next/headers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("blogAppToken");
  return (
    <div className="flex h-screen flex-col">
      <Navbar token={token} />
      {children}
    </div>
  );
}
