"use client";

import React from "react";
import { FiShoppingCart, FiStar, FiHeart, FiEye } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductCards = () => {
  const products = [
    {
      id: 1,
      name: "MacBook Pro M2",
      category: "Ordinateur portable",
      price: 1999.99,
      oldPrice: 2199.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      stock: 15,
      isNew: true,
      isFavorite: false
    },
    {
      id: 2,
      name: "iPhone 15 Pro",
      category: "Smartphone",
      price: 1099.99,
      oldPrice: 1199.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      stock: 8,
      isNew: true,
      isFavorite: true
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Accessoire audio",
      price: 249.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      stock: 22,
      isNew: false,
      isFavorite: false
    },
    {
      id: 4,
      name: "Apple Watch Series 9",
      category: "Montre connectée",
      price: 429.99,
      oldPrice: 459.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1695048137588-1e3ab1a41fb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXBwbGUlMjB3YXRjaCUyMHNlcmllcyUyMDl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
      stock: 12,
      isNew: false,
      isFavorite: true
    },
    {
      id: 5,
      name: "iPad Pro 12.9\"",
      category: "Tablette",
      price: 1099.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1592588351614-7567694270b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      stock: 7,
      isNew: true,
      isFavorite: false
    },
    {
      id: 6,
      name: "Magic Keyboard",
      category: "Accessoire",
      price: 299.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1615663248957-b75d5a9f3907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFnaWMlMjBrZXlib2FyZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      stock: 18,
      isNew: false,
      isFavorite: false
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Nos Produits Phares
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre sélection de produits high-tech premium
          </p>
        </div>

        <Slider {...settings} className="px-2">
          {products.map((product) => (
            <div key={product.id} className="px-3 focus:outline-none">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                {/* Product Header (Badges) */}
                <div className="relative flex-1">
                  {/* Image */}
                  <div className="h-56 w-full relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                     
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Nouveau
                      </span>
                    )}
                    {product.stock < 10 && (
                      <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                        Stock limité
                      </span>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
                    <FiHeart
                      className={`text-lg ${product.isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                    />
                  </button>
                </div>

                {/* Product Content */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                      <p className="text-sm text-gray-500">{product.category}</p>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <FiEye className="text-lg" />
                    </button>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.rating})</span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-gray-900 mr-2">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock & CTA */}
                  <div className="flex justify-between items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 5 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                      {product.stock > 5 ? "En stock" : "Bientôt épuisé"}
                    </span>
                    <button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <FiShoppingCart className="mr-2" />
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        <div className="text-center mt-12">
          <Link href="/products">
            <button className="inline-flex items-center px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
              Voir tous les produits
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCards;