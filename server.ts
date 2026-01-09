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
//const compression = require('compression');
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/mlzs/browser');
  const redirects: { [key: string]: string } = {
  '/maharashtra/wakad-pune/best-cbse-school-wakad-pune': '/maharashtra/pune',
  '/uttar-pradesh/varanasi/best-cbse-school-varanasi':'/uttar-pradesh',
  '/uttar-pradesh/agra/best-cbse-school-agra':'/uttar-pradesh',
  '/uttar-pradesh/ghaziabad/best-cbse-school-ghaziabad':'/uttar-pradesh',
  '/madhya-pradesh/indore/best-cbse-school-indore':'/madhya-pradesh',
  '/jharkhand/jamshedpur/best-cbse-school-jamshedpur':'/jharkhand',
  '/uttar-pradesh/meerut/best-cbse-school-meerut':'/uttar-pradesh',
  '/jharkhand/dhanbad/best-cbse-school-dhanbad':'/jharkhand',
  '/delhi/delhi/best-cbse-school-nirman-vihar-delhi':'/locate-us',
  '/tamil-nadu/cuddalore/best-cbse-school-cuddalore':'/tamil-nadu',
  '/haryana/rewari/best-cbse-school-rewari':'/haryana',
  '/punjab/ludhiana/best-cbse-school-ludhiana':'/punjab',
  '/jharkhand/hazaribagh/best-cbse-school-hazaribagh':'/jharkhand',
  '/maharashtra/latur/best-cbse-school-latur':'/maharashtra/latur-city/best-cbse-school-udgir',
  '/bihar/barh/best-cbse-school-barh':'/bihar/patna/best-cbse-school-barh',
  '/karnataka/bangalore/best-cbse-school-bangalore-east':'/karnataka/bangalore/best-cbse-school-bangalore-east-kadugodi-whitefield',
  '/surguja-ambikapur/chhattisgarh/mount-litera-zee-school-chhattisgarh':'/chhattisgarh/ambikapur/best-cbse-school-ambikapur',
  '/jharkhand/deoghar/best-cbse-school-deoghar':'/jharkhand',
  '/tamil-nadu/karur/best-cbse-school-karur':'/tamil-nadu',
  '/haryana/panchkula/best-cbse-school-panchkula':'/haryana',
  '/uttar-pradesh/saharanpur/best-cbse-school-saharanpur':'/uttar-pradesh',
  '/maharashtra/hinjewadi/best-cbse-school-hinjewadi':'/maharashtra',
  '/tamil-nadu/madurai/best-cbse-school-madurai':'/tamil-nadu',
  '/punjab/moga/best-cbse-school-moga':'/punjab',
  '/haryana/fatehabad/best-cbse-school-fatehabad':'/haryana',
  '/uttar-pradesh/unnao/best-cbse-school-unnao':'/uttar-pradesh',
  '/tamil-nadu/hosur/best-cbse-school-hosur':'/tamil-nadu',
  '/uttar-pradesh/kasganj/best-cbse-school-kasganj':'/uttar-pradesh',
  '/madhya-pradesh/ratlam/best-cbse-school-ratlam':'/madhya-pradesh',
  '/uttarakhand/dehradun/best-cbse-school-dehradun':'/uttarakhand-uttaranchal/dehradun/best-cbse-school-dehradun',
  '/karnataka/electronic-city/best-cbse-school-electronic-city':'/karnataka',
  '/madhya-pradesh/balaghat/best-cbse-school-balaghat-mp':'/madhya-pradesh',
  '/uttar-pradesh/bijnor/best-cbse-school-bijnor':'/uttar-pradesh',
  '/tamil-nadu/sivagangai/best-cbse-school-sivagangai':'/tamil-nadu/sivagangai/best-cbse-school-sivagangai',
  '/maharashtra/nashik/adgaon':'/maharashtra/nashik/best-cbse-school-adgaon-nashik',
  '/rajasthan/jaipur/best-cbse-school-jaipur':'/rajasthan/jaipur/best-cbse-school-jagatpura-jaipur',
  '/punjab/dera-bassi/best-cbse-school-dera-bassi':'/punjab',
  '/bihar/barbigha/barbigha':'/bihar',
  '/tamil-nadu/sivakasi/best-cbse-school-sivakasi':'/tamil-nadu',
  '/uttar-pradesh/dadri/best-sbse-school-dadri':'/uttar-pradesh/dadri/best-cbse-school-dadri',
  '/haryana/kaithal/best-cbse-school-kaithal':'/haryana',
  '/west-bengal/maheshtala/best-cbse-school-maheshtala':'/west-bengal',
  '/tamil-nadu/salem/best-cbse-school-salem':'/tamil-nadu',
  '/himachal-pradesh/arki/best-cbse-school-arki':'/locate-us',
  '/bihar/bodh-gaya/bodh-gaya':'/bihar/bodh-gaya/best-cbse-school-bodh-gaya',
  '/bihar/bihta/best-cbse-school-bihta':'/bihar/patna/best-cbse-school-bihta',
  '/haryana/panipat/best-cbse-school-panipat':'/haryana',
  '/telangana/hyderabad/best-cbse-school-hyderabad-hayathnagar':'/telangana',
  '/telangana/nalgonda/best-cbse-school-nalgonda':'/telangana/nalgonda/best-cbse-school-nalgonda',
  '/tamil-nadu/vellore/best-cbse-school-vellore':'/tamil-nadu/vellore/best-cbse-school-gudiyattam',
  '/west-bengal/barrackpore/best-cbse-school-barrackpore':'/west-bengal/kolkata/best-cbse-school-barrackpore',
  '/bihar/lakhisarai/lakhisarai':'/bihar/lakhisarai/best-cbse-school-lakhisarai',
  '/uttar-pradesh/jaunpur/mlzs-jaunpur-school':'/uttar-pradesh/jaunpur/best-cbse-school-jaunpur',
  '/karnataka/mysore/best-cbse-school-mysore':'/karnataka',
  '/jharkhand/ramgarh-cantt/best-cbse-school-ramgarh-cantt':'/jharkhand/ramgarh-cantonment/best-cbse-school-ramgarh-cantt',
  '/odisha/bhubaneswar/best-cbse-school-bhubaneswar':'/odisha/bhubaneswar/best-cbse-school-raghunathpur',
  '/madhya-pradesh/sagar/best-cbse-school-sagar':'/madhya-pradesh',
  '/west-bengal/uluberia/best-cbse-school-uluberia':'/west-bengal',
  '/haryana/kurukshetra/best-cbse-school-kurukshetra':'/haryana',
  '/maharashtra/nanded/nanded':'/maharashtra/parbhani/best-cbse-school-gangakhed',
  '/maharashtra/taluka-haveli/waholi':'/maharashtra/pune/best-cbse-school-pune-wagholi',
  '/west-bengal/chanchal/mount-litera-zee-school-chanchal':'/west-bengal/chanchal/best-cbse-school-chanchal',
  '/karnataka/sarjapura/best-cbse-school-sarjapura':'/karnataka',
  '/uttarakhand/dehradun/best-cbse-school-dehradun-doiwala-bhanewala':'/uttarakhand-uttaranchal/dehradun/best-cbse-school-dehradundoiwala-bhanewala',
  '/karnataka/vijayapura/mlzs-vijayapura':'/karnataka',
  '/maharashtra/ahmednagar/best-cbse-school-ahmednagar':'/maharashtra',
  '/uttarakhand/roorkee/best-cbse-school-roorkee':'/uttarakhand-uttaranchal/roorkee/best-cbse-school-roorkee',
  '/karnataka/gulbarga/mount-litera-zee-school-gulbarga':'/karnataka/gulbarga/best-cbse-school-gulbarga',
  '/maharashtra/hingoli/hingoli':'/maharashtra/hingoli/best-cbse-school-hingoli',
  '/tamil-nadu/neyyoor/best-cbse-school-neyyoor':'/tamil-nadu',
  '/maharashtra/latur/udgir':'/maharashtra/latur-city/best-cbse-school-udgir',
  '/uttarakhand/haridwar/best-cbse-school-haridwar':'/uttarakhand-uttaranchal/haridwar/best-cbse-school-haridwar',
  '/tamil-nadu/nagercoil/best-cbse-school-nagercoil':'/tamil-nadu',
  '/tamil-nadu/trichy/best-cbse-school-trichy':'/tamil-nadu',
  '/uttar-pradesh/mathura/best-cbse-school-mathura':'/uttar-pradesh/mathura/best-cbse-school-mathura',
  '/madhya-pradesh/rewa/best-cbse-school-rewa':'/madhya-pradesh',
  '/punjab/rampura/best-cbse-school-rampura':'/punjab',
  '/haryana/tohana/best-cbse-school-tohana':'/haryana',
  '/bihar/arah/mount-litera-zee-school-arah-k5':'/bihar/arah/best-cbse-school-arah-k5/',
  '/karnataka/vidyaranipura/best-cbse-school-vidyaranipura':'/karnataka',
  '/odisha/behrampur/best-cbse-school-behrampur':'/odisha',
  '/telangana/seunderabad/best-cbse-school-seunderabad':'/telangana',
  '/uttar-pradesh/alllahabad/best-cbse-school-alllahabad':'/uttar-pradesh'
};
  const _dir = process.cwd();
  const indexHtml = fs.existsSync(path.join(distFolder, 'index.original.html'))
    ? path.join(distFolder, 'index.original.html')
    : 'index';
  //console.log(indexHtml);
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule
  }));
  //server.use(compression);
  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  // server.use((req, res, next) => {
  // const lower = req.url.toLowerCase();
  // if (req.url !== lower) {
  //   return res.redirect(301, lower);
  // }
  // next();
  // });
  server.get('*', (req, res, next) => {
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const normalizedPath = req.path.slice(0, -1);
    console.log(`Removing trailing slash: ${req.path} → ${normalizedPath}`);
    return res.redirect(301, normalizedPath);
  }
  // 1️⃣ Check old → new URL mapping
  const target = redirects[req.path];
  if (target) {
    console.log(`Redirecting old URL: ${req.path} → ${target}`);
    return res.redirect(301, target); // 301 permanent redirect for SEO
  }

  // 2️⃣ Normalize to lowercase if URL contains uppercase letters
  const lower = req.url.toLowerCase();
  if (req.url !== lower) {
    console.log(`Redirecting to lowercase URL: ${req.url} → ${lower}`);
    return res.redirect(301, lower);
  }

  next(); // continue to SSR rendering if no redirect
});
  server.use(
    expressStaticGzip(path.join(__dirname, 'dist', 'mlzs', 'browser'), {
      enableBrotli: true, // Enable Brotli compression
      orderPreference: ['br', 'gz'], // Compression preference order (Brotli will be preferred if available)

    })
  );

  server.get('/robots.txt', (req, res) => {
    res.sendFile(_dir + '/robots.txt');
  });

  server.get('/assetlinks.json', (req, res) =>
    res.sendFile(_dir + '/assetlinks.json')
  );
  server.get('/MusePlayPrivacyPolicy.html', (req, res) =>
    res.sendFile(_dir + '/MusePlayPrivacyPolicy.html')
  );
  server.get('/sitemap.xml', (req, res) => res.sendFile(_dir + '/sitemap.xml'));
  server.get('/blog-sitemap.xml', (req, res) => res.sendFile(_dir + '/blog-sitemap.xml'));
  server.get('/pages-sitemap.xml', (req, res) => res.sendFile(_dir + '/pages-sitemap.xml'));
  server.get('/location-sitemap.xml', (req, res) => res.sendFile(_dir + '/location-sitemap.xml'));
  server.get('/news-sitemap.xml', (req, res) => res.sendFile(_dir + '/news-sitemap.xml'));
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    console.log('enterd');
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4050;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}



// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
