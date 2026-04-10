"use client";
import React from 'react';

interface LogoRowProps {
  logos: string[];
  direction?: 'right' | 'left';
  speed?: number;
}

const LogoRow: React.FC<LogoRowProps> = ({ logos, direction = 'right', speed = 30 }) => {
  return (
    <div className="relative overflow-hidden w-full py-6">
      <div
        className={`flex gap-12 ${
          direction === 'right' ? 'animate-scroll-right' : 'animate-scroll-left'
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {/* Triple the logos for seamless infinite loop */}
        {[...logos, ...logos, ...logos].map((logo, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-48 h-28 flex items-center justify-center group"
          >
            {/* Placeholder card - Replace with actual images */}
            <div className="w-full h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center border-2 border-gray-100 group-hover:border-blue-400 group-hover:scale-105">
              <div className="text-center p-4">
                <div className="w-16 h-16 mx-auto mb-2 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {(index % logos.length) + 1}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  University Logo
                </span>
              </div>
            </div>
            {/* 
            Uncomment and use this for actual images:
            <div className="w-full h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center p-6 border-2 border-gray-100 group-hover:border-blue-400 group-hover:scale-105 grayscale group-hover:grayscale-0">
              <Image
                src={logo}
                alt="University partner logo"
                width={180}
                height={100}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            */}
          </div>
        ))}
      </div>
    </div>
  );
};

const UniPartners = () => {
  // Sample university logos - replace with your actual logo paths
  const row1Logos = [
    '/logos/canterbury.png',
    '/logos/oxford-brookes.png',
    '/logos/swansea.png',
    '/logos/westminster.png',
    '/logos/essex.png',
    '/logos/oxford-brookes-2.png',
    '/logos/swansea-2.png',
    '/logos/westminster-2.png',
  ];

  const row2Logos = [
    '/logos/escape.png',
    '/logos/bath.png',
    '/logos/bristol.png',
    '/logos/west-london.png',
    '/logos/stirling.png',
    '/logos/york.png',
    '/logos/soas.png',
    '/logos/pearson.png',
  ];

  const row3Logos = [
    '/logos/lancaster.png',
    '/logos/surrey.png',
    '/logos/nottingham.png',
    '/logos/kent.png',
    '/logos/exeter.png',
    '/logos/uci.png',
    '/logos/roehampton.png',
    '/logos/lancaster-2.png',
  ];

  return (
    <div className="relative w-full py-24 bg-gradient-to-b from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-[1600px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
              Trusted Worldwide
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            250+ Global University Partners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting students with world-class institutions across the globe
          </p>
        </div>

        {/* Three rows with clockwise movement */}
        <div className="space-y-8 relative">
          {/* Left gradient overlay */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/50 to-transparent z-10"></div>
          
          {/* Right gradient overlay */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/50 to-transparent z-10"></div>

          {/* Row 1 - Moving RIGHT */}
          <LogoRow logos={row1Logos} direction="right" speed={40} />
          
          {/* Row 2 - Moving LEFT */}
          <LogoRow logos={row2Logos} direction="left" speed={35} />
          
          {/* Row 3 - Moving RIGHT */}
          <LogoRow logos={row3Logos} direction="right" speed={45} />
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-scroll-right {
          animation: scroll-right linear infinite;
        }

        .animate-scroll-left {
          animation: scroll-left linear infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Pause on hover */
        .animate-scroll-right:hover,
        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default UniPartners;