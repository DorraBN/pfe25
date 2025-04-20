'use client';

import { useState } from 'react';
import { Pencil, Trash2, Star, MessageSquare, Heart, Search, Home } from 'lucide-react';
import Image from 'next/image';
import Logo from '@/components/Layout/Header/Logo';
import { FaStore, FaBolt, FaUser, FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Review = {
  id: string;
  productName: string;
  productImage: string;
  rating: number;
  comment: string;
  date: string;
  likes?: number;
  featured?: boolean;
};

const initialReviews: Review[] = [
  {
    id: 'rev1',
    productName: 'Casque Bluetooth Sony WH-1000XM4',
    productImage: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
    rating: 5,
    comment: 'Super qualité sonore et confort exceptionnel. La réduction de bruit active est révolutionnaire et la batterie tient facilement 30 heures.',
    date: '18 Avril 2025',
    likes: 24,
    featured: true
  },
  {
    id: 'rev2',
    productName: 'Montre connectée Fitbit Versa 4',
    productImage: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
    rating: 4,
    comment: 'Très bonne autonomie (6+ jours) et interface intuitive. Le suivi du sommeil est particulièrement précis. Le bracelet pourrait être plus confortable pour un port prolongé.',
    date: '10 Avril 2025',
    likes: 8
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(initialReviews);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{id: string, name: string, image: string}[]>([]);

  const handleDelete = (id: string) => {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cet avis ?');
    if (confirmed) {
      setReviews(reviews.filter((rev) => rev.id !== id));
    }
  };

  const handleEdit = (id: string) => {
    alert(`Édition de l'avis : ${id} (fonction à implémenter)`);
  };

  const toggleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(likedReviews.filter(reviewId => reviewId !== id));
      setReviews(reviews.map(rev => 
        rev.id === id ? {...rev, likes: (rev.likes || 0) - 1} : rev
      ));
    } else {
      setLikedReviews([...likedReviews, id]);
      setReviews(reviews.map(rev => 
        rev.id === id ? {...rev, likes: (rev.likes || 0) + 1} : rev
      ));
    }
  };

  const handleSearch = () => {
    // Simulation de résultats de recherche
    if (searchQuery.trim()) {
      setSearchResults([
        {
          id: 'prod1',
          name: `Résultat pour "${searchQuery}" - Casque Audio`,
          image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png'
        },
        {
          id: 'prod2',
          name: `Résultat pour "${searchQuery}" - Smartphone`,
          image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png'
        }
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Premium Header */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="ml-1">
            <Logo />
          </div>
          <div className="text-xl font-bold text-red-500 mr-3">E-commerce</div>
        </div>

        <div className="flex space-x-6 text-sm">
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaStore className="text-xl text-purple-400" />
            <span><a href="/#">Accueil</a></span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaBolt className="text-xl text-purple-400" />
            <span>Promotions</span>
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
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Mes Avis Produits
          </h1>
          <p className="text-gray-500">Vos retours aident la communauté</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-full px-6 py-2 shadow-sm flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-500 mr-2" />
            <span className="font-medium text-gray-700">{reviews.length} avis</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            + Nouvel avis
          </button>
        </div>
      </div>

      {/* Modal pour nouveau avis */}
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Nouvel avis produit
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Recherchez un produit pour laisser un avis ou retournez à l'accueil pour parcourir nos articles.
                    </p>
                  </div>

                  <div className="mt-6">
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Rechercher un produit..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <div className="absolute left-3 top-3.5 text-gray-400">
                        <Search className="w-5 h-5" />
                      </div>
                      <button
                        onClick={handleSearch}
                        className="absolute right-2 top-2 bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700"
                      >
                        Rechercher
                      </button>
                    </div>

                    {searchResults.length > 0 && (
                      <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                        {searchResults.map((product) => (
                          <div key={product.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded-md mr-3" />
                            <div className="text-sm font-medium text-gray-700">{product.name}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 border-t pt-4">
                      <Link 
                        href="/"
                        className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                      >
                        <Home className="w-5 h-5" />
                        <span>Retour à l'accueil</span>
                      </Link>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Fermer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-inner border border-gray-100">
          <div className="mx-auto w-28 h-28 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <Star className="w-12 h-12 text-indigo-400" fill="currentColor" />
          </div>
          <h3 className="text-2xl font-medium text-gray-800 mb-3">Aucun avis pour le moment</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6">Partagez votre expérience avec les produits que vous avez achetés.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 rounded-full text-white font-medium shadow-md hover:shadow-lg transition-all"
          >
            Rédiger mon premier avis
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`group relative flex flex-col sm:flex-row gap-6 items-start bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border ${review.featured ? 'border-2 border-indigo-300' : 'border-gray-100'} hover:border-indigo-200`}
            >
              {review.featured && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-3xl shadow-md">
                  Avis en vedette
                </div>
              )}

              <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                <img
                  src={review.productImage}
                  alt={review.productName}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <h2 className="font-bold text-xl text-gray-900">{review.productName}</h2>
                  <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full flex-shrink-0">
                    {review.date}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill={i < review.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                  <div className="w-12 h-6 bg-indigo-500/10 text-indigo-600 text-xs font-bold rounded-full flex items-center justify-center">
                    {review.rating}/5
                  </div>
                </div>

                <p className="text-gray-700 mb-5 leading-relaxed">{review.comment}</p>

                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleLike(review.id)}
                      className={`flex items-center gap-1 text-sm ${likedReviews.includes(review.id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors`}
                    >
                      <Heart 
                        className={`w-5 h-5 ${likedReviews.includes(review.id) ? 'fill-current' : ''}`} 
                      />
                      <span>{review.likes || 0}</span>
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(review.id)}
                      className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 shadow-sm"
                    >
                      <Pencil className="w-4 h-4" />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}