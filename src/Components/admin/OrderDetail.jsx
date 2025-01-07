import { useContext } from "react";
import { motion } from "framer-motion";
import myContext from "../../context/myContext";

const OrderDetail = () => {
  const context = useContext(myContext);
  const { getAllOrder = [], orderDelete } = context;

  // Framer Motion Variants
  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div>
        <div className="py-5">
          <h1 className="text-xl sm:text-2xl text-pink-500 font-bold">
            Total Orders
          </h1>
        </div>

        <div className="w-full overflow-x-auto">
          <motion.table
            className="w-full text-left border-collapse border border-pink-100 text-pink-400"
            initial="hidden"
            animate="visible"
            variants={tableVariants}
          >
            <thead>
              <tr>
                {[
                  "S.No.",
                  "Order ID",
                  "Image",
                  "Title",
                  "Category",
                  "Price",
                  "Quantity",
                  "Total Price",
                  "Status",
                  "Name",
                  "Address",
                  "Pincode",
                  "Phone Number",
                  "Email",
                  "Date",
                  "Action",
                ].map((header) => (
                  <th
                    key={header}
                    className="h-12 px-4 sm:px-6 text-sm sm:text-md font-bold border border-pink-100 bg-slate-100"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <motion.tbody>
              {getAllOrder.length > 0 ? (
                getAllOrder.map((order, orderIndex) =>
                  order.cartItems?.map((item, index) => {
                    const {
                      id,
                      productImageUrl,
                      title,
                      category,
                      price,
                      quantity,
                    } = item;

                    return (
                      <motion.tr
                        key={`${orderIndex}-${index}`}
                        className="text-pink-300"
                        variants={rowVariants}
                      >
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {orderIndex + 1}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {id}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100">
                          <img
                            src={productImageUrl}
                            alt="Product"
                            className="w-16 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {title}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {category}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          ₹{price}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {quantity}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          ₹{price * quantity}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-green-600">
                          {order.status}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.addressInfo.name}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.addressInfo.address}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.addressInfo.pincode}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.addressInfo.mobileNumber}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.email}
                        </td>
                        <td className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-slate-500">
                          {order.date}
                        </td>
                        <td
                          onClick={() => orderDelete(order.id)}
                          className="h-12 px-4 sm:px-6 text-sm border border-pink-100 text-red-500 cursor-pointer hover:text-red-700"
                        >
                          Delete
                        </td>
                      </motion.tr>
                    );
                  })
                )
              ) : (
                <motion.tr variants={rowVariants}>
                  <td
                    colSpan="16"
                    className="h-12 px-4 sm:px-6 text-center border border-pink-100 text-slate-500"
                  >
                    No orders found.
                  </td>
                </motion.tr>
              )}
            </motion.tbody>
          </motion.table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
