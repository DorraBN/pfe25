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
    <div className="p-8 bg-cream min-h-screen">
      {/* Barre de navigation */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
      <div className="flex items-center space-x-2">
  <div className="ml-1">
    <Logo /> {/* Ici, on peut aussi ajuster la taille du logo dans le composant Logo */}
  </div>
  <div className="text-xl font-bold text-red-500 mr-3">E-commerce</div> {/* Réduit la taille du texte */}
</div>

        <div className="flex space-x-6 text-sm">
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaStore className="text-xl text-purple-400" />
            <span><a href="/#">Accueil</a></span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaBolt className="text-xl text-purple-400" />
            <span>  <a href="/hotdeals">Promotions</a></span>
          </div>

          <Link
            href="/register"
            className="hidden lg:block bg-[#7b1fa2] text-white text-base font-medium hover:bg-transparent duration-300 hover:text-[#7b1fa2] border border-[#7b1fa2] px-5 py-2 rounded-full"
          >
            <div className="flex items-center gap-2">
              <FaUser className="text-xl" />
              <span>Compte</span>
            </div>
          </Link>
          <div className="bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600 transition">
            <FaShoppingCart className="text-2xl text-purple-400" />
          </div>
        </div>
      </div>

      {/* Bouton "Tout ajouter au panier" */}
      <div className="flex items-center space-x-4">
        <button className="bg-primary text-white px-4 py-1 rounded flex items-center gap-1 mb-5">
          <FiShoppingBag className="w-4 h-4" /> Tout ajouter au panier
        </button>
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold mb-6">Liste de favories ({filteredItems.length})</h1>

      {/* Filtres */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Toutes les marques</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prix min"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Prix max"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onlyDiscount} onChange={e => setOnlyDiscount(e.target.checked)} />
          Promotions
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onlyAdded} onChange={e => setOnlyAdded(e.target.checked)} />
          Dans le panier
        </label>
      </div>

      {/* Produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="relative">
            <div
              onClick={() => toggleLike(item.id)}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 cursor-pointer transition-colors"
            >
              {item.liked ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-gray-500 text-lg" />
              )}
            </div>
            {item.discount && (
              <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                {item.discount}
              </div>
            )}
            <CardContent className="flex flex-col items-center p-4">
              <img
                src={item.image}
                alt={item.name}
                width={150}
                height={150}
                className="object-contain mt-6"
              />
              <div className="text-sm text-gray-500 mt-2">{item.brand}</div>
              <div className="font-semibold mt-1 text-center text-sm">{item.name}</div>
              <div className="text-red-600 font-bold mt-1">{item.price.toFixed(2)} TND</div>
              {item.oldPrice && (
                <div className="line-through text-sm text-gray-400">{item.oldPrice.toFixed(2)} TND</div>
              )}
              <button
                onClick={() => toggleAddToBag(item.id)}
                className={`mt-3 w-full px-4 py-2 text-sm rounded flex items-center justify-center gap-2 transition ${
                  item.added ? 'bg-gray-200 text-black' : 'bg-primary text-white'
                }`}
              >
                {item.added ? <FiCheckCircle className="w-4 h-4" /> : <FaShoppingCart className="w-4 h-4" />}
                {item.added ? 'Ajouté au panier' : 'Ajouter au panier'}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
