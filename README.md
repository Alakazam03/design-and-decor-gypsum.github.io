# Design & Decor Website

Professional false ceiling and gypsum work website for Karnal & Delhi NCR.

## Features

- ✅ Modern, minimal, mobile-optimized design
- ✅ SEO-optimized service pages
- ✅ Design gallery with 100+ designs
- ✅ Blog system with local file storage
- ✅ LLM/AI search optimization
- ✅ WhatsApp integration
- ✅ Mobile-first with sticky navigation

## File Structure

```
design-and-decor/
├── index.html              # Homepage
├── designs.html           # Design gallery
├── blog.html              # Blog listing page
├── blog-index.json        # Blog posts index
├── false-ceiling-karnal.html  # SEO service page
├── blog/                  # Blog posts folder
│   └── *.html            # Individual blog posts
├── js/
│   └── blog.js           # Blog loader script
├── css/                   # Custom styles
├── images/                # Project images
├── robots.txt             # SEO crawler rules
├── llms.txt              # AI-friendly content
└── sitemap.xml           # Site map

```

## Adding a New Blog Post

1. **Add entry to `blog-index.json`**:
```json
{
  "id": "your-post-slug",
  "title": "Your Blog Post Title",
  "excerpt": "Short description",
  "author": "Design & Decor Team",
  "date": "2026-01-20",
  "category": "Design Trends",
  "readTime": "5 min read",
  "image": "https://images.unsplash.com/...",
  "tags": ["tag1", "tag2"]
}
```

2. **Create HTML file**: `blog/your-post-slug.html`

3. **Copy structure** from `blog/false-ceiling-design-trends-2026.html`

See `BLOG_TEMPLATE.md` for detailed instructions.

## Mobile Features

- Sticky bottom bar with Call/WhatsApp buttons
- Section navigation buttons (no click-to-expand)
- Touch-friendly interface
- Fast loading

## SEO Features

- Schema markup (LocalBusiness, BlogPosting)
- Meta tags optimized
- Sitemap.xml
- LLM-friendly content (llms.txt)
- Robots.txt allows AI crawlers

## Contact

- WhatsApp: +91 93555 10817
- Phone: +91 93555 10817

## Deployment

Ready for GitHub Pages or any static hosting. Just upload all files.
