# Quick Integration Guide

## Adding Visitor Counter to Your Pages

### Step 1: Add the Display Element

Choose where you want to show the counter. Here are some common locations:

#### Option A: In the Footer
```html
<footer class="bg-gray-50 py-8 mt-16">
    <div class="max-w-6xl mx-auto px-4 text-center">
        <p class="text-gray-600">
            Total Visitors: <span id="visitor-count" class="font-semibold text-gray-900">0</span>
        </p>
    </div>
</footer>
```

#### Option B: As a Standalone Widget
```html
<div class="visitor-counter">
    <h3>Total Visitors</h3>
    <div class="count" id="visitor-count">0</div>
    <div class="label">Thank you for visiting!</div>
</div>
```

#### Option C: In the Header (Minimal)
```html
<header>
    <!-- Your existing header content -->
    <div class="text-xs text-gray-500">
        Visitors: <span id="visitor-count">0</span>
    </div>
</header>
```

### Step 2: Add the Script

Add this before the closing `</body>` tag in your HTML files:

```html
<!-- Visitor Counter -->
<script src="js/visitor-counter.js"></script>
<script>
    // Simple localStorage-based counter (works immediately, no backend needed)
    const counter = new VisitorCounter({
        useLocalStorage: true,
        counterElementId: 'visitor-count',
        debug: false // Set to true to see console logs
    });
    counter.init();
</script>
```

### Step 3: (Optional) Add CSS

If you're using the styled widget (Option B), link the CSS file in your `<head>`:

```html
<link rel="stylesheet" href="css/visitor-counter.css">
```

## Example: Adding to designs.html

Add this before the closing `</body>` tag (around line 548):

```html
    <!-- Visitor Counter -->
    <script src="js/visitor-counter.js"></script>
    <script>
        const counter = new VisitorCounter({
            useLocalStorage: true,
            counterElementId: 'visitor-count',
            debug: false
        });
        counter.init();
    </script>
</body>
```

And add the display element somewhere visible, for example in a footer section or at the bottom of the page.

## Using with Backend API

If you want accurate counts across all visitors, set up the backend:

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Update the script configuration:
```html
<script>
    const counter = new VisitorCounter({
        apiEndpoint: 'http://localhost:3000/api/visitors', // Change to your domain in production
        counterElementId: 'visitor-count',
        useLocalStorage: true, // Fallback if API fails
        debug: false
    });
    counter.init();
</script>
```

## Testing

1. Open your page in a browser
2. Check the browser console (F12) - you should see visitor counter logs if `debug: true`
3. Refresh the page - the count should not increment (same session)
4. Wait 30+ minutes or clear sessionStorage - the count should increment on next visit

## Troubleshooting

- **Counter shows 0**: Check that the element ID matches `counterElementId`
- **Count not updating**: Check browser console for errors, enable `debug: true`
- **Styling issues**: Make sure CSS is linked if using styled widget
