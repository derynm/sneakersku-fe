import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-[100dvh] h-full flex flex-col">
      <Navbar />
      <main className="h-full grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
