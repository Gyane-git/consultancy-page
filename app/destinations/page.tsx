"use client";

import ContactFAQPage from "@/components/FAQ";
import { useEffect, useState } from "react";


type Destination = {
  id: number;
  slug: string;
  name: string;
  shortText?: string | null;
  bannerTitle?: string | null;
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function loadDestinations() {
      try {
        const res = await fetch("/api/destination", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          setDestinations(Array.isArray(data.destinations) ? data.destinations : []);
        }
      } catch (error) {
        console.error("Failed to fetch destinations", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadDestinations();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="rounded-3xl border border-[#ececf4] bg-gradient-to-r from-[#fff4f3] to-[#f6f9ff] px-6 py-10 md:px-10">
          <p className="text-xs font-bold tracking-[0.14em] text-[#e8352a] uppercase">Study Destinations</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-extrabold text-[#1f2438]">Choose Your Next Destination</h1>
          <p className="mt-3 max-w-2xl text-sm md:text-base leading-7 text-[#5d6076]">
            Explore country-specific guidance. Every destination page is now fully dynamic from your admin panel.
          </p>
        </div>

        <div className="mt-8">
          {loading ? (
            <p className="text-sm text-gray-500">Loading destinations...</p>
          ) : !destinations.length ? (
            <p className="text-sm text-gray-500">No destinations available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {destinations.map((item) => (
                <a
                  key={item.id}
                  href={`/destinations/${item.slug}`}
                  className="group rounded-2xl border border-[#ececf4] bg-white p-5 hover:shadow-md hover:border-[#d8dcef] transition"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e8352a]">{item.slug}</p>
                  <h2 className="mt-1 text-xl font-bold text-[#1f2438]">{item.name}</h2>
                  <p className="mt-2 text-sm text-[#5d6076] leading-6">{item.shortText || "Explore programs, universities, and visa pathways."}</p>
                  <p className="mt-3 text-sm font-semibold text-[#2b2d8e] group-hover:text-[#e8352a]">Open Guide →</p>
                </a>
              ))}
            </div>
          )}
        </div>
      
      </section>
    </main>
  );
}
