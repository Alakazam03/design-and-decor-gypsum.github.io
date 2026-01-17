// Blog System - Loads posts from blog-index.json and renders them

let allPosts = [];
let currentCategory = 'all';

// Load blog index
async function loadBlogIndex() {
    try {
        const response = await fetch('blog-index.json');
        allPosts = await response.json();
        renderPosts();
    } catch (error) {
        console.error('Error loading blog index:', error);
        document.getElementById('loading').innerHTML = '<p class="text-red-600">Error loading posts. Please refresh the page.</p>';
    }
}

// Render blog posts
function renderPosts() {
    const container = document.getElementById('blogPosts');
    const loading = document.getElementById('loading');
    const emptyState = document.getElementById('emptyState');
    
    // Hide loading
    if (loading) loading.style.display = 'none';
    
    // Filter posts by category
    const filteredPosts = currentCategory === 'all' 
        ? allPosts 
        : allPosts.filter(post => post.category === currentCategory);
    
    // Show empty state if no posts
    if (filteredPosts.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    // Render posts
    container.innerHTML = filteredPosts.map(post => `
        <a href="blog/${post.id}.html" class="blog-card bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:border-gray-200 block">
            <div class="aspect-[16/9] overflow-hidden bg-gray-100">
                <img src="${post.image}" 
                     alt="${post.title}" 
                     class="w-full h-full object-cover"
                     loading="lazy">
            </div>
            <div class="p-6">
                <div class="flex items-center gap-3 mb-3">
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        ${post.category}
                    </span>
                    <span class="text-xs text-gray-500">${post.readTime}</span>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    ${post.title}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-3">
                    ${post.excerpt}
                </p>
                <div class="flex items-center justify-between">
                    <div class="text-xs text-gray-500">
                        ${formatDate(post.date)}
                    </div>
                    <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                    </svg>
                </div>
            </div>
        </a>
    `).join('');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Category filter
document.addEventListener('DOMContentLoaded', () => {
    loadBlogIndex();
    
    // Category buttons
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            categoryBtns.forEach(b => {
                b.classList.remove('active', 'bg-gray-900', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-gray-900', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            
            // Update category and render
            currentCategory = btn.dataset.category;
            renderPosts();
        });
    });
});
