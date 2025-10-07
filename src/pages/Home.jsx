import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import Spinner from "../components/Spinner";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Home() {
  const API_URL = "https://fakestoreapi.com/products";
  const CATEGORY_URL = "https://fakestoreapi.com/products/categories";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modalProduct, setModalProduct] = useState(null);

  async function fetchProductData(category = "") {
    setLoading(true);
    let url = API_URL;
    if (category) url = `${API_URL}/category/${category}`;
    try {
      const result = await fetch(url);
      const data = await result.json();
      setPosts(data);
    } catch (error) {
      alert("Something Wrong");
    }
    setLoading(false);
  }

  async function fetchCategories() {
    try {
      const result = await fetch(CATEGORY_URL);
      const data = await result.json();
      setCategories(data);
    } catch (error) {
      // ignore
    }
  }

  useEffect(() => {
    fetchProductData();
    fetchCategories();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  function handleCategory(e) {
    setSelectedCategory(e.target.value);
    fetchProductData(e.target.value);
  }

  function openModal(product) {
    setModalProduct(product);
  }

  function closeModal() {
    setModalProduct(null);
  }

  return (
    <div className="w-screen min-h-screen bg-white pb-12 flex flex-col">
      <div className="max-w-6xl xl:mx-auto mx-4 my-8 flex-1">
        <div className="text-center py-10">
          <h1 className="text-5xl font-black mb-4 text-center text-gray-900 tracking-wide drop-shadow-lg">
            TrendyCart
          </h1>
          <p className="text-xl text-green-700 font-semibold mb-2 tracking-wide">Your one-stop shop for the latest products</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={handleSearch}
            className="border-2 border-green-400 px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow"
          />
          <select
            value={selectedCategory}
            onChange={handleCategory}
            className="border-2 border-green-400 px-4 py-2 rounded-lg w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center items-stretch min-h-[300px]">
          {loading ? (<Spinner />) : (
            posts
              .filter(post => post.title.toLowerCase().includes(search.toLowerCase()))
              .slice(0, 8)
              .map(post => (
                <div key={post.id} onClick={() => openModal(post)} className="flex justify-center items-stretch h-full">
                  <Product post={post} />
                </div>
              ))
          )}
        </div>
        <div className="flex justify-center mt-8">
          <a href="/Shop">
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-green-700 hover:scale-105 transition-all">View All Products</button>
          </a>
        </div>
        
        {modalProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="rounded-2xl p-8 max-w-lg w-full relative shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.35)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <button className="absolute top-2 right-2 text-2xl text-green-600 hover:text-green-700" onClick={closeModal}>&times;</button>
              <img src={modalProduct.image} alt={modalProduct.title} className="w-32 h-32 object-contain mx-auto mb-4 drop-shadow-lg" />
              <h2 className="text-3xl font-extrabold text-green-600 mb-2 text-center">{modalProduct.title}</h2>
              <p className="text-gray-700 mb-2 text-center">{modalProduct.description}</p>
              <p className="text-green-600 font-bold text-xl mb-2 text-center">${modalProduct.price}</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold w-full mt-4" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
      
      <footer className="w-full mt-16">
        <div className="bg-black py-8 px-4 text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 tracking-wide">TrendyCart</h2>
              <p className="text-sm">&copy; {new Date().getFullYear()} TrendyCart. All rights reserved.</p>
            </div>
            <div className="flex gap-6 items-center">
              <a href="#" className="hover:text-green-400" title="Instagram">
                <FaInstagram className="w-7 h-7" />
              </a>
              <a href="#" className="hover:text-green-400" title="Twitter">
                <FaTwitter className="w-7 h-7" />
              </a>
              <a href="#" className="hover:text-green-400" title="Facebook">
                <FaFacebook className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
