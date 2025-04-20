"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

// Define a type for the form errors
interface FormErrors {
  email?: string;
  captcha?: string;
}

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState<string>("");
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!email) errors.email = "L'email est requis";
    if (!captchaValue) errors.captcha = "Veuillez valider le CAPTCHA";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Demande de réinitialisation envoyée pour :", email);
      setSuccessMessage("Un email de réinitialisation a été envoyé !");
      setEmail("");
      setCaptchaValue(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-tr from-indigo-200 via-purple-100 to-blue-200 p-3">
      {/* Partie gauche avec la vidéo */}
      <div className="hidden lg:flex w-1/2 justify-center items-center rounded-2xl relative overflow-hidden">
        <img
          src="/images/img1.png" // ← Remplace par le bon chemin
          alt="Image de fond"
          className="absolute w-50 h-50 object-cover rounded-2xl"
        />
      </div>

      {/* Partie droite avec le formulaire */}
      <motion.div
        className="flex w-full lg:w-1/2 justify-center items-center p-6 bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
            Réinitialiser le mot de passe
          </h2>

          {successMessage && (
            <p className="text-green-600 text-center font-medium mb-4">
              {successMessage}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center border border-gray-300 rounded-lg p-2">
              <FaEnvelope className="text-gray-500 mr-2 text-purple-600" />
              <input
                type="email"
                name="email"
                placeholder="email@exemple.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-800 border-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              />
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-sm -mt-2">{formErrors.email}</p>
            )}

            <div className="pt-2">
              <ReCAPTCHA sitekey="your-recaptcha-site-key" onChange={setCaptchaValue} />
              {formErrors.captcha && (
                <p className="text-red-500 text-sm mt-2">{formErrors.captcha}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
            >
              Envoyer l'email
            </button>
          </form>

          <div className="text-center mt-4">
            <a href="/register" className="text-indigo-600 hover:underline text-sm">
              Retour à la connexion
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
