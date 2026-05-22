"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

type PopupAd = {
  id: number;
  title: string;
  imageUrl: string;
  isActive: boolean;
};

export default function RoutePopupAds() {
  const pathname = usePathname() || "/";
  const [ads, setAds] = useState<PopupAd[]>([]);
  const [currentId, setCurrentId] = useState<number | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadAds() {
      try {
        const res = await fetch(`/api/popup-ads?pathname=${encodeURIComponent(pathname)}`, { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) {
          const list = Array.isArray(data.ads)
            ? data.ads.filter((x: PopupAd) => x?.isActive && x?.imageUrl)
            : [];
          setAds(list);
        }
      } catch (error) {
        console.error("Failed to load popup ads", error);
      }
    }
    loadAds();
    return () => {
      ignore = true;
    };
  }, [pathname]);

  useEffect(() => {
    if (!ads.length) {
      setCurrentId(null);
      return;
    }
    setCurrentId(ads[0]?.id ?? null);
  }, [ads, pathname]);

  const activeAd = useMemo(() => ads.find((item) => item.id === currentId) || null, [ads, currentId]);

  function closePopup() {
    setCurrentId(null);
  }

  if (!activeAd) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.62)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div style={{ position: "relative", maxWidth: 880, width: "100%" }}>
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close popup"
          style={{
            position: "absolute",
            top: -14,
            right: -14,
            width: 34,
            height: 34,
            borderRadius: "50%",
            border: "none",
            background: "#111",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          ×
        </button>
        <img
          src={activeAd.imageUrl}
          alt={activeAd.title || "Popup ad"}
          style={{
            width: "100%",
            maxHeight: "85vh",
            objectFit: "contain",
            borderRadius: 12,
            boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
            background: "#fff",
          }}
        />
      </div>
    </div>
  );
}
