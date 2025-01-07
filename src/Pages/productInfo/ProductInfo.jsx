import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../Components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const ProductInfo = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState("");
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="py-5 lg:py-16 font-poppins dark:bg-gray-800">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl px-4 mx-auto"
          >
            <div className="flex flex-wrap -mx-4">
              {/* Image Section */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full px-4 mb-8 md:w-1/2 md:mb-0"
              >
                <img
                  className="w-full lg:h-[39em] rounded-lg object-cover"
                  src={product?.productImageUrl}
                  alt={product?.title || "Product"}
                />
              </motion.div>

              {/* Product Details Section */}
              <div className="w-full px-4 md:w-1/2">
                <motion.div
                  initial={{ x: 50 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="lg:pl-20"
                >
                  <h2 className="mb-6 text-xl font-semibold text-gray-700 md:text-2xl dark:text-gray-300">
                    {product?.title}
                  </h2>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-400">
                    ₹ {product?.price}
                  </p>
                  <div className="my-6">
                    <h3 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">
                      Description:
                    </h3>
                    <p>{product?.description}</p>
                  </div>

                  <div className="flex flex-wrap items-center my-6">
                    {cartItems.some((p) => p.id === product.id) ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteCart(product)}
                        className="w-full px-4 py-3 text-white bg-red-500 rounded-xl hover:bg-red-600"
                      >
                        Remove from Cart
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addCart(product)}
                        className="w-full px-4 py-3 text-pink-600 bg-pink-100 rounded-xl hover:bg-pink-600 hover:text-white"
                      >
                        Add to Cart
                      </motion.button>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-3 text-white bg-pink-600 rounded-xl hover:bg-pink-700"
                  >
                    Buy Now
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
