import Navbar from "@/components/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-slate-200 min-h-screen">
      {children}
      <Navbar />
    </div>
  );
};

export default Layout;
