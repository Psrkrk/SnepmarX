import Navbar from "../Nabvar/Navbar";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar that stays at top */}
      <header className="fixed w-full top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </header>

      {/* Main Content with padding to account for fixed navbar */}
      <main className="flex-grow pt-16"> {/* Adjust pt-16 based on your navbar height */}
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;