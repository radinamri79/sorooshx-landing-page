"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  fetchBlogs,
  deleteBlog,
  type ApiBlog,
  type PaginatedResponse,
} from "@/lib/api";

export default function BlogsListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<ApiBlog[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<ApiBlog | null>(null);
  const pageSize = 10;

  const loadBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        page: String(page),
        page_size: String(pageSize),
      };
      if (search) params.search = search;
      const data: PaginatedResponse<ApiBlog> = await fetchBlogs(params);
      setBlogs(data.results);
      setTotalCount(data.count);
    } catch {
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  // Debounced search
  useEffect(() => {
    setPage(1);
  }, [search]);

  const handleDelete = async () => {
    if (!showDeleteModal) return;
    setDeleting(showDeleteModal.id);
    try {
      await deleteBlog(showDeleteModal.id);
      setShowDeleteModal(null);
      loadBlogs();
    } catch {
      alert("Failed to delete blog");
    } finally {
      setDeleting(null);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Blogs
          </h1>
          <p
            className="text-sm mt-1"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {totalCount} blog{totalCount !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/dashboard/blogs/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium no-underline transition-all duration-200"
          style={{
            fontFamily: "var(--font-body)",
            background: "#6BA383",
            color: "#fff",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#5C9472")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#6BA383")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Blog
        </Link>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs by title, author, or content..."
            className="w-full pl-11 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              fontFamily: "var(--font-body)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#fff",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(107,163,131,0.4)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
          />
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-lg overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-6 h-6 border-2 border-[#00FF77] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <p
              className="text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              {search ? "No blogs found matching your search" : "No blogs yet. Create your first one!"}
            </p>
          </div>
        ) : (
          <>
            {/* Table header (desktop) */}
            <div
              className="hidden md:grid gap-4 px-5 py-3 text-xs"
              style={{
                gridTemplateColumns: "2fr 1fr 1fr 0.8fr 100px",
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.35)",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span>Title</span>
              <span>Author</span>
              <span>Category</span>
              <span>Date</span>
              <span className="text-right">Actions</span>
            </div>

            {/* Rows */}
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="grid md:grid-cols-[2fr_1fr_1fr_0.8fr_100px] gap-2 md:gap-4 px-5 py-4 items-center transition-colors duration-150"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {/* Title */}
                <div className="flex items-center gap-3 min-w-0">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt=""
                      className="w-10 h-10 rounded object-cover shrink-0 hidden sm:block"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded shrink-0 hidden sm:block"
                      style={{ background: blog.color }}
                    />
                  )}
                  <div className="min-w-0">
                    <p
                      className="text-sm truncate"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "rgba(255,255,255,0.85)",
                      }}
                    >
                      {blog.title}
                    </p>
                    <div className="flex items-center gap-2 md:hidden">
                      <span
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-body)" }}
                      >
                        {blog.author} · {blog.category_name} · {blog.date}
                      </span>
                    </div>
                  </div>
                  {!blog.published && (
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded shrink-0"
                      style={{
                        background: "rgba(251,191,36,0.15)",
                        color: "#FBBF24",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      draft
                    </span>
                  )}
                </div>

                {/* Author */}
                <span
                  className="text-sm hidden md:block truncate"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  {blog.author}
                </span>

                {/* Category */}
                <span
                  className="text-xs px-2 py-1 rounded-full hidden md:inline-block self-center max-w-fit"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "rgba(0,255,119,0.08)",
                    color: "#00FF77",
                  }}
                >
                  {blog.category_name}
                </span>

                {/* Date */}
                <span
                  className="text-xs hidden md:block"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {blog.date}
                </span>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1">
                  <button
                    onClick={() => router.push(`/admin/dashboard/blogs/${blog.id}/edit`)}
                    className="p-2 rounded-md bg-transparent border-none cursor-pointer transition-colors duration-150"
                    title="Edit"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00FF77";
                      e.currentTarget.style.background = "rgba(0,255,119,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(blog)}
                    className="p-2 rounded-md bg-transparent border-none cursor-pointer transition-colors duration-150"
                    title="Delete"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#F87171";
                      e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 rounded-md text-xs border-none cursor-pointer transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                fontFamily: "var(--font-body)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1.5 rounded-md text-xs border-none cursor-pointer transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                fontFamily: "var(--font-body)",
                background: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-[400px] rounded-lg p-6"
            style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h3
              className="text-lg font-medium mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Delete Blog
            </h3>
            <p
              className="text-sm mb-6"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Are you sure you want to delete <strong style={{ color: "rgba(255,255,255,0.85)" }}>&quot;{showDeleteModal.title}&quot;</strong>? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-4 py-2 rounded-md text-sm border-none cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting !== null}
                className="px-4 py-2 rounded-md text-sm border-none cursor-pointer transition-all duration-150"
                style={{
                  fontFamily: "var(--font-body)",
                  background: deleting ? "rgba(239,68,68,0.3)" : "rgba(239,68,68,0.15)",
                  color: "#F87171",
                }}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
