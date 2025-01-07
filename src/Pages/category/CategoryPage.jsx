import { useNavigate, useParams } from "react-router";
import Layout from "../../Components/Layout/Layout";
import { useContext, useEffect, useMemo } from "react";
import myContext from "../../context/myContext";
import Loader from "../../Components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const context = useContext(myContext);

  if (!context) {
    console.error("Context is missing");
    return <div>Error: Unable to load context.</div>;
  }

  const { getAllProduct, loading } = context;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return getAllProduct.filter((product) =>
      product.category.toLowerCase().includes(categoryname.toLowerCase())
    );
  }, [getAllProduct, categoryname]);

  // Add item to cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Item added to the cart.");
  };

  // Remove item from cart
  const handleDeleteFromCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Item removed from the cart.");
  };

  // Save cart to localStorage on updates
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout>
      <div className="mt-10">
        {/* Heading */}
        <h1 className="text-center mb-5 text-2xl font-semibold capitalize">
          {categoryname}
        </h1>

        {/* Main Section */}
        {loading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto">
              <div className="flex flex-wrap -m-4 justify-center">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => {
                    const { id, title, price, productImageUrl } = item;
                    return (
                      <div key={id} className="p-4 w-full md:w-1/4">
                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                          <img
                            onClick={() => navigate(`/productinfo/${id}`)}
                            className="lg:h-80 h-96 w-full object-cover"
                            src={productImageUrl}
                            alt={title || "Product image"}
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
                              {cartItems.some((p) => p.id === id) ? (
                                <button
                                  onClick={() => handleDeleteFromCart(item)}
                                  className="bg-red-700 hover:bg-red-600 w-full text-white py-2 rounded-lg font-bold"
                                >
                                  Remove from Cart
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="bg-green-500 hover:bg-green-600 w-full text-white py-2 rounded-lg font-bold"
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
                  <div className="text-center">
                    <img
                      className="mb-4 mx-auto"
                      src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                      alt="No products found"
                    />
                    <h1 className="text-black text-xl">
                      No products found in {categoryname}.
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
