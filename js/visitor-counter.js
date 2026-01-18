/**
 * Visitor Counter for Design & Decor Website
 * 
 * This script tracks and displays visitor counts.
 * Supports multiple storage methods:
 * 1. localStorage (client-side, per browser)
 * 2. Backend API (server-side, accurate across all visitors)
 */

class VisitorCounter {
    constructor(options = {}) {
        this.apiEndpoint = options.apiEndpoint || null;
        this.storageKey = options.storageKey || 'visitor_count';
        this.sessionKey = options.sessionKey || 'visitor_session';
        this.counterElementId = options.counterElementId || 'visitor-count';
        this.useLocalStorage = options.useLocalStorage !== false; // Default true
        this.debug = options.debug || false;
    }

    log(message) {
        if (this.debug) {
            console.log('[VisitorCounter]', message);
        }
    }

    /**
     * Get or create a unique session ID
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem(this.sessionKey);
        if (!sessionId) {
            sessionId = this.generateSessionId();
            sessionStorage.setItem(this.sessionKey, sessionId);
            this.log('New session created: ' + sessionId);
        }
        return sessionId;
    }

    /**
     * Generate a unique session ID
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Check if this is a new visit (not just a page refresh)
     */
    isNewVisit() {
        const lastVisit = sessionStorage.getItem('last_visit_time');
        const now = Date.now();
        const timeSinceLastVisit = now - (lastVisit ? parseInt(lastVisit) : 0);
        
        // Consider it a new visit if more than 30 minutes have passed
        // or if this is the first visit in this session
        if (!lastVisit || timeSinceLastVisit > 30 * 60 * 1000) {
            sessionStorage.setItem('last_visit_time', now.toString());
            return true;
        }
        return false;
    }

    /**
     * Increment counter using localStorage (client-side only)
     */
    incrementLocalStorage() {
        try {
            let count = parseInt(localStorage.getItem(this.storageKey)) || 0;
            if (this.isNewVisit()) {
                count++;
                localStorage.setItem(this.storageKey, count.toString());
                this.log('LocalStorage count incremented to: ' + count);
            }
            return count;
        } catch (e) {
            this.log('Error with localStorage: ' + e.message);
            return 0;
        }
    }

    /**
     * Get count from localStorage
     */
    getLocalStorageCount() {
        try {
            return parseInt(localStorage.getItem(this.storageKey)) || 0;
        } catch (e) {
            return 0;
        }
    }

    /**
     * Increment counter via API (server-side)
     */
    async incrementViaAPI() {
        if (!this.apiEndpoint) {
            this.log('No API endpoint configured, falling back to localStorage');
            return this.incrementLocalStorage();
        }

        try {
            const sessionId = this.getSessionId();
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sessionId: sessionId,
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    referrer: document.referrer || '',
                }),
            });

            if (response.ok) {
                const data = await response.json();
                this.log('API count: ' + data.count);
                return data.count;
            } else {
                this.log('API request failed, falling back to localStorage');
                return this.incrementLocalStorage();
            }
        } catch (error) {
            this.log('API error: ' + error.message + ', falling back to localStorage');
            return this.incrementLocalStorage();
        }
    }

    /**
     * Get count from API
     */
    async getCountFromAPI() {
        if (!this.apiEndpoint) {
            return this.getLocalStorageCount();
        }

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                return data.count || 0;
            } else {
                return this.getLocalStorageCount();
            }
        } catch (error) {
            this.log('API error: ' + error.message);
            return this.getLocalStorageCount();
        }
    }

    /**
     * Format number with commas
     */
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Update the counter display
     */
    updateDisplay(count) {
        const element = document.getElementById(this.counterElementId);
        if (element) {
            element.textContent = this.formatNumber(count);
            element.setAttribute('data-count', count);
        } else {
            this.log('Counter element not found: #' + this.counterElementId);
        }
    }

    /**
     * Initialize and start tracking
     */
    async init() {
        this.log('Initializing visitor counter...');

        let count;
        
        if (this.apiEndpoint) {
            // Use API if available
            count = await this.incrementViaAPI();
        } else if (this.useLocalStorage) {
            // Fall back to localStorage
            count = this.incrementLocalStorage();
        } else {
            count = 0;
        }

        // Update display
        this.updateDisplay(count);

        // Also try to get the latest count from API (for display purposes)
        if (this.apiEndpoint) {
            const latestCount = await this.getCountFromAPI();
            if (latestCount > count) {
                this.updateDisplay(latestCount);
            }
        }

        this.log('Visitor counter initialized. Count: ' + count);
        return count;
    }
}

// Auto-initialize if script is loaded
if (typeof window !== 'undefined') {
    // Create a global instance with default settings
    window.VisitorCounter = VisitorCounter;
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.visitorCounterConfig) {
                const counter = new VisitorCounter(window.visitorCounterConfig);
                counter.init();
            }
        });
    } else {
        if (window.visitorCounterConfig) {
            const counter = new VisitorCounter(window.visitorCounterConfig);
            counter.init();
        }
    }
}
