"use client"
import { useState } from 'react';
import ChatbotWindow from './ChatbotWindow';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && <ChatbotWindow onClose={() => setIsOpen(false)} />}
      <div className="fixed bottom-3 right-6 z-50 ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-50 h-50 rounded-full shadow-lg bg-transparent flex items-center justify-center text-white text-xl hover:scale-105 transition"
        >
       <video
  width="150"
  height="150"
  loop
  muted
  autoPlay
  className="rounded-full"
  playsInline
  disablePictureInPicture
  controlsList="nodownload nofullscreen noremoteplayback"
>
  <source src="/images/a.webm" type="video/webm" />
  Votre navigateur ne supporte pas la lecture de vidéos.
</video>



        </button>
      </div>
    </>
  );
}
