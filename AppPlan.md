
MULTI TECHNOLOGY COMPANY
www.multitech.com.sa
Website Replacement Project
Comprehensive Development Plan
Prepared: March 2026
Stack: Next.js + TailwindCSS + Node.js/Express + PostgreSQL + Strapi CMS
Bilingual: Arabic (RTL) + English (LTR)
 
Table of Contents
1. Executive Summary
2. Current Website Analysis
3. Technology Stack Decision
4. Project Architecture
5. Development Environment Setup
6. Project Structure
7. Bilingual (Ar/En) Implementation Strategy
8. UI/UX Design System
9. Page-by-Page Blueprint
10. Backend API Design
11. CMS Content Modeling (Strapi)
12. SEO & Analytics Integration
13. Deployment Strategy
14. Development Phases & Timeline
15. Development Commands Reference

 
1. Executive Summary
This document outlines the complete plan for replacing the current Multitech website (built on Zoho Sites) with a modern, high-performance, bilingual web application. The new website will be built from scratch using industry-leading technologies to deliver a world-class digital experience that reflects Multitech's position as a leading Telecom and IT company in Saudi Arabia.

Objective: Replace the existing template-based Zoho site with a custom-built, blazing-fast, SEO-optimized, bilingual (Arabic/English) website with a stunning visual identity.
Timeline: 12–14 weeks (3 phases)
Key Deliverables: Fully responsive website, CMS-powered content, RTL/LTR language support, analytics dashboard, CI/CD pipeline.
 
2. Current Website Analysis
The current site at multitech.com.sa is hosted on Zoho Sites. After reviewing the live website, the following observations and gaps have been identified:

2.1 Current Site Structure
Page	Description
Home	Hero video, about blurb, services overview, contact form
About Us	Company history (est. 2004), vision/mission, team overview
Services	Telecom & IT service listings (GSM, IBS, FTT, OSP, etc.)
Partners & Solutions	Technology partner logos and descriptions
Projects & References	Past project portfolio and client references
Media	Project photos gallery
Security Solutions	Security service offerings (CCTV, Access Control, etc.)
Contact Us	Contact form, email addresses, working hours

2.2 Identified Gaps
•	Generic template design with no brand personality or visual distinction
•	Minimal animations and interactions — static feel throughout
•	Arabic translation exists but RTL layout is poorly implemented
•	No structured CMS — content is hardcoded in Zoho page builder
•	No blog or news section for SEO content marketing
•	No structured data / schema markup for search engines
•	Contact form uses basic Zoho form with no backend integration
•	Media gallery is basic with no filtering, categorization, or lightbox
•	Missing career page, FAQ, and client testimonials sections
•	No performance optimization (lazy loading, image optimization, caching)

 
3. Technology Stack Decision
3.1 Full Stack Overview
Layer	Technology	Justification
Frontend	Next.js 15 + TypeScript	SSR/SSG, App Router, built-in i18n, Image optimization
Styling	TailwindCSS 4 + Framer Motion	Utility-first CSS, RTL plugin, performant animations
Backend API	Node.js + Express	RESTful API for contact forms, inquiries, custom logic
Database	PostgreSQL 16	Reliable, JSON support, full-text search for Ar/En
CMS	Strapi 5 (self-hosted)	See detailed comparison below
Analytics	GA4 + Search Console	Traffic insights, Core Web Vitals monitoring
Deployment	Vercel (FE) + Railway/VPS (BE)	Edge network, auto-scaling, zero-config deploys

3.2 CMS Decision: Strapi vs Sanity
After evaluating both CMS options against the project requirements, Strapi 5 is the recommended choice. Here is the comparison:

