import React, { useEffect, useState } from 'react'
import Product from '../components/Product';
import Spinner from "../components/Spinner";

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
      {/* Main Content */}
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
        {/* Modal for product details */}
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
      {/* Footer Section */}
      <footer className="w-full mt-16">
        <div className="bg-black py-8 px-4 text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2 tracking-wide">TrendyCart</h2>
              <p className="text-sm">&copy; {new Date().getFullYear()} TrendyCart. All rights reserved.</p>
            </div>
            <div className="flex gap-6 items-center">
              <a href="#" className="hover:text-green-400" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.974 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.516 2.497 5.784 2.226 7.15 2.163 8.416 2.105 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.396 3.678 1.378c-.981.981-1.247 2.093-1.306 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.325 2.393 1.306 3.374.981.981 2.093 1.247 3.374 1.306C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.325 3.374-1.306.981-.981 1.247-2.093 1.306-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.325-2.393-1.306-3.374-.981-.981-2.093-1.247-3.374-1.306C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="#" className="hover:text-green-400" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.816 4.066 6.864 1.64 3.94c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 1.997 1.397 3.872 3.448 4.292a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
              </a>
              <a href="#" className="hover:text-green-400" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-7 h-7"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.592 1.324-1.326V1.326C24 .592 23.408 0 22.675 0"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
