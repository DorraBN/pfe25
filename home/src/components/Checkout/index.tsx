import { useState } from "react";

import Link from "next/link";
import {
  FaStore,
  FaBolt,
  FaUser,
  FaShoppingCart,
  FaCreditCard,
  FaMoneyBillWave,
  FaPaypal,
} from "react-icons/fa";
import Logo from "../Layout/Header/Logo";


export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("carte");

  const paymentOptions = [
    { value: "carte", label: "Carte Bancaire", icon: <FaCreditCard /> },
    { value: "d17", label: "D17", icon: <FaCreditCard /> },
    { value: "edinar", label: "e-Dinar", icon:<FaCreditCard /> },
    { value: "paypal", label: "PayPal", icon: <FaPaypal /> },
    { value: "cod", label: "Paiement à la livraison", icon: <FaMoneyBillWave /> },
  ];

  return (
    <div className="p-8 bg-gradient-to-br from-white to-gray-100 min-h-screen font-sans">
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

      {/* Checkout Container */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Colonne Produit */}
        <div className="p-8 bg-gray-50">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500 cursor-pointer hover:underline">&larr; Retour</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Résumé de la commande</h2>

          <div className="flex items-start gap-4 mb-6">
            <img
              src="https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png"
              alt="Apple"
              width={60}
              height={60}
              className="rounded"
            />
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                Apple Mac Mini M4 Chip 16/512GB Silver (10C CPU 10C GPU)
              </p>
              <p className="text-sm text-gray-500 mt-1">Performance professionnelle. Design compact.</p>
            </div>
            <span className="text-gray-800 font-semibold">600,00 $US</span>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sous-total</span>
              <span className="font-medium text-gray-700">600,00 $US</span>
            </div>

            <a href="#" className="text-blue-500 text-sm hover:underline">Ajouter un code promo</a>

            <div className="flex justify-between items-center mt-6 font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>600,00 $US</span>
            </div>
          </div>
        </div>

        {/* Colonne Paiement */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Méthode de paiement</h3>

          {/* Sélecteur avec icônes */}
          <div className="space-y-2 mb-6">
            {paymentOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPaymentMethod(option.value)}
                className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg border transition ${
                  paymentMethod === option.value
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-white border-gray-300 text-gray-700 hover:border-blue-400"
                }`}
              >
                <span className="text-xl">{option.icon}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            ))}
          </div>

          {/* Formulaire de paiement */}
          <form className="space-y-4">
            <input type="email" placeholder="E-mail" defaultValue="client@email.com" className="form-input" />

            {paymentMethod === "carte" && (
              <>
                <input type="text" placeholder="Numéro de carte" className="form-input" />
                <div className="flex space-x-2">
                  <input type="text" placeholder="MM / AA" className="form-input w-1/2" />
                  <input type="text" placeholder="CVC" className="form-input w-1/2" />
                </div>
                <input type="text" placeholder="Nom du titulaire" className="form-input" />
              </>
            )}

            {paymentMethod === "d17" && <input type="text" placeholder="Numéro D17" className="form-input" />}

            {paymentMethod === "edinar" && (
              <>
                <input type="text" placeholder="Numéro de carte e-Dinar" className="form-input" />
                <input type="password" placeholder="Code PIN" className="form-input" />
              </>
            )}

            {paymentMethod === "cod" && (
              <>
                <input type="text" placeholder="Adresse de livraison" className="form-input" />
                <input type="tel" placeholder="Téléphone" className="form-input" />
              </>
            )}

            {paymentMethod === "paypal" && (
              <>
                <input type="text" placeholder="Compte PayPal" className="form-input" />
              </>
            )}

            <label className="flex items-start gap-2 text-sm text-gray-600 mt-2">
              <input type="checkbox" className="mt-1" />
              <span>Enregistrer mes informations pour les prochains paiements</span>
            </label>

            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold transition">
              Confirmer le paiement
            </button>
          </form>

          <div className="text-center text-xs text-gray-400 mt-2 space-x-2">
            <a href="#" className="hover:underline">Conditions</a> ·
            <a href="#" className="hover:underline">Confidentialité</a>
          </div>
        </div>
      </div>

      {/* Input Styles */}
      <style jsx>{`
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background-color: white;
          font-size: 14px;
          color: #111827;
          outline: none;
          transition: border 0.3s, box-shadow 0.3s;
        }

        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.3);
        }
      `}</style>
    </div>
  );
}
