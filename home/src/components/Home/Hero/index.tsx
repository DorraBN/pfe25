

"use client"; // Add this at the top if you're using Next.js

import BrandShowcase from "@/components/BrandShowcase";
import { Icon } from "@iconify/react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const Banner = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Specify the correct type
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return; // Add null check
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };
  // Configuration des éléments flottants (matériel informatique)
  const hardwareIcons = [
    // Éléments principaux (plus visibles)
    { id: 1, icon: "mdi:desktop-classic", size: 70, x: 15, y: 25, color: "text-blue-500/30", moveIntensity: 40, rotateIntensity: 15 },
    { id: 2, icon: "mdi:laptop", size: 65, x: 80, y: 20, color: "text-indigo-500/30", moveIntensity: 35, rotateIntensity: 12 },
    { id: 3, icon: "mdi:cellphone", size: 50, x: 25, y: 70, color: "text-purple-500/30", moveIntensity: 30, rotateIntensity: 10 },
    { id: 4, icon: "mdi:headphones", size: 55, x: 75, y: 65, color: "text-red-500/30", moveIntensity: 25, rotateIntensity: 8 },
    
    // Composants PC
    { id: 5, icon: "mdi:chip", size: 45, x: 10, y: 50, color: "text-green-500/25", moveIntensity: 20, rotateIntensity: 5 },
    { id: 6, icon: "mdi:memory", size: 50, x: 85, y: 40, color: "text-blue-400/25", moveIntensity: 20, rotateIntensity: 5 },
    { id: 7, icon: "mdi:harddisk", size: 45, x: 40, y: 20, color: "text-yellow-500/25", moveIntensity: 20, rotateIntensity: 5 },
    { id: 8, icon: "mdi:graphics-processing-unit", size: 60, x: 60, y: 80, color: "text-orange-500/25", moveIntensity: 25, rotateIntensity: 8 },
    
    // Périphériques
    { id: 9, icon: "mdi:keyboard", size: 45, x: 30, y: 85, color: "text-gray-500/20", moveIntensity: 15, rotateIntensity: 3 },
    { id: 10, icon: "mdi:mouse", size: 40, x: 70, y: 15, color: "text-gray-600/20", moveIntensity: 15, rotateIntensity: 3 },
    { id: 11, icon: "mdi:printer", size: 50, x: 20, y: 40, color: "text-blue-600/20", moveIntensity: 20, rotateIntensity: 5 },
    { id: 12, icon: "mdi:monitor", size: 55, x: 65, y: 60, color: "text-indigo-500/20", moveIntensity: 20, rotateIntensity: 5 },
    
    // Accessoires
    { id: 13, icon: "mdi:usb-flash-drive", size: 35, x: 45, y: 30, color: "text-green-", moveIntensity: 10, rotateIntensity: 2 },
    { id: 14, icon: "mdi:router-wireless", size: 50, x: 55, y: 70, color: "text-blue-400/15", moveIntensity: 15, rotateIntensity: 3 },
    { id: 15, icon: "mdi:webcam", size: 40, x: 35, y: 60, color: "text-red-500/15", moveIntensity: 10, rotateIntensity: 2 },
    { id: 16, icon: "mdi:server", size: 60, x: 25, y: 25, color: "text-gray", moveIntensity: 20, rotateIntensity: 5 },
  ];

  return (
    <section 
      className="bg-gradient-to-br from-gray-50 to-gray-100 pt-52 pb-42 overflow-hidden relative"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Animated hardware background elements */}
      {hardwareIcons.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color} z-0`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            x: useTransform(mouseX, [0, 1200], [-item.moveIntensity, item.moveIntensity]),
            y: useTransform(mouseY, [0, 600], [-item.moveIntensity/2, item.moveIntensity/2]),
            rotate: useTransform(mouseX, [0, 1200], [-15, 15]),
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: item.color.includes("400") ? 0.3 : 0.15 }}
          transition={{ 
            type: "spring",
            damping: 4,
            stiffness: 40,
            delay: item.id * 0.05
          }}
        >
          <Icon icon={item.icon} width={item.size} height={item.size} />
        </motion.div>
      ))}

      {/* Static content */}
      <div className="relative px-6 lg:px-8 z-10">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          {/* Titre & sous-titre */}
          <div className="text-center mb-10 mt-16">
            <h1 className="text-xl sm:text-6xl  tracking-tight text-gray-900 leading-tight">
              Bienvenue dans notre <br className="hidden sm:block" />
              <span className="text-primary">boutique informatique</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez notre large gamme d'ordinateurs, composants et accessoires high-tech.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="mx-auto max-w-4xl">
            <div className="flex bg-white border border-gray-300 shadow-xl rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
              <div className="flex items-center px-5 bg-white">
                <Icon icon="tabler:search" className="text-gray-400 text-2xl" />
              </div>
              <input
                type="text"
                placeholder="Rechercher un ordinateur, composant, accessoire..."
                className="flex-grow px-2 py-4 text-base text-gray-800 placeholder-gray-400 bg-white focus:outline-none"
              />
              <button className="bg-primary text-white font-semibold text-sm px-6 hover:bg-primary/90 transition duration-300">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
      <BrandShowcase/>
    </section>
  );
};

export default Banner;