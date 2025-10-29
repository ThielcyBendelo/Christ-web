const fs = require('fs');
const path = require('path');

const assetsFile = path.join(__dirname, '..', 'src', 'assets', 'assets.js');
const assetsDir = path.join(__dirname, '..', 'src', 'assets');

const content = fs.readFileSync(assetsFile, 'utf8');

// crude regex to extract image: "..."
const imageMatches = [...content.matchAll(/image\s*:\s*"([^"]+)"/g)];

if (imageMatches.length === 0) {
  console.log('No project images found in assets.js');
  process.exit(0);
}

console.log('Found project image entries:');
for (const m of imageMatches) {
  const raw = m[1];
  const parts = raw.split('/');
  const basename = parts[parts.length - 1];
  const filePath = path.join(assetsDir, basename);
  const exists = fs.existsSync(filePath);
  console.log(
    `- entry: ${raw}\n  basename: ${basename}\n  expectedKey: ../assets/${basename}\n  exists: ${exists} \n  localPath: ${filePath}\n`
  );
}
