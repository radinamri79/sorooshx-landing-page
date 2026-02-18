"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const services = [
  {
    title: "ai agents & automation",
    description:
      "custom-built ai agents and autonomous workflows that integrate with your business to reduce costs and increase intelligence.",
  },
  {
    title: "web3 engineering",
    description:
      "secure smart contracts (solidity/rust) and scalable dapp architectures built on industry-leading security standards.",
  },
  {
    title: "digital strategy & growth",
    description:
      "specialized marketing and gtm strategies for web3 projects to build community and scale presence.",
  },
  {
    title: "mvp development",
    description:
      "we turn complex ideas into functional prototypes in weeks, not months. perfect for canadian startups looking to raise seed funding.",
  },
  {
    title: "mobile & web engineering",
    description:
      "seamless user experiences across all devices. whether it's a crypto wallet or a consumer tech app, we build pixel-perfect mobile solutions",
  },
 {
    title: "full-stack enterprise",
    description:
      "from secure cloud backends to intuitive interfaces, we deliver enterprise-grade software that is ready for the demands of 2026 and beyond.",
  },
];

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="services" className="w-full py-10 md:py-16">
      <div ref={ref} className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        {/* Section title on gradient line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-center mb-12 pt-14 sm:pt-20 pb-8 sm:pb-12"
        >
          <span
            className="absolute inset-x-0 h-[1px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent)",
            }}
          />
          <span
            className="relative z-10 px-4 text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.45)",
              backgroundColor: "#000",
            }}
          >
            services
          </span>
        </motion.div>

        {/* 2x3 grid with gradient borders */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {services.map((service, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const totalRows = Math.ceil(services.length / 2);
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                }}
                className="relative p-6 sm:p-10 md:p-12 flex flex-col items-center text-center"
              >
                {/* Top border (gradient faded) */}
                {row > 0 && (
                  <span
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
                    }}
                  />
                )}
                {/* Right border (gradient faded) — only left column on md+ */}
                {col === 0 && (
                  <span
                    className="hidden md:block absolute top-0 bottom-0 right-0 w-[1px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
                    }}
                  />
                )}
                <h3
                  className="text-base sm:text-lg font-medium text-white mb-4 leading-snug"
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-sm font-light text-white leading-relaxed max-w-[360px]"
                  style={{
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
