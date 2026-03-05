#!/usr/bin/env node

const express = require('express');
const Stripe = require('stripe');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Stripe
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

console.log('='.repeat(50));
console.log('Financial Coach API Server');
console.log('='.repeat(50));
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('STRIPE_SECRET_KEY:', STRIPE_SECRET_KEY ? '✓ Configured' : '✗ Missing');
console.log('STRIPE_PUBLIC_KEY:', STRIPE_PUBLIC_KEY ? '✓ Configured' : '✗ Missing');
console.log('='.repeat(50));

let stripe;
if (STRIPE_SECRET_KEY) {
  stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  });
  console.log('✓ Stripe initialized successfully');
} else {
  console.error('✗ STRIPE_SECRET_KEY is missing');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  res.json({
    status: 'ok',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: PORT,
      STRIPE_SECRET_KEY: STRIPE_SECRET_KEY ? '✓ Configured' : '✗ Missing',
      STRIPE_PUBLIC_KEY: STRIPE_PUBLIC_KEY ? '✓ Configured' : '✗ Missing',
    },
    timestamp: new Date().toISOString(),
  });
});

// Create checkout session
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('[Stripe] Creating checkout session...');
    
    if (!STRIPE_SECRET_KEY) {
      console.error('[Stripe] STRIPE_SECRET_KEY is missing');
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    const { planName, planPrice, planDescription } = req.body;

    if (!planName || !planPrice) {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    console.log(`[Stripe] Plan: ${planName}, Price: $${planPrice}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Financial Coach - ${planName}`,
              description: planDescription,
            },
            unit_amount: Math.round(planPrice * 100),
            recurring: {
              interval: 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://financial-coach-website.onrender.com'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://financial-coach-website.onrender.com'}/cancel`,
    });

    console.log(`[Stripe] Session created: ${session.id}`);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('[Stripe] Error:', error.message);
    res.status(500).json({ error: error.message || 'Error creating session' });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Financial Coach API', status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
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
