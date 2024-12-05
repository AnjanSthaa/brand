import { useState } from "react";
import { Radio, RadioGroup } from "@mui/material";
import ProductDes from "../dataFile/ProductDes.json";

export default function ProductDesc() {
  const [selectedColor, setSelectedColor] = useState(ProductDes.colors[0].name);
  const [selectedSize, setSelectedSize] = useState(
    ProductDes.sizes.find((size) => size.inStock).name
  );

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Responsive Flex Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Image Section */}
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            src={ProductDes.images}
            alt={`Image of ${ProductDes.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Information and Add to Bag */}
        <div className="flex flex-col space-y-4">
          {/* Product Name and Price */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{ProductDes.name}</h1>
            <p className="text-xl sm:text-2xl text-gray-700 mt-1">{ProductDes.price}</p>
          </div>

          {/* Color Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <RadioGroup
              row
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="flex items-center mt-2 gap-2"
            >
              {ProductDes.colors.map((color) => (
                <Radio
                  key={color.name}
                  value={color.name}
                  aria-label={color.name}
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </RadioGroup>
          </div>

          {/* Size Options */}
          <div>
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {ProductDes.sizes.map((size) => (
                <button
                  key={size.name}
                  onClick={() => size.inStock && setSelectedSize(size.name)}
                  className={`w-16 h-8 p-1 text-center text-sm font-medium rounded ${
                    size.inStock
                      ? size.name === selectedSize
                        ? "bg-indigo-600 text-white border border-indigo-600"
                        : "bg-white text-gray-900 border border-gray-300"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!size.inStock}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Details</h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2">
              {ProductDes.highlights.map((highlight, index) => (
                <li key={index} className="text-sm">{highlight}</li>
              ))}
            </ul>
          </div>

          {/* Add to Bag Button */}
          <button
            type="button"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200 ease-in-out"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
