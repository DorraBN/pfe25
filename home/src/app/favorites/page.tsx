'use client';

import { useState } from 'react';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaShoppingCart, FaBolt, FaStore, FaUser } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '@/components/Layout/Header/Logo';

const products = [
  {
    id: 1,
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    price: 1350,
    oldPrice: 1450,
    discount: '10% de réduction',
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg',
    added: false,
    liked: true,
  },
  {
    id: 2,
    brand: 'Samsung',
    name: 'Galaxy Z Fold 5',
    price: 1990,
    oldPrice: null,
    discount: null,
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg',
    added: true,
    liked: true,
  },
  {
    id: 3,
    brand: 'Sony',
    name: 'PlayStation 5',
    price: 799,
    oldPrice: 899,
    discount: '11% de réduction',
    image: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg',
    added: false,
    liked: true,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(products);
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [onlyAdded, setOnlyAdded] = useState(false);
  const [onlyLiked, setOnlyLiked] = useState(false);

  const toggleAddToBag = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, added: !item.added } : item
      )
    );
  };

  const toggleLike = (id: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const filteredItems = items.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedBrand ? item.brand === selectedBrand : true) &&
      (minPrice ? item.price >= parseFloat(minPrice) : true) &&
      (maxPrice ? item.price <= parseFloat(maxPrice) : true) &&
      (onlyDiscount ? item.discount : true) &&
      (onlyAdded ? item.added : true) &&
      (onlyLiked ? item.liked : true)
    );
  });

  const uniqueBrands = [...new Set(products.map(p => p.brand))];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Navigation améliorée */}
      <nav className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Logo />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                E-commerce
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FaStore className="text-lg" />
                <span className="font-medium">Accueil</span>
              </Link>
              
              <Link href="/hotdeals" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                <FaBolt className="text-lg" />
                <span className="font-medium">Promotions</span>
              </Link>

              <Link href="/register" className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg transition-all">
                <FaUser className="text-lg" />
                <span className="font-medium">Compte</span>
              </Link>

              <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <FaShoppingCart className="text-2xl text-purple-600" />
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 md:mb-0">
            Mes Favoris
            <span className="text-2xl ml-3 text-gray-500">({filteredItems.length} articles)</span>
          </h1>
          
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full flex items-center gap-3 hover:shadow-lg transition-shadow">
            <FiShoppingBag className="w-5 h-5" />
            <span>Tout ajouter au panier</span>
          </button>
        </div>

        {/* Filtres modernisés */}
        <div className="bg-white rounded-2xl shadow-md p-8 mb-8 w-full">
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
    <input
      type="text"
      placeholder="🔍 Rechercher un produit..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-3 text-base shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all"
    />

    <select
      value={selectedBrand}
      onChange={e => setSelectedBrand(e.target.value)}
      className="border border-gray-300 rounded-lg px-4 py-3 text-base bg-white shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all"
    >
      <option value="">🏷️ Toutes les marques</option>
      {uniqueBrands.map(brand => (
        <option key={brand} value={brand}>{brand}</option>
      ))}
    </select>

    <div className="flex gap-3">
      <input
        type="number"
        placeholder="Min (TND)"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-3 text-base w-full shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all"
      />
      <input
        type="number"
        placeholder="Max (TND)"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-3 text-base w-full shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-300 transition-all"
      />
    </div>

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center col-span-2">
      <label className="flex items-center space-x-3 text-base cursor-pointer">
        <input 
          type="checkbox" 
          checked={onlyDiscount} 
          onChange={e => setOnlyDiscount(e.target.checked)}
          className="accent-purple-600 w-5 h-5"
        />
        <span className="text-gray-700">🔥 Promotions</span>
      </label>

      <label className="flex items-center space-x-3 text-base cursor-pointer">
        <input 
          type="checkbox" 
          checked={onlyAdded} 
          onChange={e => setOnlyAdded(e.target.checked)}
          className="accent-purple-600 w-5 h-5"
        />
        <span className="text-gray-700">🛒 Dans le panier</span>
      </label>
    </div>
  </div>
</div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="relative group overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="absolute top-3 right-3 z-10">
                <button 
                  onClick={() => toggleLike(item.id)}
                  className="p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
                >
                  {item.liked ? (
                    <FaHeart className="text-pink-600 w-6 h-6 animate-pulse" />
                  ) : (
                    <FaRegHeart className="text-gray-400 w-6 h-6 hover:text-pink-600 transition-colors" />
                  )}
                </button>
              </div>

              {item.discount && (
                <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                  {item.discount}
                </div>
              )}

              <CardContent className="p-4">
                <div className="aspect-square mb-4 overflow-hidden rounded-xl bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-gray-500 font-medium text-sm">{item.brand}</h3>
                  <h2 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h2>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-purple-600">
                      {item.price.toFixed(2)} TND
                    </span>
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        {item.oldPrice.toFixed(2)} TND
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleAddToBag(item.id)}
                    className={`w-full mt-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                      item.added 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg'
                    }`}
                  >
                    {item.added ? (
                      <FiCheckCircle className="w-5 h-5" />
                    ) : (
                      <FaShoppingCart className="w-5 h-5" />
                    )}
                    {item.added ? 'Déjà ajouté' : 'Ajouter au panier'}
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}