const { Jimp } = require('jimp');
const path = require('path');
const fs = require('fs');

async function cleanLogo() {
  try {
    const backupPath = path.join(__dirname, 'public', 'icon_backup.png');
    const filePath = path.join(__dirname, 'public', 'icon.png');
    
    // Check if backup exists, if not create it from current icon.png
    if (!fs.existsSync(backupPath)) {
      if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, backupPath);
        console.log('Created backup of original logo at public/icon_backup.png');
      } else {
        console.error('No logo file found to clean.');
        return;
      }
    }
    
    console.log('Loading logo from backup...');
    const image = await Jimp.read(backupPath);
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    console.log(`Original dimensions: ${width}x${height}`);
    
    // Step 1: Clear the outer border by setting a 45px margin to fully transparent.
    // This is safe since the logo is centered and has a large padding from the border box.
    const margin = 45;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        
        // If the pixel is within the outer 45px margin, make it fully transparent
        if (x < margin || x > (width - margin) || y < margin || y > (height - margin)) {
          image.bitmap.data[idx + 3] = 0; // Set alpha to 0
        }
      }
    }
    
    // Step 2: Scan the remaining area to find the bounding box of the actual logo
    let minX = width;
    let minY = height;
    let maxX = 0;
    let maxY = 0;
    let foundPixels = 0;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const a = image.bitmap.data[idx + 3];
        
        // Find non-transparent pixels (which belong to the logo text/eagle)
        if (a > 15) {
          foundPixels++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    
    if (foundPixels === 0 || maxX < minX || maxY < minY) {
      console.error('Could not find any logo pixels after clearing margins. Try a smaller margin.');
      return;
    }
    
    console.log(`Logo bounding box: X:[${minX} to ${maxX}], Y:[${minY} to ${maxY}] (${foundPixels} pixels)`);
    
    // Add a small safety padding of 3px
    minX = Math.max(0, minX - 3);
    minY = Math.max(0, minY - 3);
    maxX = Math.min(width - 1, maxX + 3);
    maxY = Math.min(height - 1, maxY + 3);
    
    const cropWidth = maxX - minX + 1;
    const cropHeight = maxY - minY + 1;
    console.log(`Cropping logo to: ${cropWidth}x${cropHeight}`);
    
    // Step 3: Crop the image to the bounding box
    image.crop({ x: minX, y: minY, w: cropWidth, h: cropHeight });
    
    // Step 4: Write back to public/icon.png
    await image.write(filePath);
    console.log('Successfully saved cleaned logo to public/icon.png!');
  } catch (err) {
    console.error('Error cleaning logo:', err);
  }
}

cleanLogo();
