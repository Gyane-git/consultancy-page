"use client";

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[340px] bg-[#eef0f8] overflow-hidden flex items-center">
      {/* Left text */}
      <div className="relative z-10 pl-16 pr-8 flex flex-col justify-center h-full max-w-[55%]">
        <h1 className="text-5xl font-bold text-[#2b2d8e] leading-tight mb-4">
          Study in UK
        </h1>
        <p className="text-2xl font-medium text-[#2b2d8e] leading-snug">
          Top Universities
          <br />
          and Quality Education
        </p>
        <div className="mt-10">
          <div className="w-8 h-8 rounded-full border-2 border-[#2b2d8e] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-[#2b2d8e]" />
          </div>
        </div>
      </div>

      {/* Right image */}
      <div className="absolute right-0 top-0 h-full w-[52%]">
        <img
          src="/images/bigben.jpg"
          alt="Big Ben, London"
          className="w-full h-full object-cover object-left-top"
        />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#eef0f8] to-transparent" />
      </div>

      {/* Scroll label */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-20">
        <span
          className="text-[10px] font-semibold text-gray-500 tracking-widest"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          scroll
        </span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#2b2d8e]" />
      </div>
    </section>
  );
}