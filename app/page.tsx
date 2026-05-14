"use client";

import HeroBanner from "@/components/banner";
import Testimonials from "@/components/Testimonials";
import FindUni from "@/components/find-uni";
import UniPartners from "@/components/uniPartners";
import FAQ from "@/components/FAQ";
import ProcessSteps from "@/components/Processsteps";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [homeShowFindUni, setHomeShowFindUni] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadSettings() {
      try {
        const res = await fetch("/api/site-settings", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success && data?.settings) {
          setHomeShowFindUni(data.settings.homeShowFindUni !== false);
        }
      } catch (error) {
        console.error("Failed to load site settings", error);
      }
    }

    loadSettings();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="space-y-0">
      <HeroBanner />
      <Testimonials />

      {homeShowFindUni ? <FindUni /> : <ProcessSteps />}

      <UniPartners />
      <FAQ />

      {/* {showSplash && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65">
          <div className="relative rounded-2xl bg-transparent p-2 mx-4 sm:mx-8 md:mx-0">
            <button
              onClick={() => setShowSplash(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white transition hover:scale-110"
              aria-label="Close popup"
            >
              ✕
            </button>

            <Image
              src="/images/image.png"
              width={1000}
              height={600}
              priority
              className="w-full h-auto"
              alt="Offer image"
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
