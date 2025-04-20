import React from "react";
import Hero from "@/components/Home/Hero";
import Companies from "@/components/Home/Companies";
import NamesList from "@/components/Home/Courses";

import Testimonial from "@/components/Home/Testimonial";
import Newsletter from "@/components/Home/Newsletter";
import { Metadata } from "next";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import ChatbotWidget from "@/components/ChatbotWidget";
export const metadata: Metadata = {
  title: "Ecommerce",
};

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
    
      <NamesList />
     
      <Testimonial />
      <Newsletter />
      <ChatbotWidget/>
      <Footer />
    </main>
  );
}
