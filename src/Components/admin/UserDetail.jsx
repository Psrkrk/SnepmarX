import { useContext } from "react";
import { motion } from "framer-motion";
import myContext from "../../context/myContext";

const UserDetail = () => {
  const context = useContext(myContext);
  const { getAllUser = [] } = context;

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
        <div className="py-5 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl text-pink-500 font-bold">
            All Users
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
                {["S.No.", "Name", "Email", "Uid", "Role", "Date"].map(
                  (header) => (
                    <th
                      key={header}
                      className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-700 bg-slate-100 font-bold"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <motion.tbody>
              {getAllUser.length > 0 ? (
                getAllUser.map((user, index) => (
                  <motion.tr
                    key={user.uid || index}
                    className="text-pink-300"
                    variants={rowVariants}
                  >
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500">
                      {index + 1}
                    </td>
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500 capitalize">
                      {user.name || "N/A"}
                    </td>
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500">
                      {user.email || "N/A"}
                    </td>
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500">
                      {user.uid || "N/A"}
                    </td>
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500">
                      {user.role || "N/A"}
                    </td>
                    <td className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-slate-500">
                      {user.date || "N/A"}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={rowVariants}>
                  <td
                    colSpan="6"
                    className="h-12 px-4 sm:px-6 text-sm sm:text-md border border-pink-100 text-center text-slate-500"
                  >
                    No users found.
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

export default UserDetail;
