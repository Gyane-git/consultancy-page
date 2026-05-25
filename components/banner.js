"use client";

import { useEffect, useState } from "react";

const fallbackImages = [
  "/studysyncbanner.jpeg",
  "https://www.abroadfromnepal.com/wp-content/uploads/2026/02/Best-Consultancy-in-Nepal-for-France.jpg",
  "/image.png",
];


export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState(fallbackImages);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let ignore = false;
    async function loadBanners() {
      try {
        const res = await fetch("/api/banner", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success && Array.isArray(data.banners) && data.banners.length) {
          const bannerImages = data.banners.map((item) => item.image_path).filter(Boolean);
          const bannerLinks = data.banners.map((item) => item.link_url || "");
          if (bannerImages.length) {
            setImages(bannerImages);
            setLinks(bannerLinks);
            setCurrent(0);
          }
        }
      } catch (error) {
        console.error("Failed to load banners", error);
      }
    }
    loadBanners();
    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!images.length) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="relative w-full h-[33vh] sm:h-[45vh] md:h-[70vh] lg:h-[90vh] overflow-hidden bg-black">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {links[index] ? (
            <a href={links[index]} className="block w-full h-full">
              <img
                src={img}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain sm:object-cover"
                style={{
                  filter: "brightness(1.1) contrast(1.05)",
                  objectPosition: index === 0 ? "center top" : "center",
                }}
              />
            </a>
          ) : (
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-contain sm:object-cover"
              style={{
                filter: "brightness(1.1) contrast(1.05)",
                objectPosition: index === 0 ? "center top" : "center",
              }}
            />
          )}
        </div>
      ))}

      {/* Gradient Overlay (better than full dark) */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Bottom Left CTA */}
      <div className="absolute bottom-8 left-4 sm:left-6 md:left-10 z-10">
        <div className="relative inline-block">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-orange-500 rounded-full blur opacity-70"></div>

         
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
