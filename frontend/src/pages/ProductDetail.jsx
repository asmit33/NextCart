import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/ShopContext";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from "../component/RelatedProduct";
import Loading from "../component/Loading";

function ProductDetail() {
  const { productId } = useParams();
  const { products, currency, addtoCart, loading } =
    useContext(shopDataContext);

  const [productData, setProductData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setSelectedImage(foundProduct.image1);
    }
  }, [productId, products]);

  if (!productData) return <div className="h-screen w-full bg-black"></div>;

  return (
    <div className="w-full bg-gradient-to-l from-[#141414] to-[#0c2025] pt-[70px] pb-10">
      {/* Product View */}
      <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 lg:px-16 max-w-[1400px] mx-auto">
        {/* Thumbnails + Main Image */}
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 items-center justify-center">
            {[
              productData.image1,
              productData.image2,
              productData.image3,
              productData.image4,
            ].map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`thumb-${idx}`}
                className="w-14 h-14 sm:w-16 sm:h-20 md:w-20 md:h-24 border rounded-md object-cover cursor-pointer"
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full border rounded-md overflow-hidden max-h-[450px] sm:max-h-[500px]">
            <img
              src={selectedImage}
              alt="Main"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 text-white space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold">
            {productData.name.toUpperCase()}
          </h1>

          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
            <FaStarHalfAlt className="text-yellow-400" />
            <span className="text-lg font-medium ml-2">(124)</span>
          </div>

          <p className="text-xl font-semibold">
            {currency} {productData.price}
          </p>

          <p className="text-sm md:text-base">
            {productData.description} Stylish, breathable cotton shirt with a
            modern slim fit. Easy to wash, super comfortable, and designed for
            effortless style.
          </p>

          <div>
            <p className="text-lg font-semibold">Select Size</p>
            <div className="flex gap-3 mt-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border rounded-md ${
                    size === item
                      ? "bg-black text-blue-400 border-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              className="mt-4 px-6 py-3 bg-[#495b61c9] text-white rounded-xl border border-gray-500 hover:bg-[#3e4e54] transition-all"
              onClick={() => addtoCart(productData._id, size)}
            >
              {loading ? <Loading /> : "Add to Cart"}
            </button>
          </div>

          <hr className="border-gray-600 mt-6" />

          <div className="text-sm space-y-1">
            <p>✅ 100% Original Product</p>
            <p>✅ Cash on delivery available</p>
            <p>✅ Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="px-4 md:px-8 lg:px-20 mt-12 max-w-[1300px] mx-auto">
        <div className="flex gap-6 mb-4">
          <p className="border px-5 py-2 text-white cursor-pointer">
            Description
          </p>
          <p className="border px-5 py-2 text-white cursor-pointer">
            Reviews (124)
          </p>
        </div>

        <div className="bg-[#3336397c] border text-white p-6 rounded-md text-sm md:text-base">
          <p>
            Upgrade your wardrobe with this stylish slim-fit cotton shirt,
            available now on NextCart. Crafted from breathable, high-quality
            fabric, it offers all-day comfort and effortless style. Easy to
            maintain and perfect for any setting, this shirt is a must-have
            essential for those who value both fashion and function.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </div>
  );
}

export default ProductDetail;
