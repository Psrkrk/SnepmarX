import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import { useNavigate } from "react-router";

const SearchBar = () => {
  const context = useContext(myContext);
  const { getAllProduct } = context; // Fetching all products from context
  const [search, setSearch] = useState(""); // State for the search query
  const navigate = useNavigate();

  // Filter products based on the search query, showing up to 8 results
  const filterSearchData = getAllProduct
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 8);

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-96 lg:w-96 md:w-96 outline-none text-black"
        />
      </div>

      {/* Dropdown Suggestions */}
      {search && (
        <div className="absolute bg-gray-200 w-96 md:w-96 lg:w-96 z-50 my-1 rounded-lg px-2 py-2 shadow-lg">
          {filterSearchData.length > 0 ? (
            filterSearchData.map((item) => (
              <div
                key={item.id}
                className="py-2 px-2 cursor-pointer hover:bg-gray-300 rounded-md"
                onClick={() => {
                  navigate(`/productinfo/${item.id}`);
                  setSearch(""); // Clear search after navigation
                }}
              >
                <div className="flex items-center gap-2">
                  <img
                    className="w-10 h-10 object-cover rounded-md"
                    src={item.productImageUrl}
                    alt={item.title}
                  />
                  <span className="text-black">{item.title}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center py-4">
              <img
                className="w-20"
                src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png"
                alt="No results"
              />
              <p className="text-gray-600 text-sm mt-2">No results found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
