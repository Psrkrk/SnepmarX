import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const linkVariants = {
    hover: { scale: 1.1, color: "#ffffff", transition: { duration: 0.2 } },
  };

  const socialIconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.2 } },
  };

  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-12"
      variants={footerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Branding */}
          <div className="text-center md:text-left">
            <h1 className="font-bold text-2xl text-white mb-2">Snapmart</h1>
            <p className="text-sm">Empowering Digital Shopping</p>
            <p className="mt-4 text-sm">
              Your one-stop destination for the latest trends and products.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h2 className="font-semibold text-lg text-white mb-2">Quick Links</h2>
            {["Home", "About", "AllProduct", "Contact"].map((item, index) => (
              <motion.div key={index} variants={linkVariants} whileHover="hover">
                <Link to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="hover:text-white">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <h2 className="font-semibold text-lg text-white mb-2">Follow Us</h2>
            <div className="flex space-x-4">
              {[
                { href: "https://www.facebook.com/profile.php?id=100049453352418&mibextid=ZbWKwL", icon: <FaFacebookF /> },
                { href: "https://www.instagram.com/mr.pankaj_.67?igsh=bWFvdW5scGdiMGJp", icon: <FaInstagram /> },
                { href: "https://www.linkedin.com/in/pankaj-s-15633a259/", icon: <FaLinkedinIn /> },
                { href: "https://github.com/Psrkrk", icon: <FaGithub /> },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-xl"
                  variants={socialIconVariants}
                  whileHover="hover"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Snapmart. All Rights Reserved. | Designed by{" "}
            <a
              href="mailto:pankajsuman8086041@gmail.com"
              className="text-white underline hover:text-pink-500"
            >
              pankajsuman8086041@gmail.com
            </a>
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
