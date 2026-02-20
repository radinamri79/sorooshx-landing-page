"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogForm from "@/components/BlogForm";
import { createBlog } from "@/lib/api";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await createBlog(formData);
      router.push("/admin/dashboard/blogs");
    } catch (err) {
      alert(`Failed to create blog: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/dashboard/blogs"
          className="text-xs no-underline transition-colors duration-150"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Blogs
        </Link>
        <span className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
          /
        </span>
        <span
          className="text-xs"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Create
        </span>
      </div>

      <h1
        className="text-2xl sm:text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Create New Blog
      </h1>

      <BlogForm
        onSubmit={handleSubmit}
        submitLabel="Create Blog"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
