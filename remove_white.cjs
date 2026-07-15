const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const files = [
  'icon_tiktok_3d.png'
];

async function processImages() {
  for (const file of files) {
    const filePath = path.join(publicDir, file);
    if (!fs.existsSync(filePath)) continue;

    console.log(`Processing ${file}...`);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];

        const avg = (r + g + b) / 3;

        // Make anything that is very bright (white/near-white/shadowed white) transparent
        // We do a progressive fade: anything above 220 starts fading out.
        if (avg > 245) {
          this.bitmap.data[idx + 3] = 0;
        } else if (avg > 210) {
          // Feathering for anti-aliased edges
          const alphaFade = Math.max(0, 255 - ((avg - 210) * (255/35))); 
          if (alphaFade < this.bitmap.data[idx + 3]) {
             this.bitmap.data[idx + 3] = alphaFade;
          }
        }
      });
      
      await image.write(filePath);
      console.log(`Saved transparent version of ${file}`);
    } catch (e) {
      console.error(`Error processing ${file}:`, e);
    }
  }
}

processImages();
