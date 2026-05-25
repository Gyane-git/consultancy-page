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

      
    </div>
  );
}
