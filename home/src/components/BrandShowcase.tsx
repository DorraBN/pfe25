'use client';

import { useEffect, useRef } from "react";

const BrandCarousel = () => {
  const brands = [
    { name: "Apple", logo: "https://logo.clearbit.com/apple.com" },
    { name: "Samsung", logo: "https://logo.clearbit.com/samsung.com" },
    { name: "Dell", logo: "https://logo.clearbit.com/dell.com" },
    { name: "HP", logo: "https://logo.clearbit.com/hp.com" },
    { name: "Lenovo", logo: "https://logo.clearbit.com/lenovo.com" },
    { name: "Asus", logo: "https://logo.clearbit.com/asus.com" },
    { name: "Acer", logo: "https://logo.clearbit.com/acer.com" },
    { name: "MSI", logo: "https://logo.clearbit.com/msi.com" },
    { name: "Logitech", logo: "https://logo.clearbit.com/logitech.com" },
    { name: "Razer", logo: "https://logo.clearbit.com/razer.com" },
    { name: "Sony", logo: "https://logo.clearbit.com/sony.com" },
    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com" },
    { name: "LG", logo: "https://logo.clearbit.com/lg.com" },
    { name: "Toshiba", logo: "https://logo.clearbit.com/toshiba.com" },
    { name: "Canon", logo: "https://logo.clearbit.com/canon.com" },
    { name: "Nikon", logo: "https://logo.clearbit.com/nikon.com" },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const wrapper = wrapperRef.current;
    if (!carousel || !wrapper) return;

    carousel.innerHTML += carousel.innerHTML;

    let animationId: number;
    let speed = 1.5;
    let position = 0;
    const carouselWidth = carousel.scrollWidth / 2;

    const animate = () => {
      position -= speed;
      if (position <= -carouselWidth) {
        position = 0;
      }
      carousel.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    const checkOverflow = () => {
      if (carouselWidth > wrapper.clientWidth) {
        animate();
      } else {
        carousel.style.transform = 'none';
        if (animationId) cancelAnimationFrame(animationId);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          Nos Marques Partenaires
        </h2>

        <div className="relative overflow-hidden" ref={wrapperRef}>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          <div
            ref={carouselRef}
            className="flex items-center gap-x-16 py-4 w-max"
          >
            {brands.map((brand, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center min-w-[140px] group transition-all duration-300 hover:scale-110"
              >
                <div className="w-20 h-20 mb-4 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain rounded-full p-2"
                  />
                </div>
                <span className="text-lg font-medium text-gray-700 group-hover:text-primary transition-colors duration-300">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCarousel;