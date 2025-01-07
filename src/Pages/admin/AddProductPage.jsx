import { useNavigate } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useState } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
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

const AddProductPage = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProductFunction } = context;

  // navigate
  const navigate = useNavigate();

  // product state
  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // error state to hold validation messages
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    category: "",
    description: "",
  });

  // Handle add product function
  const handleAddProduct = async () => {
    setLoading(true);

    // Validate the form
    const validationErrors = {};
    if (!product.title) validationErrors.title = "Product title is required";
    if (!product.price) validationErrors.price = "Product price is required";
    if (!product.productImageUrl)
      validationErrors.productImageUrl = "Product image URL is required";
    if (!product.category)
      validationErrors.category = "Product category is required";
    if (!product.description)
      validationErrors.description = "Product description is required";

    // If there are errors, set them and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    // Clear errors if form is valid
    setErrors({});

    // Proceed to add the product
    try {
      await addDoc(collection(fireDB, "products"), product);
      toast.success("Product added successfully");
      getAllProductFunction();
      setLoading(false);
      navigate("/admin-dashboard"); // Navigate to the admin dashboard after adding
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to add product");
    }
  };

  // Handle field change and clear errors dynamically
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    // Clear error for this field when the user starts typing
    if (value) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {loading && <Loader />}
        {/* Add Product Form */}
        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          {/* Top Heading */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500">
              Add Product
            </h2>
          </div>

          {/* Input One */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              placeholder="Product Title"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>

          {/* Input Two */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>

          {/* Input Three */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={handleInputChange}
              placeholder="Product Image URL"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
            {errors.productImageUrl && (
              <p className="text-red-500 text-sm">{errors.productImageUrl}</p>
            )}
          </div>

          {/* Input Four */}
          <div className="mb-3">
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none"
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>

          {/* Input Five */}
          <div className="mb-3">
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              rows="5"
              className="w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Add Product Button */}
          <div className="mb-3">
            <button
              onClick={handleAddProduct}
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
