import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  getOtherProjects,
} from "@/data/projects";
import CTA from "@/components/CTA";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

/* ─── Section divider with label ─── */
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="pt-14 sm:pt-20 pb-8 sm:pb-12">
      <div className="relative flex items-center justify-center">
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
          {label}
        </span>
      </div>
    </div>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return notFound();

  const otherProjects = getOtherProjects(slug);

  return (
    <>
      {/* ─── Hero: title + project url button ─── */}
      <section className="w-full pt-[100px] pb-2 sm:pb-4">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          {/* Project name label */}
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6 sm:mb-8"
            style={{ fontFamily: "var(--font-heading)", color: "#ffffff" }}
          >
            {project.title}
          </h2>

          {/* Headline */}
          <h1
            className="text-lg sm:text-xl md:text-2xl font-light leading-snug mb-8 sm:mb-10"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            {project.headline}
          </h1>

          {/* Project URL button — hover: white bg, black text */}
          <a
            href={project.projectUrl}
            className="inline-flex items-center justify-center no-underline transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 400,
              height: "48px",
              padding: "14px 48px",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              backgroundColor: "transparent",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            project url
          </a>
        </div>
      </section>

      {/* ─── Overview: image + text ─── */}
      <section className="w-full mt-10 sm:mt-14">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
          <div
            className="rounded-sm overflow-hidden"
            style={{ backgroundColor: project.mainBg }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Image side */}
              <div className="flex items-end justify-center pt-10 sm:pt-14 px-6 sm:px-10">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full max-w-[380px] object-contain"
                  />
                ) : (
                  <div
                    className="w-full aspect-[9/16] max-w-[300px] rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: project.imageBg }}
                  >
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(0,0,0,0.12)",
                      }}
                    >
                      {project.title}
                    </span>
                  </div>
                )}
              </div>

              {/* Text side */}
              <div className="flex flex-col justify-center px-6 sm:px-10 py-10 sm:py-14">
                <h3
                  className="text-base sm:text-lg font-medium mb-6 text-center"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: project.darkText
                      ? "rgba(0,0,0,0.8)"
                      : "rgba(255,255,255,0.8)",
                  }}
                >
                  overview
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: project.darkText
                      ? "rgba(0,0,0,0.75)"
                      : "rgba(255,255,255,0.75)",
                    lineHeight: "1.8",
                  }}
                >
                  {project.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Problem ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="problem" />
        <div className="max-w-[800px] mx-auto text-center pb-4">
          <p
            className="text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.8",
            }}
          >
            <span className="font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>
              the challenge:{" "}
            </span>
            {project.problem}
          </p>
        </div>
      </section>

      {/* ─── Solution ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="solution" />
        <div className="max-w-[800px] mx-auto text-center pb-4">
          <p
            className="text-sm sm:text-base"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: "1.8",
            }}
          >
            <span className="font-semibold" style={{ color: "rgba(255,255,255,0.95)" }}>
              the codefi solution:{" "}
            </span>
            {project.solution}
          </p>
        </div>
      </section>

      {/* ─── Meta Data ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="meta data" />
        <div className="max-w-[800px] mx-auto space-y-6 sm:space-y-8 pb-4">
          {project.meta.map((item) => (
            <div
              key={item.label}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
            >
              <span
                className="text-sm font-semibold shrink-0 sm:w-[120px]"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {item.label}
              </span>
              <span
                className="text-sm"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Metrics ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="metrics" />
        <div className="grid grid-cols-2 gap-8 sm:gap-12 max-w-[800px] mx-auto pb-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="text-center">
              <p
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "#00FF77",
                }}
              >
                {m.value}
              </p>
              <p
                className="text-xs sm:text-sm whitespace-pre-line"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Stack (gradient borders) ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="stack" />
        <div className="grid grid-cols-1 sm:grid-cols-2 max-w-[800px] mx-auto pb-4">
          {project.stack.map((s, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const totalRows = Math.ceil(project.stack.length / 2);
            return (
              <div key={s.title} className="relative p-6 sm:p-8 text-center">
                {/* Top border */}
                {row > 0 && (
                  <span
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
                    }}
                  />
                )}
                {/* Right border — left column only on sm+ */}
                {col === 0 && (
                  <span
                    className="hidden sm:block absolute top-0 bottom-0 right-0 w-[1px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)",
                    }}
                  />
                )}
                <h4
                  className="text-base sm:text-lg font-semibold mb-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  {s.title}
                </h4>
                <p
                  className="text-xs sm:text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: "1.8",
                  }}
                >
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Gallery (stacked card scroll — same as home) ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <SectionDivider label="gallery" />
      </section>
      <ProjectGallery projects={otherProjects} />

      {/* CTA */}
      <CTA />
    </>
  );
}
