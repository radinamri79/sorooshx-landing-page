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
    <section id="services" className="py-10 md:py-16">
      <div ref={ref} className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="border-t border-white/10 pt-6 mb-12 text-center"
        >
          <span
            className="text-sm sm:text-base font-light text-white"
            style={{
              fontFamily: "var(--font-body)",
            }}
          >
            services
          </span>
        </motion.div>

        {/* 2x3 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/10">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
              }}
              className="bg-black p-6 sm:p-10 md:p-12 flex flex-col items-center text-center"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
