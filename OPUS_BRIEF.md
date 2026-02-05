## Context for Opus

- **Project**: Local SEO & lead-gen website for false ceiling / gypsum work contractor.
- **Brand**: `Design & Decor`
- **Current domain**: `https://karnallocal.in`
- **Tech stack**: Static HTML + Tailwind via CDN + a little vanilla JS (no framework, no backend).
- **Primary goals**:
  - Generate **WhatsApp and call leads** for false ceiling work.
  - Rank for **location + service** keywords (e.g. “false ceiling Kurukshetra”, “false ceiling Ambala”).
  - Maintain a **blog** and **design gallery** for SEO + trust.

User explicitly cares about:
- Being able to **update images, blog posts, and content** easily.
- Maintaining and improving **SEO** and **lead generation**.
- Having a clear **HLD + route map** of how things work.
- Keeping **domain changes easy** (currently using `karnallocal.in`, but may change later).

---

## High-Level Architecture

- **Static site**, no build system:
  - HTML files in project root and some subfolders (`ambala/`, `kurukshetra/`, `panipat/`, `assandh/`).
  - Tailwind CSS loaded via CDN and configured inline with `tailwind.config` in each page.
  - Typography via Google Fonts (`Inter`).
  - Limited, page-specific JavaScript (no bundler).
- **Assets**:
  - Many images served directly from **Unsplash CDN** via query params (`w=800&q=80`).
  - A growing set of **local images** under `images/` with a naming and optimization strategy:
    - `images/` contains nested folders, e.g. `images/false-ceiling-latest-modern-bedroom-2026/...`.
    - There are helper docs: `IMAGE_NAMING_GUIDE.md`, `IMAGE_OPTIMIZATION_CHECKLIST.md`, and `image-filename-mapping.json`.
- **Data / config files**:
  - `blog-index.json` – index of blog posts (title, slug, category, image, tags, etc.).
  - `sitemap.xml` – hand-maintained sitemap, now aligned with `karnallocal.in`.
  - `robots.txt` & `llms.txt` – crawler & LLM hints.
  - `HLD.md` – large high-level design and operational guide, already quite detailed.
  - Several integration docs (Search Console, DNS, visitor counter).

### Behavioural Overview

- **Homepage** (`/index.html`):
  - Hero with WhatsApp + call CTAs.
  - Service tiles linking to detailed service pages.
  - Design highlights linking to `designs.html`.
  - Portfolio section linking to `portfolio.html`.
  - Contact section with:
    - Contact card (WhatsApp + tel links).
    - Simple contact form wired for Formspree (requires actual Formspree ID).
  - Sticky mobile bottom bar with **Call** + **WhatsApp**.
  - Schema: `LocalBusiness` JSON-LD for `Design & Decor` with Karnal as HQ.

- **Design Gallery** (`/designs.html`):
  - Grid of 100+ design images (mostly Unsplash now, local images starting to be used).
  - Lightbox-style overlay for viewing images large.
  - Basic filters are planned in HLD; may or may not be fully implemented yet.

- **Blog system**:
  - **Listing**: `/blog.html`
    - Tailwind-styled layout.
    - JS in `js/blog.js`:
      - Fetches `blog-index.json`.
      - Renders cards (image, category, read time, excerpt).
      - Filter buttons by `category`.
  - **Detail pages**: `/blog/{slug}.html` under `blog/` folder.
    - At least one fully implemented: `false-ceiling-design-trends-2026.html`.
    - `blog-index.json` has more entries than there are HTML files → some slugs are missing pages.
  - HLD includes **Mermaid sequence diagram** for the blog load flow.

- **Service pages (Karnal)**:
  - `false-ceiling-karnal.html`
  - `gypsum-partition-karnal.html`
  - `pop-ceiling-karnal.html`
  - `wall-paneling-karnal.html`
  - Each is a long, SEO-focused landing page with:
    - Tailored copy (definitions, benefits, types, pricing, FAQs).
    - Repeated CTAs: WhatsApp links with prefilled text + telephone links.
    - Schema: `LocalBusiness` JSON-LD with `areaServed` = `Karnal`, etc.

- **Location overview pages**:
  - `karnal.html`, `delhi.html`, `gurgaon.html`.
  - Plus **folder-based** pages: `panipat/index.html`, `assandh/index.html`, `kurukshetra/index.html`, `ambala/index.html`.
  - These are more “city hub” style (general pitch for that city, sometimes with their own hero and content).

- **Location-specific service pages** (flat files):
  - `false-ceiling-ambala.html`
  - `false-ceiling-assandh.html`
  - `false-ceiling-gurugram.html`
  - `false-ceiling-panipat.html`
  - `false-ceiling-kurukshetra.html` (recently added, based off the Karnal false-ceiling page).
  - All follow a consistent pattern:
    - City-specific H1 (“Best False Ceiling Contractor in {City}”).
    - City-specific FAQ, pricing note, and locality names.
    - WhatsApp links with prefilled “false ceiling work in {City}” text.
    - Canonical tags are present on some (e.g. Ambala) and should be normalized.

