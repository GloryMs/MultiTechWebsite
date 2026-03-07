# Multi Technology Company — Website

Modern, bilingual (Arabic/English) corporate website built with **Next.js 15**, **TailwindCSS 4**, **Express**, **PostgreSQL**, and **Strapi CMS**.

## Project Structure

```
multitech-website/
├── apps/
│   ├── web/          # Next.js 15 frontend (SSR/SSG, App Router)
│   ├── api/          # Express backend (contact forms, email, business logic)
│   └── cms/          # Strapi 5 CMS (headless, self-hosted)
├── docker-compose.yml
├── .env.example
└── package.json
```

## Quick Start

### Prerequisites
- Node.js v20+ (v24 recommended)
- Docker & Docker Compose
- pnpm (recommended) or npm

### 1. Clone & Install

```bash
git clone https://github.com/GloryMs/MultiTechWebsite.git
cd MultiTechWebsite

# Install frontend dependencies
cd apps/web && npm install && cd ../..

# Install API dependencies
cd apps/api && npm install && cd ../..
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your actual values (SMTP, reCAPTCHA keys, etc.)
```

### 3. Start Database & CMS

```bash
docker compose up -d
```

### 4. Run Development Servers

```bash
# Terminal 1 — Frontend (port 3000)
cd apps/web && npm run dev

# Terminal 2 — API (port 4000)
cd apps/api && npm run dev
```

### 5. Access

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:3000       |
| API       | http://localhost:4000       |
| Strapi    | http://localhost:1337/admin |
| Database  | localhost:5432              |

## Features

- **Bilingual**: Full Arabic (RTL) + English (LTR) support via `next-intl`
- **Design System**: Custom color palette, typography, and component library
- **Animations**: Scroll-triggered reveals, hover effects via Framer Motion
- **SEO**: Dynamic metadata, hreflang, structured data, sitemap
- **CMS**: All content managed through Strapi admin panel
- **Forms**: Rate-limited contact/inquiry forms with email notifications

## Development Phases

| Phase | Weeks  | Focus                        |
|-------|--------|------------------------------|
| 1     | 1–4    | Setup, design system, i18n   |
| 2     | 5–9    | All pages, CMS, API, blog    |
| 3     | 10–12  | SEO, performance, launch     |
| 4     | 13–14  | Post-launch monitoring       |

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, TailwindCSS 4, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL 16
- **CMS**: Strapi 5 (self-hosted)
- **Deployment**: Vercel (FE) + VPS (API/CMS)
