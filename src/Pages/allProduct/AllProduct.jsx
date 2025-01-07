import { useNavigate } from "react-router";
import Layout from "../../Components/Layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const AllProduct = () => {
  const navigate = useNavigate();
  const { getAllProduct } = useContext(myContext);

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Add item to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to cart!");
  };

  // Remove item from cart
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from cart!");
  };

  // Store cart items in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="py-8">
        {/* Heading */}
        <div>
          <h1 className="text-center mb-5 text-2xl font-semibold">
            All Products
          </h1>
        </div>

        {/* Products Section */}
        <section className="text-gray-600 body-font">
          <div className="container px-5 lg:px-0 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {getAllProduct.map((item) => {
                const { id, title, price, productImageUrl } = item;

                return (
                  <div key={id} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      {/* Product Image */}
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="lg:h-80 h-96 w-full object-cover"
                        src={productImageUrl}
                        alt={title}
                      />

                      {/* Product Details */}
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                          E-Bharat
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          {title.length > 25
                            ? `${title.substring(0, 25)}...`
                            : title}
                        </h1>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          ₹{price}
                        </h1>

                        {/* Add/Delete Cart Button */}
                        <div className="flex justify-center">
                          {cartItems.some((p) => p.id === id) ? (
                            <button
                              onClick={() => handleDeleteFromCart(item)}
                              className="bg-red-700 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold"
                            >
                              Remove from Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 rounded-lg font-bold"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AllProduct;