Criteria	Strapi 5	Sanity
Hosting	Self-hosted (full control)	Cloud-hosted (vendor lock-in)
i18n Support	Built-in plugin, field-level	Manual with document variants
Cost	Free/Open Source	Free tier limited, then paid
Database	PostgreSQL (shared DB)	Proprietary data store
Admin Panel	Full UI out of the box	Must build with Sanity Studio
API	REST + GraphQL built-in	GROQ query language
Media Library	Built-in with upload	Built-in CDN
Learning Curve	Lower (familiar REST/SQL)	Higher (GROQ, schemas)
Data Sovereignty	Your server, your data (KSA)	Data stored in Sanity cloud

Verdict: Strapi 5 wins for this project because: (1) Built-in i18n plugin makes Arabic/English content management seamless at the field level. (2) Self-hosting on a KSA-based server ensures data sovereignty compliance. (3) Uses your existing PostgreSQL stack—no separate data store needed. (4) Open source with no vendor lock-in or usage-based pricing. (5) REST API integrates naturally with Next.js ISR/SSG.
 
4. Project Architecture
The system follows a decoupled, three-tier architecture with clear separation of concerns:

Architecture Flow
[Browser] → [Next.js Frontend on Vercel/VPS] → [Node.js/Express API] → [PostgreSQL DB]
                                                                          → [Strapi CMS (headless)]  → [PostgreSQL DB]

•	Next.js Frontend: Server-side rendered pages, static generation for marketing pages, API routes for lightweight server logic. Fetches content from Strapi at build time (ISR) and calls Express API for dynamic operations.
•	Node.js/Express Backend: Handles contact form submissions, inquiry management, email notifications (via Nodemailer/SendGrid), and any custom business logic not suited for the CMS.
•	Strapi CMS: Content authors manage all website content (pages, services, projects, partners, media, blog posts) through Strapi’s admin panel. All content is stored with Arabic and English translations.
•	PostgreSQL: Single database instance shared by both Strapi and Express. Strapi manages its own tables; Express uses separate schema/tables for contact submissions, analytics events, etc.
 
5. Development Environment Setup
Below is the complete setup guide for your development machine. You already have VS Code, Node.js v24.13.0, and Docker Engine installed.

5.1 Prerequisites Verification
Open a terminal and verify your existing tools:

node --version          # Should show v24.13.0
npm --version           # Should show 10.x+
docker --version        # Should show 27.x+
docker compose version  # Should show v2.x+

5.2 Additional Tools to Install

Tool	Install Command	Purpose
pnpm	npm install -g pnpm	Fast, disk-efficient package manager (recommended over npm for monorepo)
Git	Download from git-scm.com	Version control (if not already installed)
PostgreSQL Client	Via Docker (see below)	Database will run in Docker container
TablePlus / pgAdmin	Download from website	GUI database client for inspecting data (optional)

5.3 VS Code Extensions (Required)
1.	ESLint — Code linting for TypeScript/JavaScript
2.	Prettier — Code formatting
3.	Tailwind CSS IntelliSense — Autocomplete for Tailwind classes
4.	PostCSS Language Support — Required for TailwindCSS 4
5.	i18n Ally — Visual inline translation management
6.	Prisma (if using Prisma ORM) or PostgreSQL Explorer
7.	Thunder Client or REST Client — API testing within VS Code
8.	Docker Extension — Container management from sidebar
9.	Arabic Language Pack — Helps validate RTL content

5.4 Docker Compose Setup (Database + Strapi)
Create a docker-compose.yml at the project root to run PostgreSQL and Strapi locally:

# docker-compose.yml
version: '3.9'
services:
  postgres:
    image: postgres:16-alpine
    container_name: multitech-db
    environment:
      POSTGRES_DB: multitech
      POSTGRES_USER: multitech_user
      POSTGRES_PASSWORD: multitech_secret_2026
    ports: ['5432:5432']
    volumes: ['pgdata:/var/lib/postgresql/data']

  strapi:
    build: ./apps/cms
    container_name: multitech-cms
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: multitech
      DATABASE_USERNAME: multitech_user
      DATABASE_PASSWORD: multitech_secret_2026
    ports: ['1337:1337']
    depends_on: [postgres]

