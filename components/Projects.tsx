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
    image: "/iMockup - iPhone 15 Pro Max.png",
  },
  {
    year: "2025",
    category: "AI Agent",
    title: "doyo",
    href: "#",
    mainBg: "#FFDD00",
    imageBg: "#FFC300",
    image: "/Doyo.png",
  },
  {
    year: "2020",
    category: "Decentralized VPN",
    title: "bitvpn",
    href: "#",
    mainBg: "#1F00FF",
    imageBg: "#FFFFFF",
  },
  {
    year: "2026",
    category: "Smart Financial AI",
    title: "coco ai",
    href: "#",
    mainBg: "#FF003B",
    imageBg: "#FFFFFF",
  },
];

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
    offset: ["start end", "start start"],
  });
  // Arrow starts pointing right (0°), rotates to 45° up-right when card reaches top
  const arrowRotate = useTransform(scrollYProgress, [0, 1], [0, -45]);

  // Each card sticks slightly lower to peek above previous
  const stickyTop = 83 + index * 10;

  // Dark text for light backgrounds (doyo yellow)
  const isDark = project.mainBg === "#FFDD00";
  const textColor = isDark ? "#000000" : "#ffffff";
  const metaColor = isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
  const strokeColor = isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";

  return (
    <div
      ref={cardRef}
      style={{ height: "100vh", zIndex: index + 1, position: "relative" }}
    >
      <motion.a
        href={project.href}
        className="group block w-full cursor-pointer"
        style={{
          position: "sticky",
          top: `${stickyTop}px`,
          textDecoration: "none",
        }}
      >
        <div
          className="rounded-2xl p-8 md:p-12 overflow-hidden"
          style={{
            backgroundColor: project.mainBg,
            height: `calc(100vh - ${stickyTop + 20}px)`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Meta row */}
          <div className="flex items-center justify-between mb-4">
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 300,
                color: metaColor,
              }}
            >
              {project.year}
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 300,
                color: metaColor,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Title + arrow */}
          <div className="flex items-center justify-between mb-6">
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 600,
                color: textColor,
                letterSpacing: "-0.5px",
                lineHeight: 1.1,
              }}
            >
              {project.title}
            </h3>

            <motion.div
              className="flex-shrink-0 ml-4"
              style={{ rotate: arrowRotate }}
            >
              {/* Arrow pointing right → */}
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              >
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>

          {/* Image area */}
          <div
            className="flex-1 w-full rounded-xl overflow-hidden relative flex items-center justify-center"
            style={{
              backgroundColor: project.imageBg,
              minHeight: 0,
            }}
          >
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="h-full object-contain"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  color: "rgba(0,0,0,0.15)",
                }}
              >
                {project.title}
              </span>
            )}
          </div>
        </div>
      </motion.a>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-4 md:py-8">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
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
