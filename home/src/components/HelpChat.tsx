'use client';

import { useRef, useState } from 'react';
import { MessageSquare, X, Mic, Image } from 'lucide-react';
import { Icon } from '@iconify/react';

// Déclaration du type de message
type Message = {
  from: 'bot' | 'user';
  text: string;
  image?: string;
  audio?: string;
};

export default function HelpChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: 'bot', text: 'Bonjour ! Comment puis-je vous aider aujourd’hui ? 😊' }
  ]);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [audio, setAudio] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fonction pour envoyer un message texte ou une image
  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { from: 'user', text: input }]);
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { from: 'bot', text: "Merci pour votre message. Un agent va vous répondre bientôt." }
        ]);
      }, 1000);
      setInput('');
    }

    if (image) {
      setMessages(prev => [...prev, { from: 'user', text: 'Image envoyée', image }]);
      setImage(null);
    }

    if (audio) {
      setMessages(prev => [...prev, { from: 'user', text: 'Message vocal envoyé', audio }]);
      setAudio(null);
    }
  };

  // Gérer l’upload d’image
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Gérer le message vocal (simulation)
  const handleAudioRecord = () => {
    // Simulation simple
    setAudio('audio-file-path.mp3');
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen ? (
        <div className="w-280 h-[650px] bg-gradient-to-r from-indigo-200 via-purple-500 to-pink-200 rounded-3xl shadow-lg flex flex-col transition-all animate__animated animate__fadeInUp">
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-3xl">
            <h2 className="font-semibold text-xl">Chat Assistance</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-indigo-700 transition-all">
              <X className="text-2xl" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[75%] px-4 py-2 rounded-xl text-base transition-all duration-300 ${
                  msg.from === 'user'
                    ? 'ml-auto bg-indigo-200 text-indigo-800 shadow-lg'
                    : 'mr-auto bg-gray-100 text-gray-800 shadow-md'
                }`}
              >
                {msg.text}

                {msg.image && (
                  <a href={msg.image} download target="_blank" rel="noopener noreferrer">
                    <img
                      src={msg.image}
                      alt="Envoyé"
                      className="w-32 h-32 object-cover rounded-lg mt-2 cursor-pointer hover:scale-105 transition-transform"
                    />
                  </a>
                )}

                {msg.audio && (
                  <audio controls className="mt-2 w-full">
                    <source src={msg.audio} type="audio/mp3" />
                  </audio>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex gap-2 items-center bg-white rounded-b-3xl shadow-inner">
            <input
              type="text"
              placeholder="Écrivez un message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 px-4 py-3 rounded-full border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />

            {/* Upload image */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Image className="text-xl" />
            </button>

            {/* Audio */}
            <button
              onClick={handleAudioRecord}
              className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Mic className="text-xl" />
            </button>

            {/* Envoyer */}
            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-4 py-3 rounded-full hover:bg-indigo-700 transition-all text-sm flex items-center gap-1"
            >
              Envoyer <Icon icon="tabler:send" className="text-white text-xl" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-xl transform transition-all hover:scale-105 duration-200"
        >
          <MessageSquare className="text-2xl" />
        </button>
      )}
    </div>
  );
}
