/**
 * Simple Node.js/Express backend for visitor counting
 * 
 * This is an example backend API for accurate visitor counting.
 * Install dependencies: npm install express cors
 * Run: node backend-visitor-counter.js
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'visitor-data.json');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize data file if it doesn't exist
async function initializeDataFile() {
    try {
        await fs.access(DATA_FILE);
    } catch {
        await fs.writeFile(DATA_FILE, JSON.stringify({
            totalVisits: 0,
            uniqueVisitors: new Set(),
            sessions: new Set(),
            lastReset: new Date().toISOString()
        }, null, 2));
    }
}

// Load data from file
async function loadData() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const parsed = JSON.parse(data);
        // Convert Sets from JSON (they're stored as arrays)
        parsed.uniqueVisitors = new Set(parsed.uniqueVisitors || []);
        parsed.sessions = new Set(parsed.sessions || []);
        return parsed;
    } catch (error) {
        console.error('Error loading data:', error);
        return {
            totalVisits: 0,
            uniqueVisitors: new Set(),
            sessions: new Set(),
            lastReset: new Date().toISOString()
        };
    }
}

// Save data to file
async function saveData(data) {
    try {
        // Convert Sets to arrays for JSON storage
        const toSave = {
            ...data,
            uniqueVisitors: Array.from(data.uniqueVisitors),
            sessions: Array.from(data.sessions)
        };
        await fs.writeFile(DATA_FILE, JSON.stringify(toSave, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// Generate a simple fingerprint for unique visitor tracking
function generateVisitorFingerprint(req) {
    // Use IP address + User-Agent as a simple fingerprint
    // In production, you might want to use cookies or more sophisticated tracking
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const userAgent = req.get('user-agent') || 'unknown';
    return `${ip}_${userAgent}`.substring(0, 100); // Limit length
}

// POST endpoint: Record a visit
app.post('/api/visitors', async (req, res) => {
    try {
        const data = await loadData();
        const sessionId = req.body.sessionId || 'unknown';
        const fingerprint = generateVisitorFingerprint(req);

        // Track unique visitors
        if (!data.uniqueVisitors.has(fingerprint)) {
            data.uniqueVisitors.add(fingerprint);
        }

        // Track sessions (one visit per session)
        if (!data.sessions.has(sessionId)) {
            data.sessions.add(sessionId);
            data.totalVisits++;
        }

        await saveData(data);

        res.json({
            success: true,
            count: data.totalVisits,
            uniqueVisitors: data.uniqueVisitors.size,
            message: 'Visit recorded'
        });
    } catch (error) {
        console.error('Error recording visit:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to record visit'
        });
    }
});

// GET endpoint: Get current visitor count
app.get('/api/visitors', async (req, res) => {
    try {
        const data = await loadData();
        res.json({
            success: true,
            count: data.totalVisits,
            uniqueVisitors: data.uniqueVisitors.size,
            sessions: data.sessions.size,
            lastReset: data.lastReset
        });
    } catch (error) {
        console.error('Error getting count:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get visitor count'
        });
    }
});

// GET endpoint: Get statistics
app.get('/api/visitors/stats', async (req, res) => {
    try {
        const data = await loadData();
        res.json({
            success: true,
            totalVisits: data.totalVisits,
            uniqueVisitors: data.uniqueVisitors.size,
            activeSessions: data.sessions.size,
            lastReset: data.lastReset
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get statistics'
        });
    }
});

// Reset endpoint (for admin use - add authentication in production!)
app.post('/api/visitors/reset', async (req, res) => {
    try {
        const newData = {
            totalVisits: 0,
            uniqueVisitors: new Set(),
            sessions: new Set(),
            lastReset: new Date().toISOString()
        };
        await saveData(newData);
        res.json({
            success: true,
            message: 'Visitor count reset'
        });
    } catch (error) {
        console.error('Error resetting count:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to reset visitor count'
        });
    }
});

// Start server
async function startServer() {
    await initializeDataFile();
    app.listen(PORT, () => {
        console.log(`Visitor counter API running on http://localhost:${PORT}`);
        console.log(`Endpoints:`);
        console.log(`  POST /api/visitors - Record a visit`);
        console.log(`  GET  /api/visitors - Get visitor count`);
        console.log(`  GET  /api/visitors/stats - Get detailed statistics`);
        console.log(`  POST /api/visitors/reset - Reset counter (add auth in production!)`);
    });
}

startServer().catch(console.error);
