export const dynamic = "force-dynamic";

import AppBar from "@/components/appbar";
import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <AppBar />
      <div className="container mx-auto px-4 pt-20 pb-24 md:pb-28">
        {children}
      </div>
      <Navbar />
    </div>
  );
};

export default Layout;
