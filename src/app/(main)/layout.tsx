import AppBar from "@/components/appbar";
import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-purple-200 to-indigo-200 min-h-screen">
      <AppBar />
      <div className="px-4 pt-20">{children}</div>
      <Navbar />
    </div>
  );
};

export default Layout;
