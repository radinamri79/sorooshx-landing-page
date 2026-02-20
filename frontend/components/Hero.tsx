"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroWords = ["software development", "web3 dapps,mobile apps"];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % heroWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-end pt-[100px] pb-16 md:pb-24 w-full">
      <div className="mx-auto w-full max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 py-10 sm:py-12 md:py-24 lg:py-28">
        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 400,
            lineHeight: 1.3,
            letterSpacing: "-0.5px",
            color: "#ffffff",
          }}
          className="max-w-[900px] text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px]"
        >
          a product design
          <br />
          partner with focus on
        </motion.h1>

        {/* Animated words - orange */}
        <div
          className="mt-1 overflow-hidden h-[36px] sm:h-[50px] md:h-[64px] lg:h-[76px]"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIndex}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="text-[26px] sm:text-[36px] md:text-[48px] lg:text-[56px]"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 400,
                lineHeight: 1.3,
                letterSpacing: "-0.5px",
                color: "#FF6200",
                display: "block",
              }}
            >
              {heroWords[wordIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Book an appointment button */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="inline-flex items-center justify-center mt-8 sm:mt-12"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "14px",
            fontWeight: 400,
            height: "48px",
            padding: "14px 28px",
            border: "1px solid rgba(255,255,255,0.5)",
            borderRadius: "4px",
            backgroundColor: "transparent",
            color: "rgba(255,255,255,0.8)",
            textDecoration: "none",
            letterSpacing: "0px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ffffff";
            e.currentTarget.style.color = "#000000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#ffffff";
          }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          book an appointment
        </motion.a>
      </div>
    </section>
  );
}
