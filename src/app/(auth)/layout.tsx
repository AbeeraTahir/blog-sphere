import { Card } from "@/src/components/ui/card";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[320px] md:w-[400px]">{children}</Card>
    </div>
  );
};

export default Layout;
