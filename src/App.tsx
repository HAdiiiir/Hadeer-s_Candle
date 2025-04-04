import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import ProductsPage from "./pages/ProductsPage"
import ProductDetailPage from "./pages/ProductDetailPage"
import CartPage from "./pages/CartPage"
import SearchPage from "./pages/SearchPage"
import "./App.css"
import React from 'react';

function App() {
  return (
    <div className="App">
      <div>Hadeer's Candle App</div>;
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/about"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p>Coming soon...</p>
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                <p>Coming soon...</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

