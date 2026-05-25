"use client";

export default function TawkToWidget() {
  const settings = {
    whatsapp: "9810724525",
  };

  const message = "Hello! I'm interested in your services!";

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(
      `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <div className="fixed bottom-2 right-3 z-50 flex flex-col items-center justify-center">
        <button
          onClick={handleWhatsAppClick}
          className="hover:scale-110 transform text-white p-3 rounded-full flex items-center justify-center transition-all duration-300 animate-bounce"
          aria-label="Contact us on WhatsApp"
        >
          <img
            src="/images/whatsapp-logo.avif"
            alt="WhatsApp"
            className="w-20 h-20 pointer-events-none -mb-2"
          />
        </button>
        <span className="text-[18px] text-gray-700 font-bold mb-4">Contact Us</span>
      </div>
    </>
  );
}
