# Image Optimization Checklist

## Overview
This document outlines image optimization requirements for the Design & Decor website to ensure fast page loading times and optimal user experience.

## Image Compression Requirements

### Current Status
- Images are currently using Unsplash CDN with query parameters for optimization (`?w=600&q=80`)
- All images should be compressed before final deployment

### Optimization Guidelines

1. **Image Format**
   - Use WebP format for modern browsers (with fallback to JPEG/PNG)
   - JPEG for photographs
   - PNG for images with transparency

2. **Image Dimensions**
   - Gallery thumbnails: 400x400px (1:1 aspect ratio)
   - Lightbox images: 800x800px maximum
   - Hero images: 1200px width maximum
   - Portfolio images: 600x450px (4:3 aspect ratio)

3. **File Size Targets**
   - Thumbnail images: < 50KB
   - Lightbox images: < 150KB
   - Hero images: < 200KB
   - Portfolio images: < 100KB

4. **Compression Tools**
   - Online: TinyPNG, Squoosh, ImageOptim
   - Command line: ImageMagick, Sharp
   - WordPress plugins: Smush, ShortPixel (if using CMS)

5. **Lazy Loading**
   - ✅ Already implemented with `loading="lazy"` attribute
   - Ensure all images have this attribute

## Files with Images

### High Priority (Most Images)
- `designs.html` - 12+ design images
- `portfolio.html` - 9+ portfolio images
- `index.html` - 7+ images
- Location pages (karnal.html, gurgaon.html, delhi.html, etc.) - Various images

### Action Items
1. Compress all images before final deployment
2. Replace Unsplash URLs with optimized local images or CDN URLs
3. Test page load speeds using Google PageSpeed Insights
4. Verify all images maintain quality after compression
5. Ensure responsive images are properly sized for different viewports

## Testing Checklist
- [ ] Run PageSpeed Insights test
- [ ] Verify images load quickly on mobile devices
- [ ] Check image quality after compression
- [ ] Test lazy loading functionality
- [ ] Verify alt text is descriptive and includes location keywords

## Notes
- Current images use Unsplash CDN which provides automatic optimization
- For production, consider using a dedicated image CDN (Cloudinary, Imgix) or hosting optimized images locally
- All images should have descriptive alt text including location and material type (already implemented)
