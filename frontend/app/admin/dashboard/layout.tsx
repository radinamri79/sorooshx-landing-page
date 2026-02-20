"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { verifyToken, logout } from "@/lib/api";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Blogs",
    href: "/admin/dashboard/blogs",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    label: "Projects",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    disabled: true,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    verifyToken().then((valid) => {
      if (!valid) router.replace("/admin/login");
      else setChecking(false);
    });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-6 h-6 border-2 border-[#6BA383] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-[260px] flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        style={{
          background: "rgba(255,255,255,0.02)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between h-16 px-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <Link href="/admin/dashboard" className="no-underline flex items-center gap-1">
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-heading)", color: "#fff" }}
            >
              codefi<span style={{ color: "#6BA383" }}>.</span>
            </span>
          </Link>
          <button
            className="lg:hidden bg-transparent border-none cursor-pointer p-1"
            onClick={() => setSidebarOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.disabled ? (
                <div
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm cursor-not-allowed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  {item.icon}
                  {item.label}
                  <span
                    className="ml-auto text-[10px] px-1.5 py-0.5 rounded"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.3)",
                    }}
                  >
                    soon
                  </span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm no-underline transition-all duration-150"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: isActive(item.href)
                      ? "rgba(107,163,131,0.08)"
                      : "transparent",
                    color: isActive(item.href)
                      ? "#6BA383"
                      : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm bg-transparent border-none cursor-pointer transition-all duration-150"
            style={{
              fontFamily: "var(--font-body)",
              color: "rgba(255,255,255,0.4)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#F87171";
              e.currentTarget.style.background = "rgba(239,68,68,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.4)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header
          className="sticky top-0 z-20 flex items-center h-16 px-4 sm:px-6 lg:px-8"
          style={{
            background: "rgba(0,0,0,0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden bg-transparent border-none cursor-pointer p-2 mr-3"
            onClick={() => setSidebarOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
              style={{
                background: "rgba(0,255,119,0.15)",
                color: "#00FF77",
                fontFamily: "var(--font-body)",
              }}
            >
              SX
            </div>
            <span
              className="text-sm hidden sm:inline"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              sorooshx
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
