"use client";

import { useState, useRef, useEffect } from 'react';
import HelpChat from '@/components/HelpChat';
import { ChevronDown, ChevronUp, Send } from 'lucide-react';
import Link from 'next/link'; // ✅ Corrigé ici
import { FaStore, FaBolt, FaUser, FaShoppingCart } from 'react-icons/fa';
import Logo from '@/components/Layout/Header/Logo';

const faqData = [
  {
    question: "Comment suivre ma commande ?",
    answer: "Vous pouvez suivre votre commande via votre espace client, section 'Mes commandes'."
  },
  {
    question: "Quels sont les moyens de paiement disponibles ?",
    answer: "Nous acceptons les paiements par carte bancaire, PayPal et paiement à la livraison."
  },
  {
    question: "Puis-je retourner un produit ?",
    answer: "Oui, vous avez 14 jours pour retourner un produit non utilisé dans son emballage d'origine."
  },
  {
    question: "Comment contacter le service client ?",
    answer: "Via ce formulaire, ou via le chat en direct en bas à droite."
  }
];

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Initialiser SpeechRecognition côté client uniquement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.lang = 'fr-FR';
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsSending(true);
    if (message || file) {
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
      setIsSending(false);
    }
  };

  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };
    }
  };

  return (
    <div className="bg-cream w-450 ">
      <div className="flex items-center justify-between border-b pb-4 mb-6 ">
      <div className="flex items-center space-x-2">
  <div className="ml-1">
    <Logo /> {/* Ici, on peut aussi ajuster la taille du logo dans le composant Logo */}
  </div>
  <div className="text-xl font-bold text-red-500 mr-3">E-commerce</div> {/* Réduit la taille du texte */}
</div>

        <div className="flex space-x-6 text-sm">
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 mt-4" >
            <FaStore className="text-xl text-purple-400" />
            <span><a href="/#" >Accueil</a></span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 mt-4">
            <FaBolt className="text-xl text-purple-400" />
            <span>  <a href="/hotdeals">Promotions</a></span>
          </div><div className="flex items-center gap-2 cursor-pointer hover:text-orange-500 mt-4">
                        <FaUser className="text-xl text-purple-400" />
                        <span>  <a href="/profil">Compte</a></span>
                      </div>
          <div className="bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600 transition mt-4">
            <FaShoppingCart className="text-2xl text-purple-400" />
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 px-6 py-10 md:px-20 relative overflow-hidden">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Centre d'Aide
        </h1>
        <p className="text-white text-center max-w-2xl mx-auto mb-12 text-lg opacity-90">
          Vous avez une question ou un problème avec votre commande ? Trouvez ici les réponses ou contactez notre équipe.
        </p>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto space-y-6">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-lg p-6 relative overflow-hidden"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                <h3 className="font-semibold text-xl text-indigo-700 hover:text-indigo-600 transition-colors duration-300">
                  {item.question}
                </h3>
                {openFAQ === index ? (
                  <ChevronUp className="text-indigo-600" />
                ) : (
                  <ChevronDown className="text-indigo-600" />
                )}
              </div>
              {openFAQ === index && (
                <p className="mt-4 text-gray-700 text-sm animate__animated animate__fadeIn animate__delay-1s">{item.answer}</p>
              )}
            </div>
          ))}
        </div>

        {/* Assistant IA */}
        <div className="mt-20 max-w-4xl mx-auto bg-gray-900 bg-opacity-60 p-10 rounded-2xl shadow-2xl hover:shadow-2xl transition-transform transform hover:scale-105 relative">
          <h2 className="text-3xl font-bold text-white mb-6">Parlez à notre Assistant IA 🤖</h2>
          <p className="text-white mb-6 text-lg opacity-90">
            Posez une question, notre assistant intelligent fera de son mieux pour vous répondre en quelques secondes.
          </p>

          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Posez votre question ici..."
              className="w-full px-6 py-4 border border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200 shadow-lg hover:shadow-xl"
            />
            <button
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-indigo-600 rounded-full p-4 hover:bg-indigo-700 transition duration-300 ${isSending ? 'animate-pulse' : ''}`}
              onClick={handleSubmit}
              disabled={isSending}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              ref={fileInputRef}
            />
            <label htmlFor="file-upload" className="cursor-pointer text-white text-sm flex items-center gap-2 hover:text-indigo-300">
              📎 Ajouter un fichier
              {file && <span className="text-indigo-300 text-sm">{file.name}</span>}
            </label>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={handleVoiceInput}
              className="text-white text-sm flex items-center gap-2 hover:text-indigo-300"
            >
              🎤 Utiliser la voix
            </button>
          </div>

          {showConfirmation && (
            <div className="mt-4 text-center text-green-500 font-semibold">
              Votre message a été envoyé avec succès ! Merci de votre patience.
            </div>
          )}
        </div>

        {/* Chat direct */}
        <HelpChat />
      </div>
    </div>
  );
}
