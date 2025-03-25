/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback } from "react";
import MyContext from "./myContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import toast from "react-hot-toast";

function MyState({ children }) {
  const [loading, setLoading] = useState(false);
  const [getAllProduct, setGetAllProduct] = useState([]);
  const [getAllOrder, setGetAllOrder] = useState([]);
  const [getAllUser, setGetAllUser] = useState([]);

  // Store unsubscribe functions
  const [unsubscribes, setUnsubscribes] = useState({
    products: null,
    orders: null,
    users: null
  });

  const getAllProductFunction = useCallback(() => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const productArray = QuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setGetAllProduct(productArray);
        setLoading(false);
      });
      setUnsubscribes(prev => ({...prev, products: unsubscribe}));
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      toast.error("Failed to load products");
    }
  }, []);

  const getAllOrderFunction = useCallback(() => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const orderArray = QuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setGetAllOrder(orderArray);
        setLoading(false);
      });
      setUnsubscribes(prev => ({...prev, orders: unsubscribe}));
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
      toast.error("Failed to load orders");
    }
  }, []);

  const getAllUserFunction = useCallback(() => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const userArray = QuerySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        }));
        setGetAllUser(userArray);
        setLoading(false);
      });
      setUnsubscribes(prev => ({...prev, users: unsubscribe}));
      return unsubscribe;
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
      toast.error("Failed to load users");
    }
  }, []);

  const deleteOrder = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order deleted successfully");
      getAllOrderFunction();
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
    }
  }, [getAllOrderFunction]);

  useEffect(() => {
    // Initialize all data fetches
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();

    // Cleanup function
    return () => {
      if (unsubscribes.products) unsubscribes.products();
      if (unsubscribes.orders) unsubscribes.orders();
      if (unsubscribes.users) unsubscribes.users();
    };
  }, [getAllProductFunction, getAllOrderFunction, getAllUserFunction]);

  return (
    <MyContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        deleteOrder,
        getAllUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;