volumes:
  pgdata:

5.5 Project Initialization Commands
Run these commands in order to scaffold the entire project:

# 1. Create project root
mkdir multitech-website && cd multitech-website
git init
pnpm init

# 2. Create Next.js frontend
npx create-next-app@latest apps/web --typescript --tailwind --eslint --app --src-dir

# 3. Install frontend dependencies
cd apps/web
pnpm add next-intl framer-motion @tailwindcss/typography
pnpm add -D tailwindcss-rtl
cd ../..

# 4. Create Strapi CMS
npx create-strapi-app@latest apps/cms --quickstart --no-run

# 5. Create Express backend
mkdir -p apps/api/src
cd apps/api
pnpm init
pnpm add express cors helmet dotenv pg nodemailer
pnpm add -D typescript @types/express @types/node @types/cors @types/nodemailer tsx
cd ../..

# 6. Start infrastructure
docker compose up -d
 
6. Project Structure
The project uses a monorepo layout with three applications sharing common configuration:

multitech-website/
  apps/
    web/                          # Next.js Frontend
      src/
        app/
          [locale]/               # Dynamic locale route (ar/en)
            layout.tsx            # Root layout with RTL/LTR switch
            page.tsx              # Home page
            about/page.tsx
            services/page.tsx
            projects/page.tsx
            partners/page.tsx
            media/page.tsx
            contact/page.tsx
            blog/page.tsx         # NEW: Blog listing
            blog/[slug]/page.tsx  # NEW: Blog post
            careers/page.tsx      # NEW: Careers
        components/
          layout/                 # Navbar, Footer, LanguageSwitcher
          ui/                     # Buttons, Cards, Modals, etc.
          sections/               # Hero, Services, Testimonials, etc.
        lib/                      # API clients, utilities
        messages/                 # Translation JSON files
          ar.json
          en.json
        styles/                   # Global CSS, fonts
    api/                           # Express Backend
      src/
        routes/                   # contact.ts, inquiry.ts
        middleware/               # validation, rateLimiter
        services/                 # emailService.ts
        db/                       # migrations, pool config
        index.ts                  # Express entry point
    cms/                           # Strapi CMS
      src/api/                    # Content types
      config/                     # Strapi config (database, i18n)
  docker-compose.yml
  .env.example
  pnpm-workspace.yaml
 
7. Bilingual (Ar/En) Implementation Strategy
Full Arabic/English support is a first-class requirement, not an afterthought. The implementation touches every layer of the stack.

7.1 URL Structure
Locale-prefixed routing using Next.js App Router middleware:
•	English: multitech.com.sa/en/services
•	Arabic: multitech.com.sa/ar/services
•	Default: Redirect root (/) to /ar (primary audience is Saudi Arabia)

7.2 Frontend i18n with next-intl
•	All UI strings stored in messages/ar.json and messages/en.json
•	next-intl middleware detects locale from URL and sets direction
•	Dynamic content (CMS) fetched with ?locale=ar or ?locale=en from Strapi
•	Language switcher component in navbar preserves current page path

7.3 RTL/LTR Layout Strategy
•	Root layout.tsx sets <html lang='ar' dir='rtl'> or <html lang='en' dir='ltr'> dynamically
•	TailwindCSS RTL plugin: Use rtl: and ltr: variants (e.g., rtl:mr-4 ltr:ml-4)
•	Logical CSS properties preferred: Use ps-4/pe-4 (padding-inline-start/end) instead of pl-4/pr-4
•	Fonts: IBM Plex Sans Arabic for Arabic, Inter or DM Sans for English
•	All icons with directional meaning (arrows, chevrons) flip in RTL mode

