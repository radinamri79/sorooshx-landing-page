const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/* ── Token helpers ── */
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
}

export function setToken(token: string) {
  localStorage.setItem("admin_token", token);
}

export function removeToken() {
  localStorage.removeItem("admin_token");
}

/* ── Auth headers ── */
function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/* ── Generic fetch wrapper ── */
async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    ...authHeaders(),
    ...(options.headers as Record<string, string> || {}),
  };

  // Don't set Content-Type for FormData (browser sets multipart boundary automatically)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  return fetch(url, { ...options, headers });
}

/* ── Auth ── */
export async function login(username: string, password: string) {
  const res = await apiFetch("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  setToken(data.token);
  return data;
}

export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await apiFetch("/api/auth/verify/", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
    const data = await res.json();
    return data.valid === true;
  } catch {
    return false;
  }
}

export function logout() {
  removeToken();
}

/* ── Blog types (matches Django API response) ── */
export interface ApiBlog {
  id: number;
  title: string;
  slug: string;
  author: string;
  author_href: string;
  category_name: string;
  category_slug: string;
  category_id: number | null;
  color: string;
  image: string | null;
  image_url: string | null;
  content: string;
  description: string;
  date: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/* ── Blog API ── */
export async function fetchBlogs(
  params: Record<string, string> = {}
): Promise<PaginatedResponse<ApiBlog>> {
  const query = new URLSearchParams(params).toString();
  const res = await apiFetch(`/api/blogs/${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlog | null> {
  const res = await apiFetch(`/api/blogs/by-slug/${encodeURIComponent(slug)}/`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function fetchBlogById(id: number): Promise<ApiBlog> {
  const res = await apiFetch(`/api/blogs/${id}/`);
  if (!res.ok) throw new Error("Failed to fetch blog");
  return res.json();
}

export async function createBlog(formData: FormData): Promise<ApiBlog> {
  const res = await apiFetch("/api/blogs/", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}

export async function updateBlog(
  id: number,
  formData: FormData
): Promise<ApiBlog> {
  const res = await apiFetch(`/api/blogs/${id}/`, {
    method: "PATCH",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}

export async function deleteBlog(id: number): Promise<void> {
  const res = await apiFetch(`/api/blogs/${id}/`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete blog");
}

/* ── Category API ── */
export async function fetchCategories(): Promise<ApiCategory[]> {
  const res = await apiFetch("/api/categories/");
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.results || data;
}

export async function createCategory(name: string): Promise<ApiCategory> {
  const res = await apiFetch("/api/categories/", {
    method: "POST",
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}
