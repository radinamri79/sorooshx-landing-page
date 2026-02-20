"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BlogForm from "@/components/BlogForm";
import { fetchBlogById, updateBlog, type ApiBlog } from "@/lib/api";

export default function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [blog, setBlog] = useState<ApiBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBlogById(Number(id))
      .then(setBlog)
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await updateBlog(Number(id), formData);
      router.push("/admin/dashboard/blogs");
    } catch (err) {
      alert(`Failed to update blog: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#00FF77] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p
          className="text-sm mb-4"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Blog not found
        </p>
        <Link
          href="/admin/dashboard/blogs"
          className="text-sm no-underline"
          style={{ color: "#00FF77", fontFamily: "var(--font-body)" }}
        >
          Back to blogs
        </Link>
      </div>
    );
  }

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
          Edit
        </span>
      </div>

      <h1
        className="text-2xl sm:text-3xl font-semibold mb-8"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Edit Blog
      </h1>

      <BlogForm
        initialData={{
          title: blog.title,
          author: blog.author,
          category_id: blog.category_id,
          color: blog.color,
          content: blog.content,
          description: blog.description,
          published: blog.published,
          image_url: blog.image_url,
        }}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
