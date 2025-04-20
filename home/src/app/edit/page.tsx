"use client"
import { useState, useEffect } from 'react';
import {
  MdPerson,
  MdInfo,
  MdLock,
  MdLogout,
  MdCameraAlt,
  MdSave,
  MdHome,
  MdEdit,
} from 'react-icons/md';
import countries from 'world-countries';
import countryTelData from 'country-telephone-data';

export default function PageProfilClient() {
  const [form, setForm] = useState({});

  const [countryList, setCountryList] = useState<string[]>([]);

  const allIndicatifs = countryTelData.allCountries;

  useEffect(() => {
    const allCountries = countries.map(c => c.name.common).sort();
    setCountryList(allCountries);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // This should now be typed correctly.
    }
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
            <MdHome size={20} /> Acceuil
          </a>
          <a href="/profil" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdPerson size={20} /> Profil
          </a>
          <a href="/informations" className="flex items-center gap-2 hover:bg-cream hover:text-black p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdInfo size={20} /> Informations Générales
          </a>
          <a href="#" className="flex items-center gap-2 bg-cream p-2 rounded-md  text-black">
            <MdEdit size={20} /> Modifier informations
          </a>
          <a href="/password" className="flex items-center gap-2 hover:bg-cream p-2 rounded-md  hover:text-black transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdLock size={20} /> Mot de passe
          </a>
        </nav>
        <div className="mt-auto pt-10">
          <a href="/register" className="flex items-center gap-2 hover:bg-cream p-2 rounded-md transition-all duration-300 ease-in-out transform hover:scale-105">
            <MdLogout size={20} /> Déconnexion
          </a>
        </div>
      </div>

      {/* Formulaire principal */}
      <div className="flex-1 p-12 bg-white">
        <h1 className="text-3xl font-semibold mb-10 text-gray-700">Modifier votre profil</h1>

        <div className="grid grid-cols-2 gap-10">
          {/* Profil Section */}
          <div>
            <div className="flex justify-center mb-6">
              <label className="relative w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden shadow-lg">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
                ) : (
                  <MdCameraAlt className="text-gray-600 text-4xl" />
                )}
              </label>
            </div>

            <div className="space-y-5">
              <input name="prenom" onChange={handleChange} placeholder="Prénom" className="input-box" />
              <input name="nom" onChange={handleChange} placeholder="Nom" className="input-box" />
              <input name="pseudo" onChange={handleChange} placeholder="Nom d'utilisateur" className="input-box" />
              <input name="email" onChange={handleChange} placeholder="Adresse e-mail" className="input-box" />
              <input name="adresse" onChange={handleChange} placeholder="Adresse de livraison" className="input-box" />
              <input name="ville" onChange={handleChange} placeholder="Ville" className="input-box" />
              <input name="codePostal" onChange={handleChange} placeholder="Code postal" className="input-box" />
            </div>
          </div>

          {/* Mot de passe Section */}
          <div>
            <div className="space-y-5">
              <select name="pays" onChange={handleChange} className="input-box">
                <option value="">Sélectionnez un pays</option>
                {countryList.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>

              {/* Téléphone avec indicatif */}
              <div className="flex gap-3">
                <select name="indicatif" onChange={handleChange} className="input-box w-1/3">
                  <option value="">Indicatif</option>
                  {allIndicatifs.map((country) => (
                    <option key={country.iso2} value={`+${country.dialCode}`}>
                      +{country.dialCode} ({country.name})
                    </option>
                  ))}
                </select>

                <input name="tel" onChange={handleChange} placeholder="Téléphone personnel" className="input-box w-2/3" />
              </div>

              {/* Date de naissance */}
              <input
                type="date"
                name="dateNaissance"
                onChange={handleChange}
                className="input-box"
                placeholder="Date de naissance"
              />

              <input name="entreprise" onChange={handleChange} placeholder="Entreprise (facultatif)" className="input-box" />
              <div className="mt-10 ml-10">
                <button className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition transform flex items-center gap-2">
                  Enregistrer les informations<MdSave size={20} />
                </button>
              </div>
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
