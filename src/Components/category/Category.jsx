import { motion } from "framer-motion"; // Import Framer Motion
import { useNavigate } from "react-router-dom"; // Correct import for navigation

// Category Data
const category = [
  {
    image: "https://cdn-icons-png.flaticon.com/256/4359/4359963.png",
    name: "fashion",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11833/11833323.png",
    name: "shirt",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/8174/8174424.png",
    name: "jacket",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/7648/7648246.png",
    name: "mobile",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12142/12142416.png",
    name: "laptop",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/10686/10686553.png",
    name: "shoes",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/12114/12114279.png",
    name: "home",
  },
  {
    image: "https://cdn-icons-png.flaticon.com/256/11946/11946316.png",
    name: "books",
  },
];

const Category = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.1 },
  };

  return (
    <div className="mt-5">
      {/* Category Container */}
      <div className="flex overflow-x-auto lg:justify-center hide-scroll-bar">
        <div className="flex space-x-4 px-4">
          {/* Map through categories */}
          {category.map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* Category Circle */}
              <div
                onClick={() => navigate(`/category/${item.name}`)}
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-pink-500 hover:bg-pink-400 flex items-center justify-center cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                />
              </div>
              {/* Category Name */}
              <h1 className="mt-2 text-sm lg:text-lg font-medium first-letter:uppercase">
                {item.name}
              </h1>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Optional Scrollbar Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .hide-scroll-bar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
            .hide-scroll-bar::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `,
        }}
      />
    </div>
  );
};

export default Category;
