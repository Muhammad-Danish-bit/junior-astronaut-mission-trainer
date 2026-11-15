// Cross-platform equivalent of build_bundle.ps1 (run: node build_bundle.js)
const fs = require("fs");
const path = require("path");
const ps1 = fs.readFileSync(path.join(__dirname, "build_bundle.ps1"), "utf8");
const files = [...ps1.matchAll(/^\s*"(js\\[^"]+\.js)"/gm)].map(m => m[1].replace(/\\/g, "/"));
let out = "(function() {\n'use strict';\n\n";
for (const f of files) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) { console.warn("File not found:", f); continue; }
  let c = fs.readFileSync(p, "utf8").replace(/^﻿/, "");
  c = c.replace(/^\s*import\s+[^;]+;[ \t]*\r?$/gm, "")
       .replace(/^[ \t]*export\s+default\s+/gm, "")
       .replace(/^[ \t]*export\s+/gm, "");
  out += `// --- File: ${f.replace(/\//g, "\\")} ---\n${c}\n\n`;
}
out += "})();\n";
fs.writeFileSync(path.join(__dirname, "js/bundle.js"), "﻿" + out);
console.log("Bundle generated:", files.length, "files");
