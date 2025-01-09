const express = require('express');
//const APP_BASE_HREF = require("@angular/common");
const fs = require("fs");
const expressStaticGzip = require('express-static-gzip');
const path = require('path');
const http = require("http");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(express.json());
// app.engine(
//   "html",
//   ngExpressEngine({
//     bootstrap: AppServerModule,
//   })
// );
const _dir = process.cwd();
 const distFolder = path.join(process.cwd(), "dist/kidzeeweb/browser");
 //console.log(fs.existsSync(path.join(distFolder, "index.original.html")));
const indexHtml = fs.existsSync(path.join(distFolder, "index.original.html"))
  ? path.join(distFolder, "index.original.html")
  : "index";
app.set("view engine", "html");
app.set("views", distFolder);
app.use(
  cors({
    origin: "*",
  })
);
// Enable gzip compression for server responses
app.use(expressStaticGzip(path.join(__dirname, 'dist', 'kidzeeweb','browser'), {
  enableBrotli: true, // Enable Brotli compression
  orderPreference: ['br', 'gz'], // Compression preference order (Brotli will be preferred if available)
  setHeaders: (res) => {
    // Set correct Content-Encoding and Content-Type headers
    res.setHeader('Cache-Control', 'public, max-age=31536000');
  },
}));
app.get(
  "*.*",
  express.static(distFolder, {
    maxAge: "1y",
  })
);
app.get("/robots.txt", (req, res) => {
  res.sendFile(_dir + "/robots.txt");
});

app.get("/assetlinks.json", (req, res) =>
  res.sendFile(_dir + "/assetlinks.json")
);
app.get("/MusePlayPrivacyPolicy.html", (req, res) =>
  res.sendFile(_dir + "/MusePlayPrivacyPolicy.html")
);
app.get("/sitemap.xml", (req, res) => res.sendFile(_dir + "/sitemap.xml"));
//console.log(indexHtml);
 app.get("*", (req, res) => {
   res.sendFile(indexHtml);
 });


//app.use("/api/CMS", require("./api/CMS"));
// Start the server on port 8080
const PORT = 4040;
app.listen(PORT, () => {
 // console.log(`Server running at http://localhost:${PORT}/`);
});
