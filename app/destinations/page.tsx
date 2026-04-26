"use client";

import { useEffect, useState } from "react";

type Destination = {
  id: number;
  slug: string;
  name: string;
  shortText?: string | null;
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
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-3">Where Will You Study Next?</h1>
      <p className="text-gray-600 mb-8">Destination names and descriptions are now fully dynamic from your admin panel.</p>

      {loading ? (
        <p className="text-gray-600">Loading destinations...</p>
      ) : !destinations.length ? (
        <p className="text-gray-600">No destinations available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((item) => (
            <a key={item.id} href={`/destinations/${item.slug}`} className="block border rounded-xl p-5 bg-white hover:shadow-md transition">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-sm text-gray-600">{item.shortText || "Explore programs, universities, and visa pathways."}</p>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
