const { Jimp } = require('jimp');
const path = require('path');

async function analyze() {
  try {
    const filePath = path.join(__dirname, 'public', 'icon_backup.png');
    const image = await Jimp.read(filePath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    console.log(`Analyzing backup logo size: ${width}x${height}`);
    
    // Let's check pixels at some key coordinates to see what the border is made of
    console.log('Top-left 10x10 pixels:');
    for (let y = 0; y < 15; y++) {
      let row = '';
      for (let x = 0; x < 15; x++) {
        const idx = (y * width + x) * 4;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        const maxVal = Math.max(r, g, b);
        const minVal = Math.min(r, g, b);
        const sat = maxVal - minVal;
        
        row += `(${r},${g},${b},a:${a},s:${sat}) `;
      }
      console.log(`Row ${y}: ${row}`);
    }
  } catch (err) {
    console.error(err);
  }
}

analyze();
