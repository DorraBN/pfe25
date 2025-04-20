"use client";
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState, useRef, useEffect } from 'react';

// Define the props interface with the type for 'onClose'
interface ChatbotWindowProps {
  onClose: () => void; // Function type for onClose (no arguments, no return value)
}

export default function ChatbotWindow({ onClose }: ChatbotWindowProps) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  
  // Explicitly typing bottomRef to refer to a div element
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: "Merci pour votre message !" }]);
    }, 1000);
    setInput('');
  };

  useEffect(() => {
    // Now TypeScript knows bottomRef.current is a HTMLDivElement or null
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-[140px] right-10 w-80 max-h-[500px] bg-white shadow-2xl rounded-2xl z-50 flex flex-col animate-fade-in border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-2xl flex justify-between items-center">
        <span className="font-semibold text-lg">AssistBot</span>
        <button
          onClick={onClose}
          className="text-white text-xl hover:text-red-300 transition-transform hover:scale-110"
        >
          ✖
        </button>
      </div>

      {/* Message List */}
      <div className="flex-1 px-4 py-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`px-4 py-2 rounded-xl max-w-[80%] text-sm ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t bg-gray-50 flex items-center gap-2">
        <input
          className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Écrivez un message..."
        />
        <div className="flex">
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-2 rounded-full text-sm transition flex items-center gap-2"
          >
            <Icon icon="tabler:send" className="text-white text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
}
