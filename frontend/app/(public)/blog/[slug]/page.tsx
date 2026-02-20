import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/data/blogPosts";
import CTA from "@/components/CTA";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

async function fetchApiBlog(slug: string) {
  try {
    const res = await fetch(`${API_BASE}/api/blogs/by-slug/${encodeURIComponent(slug)}/`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try API first, then fall back to static
  const apiBlog = await fetchApiBlog(slug);
  const staticPost = getPostBySlug(slug);

  const post = apiBlog
    ? {
        title: apiBlog.title,
        date: apiBlog.date,
        author: apiBlog.author,
        authorHref: apiBlog.author_href || "#",
        category: apiBlog.category_name,
        categoryHref: "#",
        image: apiBlog.image_url,
        content: apiBlog.content,
      }
    : staticPost
    ? {
        title: staticPost.title,
        date: staticPost.date,
        author: staticPost.author,
        authorHref: staticPost.authorHref,
        category: staticPost.category,
        categoryHref: staticPost.categoryHref,
        image: staticPost.image,
        content: staticPost.content,
      }
    : null;

  if (!post) return notFound();

  /* Split content into paragraphs & render */
  const paragraphs = post.content.split("\n\n");

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-[100px] pb-6 sm:pb-8">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10">
          <nav
            className="text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <Link
              href="/"
              className="no-underline"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              home
            </Link>
            <span
              className="mx-2"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              /
            </span>
            <Link
              href="/blog"
              className="no-underline"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              blog
            </Link>
            <span
              className="mx-2"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              /
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Post title */}
      <section className="w-full">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 pb-6 sm:pb-8">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-snug"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {post.title}
        </h1>
        </div>
      </section>

      {/* Featured image */}
      <section className="w-full">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 pb-6 sm:pb-8">
          <div
            className="w-full aspect-[16/9] rounded-sm flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            {post.image ? (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-sm"
              />
            ) : (
              <span
                className="text-base text-white/20"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {'<img src=""/>'}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Divider + Meta */}
      <section className="w-full">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 pb-10 sm:pb-14">
          <hr
            className="border-0 mb-4"
            style={{
              height: "1px",
              backgroundColor: "rgba(255,255,255,0.1)",
            }}
          />
          <div
            className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span style={{ color: "#00FF77" }}>{post.date}</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>-</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>by</span>
            <a
              href={post.authorHref}
              className="underline"
              style={{ color: "#00FF77" }}
            >
              {post.author}
            </a>
            <a
              href={post.categoryHref}
              className="underline"
              style={{ color: "#00FF77" }}
            >
              {post.category}
            </a>
          </div>
        </div>
      </section>

      {/* Blog content */}
      <article className="w-full">
        <div className="mx-auto max-w-[1200px] 2xl:max-w-[1600px] px-4 sm:px-6 md:px-10 pb-16 sm:pb-24">
          <div
            className="max-w-none space-y-6"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.8,
            }}
          >
          {paragraphs.map((p: string, i: number) => {
            const trimmed = p.trim();
            if (!trimmed) return null;

            /* Detect heading-like lines (short, no period, title-case) */
            const isHeading =
              trimmed.length < 100 &&
              !trimmed.endsWith(".") &&
              !trimmed.startsWith("•") &&
              /^[\dA-Z]/.test(trimmed);

            /* Detect bullet-point blocks */
            if (trimmed.startsWith("•")) {
              const bullets = trimmed.split("\n").filter((l) => l.trim());
              return (
                <ul
                  key={i}
                  className="list-disc pl-5 space-y-2 text-sm sm:text-base"
                >
                  {bullets.map((b, j) => (
                    <li key={j}>{b.replace(/^•\s*/, "")}</li>
                  ))}
                </ul>
              );
            }

            if (isHeading) {
              return (
                <h3
                  key={i}
                  className="text-base sm:text-lg font-medium pt-4"
                  style={{ color: "rgba(255,255,255,0.95)" }}
                >
                  {trimmed}
                </h3>
              );
            }

            return (
              <p key={i} className="text-sm sm:text-base">
                {trimmed}
              </p>
            );
          })}
        </div>
        </div>
      </article>

      {/* CTA */}
      <CTA />
    </>
  );
}
