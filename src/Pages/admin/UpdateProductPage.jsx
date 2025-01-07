import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../Components/loader/Loader";

const categoryList = [
  { name: "fashion" },
  { name: "shirt" },
  { name: "jacket" },
  { name: "mobile" },
  { name: "laptop" },
  { name: "shoes" },
  { name: "home" },
  { name: "books" },
];

const UpdateProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    quantity: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const productData = productTemp.data();
      setProduct({
        title: productData?.title || "",
        price: productData?.price || "",
        productImageUrl: productData?.productImageUrl || "",
        category: productData?.category || "",
        description: productData?.description || "",
        quantity: productData?.quantity || "",
        time: productData?.time || Timestamp.now(),
        date:
          productData?.date ||
          new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
      });
      setTotalPrice((productData?.price || 0) * (productData?.quantity || 0));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", id), product);
      toast.success("Product Updated successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard");
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  useEffect(() => {
    const price = parseFloat(product.price) || 0;
    const quantity = parseInt(product.quantity, 10) || 0;
    setTotalPrice(price * quantity);
  }, [product.price, product.quantity]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-pink-500">
          Update Product
        </h2>

        <input
          type="text"
          name="title"
          value={product.title}
          onChange={(e) => setProduct({ ...product, title: e.target.value })}
          placeholder="Product Title"
          className="mb-3 bg-pink-50 border text-pink-300 px-2 py-2 w-96 rounded-md"
        />

        <input
          type="number"
          name="price"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Product Price"
          className="mb-3 bg-pink-50 border text-pink-300 px-2 py-2 w-96 rounded-md"
        />

        <input
          type="number"
          name="quantity"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          placeholder="Product Quantity"
          className="mb-3 bg-pink-50 border text-pink-300 px-2 py-2 w-96 rounded-md"
        />

        <input
          type="text"
          name="productImageUrl"
          value={product.productImageUrl}
          onChange={(e) =>
            setProduct({ ...product, productImageUrl: e.target.value })
          }
          placeholder="Product Image Url"
          className="mb-3 bg-pink-50 border text-pink-300 px-2 py-2 w-96 rounded-md"
        />

        <select
          value={product.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
          className="mb-3 w-full px-1 py-2 bg-pink-50 border text-pink-300 rounded-md"
        >
          <option disabled>Select Product Category</option>
          {categoryList.map((value, index) => (
            <option key={index} value={value.name}>
              {value.name}
            </option>
          ))}
        </select>

        <textarea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          name="description"
          placeholder="Product Description"
          rows="5"
          className="mb-3 w-full px-2 py-1 bg-pink-50 border text-pink-300 rounded-md"
        ></textarea>

        <p className="text-pink-500 font-bold mb-3">
          Actual Price: ${product.price || 0} <br />
          Total Price: ${totalPrice}
        </p>

        <button
          onClick={updateProduct}
          type="button"
          className="bg-pink-500 hover:bg-pink-600 w-full text-white py-2 font-bold rounded-md"
        >
          Update Product
        </button>
      </div>
    </div>
  );
};

export default UpdateProductPage;