7.4 Strapi i18n Configuration
•	Enable @strapi/plugin-i18n (included by default in Strapi 5)
•	Set default locale to 'ar' (Arabic), add 'en' (English) as additional locale
•	All content types marked as internationalized — editors toggle locale in admin panel
•	API requests include locale parameter: GET /api/services?locale=ar
 
8. UI/UX Design System
The design system defines every visual and interactive element to ensure a cohesive, premium experience across the entire website.

8.1 Design Philosophy
Aesthetic Direction: Modern Corporate Premium — Clean lines, confident typography, strategic use of negative space, with subtle geometric accents inspired by Islamic geometric patterns as a nod to Saudi heritage.
Differentiator: Interactive micro-animations on scroll, parallax service cards, and a dynamic particle-mesh hero background that conveys technological sophistication.

8.2 Color Palette
Name	Hex	Usage	Tailwind Token
Deep Navy	#0A1628	Primary brand, headers, nav	brand-primary
Electric Teal	#00D4AA	CTAs, accents, active states	brand-accent
Warm Gold	#D4A843	Premium highlights, badges	brand-gold
Cloud White	#F8FAFC	Backgrounds, cards	brand-bg
Slate Gray	#64748B	Body text, secondary	brand-text
Signal Red	#EF4444	Errors, alerts only	brand-error

8.3 Typography
Role	English Font	Arabic Font	Weight
Display/H1	Space Grotesk	IBM Plex Sans Arabic	700 Bold
Headings	DM Sans	IBM Plex Sans Arabic	600 Semi-bold
Body	DM Sans	IBM Plex Sans Arabic	400 Regular
Code/Data	JetBrains Mono	JetBrains Mono	400 Regular

8.4 Component Library
All components will be built as reusable React components with full RTL support:
•	Button (primary, secondary, outline, ghost variants; loading state; icon support)
•	Card (service card, project card, partner card with hover animations)
•	Navigation (sticky header, mobile hamburger with slide-in drawer, locale toggle)
•	Hero Section (full-width particle mesh canvas + animated text reveal)
•	Section Wrapper (consistent padding, scroll-triggered entrance animations)
•	Modal/Dialog (accessible, trap focus, close on ESC)
•	Form components (Input, TextArea, Select with validation and Arabic placeholders)
•	Image Gallery (masonry grid with lightbox, lazy-loaded via Next Image)
•	Testimonial Carousel (auto-play, swipe-enabled, RTL-aware)
•	Stats Counter (animated number count-up on scroll into view)
•	Footer (mega-footer with sitemap, social links, newsletter signup)
 
9. Page-by-Page Blueprint

9.1 Home Page
10.	Hero Section: Full-viewport particle-mesh canvas background, animated headline typewriter effect, primary CTA button with pulse animation
11.	About Preview: Split layout — left: company photo with geometric frame, right: condensed about text with ‘Learn More’ link
12.	Services Grid: 6 service cards in 3x2 grid with icon, title, brief description. Hover: card lifts with shadow + accent border reveal
13.	Stats Bar: Full-width accent strip with 4 animated counters (Years in Business, Projects Completed, Clients Served, Engineers on Team)
14.	Partners Carousel: Logo ticker of technology partners with infinite horizontal scroll
15.	Featured Projects: 3 project spotlight cards with overlay image, title, category tag
16.	Testimonials: Rotating testimonial cards with client photo, quote, company name
17.	CTA Banner: Full-width gradient section with bold heading and contact button
18.	Footer: Multi-column mega-footer with sitemap, contact info, social links

9.2 About Page
19.	Page Hero: Branded banner with page title and breadcrumb
20.	Company Story: Timeline component showing milestones from 2004 to present
21.	Vision & Mission: Two-card layout with icon headers
22.	Core Values: Icon grid (Reliability, Customer-Centricity, Continuous Improvement, Innovation)
23.	Team/Leadership: Photo cards with name, role, brief bio (if applicable)
24.	Certifications: Grid of certification badges and accreditation logos

