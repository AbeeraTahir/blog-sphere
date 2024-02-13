import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReduxProvider } from "@/lib/redux/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <ReduxProvider>
        <Navbar />
        {children}
        <Footer />
      </ReduxProvider>
    </div>
  );
}
