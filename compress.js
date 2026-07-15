const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const PUBLIC_DIR = path.join(__dirname, 'public');
const MAX_WIDTH = 1920;

async function findFiles(dir, pattern) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (let file of list) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(await findFiles(file, pattern));
    } else {
      if (file.toLowerCase().endsWith(pattern)) results.push(file);
    }
  }
  return results;
}

async function compressAll() {
  console.log('Buscando imágenes gigantes en el proyecto...');
  
  // Buscar archivos pesados (> 3MB)
  const allFiles = await findFiles(PUBLIC_DIR, '.jpg');
  const allPngs = await findFiles(PUBLIC_DIR, '.png');
  const filesToProcess = [...allFiles, ...allPngs];
  
  for (const filePath of filesToProcess) {
    const stats = fs.statSync(filePath);
    const sizeInMB = stats.size / (1024 * 1024);
    
    if (sizeInMB > 3 && !filePath.includes('upscayl')) { // Ignorar frames del video
      console.log(`Comprimiendo: ${filePath} (${sizeInMB.toFixed(2)} MB)`);
      
      const newPath = filePath.replace(/\.(jpg|png)$/i, '.webp');
      
      try {
        await sharp(filePath)
          .resize({ width: MAX_WIDTH, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(newPath);
          
        const newStats = fs.statSync(newPath);
        const newSizeInMB = newStats.size / (1024 * 1024);
        console.log(`✅ Creado: ${newPath} (${newSizeInMB.toFixed(2)} MB)`);
        
        fs.renameSync(filePath, filePath + '.bak');
      } catch (err) {
        console.error(`❌ Error al comprimir ${filePath}:`, err);
      }
    }
  }
  console.log('Compresión finalizada.');
}

compressAll();
