"use client";

import React, { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TestimonialData } from "@/app/api/data";
import { Icon } from "@iconify/react";

const Testimonial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 800,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, review, rating });
    setIsModalOpen(false);
  };

  return (
    <section className="bg-gradient-to-r from-purple-100 to-cream py-20">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="sm:flex justify-between items-center pb-6">
          <h4 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 my-4">
            Ce que disent nos clients satisfaits
          </h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-secondary text-white font-semibold hover:text-primary py-3 px-6 border border-transparent rounded-lg transform transition duration-300 ease-in-out hover:scale-105"
          >
           + Laisser un avis
          </button>
        </div>

        <p className="text-lg font-medium pb-12 text-gray-700">
          Découvrez ce que nos clients pensent de nos produits et services.
        </p>

        <Slider {...settings}>
          {TestimonialData.map((item, index) => (
             <div key={index} className="px-4">
             <div className="bg-gray-50 p-8 rounded-3xl shadow-md h-full flex flex-col items-center text-center min-h-[380px] relative hover:shadow-2xl transition-all duration-300">
               {/* Quote icon */}
               <Icon
                 icon="mdi:format-quote-open"
                 className="text-4xl text-gray-200 absolute top-4 left-4"
               />
               <Image
                 src={item.imgSrc}
                 alt={item.name}
                 width={72}
                 height={72}
                 className="rounded-full border-4 border-white mb-4 mt-6"
               />
        
               <h4 className="text-lg font-semibold text-gray-800 mb-3">
                 {item.name}
               </h4>
               <img
                 src={item.starimg}
                 alt="Étoiles"
                 className="h-5 mx-auto mb-4"
               />
               <p className="text-gray-600 text-base leading-relaxed mt-auto">
                 “{item.detail}”
               </p>
             </div>
           </div>

          ))}
        </Slider>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-xl w-96 shadow-lg relative">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Laissez votre avis
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Votre nom
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Entrez votre nom"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-gray-600 text-sm font-medium mb-2"
                >
                  Votre avis
                </label>
                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Partagez votre expérience"
                  required
                ></textarea>
              </div>

              <div className="mb-6 flex justify-center">
                <div className="flex space-x-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      onClick={() => handleStarClick(index)}
                      className={`h-6 w-6 cursor-pointer transition-all ${
                        rating > index ? "text-yellow-500" : "text-gray-400"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
                    </svg>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 border border-transparent rounded-full hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105"
              >
                <Icon
                  icon="tabler:send"
                  className="text-white text-2xl inline-block me-2"
                />
                Envoyer
              </button>
            </form>

            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 text-xl"
            >
              ✖️
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonial;
