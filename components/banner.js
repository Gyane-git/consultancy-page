"use client";

import { useEffect, useState } from "react";

const images = [
  "https://brightedugroup.com/blog/wp-content/uploads/2024/10/Bright-Main-Banner-768x432-1.webp",
  "https://www.abroadfromnepal.com/wp-content/uploads/2026/02/Best-Consultancy-in-Nepal-for-France.jpg",
  "/image.png",
];


export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[33vh] sm:h-[45vh] md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={img}
            alt={`Banner ${index + 1}`}
            className="w-full h-full object-contain sm:object-cover"
            style={{
              filter: "brightness(1.1) contrast(1.05)",
              objectPosition: index === 0 ? "center top" : "center",
            }}
          />
        </div>
      ))}

      {/* Gradient Overlay (better than full dark) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Bottom Left CTA */}
      <div className="absolute bottom-8 left-4 sm:left-6 md:left-10 z-10">
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-full blur opacity-70"></div>

          <button className="relative bg-red-600 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-semibold text-white hover:bg-red-700 transition shadow-lg">
            
            Book Free Consultation

          </button>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              current === i ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