9.3 Services Page
25.	Services Overview: Hero banner with animated text
26.	Service Categories: Tabbed or accordion layout for major categories (Network Infrastructure, GSM/IBS, Managed Services, Security Solutions, etc.)
27.	Each Service: Detailed section with icon, description, key features list, relevant project links
28.	Process Section: 5-step horizontal stepper showing Multitech’s engagement model (Survey → Design → Implement → Optimize → Handover)
29.	CTA: Contact form or inquiry button

9.4 Projects & References Page
30.	Filter Bar: Category filter pills (by service type, year, client industry)
31.	Project Grid: Masonry layout with project cards (image, title, category, client)
32.	Project Detail Modal/Page: Full case study with challenge, solution, results, gallery

9.5 Partners & Solutions Page
33.	Partner Tier Layout: Grouped by partnership level (Strategic, Technology, Solution)
34.	Partner Cards: Logo, company name, description, partnership type badge
35.	Solutions Matrix: Table/grid mapping partner solutions to Multitech capabilities

9.6 Media Gallery Page
36.	Category Tabs: Filter by project type or event
37.	Masonry Image Grid: Responsive, lazy-loaded with lightbox on click
38.	Video Section: Embedded video player for project showcase videos

9.7 Contact Page
39.	Contact Form: Name, Email, Phone, Subject, Message with validation (Arabic + English)
40.	Office Location: Embedded Google Map with custom marker
41.	Contact Details: Email, phone, working hours, address
42.	Quick Links: WhatsApp chat button, direct email links

9.8 Blog (NEW)
43.	Blog Listing: Card grid with featured image, title, excerpt, date, category tag
44.	Blog Post: Clean reading layout, TOC sidebar, social share buttons, related posts
45.	Category/Tag pages for SEO

9.9 Careers (NEW)
46.	Open Positions: Filterable list with role, department, location
47.	Company Culture: Photo collage + employee testimonials
48.	Application Form: Resume upload, cover letter, basic info
 
10. Backend API Design (Express)
The Express backend handles operations that don’t belong in the CMS: form submissions, email dispatch, and any custom business logic.

Method	Endpoint	Purpose	Auth
POST	/api/contact	Submit contact form	Rate limited, CAPTCHA
POST	/api/inquiry	Service inquiry	Rate limited, CAPTCHA
POST	/api/careers/apply	Job application	Rate limited, file upload
GET	/api/health	Health check	Public
POST	/api/newsletter	Newsletter signup	Rate limited

10.1 Key Middleware
•	Rate Limiter: express-rate-limit (15 requests per 15 min per IP for forms)
•	CORS: Whitelist multitech.com.sa and localhost origins
•	Helmet: Security headers (CSP, HSTS, X-Frame-Options)
•	Input Validation: express-validator with bilingual error messages
•	CAPTCHA: Google reCAPTCHA v3 verification

10.2 Email Service
•	Nodemailer with SMTP (or SendGrid) for transactional emails
•	Contact form: Send confirmation to user + notification to admin@multitech.com.sa
•	Templates: HTML email templates with Arabic/English variants
 
11. CMS Content Modeling (Strapi)
All content types below are internationalized (Ar/En). Editors manage content through Strapi’s admin panel.

Content Type	Key Fields	Relations
Page	title, slug, seo_title, seo_description,
hero_image, content (Rich Text)	—
Service	title, slug, icon, short_desc, full_desc,
features (repeatable), process_steps	has many Projects
Project	title, slug, client, year, category,
challenge, solution, results, gallery	belongs to Service
Partner	name, logo, description, website_url,
tier (Strategic/Technology/Solution)	—
Blog Post	title, slug, excerpt, body (Rich Text),
featured_image, author, category, tags, published_at	has one Author
Team Member	name, role, photo, bio, order	—
Testimonial	client_name, company, quote, photo, rating	—
Job Opening	title, department, location, type,
description, requirements, is_active	—
Media Item	title, category, image/video, caption	belongs to Project
Global Settings	site_name, logo, contact_info,
social_links, working_hours, footer_text	Single Type
 
