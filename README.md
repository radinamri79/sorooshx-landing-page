# CODEFI Landing Page

A modern, high-performance landing page for CODEFI, a premium software engineering studio specializing in Web3, AI, and enterprise solutions. Built with Next.js 16, featuring dynamic content management, interactive animations, and a minimalist "coding mode" aesthetic.

---

## 🎯 Project Overview

The CODEFI landing page showcases the company's services, completed projects, blog content, and vision through an elegant, responsive experience. It's designed to attract enterprise clients and startups looking for cutting-edge engineering solutions.

**Live Demo:** [https://sorooshx-codefi.vercel.app/](https://sorooshx-codefi.vercel.app/)  
**GitHub Repository:** [radinamri79/sorooshx-codefi](https://github.com/radinamri79/sorooshx-codefi)

---

## ✨ Key Features

### 📄 Dynamic Content Pages
- **Home Page** – Hero section, sticky stacking card animation for projects, services grid with gradient dividers, about section, FAQ, and CTA
- **Blog System** – 32 sample blog posts with pagination (8 posts per page), dynamic routing, featured content layout
- **Project Detail Pages** – 4 detailed project showcases (sorooshx, doyo, bitvpn, coco-ai) with:
  - Hero section with project title and headline
  - Image + overview section
  - Problem statement and solution breakdown
  - Project metadata (industry, role, timeline, services)
  - Key metrics visualization
  - Technology stack showcase with gradient grid dividers
  - Related projects gallery with stacking scroll animation

### 🎨 Advanced Animations & Interactions
- **Stacking Scroll Animation** – Sticky cards that stack and scroll smoothly (Framer Motion)
- **Intersection Observer** – Content animates in as user scrolls into view
- **Smooth Transitions** – All interactions have polished motion cues
- **Hover Effects** – Interactive buttons with color and style transitions

### 🎭 Design System
- **Minimalist Aesthetic** – All text in lowercase for a "coding mode" feel
- **Gradient Faded Borders** – Section dividers with gradient lines that fade at edges
- **Section Titles on Lines** – Section labels positioned directly on gradient dividers with black backgrounds
- **Responsive Grid System** – Tailwind CSS v4 with mobile-first design
- **Custom Typography** – DM Mono (body) and Manrope (headings) for professional appearance

### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop
- Flexible grid layouts that adapt to screen size
- Touch-friendly navigation and interactive elements
- Proper viewport scaling and performance optimization

### ⚡ Performance Optimized
- **Static Generation** – 41 pages pre-rendered at build time
- **Image Optimization** – Automatic Next.js image optimization
- **Code Splitting** – Lazy loading of components and routes
- **Minimal Bundle Size** – Efficient CSS and JavaScript delivery

---

## 🛠 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js | 16.1.6 |
| **Build Tool** | Turbopack | Latest |
| **Styling** | Tailwind CSS | 4 |
| **Animation** | Framer Motion | Latest |
| **Viewport Detection** | react-intersection-observer | Latest |
| **Language** | TypeScript | 5+ |
| **Package Manager** | npm / yarn / pnpm | Latest |

---

## 📂 Project Structure

```
sorooshx-landing-page/
├── app/
│   ├── globals.css              # Global styles & Tailwind imports
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Home page (/)
│   ├── blog/
│   │   ├── page.tsx             # Blog listing with pagination
│   │   └── [slug]/              # Dynamic blog post routes
│   │       └── page.tsx
│   └── projects/
│       └── [slug]/              # Dynamic project detail routes
│           └── page.tsx
├── components/
│   ├── Header.tsx               # Fixed nav with scroll progress
│   ├── Hero.tsx                 # Hero section with animated words
│   ├── About.tsx                # About section with video placeholder
│   ├── Services.tsx             # Services grid with gradient dividers
│   ├── Projects.tsx             # Sticky stacking card animation
│   ├── FAQ.tsx                  # Accordion-style FAQ section
│   ├── CTA.tsx                  # Call-to-action section
│   ├── Footer.tsx               # Footer with social links
│   ├── ProjectGallery.tsx       # Related projects gallery
│   └── SectionDivider.tsx       # Reusable gradient divider component
├── data/
│   ├── blogPosts.ts             # 32 blog posts with metadata
│   └── projects.ts              # 4 projects with complete details
├── public/
│   └── [images, mockups, etc.]
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** – 18.x or higher
- **npm** – 9.x or higher (or yarn/pnpm)
- **Git** – for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/radinamri79/sorooshx-landing-page.git
   cd sorooshx-landing-page/sorooshx-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser. The app auto-reloads on file changes.

4. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

---

## 📖 Usage & Configuration

### Adding Blog Posts
Blog posts are stored in `data/blogPosts.ts`. Each post follows this structure:

```typescript
{
  slug: "unique-post-slug",
  title: "post title",
  excerpt: "brief preview text",
  content: "full markdown or html content",
  date: "2026-02-18",
  author: "author name",
  category: "category name"
}
```

Add new posts to the `allBlogPosts` array and the blog listing/routing will automatically recognize them.

### Adding Projects
Projects are managed in `data/projects.ts`. Each project includes:

```typescript
{
  slug: "project-slug",
  title: "project name",
  headline: "short headline",
  category: "project category",
  overview: "detailed overview",
  problem: "problem statement",
  solution: "solution description",
  meta: [{ label: "...", value: "..." }],
  metrics: [{ label: "...", value: "..." }],
  stack: [{ title: "...", description: "..." }],
  galleryColors: ["#FF6200", ...]
}
```

### Customizing Styling
- **Tailwind Config** – Edit `tailwind.config.ts` for colors, fonts, spacing
- **Global Styles** – Modify `app/globals.css` for theme variables and custom styles
- **Component Styles** – Update inline `style` objects or add Tailwind classes

### Navigation & Links
Update navigation items in `components/Header.tsx`:

```typescript
const navLinks = [
  { label: "projects", href: "/#projects" },
  { label: "services", href: "/#services" },
  // Add more links here
];
```

---

## 📊 Build & Deployment

### Development
```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Production Build
```bash
npm run build        # Build for production (creates .next folder)
npm run start        # Start production server
npm run build:analyze # Analyze bundle size (if configured)
```

### Static Export
To export as static HTML:
```bash
npm run build
npm run export       # Creates 'out' folder with static files
```

### Deployment Options

**Vercel (Recommended)**
```bash
npm install -g vercel
vercel
```
Vercel offers automatic deployments on git push, serverless functions, and edge caching.

**Other Platforms**
- **Netlify** – Connect GitHub repo, automatic deployments
- **AWS Amplify** – AWS ecosystem with scale
- **Docker** – Create custom Docker image for any host

---

## 🎨 Design Guidelines

### Color Palette
- **Primary Background** – `#000000` (black)
- **Accent Green** – `#00FF77` (bright green)
- **Orange** – `#FF6200` (project color)
- **Text** – `rgba(255, 255, 255, 0.7-0.95)` (white with transparency)

### Typography
- **Headings** – Manrope font family
- **Body** – DM Mono font family
- **Color Mode** – All text lowercase for "coding mode" aesthetic

### Spacing & Layout
- **Max Width** – 1200px for main content container
- **Padding** – `px-4 sm:px-6 md:px-10` for responsive gutters
- **Grid Layout** – 2-column on desktop, 1-column on mobile

### Border & Dividers
- **Gradient Borders** – Use `linear-gradient(to right, transparent, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent)`
- **Section Dividers** – Labels positioned on lines with `backgroundColor: "#000"` for overlay effect

---

## 🔧 Advanced Configuration

### Environment Variables
Create `.env.local` for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=https://api.example.com
```

### TypeScript Configuration
TypeScript strict mode is enabled. Ensure all components have proper type definitions.

### Performance Tips
- Keep components under 100 lines when possible
- Use `React.memo()` for expensive components
- Optimize images with Next.js Image component
- Lazy load non-critical content with `dynamic()`

---

## 📐 Component Reference

### Key Components

**Header.tsx**
- Fixed navigation with scroll progress indicator
- Mobile hamburger menu
- Smooth scroll to sections

**Hero.tsx**
- Animated hero section with word rotation
- Call-to-action button

**Projects.tsx**
- Sticky stacking card animation
- Displays all projects from data

**Services.tsx**
- 2-column grid with gradient dividers
- Section title on divider line

**ProjectGallery.tsx**
- Reuses stacking animation from home
- Shows related projects for current detail page

**SectionDivider.tsx** (Pattern)
- Gradient line with centered label
- Used across all section breaks

---

## 🚦 Static Page Generation

The app generates **41 static pages** at build time:
- **1** Home page
- **1** Blog listing page
- **32** Dynamic blog post pages
- **4** Dynamic project detail pages
- **1** 404 page
- **1** Not found page

All pages are pre-rendered and served as static HTML for optimal performance.

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Check and fix type issues
npm run type-check
```

### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run dev  # Auto-rebuilds on file changes
```

---

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs) – Official framework docs
- [Tailwind CSS](https://tailwindcss.com/docs) – Styling framework
- [Framer Motion](https://www.framer.com/motion/) – Animation library
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) – Type system

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Code Style**
- Use TypeScript for all components
- Follow Tailwind CSS conventions
- Keep components focused and reusable
- Add comments for complex logic

---

## 📄 License

This project is proprietary and maintained by CODEFI. For licensing inquiries, contact the team.

---

## 👥 Team & Support

**Project Maintained By:** CODEFI Engineering Team  
**Email:** [contact information]  
**Website:** [company website]  

For issues, feature requests, or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Contact the team directly

---

## 🎯 Roadmap

Future enhancements planned:
- [ ] Multi-language support (i18n)
- [ ] Dark/light theme toggle
- [ ] Client testimonials section
- [ ] Case study videos
- [ ] Integration with CMS (Contentful, Notion)
- [ ] Email subscription functionality
- [ ] Analytics dashboard
- [ ] SEO optimization enhancements

---

**Last Updated:** February 18, 2026  
**Latest Version:** 1.0.0  
**Built with ❤️ by CODEFI**
