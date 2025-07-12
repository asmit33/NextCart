import React, { useContext, useEffect, useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import Title from "../component/Title";
import { shopDataContext } from "../context/ShopContext";
import Card from "../component/Card";

function Collections() {
  const [showFilter, setShowFilter] = useState(false);
  const { products, search, showSearch } = useContext(shopDataContext);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCaterory] = useState([]);
  const [subCategory, setSubCaterory] = useState([]);
  const [sortType, SetSortType] = useState("relavent");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCaterory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCaterory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (showSearch && search) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(productCopy);
  };

  const sortProducts = () => {
    let sorted = [...filterProduct];
    switch (sortType) {
      case "low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFilterProduct(sorted);
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    setFilterProduct(products);
  }, [products]);

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] pb-[110px] flex flex-col lg:flex-row overflow-x-hidden z-[2] relative">
      {/* Sidebar */}
      <aside
        className={`
          w-full px-5 py-4 text-[#aaf5fa] bg-[#0c2025] z-20 border-b lg:border-b-0 lg:border-r border-gray-400
          ${showFilter ? "block" : "hidden"}
          lg:block lg:fixed lg:top-[70px] lg:left-0 lg:h-[calc(100vh-70px)] lg:w-[20vw]
        `}
      >
        {/* Toggle Button for small screen */}
        <div className="lg:hidden mb-4">
          <p
            className="text-[22px] font-semibold flex gap-2 items-center cursor-pointer"
            onClick={() => setShowFilter((prev) => !prev)}
          >
            FILTERS
            {!showFilter ? <FaChevronRight /> : <FaChevronDown />}
          </p>
        </div>

        {/* Filters */}
        <div>
          <p className="text-[18px] text-white mb-2 mt-4">CATEGORIES</p>
          {["Men", "Women", "Kids"].map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-3 text-[16px] font-light"
            >
              <input
                type="checkbox"
                value={cat}
                className="w-3"
                onChange={toggleCategory}
              />
              {cat}
            </label>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[18px] text-white mb-2 mt-4">SUB-CATEGORIES</p>
          {["TopWear", "BottomWear", "WinterWear"].map((sub) => (
            <label
              key={sub}
              className="flex items-center gap-3 text-[16px] font-light"
            >
              <input
                type="checkbox"
                value={sub}
                className="w-3"
                onChange={toggleSubCategory}
              />
              {sub}
            </label>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full lg:ml-[20vw] px-4 md:px-6 pt-6">
        {/* Toggle button for small screens */}
        <div className="lg:hidden mb-4">
          <button
            className="bg-[#0c2025] border border-white text-white px-4 py-2 rounded-md"
            onClick={() => setShowFilter(!showFilter)}
          >
            {showFilter ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Header and Sort */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            className="bg-slate-600 w-full sm:w-[60%] md:w-[200px] h-[45px] px-4 text-white rounded-lg border-[2px] hover:border-[#46d1f7]"
            onChange={(e) => SetSortType(e.target.value)}
          >
            <option value="relavent">Sort By: Relevant</option>
            <option value="low-high">Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8 justify-items-center">
          {filterProduct.map((item, index) => (
            <Card
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image1}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Collections;