12. SEO & Analytics Integration

12.1 Technical SEO
•	Next.js Metadata API: Dynamic title, description, og:image per page from CMS
•	Structured Data: Organization, LocalBusiness, Service, Article schema (JSON-LD)
•	Sitemap: Auto-generated sitemap.xml via next-sitemap with both /ar and /en URLs
•	Robots.txt: Allow all crawlers, point to sitemap
•	Canonical URLs: Proper hreflang tags linking Arabic and English page variants
•	Image Optimization: Next/Image with WebP auto-conversion, lazy loading, srcset
•	Core Web Vitals: Target LCP < 2.5s, FID < 100ms, CLS < 0.1

12.2 Google Analytics 4 Setup
•	Install GA4 tag via next/script with afterInteractive strategy
•	Track: Page views, form submissions, language switches, CTA clicks, scroll depth
•	Custom events: contact_form_submit, service_inquiry, career_application
•	Consent banner for GDPR-style compliance (Saudi PDPL considerations)

12.3 Google Search Console
•	Verify domain ownership via DNS TXT record
•	Submit sitemaps for /ar and /en
•	Monitor indexing, coverage, Core Web Vitals, and search queries
•	Set up URL inspection for key pages after launch
 
13. Deployment Strategy

Component	Platform	Domain	Notes
Next.js Frontend	Vercel or VPS	multitech.com.sa	Edge CDN, ISR enabled
Express API	Railway / VPS	api.multitech.com.sa	Auto-scaling, SSL
Strapi CMS	VPS (2GB+ RAM)	cms.multitech.com.sa	Admin panel access
PostgreSQL	VPS / Managed DB	Internal only	Daily backups

13.1 CI/CD Pipeline
•	GitHub Actions workflow: Lint → Test → Build → Deploy on push to main
•	Preview deployments on pull requests (Vercel automatic previews)
•	Environment variables managed via Vercel/Railway dashboards
•	Database migrations run automatically on deploy

13.2 DNS & SSL
•	Cloudflare DNS for multitech.com.sa (free tier)
•	SSL certificates via Let’s Encrypt (auto-renewed)
•	Subdomains: cms.multitech.com.sa, api.multitech.com.sa
 
14. Development Phases & Timeline

Phase	Duration	Key Deliverables	Milestone
Phase 1	Weeks 1–4	Setup & Foundation:
- Dev environment + Docker
- Next.js + Strapi scaffold
- Design system + components
- RTL/LTR infrastructure
- i18n setup (next-intl)	Component library + running CMS
Phase 2	Weeks 5–9	Core Development:
- All page implementations
- CMS content modeling
- Express API endpoints
- Contact/inquiry forms
- Media gallery + lightbox
- Blog system	Feature-complete website
Phase 3	Weeks 10–12	Polish & Launch:
- Arabic content entry
- SEO optimization
- Performance tuning
- GA4 + Search Console
- Cross-browser/device testing
- CI/CD + deployment
- DNS migration	Production launch
Phase 4	Weeks 13–14	Post-Launch:
- Monitor analytics
- Fix edge-case bugs
- Content editor training
- Documentation handoff	Stable operation
 
15. Development Commands Reference
Quick reference for daily development workflow:

Command	Purpose
docker compose up -d	Start PostgreSQL + Strapi containers
cd apps/web && pnpm dev	Start Next.js dev server (port 3000)
cd apps/api && pnpm dev	Start Express dev server (port 4000)
docker compose logs -f strapi	Watch Strapi CMS logs
cd apps/web && pnpm build	Production build of frontend
cd apps/web && pnpm lint	Run ESLint + TypeScript checks
docker compose down	Stop all containers
docker compose down -v	Stop containers + delete DB volume


End of Project Plan
Ready to build something exceptional.
