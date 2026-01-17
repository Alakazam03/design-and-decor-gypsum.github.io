# Blog Post Template

To add a new blog post:

1. **Add entry to `blog-index.json`**:
```json
{
  "id": "your-post-slug",
  "title": "Your Blog Post Title",
  "excerpt": "Short description (150-200 characters)",
  "author": "Design & Decor Team",
  "date": "2026-01-20",
  "category": "Design Trends", // or "Guide", "Pricing", etc.
  "readTime": "5 min read",
  "image": "https://images.unsplash.com/photo-...",
  "tags": ["tag1", "tag2", "tag3"]
}
```

2. **Create HTML file**: `blog/your-post-slug.html`

3. **Copy template structure** from `blog/false-ceiling-design-trends-2026.html` and customize:

## Template Structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Copy head section from existing blog post -->
    <title>Your Title | Design & Decor Blog</title>
    <meta name="description" content="Your description">
</head>
<body>
    <!-- Header (same as other pages) -->
    
    <article class="pt-24 pb-12">
        <div class="max-w-4xl mx-auto px-4">
            <!-- Breadcrumb -->
            <!-- Article Meta -->
            <!-- Featured Image -->
            
            <!-- Mobile Section Navigation (if needed) -->
            <div class="sticky top-16 bg-white border-b border-gray-100 z-40 mb-8 md:hidden">
                <div class="px-4 py-3 overflow-x-auto hide-scrollbar">
                    <div class="flex gap-2">
                        <a href="#section1" class="section-btn px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium whitespace-nowrap">Section 1</a>
                        <a href="#section2" class="section-btn px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium whitespace-nowrap">Section 2</a>
                        <!-- Add more sections -->
                    </div>
                </div>
            </div>
            
            <!-- Article Content -->
            <div class="prose mx-auto">
                <p>Introduction paragraph...</p>
                
                <h2 id="section1">Section 1 Title</h2>
                <p>Content...</p>
                
                <h2 id="section2">Section 2 Title</h2>
                <p>Content...</p>
                
                <!-- CTA Box -->
                <div class="bg-gray-50 rounded-xl p-6 my-8">
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Ready to Get Started?</h3>
                    <p class="text-gray-700 mb-4">...</p>
                    <a href="https://wa.me/919355510817?text=..." class="...">Contact Us</a>
                </div>
            </div>
            
            <!-- Related Posts -->
        </div>
    </article>
    
    <!-- Footer -->
    <!-- Sticky Bottom Bar -->
</body>
</html>
```

## Tips:

- Use `h2` tags with `id` attributes for sections (for mobile navigation)
- Keep paragraphs concise (3-4 sentences)
- Use images from Unsplash (free, high-quality)
- Include internal links to service pages
- Add Schema markup for SEO
- Mobile section navigation automatically highlights active section

## Categories Available:

- "Design Trends"
- "Guide"
- "Pricing"
- "Maintenance"
- "Installation"

## Example Blog Post IDs:

- `false-ceiling-design-trends-2026`
- `gypsum-vs-pop-ceiling`
- `false-ceiling-cost-karnal`
- `how-to-maintain-false-ceiling`
- `led-lighting-false-ceiling`
