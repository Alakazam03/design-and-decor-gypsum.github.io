# Visitor Counter Implementation Guide

This guide explains how to implement and use the visitor counter for your Design & Decor website.

## Overview

The visitor counter system provides multiple options for tracking website visitors:

1. **Client-side (localStorage)** - Simple, no backend needed, but counts per browser
2. **Server-side (API)** - Accurate across all visitors, requires a backend server

## Quick Start

### Option 1: Simple Client-Side Counter (Recommended for Static Sites)

This is the easiest option and works immediately without any backend setup.

1. **Add the script to your HTML pages:**

```html
<!-- Add this before closing </body> tag -->
<script src="js/visitor-counter.js"></script>
<script>
    window.visitorCounterConfig = {
        useLocalStorage: true,
        counterElementId: 'visitor-count',
        debug: false // Set to true for debugging
    };
    
    const counter = new VisitorCounter(window.visitorCounterConfig);
    counter.init();
</script>
```

2. **Add the display element anywhere in your HTML:**

```html
<div id="visitor-count">0</div>
```

Or with styling:

```html
<div class="visitor-counter">
    <h3>Total Visitors</h3>
    <div class="count" id="visitor-count">0</div>
    <div class="label">Thank you for visiting!</div>
</div>
```

### Option 2: Server-Side Counter (More Accurate)

For accurate visitor counting across all users, use the backend API.

1. **Set up the backend:**

```bash
cd /path/to/design-and-decor
npm install express cors
node backend-visitor-counter.js
```

2. **Update your HTML to use the API:**

```html
<script src="js/visitor-counter.js"></script>
<script>
    window.visitorCounterConfig = {
        apiEndpoint: '/api/visitors', // or 'http://your-domain.com/api/visitors'
        counterElementId: 'visitor-count',
        useLocalStorage: true, // Fallback if API fails
        debug: false
    };
    
    const counter = new VisitorCounter(window.visitorCounterConfig);
    counter.init();
</script>
```

## Integration Examples

### Adding to Existing Pages

To add the counter to your existing pages (like `index.html`, `designs.html`, etc.):

1. **Add the display element** (choose a location):

```html
<!-- Example: In the header or footer -->
<footer>
    <p>Total Visitors: <span id="visitor-count">0</span></p>
</footer>
```

2. **Add the script** (before closing `</body>`):

```html
<script src="js/visitor-counter.js"></script>
<script>
    const counter = new VisitorCounter({
        useLocalStorage: true,
        counterElementId: 'visitor-count'
    });
    counter.init();
</script>
```

### Styling the Counter

You can style the counter using CSS:

```css
#visitor-count {
    font-size: 24px;
    font-weight: bold;
    color: #667eea;
}

/* Or create a styled container */
.visitor-counter {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
}
```

## Configuration Options

The `VisitorCounter` class accepts these options:

```javascript
{
    apiEndpoint: '/api/visitors',      // Backend API URL (optional)
    storageKey: 'visitor_count',      // localStorage key (optional)
    sessionKey: 'visitor_session',    // sessionStorage key (optional)
    counterElementId: 'visitor-count', // HTML element ID to display count
    useLocalStorage: true,             // Use localStorage as fallback
    debug: false                       // Enable debug logging
}
```

## Backend API Endpoints

If using the backend server (`backend-visitor-counter.js`):

- **POST `/api/visitors`** - Record a visit
- **GET `/api/visitors`** - Get current visitor count
- **GET `/api/visitors/stats`** - Get detailed statistics
- **POST `/api/visitors/reset`** - Reset counter (add authentication!)

## How It Works

### Client-Side (localStorage)
- Uses `localStorage` to store the count per browser
- Uses `sessionStorage` to track sessions and avoid duplicate counts
- Counts a new visit if 30+ minutes have passed since last visit
- Works offline and requires no backend

### Server-Side (API)
- Tracks unique visitors using IP + User-Agent fingerprinting
- Uses session IDs to prevent duplicate counts in the same session
- Stores data in a JSON file (can be upgraded to a database)
- Provides accurate counts across all visitors

## Production Considerations

1. **For static hosting (GitHub Pages, Netlify, etc.):**
   - Use Option 1 (localStorage) - it works immediately
   - Or use a serverless function for the API

2. **For server hosting:**
   - Use Option 2 (API) for accurate counting
   - Consider upgrading to a database (MongoDB, PostgreSQL, etc.)
   - Add authentication for the reset endpoint
   - Implement rate limiting

3. **Privacy & GDPR:**
   - Consider adding a cookie consent banner
   - Document what data you collect
   - Allow users to opt-out if required

## Troubleshooting

**Counter not displaying:**
- Check that the element ID matches `counterElementId`
- Check browser console for errors
- Enable `debug: true` to see logs

**Count not incrementing:**
- Check if localStorage is enabled in browser
- For API: check network tab for API errors
- Check backend server is running (if using API)

**Count resets:**
- localStorage is per-browser, so counts are separate per browser
- Clear browser data will reset the count
- For persistent counts, use the backend API

## Advanced: Database Integration

To use a database instead of JSON file, modify `backend-visitor-counter.js`:

```javascript
// Example with MongoDB
const { MongoClient } = require('mongodb');

async function loadData() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('visitors');
    const stats = await db.collection('stats').findOne({});
    return stats || { totalVisits: 0, uniqueVisitors: [] };
}
```

## Support

For issues or questions, check the code comments in `js/visitor-counter.js` or modify the implementation to suit your needs.
