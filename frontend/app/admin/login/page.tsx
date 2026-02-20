"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, verifyToken } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    verifyToken().then((valid) => {
      if (valid) router.replace("/admin/dashboard");
      else setChecking(false);
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-[#00FF77] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            codefi<span style={{ color: "#00FF77" }}>.</span>
          </h1>
          <p
            className="text-sm mt-2"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            admin panel
          </p>
        </div>

        {/* Login Card */}
        <div
          className="rounded-lg p-8"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2
            className="text-lg font-medium mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Sign in
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label
                className="block text-xs mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(107,163,131,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
                placeholder="Enter username"
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-xs mb-2"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(107,163,131,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
                placeholder="Enter password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div
                className="text-xs px-3 py-2 rounded-md"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  color: "#F87171",
                }}
              >
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: "var(--font-body)",
                background: loading ? "rgba(107,163,131,0.5)" : "#6BA383",
                color: "#fff",
                border: "none",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = "#5C9472";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = "#6BA383";
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p
          className="text-center text-xs mt-6"
          style={{
            fontFamily: "var(--font-body)",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          &copy; {new Date().getFullYear()} codefi. All rights reserved.
        </p>
      </div>
    </div>
  );
}
