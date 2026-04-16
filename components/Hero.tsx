"use client";

import React from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function Hero({
  title,
  subtitle,
  icon = "map",
}: {
  title: string;
  subtitle?: string;
  icon?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-red-50 to-white py-16">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#c0392b]/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#c0392b]/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-5 rounded-2xl bg-white shadow-lg border"
        >
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#fff5f5] to-white">
            <Icon name={icon} />
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1a1a] leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-gray-600 mt-4 text-lg max-w-xl">
              {subtitle}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="/contact"
              className="bg-[#c0392b] text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
            >
              Book Free Trial
            </a>

            <a
              href="#courses"
              className="border px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              Explore Courses
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}