import { useNavigate } from "react-router-dom"; // Fixed import
import myContext from "../../context/myContext";
import { useContext, useEffect } from "react";
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const HomePageProductCard = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, getAllProduct = [] } = context; // Ensure default empty array to prevent errors

  const cartItems = useSelector((state) => state.cart) || []; // Ensure cartItems is always an array
  const dispatch = useDispatch();

  // Add to cart function
  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  // Delete from cart function
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="mt-10">
      {/* Heading */}
      <h1 className="text-center mb-5 text-2xl font-semibold">
        Bestselling Products
      </h1>

      {/* Main Section */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-5 mx-auto">
          <div className="flex justify-center">{loading && <Loader />}</div>

          {/* Product Grid */}
          <div className="flex flex-wrap -m-4">
            {getAllProduct.length > 0 ? (
              getAllProduct.slice(0, 8).map((item, index) => {
                const { id, title, price, productImageUrl } = item;

                return (
                  <div key={id || index} className="p-4 w-full md:w-1/4">
                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                      <img
                        onClick={() => navigate(`/productinfo/${id}`)}
                        className="lg:h-80 h-96 w-full object-cover"
                        src={productImageUrl}
                        alt={title}
                      />
                      <div className="p-6">
                        <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                          E-bharat
                        </h2>
                        <h1 className="text-lg font-medium text-gray-900 mb-3">
                          {title.substring(0, 25)}
                        </h1>
                        <h1 className="text-lg font-medium text-gray-900 mb-3">
                          ₹{price}
                        </h1>

                        <div className="flex justify-center">
                          {Array.isArray(cartItems) &&
                          cartItems.some((p) => p.id === id) ? (
                            <button
                              onClick={() => deleteCart(item)}
                              className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Remove from Cart
                            </button>
                          ) : (
                            <button
                              onClick={() => addCart(item)}
                              className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                            >
                              Add to Cart
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h1 className="text-center w-full py-6 text-lg font-semibold">
                No products available
              </h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePageProductCard;
