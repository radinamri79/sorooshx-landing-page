"use client";

import { useState } from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import {
  allPosts,
  POSTS_PER_PAGE,
  TOTAL_PAGES,
  type BlogPost,
} from "@/data/blogPosts";

/* ─── Blog card ─── */
function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="no-underline block">
      <article className="flex flex-col">
        {/* Image placeholder */}
        <div
          className="w-full aspect-[4/3] rounded-sm flex items-center justify-center mb-4"
          style={{ backgroundColor: post.color }}
        >
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover rounded-sm"
            />
          ) : (
            <span
              className="text-base text-black/30"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {"<img src=\"\"/>"}
            </span>
          )}
        </div>

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="text-base sm:text-lg md:text-xl font-light leading-snug"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.85)" }}
          >
            {post.title}
          </h3>
          <svg
            className="w-5 h-5 mt-1 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Meta: date - by author  category */}
        <div
          className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span style={{ color: "#00FF77" }}>{post.date}</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>-</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>by</span>
          <span className="underline" style={{ color: "#00FF77" }}>
            {post.author}
          </span>
          <span className="underline" style={{ color: "#00FF77" }}>
            {post.category}
          </span>
        </div>
      </article>
    </Link>
  );
}

/* ─── Featured (first) post — full width ─── */
function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="no-underline block">
      <article className="mb-10 sm:mb-14">
        {/* Image placeholder */}
        <div
          className="w-full aspect-[16/9] rounded-sm flex items-center justify-center mb-5"
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
              {"<img src=\"\"/>"}
            </span>
          )}
        </div>

        {/* Title + arrow */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light leading-snug"
            style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.85)" }}
          >
            {post.title}
          </h2>
          <svg
            className="w-6 h-6 sm:w-8 sm:h-8 mt-1 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Meta */}
        <div
          className="flex flex-wrap items-center gap-x-2 text-xs sm:text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <span style={{ color: "#00FF77" }}>{post.date}</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>-</span>
          <span style={{ color: "rgba(255,255,255,0.35)" }}>by</span>
          <span className="underline" style={{ color: "#00FF77" }}>
            {post.author}
          </span>
          <span className="underline" style={{ color: "#00FF77" }}>
            {post.category}
          </span>
        </div>
      </article>
    </Link>
  );
}

/* ─── Pagination ─── */
function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 py-16 sm:py-20">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="border-none bg-transparent p-0 cursor-pointer text-xl sm:text-2xl md:text-3xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: page === currentPage ? 700 : 300,
            fontStyle: page === currentPage ? "italic" : "normal",
            color: page === currentPage ? "#00FF77" : "rgba(255,255,255,0.4)",
            transition: "color 0.2s",
          }}
        >
          {page}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="border-none bg-transparent p-0 cursor-pointer text-xl sm:text-2xl md:text-3xl"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 300,
            color: "rgba(255,255,255,0.4)",
            transition: "color 0.2s",
          }}
        >
          {">"}
        </button>
      )}
    </div>
  );
}

/* ─── Blog page ─── */
export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const featured = allPosts[0];
  const gridPosts = allPosts.slice(1);
  const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = gridPosts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-[100px] pb-6 sm:pb-8">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
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
            <span className="mx-2" style={{ color: "rgba(255,255,255,0.25)" }}>
              /
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>blog</span>
          </nav>
        </div>
      </div>

      {/* Featured post */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <FeaturedPost post={featured} />
      </section>

      {/* Blog grid — 2 columns */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-14">
          {pagePosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
        />
      </section>

      {/* CTA — same as home page */}
      <CTA />
    </>
  );
}
