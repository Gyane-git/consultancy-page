"use client"
//import React from 'react'
import HeroBanner from '@/components/banner'
import Testimonials from '@/components/Testimonials'
import FindUni from '@/components/find-uni'
import UniPartners from '@/components/uniPartners'
import FAQ from '@/components/FAQ'
//import GetInTouch from "@/components/"
//import AboutStudySync from '@/components/AboutStudySync'
//import Team from '@/components/Team'
//import Destinations from '@/components/Destinations'
import { useState } from "react";
import Image from "next/image";

function home() {

const [showSplash, setShowSplash] = useState(true);

  // 👉 Put your static image path here (inside /public folder)
  const offerImage = "/images/image.png";

  return (
    <div className="space-y-0">
      <HeroBanner />
      {/* <AboutStudySync />
      <Destinations />
      <Team /> */}
      <Testimonials />
      <FindUni />
      <UniPartners />
      
      <FAQ />
      <>
      {/* SPLASH OVERLAY */}
      {showSplash && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65">
          <div className="relative rounded-2xl bg-transparent p-2 mx-4 sm:mx-8 md:mx-0">
            
            {/* Close button */}
            <button
              onClick={() => setShowSplash(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white transition hover:scale-110"
            >
              ✕
            </button>

            {/* Offer image */}
            <Image
  src="/images/image.png"
  width={1000}
  height={600}
  priority
  className="w-full h-auto"
  alt="image"
/>
          </div>
        </div>
      )}
    </>
      
      
    </div>
  )
}

export default home



