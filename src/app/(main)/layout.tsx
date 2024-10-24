import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-br from-purple-200 to-indigo-200 min-h-screen">
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
