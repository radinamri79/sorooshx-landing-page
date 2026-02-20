"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchBlogs, type PaginatedResponse, type ApiBlog } from "@/lib/api";

export default function DashboardPage() {
  const [blogCount, setBlogCount] = useState<number | null>(null);

  useEffect(() => {
    fetchBlogs({ page_size: "1" })
      .then((data: PaginatedResponse<ApiBlog>) => setBlogCount(data.count))
      .catch(() => setBlogCount(0));
  }, []);

  const cards = [
    {
      title: "Blogs",
      count: blogCount,
      href: "/admin/dashboard/blogs",
      color: "#6BA383",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
    },
    {
      title: "Projects",
      count: null,
      href: "#",
      color: "rgba(255,255,255,0.15)",
      disabled: true,
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* Page title */}
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Dashboard
        </h1>
        <p
          className="text-sm mt-1"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Manage your website content
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => {
          const sharedStyle = {
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
          };

          const content = (
            <>
              <div className="flex items-center justify-between mb-4">
                <div style={{ color: card.color }}>{card.icon}</div>
                {card.disabled && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.3)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    coming soon
                  </span>
                )}
              </div>
              <p
                className="text-sm mb-1"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {card.title}
              </p>
              <p
                className="text-3xl font-semibold"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: card.disabled ? "rgba(255,255,255,0.2)" : "#fff",
                }}
              >
                {card.count !== null ? card.count : "—"}
              </p>
            </>
          );

          if (card.disabled) {
            return (
              <div
                key={card.title}
                className="rounded-lg p-6 cursor-not-allowed opacity-40"
                style={sharedStyle}
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={card.title}
              href={card.href}
              className="rounded-lg p-6 no-underline transition-all duration-200"
              style={sharedStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(107,163,131,0.2)";
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              }}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
