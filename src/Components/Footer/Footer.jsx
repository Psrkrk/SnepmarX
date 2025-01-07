import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.footer
      className="bg-gray-800 text-gray-300 py-8"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Branding */}
        <div className="mb-4 md:mb-0">
          <h1 className="font-bold text-xl text-white">Snapmart</h1>
          <p className="text-sm">Empowering Digital Shopping</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-6">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/about" className="hover:text-white">
            About Us
          </Link>
          <Link to="/products" className="hover:text-white">
            Products
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-sm">
        <p>
          © {new Date().getFullYear()} Snapmart. All Rights Reserved. | Designed
          by{" "}
          <a
            href="mailto:pankajsuman8086041@gmail.com"
            className="text-white underline"
          >
            pankajsuman8086041@gmail.com
          </a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
