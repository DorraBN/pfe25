"use client"
import { useState, useEffect } from 'react';
import {
  MdPerson,
  MdInfo,
  MdLock,
  MdLockOpen,
  MdLogout,
  MdVisibility,
  MdVisibilityOff,
  MdSave,
  MdHome,
  MdEdit
} from 'react-icons/md';
import countries from 'world-countries';
import countryTelData from 'country-telephone-data';

export default function PageProfilClient() {
  const [form, setForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [countryList, setCountryList] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const allIndicatifs = countryTelData.allCountries;


 



  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return;
    }
    // Vous pouvez ajouter ici la logique pour envoyer la modification du mot de passe via une API
    console.log("Mot de passe changé");
  };

  return (
    <div className="min-h-screen flex bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-1/4 bg-primary text-white p-8 flex flex-col rounded-r-3xl">
        <div className="text-center mb-10 flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-cream rounded-full border text-sm font-bold  text-black">
            D
          </div>
          <h2 className="text-xl font-semibold">Bienvenue, Dorra</h2>
        </div>
        <nav className="space-y-5 text-lg">
          <a href="/#" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdHome size={20} /> Accueil
          </a>
          <a href="/profil" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdPerson size={20} /> Profil
          </a>
          <a href="/informations" className="flex items-center gap-2 p-2 rounded-md  hover:bg-cream hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdInfo size={20} /> Informations Générales
          </a>
          <a href="/edit" className="flex items-center gap-2 p-2 rounded-md  text-white  hover:bg-cream hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdEdit size={20} /> Modifier informations
          </a>
          <a href="#" className="flex items-center gap-2 p-2 rounded-md text-black  bg-cream">
            <MdLock size={20} /> Mot de passe
          </a>
        </nav>
        <div className="mt-auto pt-10">
          <a href="/register" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdLogout size={20} /> Déconnexion
          </a>
        </div>
      </div>

      {/* Formulaire principal */}
      <div className="flex-1 p-12 bg-white">
        <h1 className="text-3xl font-semibold mb-10 text-gray-700">Modifier Mot de passe</h1>

        <div className="grid grid-cols-2 gap-10">
          {/* Mot de passe Section */}
          <div>
          <div className="mb-6 relative">
  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 ml-6 mb-2">Mot de passe actuel</label>
  <div className="flex items-center">
    <MdLock size={20} className="text-gray-600 mr-3" />
    <input
      type={showCurrentPassword ? "text" : "password"}
      id="currentPassword"
      name="currentPassword"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
      className="input-box pl-3" // Ajuster le padding à gauche pour laisser de l'espace pour l'icône
      placeholder="Entrez votre mot de passe actuel"
    />
  </div>
  <div
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
  >
    {showCurrentPassword ? <MdVisibilityOff size={20} className="text-gray-600" /> : <MdVisibility size={20} className="text-gray-600" />}
  </div>
</div>

<div className="mb-6 relative">
  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 ml-6 mb-2">Nouveau mot de passe</label>
  <div className="flex items-center">
    <MdLockOpen size={20} className="text-gray-600 mr-3" />
    <input
      type={showNewPassword ? "text" : "password"}
      id="newPassword"
      name="newPassword"
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      className="input-box pl-3" // Ajuster le padding à gauche pour laisser de l'espace pour l'icône
      placeholder="Entrez votre nouveau mot de passe"
    />
  </div>
  <div
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
    onClick={() => setShowNewPassword(!showNewPassword)}
  >
    {showNewPassword ? <MdVisibilityOff size={20} className="text-gray-600" /> : <MdVisibility size={20} className="text-gray-600" />}
  </div>
</div>

<div className="mb-6 relative">
  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 ml-6 mb-2">Confirmer le mot de passe</label>
  <div className="flex items-center">
    <MdLockOpen size={20} className="text-gray-600 mr-3" />
    <input
      type={showConfirmPassword ? "text" : "password"}
      id="confirmPassword"
      name="confirmPassword"
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      className="input-box pl-3" // Ajuster le padding à gauche pour laisser de l'espace pour l'icône
      placeholder="Confirmez votre nouveau mot de passe"
    />
  </div>
  <div
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <MdVisibilityOff size={20} className="text-gray-600" /> : <MdVisibility size={20} className="text-gray-600" />}
  </div>
  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
</div>

            <div className="mt-10 ml-10">
              <button
                className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition transform flex items-center gap-2"
                onClick={handlePasswordChange}
              >
                Enregistrer les informations <MdSave size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .input-box {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 0.5rem;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
