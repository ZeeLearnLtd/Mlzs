import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { AppServerModule } from './src/main.server';
import * as path from 'node:path';
import * as expressStaticGzip from 'express-static-gzip';

const fs = require('fs');

export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/mlzs/browser');
  const _dir = process.cwd();

  // Determine the appropriate index.html file
  const indexHtml = fs.existsSync(path.join(distFolder, 'index.original.html'))
    ? path.join(distFolder, 'index.original.html')
    : 'index';

  console.log(`Using index file: ${indexHtml}`);

  // Set up Angular Universal engine
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.use((req, res, next) => {
    res.setHeader('X-SSR-Rendered', 'true');
    next();
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files with caching
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );
  server.get("/sitemap.xml", (req, res) => res.sendFile(_dir + "/sitemap.xml"));
  server.get('/blog-sitemap.xml', (req, res) => res.sendFile(_dir + '/blog-sitemap.xml'));
  server.get('/pages-sitemap.xml', (req, res) => res.sendFile(_dir + '/pages-sitemap.xml'));
  server.get('/location-sitemap.xml', (req, res) => res.sendFile(_dir + '/location-sitemap.xml'));
  server.get('/microsite-sitemap.xml', (req, res) => res.sendFile(_dir + '/microsite-sitemap.xml'));
  // Use Brotli and Gzip compression for static files
  server.use(
    expressStaticGzip(distFolder, {
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
    })
  );

  

  // Serve pre-rendered static files for defined routes
  // server.get('*', (req, res, next) => {
  //   const staticFilePath = path.join(distFolder, req.path, 'index.html');
  //   if (existsSync(staticFilePath)) {
  //     res.sendFile(staticFilePath); // Serve pre-rendered static file
  //   } else {
  //     next(); // Fallback to SSR for dynamic routes
  //   }
  // });

  // // Dynamic rendering with SSR
  // server.get('*', (req, res) => {
  //   console.log(`Handling dynamic route: ${req.path}`);
  //   res.render(indexHtml, {
  //     req,
  //     providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
  //   });
  // });

  server.get('*', (req, res) => {
    console.log('enterd');
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] }, (err, html) => {
     
    if (err) {
      console.error('Error occurred while rendering:', err);
      return res.status(500).send('Internal server error');
    }

    // ✅ Check if the rendered HTML contains your 404 content marker
    if (html?.includes('Seems can’t find the page your’re looking for.')) {
      return res.status(404).send(html); // send 404 if not found
    }

    return res.send(html); // normal 200 response
  });
    
  });

  return server;
}

function run(): void {
  const port = 4010;

  // Start up the Node.js server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack replacement logic
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
