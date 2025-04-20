"use client"
import React from "react";
import Hero from "@/components/Home/Hero";
import Companies from "@/components/Home/Companies";
import NamesList from "@/components/Home/Courses";

import Testimonial from "@/components/Home/Testimonial";
import Newsletter from "@/components/Home/Newsletter";
import { Metadata } from "next";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import Products from "@/components/Products"
import Details from "@/components/Details";
import Checkout from "@/components/Checkout";
import ContactInfo from "@/components/ContactInfo";


export default function Home() {
  return (
    <main>
 
      <Checkout />
      <ContactInfo/>
      <Footer />
    </main>
  );
}
