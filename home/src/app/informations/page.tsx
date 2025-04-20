'use client';
import { useState } from 'react';
import { MdPerson, MdInfo, MdLock, MdLogout, MdCameraAlt, MdHome, MdEmail, MdLocationOn, MdPhone, MdBusiness, MdCake, MdEdit } from 'react-icons/md';

export default function PageProfilClient() {
  // Données fictives de l'utilisateur (normalement à récupérer depuis une API)
  const [user, setUser] = useState({
    prenom: 'Dorra',
    nom: 'Ben Nsira',
    pseudo: 'Dorra92',
    email: 'dorra@example.com',
    adresse: '123 Rue de Paris',
    ville: 'Paris',
    codePostal: '75001',
    pays: 'France',
    tel: '+33 6 12 34 56 78',
    dateNaissance: '1992-05-14',
    entreprise: 'Tech Corp',
    image: null, // Ajoutez ici une URL d'image de profil si disponible
  });

  const imagePreview = user.image ? user.image : null;

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 to-indigo-200 font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-primary text-white p-8 flex flex-col rounded-r-3xl">
        <div className="text-center mb-10 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-cream rounded-full border text-sm font-bold  text-black">
            D
          </div>
          <h2 className="text-xl font-semibold">Bienvenue, Dorra</h2>
        </div>
        <nav className="space-y-5 text-lg">
        <a href="/#" className="flex items-center gap-2 hover:bg-cream  hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdHome size={20} /> Acceuil
          </a>
          <a href="/profil" className="flex items-center gap-2 hover:bg-cream  hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdPerson size={20} /> Profil
          </a>
          <a href="#" className="flex items-center gap-2 bg-cream   text-black p-2 rounded-md ">
            <MdInfo size={20} /> Informations Générales
          </a>
          <a href="/edit" className="flex items-center gap-2 hover:bg-cream  hover:text-black p-2 rounded-md  text-white transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdEdit size={20} /> Modifier informations
          </a>
          <a href="/password" className="flex items-center gap-2 hover:bg-cream p-2 rounded-md  hover:text-blacktransition-all duration-300 ease-in-out transform hover:scale-105">
            <MdLock size={20} /> Mot de passe
          </a>
        </nav>
        <div className="mt-auto pt-10">
          <a href="/register" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdLogout size={20} /> Déconnexion
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-12 bg-white rounded-r-3xl shadow-xl">
        <h1 className="text-3xl font-semibold mb-10 text-gray-700">Profil de {user.prenom}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <div className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full overflow-hidden mx-auto shadow-xl transform hover:scale-105 transition-all duration-300">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile" className="object-cover w-full h-full" />
              ) : (
                <MdCameraAlt className="text-gray-600 text-4xl" />
              )}
            </div>
            <div className="mt-4 text-xl font-semibold">{user.prenom} {user.nom}</div>
            <div className="text-lg text-gray-600">{user.pseudo}</div>
          </div>

          {/* Information Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <MdEmail size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Email :</span>
              <span>{user.email}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdLocationOn size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Adresse :</span>
              <span>{user.adresse}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdLocationOn size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Ville :</span>
              <span>{user.ville}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdLocationOn size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Code Postal :</span>
              <span>{user.codePostal}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdLocationOn size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Pays :</span>
              <span>{user.pays}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdPhone size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Téléphone :</span>
              <span>{user.tel}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdCake size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Date de naissance :</span>
              <span>{user.dateNaissance}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
            <div className="flex items-center gap-3">
              <MdBusiness size={20} className="text-primary" />
              <span className="font-semibold text-gray-700">Entreprise :</span>
              <span>{user.entreprise}</span>
              <MdEdit size={20} className="text-gray-500 hover:text-primary cursor-pointer ml-2" />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}
