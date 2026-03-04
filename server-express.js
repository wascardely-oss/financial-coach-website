const express = require('express');
const Stripe = require('stripe');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
console.log('Stripe Secret Key configured:', !!stripeSecretKey);

const stripe = new Stripe(stripeSecretKey || '', {
  apiVersion: '2024-04-10',
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  res.json({
    status: 'ok',
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: stripePublicKey ? '✓ Configured' : '✗ Not configured',
      STRIPE_SECRET_KEY: stripeSecretKey ? '✓ Configured' : '✗ Not configured',
    },
    timestamp: new Date().toISOString(),
  });
});

// Create checkout session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    console.log('Creating checkout session...');
    
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY not configured');
      return res.status(500).json({ error: 'Stripe not configured' });
    }

    const { planName, planPrice, planDescription } = req.body;

    if (!planName || !planPrice) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    console.log(`Creating session for plan: ${planName}, price: ${planPrice}`);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Financial Coach - Plan ${planName.charAt(0).toUpperCase() + planName.slice(1)}`,
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

    console.log(`Session created successfully: ${session.id}`);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    const message = error instanceof Error ? error.message : 'Error creating payment session';
    res.status(500).json({ error: message });
  }
});

// Serve Next.js static files and handle other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err) {
      res.status(404).send('Not found');
    }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Health check: http://0.0.0.0:${port}/api/health`);
});
