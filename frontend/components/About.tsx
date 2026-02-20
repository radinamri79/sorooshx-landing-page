"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="w-full py-10 md:py-16">
      <div ref={ref} className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="pt-6 mb-8 sm:mb-12 md:mb-16"
          style={{
            borderTop: "1px solid transparent",
            backgroundImage: "linear-gradient(#000, #000), linear-gradient(to right, transparent, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(255,255,255,1)",
            }}
          >
            about us
          </span>
        </motion.div>

        {/* Content: text left, video right */}
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 items-stretch">
          {/* Left text */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.2,
                color: "rgba(255,255,255,1)",
              }}
            >
              founded in the heart of canada&apos;s tech ecosystem, codefi is a
              high-end engineering studio where sophisticated software meets the
              decentralized future. we don&apos;t just build applications; we
              architect intelligent ecosystems. by fusing the immutable security
              of web3 with the autonomous power of ai, we empower enterprises
              and startups to transition from legacy systems to the forefront of
              the digital economy. at codefi, we code with precision, design
              with intent, and build for scale.
            </motion.p>

            {/* Read more link */}
            <motion.a
              href="#"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block mt-8"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(255,255,255,1)",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
              }
            >
              read more
            </motion.a>
          </div>

          {/* Right video placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex-1 w-full"
          >
            <div
              className="w-full h-full rounded-lg flex items-center justify-center relative"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Play button — Nitro style */}
              <div className="relative cursor-pointer group/play">
                {/* Outer ring */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 group-hover/play:scale-110"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.25)",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="rgba(255,255,255,0.8)"
                    className="ml-1"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