---

## Current URL & Route Map (from `sitemap.xml` + code)

**Domain**: `https://karnallocal.in`

### Core pages

- `/` → `index.html`
- `/designs.html`
- `/blog.html`
- `/portfolio.html`

### Karnal service pages

- `/false-ceiling-karnal.html`
- `/gypsum-partition-karnal.html`
- `/pop-ceiling-karnal.html`
- `/wall-paneling-karnal.html`

### City overview pages

- `/karnal.html`
- `/delhi.html`
- `/gurgaon.html`
- `/panipat/` → `panipat/index.html`
- `/assandh/` → `assandh/index.html`
- `/kurukshetra/` → `kurukshetra/index.html`
- `/ambala/` → `ambala/index.html`

### Location-specific “false ceiling” landers

- `/false-ceiling-ambala.html`
- `/false-ceiling-assandh.html`
- `/false-ceiling-gurugram.html`
- `/false-ceiling-panipat.html`
- `/false-ceiling-kurukshetra.html`

### Blog

- `/blog.html` – listing page
- `/blog/false-ceiling-design-trends-2026.html` – implemented
- Additional entries exist in `blog-index.json` (e.g. gypsum vs POP, price guide) but corresponding HTML pages are missing.

---

## SEO & Schema Setup

### Global / shared patterns

- **Meta tags**:
  - Descriptive `<title>` and `<meta name="description">` per page.
  - Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`) present on key pages.
  - Some location pages add `<link rel="canonical">` (e.g. Ambala, Kurukshetra city page).
- **Robots & Sitemap**:
  - `robots.txt`:
    - Allows all crawlers.
    - Explicitly whitelists a bunch of AI-specific bots.
    - Points to `https://karnallocal.in/sitemap.xml`.
  - `sitemap.xml`:
    - Includes all main, service, city, and location-specific service pages.
    - Uses `lastmod`, `changefreq`, and `priority`.
- **Structured data**:
  - `LocalBusiness` JSON-LD on homepage and many service/location pages.
  - `ImageGallery` JSON-LD on `designs.html`.
  - `BlogPosting` JSON-LD pattern described in `BLOG_TEMPLATE.md` and `HLD.md` for new blog posts (not always implemented yet).

### Domain handling

- Domain is now **consistently `karnallocal.in`** in:
  - `index.html` (`og:url`, canonical on Kurukshetra page, etc.).
  - `sitemap.xml`.
  - HLD examples.
- HLD has a **Domain Configuration** section:
  - To change domain later, user will `Find: karnallocal.in` → replace with new domain.

---

## Lead Generation Flows (User’s priority)

### WhatsApp

- Primary CTA across the site.
- Implemented as:
  - Direct links: `https://wa.me/919355510817?text=...` with page-specific, prefilled messages.
  - A more advanced **WhatsApp modal form** on the homepage:
    - Collects `location`, `property type`, `room size`.
    - On submit, builds a formatted message and opens WhatsApp.
  - Mobile sticky bottom bar for quick WhatsApp tap.

### Phone

- `tel:+919355510817` links in header, hero, CTA sections, and sticky bottom bar on many pages.

### Contact form

- Simple form in `index.html`:
  - Points to Formspree (placeholder `YOUR_FORM_ID` – needs a real ID).
  - Fields: name, phone, service, message.
  - HLD specifies best practices and an event tracking flow.

### Analytics & tracking

- HLD suggests GA4 and event tracking for:
  - `whatsapp_click`
  - `form_submit`
  - `blog_view`
  - `portfolio_filter`
- These scripts are **not fully wired yet**, but patterns are defined.

---

## Content Management Model

### Blog

- Source of truth: `blog-index.json`:
  - Fields: `id` (slug), `title`, `excerpt`, `author`, `date`, `category`, `readTime`, `image`, `tags[]`.
- `js/blog.js`:
  - Fetches `blog-index.json`.
  - Renders cards dynamically.
  - Provides **category filtering** via `.category-btn` elements.
- For each blog entry in `blog-index.json`, there should be:
  - One HTML file in `blog/{id}.html`.
  - Corresponding `BlogPosting` schema.
- Currently:
  - At least 1 post implemented (`false-ceiling-design-trends-2026`).
  - Others exist in JSON only (e.g. pricing, gypsum vs POP) → 404 for their detail pages.

### Images

- Two strategies are in use:
  1. **Unsplash CDN**:
     - Quick to use, but not ideal long-term (licensing/control).
     - Parameters like `?w=800&q=80` used widely.
  2. **Local images**:
     - Structured under `images/` with naming/optimization guidelines.
     - There is a JSON mapping file that can be used to:
       - Map logical names (e.g. `false-ceiling-modern-bedroom`) to actual filenames/paths.
       - Potentially generate `<img>` tags or `<picture>` sets.
- There are explicit docs:
  - `IMAGE_NAMING_GUIDE.md`
  - `IMAGE_OPTIMIZATION_CHECKLIST.md`
  - `image-filename-mapping.json`

