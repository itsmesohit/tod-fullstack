import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Card = ({ filters }) => {
  const [offerings, setOfferings] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
    const token = Cookies.get('token');
  useEffect(() => {
    fetchOfferings();
  }, []);

  const fetchOfferings = async () => {
    try {
      const response = await axios.get("/api/v1/");
      setOfferings(response.data.data); // Access the data array within the response
    } catch (error) {
      console.error("Error fetching offerings:", error);
    }
  };

  const addToCart = async (offeringId) => {
    try {
      await axios.post(`/api/v1/cart/${offeringId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPopupMessage("Item added to cart successfully!");
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
};
const addToBookmarks = async (offeringId) => {
    try {
        console.log("offeringId clicked", offeringId);
      await axios.post(`/api/v1/bookmarks/${offeringId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPopupMessage("Item added to bookmarks successfully!");
    } catch (error) {
      console.error("Error adding item to bookmarks:", error);
    }
};

  const filteredOfferings = offerings.filter((item) => {
    const matchesCategory = filters.categories.length === 0 || filters.categories.includes(item.category);
    const matchesRegion = filters.regions.length === 0 || filters.regions.includes(item.region);
    const matchesProductType = filters.productTypes.length === 0 || filters.productTypes.includes(item.productType);
    const matchesBudget = item.price <= filters.budget;
    return matchesCategory && matchesRegion && matchesProductType && matchesBudget;
  });

  return (
    <div className="p-4">
      {popupMessage && (
        <div className="absolute z-10 top-0 right-0 mt-4 mr-4 bg-green-500 text-white px-4 py-2 rounded">
          {popupMessage}
        </div>
      )}
      {filteredOfferings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOfferings.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden"
              style={{ width: "250px", height: "320px" }}
            >
             
                <div className="p-4">
                  <div className="flex justify-center items-center mb-4 h-20">
                    <img
                      src={item.imageToDisplay}
                      alt="Logo"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="px-4 text-lg font-bold text-center mb-2">{item.title}</div>
                  
                  <div className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">👁 {item.views}</span>
                      <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">🌍 {item.region}</span>
                      <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">{item.kprRating}</span>
                      <span className="bg-gray-200 rounded px-2 py-1 text-xs text-gray-700">{item.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 border-t border-gray-300">
                  <div className="text-blue-600 font-bold">Starting from ${item.price}</div>
                  <div className="flex gap-2">
                    <button className="bg-gray-100 p-2 rounded hover:bg-gray-200" onClick={() => addToBookmarks(item._id)}>🔖</button>
                    <button className="bg-gray-100 p-2 rounded hover:bg-gray-200" onClick={() => addToCart(item._id)}>➕</button>
                  </div>
                </div>
              
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">No data found</div>
      )}
    </div>
  );
};

export default Card;
