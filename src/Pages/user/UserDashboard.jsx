import { useContext } from "react";
import { motion } from "framer-motion";
import Layout from "../../Components/Layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../Components/loader/Loader";

const UserDashboard = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { loading, getAllOrder } = context;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const orderCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hover: { scale: 1.1 },
  };

  return (
    <Layout>
      <motion.div
        className="container mx-auto px-4 py-5 lg:py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* User Details Section */}
        <motion.div
          className="top bg-pink-50 py-5 rounded-xl border border-pink-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Profile Image */}
          <div className="flex justify-center">
            <motion.img
              src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
              alt="User Avatar"
              className="h-24 w-24"
              variants={imageVariants}
              whileHover="hover"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-4">
            <h1 className="text-lg">
              <span className="font-bold">Name: </span>
              {user?.name}
            </h1>
            <h1 className="text-lg">
              <span className="font-bold">Email: </span>
              {user?.email}
            </h1>
            <h1 className="text-lg">
              <span className="font-bold">Date: </span>
              {user?.date}
            </h1>
            <h1 className="text-lg">
              <span className="font-bold">Role: </span>
              {user?.role}
            </h1>
          </div>
        </motion.div>

        {/* Order Details Section */}
        <div className="bottom mt-8">
          <motion.h2
            className="text-2xl lg:text-3xl font-bold mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.3 } }}
          >
            Order Details
          </motion.h2>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center relative top-10">
              <Loader />
            </div>
          )}

          {/* Order Cards */}
          {getAllOrder
            .filter((obj) => obj.userid === user?.uid)
            .map((order, index) => (
              <motion.div
                key={index}
                variants={orderCardVariants}
                initial="hidden"
                animate="visible"
                className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row"
              >
                {/* Order Info */}
                <div className="w-full border-r border-pink-100 bg-pink-50 md:max-w-xs">
                  <div className="p-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                      <div className="mb-4">
                        <div className="text-sm font-semibold text-black">
                          Order Id
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          #{order?.id}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-semibold">Date</div>
                        <div className="text-sm font-medium text-gray-900">
                          {order?.date}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-semibold">
                          Total Amount
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ₹{" "}
                          {order?.cartItems.reduce(
                            (acc, item) => acc + item.price * item.quantity,
                            0
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-sm font-semibold">
                          Order Status
                        </div>
                        <div className="text-sm font-medium text-green-800 first-letter:uppercase">
                          {order?.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex-1">
                  <div className="p-8">
                    {order?.cartItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex flex-col overflow-hidden rounded-lg mb-4 border border-gray-200 md:flex-row"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex-shrink-0">
                          <motion.img
                            className="h-40 w-40 rounded-lg border object-contain"
                            src={item.productImageUrl}
                            alt="Product"
                            variants={imageVariants}
                            whileHover="hover"
                          />
                        </div>
                        <div className="ml-5 flex flex-col justify-between">
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm font-medium text-gray-500">
                              {item.category}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-500 mt-2">
                            x {item.quantity}
                          </p>
                        </div>
                        <div className="ml-auto flex items-center">
                          <p className="text-sm font-bold text-gray-900">
                            ₹ {item.price}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>
    </Layout>
  );
};

export default UserDashboard;
