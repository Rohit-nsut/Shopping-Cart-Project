import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Spinner from "../components/Spinner";

export default function Shop() {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  async function fetchProductData() {
    setLoading(true);
    try {
      const result = await fetch(API_URL);
      const data = await result.json();
      setPosts(data);
    } catch (error) {
      alert("Something Wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
  <div className="w-screen min-h-screen bg-white pb-12 flex flex-col">
      <div className="max-w-6xl xl:mx-auto mx-4 my-8 flex-1">
        <div className="text-center py-6">
          <h1 className="text-4xl font-extrabold text-green-700 mb-4">Shop All Products</h1>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className="border-2 border-green-400 px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center items-stretch min-h-[300px]">
          {loading ? (
            <Spinner />
          ) : (
            posts
              .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
              .map(post => (
                <div key={post.id} className="flex justify-center items-stretch h-full">
                  <Product post={post} />
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
