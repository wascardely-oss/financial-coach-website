#!/usr/bin/env node

const http = require('http');
const url = require('url');
const querystring = require('querystring');

const PORT = process.env.PORT || 3000;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;

console.log('='.repeat(60));
console.log('Financial Coach Subscription Server');
console.log('='.repeat(60));
console.log('PORT:', PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('STRIPE_SECRET_KEY:', STRIPE_SECRET_KEY ? '✓ Configured' : '✗ Missing');
console.log('STRIPE_PUBLIC_KEY:', STRIPE_PUBLIC_KEY ? '✓ Configured' : '✗ Missing');
console.log('BASE_URL:', BASE_URL);
console.log('='.repeat(60));

// HTML for subscription page
const subscriptionPageHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financial Coach - Suscripción</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            width: 100%;
        }
        .header {
            text-align: center;
            color: white;
            margin-bottom: 50px;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        .header p {
            font-size: 1.1em;
            opacity: 0.9;
        }
        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 50px;
        }
        .pricing-card {
            background: white;
            border-radius: 12px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            transition: transform 0.3s, box-shadow 0.3s;
            position: relative;
        }
        .pricing-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 50px rgba(0,0,0,0.2);
        }
        .pricing-card.popular {
            border: 3px solid #667eea;
            transform: scale(1.05);
        }
        .pricing-card.popular::before {
            content: "Más Popular";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%);
            background: #667eea;
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9em;
            font-weight: bold;
        }
        .plan-name {
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            margin-bottom: 10px;
        }
        .plan-description {
            color: #666;
            margin-bottom: 20px;
            font-size: 0.95em;
        }
        .price {
            font-size: 2.5em;
            font-weight: bold;
            color: #667eea;
            margin-bottom: 5px;
        }
        .price-period {
            color: #999;
            font-size: 0.9em;
            margin-bottom: 30px;
        }
        .features {
            list-style: none;
            margin-bottom: 30px;
            text-align: left;
        }
        .features li {
            padding: 10px 0;
            color: #666;
            border-bottom: 1px solid #eee;
        }
        .features li:before {
            content: "✓ ";
            color: #667eea;
            font-weight: bold;
            margin-right: 10px;
        }
        .btn {
            background: #667eea;
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-size: 1em;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s;
            width: 100%;
        }
        .btn:hover {
            background: #764ba2;
        }
        .btn:disabled {
            background: #ccc;
            cursor: not-allowed;
        }
        .error {
            color: #e74c3c;
            margin-top: 10px;
            font-size: 0.9em;
        }
        .loading {
            display: inline-block;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Financial Coach</h1>
            <p>Elige el plan perfecto para ti</p>
        </div>

        <div class="pricing-grid">
            <!-- Free Plan -->
            <div class="pricing-card">
                <div class="plan-name">Gratuito</div>
                <div class="plan-description">Perfecto para comenzar</div>
                <div class="price">$0</div>
                <div class="price-period">por mes</div>
                <ul class="features">
                    <li>Seguimiento básico de gastos</li>
                    <li>Categorización automática</li>
                    <li>Resumen mensual</li>
                    <li>Acceso limitado al Coach IA</li>
                </ul>
                <button class="btn" onclick="alert('Plan gratuito - No requiere suscripción')">Seleccionar</button>
            </div>

            <!-- Pro Plan -->
            <div class="pricing-card popular">
                <div class="plan-name">Pro</div>
                <div class="plan-description">Para usuarios serios</div>
                <div class="price">$9.99</div>
                <div class="price-period">por mes</div>
                <ul class="features">
                    <li>Todo en Gratuito</li>
                    <li>Coach IA sin límites</li>
                    <li>Integración bancaria (Plaid)</li>
                    <li>Billeteras digitales</li>
                    <li>Retos semanales gamificados</li>
                    <li>Análisis avanzado</li>
                </ul>
                <button class="btn" onclick="subscribe('pro', 9.99, 'Para usuarios serios')">Suscribirse</button>
                <div class="error" id="error-pro"></div>
            </div>

            <!-- Premium Plan -->
            <div class="pricing-card">
                <div class="plan-name">Premium</div>
                <div class="plan-description">Control total</div>
                <div class="price">$19.99</div>
                <div class="price-period">por mes</div>
                <ul class="features">
                    <li>Todo en Pro</li>
                    <li>Análisis predictivo</li>
                    <li>Reportes personalizados</li>
                    <li>Soporte prioritario</li>
                    <li>Exportar datos</li>
                    <li>Sin publicidad</li>
                </ul>
                <button class="btn" onclick="subscribe('premium', 19.99, 'Control total')">Suscribirse</button>
                <div class="error" id="error-premium"></div>
            </div>
        </div>
    </div>

    <script src="https://js.stripe.com/v3/"></script>
    <script>
        const stripe = Stripe('${STRIPE_PUBLIC_KEY}');

        async function subscribe(planName, planPrice, planDescription) {
            const button = event.target;
            const errorDiv = document.getElementById('error-' + planName);
            
            button.disabled = true;
            button.innerHTML = '<span class="loading">⏳</span> Procesando...';
            errorDiv.innerHTML = '';

            try {
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        planName,
                        planPrice,
                        planDescription,
                    }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error || 'Error al crear sesión');
                }

                const { sessionId } = await response.json();

                const { error } = await stripe.redirectToCheckout({
                    sessionId,
                });

                if (error) {
                    throw new Error(error.message);
                }
            } catch (err) {
                errorDiv.innerHTML = '❌ ' + err.message;
                button.disabled = false;
                button.innerHTML = 'Suscribirse';
            }
        }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }

  // Debug endpoint
  if (pathname === '/api/debug') {
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'ok',
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: PORT,
        STRIPE_SECRET_KEY: STRIPE_SECRET_KEY ? '✓ Configured' : '✗ Missing',
        STRIPE_PUBLIC_KEY: STRIPE_PUBLIC_KEY ? '✓ Configured' : '✗ Missing',
      },
      timestamp: new Date().toISOString(),
    }));
    return;
  }

  // Create checkout session
  if (pathname === '/api/create-checkout-session' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      try {
        res.setHeader('Content-Type', 'application/json');

        if (!STRIPE_SECRET_KEY) {
          res.writeHead(500);
          res.end(JSON.stringify({ error: 'Stripe not configured' }));
          return;
        }

        const data = JSON.parse(body);
        const { planName, planPrice, planDescription } = data;

        if (!planName || !planPrice) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid request data' }));
          return;
        }

        console.log(`[Stripe] Creating session for plan: ${planName}, price: $${planPrice}`);

        // For now, return a mock session ID
        // In production, you would use the Stripe SDK here
        const sessionId = 'cs_' + Math.random().toString(36).substr(2, 9);

        console.log(`[Stripe] Session created: ${sessionId}`);
        res.writeHead(200);
        res.end(JSON.stringify({ sessionId }));
      } catch (err) {
        console.error('[Error]', err);
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
      }
    });
    return;
  }

  // Root endpoint - serve subscription page
  if (pathname === '/' || pathname === '/subscription-demo') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.writeHead(200);
    res.end(subscriptionPageHTML);
    return;
  }

  // 404
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✓ Server running on http://0.0.0.0:${PORT}`);
  console.log(`✓ Subscription page: http://0.0.0.0:${PORT}/`);
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
