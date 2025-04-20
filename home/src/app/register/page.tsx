"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion"; // Pour les animations
import { FaUser, FaEnvelope, FaLock, FaGoogle } from "react-icons/fa"; // Icônes pour les champs

interface AuthFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  captcha?: string;
}

export default function AuthPage() {
  const [isRegistering, setIsRegistering] = useState(true);
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (isRegistering && !formData.name) errors.name = "Le nom est requis";
    if (!formData.email) errors.email = "L'email est requis";
    if (!formData.password) errors.password = "Le mot de passe est requis";
    if (
      isRegistering &&
      formData.password !== formData.confirmPassword
    ) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (isRegistering && !captchaValue) {
      errors.captcha = "Veuillez valider le CAPTCHA";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Formulaire envoyé avec :", formData);
      if (!isRegistering) {
        window.location.href = "http://localhost:8001/#";
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-tr from-indigo-200 via-purple-100 to-blue-200 p-3">
       <div className="hidden lg:flex w-1/2 justify-center items-center rounded-2xl">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute w-50 h-50 object-cover rounded-2xl"
        >
          <source src="/images/img.webm" type="video/webm" />
          Votre navigateur ne prend pas en charge les vidéos WebM.
        </video>
      </div>

      {/* Section de formulaire */}
      <motion.div
        className="flex w-full lg:w-1/2 justify-center items-center p-6 bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Switch entre Inscription et Connexion */}
          <div className="w-full max-w-md bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl p-4 mb-6">
            <div className="flex justify-between">
              <button
                className={`px-3 py-1.5 rounded-lg ${isRegistering ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                onClick={() => setIsRegistering(true)}
              >
                S'inscrire
              </button>
              <button
                className={`px-3 py-1.5 rounded-lg ${!isRegistering ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                onClick={() => setIsRegistering(false)}
              >
                Se connecter
              </button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-6">
            {isRegistering ? "Créer un compte" : "Se connecter"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nom (uniquement pour l'inscription) */}
            {isRegistering && (
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaUser className="text-gray-500 mr-2 text-purple-600" />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jean Dupont"
                  className="w-full px-3 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                />
              </div>
            )}

            {/* Email */}
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaEnvelope className="text-gray-500 mr-2 text-purple-600" />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@exemple.com"
                className="w-full px-3 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            {/* Mot de passe */}
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaLock className="text-gray-500 mr-2 text-purple-600" />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="********"
                className="w-full px-3 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              />
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            </div>

            {/* Confirmer le mot de passe (uniquement pour l'inscription) */}
            {isRegistering && (
              <div className="flex items-center border border-gray-300 rounded-lg p-2">
                <FaLock className="text-gray-500 mr-2 text-purple-600" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="********"
                  className="w-full px-3 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Captcha (uniquement pour l'inscription) */}
            {isRegistering && (
              <div className="pt-2">
                <ReCAPTCHA sitekey="6Ld97horAAAAAEgc0teN-F6wi28q7ap0DFvWl-5M" onChange={handleCaptchaChange} />
                {formErrors.captcha && <p className="text-red-500 text-sm mt-2">{formErrors.captcha}</p>}
              </div>
            )}

            {/* Bouton */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
            >
              {isRegistering ? "S'inscrire" : "Se connecter"}
            </button>
          </form>

          {/* Mot de passe oublié */}
          {!isRegistering && (
            <div className="text-center mt-4">
              <a href="/forget" className="text-indigo-600 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>
          )}

          {/* Connexion avec Google */}
          <div className="mt-4">
            <button
              className="w-full py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold rounded-lg shadow-md flex justify-center items-center"
              onClick={() => console.log("Connexion avec Google")}
            >
              <FaGoogle className="text-gray-500 mr-3" />
              Connexion avec Google
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
