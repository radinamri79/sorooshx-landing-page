"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { allProjects, type Project } from "@/data/projects";

const STICKY_TOP = 90;
const CARD_COUNT = allProjects.length;

/* ─── Individual stacked card ─── */
function StackedCard({
  project,
  index,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  /*
   * Scroll-linked slide animation:
   *  - Card 0: always visible, no slide
   *  - Card i (i≥1): slides up from below (translateY 100% → 0%)
   *
   * The section scroll is divided so each card gets a "reading" phase
   * and a "slide-in" phase for the next card:
   *   Card 1 slides in during scrollYProgress [0.167 → 0.333]
   *   Card 2 slides in during scrollYProgress [0.500 → 0.667]
   *   Card 3 slides in during scrollYProgress [0.833 → 1.000]
   */
  const sectionStart = index === 0 ? 0 : (index - 1) / (CARD_COUNT - 1);
  const sectionEnd = index === 0 ? 0 : index / (CARD_COUNT - 1);
  const animStart = index === 0 ? 0 : (sectionStart + sectionEnd) / 2;
  const animEnd = index === 0 ? 0 : sectionEnd;

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [animStart, animEnd],
    index === 0 ? ["0%", "0%"] : ["100%", "0%"]
  );

  /*
   * Scale-down effect: when the NEXT card slides in, the current card
   * scales down slightly (1 → 0.95) creating a depth/parallax feel.
   * The last card never scales down.
   */
  const nextAnimStart =
    index < CARD_COUNT - 1
      ? ((index + index + 1) / (CARD_COUNT - 1)) / 2 // midpoint of next card's section
      : 1;
  const nextAnimEnd =
    index < CARD_COUNT - 1 ? (index + 1) / (CARD_COUNT - 1) : 1;

  const scale = useTransform(
    scrollYProgress,
    index < CARD_COUNT - 1 ? [nextAnimStart, nextAnimEnd] : [0, 1],
    index < CARD_COUNT - 1 ? [1, 0.95] : [1, 1]
  );

  /* Arrow rotation: rotates from → to ↗ during the card's reading phase */
  const arrowStart = index === 0 ? 0 : animEnd;
  const arrowEnd = index === 0 ? 0.08 : Math.min(animEnd + 0.08, 1);
  const arrowRotate = useTransform(scrollYProgress, [arrowStart, arrowEnd], [0, -45]);

  const textColor = project.darkText ? "#000000" : "#ffffff";
  const metaColor = project.darkText ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)";
  const borderColor = project.darkText ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)";

  return (
    <motion.div
      className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
      style={{ y, scale, zIndex: index + 1 }}
    >
      <Link href={`/projects/${project.slug}`} className="block no-underline h-full">
        <div
          className="h-full flex flex-col"
          style={{ backgroundColor: project.mainBg }}
        >
          {/* Meta row: year + category */}
          <div
            className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-4 sm:pb-5"
          >
            <span
              className="text-sm sm:text-base font-light tracking-wide"
              style={{ fontFamily: "var(--font-body)", color: metaColor }}
            >
              {project.year}
            </span>
            <span
              className="text-sm sm:text-base font-light tracking-wide"
              style={{ fontFamily: "var(--font-body)", color: metaColor }}
            >
              {project.category}
            </span>
          </div>

          {/* Full-width border */}
          <div style={{ borderBottom: `1px solid ${borderColor}` }} />

          {/* Title + arrow */}
          <div className="flex items-center justify-between px-6 sm:px-8 md:px-10 lg:px-12 pt-4 sm:pt-5 mb-5 sm:mb-6 md:mb-8">
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold tracking-tight leading-none"
              style={{ fontFamily: "var(--font-heading)", color: textColor }}
            >
              {project.title}
            </h3>

            <motion.div className="shrink-0 ml-4" style={{ rotate: arrowRotate }}>
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                viewBox="0 0 24 24"
                fill="none"
                stroke={textColor}
                strokeWidth="2"
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
            className="flex-1 w-full px-6 sm:px-8 md:px-10 lg:px-12 pb-6 sm:pb-8 md:pb-10 lg:pb-12"
            style={{ minHeight: 0 }}
          >
            <div
              className="w-full h-full rounded-lg sm:rounded-xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: project.imageBg }}
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
                  style={{ fontFamily: "var(--font-body)", color: "rgba(0,0,0,0.12)" }}
                >
                  {project.title}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Projects section ─── */
export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full"
      style={{ height: `${CARD_COUNT * 100}vh` }}
    >
      <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 h-full">
        {/* Sticky container — stays pinned as user scrolls through the tall section */}
        <div
          style={{
            position: "sticky",
            top: `${STICKY_TOP}px`,
            height: `calc(100vh - ${STICKY_TOP + 24}px)`,
          }}
        >
          {/* All cards stacked; overflow-hidden clips cards below the container */}
          <div className="relative w-full h-full overflow-hidden rounded-2xl">
            {allProjects.map((project, i) => (
              <StackedCard
                key={project.title}
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
