import { useState } from "react";
import { FaBolt, FaShoppingCart, FaStore, FaTrashAlt, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "../Layout/Header/Logo";

export default function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);

  const unitPrice = 600;
  const subtotal = 660;
  const discount = subtotal - unitPrice;
  const total = unitPrice * quantity;

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-100 min-h-screen font-sans">
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

      <h4 className="text-3xl font-semibold mb-10 text-gray-900 tracking-tight">🛍️ Votre Panier</h4>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Panier */}
        <div className="lg:col-span-2 overflow-x-auto bg-white p-3 rounded-3xl shadow-xl border border-gray-100">
          <table className="w-full text-left">
            <thead className="text-gray-500  text-sm border-b">
              <tr>
                <th className="pb-3"></th>
                <th>Produit</th>
                <th>Modèle</th>
                <th>Quantité</th>
                <th>Prix Unitaire</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition duration-300 text-gray-700 ">
                <td className="py-4 ">
                  <img src="https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png" alt="Apple Mac Mini" className="w-12 rounded-xl shadow-sm" />
                </td>
                <td className="font-medium">Apple Mac Mini M4 Chip 16/512GB Silver (10C CPU 10C GPU)</td>
                <td className="text-sm">Appareils</td>
                <td>
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full text-lg hover:bg-gray-300"
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    >-
                    </button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <button
                      className="w-8 h-8 bg-gray-200 rounded-full text-lg hover:bg-gray-300"
                      onClick={() => setQuantity(q => q + 1)}
                    >+
                    </button>
                  </div>
                </td>
                <td className="font-semibold text-green-600">${unitPrice.toFixed(2)}</td>
                <td className="font-semibold text-green-600">${(unitPrice * quantity).toFixed(2)}</td>
                <td>
                  <FaTrashAlt className="text-red-500 cursor-pointer hover:scale-110 transition-transform" />
                </td>
              </tr>
            </tbody>
          </table>

          {/* Coupons & Bons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">🎟️ Ajouter un code promo</h2>
              <div className="flex gap-3">
                <input
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Entrer un code promo"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4">Appliquer</Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">🎫 Ajouter un bon</h2>
              <div className="flex gap-3">
                <input
                  className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Entrer un bon de réduction"
                />
                <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-xl px-4">Appliquer</Button>
              </div>
            </div>
          </div>

          {/* Continuer & Réinitialiser */}
          <div className="flex justify-between items-center mt-10">
            <Button variant="outline" className="rounded-xl px-6 py-2 border-gray-400">← Continuer vos achats</Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-6 py-2">Réinitialiser le panier</Button>
          </div>

        </div>

        {/* Résumé de commande */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🧾 Résumé de commande</h2>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Sous-total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Réduction</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-2xl font-bold text-gray-900 border-t pt-4 mt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">📍 Adresse de livraison</h3>
            <form className="space-y-3 text-sm text-gray-700">
              <label className="flex items-start gap-3">
                <input type="radio" name="address" />
                <span>
                  <strong>Ville natale</strong>
                  <br />123 Rue Principale, App 4B, Dalas, DL 10056
                </span>
              </label>
              <label className="flex items-start gap-3 text-blue-600">
                <input type="radio" name="address" defaultChecked />
                <span>
                  <strong>Domicile</strong>
                  <br />123 Rue Principale, App 4B, New York, NY 10001
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input type="radio" name="address" />
                <span>
                  <strong>Bureau</strong>
                  <br />456 Avenue des Affaires, New York, NY 10002
                </span>
              </label>
            </form>
          </div>

          <Button className="mt-5 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl">+ Ajouter une adresse</Button>
          <Button className="mt-5 w-full bg-red-200 hover:bg-gray-300 text-red-700 rounded-xl">Confirmer la commande</Button>
        </div>
      </div>
    </div>
  );
}
