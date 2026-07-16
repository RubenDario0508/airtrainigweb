import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';

function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.webp', '.png', '.jpg', '.jpeg'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  }
  return fileList;
}

async function optimizeImage(filePath) {
  try {
    const statsBefore = fs.statSync(filePath);
    const sizeBeforeKB = statsBefore.size / 1024;
    
    // Only optimize files larger than 100 KB
    if (sizeBeforeKB < 100) {
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath);
    const inputBuffer = fs.readFileSync(filePath);
    
    let transformer = sharp(inputBuffer);
    const metadata = await transformer.metadata();

    // Determine max width based on whether it is a background/hero or standard image
    const isLargeBg = /bg|fondo|fachada|mesadetrabajo/i.test(basename) || (metadata.width && metadata.width > 2000);
    const maxWidth = isLargeBg ? 1920 : 1000;

    if (metadata.width && metadata.width > maxWidth) {
      transformer = transformer.resize({ width: maxWidth, withoutEnlargement: true });
    }

    let outputBuffer;
    if (ext === '.webp') {
      outputBuffer = await transformer.webp({ quality: 75 }).toBuffer();
    } else if (ext === '.png') {
      outputBuffer = await transformer.png({ quality: 75, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      outputBuffer = await transformer.jpeg({ quality: 75, progressive: true }).toBuffer();
    }

    if (outputBuffer && outputBuffer.length < statsBefore.size) {
      fs.writeFileSync(filePath, outputBuffer);
      const statsAfter = fs.statSync(filePath);
      const sizeAfterKB = statsAfter.size / 1024;
      const savedPercent = (((statsBefore.size - statsAfter.size) / statsBefore.size) * 100).toFixed(1);
      console.log(`Optimized: ${filePath} (${metadata.width}x${metadata.height})`);
      console.log(`  Size: ${sizeBeforeKB.toFixed(2)} KB -> ${sizeAfterKB.toFixed(2)} KB (${savedPercent}% saved)`);
    } else {
      console.log(`Skipped (no size reduction or not processed): ${filePath}`);
    }
  } catch (err) {
    console.error(`Error optimizing ${filePath}:`, err.message);
  }
}

async function main() {
  console.log('Starting recursive image optimization in /public...');
  const files = getFilesRecursively(PUBLIC_DIR);
  console.log(`Found ${files.length} images. Processing large assets (>100KB)...`);

  for (const file of files) {
    await optimizeImage(file);
  }
  console.log('All images processed!');
}

main().catch(console.error);
