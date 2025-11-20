import 'zone.js/node';
import * as express from 'express';
import { join } from 'node:path';
import helmet from 'helmet';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { AppServerModule } from './src/main.server';
import * as compression from 'compression';
import { readFileSync } from 'node:fs';
import * as expressStaticGzip from 'express-static-gzip';
const app = express();
const distFolder = join(process.cwd(), 'dist/mlzs/browser');
const indexHtml = 'index'; // render the view name 'index'
// --- Security headers (safe defaults) ---
app.use(helmet({
  contentSecurityPolicy: false, // enable CSP later with proper script hashes if you like
  frameguard: { action: 'sameorigin' }
}));
// --- Pre-compression (Brotli > Gzip) ---
// Serve .br/.gz that you prebuilt (recommended) or dynamic compression fallback.
app.get('*.*', expressStaticGzip(distFolder, {
  enableBrotli: true,
  orderPreference: ['br', 'gz'],
  index: false,
  setHeaders: (res, path) => {
    // immutable, long cache for hashed assets
    if (/\.[0-9a-f]{8,}\./i.test(path)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
    
}));
// Fallback compression for anything not served by expressStaticGzip
app.use(compression());
// --- View engine for SSR ---
app.engine('html', ngExpressEngine({ bootstrap: AppServerModule }) as any);
app.set('view engine', 'html');
app.set('views', distFolder);
// --- Tiny HTML micro-cache (safe for anonymous pages) ---
import {LRUCache} from 'lru-cache';
const htmlCache = new LRUCache<string, string>({ max: 500, ttl: 5_000 }); // 5s
app.use((req, res, next) => {
  if (req.method !== 'GET' || req.url.includes('.')) return next();
  const hit = htmlCache.get(req.url);
  if (hit) return res.status(200).send(hit);
  const send = res.send.bind(res);
  res.send = (body: any) => {
    if (res.statusCode === 200 && typeof body === 'string') htmlCache.set(req.url, body);
    return send(body);
  };
  next();
});
// --- SSR catch-all (render HTML, don’t send JS files) ---
app.get('*', (req, res) => {
  res.render(indexHtml, { req }, (err, html) => {
    if (err) return res.status(500).send('SSR error');
    res.setHeader('Cache-Control', 'no-cache'); // or short TTL if you edge-cache
    return res.send(html);
  });
});
const port = process.env.PORT ?? 4000;
app.listen(port, () => console.log(`SSR on http://localhost:${port}`));