"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type University = {
  id: number;
  name: string;
  logo?: string | null;
  country?: string | null;
  courseName?: string | null;
  courseDescription?: string | null;
  supportImage?: string | null;
  videoUrl?: string | null;
};

function toEmbedUrl(input?: string | null) {
  const value = String(input || "").trim();
  if (!value) return "";

  try {
    if (value.includes("<iframe")) {
      const match = value.match(/src\s*=\s*["']([^"']+)["']/i);
      return match?.[1] || "";
    }

    const parsed = new URL(value);
    const host = parsed.hostname.toLowerCase();

    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      const id = host.includes("youtu.be")
        ? parsed.pathname.split("/").filter(Boolean)[0]
        : parsed.searchParams.get("v") || parsed.pathname.split("/").filter(Boolean)[1] || "";
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (host.includes("facebook.com") || host.includes("fb.watch")) {
      if (parsed.pathname.includes("/plugins/video.php")) return parsed.toString();
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(value)}&show_text=false`;
    }

    return "";
  } catch {
    return "";
  }
}

function UniversitySearchContent() {
  const searchParams = useSearchParams();
  const [items, setItems] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  const q = (searchParams.get("q") || "").trim();
  const university = (searchParams.get("university") || "").trim();
  const course = (searchParams.get("course") || "").trim();
  const country = (searchParams.get("country") || "").trim();

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const res = await fetch("/api/university", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && res.ok && data?.success) {
          setItems(Array.isArray(data.universities) ? data.universities : []);
        }
      } catch (error) {
        console.error("Failed to load universities", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((item) => (university ? item.name === university : true))
      .filter((item) => (course ? item.courseName === course : true))
      .filter((item) => (country ? (item.country || "").toLowerCase() === country.toLowerCase() : true))
      .filter((item) => {
        if (!q) return true;
        const text = `${item.name || ""} ${item.country || ""} ${item.courseName || ""} ${item.courseDescription || ""}`.toLowerCase();
        return text.includes(q.toLowerCase());
      });
  }, [items, q, university, course, country]);

  return (
    <main className="min-h-screen bg-[#f7f9ff] text-gray-700">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="rounded-3xl border border-[#e8ebf8] bg-white shadow-[0_14px_44px_rgba(28,34,56,0.08)] overflow-hidden">
          <div className="px-6 py-8 md:px-10 md:py-10 bg-gradient-to-r from-[#1f2438] to-[#2b2d8e] text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-white/70 font-semibold">Search Results</p>
            <h1 className="mt-2 text-2xl md:text-4xl font-extrabold">Universities & Courses</h1>
            <p className="mt-3 text-sm md:text-base text-white/80">Showing matched data from your university API based on selected filter.</p>

            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {university ? <span className="px-3 py-1 rounded-full bg-white/15">University: {university}</span> : null}
              {course ? <span className="px-3 py-1 rounded-full bg-white/15">Course: {course}</span> : null}
              {country ? <span className="px-3 py-1 rounded-full bg-white/15">Country: {country}</span> : null}
              {q ? <span className="px-3 py-1 rounded-full bg-white/15">Keyword: {q}</span> : null}
              {!university && !course && !country && !q ? <span className="px-3 py-1 rounded-full bg-white/15">All Records</span> : null}
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              {loading ? "Searching..." : `${filtered.length} programs found`}
            </div>
          </div>

          <div className="p-6 md:p-8 bg-gradient-to-b from-[#fcfdff] to-[#f5f8ff]">
            {loading ? (
              <p className="text-sm text-gray-500">Loading results...</p>
            ) : !filtered.length ? (
              <div className="rounded-2xl border border-[#e6e9f7] bg-white p-8 text-center">
                <p className="text-base font-semibold text-[#1f2438]">No match found</p>
                <p className="text-sm text-[#68708a] mt-1">Try another course, university, or keyword.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filtered.map((item) => {
                  const embedUrl = toEmbedUrl(item.videoUrl);
                  return (
                    <article key={item.id} className="rounded-2xl border border-[#e3e8f8] bg-white p-4 md:p-6 shadow-[0_8px_24px_rgba(31,36,56,0.06)]">
                      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5">
                        <div className="xl:col-span-5">
                          <div className="flex items-start gap-3">
                            {item.logo ? (
                              <img src={item.logo} alt={item.name} className="w-14 h-14 object-contain rounded-lg border border-[#f0f2fa] p-1 bg-white" />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-[#f2f4fd]" />
                            )}
                            <div>
                              <h2 className="text-xl font-bold text-[#1f2438] leading-6">{item.name}</h2>
                              <div className="mt-1 inline-flex items-center rounded-full bg-[#eff3ff] px-3 py-1 text-xs font-semibold text-[#2b2d8e]">
                                {item.country || "Country not specified"}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 rounded-xl border border-[#edf0fb] bg-[#fbfcff] p-4">
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#7b7d90]">Course</p>
                            <p className="text-base font-semibold text-[#2b2d8e] mt-1">{item.courseName || "Course not specified"}</p>
                            <p className="text-sm text-[#5d6076] mt-2 leading-6">{item.courseDescription || "No description available yet."}</p>
                          </div>
                        </div>

                        <div className="xl:col-span-7 space-y-4">
                          {item.supportImage ? (
                            <img src={item.supportImage} alt={`${item.name} support`} className="w-full h-56 object-cover rounded-xl border border-[#eceef8]" />
                          ) : (
                            <div className="w-full h-56 rounded-xl border border-dashed border-[#dce1f3] bg-[#f8faff] flex items-center justify-center text-sm text-[#8a90a8]">
                              Support image not available
                            </div>
                          )}

                          {embedUrl ? (
                            <div className="rounded-xl overflow-hidden border border-[#eceef8] bg-black">
                              <iframe
                                src={embedUrl}
                                title={`${item.name} video`}
                                className="w-full h-56"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              />
                            </div>
                          ) : (
                            <div className="w-full h-56 rounded-xl border border-dashed border-[#dce1f3] bg-[#f8faff] flex items-center justify-center text-sm text-[#8a90a8]">
                              Video not available
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function UniversitySearchPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7f9ff] p-6 text-sm text-gray-500">Loading search...</main>}>
      <UniversitySearchContent />
    </Suspense>
  );
}
