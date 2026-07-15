const fs = require('fs');
const path = require('path');

// Fallback to squoosh or native node logic if needed, but let's try sharp first
async function convert() {
  try {
    const sharp = require('sharp');
    const dir = path.join(__dirname, 'public', 'imgpag5', 'carrusel');
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(dir, path.parse(file).name + '.webp');
        await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
        console.log(`Converted ${file} to webp`);
      }
    }
  } catch (e) {
    console.error("Sharp failed:", e.message);
  }
}
convert();
