#!/usr/bin/env node

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;

console.log('='.repeat(50));
console.log('Financial Coach API Server (Node.js Pure)');
console.log('='.repeat(50));
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('='.repeat(50));

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Handle OPTIONS
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Health check
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // Debug endpoint
  if (pathname === '/api/debug') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: PORT,
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✓ Configured' : '✗ Missing',
        STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✓ Configured' : '✗ Missing',
      },
      timestamp: new Date().toISOString(),
    }));
    return;
  }

  // Root endpoint
  if (pathname === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({ message: 'Financial Coach API', status: 'ok' }));
    return;
  }

  // 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✓ Server running on http://0.0.0.0:${PORT}`);
  console.log(`✓ Health check: http://0.0.0.0:${PORT}/api/health`);
  console.log(`✓ Debug: http://0.0.0.0:${PORT}/api/debug`);
  console.log(`\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
