import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear("users");
    navigate("/login");
  };

  const cartItems = useSelector((state) => state.cart);

  const navList = (
    <motion.ul
      className="flex space-x-3 text-white font-medium text-md px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Home */}
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to={"/"}>Home</Link>
      </motion.li>

      {/* All Product */}
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to={"/allproduct"}>All Product</Link>
      </motion.li>

      {/* Signup */}
      {!user && (
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to={"/signup"}>Signup</Link>
        </motion.li>
      )}

      {/* Login */}
      {!user && (
        <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link to={"/login"}>Login</Link>
        </motion.li>
      )}

      {/* User Greeting */}
      {user && (
        <motion.li className="text-white">
          Hello, <span className="font-semibold">{user.name}</span>
        </motion.li>
      )}

      {/* Logout */}
      {user && (
        <motion.li
          className="cursor-pointer"
          onClick={logout}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Logout
        </motion.li>
      )}

      {/* Cart */}
      <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Link to={"/cart"}>Cart({cartItems.length})</Link>
      </motion.li>
    </motion.ul>
  );

  return (
    <nav className="bg-pink-600 sticky top-0 z-50">
      <div className="lg:flex lg:justify-between items-center py-3 lg:px-3">
        {/* Left */}
        <div className="left py-3 lg:py-0">
          <Link to={"/"}>
            <h2 className="font-bold text-white text-2xl text-center">
              SnapMart
            </h2>
          </Link>
        </div>

        {/* Right - Navigation Links */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>

        {/* Search Bar */}
        <div className="hidden lg:block">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
