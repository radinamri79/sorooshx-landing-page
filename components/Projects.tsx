"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Project {
  year: string;
  category: string;
  title: string;
  href: string;
  mainBg: string;
  imageBg: string;
  darkText: boolean;
  image?: string;
}

const projects: Project[] = [
  {
    year: "2022",
    category: "Web3 & SocialFi",
    title: "sorooshx",
    href: "#",
    mainBg: "#FF6200",
    imageBg: "#F05400",
    darkText: true,
    image: "/iMockup - iPhone 15 Pro Max.png",
  },
  {
    year: "2025",
    category: "AI Agent",
    title: "doyo",
    href: "#",
    mainBg: "#FFDD00",
    imageBg: "#FFC300",
    darkText: true,
    image: "/Doyo.png",
  },
  {
    year: "2020",
    category: "Decentralized VPN",
    title: "bitvpn",
    href: "#",
    mainBg: "#1F00FF",
    imageBg: "#FFFFFF",
    darkText: false,
  },
  {
    year: "2026",
    category: "Smart Financial AI",
    title: "coco ai",
    href: "#",
    mainBg: "#FF003B",
    imageBg: "#FFFFFF",
    darkText: false,
  },
];

const STICKY_TOP = 90;

function StickyCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Arrow: starts right (→), rotates to upper-right (↗) when card is fully in view
  const arrowRotate = useTransform(scrollYProgress, [0.2, 0.45], [0, -45]);

  const textColor = project.darkText ? "#000000" : "#ffffff";
  const metaColor = project.darkText ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)";
  const borderColor = project.darkText ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";

  return (
    /* Each wrapper is 100vh — this provides the scroll distance needed */
    <div
      ref={cardRef}
      style={{ height: "100vh" }}
    >
      {/* The sticky card itself — all cards stick at the SAME top position */}
      <a
        href={project.href}
        className="sticky block no-underline group"
        style={{
          position: "sticky",
          top: `${STICKY_TOP}px`,
          zIndex: index + 1,
        }}
      >
        <div
          className="rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col overflow-hidden shadow-2xl"
          style={{
            backgroundColor: project.mainBg,
            height: `calc(100vh - ${STICKY_TOP + 24}px)`,
          }}
        >
          {/* Meta row: year + category */}
          <div className="flex items-center justify-between pb-4 sm:pb-5"
            style={{ borderBottom: `1px solid ${borderColor}` }}
          >
            <span
              className="text-sm sm:text-base font-light tracking-wide"
              style={{
                fontFamily: "var(--font-body)",
                color: metaColor,
              }}
            >
              {project.year}
            </span>
            <span
              className="text-sm sm:text-base font-light tracking-wide"
              style={{
                fontFamily: "var(--font-body)",
                color: metaColor,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title + arrow */}
          <div className="flex items-center justify-between pt-4 sm:pt-5 mb-5 sm:mb-6 md:mb-8">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight leading-none"
              style={{
                fontFamily: "var(--font-heading)",
                color: textColor,
              }}
            >
              {project.title}
            </h3>

            <motion.div
              className="shrink-0 ml-4"
              style={{ rotate: arrowRotate }}
            >
              <svg
                className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12"
                viewBox="0 0 24 24"
                fill="none"
                stroke={textColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.7 }}
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Image area — fills remaining space */}
          <div
            className="flex-1 w-full rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: project.imageBg,
              minHeight: 0,
            }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full max-h-full max-w-full object-contain"
              />
            ) : (
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(0,0,0,0.12)",
                }}
              >
                {project.title}
              </span>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-4 md:py-8">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        {projects.map((project, i) => (
          <StickyCard
            key={project.title}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
