import React from 'react';
import { Button } from '@/components/ui/button';
import { FaShoppingCart, FaRegHeart, FaStore, FaBolt, FaUser, FaStar, FaShareAlt, FaTruck, FaQuestionCircle, FaPalette, FaCommentDots } from 'react-icons/fa';
import Link from 'next/link';
import Logo from '../Layout/Header/Logo';

export default function ProductPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
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
            <span><a href="/#">Acceuil</a></span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
            <FaBolt className="text-xl text-purple-400" />
            <span>  <a href="/hotdeals">Bonnes affaires</a></span>
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

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div>
          <img src="https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png" alt="TV" className="rounded-xl shadow-lg" />
          <div className="flex space-x-4 mt-4">
            <img src="https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png" className="w-16 h-16 border rounded-lg hover:shadow-md transition" />
            <img src="data:image/jpeg;base64,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" className="w-16 h-16 border rounded-lg hover:shadow-md transition" />
            <img src="https://i5.walmartimages.com/asr/0024f590-e8c6-4b45-ab10-42830b514bbd.abf435a0647147d4bf3b4ecbf10f5b7d.jpeg" className="w-16 h-16 border rounded-lg hover:shadow-md transition" />
            
          </div>
        </div>

        {/* Details */}
        <div>
          <h2 className="text-3xl font-bold mb-3">43” Class TU7000 Series Crystal UHD 4K Smart TV</h2>

          {/* Color Options */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-600">Couleurs disponibles:</span>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-black border-4 border-white shadow cursor-pointer hover:ring-2 hover:ring-black transition-all"></div>
              <div className="w-7 h-7 rounded-full bg-slate-200 border-4 border-white shadow cursor-pointer hover:ring-2 hover:ring-slate-400 transition-all"></div>
              <div className="w-7 h-7 rounded-full bg-blue-600 border-4 border-white shadow cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"></div>
            </div>
          </div>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Un téléviseur de haute qualité avec une résolution 4K pour une clarté d'image exceptionnelle et une expérience intelligente fluide.
          </p>
          <p className="text-green-600 text-sm font-medium mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (<FaStar key={i} className="text-yellow-400" />))} (120)
          </p>

          <div className="text-3xl font-bold text-red-600 mb-2">$1,599.00 <span className="line-through text-gray-400 ml-2 text-xl">$1,678.95</span> <span className="ml-2 text-sm bg-red-100 text-red-600 px-2 py-1 rounded">Économisez 200$ </span></div>
          <div className="text-green-600 font-semibold mb-4 text-sm">En stock</div>

          <div className="flex items-center space-x-4 mb-4">
            <Button className="bg-[#ff5722] hover:bg-[#e64a19] text-white px-6 py-3 flex items-center rounded-full shadow">
              <FaShoppingCart className="mr-2" size={16} /> Ajouter au panier
            </Button>
            <button className="border p-3 rounded-full border-gray-300 hover:shadow">
              <FaRegHeart className="text-red-400" size={20} />
            </button>
          </div>

          <h3 className="font-semibold mb-2 text-lg">Caractéristiques principales :</h3>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><FaPalette /> Couleurs disponibles</span>
            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><FaQuestionCircle /> Questions fréquentes</span>
            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-200 transition">
              <FaTruck /> Livraison & Retour
            </span>

            <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"><FaShareAlt /> Partager</span>
          </div>

          <div className="border-t pt-4">
            <p className="font-semibold text-sm mb-1 flex items-center gap-2">
              <FaTruck className="text-green-500" /> Livraison gratuite
            </p>
            <p className="text-xs text-gray-500 underline cursor-pointer">
              Entrez votre code postal pour vérifier la disponibilité.
            </p>
          </div>

          {/* Return Policy */}
          <div className="mt-4">
            <p className="font-semibold text-sm mb-1">Retour produit</p>
            <p className="text-xs text-gray-500">
              Retour gratuit sous 30 jours. <span className="underline cursor-pointer">En savoir plus</span>
            </p>
          </div>
        </div>

      </div>

      {/* Product Comments */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800"><FaCommentDots className="text-[#ff5722]" /> Avis des utilisateurs</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white">
            <p className="text-base font-semibold">Jean Dupont</p>
            <p className="text-xs text-yellow-500 mb-1">★★★★★ - Très bonne qualité !</p>
            <p className="text-sm text-gray-700 leading-relaxed">Image nette et interface intuitive. Livraison rapide et produit bien emballé.</p>
          </div>
          <div className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white">
            <p className="text-base font-semibold">Sophie Martin</p>
            <p className="text-xs text-yellow-500 mb-1">★★★★☆ - Bon rapport qualité/prix</p>
            <p className="text-sm text-gray-700 leading-relaxed">Le son est correct, mais l'image est vraiment excellente pour le prix.</p>
          </div>
          <div className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white">
            <p className="text-base font-semibold">Ali Ben Salah</p>
            <p className="text-xs text-yellow-500 mb-1">★★★★★ - Je recommande</p>
            <p className="text-sm text-gray-700 leading-relaxed">Très bon téléviseur, facile à configurer et parfait pour Netflix !</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Produits Similaires</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white">
              <img src="https://www.tunisianet.com.tn/390357-large/televiseur-samsung-43-uhd-4k-du7000-smart-tv-ua43du7000.jpg" alt="Produit similaire" className="mb-2 rounded-lg" />
              <h3 className="text-base font-medium">Smart TV 43" 4K LED</h3>
              <p className="text-sm text-gray-500">$1,299.00</p>
              <div className="flex items-center text-yellow-400 mt-1">
                {[...Array(4)].map((_, i) => (<FaStar key={i} />))}
              </div>
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}