import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../Components/loader/Loader";
import { getDocs, query, where, collection } from "firebase/firestore";

const Login = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (userLogin.email === "" || userLogin.password === "") {
      toast.error("All Fields are required");
      return false;
    }
    return true;
  };

  const userLoginFunction = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userLogin.email,
        userLogin.password
      );

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", users?.user?.uid)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs[0].data();
        localStorage.setItem("users", JSON.stringify(user));

        setUserLogin({ email: "", password: "" });
        toast.success("Login Successfully");

        navigate(user.role === "user" ? "/user-dashboard" : "/admin-dashboard");
      } else {
        toast.error("User not found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {loading && <Loader />}
      <motion.div
        className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      >
        <motion.div
          className="mb-5"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-2xl font-bold text-pink-500">
            Login
          </h2>
        </motion.div>

        {/* Input One */}
        <motion.div
          className="mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userLogin.email}
            onChange={(e) =>
              setUserLogin({ ...userLogin, email: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            whileFocus={{ scale: 1.05, borderColor: "#ff6584" }}
          />
        </motion.div>

        {/* Input Two */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.input
            type="password"
            placeholder="Password"
            value={userLogin.password}
            onChange={(e) =>
              setUserLogin({ ...userLogin, password: e.target.value })
            }
            className="bg-pink-50 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-200"
            whileFocus={{ scale: 1.05, borderColor: "#ff6584" }}
          />
        </motion.div>

        {/* Login Button */}
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            type="button"
            onClick={userLoginFunction}
            className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </motion.div>

        {/* Link to Signup */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-black">
            Don't have an account?{" "}
            <Link className="text-pink-500 font-bold" to={"/signup"}>
              Signup
            </Link>
          </h2>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
