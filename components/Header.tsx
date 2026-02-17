"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const navLinks = [
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/#services" },
  { label: "blog", href: "/blog" },
  { label: "about", href: "/#about" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      if (pathname !== "/") {
        window.location.href = href;
      } else {
        const el = document.querySelector(href.slice(1));
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/10 backdrop-blur-xs"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[83px] max-w-[1200px] items-center justify-between px-4 sm:px-6 md:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-0 no-underline"
        >
          <span
            style={{ fontFamily: "var(--font-heading)" }}
            className="text-white text-[18px] font-semibold tracking-tight"
          >
            codefi
          </span>
          <span className="text-[#00FF77] text-[18px] font-semibold">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) =>
            link.href.startsWith("/#") ? (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="border-none bg-transparent p-0 cursor-pointer"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "-0.4px",
                  lineHeight: "28px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="no-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "-0.4px",
                  lineHeight: "28px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#ffffff")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                {link.label}
              </Link>
            )
          )}

          {/* Contact CTA */}
          <button
            onClick={() => scrollTo("/#contact")}
            className="border-none bg-transparent p-0 cursor-pointer"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "16px",
              fontWeight: 400,
              color: "#00FF77",
              letterSpacing: "-0.4px",
              lineHeight: "28px",
              transition: "text-decoration 0.3s",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            contact
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden border-none bg-transparent p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-white transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.href)}
                    className="border-none bg-transparent p-0 cursor-pointer text-left"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "24px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="no-underline"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "24px",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.7)",
                      letterSpacing: "-0.4px",
                    }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <button
                onClick={() => scrollTo("/#contact")}
                className="border-none bg-transparent p-0 cursor-pointer text-left"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "24px",
                  fontWeight: 400,
                  color: "#FF6200",
                  letterSpacing: "-0.4px",
                }}
              >
                contact
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: "0%" }}
        className="absolute bottom-0 left-6 md:left-40 right-6 md:right-40 h-[1px] bg-white"
      />
    </header>
  );
}
