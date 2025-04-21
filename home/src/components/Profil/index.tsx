"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaShoppingCart,
  FaUser,
  FaMapMarkerAlt,
  FaClipboardList,
  FaStar,
  FaQuoteRight,
  FaHeart,
  FaDollarSign,
  FaBolt,
  FaStore,
  FaSignOutAlt,
  FaPalette,
  FaMagic,
} from "react-icons/fa";
import { BellIcon } from "lucide-react";
import Logo from "../Layout/Header/Logo";
import ThemeToggler from "../Layout/Header/ThemeToggler";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const notifications = [
    { id: 1, message: "Votre commande a été expédiée 🚚" },
    { id: 2, message: "Nouveau message de Clara 💬" },
    { id: 3, message: "Mise à jour disponible 🔄" },
  ];

  const items = [
    { icon: <FaClipboardList size={28} />, label: "Liste de Commandes", link: "/commandes" },
    { icon: <FaShoppingCart size={28} />, label: "Panier", link: "/cart" },
    { icon: <FaUser size={28} />, label: "Modifier Profil", link: "/edit" },
    { icon: <FaMapMarkerAlt size={28} />, label: "Adresses", link: "/adresse" },
    { icon: <FaHeart size={28} />, label: "Liste de Favories", link: "/favorites" },
    { icon: <FaDollarSign size={28} />, label: "Vos Transactions", link: "/transaction" },
    { icon: <FaStar size={28} />, label: "Points Tech", link: "/help" },
    { icon: <FaQuoteRight size={28} />, label: "Vos avis", link: "/review" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans text-gray-800 dark:text-gray-200 mb-3">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md px-6 py-4 flex items-center justify-between border-b dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="ml-1">
            <Logo />
          </div>
          <div className="text-xl font-bold text-red-500 dark:text-red-400 mr-3">E-commerce</div>
        </div>

        <div className="relative flex space-x-6 text-sm items-center">
          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition">
            <FaStore className="text-xl text-purple-500 dark:text-purple-400" />
            <Link href="/">Accueil</Link>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition">
            <FaBolt className="text-xl text-purple-500 dark:text-purple-400" />
            <Link href="/hotdeals">Promotions</Link>
          </div>

          <div className="flex items-center gap-2 cursor-pointer hover:text-purple-600 dark:hover:text-purple-400 transition">
            <FaMagic className="text-xl text-purple-500 dark:text-purple-400" />
            <Link href="/recommendations">Recommandations</Link>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="relative p-2 rounded-full  hover:bg-gray-700 transition-colors "
            >
              <BellIcon className="h-6 w-6  text-purple-500" />
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white animate-pulse">
                {notifications.length}
              </span>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-lg shadow-lg z-10">
                <div className="p-4 border-b font-bold">Notifications</div>
                <ul>
                  {notifications.map((notif) => (
                    <li key={notif.id} className="px-4 py-2 hover:bg-gray-100 border-b">
                      {notif.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Theme */}
          <div className="flex items-center gap-2">
            <ThemeToggler />
          </div>

          {/* Compte */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="bg-[#7b1fa2] text-white font-medium hover:bg-white hover:text-[#7b1fa2] dark:hover:bg-gray-700 dark:hover:text-white border border-[#7b1fa2] dark:border-purple-400 px-5 py-2 rounded-full transition flex items-center gap-2"
            >
              <FaUser className="text-xl" />
              <span>Compte</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
                <Link
                  href="/edit"
                  className="flex items-center px-4 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <FaUser className="mr-2 text-purple-500 dark:text-purple-400" /> Modifier Profil
                </Link>
                <button
                  onClick={() => alert("Déconnexion")}
                  className="w-full text-left flex items-center px-4 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <FaSignOutAlt className="mr-2 text-purple-500 dark:text-purple-400" /> Déconnexion
                </button>
                <button
                  onClick={() => alert("Changer le thème")}
                  className="w-full text-left flex items-center px-4 py-3 hover:bg-purple-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  <FaPalette className="mr-2 text-purple-500 dark:text-purple-400" /> Changer Thème
                </button>
              </div>
            )}
          </div>

          <FaShoppingCart className="text-2xl text-black" />
        </div>
      </header>

      {/* Profil Info */}
      <div className="max-w-6xl mx-auto mt-10 px-6">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-purple-200 dark:border-gray-700">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-purple-700 text-white flex items-center justify-center rounded-full text-4xl font-bold shadow-lg">
              D
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">Dora BN</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">dorabn18@gmail.com</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Membre depuis le 18/04/2025</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {items.map((item, index) => {
            const content = (
              <div
                key={index}
                className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 dark:bg-gray-700 text-purple-600 dark:text-purple-400 rounded-full group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white transition text-3xl">
                  {item.icon}
                </div>
                <p className="text-base font-medium group-hover:text-purple-700 dark:group-hover:text-purple-400 transition">
                  {item.label}
                </p>
              </div>
            );

            return item.link ? (
              <Link key={index} href={item.link}>
                {content}
              </Link>
            ) : (
              content
            );
          })}
        </div>
      </div>
    </div>
  );
}
