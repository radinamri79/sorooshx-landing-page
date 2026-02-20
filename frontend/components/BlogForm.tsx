"use client";

import { useState, useEffect, useRef } from "react";
import { fetchCategories, createCategory, type ApiCategory } from "@/lib/api";

interface BlogFormData {
  title: string;
  author: string;
  category_id: number | null;
  color: string;
  tags: string[];
  content: string;
  description: string;
  published: boolean;
  image: File | null;
}

interface BlogFormProps {
  initialData?: Partial<BlogFormData> & { image_url?: string | null };
  onSubmit: (formData: FormData) => Promise<void>;
  submitLabel: string;
  isSubmitting: boolean;
}

export default function BlogForm({
  initialData,
  onSubmit,
  submitLabel,
  isSubmitting,
}: BlogFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "soroush osivand");
  const [categoryId, setCategoryId] = useState<number | null>(
    initialData?.category_id ?? null
  );
  const [color, setColor] = useState(initialData?.color || "#2563EB");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [content, setContent] = useState(initialData?.content || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [published, setPublished] = useState(initialData?.published ?? true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url || null
  );
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [showNewCategory, setShowNewCategory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const matte = {
    buttonGreen: "#6BA383",
    buttonGreenHover: "#5C9472",
    buttonSecondary: "rgba(255,255,255,0.06)",
    inputBg: "rgba(255,255,255,0.04)",
    inputBorder: "rgba(255,255,255,0.08)",
    inputFocus: "rgba(107,163,131,0.4)",
    labelText: "rgba(255,255,255,0.5)",
  };

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const cat = await createCategory(newCategory.trim());
      setCategories((prev) => [...prev, cat]);
      setCategoryId(cat.id);
      setNewCategory("");
      setShowNewCategory(false);
    } catch {
      alert("Failed to create category");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    if (categoryId) formData.append("category_id", String(categoryId));
    formData.append("color", color);
    formData.append("tags", JSON.stringify(tags));
    formData.append("content", content);
    formData.append("description", description);
    formData.append("published", String(published));
    if (imageFile) formData.append("image", imageFile);
    await onSubmit(formData);
  };

  const inputStyle = {
    fontFamily: "var(--font-body)",
    background: matte.inputBg,
    border: `1px solid ${matte.inputBorder}`,
    color: "#fff",
  };

  const labelStyle = {
    fontFamily: "var(--font-body)",
    color: matte.labelText,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title - Primary Focus */}
      <div>
        <label className="block text-xs font-medium mb-3" style={labelStyle}>
          Blog Title <span style={{ color: "#F87171" }}>*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3.5 rounded-lg text-sm outline-none transition-all duration-200"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = matte.inputFocus)}
          onBlur={(e) => (e.target.style.borderColor = matte.inputBorder)}
          placeholder="Enter an engaging blog title"
        />
      </div>

      {/* Author & Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium mb-3" style={labelStyle}>
            Author
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = matte.inputFocus)}
            onBlur={(e) => (e.target.style.borderColor = matte.inputBorder)}
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-3" style={labelStyle}>
            Category
          </label>
          {showNewCategory ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
                style={inputStyle}
                placeholder="New category"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategory();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-3.5 py-3 rounded-lg text-xs font-medium border-none cursor-pointer transition-all duration-200"
                style={{
                  background: matte.buttonGreen,
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowNewCategory(false)}
                className="px-3.5 py-3 rounded-lg text-xs font-medium border-none cursor-pointer"
                style={{
                  background: matte.buttonSecondary,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <select
                value={categoryId || ""}
                onChange={(e) =>
                  setCategoryId(e.target.value ? Number(e.target.value) : null)
                }
                className="flex-1 px-4 py-3 rounded-lg text-sm outline-none appearance-none cursor-pointer"
                style={inputStyle}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} style={{ background: "#111" }}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowNewCategory(true)}
                className="px-3.5 py-3 rounded-lg text-xs font-medium border-none cursor-pointer shrink-0"
                style={{
                  background: matte.buttonSecondary,
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "var(--font-body)",
                }}
                title="Add new category"
              >
                + New
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags Section - for admin organization */}
      <div>
        <label className="block text-xs font-medium mb-3" style={labelStyle}>
          Tags <span className="ml-1 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>(for organization)</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none transition-all duration-200"
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = matte.inputFocus)}
            onBlur={(e) => (e.target.style.borderColor = matte.inputBorder)}
            placeholder="Type a tag and press Enter or click Add"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2.5 rounded-lg text-xs font-medium border-none cursor-pointer transition-all duration-200"
            style={{
              background: matte.buttonGreen,
              color: "#fff",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = matte.buttonGreenHover)}
            onMouseLeave={(e) => (e.currentTarget.style.background = matte.buttonGreen)}
          >
            Add Tag
          </button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full text-xs flex items-center gap-2"
                style={{
                  background: "rgba(107,163,131,0.2)",
                  color: matte.buttonGreen,
                  fontFamily: "var(--font-body)",
                  border: `1px solid rgba(107,163,131,0.3)`,
                }}
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-xs border-none cursor-pointer bg-transparent p-0"
                  style={{ color: "inherit" }}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description - Secondary Focus */}
      <div>
        <label className="block text-xs font-medium mb-3" style={labelStyle}>
          Description <span className="ml-1 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>(excerpt for blog cards)</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y transition-all duration-200"
          style={inputStyle}
          onFocus={(e) => (e.target.style.borderColor = matte.inputFocus)}
          onBlur={(e) => (e.target.style.borderColor = matte.inputBorder)}
          placeholder="Brief excerpt (auto-generated from content if left blank)"
        />
      </div>

      {/* Content - Primary Focus */}
      <div>
        <label className="block text-xs font-medium mb-3" style={labelStyle}>
          Blog Body <span style={{ color: "#F87171" }}>*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={18}
          className="w-full px-4 py-3 rounded-lg text-sm outline-none resize-y transition-all duration-200"
          style={{
            ...inputStyle,
            lineHeight: 1.8,
          }}
          onFocus={(e) => (e.target.style.borderColor = matte.inputFocus)}
          onBlur={(e) => (e.target.style.borderColor = matte.inputBorder)}
          placeholder="Write your blog content here..."
        />
      </div>

      {/* Featured Image - Compact Section */}
      <div>
        <label className="block text-xs font-medium mb-3" style={labelStyle}>
          Featured Image <span className="ml-1 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>(optional • 1200×675px)</span>
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {imagePreview ? (
          <div className="space-y-2">
            <div
              className="w-full h-32 rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-lg text-xs border-none cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: matte.buttonSecondary,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                Replace
              </button>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="px-3 py-2 rounded-lg text-xs border-none cursor-pointer transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(239,68,68,0.1)",
                  color: "#F87171",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-32 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "2px dashed rgba(255,255,255,0.08)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `rgba(107,163,131,0.3)`;
              e.currentTarget.style.background = "rgba(107,163,131,0.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.35)",
              }}
            >
              Click to upload image
            </span>
          </button>
        )}
      </div>

      {/* Published toggle */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => setPublished(!published)}
          className="relative w-11 h-6 rounded-full border-none cursor-pointer transition-all duration-200"
          style={{
            background: published ? matte.buttonGreen : "rgba(255,255,255,0.1)",
          }}
        >
          <span
            className="absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200"
            style={{
              background: published ? "#fff" : "rgba(255,255,255,0.4)",
              left: published ? "calc(100% - 22px)" : "2px",
            }}
          />
        </button>
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: "var(--font-body)",
            color: published ? matte.buttonGreen : "rgba(255,255,255,0.4)",
          }}
        >
          {published ? "Published" : "Draft"}
        </span>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3.5 rounded-lg text-sm font-medium border-none cursor-pointer transition-all duration-200"
          style={{
            fontFamily: "var(--font-body)",
            background: isSubmitting ? `rgba(107,163,131,0.5)` : matte.buttonGreen,
            color: "#fff",
          }}
          onMouseEnter={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = matte.buttonGreenHover;
          }}
          onMouseLeave={(e) => {
            if (!isSubmitting) e.currentTarget.style.background = matte.buttonGreen;
          }}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </span>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
