import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // Simulate form submission
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Me</h1>
          <p className="text-lg text-gray-600">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Phone */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <FaPhone className="text-4xl text-pink-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Phone</h2>
            <p className="text-gray-600">+91 7351240931</p>
          </motion.div>

          {/* Email */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <FaEnvelope className="text-4xl text-pink-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Email</h2>
            <p className="text-gray-600">pankajsuman8086041@gmail.com</p>
          </motion.div>

          {/* Address */}
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <FaMapMarkerAlt className="text-4xl text-pink-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Address</h2>
            <p className="text-gray-600">
              Dayalbagh Educational Institute, Agra
            </p>
          </motion.div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Leave a Query
          </h2>
          {isSubmitted ? (
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <p className="text-green-600 font-semibold">
                Thank you for your query! We will get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;