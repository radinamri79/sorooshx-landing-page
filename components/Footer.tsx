"use client";

/* Social links ordered by SEO importance for AI & Web3/exchange projects */
const socialLinks = [
  { label: "linkedin", href: "https://linkedin.com/", color: "rgba(255,255,255,0.5)" },
  { label: "x(twitter)", href: "https://twitter.com/", color: "rgba(255,255,255,0.5)" },
  { label: "youtube", href: "https://youtube.com/", color: "rgba(255,255,255,0.5)" },
  { label: "telegram", href: "https://telegram.org/", color: "rgba(255,255,255,0.5)" },
  { label: "instagram", href: "https://instagram.com/", color: "rgba(255,255,255,0.5)" },
  { label: "playstore", href: "#", color: "rgba(255,255,255,0.5)" },
  { label: "appstore", href: "#", color: "rgba(255,255,255,0.5)" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 md:py-10">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <span
            className="text-xs sm:text-sm font-light text-white/35"
            style={{ fontFamily: "var(--font-body)" }}
          >
            2026 &copy; based in canada. serving global innovators.
          </span>

          {/* Social links — text only */}
          <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-5 gap-y-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-light no-underline transition-colors duration-300 hover:underline"
                style={{
                  fontFamily: "var(--font-body)",
                  color: link.color,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
