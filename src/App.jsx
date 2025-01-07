import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // Import Toaster for toast notifications
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import ProductInfo from "./Pages/productInfo/ProductInfo";
import ScrollTop from "./Components/scrollTop/ScrollTop";
import CartPage from "./Pages/cart/CartPage";
import AllProduct from "./Pages/allProduct/AllProduct";
import Signup from "./Pages/registration/Signup";
import Login from "./Pages/registration/Login";
import CategoryPage from "./Pages/category/CategoryPage";
import UserDashboard from "./Pages/user/UserDashboard";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AddProductPage from "./Pages/admin/AddProductPage";
import UpdateProductPage from "./Pages/admin/UpdateProductPage";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import MyState from "./context/myState";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />{" "}
          {/* Fixed Route */}
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          {/* Protected Routes for User */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          {/* Protected Routes for Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          {/* Fallback for undefined routes */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </MyState>
  );
};

export default App;