### Location / service pages

- General **pattern is consistent**:
  - City name appears in:
    - `<title>`, `<meta description>`.
    - Main `h1`.
    - Pricing note text.
    - FAQ text.
    - WhatsApp prefilled message and CTA copy.
    - Schema `addressLocality` and `areaServed`.
- This makes these pages good candidates for:
  - **Templating**: single source + per-city config.
  - Automatic generation for new cities.

---

## Known Issues / Cleanup Opportunities

1. **Duplication & inconsistency in location pages**
   - For some cities there are **two concepts**:
     - City overview page under a folder: e.g. `/kurukshetra/index.html`, `/ambala/index.html`.
     - Specific service lander: e.g. `/false-ceiling-kurukshetra.html`, `/false-ceiling-ambala.html`.
   - Canonicals & internal links should be made consistent:
     - Decide which is primary:
       - `/kurukshetra/` vs `/false-ceiling-kurukshetra.html`.
       - `/ambala/` vs `/false-ceiling-ambala.html`.
     - Align canonical tags, nav links, and sitemap priorities.

2. **Blog detail pages missing**
   - `blog-index.json` has entries whose HTML pages do not yet exist.
   - HLD and `BLOG_TEMPLATE.md` describe what those HTML pages should look like.

3. **Formspree not fully configured**
   - Real `Formspree` endpoint missing (`YOUR_FORM_ID` placeholder).
   - No client-side success/failure UX improvements yet.

4. **Analytics not wired**
   - GA4 tags and events are defined in HLD, but not systematically added to pages.

5. **Domain change ergonomics**
   - HLD documents the search-and-replace approach for domain changes.
   - Code still has hardcoded domain references in:
     - Canonicals.
     - `og:url` on some pages.
     - `sitemap.xml`.
   - Could benefit from a small **build/templating step** or central config file to avoid manual edits.

6. **Mixed internal link styles**
   - Some links use `/` or `index.html`, others use relative `index.html` from subpages.
   - Breadcrumbs / navigation could be standardized.

---

## What the User Wants Next (for Opus to focus on)

From the conversation and HLD work, the user’s high-priority asks:

1. **Better maintainability**
   - Easier updates for:
     - Images (switch more to local, keep naming/alt text SEO-friendly).
     - Blogs (add new posts with minimal manual duplication).
     - City and service pages (generate new ones quickly for new cities).
   - Possible light templating system or simple build step (without overcomplicating).

2. **SEO & lead-gen improvements**
   - Ensure sitemap + robots + schema + meta tags are coherent.
   - Strengthen internal linking (blog → service pages, city pages → service pages, gallery → service pages).
   - Optimize CTAs and layout for **WhatsApp leads**.
   - Use image alt text, filenames, and captions to target **“false ceiling {city}”**, “gypsum ceiling {city}”, “POP ceiling {city}”, etc.

3. **Domain-agnostic setup**
   - Make it easy to swap `karnallocal.in` with another domain in a single place.
   - Potential directions:
     - A light static config file (e.g. `site-config.json`) read by a tiny build script.
     - Or a small Node script (there is already a `package.json`) to regenerate files where domain appears.

4. **Code & content review**
   - Look for duplication that can be abstracted without losing static hosting simplicity.
   - Normalize Tailwind configs and design tokens across pages.
   - Make the Kurukshetra and Ambala experiences consistent with Karnal (they already follow the pattern closely).

---

## Suggested Review Scope for Opus

When you (Opus) review and propose improvements, it would be most helpful if you:

1. **Stabilize the information architecture**
   - Propose a clean, scalable pattern for:
     - City overview pages vs city-specific service pages.
     - URL conventions (`/city/` vs `/false-ceiling-city.html`).
   - Ensure canonical URLs, internal links, and sitemap entries reflect that pattern.

2. **Design a minimal content system**
   - Use the existing JSONs (`blog-index.json`, `image-filename-mapping.json`) as seeds.
   - Suggest a small, low-friction way to:
     - Generate blog detail pages from `blog-index.json` + markdown or HTML fragments.
     - Generate city/service pages from a per-city config (e.g. JSON or JS object).

3. **Tighten SEO**
   - Validate:
     - Titles, descriptions, headings structure.
     - Schema correctness (LocalBusiness, ImageGallery, BlogPosting).
     - Robots + sitemap completeness.
   - Recommend concrete content gaps or internal links to add for “false ceiling + city” queries.

4. **Optimize for leads**
   - Evaluate placement and copy of:
     - WhatsApp buttons.
     - Phone CTAs.
     - Contact form.
   - Suggest small UX changes that are easy to ship in static HTML:
     - Better mobile sticky bar behavior.
     - Slight layout tweaks for trust badges, testimonials (if/when they are added).

5. **Keep it simple / static**
   - The user is on macOS with a simple file-based project, no backend.
   - Any build or templating proposal should:
     - Be optional and very light (Node script, or a static site generator with minimal config).
     - Not overcomplicate deployment (likely uploaded as static files).

