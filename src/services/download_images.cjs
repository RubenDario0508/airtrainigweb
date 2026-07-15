const fs = require('fs');
const https = require('https');
const path = require('path');

const metadataPath = path.join(__dirname, 'metadata_results.json');
const outputDir = path.resolve(__dirname, '../../public/imgpag8');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    // Decode HTML entities in url if any (e.g. &amp; -> &)
    const cleanUrl = url.replace(/&amp;/g, '&');
    
    const file = fs.createWriteStream(dest);
    
    https.get(cleanUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${cleanUrl}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {}); // Delete local file on error
      reject(err);
    });
  });
}

async function run() {
  for (let i = 0; i < metadata.length; i++) {
    const item = metadata[i];
    const destName = `instagram_${i + 1}.jpg`;
    const destPath = path.join(outputDir, destName);
    console.log(`Downloading image for URL: ${item.url}`);
    try {
      if (item.imageUrl) {
        await downloadImage(item.imageUrl, destPath);
        console.log(`Saved to ${destPath}`);
      } else {
        console.log(`No image URL found for ${item.url}`);
      }
    } catch (e) {
      console.error(`Error downloading image for ${item.url}:`, e.message);
    }
  }
}

run();
