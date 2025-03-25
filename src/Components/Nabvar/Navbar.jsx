import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
    // get user from localStorage
    const user = JSON.parse(localStorage.getItem("users"));

    // navigate
    const navigate = useNavigate();

    // logout function
    const logout = () => {
        localStorage.removeItem("users");
localStorage.clear();
        
        navigate("/login");
    };

    // CartItems
    const cartItems = useSelector((state) => state.cart);

    // Mobile menu state
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-pink-600 sticky top-0 w-full shadow-md z-50">
            <div className="container mx-auto flex justify-between items-center py-3 px-4">
                {/* Logo */}
                <Link to="/" className="text-white font-bold text-2xl">
                    E-Bharat
                </Link>

                {/* Search Bar (Hidden in mobile) */}
                <div className="hidden md:block">
                    <SearchBar />
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 text-white font-medium">
                    <li>
                        <Link to="/" className="hover:text-gray-200">Home</Link>
                    </li>
                    <li>
                        <Link to="/allproduct" className="hover:text-gray-200">All Products</Link>
                    </li>
                    {!user && (
                        <>
                            <li>
                                <Link to="/signup" className="hover:text-gray-200">Signup</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-gray-200">Login</Link>
                            </li>
                        </>
                    )}
                    {user?.role === "user" && (
                        <li>
                            <Link to="/user-dashboard" className="hover:text-gray-200">User</Link>
                        </li>
                    )}
                    {user?.role === "admin" && (
                        <li>
                            <Link to="/admin-dashboard" className="hover:text-gray-200">Admin</Link>
                        </li>
                    )}
                    {user && (
                        <li onClick={logout} className="cursor-pointer hover:text-gray-200">
                            Logout
                        </li>
                    )}
                    <li>
                        <Link to="/cart" className="hover:text-gray-200 flex items-center">
                            <FaShoppingCart className="mr-1" />
                            ({cartItems.length})
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden bg-pink-700 p-4">
                    <ul className="space-y-4 text-white text-center">
                        <li>
                            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                        </li>
                        <li>
                            <Link to="/allproduct" onClick={() => setIsOpen(false)}>All Products</Link>
                        </li>
                        {!user && (
                            <>
                                <li>
                                    <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
                                </li>
                                <li>
                                    <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                                </li>
                            </>
                        )}
                        {user?.role === "user" && (
                            <li>
                                <Link to="/user-dashboard" onClick={() => setIsOpen(false)}>User</Link>
                            </li>
                        )}
                        {user?.role === "admin" && (
                            <li>
                                <Link to="/admin-dashboard" onClick={() => setIsOpen(false)}>Admin</Link>
                            </li>
                        )}
                        {user && (
                            <li onClick={() => { logout(); setIsOpen(false); }} className="cursor-pointer">
                                Logout
                            </li>
                        )}
                        <li>
                            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex justify-center items-center">
                                <FaShoppingCart className="mr-1" />
                                ({cartItems.length})
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
