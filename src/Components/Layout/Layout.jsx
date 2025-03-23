import Navbar from "../Nabvar/Navbar"; // Import Navbar
import Footer from "../Footer/Footer"; // Import Footer

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Always Visible */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer Always Visible */}
      <Footer />
    </div>
  );
};

export default Layout;
